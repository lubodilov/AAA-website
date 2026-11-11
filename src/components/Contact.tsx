import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../content';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

function Field({
  name,
  label,
  type = 'text',
  required,
  textarea,
  autoComplete,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  const cls =
    'w-full bg-transparent border-0 border-b border-char/30 px-0 pt-7 pb-3 text-[17px] text-char placeholder:text-char-3 outline-none focus:border-char transition-colors';
  return (
    <label className="relative block">
      <span className="small absolute left-0 top-0">
        {label}
        {required && <span className="text-red-text"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={`${cls} resize-none`} placeholder={placeholder} />
      ) : (
        <input name={name} type={type} required={required} autoComplete={autoComplete} className={cls} placeholder={placeholder} />
      )}
    </label>
  );
}

export function ContactPanel({ onSwitch }: { onSwitch: () => void }) {
  const { t, href } = useLocale();
  const C = t.ui.contact;
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = { 'form-name': 'contact' };
    fd.forEach((v, k) => (data[k] = String(v)));
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex min-h-[420px] flex-col justify-center p-8 md:p-12">
        <h2 className="d2">
          {C.sentTitle} {C.sentEm}
        </h2>
        <p className="mt-5 max-w-md text-char-2">{C.sentBody}</p>
        <div className="mt-8">
          <button className="btn btn-sm" onClick={onSwitch}>
            {C.sentAction}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-14 md:p-12">
      <h2 className="d2 max-w-[16ch]">{C.title}</h2>
      <p className="mt-4 max-w-md text-char-2">{C.sub}</p>

      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="mt-8 space-y-6">
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="name" label={C.name} required autoComplete="name" />
          <Field name="email" label={C.email} type="email" required autoComplete="email" />
          <Field name="company" label={C.company} autoComplete="organization" />
          <Field name="role" label={C.role} autoComplete="organization-title" />
        </div>
        <Field name="message" label={C.message} required textarea placeholder={C.placeholder} />

        {status === 'error' && (
          <p className="text-red-text" role="alert">
            {C.errorA}{' '}
            <button type="button" className="underline" onClick={onSwitch}>
              {C.errorLink}
            </button>{' '}
            {C.errorB}
          </p>
        )}

        <p className="small">
          {C.privacyA}{' '}
          <Link to={href('/privacy')} className="textlink">
            {C.privacyLink}
          </Link>
          .
        </p>

        <div className="flex flex-wrap items-center gap-5 pt-2">
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? C.sending : C.send}
          </button>
          <button type="button" onClick={onSwitch} className="text-char-2">
            {C.orBook} <span className="textlink text-char">{C.bookLink}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
