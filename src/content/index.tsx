import { createContext, ReactNode, useEffect, useMemo, useState, useContext } from 'react';
import { Content, en } from './site';

export type Locale = 'en' | 'bg';

const dictionaries: Partial<Record<Locale, Content>> = { en };

/** English lives at /, Bulgarian at /bg. */
export const localeFromPath = (pathname: string): Locale => (pathname === '/bg' || pathname.startsWith('/bg/') ? 'bg' : 'en');

/** Used by the prerender, where everything has to be available synchronously. */
export const registerLocale = (locale: Locale, content: Content) => {
  dictionaries[locale] = content;
};

/** Bulgarian is a separate chunk, so English visitors never download it. */
export const loadLocale = async (locale: Locale) => {
  if (!dictionaries[locale]) dictionaries[locale] = (await import('./bg')).bg;
};

const prefix = (p: string, locale: Locale) => {
  if (locale === 'en') return p;
  if (p === '/') return '/bg';
  if (p.startsWith('/#')) return `/bg${p.slice(1)}`;
  return `/bg${p}`;
};

/** The same page in the other language. */
export const swapLocale = (pathname: string, hash = '') => {
  const isBg = localeFromPath(pathname) === 'bg';
  const path = isBg ? pathname.replace(/^\/bg/, '') || '/' : pathname === '/' ? '/bg' : `/bg${pathname}`;
  return path + hash;
};

type Ctx = { locale: Locale; t: Content; href: (p: string) => string };
const LocaleCtx = createContext<Ctx>({ locale: 'en', t: en, href: (p) => p });

export function LocaleProvider({ locale: wanted, children }: { locale: Locale; children: (locale: Locale) => ReactNode }) {
  const [, loaded] = useState(0);
  // Only reachable through browser history; every link loads the language first.
  useEffect(() => {
    if (!dictionaries[wanted]) void loadLocale(wanted).then(() => loaded((n) => n + 1));
  }, [wanted]);
  const locale = dictionaries[wanted] ? wanted : 'en';
  const value = useMemo(() => ({ locale, t: dictionaries[locale]!, href: (p: string) => prefix(p, locale) }), [locale]);
  return <LocaleCtx.Provider value={value}>{children(locale)}</LocaleCtx.Provider>;
}

export const useT = () => useContext(LocaleCtx).t;
export const useLocale = () => useContext(LocaleCtx);
