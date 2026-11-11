import { Link } from 'react-router-dom';
import { useLocale } from '../content';
import { useUI } from './UI';
import { LangSwitch } from './Header';
import { Monogram } from './Logo';

export function Footer() {
  const { t, href } = useLocale();
  const { site, nav } = t;
  const f = t.ui.footer;
  const ui = useUI();
  return (
    <footer className="bg-ink-850 text-bone">
      <div className="wrap border-t border-[var(--line)] py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Monogram className="h-6 w-auto" />
            <p className="mt-5 max-w-[38ch] text-[15.5px] leading-snug text-bone-dim">{f.blurb}</p>
          </div>
          <ul className="space-y-2 text-[15.5px] md:col-span-3 md:col-start-7">
            {nav.map((n) => (
              <li key={n.href}>
                <Link to={n.href} className="textlink inline-flex min-h-[40px] items-center decoration-[var(--line-strong)]">{n.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-[15.5px] md:col-span-3">
            <li><button type="button" onClick={() => ui.open('booking')} onPointerEnter={ui.warm} className="textlink inline-flex min-h-[40px] items-center decoration-[var(--line-strong)]">{f.bookCall}</button></li>
            <li><button type="button" onClick={() => ui.open('contact')} className="textlink inline-flex min-h-[40px] items-center decoration-[var(--line-strong)]">{f.message}</button></li>
            <li><Link to={href('/privacy')} className="textlink inline-flex min-h-[40px] items-center decoration-[var(--line-strong)]">{f.privacy}</Link></li>
            <li><LangSwitch full className="textlink inline-flex min-h-[40px] items-center decoration-[var(--line-strong)]" /></li>
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 text-[14px] text-ash">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.base} · {site.reach}</span>
        </div>
      </div>
    </footer>
  );
}
