// pages/api/send-contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_SENDER = 'team@upgradevision.ai',
  CONTACT_TO = 'team@upgradevision.ai',
  TURNSTILE_SECRET, // <-- add this to your .env(.local)
} = process.env;

function buildRaw({ to, from, replyTo, subject, html, text = '' }: any) {
  const lines = [
    `To: ${to}`,
    `From: ${from}`,
    replyTo ? `Reply-To: ${replyTo}` : '',
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
    '',
    html || text,
  ]
    .filter(Boolean)
    .join('\r\n');

  return Buffer.from(lines)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function verifyTurnstile(token: string | undefined, ip: string | undefined) {
  if (!TURNSTILE_SECRET) return { ok: false, reason: 'server_misconfigured' };
  if (!token) return { ok: false, reason: 'missing_token' };

  try {
    const body = new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
    });
    if (ip) body.set('remoteip', ip);

    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const data = (await resp.json()) as {
      success: boolean;
      'error-codes'?: string[];
      action?: string;
      cdata?: string;
    };

    if (!data.success) return { ok: false, reason: data['error-codes']?.[0] || 'captcha_failed' };
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'captcha_error' };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    name,
    company,
    title,
    email,
    phone,
    message,
    website,           // honeypot
    turnstileToken,    // <-- send this from the client
  } = (req.body || {}) as Record<string, string>;

  // Honeypot (bots often fill hidden fields)
  if (typeof website !== 'undefined' && website !== '') {
    return res.json({ ok: true });
  }

  // Basic validation
  if (!name || !company || !title || !email || !phone || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  // Verify Turnstile
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.socket?.remoteAddress as string | undefined);

  const captcha = await verifyTurnstile(turnstileToken, ip);
  if (!captcha.ok) {
    return res.status(400).json({ ok: false, error: captcha.reason || 'captcha_failed' });
  }

  try {
    // Gmail OAuth2
    const oauth2 = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob' // redirect not used with refresh token
    );
    oauth2.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

    const gmail = google.gmail({ version: 'v1', auth: oauth2 });

    const subject = `New Contact: ${name} @ ${company}`;
    const safe = String(message).replace(/</g, '&lt;');
    const html = `
      <div style="font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;color:#e5e7eb;background:#0b0b0b;padding:16px">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:14px">
          <tr><td style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06)">
            <h2 style="margin:0;color:#fff;font-weight:300">New Contact</h2>
            <p style="margin:6px 0 0;color:#ef4444;font-size:12px;letter-spacing:.08em">Upgrade Vision • AI</p>
          </td></tr>
          <tr><td style="padding:18px 24px;color:#d1d5db">
            <p><b style="color:#fff">Name:</b> ${name}</p>
            <p><b style="color:#fff">Title:</b> ${title}</p>
            <p><b style="color:#fff">Company:</b> ${company}</p>
            <p><b style="color:#fff">Email:</b> ${email}</p>
            <p><b style="color:#fff">Phone:</b> ${phone}</p>
            <p style="margin-top:14px;white-space:pre-wrap"><b style="color:#fff">Message:</b><br/>${safe}</p>
          </td></tr>
        </table>
      </div>
    `;

    const raw = buildRaw({
      to: CONTACT_TO,
      from: GMAIL_SENDER, // must be your Gmail/GWS account or verified alias
      replyTo: email,
      subject,
      html,
    });

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    return res.json({ ok: true });
  } catch (e: any) {
    console.error('Gmail send error:', e?.response?.data || e);
    return res.status(500).json({ ok: false, error: 'SEND_FAILED' });
  }
}
