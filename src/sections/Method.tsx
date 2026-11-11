import { useEffect, useRef, useState } from 'react';
import { useT } from '../content';
import { useUI } from '../components/UI';
import { Button } from '../components/Button';
import { Split } from '../components/Split';
import { GraphTip, OrgGraph } from '../lib/orgGraph';
import { scrollToTarget, useScrollProgress } from '../lib/scroll';
import { clamp, prefersReducedMotion } from '../lib/env';

// The map's six movements, told as the four things we do.
const PHASES = 6;
const SPANS: [number, number][] = [
  [0, 3],
  [3, 4],
  [4, 5],
  [5, 6],
];
const stepAt = (P: number) => SPANS.findIndex(([, b]) => P < b);

export function Method() {
  const { method, graph: graphCopy, ui, finalCta } = useT();
  const N = method.steps.length;
  const cta = useUI();
  const track = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const graph = useRef<OrgGraph | null>(null);
  const bar = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const activeRef = useRef(0);
  const [tip, setTip] = useState<GraphTip | null>(null);

  useEffect(() => {
    const c = canvas.current!;
    const g = new OrgGraph(c, prefersReducedMotion(), graphCopy);
    graph.current = g;
    g.onFrame = (P) => {
      const idx = Math.max(0, stepAt(P));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
      const ph = Math.min(PHASES - 1, Math.floor(P));
      if (ph !== phaseRef.current) {
        phaseRef.current = ph;
        setPhase(ph);
      }
      panels.current.forEach((el, i) => {
        if (!el) return;
        const [a, b] = SPANS[i];
        const d = P < a ? P - a : P > b ? P - b : 0;
        const dist = i === 0 ? Math.max(0, d) : i === N - 1 ? Math.max(0, -d) : Math.abs(d);
        const o = 1 - clamp((dist - 0.0) / 0.14);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0, ${(d * -34).toFixed(2)}px, 0)`;
        el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        el.style.visibility = o < 0.004 ? 'hidden' : 'visible';
      });
      fills.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${clamp((P - SPANS[i][0]) / (SPANS[i][1] - SPANS[i][0])).toFixed(3)})`;
      });
    };
    g.resize();
    const ro = new ResizeObserver(() => g.resize());
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? g.start() : g.stop()), { rootMargin: '10% 0px' });
    io.observe(c);
    document.fonts?.ready.then(() => g.resize());
    return () => {
      ro.disconnect();
      io.disconnect();
      g.stop();
      graph.current = null;
    };
  }, []);

  useScrollProgress(track, (p) => {
    graph.current?.setProgress(Math.min(p * PHASES, PHASES - 0.0001));
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const len = el.offsetHeight - window.innerHeight;
    scrollToTarget(top + ((SPANS[i][0] + 0.5) / PHASES) * len);
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    setTip(graph.current?.hit(e.clientX - r.left, e.clientY - r.top) ?? null);
  };

  const caption = method.diagrams[phase];

  return (
    <section id="method" className="relative bg-ink" aria-labelledby="approach-title">
      <div className="frame pt-28 md:pt-40">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="kicker" data-reveal>
              {ui.kickers.method}
            </span>
            <Split as="h2" text={method.title} className="t-display mt-6 [&_.em]:text-signal-hot" id="approach-title" />
          </div>
          <p className="t-lead text-bone-dim md:col-span-4 md:col-start-9 md:self-end" data-reveal style={{ ['--d' as string]: '200ms' }}>
            {method.lead}
          </p>
        </div>
      </div>

      <div ref={track} className="relative" style={{ height: `${PHASES * 70 + 30}vh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <div className="frame grid flex-1 grid-rows-[auto_1fr] gap-4 pb-6 pt-[calc(var(--header-h)+8px)] md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-8 md:pb-10">
            <div className="order-2 flex flex-col md:order-1 md:col-span-4">
              <ol className="mb-5 grid grid-cols-4 gap-1.5 md:mb-10 md:flex md:flex-col md:gap-0" aria-label={ui.approach.stages}>
                {method.steps.map((st, i) => {
                  const state = i < active ? 'done' : i === active ? 'now' : 'next';
                  return (
                    <li key={st.name}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        className="group flex w-full items-center gap-3 py-1.5 text-left md:border-b md:border-[var(--line)] md:py-2.5"
                        aria-current={state === 'now' ? 'step' : undefined}
                      >
                        <span className={`label transition-colors duration-700 ${state === 'now' ? '!text-signal' : state === 'done' ? '!text-bone-dim' : '!text-ash'}`}>
                          0{i + 1}
                        </span>
                        <span
                          className={`hidden text-[15px] tracking-[-0.01em] transition-colors duration-700 md:inline ${state === 'now' ? 'text-bone' : state === 'done' ? 'text-bone-dim' : 'text-ash group-hover:text-bone-dim'}`}
                        >
                          {st.name}
                        </span>
                        <span className="relative ml-auto hidden h-px w-16 overflow-hidden bg-[var(--line)] md:block">
                          <span
                            ref={(el) => (fills.current[i] = el)}
                            className="absolute inset-0 origin-left bg-signal"
                            style={{ transform: 'scaleX(0)' }}
                          />
                        </span>
                        <span className="relative h-[2px] w-full overflow-hidden rounded bg-[var(--line)] md:hidden">
                          <span className="absolute inset-0 origin-left bg-signal" style={{ transform: i <= active ? 'none' : 'scaleX(0)', transition: 'transform .6s var(--ease-out)' }} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="stage-stack">
                {method.steps.map((s, i) => (
                  <div
                    key={s.name}
                    ref={(el) => (panels.current[i] = el)}
                    aria-hidden={i !== active}
                    className="will-change-transform"
                    style={i === 0 ? undefined : { opacity: 0, visibility: 'hidden' }}
                  >
                    <div className="label mb-3 md:mb-4">
                      <span className="text-signal">0{i + 1}</span> / 0{N} · {s.when}
                    </div>
                    <h3 className="text-[clamp(30px,3.4vw,50px)] leading-[0.98] tracking-[-0.04em]">{s.name}</h3>
                    <p className="mt-4 max-w-[42ch] t-body text-bone-dim md:mt-5 md:text-[16px]">{s.body}</p>
                    <div className="mt-5 max-w-[42ch] border-l border-signal pl-4 md:mt-7">
                      <span className="label">{method.youGet}</span>
                      <p className="mt-1 t-body text-bone">{s.get}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <figure className="method-map tone-dark relative order-1 h-[40svh] md:order-2 md:col-span-8 md:h-[78svh]">
              <canvas
                ref={canvas}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                onPointerMove={onMove}
                onPointerLeave={() => setTip(null)}
              />
              <figcaption key={caption} className="stage-in pointer-events-none absolute left-1 top-1 label text-ash">
                {caption}
              </figcaption>
              <span className="pointer-events-none absolute right-1 top-1 hidden label text-ash lg:block">{ui.approach.hover}</span>
              {tip && (
                <div
                  className="graph-tip pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 -translate-y-full rounded-xl border border-[var(--line-strong)] bg-ink-800 px-3.5 py-2.5"
                  style={{ left: tip.x, top: tip.y - 8 }}
                >
                  <div className={`text-[13px] font-semibold ${tip.hot ? 'text-signal-hot' : 'text-bone'}`}>{tip.title}</div>
                  <div className="mt-0.5 text-[12.5px] leading-snug text-bone-dim">{tip.text}</div>
                </div>
              )}
            </figure>
          </div>

          <div className="frame pb-5">
            <div className="h-px w-full bg-[var(--line)]">
              <div ref={bar} className="h-px origin-left bg-bone/60" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="frame pb-10 pt-2 md:pb-16" data-reveal onPointerEnter={cta.warm}>
        <Button onClick={() => cta.open('booking')}>{finalCta.primary}</Button>
      </div>
    </section>
  );
}
