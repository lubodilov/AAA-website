import { useRef } from 'react';
import { useLocale } from '../content';
import { Split } from '../components/Split';
import { useScrollProgress } from '../lib/scroll';

export function Founder() {
  const { t } = useLocale();
  const { founder, ui } = t;
  const section = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useScrollProgress(
    section,
    (p) => {
      if (img.current) img.current.style.transform = `translate3d(0, ${((0.5 - p) * 60).toFixed(1)}px, 0)`;
    },
    'through',
  );

  return (
    <section ref={section} id="about" className="relative overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="founder-title">
      <div className="frame grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5" data-reveal="clip">
          <div className="tone-dark relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden rounded-[24px] border border-[var(--line)] bg-ink-800 text-bone">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 55% at 62% 30%, rgba(255,43,30,0.38), rgba(255,43,30,0) 70%), radial-gradient(90% 60% at 50% 110%, rgba(255,84,64,0.18), transparent 70%)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div ref={img} className="absolute inset-x-0 -bottom-6 top-6 will-change-transform">
              <img
                src="/img/lubo.webp"
                srcSet="/img/lubo-sm.webp 440w, /img/lubo.webp 880w"
                sizes="(min-width: 1024px) 520px, 90vw"
                alt={founder.photoAlt}
                width={880}
                height={1031}
                loading="lazy"
                decoding="async"
                className="absolute bottom-0 left-1/2 h-[104%] w-auto max-w-none -translate-x-1/2 object-contain"
                style={{ filter: 'grayscale(0.25) contrast(1.06) brightness(0.98)' }}
              />
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-800 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="text-[18px] font-medium tracking-[-0.02em]">{founder.name}</div>
                <div className="label mt-1">{founder.role}</div>
              </div>
                          </div>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <span className="kicker" data-reveal>
            {ui.kickers.founder}
          </span>
          <Split as="h2" id="founder-title" text={founder.title} className="t-display mt-6 [&_.em]:text-signal-hot" />
          <div className="mt-8 space-y-5">
            {founder.body.map((p, i) => (
              <p key={p} className={i === 0 ? 't-lead text-bone' : 't-lead text-bone-dim'} data-reveal style={{ ['--d' as string]: `${i * 120}ms` }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
