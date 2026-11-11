export type Theme = 'dark' | 'light';

const KEY = 'uv-theme';
const listeners = new Set<(t: Theme) => void>();

export const getTheme = (): Theme => (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

export function onTheme(fn: (t: Theme) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function commit(t: Theme) {
  const root = document.documentElement;
  if (t === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f4f1eb' : '#0a0908');
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* private mode: the choice just won't be remembered */
  }
  listeners.forEach((f) => f(t));
}

/** Switch theme; where the browser allows it, the new theme opens outward from the button that was pressed. */
export function setTheme(t: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    commit(t);
    return;
  }
  root.style.setProperty('--vt-x', `${origin?.x ?? window.innerWidth}px`);
  root.style.setProperty('--vt-y', `${origin?.y ?? 0}px`);
  root.classList.add('vt-theme');
  doc.startViewTransition(() => commit(t)).finished.finally(() => root.classList.remove('vt-theme'));
}
