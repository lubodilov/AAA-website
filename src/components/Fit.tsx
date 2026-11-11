import { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Renders children at a fixed design width and scales the whole thing to the
 * container, so a product screen always fills its frame at the right proportions.
 */
export function Fit({ base = 780, children }: { base?: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ s: number; d: number; h: number } | null>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w) return;
      const design = w < 520 ? Math.min(base, 420) : base;
      const s = Math.min(w / design, 1.8);
      setBox({ s, d: design, h: h / s });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [base]);

  return (
    <div ref={outer} className="relative h-full w-full">
      <div
        className="h-full w-full"
        style={box ? { width: box.d, height: box.h, transform: `scale(${box.s})`, transformOrigin: '0 0' } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
