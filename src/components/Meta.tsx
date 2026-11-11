import { createContext, useContext, useEffect } from 'react';
import { site } from '../content/site';

export type MetaData = { title: string; description: string; path: string };

/** During prerender, pages write their meta here so the HTML ships with the right <title>. */
export const MetaCollector = createContext<{ current?: MetaData } | null>(null);

export function Meta({ title, description, path }: MetaData) {
  const collector = useContext(MetaCollector);
  if (collector) collector.current = { title, description, path };

  useEffect(() => {
    document.title = title;
    const set = (sel: string, attr: string, val: string) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    const url = site.url + path;
    set('meta[name="description"]', 'content', description);
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:url"]', 'content', url);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
    const isBg = path === '/bg' || path.startsWith('/bg/');
    const enPath = isBg ? path.replace(/^\/bg/, '') || '/' : path;
    const bgPath = enPath === '/' ? '/bg' : `/bg${enPath}`;
    set('link[hreflang="en"]', 'href', site.url + enPath);
    set('link[hreflang="x-default"]', 'href', site.url + enPath);
    set('link[hreflang="bg"]', 'href', site.url + bgPath);
    set('meta[property="og:locale"]', 'content', isBg ? 'bg_BG' : 'en_US');
  }, [title, description, path]);

  return null;
}
