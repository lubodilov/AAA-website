import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loadLocale, localeFromPath } from './content';
import './styles.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages hydrate — but only if the HTML was rendered for this URL.
// (A server that answers every path with index.html must not cause a mismatch.)
const KNOWN = ['/', '/work', '/privacy', '/bg', '/bg/work', '/bg/privacy'];
const path = location.pathname.replace(/\/+$/, '') || '/';
const locale = localeFromPath(path);
const pre = root.dataset.route;
// The prerendered 404 is English, so a Bulgarian 404 has to render on the client.
const matches = pre === path || (pre === '/404' && !KNOWN.includes(path) && locale === 'en');

const start = () => {
  if (root.firstElementChild && matches) {
    hydrateRoot(root, app);
  } else {
    root.textContent = '';
    createRoot(root).render(app);
  }
};

if (locale === 'en') start();
else void loadLocale(locale).then(start, start);
