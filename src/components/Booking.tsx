import { useEffect, useRef, useState } from 'react';
import { useT } from '../content';
import { getTheme } from '../lib/theme';

const SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
let loading: Promise<void> | null = null;

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void };
  }
}

/** Starts loading Calendly on intent (hover/focus of a booking button). */
export function preloadCalendly() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      reject(new Error('calendly'));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export function BookingPanel({ onSwitch }: { onSwitch: () => void }) {
  const { site, ui } = useT();
  const B = ui.booking;
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    preloadCalendly()
      .then(() => {
        if (cancelled || !host.current || !window.Calendly) return;
        host.current.innerHTML = '';
        const light = getTheme() === 'light';
        const url = light ? site.calendly.replace('background_color=0f0e0d', 'background_color=f4f1eb').replace('text_color=ede9e3', 'text_color=12100e').replace('primary_color=ff2b1e', 'primary_color=cd1c10') : site.calendly;
        window.Calendly.initInlineWidget({ url, parentElement: host.current });
        const iframe = host.current.querySelector('iframe');
        if (iframe) iframe.addEventListener('load', () => !cancelled && setState('ready'), { once: true });
        setTimeout(() => !cancelled && setState('ready'), 2500);
      })
      .catch(() => !cancelled && setState('error'));
    return () => {
      cancelled = true;
    };
  }, [site.calendly]);

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_340px]">
      <div className="relative order-2 min-h-[640px] border-t border-[var(--rule)] md:order-1 md:min-h-[700px] md:border-r md:border-t-0">
        {state !== 'ready' && (
          <div className="absolute inset-0 grid place-items-center">
            {state === 'error' ? (
              <div className="max-w-sm px-6 text-center">
                <p className="text-char-2">{B.error}</p>
                <div className="mt-5 flex flex-wrap justify-center gap-5">
                  <a className="textlink" href={site.calendly} target="_blank" rel="noreferrer">
                    {B.open}
                  </a>
                  <button className="textlink" onClick={onSwitch}>
                    {B.message}
                  </button>
                </div>
              </div>
            ) : (
              <span className="small">{B.loading}</span>
            )}
          </div>
        )}
        <div ref={host} className="h-[700px] w-full transition-opacity duration-500" style={{ opacity: state === 'ready' ? 1 : 0 }} />
      </div>

      <aside className="order-1 flex flex-col p-6 pt-14 md:order-2 md:p-8 md:pt-16">
        <h2 className="d2">{B.title}</h2>
        <ul className="mt-7">
          {B.expect.map((t) => (
            <li key={t} className="border-t border-[var(--rule)] py-3 text-char-2">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 hidden items-center gap-4 md:flex">
          <img src="/img/lubo-sm.webp" alt="" width={56} height={66} className="h-14 w-14 object-cover object-top grayscale" loading="lazy" />
          <div>
            <div className="font-medium">{B.founder}</div>
            <div className="small">{B.founderNote}</div>
          </div>
        </div>
        <button onClick={onSwitch} className="mt-auto hidden pt-8 text-left text-char-2 md:block">
          {B.prefer} <span className="textlink text-char">{B.preferLink}</span>
        </button>
      </aside>
    </div>
  );
}
