import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../content';
import { Split } from '../components/Split';
import { onScrollFrame, useScrollProgress } from '../lib/scroll';
import { clamp } from '../lib/env';
import { ArrowUpRight } from '../components/Icons';
import { CaseMini } from '../components/CaseMinis';

/**
 * A list of results beside a live view of the system behind each one. Whichever
 * row sits in the middle of the screen owns the view; hovering a row takes over.
 */
export function Results() {
  const { t, href } = useLocale();
  const { results, ui } = t;
  const list = useRef<HTMLOListElement>(null);
  const section = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = results.cases;

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const rows = Array.from(el.children) as HTMLElement[];
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      let best = 0;
      let dist = Infinity;
      rows.forEach((row, i) => {
        const b = row.getBoundingClientRect();
        const d = Math.abs((b.top + b.bottom) / 2 - vh / 2);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    });
  }, []);

  // The proof comes up into daylight: the one chapter on paper.
  useScrollProgress(
    section,
    (_, el) => {
      const k = clamp(1 - el.getBoundingClientRect().top / window.innerHeight);
      if (sheet.current) sheet.current.style.transform = `translate3d(0, ${((1 - k) * 90).toFixed(1)}px, 0) scale(${(0.93 + k * 0.07).toFixed(4)})`;
    },
    'through',
  );

  return (
    <section ref={section} id="results" className="relative bg-ink" aria-labelledby="results-title">
      <div ref={sheet} className="paper origin-top rounded-[32px] py-28 will-change-transform md:rounded-[44px] md:py-36">
      <div className="frame">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="kicker" data-reveal>
              {ui.kickers.results}
            </span>
            <Split as="h2" id="results-title" text={results.title} className="t-display mt-6 [&_.em]:text-signal-hot" />
          </div>
          <p className="t-lead text-bone-dim md:col-span-4 md:col-start-9 md:self-end" data-reveal>
            {results.sub}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <ol ref={list} className="lg:col-span-7">
            {items.map((c, i) => {
              const on = active === i;
              return (
                <li key={c.id} className="border-t border-[var(--line)] last:border-b" onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}>
                  <Link to={href(`/work#${c.id}`)} viewTransition className="group block py-7 md:py-9">
                    <div className="mb-5 h-[430px] lg:hidden" data-reveal="fade">
                      <CaseMini id={c.id} />
                    </div>
                    <div className="flex items-baseline justify-between gap-6">
                      <span
                        className={`text-[clamp(50px,6.4vw,104px)] font-light leading-[0.95] tracking-[-0.055em] transition-colors duration-700 ${on ? 'text-signal-hot' : 'text-bone'}`}
                      >
                        {c.metric}
                      </span>
                      <span className="label text-right">{c.metricLabel}</span>
                    </div>
                    <h3 className="mt-4 text-[clamp(21px,2vw,30px)] leading-[1.08] tracking-[-0.03em]">{c.headline}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 t-body text-ash">
                      <span>{c.system}</span>
                      <span aria-hidden="true" className="text-ash">·</span>
                      <span>{c.context}</span>
                      <span aria-hidden="true" className="text-ash">·</span>
                      <span>{c.timeline}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+24px)]">
              <div className="relative h-[min(58vh,450px)]">
                {items.map((c, i) => (
                  <div
                    key={c.id}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${active === i ? 'is-in' : ''}`}
                    style={{ opacity: active === i ? 1 : 0, transform: active === i ? 'none' : 'translate3d(0,16px,0)' }}
                  >
                    <CaseMini id={c.id} />
                  </div>
                ))}
              </div>
              <div key={active} className="stage-in mt-5">
                <p className="t-body text-bone-dim md:text-[15.5px]">{items[active].story}</p>
                <p className="mt-3 label text-signal-hot">{items[active].extras.join('  ·  ')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5" data-reveal>
          <p className="label">{results.note}</p>
          <Link to={href('/work')} viewTransition className="group inline-flex items-center gap-2 text-[15px]">
            <span className="ulink">{ui.work.all}</span>
            <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
