import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { MetaCollector, MetaData } from './components/Meta';
import { registerLocale } from './content';
import { bg } from './content/bg';

registerLocale('bg', bg);

/** Used by scripts/prerender.mjs at build time. */
export function render(url: string) {
  const meta: { current?: MetaData } = {};
  const html = renderToString(
    <StrictMode>
      <MetaCollector.Provider value={meta}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </MetaCollector.Provider>
    </StrictMode>,
  );
  return { html, meta: meta.current };
}
