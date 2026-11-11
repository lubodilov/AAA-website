import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/env';

/** Renders the final value (SSR/no-JS); counts up once when it enters the viewport. */
export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^([^\d]*)(\d+(?:[,\u00a0]\d{3})*(?:\.\d+)?)(.*)$/);
    if (!el || !m || prefersReducedMotion()) return;
    const [, sign, raw, suffix] = m;
    const sep = raw.match(/[,\u00a0]/)?.[0];
    const num = raw.replace(/[,\u00a0]/g, '');
    const target = parseFloat(num);
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    const fmt = (v: number) => (sep ? Math.round(v).toLocaleString('en-US').replace(/,/g, sep) : v.toFixed(decimals));
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / dur);
          const v = target * (1 - Math.pow(1 - k, 4));
          el.textContent = `${sign}${fmt(v)}${suffix}`;
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = `${sign}${fmt(0)}${suffix}`;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
