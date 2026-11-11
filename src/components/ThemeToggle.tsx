import { MouseEvent, useEffect, useState } from 'react';
import { useT } from '../content';
import { getTheme, onTheme, setTheme, Theme } from '../lib/theme';

/** Dark is the brand. White is the option. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { ui } = useT();
  const [theme, set] = useState<Theme>('dark');
  useEffect(() => {
    set(getTheme());
    return onTheme(set);
  }, []);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const go = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };
  return (
    <button type="button" onClick={go} aria-label={next === 'light' ? ui.theme.toLight : ui.theme.toDark} title={next === 'light' ? ui.theme.toLight : ui.theme.toDark} className={`theme-toggle ${className}`} data-mode={theme}>
      <span className="theme-knob" aria-hidden="true" />
    </button>
  );
}
