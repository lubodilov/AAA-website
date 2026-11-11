import Lenis from 'lenis';
import { RefObject, useEffect, useRef } from 'react';
import { clamp, isBrowser, prefersReducedMotion } from './env';

/* ------------------------------------------------------------------ */
/* One clock for all motion. Every frame, in this order: Lenis moves    */
/* the page, scroll-linked scenes read the new position, then canvases  */
/* draw. Nothing can ever be a frame behind anything else.              */
/* ------------------------------------------------------------------ */

let lenis: Lenis | null = null;
type Listener = () => void;
type FrameFn = (now: number) => void;
const listeners = new Set<Listener>();
const frameFns = new Set<FrameFn>();
let raf = 0;
let lastY = NaN;
let dirty = true;

function tick(now: number) {
  lenis?.raf(now);
  const y = window.scrollY;
  if (y !== lastY || dirty) {
    lastY = y;
    dirty = false;
    listeners.forEach((fn) => fn());
  }
  frameFns.forEach((fn) => fn(now));
  raf = requestAnimationFrame(tick);
}

/** Ask every scroll-linked scene to re-measure on the next frame. */
export function invalidateScroll() {
  dirty = true;
}

/** Run on the shared clock, after the page has moved for this frame. */
export function addFrame(fn: FrameFn) {
  frameFns.add(fn);
  return () => {
    frameFns.delete(fn);
  };
}

export function startSmoothScroll() {
  if (!isBrowser || raf) return;
  window.addEventListener('resize', invalidateScroll, { passive: true });
  document.addEventListener('visibilitychange', invalidateScroll);
  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.3,
    });
  }
  raf = requestAnimationFrame(tick);
}

export function getLenis() {
  return lenis;
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  if (!isBrowser) return;
  const el = typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
  if (el === null) return;
  if (lenis) {
    // A page change may have made the document longer than the scroller last measured.
    lenis.resize();
    lenis.scrollTo(el as HTMLElement | number, { duration: immediate ? 0 : 1.6, immediate, offset: 0 });
  } else if (typeof el === 'number') {
    window.scrollTo({ top: el, behavior: immediate ? 'auto' : 'smooth' });
  } else {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function onScrollFrame(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Calls `onProgress(p)` with 0..1 as the element scrolls through the viewport.
 * mode 'sticky': 0 when the top hits the top of the viewport, 1 when the bottom
 * hits the bottom (for tall sections with a sticky child).
 * mode 'through': 0 when the top enters at the bottom, 1 when the bottom leaves at the top.
 * Runs imperatively — no React re-render per frame.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  onProgress: (p: number, el: HTMLElement) => void,
  mode: 'sticky' | 'through' | 'enter' = 'sticky',
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let active = false;
    let last = -1;

    const measure = () => {
      if (!active) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'sticky') p = -r.top / Math.max(1, r.height - vh);
      else if (mode === 'enter') p = (vh - r.top) / Math.max(1, r.height);
      else p = (vh - r.top) / (r.height + vh);
      p = clamp(p);
      if (p !== last) {
        last = p;
        cb.current(p, el);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) measure();
      },
      { rootMargin: '20% 0px 20% 0px' },
    );
    io.observe(el);
    const off = onScrollFrame(measure);
    // initial
    active = true;
    measure();
    const r = el.getBoundingClientRect();
    active = r.bottom > -window.innerHeight * 0.2 && r.top < window.innerHeight * 1.2;
    return () => {
      io.disconnect();
      off();
    };
  }, [ref, mode]);
}
