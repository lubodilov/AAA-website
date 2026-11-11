import { MouseEvent, useEffect, useState } from 'react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Locale, loadLocale, swapLocale, useLocale } from '../content';
import { useUI } from './UI';
import { lockScroll, onScrollFrame, scrollToTarget } from '../lib/scroll';

export function useHashNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (href: string, e?: MouseEvent) => {
    const [path, hash] = href.split('#');
    if (!hash) return;
    e?.preventDefault();
    if (pathname === (path || '/')) scrollToTarget(`#${hash}`);
    else navigate(`${path || '/'}#${hash}`);
  };
}

/** The same page in the other language, fetched first so nothing flashes. */
export function LangSwitch({ className = '', full = false }: { className?: string; full?: boolean }) {
  const { t, locale } = useLocale();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const h = t.ui.header;
  const other: Locale = locale === 'en' ? 'bg' : 'en';
  const to = swapLocale(pathname, hash);
  const warm = () => void loadLocale(other);
  const go = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    void loadLocale(other).then(() => navigate(to));
  };
  return (
    <Link to={to} hrefLang={other} lang={other} aria-label={h.langLabel} className={className} onClick={go} onPointerEnter={warm} onFocus={warm}>
      {full ? h.langLabel : h.lang}
    </Link>
  );
}

export function Header() {
  const { t, href } = useLocale();
  const { nav, site } = t;
  const h = t.ui.header;
  const { open, warm } = useUI();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const go = useHashNav();
  const { pathname } = useLocation();

  useEffect(() => onScrollFrame(() => {
    const hero = document.querySelector('.hero-track');
    setSolid(hero ? hero.getBoundingClientRect().bottom < window.innerHeight + 8 : window.scrollY > 12);
  }), []);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    lockScroll(menu);
  }, [menu]);

  const item = (n: { label: string; href: string }, cls: string) =>
    n.href.includes('#') ? (
      <a key={n.href} href={n.href} className={cls} onClick={(e) => { go(n.href, e); setMenu(false); }}>
        {n.label}
      </a>
    ) : (
      <Link key={n.href} to={n.href} className={cls}>
        {n.label}
      </Link>
    );

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || menu ? 'border-b border-[var(--line)] bg-ink/90 backdrop-blur-md' : 'border-b border-transparent'}`}>
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link to={href('/')} aria-label={`${site.name}: ${h.homeAria}`}>
            <Logo />
          </Link>
          <nav aria-label={h.menu} className="hidden items-center gap-9 md:flex">
            {nav.map((n) => item(n, 'text-[15.5px] transition-colors hover:text-char'))}
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden md:inline-flex">
              <ThemeToggle />
            </span>
            <LangSwitch className="hidden min-h-[44px] items-center px-1 text-[15px] text-char-2 transition-colors hover:text-char md:inline-flex" />
            <button type="button" className="inline-flex min-h-[44px] items-center px-1 text-[15px] font-medium md:hidden" onClick={() => open('booking')} onPointerEnter={warm}>
              {h.bookCall}
            </button>
            <span className="hidden md:inline-flex" onPointerEnter={warm} onFocus={warm}>
              <Button size="sm" onClick={() => open('booking')}>
                {h.bookCall}
              </Button>
            </span>
            <button type="button" className="inline-flex min-h-[44px] items-center px-1 text-[15px] md:hidden" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
              {menu ? h.close : h.menu}
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col bg-paper pt-[calc(var(--header-h)+24px)] md:hidden" data-lenis-prevent>
          <nav aria-label={h.menu} className="wrap flex flex-col">
            {[{ label: h.home, href: href('/') }, ...nav].map((n) => (
              <div key={n.href} className="border-b border-[var(--rule)] py-4">
                {item(n, 'serif text-[34px] leading-tight')}
              </div>
            ))}
          </nav>
          <div className="wrap mt-auto pb-8">
            <div className="mb-5 flex items-center justify-between">
              <span onClickCapture={() => setMenu(false)}>
                <LangSwitch full className="inline-flex min-h-[44px] items-center text-[17px]" />
              </span>
              <ThemeToggle />
            </div>
            <Button className="w-full justify-center" onClick={() => { setMenu(false); open('booking'); }}>
              {h.bookCall}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
