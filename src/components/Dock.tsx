import { useEffect, useRef, useState } from 'react';
import { useT } from '../content';
import { useUI } from './UI';
import { getLenis, onScrollFrame, scrollToTarget } from '../lib/scroll';
import { clamp } from '../lib/env';

/**
 * A small navigator that appears once the hero is done: where you are in the
 * story, how far along, and the call to action, always within reach.
 */
export function Dock() {
  const { chapters, ui: copy } = useT();
  const { open, warm } = useUI();
  const root = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let tops: number[] = [];
    let start = 0;
    let end = 0;
    let shown = false;
    let cur = 0;

    const measure = () => {
      const y = window.scrollY;
      tops = chapters.map((c) => {
        const el = document.getElementById(c.id);
        return el ? el.getBoundingClientRect().top + y : 0;
      });
      const cta = document.getElementById('cta-title');
      end = cta ? cta.getBoundingClientRect().top + y - window.innerHeight * 0.7 : document.body.scrollHeight;
      const hero = document.querySelector('.hero-track');
      start = hero ? hero.getBoundingClientRect().bottom + y - window.innerHeight * 0.55 : 0;
    };

    const update = () => {
      const y = window.scrollY;
      const probe = y + window.innerHeight * 0.4;
      const show = y > start && y < end;
      if (show !== shown) {
        shown = show;
        if (root.current) root.current.dataset.show = String(show);
      }
      let idx = 0;
      tops.forEach((t, i) => {
        if (probe >= t) idx = i;
      });
      if (idx !== cur) {
        cur = idx;
        setCurrent(idx);
      }
      tops.forEach((t, i) => {
        const next = i + 1 < tops.length ? tops[i + 1] : end + window.innerHeight * 0.3;
        const el = fills.current[i];
        if (el) el.style.transform = `scaleX(${clamp((probe - t) / Math.max(1, next - t)).toFixed(3)})`;
      });
    };

    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);
    const off = onScrollFrame(update);
    return () => {
      ro.disconnect();
      off();
    };
  }, [chapters]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (getLenis()) scrollToTarget(el.getBoundingClientRect().top + window.scrollY);
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={root} className="dock hidden md:block" data-show="false">
      <nav aria-label={copy.dock.label} className="flex items-center gap-4 rounded-full border border-[var(--line-strong)] bg-ink-850/95 py-1.5 pl-5 pr-1.5">
        <span key={current} className="dock-in w-[132px] truncate label text-bone" aria-live="polite">
          <span className="text-signal">0{current + 1}</span> {chapters[current].label}
        </span>
        <ol className="flex w-[210px] gap-1.5">
          {chapters.map((c, i) => (
            <li key={c.id} className="flex-1">
              <button type="button" onClick={() => go(c.id)} aria-label={c.label} aria-current={i === current ? 'step' : undefined} className="group block w-full py-3" data-cursor="hover">
                <span className="relative block h-[3px] overflow-hidden rounded bg-[var(--line-strong)] transition-colors group-hover:bg-bone/40">
                  <span ref={(el) => (fills.current[i] = el)} className="absolute inset-0 origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => open('booking')} onPointerEnter={warm} onFocus={warm} className="whitespace-nowrap rounded-full bg-signal px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-bone" data-cursor="hover">
          {copy.dock.book}
        </button>
      </nav>
    </div>
  );
}
