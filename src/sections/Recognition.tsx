import { useRef } from 'react';
import { useT } from '../content';
import { Split } from '../components/Split';
import { Scene } from '../components/Scenes';
import { LitText } from '../components/LitText';
import { useScrollProgress } from '../lib/scroll';
import { clamp } from '../lib/env';

/**
 * Three moments from inside a real company, stacked: each slides up over the
 * last while the one underneath recedes. Transform and opacity only.
 */
export function Recognition() {
  const { recognition, ui } = useT();
  const stack = useRef<HTMLDivElement>(null);
  const inners = useRef<(HTMLDivElement | null)[]>([]);
  const shades = useRef<(HTMLDivElement | null)[]>([]);
  const uis = useRef<(HTMLDivElement | null)[]>([]);
  const n = recognition.items.length;
  const dwell = 0.45;

  useScrollProgress(stack, (p) => {
    const t = p * (n - 1 + dwell);
    for (let i = 0; i < n; i++) {
      const covered = clamp(t - i);
      const enter = clamp(t - (i - 1));
      const inner = inners.current[i];
      const shade = shades.current[i];
      const ui = uis.current[i];
      if (inner) inner.style.transform = `scale(${(1 - covered * 0.05).toFixed(4)})`;
      if (shade) shade.style.opacity = (covered * 0.8).toFixed(3);
      if (ui) {
        ui.style.transform = `translate3d(0, ${((1 - enter) * 70).toFixed(1)}px, 0)`;
        if (enter > 0.5) ui.classList.add('is-in');
      }
    }
  });

  return (
    <section id="what-we-find" className="relative bg-ink" aria-label={ui.kickers.problem}>
      <div className="frame flex min-h-[62svh] flex-col justify-center py-24">
        <span className="kicker" data-reveal>
          {ui.kickers.problem}
        </span>
        <Split as="h2" text={recognition.title} className="t-display mt-8 max-w-[15ch] [&_.em]:text-signal-hot" />
      </div>

      <div ref={stack} className="relative" style={{ height: `calc(${n} * 100svh + ${dwell * 100}vh)` }}>
        {recognition.items.map((c, i) => (
          <div key={c.id} className="sticky top-0 h-[100svh]" style={{ zIndex: i + 1 }}>
            <div
              ref={(el) => (inners.current[i] = el)}
              className="absolute inset-0 overflow-hidden rounded-t-[32px] border-t border-[var(--line)] will-change-transform"
              style={{ background: 'radial-gradient(62% 72% at 74% 46%, rgba(255,36,24,0.17), rgba(255,36,24,0) 70%), var(--ink)' }}
            >
              <div className="frame relative grid h-full grid-rows-[minmax(0,1fr)_auto] gap-6 pb-10 pt-[calc(var(--header-h)+10px)] md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-10 md:py-0">
                <div className="order-2 md:order-1 md:col-span-5">
                  <span className="label" data-reveal>
                    <span className="text-signal">0{i + 1}</span> / 0{n}
                  </span>
                  <Split as="h3" text={c.title} className="t-h2 mt-5 max-w-[12ch]" />
                  <p className="mt-5 max-w-[32ch] t-lead text-bone-dim" data-reveal style={{ ['--d' as string]: '220ms' }}>
                    {c.body}
                  </p>
                </div>
                <div className="order-1 flex min-h-0 items-center md:order-2 md:col-span-7">
                  <div ref={(el) => (uis.current[i] = el)} className="max-h-full w-full overflow-hidden rounded-[18px]">
                    <Scene id={c.id} />
                  </div>
                </div>
              </div>
              <div ref={(el) => (shades.current[i] = el)} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 bg-ink">
        <div className="frame flex min-h-[90svh] items-center py-24">
          <LitText text={recognition.turn} className="t-display max-w-[20ch] lg:max-w-[24ch]" />
        </div>
      </div>
    </section>
  );
}
