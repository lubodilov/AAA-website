import { useRef } from 'react';
import { parseEm } from './Split';
import { useScrollProgress } from '../lib/scroll';
import { clamp } from '../lib/env';

/** A sentence that lights up word by word as it passes through the screen. */
export function LitText({ text, className = '' }: { text: string; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  let n = 0;
  const parts = parseEm(text).flatMap(([chunk, em]) => chunk.split(/\s+/).filter(Boolean).map((w) => ({ w, em, i: n++ })));

  useScrollProgress(
    root,
    (p) => {
      const t = clamp((p - 0.2) / 0.42) * (n + 2);
      words.current.forEach((el, i) => {
        if (el) el.style.opacity = (0.4 + clamp(t - i) * 0.6).toFixed(3);
      });
    },
    'through',
  );

  return (
    <p ref={root} className={className}>
      {parts.map(({ w, em, i }) => (
        <span key={i} ref={(el) => (words.current[i] = el)} className={`lit-w ${em ? 'em text-signal-hot' : ''}`}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
