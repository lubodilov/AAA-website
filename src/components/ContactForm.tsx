import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CONTACT_API_URL = 'http://localhost:8787/api/send-contact';
const TURNSTILE_SITE_KEY = 'YOUR_TURNSTILE_SITE_KEY'; // <-- replace in Cloudflare dashboard

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: any) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '', company: '', title: '', email: '', phone: '', message: '',
    website: '' // honeypot
  });

  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Render Turnstile when script is loaded
  useEffect(() => {
    const tryRender = () => {
      if (!widgetRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',              // matches your UI
        size: 'invisible',          // invisible challenge
        callback: (token: string) => setTurnstileToken(token),
        'error-callback': () => setTurnstileToken(''),
        'expired-callback': () => setTurnstileToken(''),
        retry: 'auto',
      });
    };

    // script might not be ready yet
    const id = setInterval(tryRender, 150);
    tryRender();
    return () => clearInterval(id);
  }, []);

  const handleChange = (k: string, v: string) =>
    setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      // make sure we have a fresh token (invisible triggers automatically)
      let token = turnstileToken;
      if (window.turnstile && widgetIdRef.current) {
        // if token missing/expired, Turnstile will re-challenge automatically
        token = window.turnstile.getResponse(widgetIdRef.current);
      }
      if (!token) {
        // fallback: give Turnstile a moment to call our callback
        await new Promise((r) => setTimeout(r, 400));
        token = turnstileToken;
      }
      if (!token) throw new Error('captcha_failed');

      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken: token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send');

      setIsSubmitted(true);
      // reset widget after success (optional)
      if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
    } catch (e: any) {
      setErr(e.message || 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center bg-white/5 border border-green-600/30 rounded-xl p-8">
        <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-white text-2xl font-light mb-2">Message Sent!</h3>
        <p className="text-white/70">We’ll get back with a tailored plan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Turnstile container (invisible) */}
      <div ref={widgetRef} />

      {/* Honeypot (hidden) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website}
        onChange={(e) => handleChange('website', e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/80 text-sm font-light mb-2">Name *</label>
          <input
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-light mb-2">Company *</label>
          <input
            required
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/80 text-sm font-light mb-2">Title *</label>
        <input
          required
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 outline-none"
          placeholder="Your job title"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/80 text-sm font-light mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-light mb-2">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 outline-none"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/80 text-sm font-light mb-2">Message *</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-red-600 outline-none resize-none"
          placeholder="Tell us about goals, timeline, success definition."
        />
      </div>

      {err && <p className="text-red-400 text-sm">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-xl font-light text-lg hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{loading ? 'Sending…' : 'Send Message'}</span>
        {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
}


// Unfortunately, contact forms are also often used to spread spam on a massive scale. To protect yourself from spam messages and fake email signups, you can enable reCAPTCHA verification in your settings. You can also require people who sign up for emails to confirm their email address.

// Other important components of a contact form include legal notices, which you can include anywhere in your form. This, of course, also includes a submit button at the bottom of the form. A contact form can be embedded on any of your websites. Mailchimp can help you create and embed a contact form on your website .
// we can add way more inputs for company details, help with the warm outreach and filter non company clients, but make it more coplicated to send a message
// we can add in the pop up a button to go to the most frequently asked questions
//we will have a contact form and an AI chat bot? the Ai is fast and dos not save info(we can make it do it for the warm outreach),
//the contact form is more serious and the results will be better but it takes longer for us to answer

// Rate limiting (server)

// Throttle POST /api/send-contact per IP (and optionally per email) to avoid floods.

// Origin & method checks

// Require POST, check Origin/Referer is your domain, and disable CORS for this route (or lock it to your domain).

// Validation & sanitization

// Validate email/phone, length caps on fields, strip HTML (you already escape the message