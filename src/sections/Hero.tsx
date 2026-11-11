import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../content';
import { Button } from '../components/Button';
import { Split } from '../components/Split';
import { useUI } from '../components/UI';
import type { StairStage } from '../lib/stairs';
import { TOTAL } from '../lib/heroTimeline';
import { scrollToTarget, useScrollProgress } from '../lib/scroll';
import { clamp, prefersReducedMotion } from '../lib/env';
import { getTheme, onTheme } from '../lib/theme';

/** When each piece of copy is on stage: [in start, in end, out start, out end]. */
const WINDOWS: [number, number, number, number][] = [
  [-1, -0.5, 0.2, 0.34],
  [0.36, 0.46, 0.62, 0.72],
  [0.74, 0.84, 1.14, 1.26],
  [1.3, 1.44, 2.02, 2.14],
  [2.2, 2.36, 2.94, 3.06],
  [3.42, 3.62, 9, 10],
];

const sentences = (text: string) => text.replace(/([.!?])\s+/g, '$1\n').split('\n');

/**
 * An impossible staircase, seen from the one angle where it closes into a loop.
 * Light runs around it forever. Scroll, and the view moves.
 */
export function Hero() {
  const { t, href } = useLocale();
  const { hero } = t;
  const ui = useUI();
  const track = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const stage = useRef<StairStage | null>(null);
  const beats = useRef<(HTMLDivElement | null)[]>([]);
  const gap = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const pRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setFallback(true);
      return;
    }
    const c = canvas.current!;
    let disposed = false;
    let visible = true;

    const paint = (S: number, gx: number, gy: number) => {
      beats.current.forEach((el, i) => {
        if (!el) return;
        const [a, b, d, e] = WINDOWS[i];
        const inn = clamp((S - a) / (b - a));
        const out = 1 - clamp((S - d) / (e - d));
        const o = Math.min(inn, out);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - inn) * 26 - (1 - out) * 26).toFixed(1)}px, 0)`;
        el.style.visibility = o < 0.004 ? 'hidden' : 'visible';
        el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      });
      if (gap.current) {
        const k = clamp((S - 1.4) / 0.12) * (1 - clamp((S - 2.1) / 0.1));
        gap.current.style.opacity = k.toFixed(3);
        if (k > 0) gap.current.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
      }
      if (hint.current) {
        const k = 1 - clamp(S / 0.2);
        hint.current.style.opacity = k.toFixed(3);
        hint.current.style.visibility = k < 0.01 ? 'hidden' : 'visible';
      }
    };

    // On a phone, the staircase gets exactly the space the words leave it.
    const measure = () => {
      const s = stage.current;
      const box = copy.current;
      if (!s || !box) return;
      const view = c.getBoundingClientRect();
      const head = document.querySelector('header')?.offsetHeight ?? 64;
      const rect = box.getBoundingClientRect();
      const tops = beats.current.map((b) => rect.top - view.top + (b?.offsetTop ?? 0));
      s.setFit(
        (head + 8) / view.height,
        (tops[0] - 14) / view.height,
        (Math.min(...tops.slice(1)) - 6) / view.height,
        0.43,
        (tops[5] - 14) / view.height,
      );
    };
    const ro = new ResizeObserver(measure);
    beats.current.forEach((b) => b && ro.observe(b));

    const init = async () => {
      const { StairStage: Stage } = await import('../lib/stairs');
      if (disposed) return;
      const s = await Stage.create(c);
      if (disposed) {
        s?.destroy();
        return;
      }
      if (!s) {
        setFallback(true);
        return;
      }
      stage.current = s;
      s.onFrame = paint;
      s.setTheme(getTheme() === 'light');
      s.setProgress(pRef.current);
      measure();
      setReady(true);
      if (visible) s.play();
    };

    const offTheme = onTheme((th) => stage.current?.setTheme(th === 'light'));

    const hasIdle = typeof window.requestIdleCallback === 'function';
    let idleId = 0;
    const schedule = () => {
      idleId = hasIdle ? window.requestIdleCallback(() => void init(), { timeout: 500 }) : window.setTimeout(() => void init(), 80);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      if (visible) stage.current?.play();
      else stage.current?.pause();
    });
    io.observe(c);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') stage.current?.setPointer(e.clientX, e.clientY);
    };
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        stage.current?.resize();
        measure();
      }, 140);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      disposed = true;
      offTheme();
      window.removeEventListener('load', schedule);
      if (hasIdle) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      stage.current?.destroy();
      stage.current = null;
    };
  }, []);

  useScrollProgress(track, (p) => {
    pRef.current = p;
    stage.current?.setProgress(p);
  });

  const set = (i: number) => (el: HTMLDivElement | null) => {
    beats.current[i] = el;
  };

  const lines = (text: string, mode: 'intro' | 'none' = 'none') => {
    let offset = 0;
    return sentences(text).map((l) => {
      const node = (
        <span key={l}>
          <Split text={l} as="span" mode={mode} offset={offset} className="block" />{' '}
        </span>
      );
      offset += l.split(/\s+/).length;
      return node;
    });
  };

  const actions = (
    <div className="flex flex-wrap items-center gap-3">
      <span onPointerEnter={ui.warm} onFocus={ui.warm}>
        <Button onClick={() => ui.open('booking')}>{hero.primary}</Button>
      </span>
      <Button to={href('/work')} variant="ghost">
        {hero.secondary}
      </Button>
    </div>
  );

  if (fallback) {
    return (
      <section className="hero-track relative bg-ink" aria-labelledby="hero-title">
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="frame relative grid items-center gap-10 pb-20 pt-[calc(var(--header-h)+48px)] md:grid-cols-2">
          <div>
            <span className="kicker">{hero.descriptor}</span>
            <h1 id="hero-title" className="hero-h1 mt-6 [&_.em]:text-signal-hot">{lines(hero.h1)}</h1>
            <p className="mt-6 max-w-[46ch] t-lead text-bone-dim">{hero.sub}</p>
            <div className="mt-8">{actions}</div>
          </div>
          <div>
            <img src="/img/stairs-dark.webp" alt="" width={1400} height={1378} className="theme-dark-only w-full" style={{ mixBlendMode: 'screen' }} />
            <img src="/img/stairs.webp" alt="" width={1400} height={1465} className="theme-light-only w-full" />
          </div>
        </div>
        <div className="frame relative grid gap-10 pb-20 md:grid-cols-3">
          {hero.beats.filter((b) => b.sub).map((b) => (
            <div key={b.line}>
              <h2 className="t-h3 [&_.em]:text-signal-hot">{lines(b.line)}</h2>
              <p className="mt-3 t-body text-bone-dim">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={track} className="hero-track relative" style={{ height: `${TOTAL * 64 + 100}vh` }} aria-labelledby="hero-title">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <canvas
          ref={canvas}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        />
        <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0" />

        <div className="frame relative flex h-full flex-col justify-end pb-[max(24px,4.4vh)]">
          <div ref={copy} className="hero-copy [&_.em]:text-signal-hot">
            <div ref={set(0)} className="beat" style={{ opacity: 1 }}>
              <div className="hero-fade mb-5 hidden md:mb-7 md:block" style={{ ['--d' as string]: '200ms' }}>
                <span className="kicker">{hero.descriptor}</span>
              </div>
              <h1 id="hero-title" className="hero-h1">{lines(hero.h1, 'intro')}</h1>
              <div className="hero-fade" style={{ ['--d' as string]: '620ms' }}>
                <p className="mt-5 max-w-[50ch] t-lead text-bone-dim md:mt-7">{hero.sub}</p>
              </div>
            </div>
            <div ref={set(1)} className="beat">
              <p className="hero-h1">{lines(hero.beats[0].line)}</p>
            </div>
            <div ref={set(2)} className="beat">
              <p className="hero-h1">{lines(hero.beats[1].line)}</p>
            </div>
            {hero.beats.slice(2).map((b, i) => (
              <div key={b.line} ref={set(i + 3)} className="beat">
                <p className="hero-h2">{lines(b.line)}</p>
                <p className="mt-5 max-w-[48ch] t-lead text-bone-dim">{b.sub}</p>
              </div>
            ))}
          </div>
          <div className="relative z-[1] mt-7 flex items-end justify-between gap-6 md:mt-9">
            <div className="hero-fade" style={{ ['--d' as string]: '850ms' }}>
              {actions}
            </div>
            <div ref={hint} className="hidden items-center gap-6 label md:flex">
              <span>{hero.cue}</span>
              <button type="button" className="ulink" onClick={() => scrollToTarget('#after-hero')}>
                {hero.skip}
              </button>
            </div>
          </div>
        </div>

        <div ref={gap} className="pointer-events-none absolute left-0 top-0" style={{ opacity: 0 }} aria-hidden="true">
          <span className="absolute bottom-3 left-0 h-14 w-px bg-bone" />
          <span className="absolute bottom-[56px] right-full mr-2 whitespace-nowrap label !text-bone">{hero.gap}</span>
        </div>
      </div>
    </section>
  );
}
