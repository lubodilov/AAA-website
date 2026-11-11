import { PointerEvent, useEffect, useRef } from 'react';
import { useT } from '../content';
import { Split } from '../components/Split';
import { CAP_VISUALS } from '../components/CapVisuals';

const SPANS = ['lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-5', 'lg:col-span-6', 'lg:col-span-6'];

/** Everything we build, visible at once, each piece shown doing its job. */
export function Capabilities() {
  const { builds, ui } = useT();
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-run', e.isIntersecting), { rootMargin: '10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const spot = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="capabilities" className="relative bg-ink py-28 md:py-40" aria-labelledby="cap-title">
      <div className="frame">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-10">
            <span className="kicker" data-reveal>
              {ui.kickers.build}
            </span>
            <Split as="h2" id="cap-title" text={builds.title} className="t-display mt-6 [&_.em]:text-signal-hot" />
          </div>
        </div>

        <div ref={grid} className="cap-grid mt-14 grid gap-3 md:mt-20 md:grid-cols-2 lg:grid-cols-12">
          {builds.items.map((c, i) => {
            const Viz = CAP_VISUALS[i];
            return (
              <article
                key={c.name}
                onPointerMove={spot}
                data-reveal
                style={{ ['--d' as string]: `${(i % 3) * 90}ms` }}
                className={`cap-card relative overflow-hidden rounded-[22px] border border-[var(--line)] bg-ink-850 p-6 md:p-7 ${SPANS[i]}`}
              >
                <div className="relative h-[140px]" aria-hidden="true">
                  <Viz />
                </div>
                <h3 className="relative mt-7 text-[clamp(23px,2vw,30px)] leading-[1.05] tracking-[-0.03em]">{c.name}</h3>
                <p className="relative mt-3 t-body text-ash">{c.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-20 md:mt-28" data-reveal>
        <div className="frame mb-6 label">{builds.stackLabel}</div>
        <div className="marquee" style={{ ['--dur' as string]: '55s' }}>
          {[0, 1].map((k) => (
            <div key={k} className="marquee-track" aria-hidden={k === 1 || undefined}>
              {builds.stack.map((s) => (
                <span key={s} className="flex items-center gap-[var(--gap)] whitespace-nowrap text-[clamp(28px,3.4vw,52px)] tracking-[-0.04em] text-bone-dim">
                  {s}
                  <span className="h-2 w-2 rounded-full bg-signal/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
