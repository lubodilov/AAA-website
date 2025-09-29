// server.js  — CommonJS version that just works
// 1) npm i express cors googleapis dotenv
// 2) create .env next to this file (see template below)
// 3) node server.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { google } from "googleapis";
import dotenv from "dotenv";

// Load env file (.env or .env.local)
dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---------- ENV ----------
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_SENDER = "team@upgradevision.ai",
  CONTACT_TO = "team@upgradevision.ai",
} = process.env;
// -------------------------

// -------------------------

function buildRaw({ to, from, replyTo, subject, html, text = '' }) {
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

  // Gmail requires URL-safe base64
  return Buffer.from(lines)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Health + env checks (doesn't leak secrets)
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    hasClientId: !!GOOGLE_CLIENT_ID,
    hasClientSecret: !!GOOGLE_CLIENT_SECRET,
    hasRefreshToken: !!GMAIL_REFRESH_TOKEN,
    sender: GMAIL_SENDER,
    to: CONTACT_TO,
  });
});

app.post('/api/send-contact', async (req, res) => {
  const { name, company, title, email, phone, message, website } = req.body || {};

  // Honeypot (hidden "website" field)
  if (typeof website !== 'undefined' && website !== '') {
    return res.json({ ok: true });
  }

  if (!name || !company || !title || !email || !phone || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  // Fail fast if env missing
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
    return res.status(500).json({ ok: false, error: 'Server not configured (env missing)' });
  }

  try {
    // OAuth2 client — redirect URI not used when you already have a refresh token
    const oauth2 = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      'http://localhost' // placeholder; not used with refresh token
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
      from: GMAIL_SENDER, // must match the account you authorized (or its verified alias)
      replyTo: email,
      subject,
      html,
    });

    const resp = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    });

    console.log('Gmail sent:', resp.data.id);
    res.json({ ok: true });
  } catch (e) {
    const gErr = e?.response?.data || e;
    console.error('Gmail send error (verbatim):', JSON.stringify(gErr, null, 2));
    const hint =
      gErr?.error?.message ||
      gErr?.error_description ||
      gErr?.message ||
      'SEND_FAILED';
    res.status(500).json({ ok: false, error: hint });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`Mail API running on http://localhost:${PORT}`));
