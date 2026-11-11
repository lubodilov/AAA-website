import { createElement, Fragment, ReactNode } from 'react';

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Delay in ms before the first word animates. */
  delay?: number;
  /** Start index offset for staggering across several Split blocks. */
  offset?: number;
  /** 'scroll' reveals when in view; 'intro' plays on first paint (hero); 'none' renders plain words. */
  mode?: 'scroll' | 'intro' | 'none';
  id?: string;
};

/** Parses "*emphasis*" segments and returns [text, isEm][] */
export function parseEm(text: string): [string, boolean][] {
  const out: [string, boolean][] = [];
  text.split('*').forEach((chunk, i) => {
    if (chunk) out.push([chunk, i % 2 === 1]);
  });
  return out;
}

/** Inline render of *emphasis* without word splitting. */
export function Em({ text }: { text: string }) {
  return (
    <>
      {parseEm(text).map(([t, em], i) =>
        em ? (
          <span key={i} className="em">
            {t}
          </span>
        ) : (
          <Fragment key={i}>{t}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Splits text into masked words for line-by-line reveals. SSR-safe: the split
 * happens at render time, so text is in the HTML and readable without JS.
 */
export function Split({ text, as = 'span', className = '', delay = 0, offset = 0, mode = 'scroll', id }: Props) {
  let i = offset;
  const segments = parseEm(text);
  const children: ReactNode[] = [];

  segments.forEach(([chunk, em], si) => {
    const words = chunk.split(/(\s+)/);
    const nodes: ReactNode[] = [];
    words.forEach((w, wi) => {
      if (!w) return;
      if (/^\s+$/.test(w)) {
        nodes.push(' ');
        return;
      }
      nodes.push(
        <span className={`sw${em ? ' is-em' : ''}`} key={`${si}-${wi}`}>
          <span className="sw-i" style={{ ['--i' as string]: i++ }}>
            {w}
          </span>
        </span>,
      );
    });
    children.push(
      em ? (
        <span className="em" key={si}>
          {nodes}
        </span>
      ) : (
        <Fragment key={si}>{nodes}</Fragment>
      ),
    );
  });

  return createElement(
    as,
    {
      id,
      className: `split ${mode === 'intro' ? 'hero-intro' : mode === 'none' ? 'split-static' : ''} ${className}`,
      'data-split': mode === 'scroll' ? '' : undefined,
      style: delay ? { ['--d' as string]: `${delay}ms` } : undefined,
    },
    children,
  );
}
