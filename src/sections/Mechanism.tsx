import { useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '../content';
import { Split } from '../components/Split';
import { prefersReducedMotion } from '../lib/env';

const fill = (s: string, map: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(map[k]));

const BASE = 366;
const STEP = 200;
const DX = 46;
const DY = -30;
const tall = (cap: number) => 30 * Math.sqrt(cap);

/** Five blocks standing side by side: the company as a staircase, at the height of what each step can carry. */
function Treads({ heights, hot, out }: { heights: number[]; hot: number; out: number | null }) {
  const line = out === null ? 0 : BASE - tall(out);
  return (
    <svg viewBox={`0 0 ${STEP * 5 + DX} ${BASE + 2}`} className="block h-auto w-full" aria-hidden="true">
      {heights.map((v, i) => {
        const x = i * STEP + 5;
        const y = BASE - tall(v);
        const r = x + STEP - 10;
        const on = i === hot;
        return (
          <g key={i}>
            <polygon points={`${r},${y} ${r},${BASE} ${r + DX},${BASE + DY} ${r + DX},${y + DY}`} className={on ? 'tr-side is-hot' : 'tr-side'} />
            <rect x={x} y={y} width={STEP - 10} height={tall(v)} className={on ? 'tr-front is-hot' : 'tr-front'} />
            <polygon points={`${x},${y} ${r},${y} ${r + DX},${y + DY} ${x + DX},${y + DY}`} className={on ? 'tr-top is-hot' : 'tr-top'} />
          </g>
        );
      })}
      {out !== null && <line x1="0" x2={STEP * 5} y1={line} y2={line} className="tr-line" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />}
    </svg>
  );
}

/** The whole theory in thirty seconds: make any step faster and watch what happens. */
export function Mechanism() {
  const { mechanism: m, ui } = useT();
  const d = m.demo;
  const [boost, setBoost] = useState<number[]>([]);
  const [msg, setMsg] = useState(d.start);

  const caps = useMemo(() => d.stages.map((s, i) => (boost.includes(i) ? s.cap * 3 : s.cap)), [boost, d.stages]);
  const out = Math.min(...caps);
  const slowest = caps.indexOf(out);

  // Before the first click every step looks the same, the way it does from the corner office.
  const seen = boost.length > 0;
  const target = useMemo(() => (seen ? caps : caps.map(() => 26)), [seen, caps]);
  const [drawn, setDrawn] = useState(target);
  const now = useRef(target);
  useEffect(() => {
    if (prefersReducedMotion()) {
      now.current = target;
      setDrawn(target);
      return;
    }
    let raf = 0;
    const step = () => {
      let moving = false;
      now.current = now.current.map((v, i) => {
        const gap = target[i] - v;
        if (Math.abs(gap) < 0.05) return target[i];
        moving = true;
        return v + gap * 0.14;
      });
      setDrawn(now.current);
      if (moving) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const add = (i: number) => {
    if (boost.includes(i)) return;
    const was = Math.min(...caps);
    const nextCaps = caps.map((c, k) => (k === i ? c * 3 : c));
    const next = Math.min(...nextCaps);
    const nextBoost = [...boost, i];
    setBoost(nextBoost);
    if (nextBoost.length === d.stages.length) setMsg(d.done);
    else if (next === was) setMsg(fill(d.wasted, { stage: d.stages[i].name, cap: nextCaps[i], out: next }));
    else setMsg(fill(d.hit, { old: was, out: next, next: d.stages[nextCaps.indexOf(next)].name }));
  };
  const reset = () => {
    setBoost([]);
    setMsg(d.start);
  };

  return (
    <section id="mechanism" className="relative overflow-hidden bg-ink py-28 md:py-40" aria-labelledby="mech-title">
      <div aria-hidden="true" className="mech-glow pointer-events-none absolute inset-0" />
      <div className="frame relative">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="kicker" data-reveal>
              {ui.kickers.cause}
            </span>
            <Split as="h2" id="mech-title" text={m.title} className="t-display mt-6 [&_.em]:text-signal-hot" />
          </div>
          <div className="space-y-5 md:col-span-4 md:col-start-9 md:self-end" data-reveal style={{ ['--d' as string]: '200ms' }}>
            {m.body.map((p) => (
              <p key={p} className="t-lead text-bone-dim">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-y-8 rounded-[24px] border border-[var(--line)] bg-ink-850 p-6 md:mt-24 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-10 md:p-11" data-reveal>
          <h3 className="t-h3 md:col-span-4">{d.title}</h3>

          <div className="min-w-0 md:col-span-8 md:col-start-5 md:row-span-2">
            <Treads heights={drawn} hot={seen ? slowest : -1} out={seen ? out : null} />
            <div className="mt-4 grid grid-cols-5 pr-[4.4%]">
              {d.stages.map((s, i) => {
                const on = boost.includes(i);
                const hot = boost.length > 0 && i === slowest;
                return (
                  <div key={s.name} className="min-w-0 pr-1 md:pr-2">
                    <p className="text-[11px] font-medium leading-tight [overflow-wrap:anywhere] md:text-[15px]">{s.name}</p>
                    <p className={`text-[25px] font-light leading-tight tabular-nums tracking-[-0.04em] md:text-[38px] ${hot ? 'text-signal-hot' : ''}`}>{seen ? caps[i] : '?'}</p>
                    <button
                      type="button"
                      onClick={() => add(i)}
                      aria-disabled={on}
                      aria-pressed={on}
                      className={`mt-2 min-h-[44px] w-full border px-0.5 text-[11.5px] leading-tight transition-colors md:text-[15px] ${on ? 'cursor-default border-transparent text-ash' : 'rounded-full border-[var(--line-strong)] hover:border-signal hover:bg-signal hover:text-white'}`}
                    >
                      {on ? d.added : d.add}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-4 md:row-start-2">
            <p className="label">{d.output}</p>
            <p className="mt-3 text-[clamp(4.4rem,8vw,7.6rem)] font-light leading-[0.9] tabular-nums tracking-[-0.05em]">{out}</p>
            <p className="mt-5 text-[19px] leading-snug tracking-[-0.015em] text-bone" aria-live="polite">
              {msg}
            </p>
            <div className="mt-5 flex items-baseline gap-6">
              {boost.length > 0 && (
                <button type="button" onClick={reset} className="ulink inline-flex min-h-[44px] items-center">
                  {d.reset}
                </button>
              )}
              <p className="label">{d.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
