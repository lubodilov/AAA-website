import { useEffect, useRef } from 'react';
import { useT } from '../content';
import { Split } from '../components/Split';
import { Button } from '../components/Button';
import { useUI } from '../components/UI';
import { prefersReducedMotion } from '../lib/env';

/** The knot from the hero, finally calm: a river of light, flowing. */
export function FinalCTA() {
  const { finalCta, ui: copy } = useT();
  const ui = useUI();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || prefersReducedMotion()) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = '/film/river.mp4';
          void v.play().catch(() => undefined);
        } else {
          v.pause();
        }
      },
      { rootMargin: '30% 0px' },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-20 pt-32 md:pb-28" aria-labelledby="cta-title">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster="/film/clear.webp"
        aria-hidden="true"
        className="theme-dark-only absolute inset-0 h-full w-full object-cover object-[60%_50%]"
      />
      <img src="/img/stairs.webp" alt="" width={1400} height={1465} loading="lazy" decoding="async" aria-hidden="true" className="theme-light-only absolute right-[var(--gutter)] top-[10%] h-[80%] w-auto" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgb(var(--ink-rgb)) 0%, rgb(var(--ink-rgb) / 0.2) 22%, rgb(var(--ink-rgb) / 0.1) 50%, rgb(var(--ink-rgb) / 0.85) 82%, rgb(var(--ink-rgb)) 100%)' }}
      />
      <div className="frame relative">
        <span className="kicker" data-reveal>
          {copy.kickers.next}
        </span>
        <Split as="h2" id="cta-title" text={finalCta.title} className="t-display mt-7 max-w-[16ch] [&_.em]:text-signal-hot" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-[44ch] t-lead text-bone-dim" data-reveal>
            {finalCta.sub}
          </p>
          <div className="flex flex-wrap gap-3" data-reveal style={{ ['--d' as string]: '150ms' }}>
            <span onPointerEnter={ui.warm} onFocus={ui.warm}>
              <Button onClick={() => ui.open('booking')}>{finalCta.primary}</Button>
            </span>
            <Button onClick={() => ui.open('contact')} variant="ghost">
              {finalCta.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
