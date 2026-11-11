import { useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UIProvider } from './components/UI';
import { useRevealObserver } from './lib/reveal';
import { Locale, LocaleProvider, localeFromPath } from './content';
import { scrollToTarget, startSmoothScroll } from './lib/scroll';
import Home from './pages/Home';
import WorkPage from './pages/Work';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useRevealObserver();

  useEffect(() => {
    startSmoothScroll();
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  const prevPath = useRef(pathname);
  useEffect(() => {
    const changedPage = prevPath.current !== pathname;
    prevPath.current = pathname;
    if (hash) {
      // New page: land on the anchor instantly. Same page: glide there.
      const t = setTimeout(() => scrollToTarget(hash, changedPage), changedPage ? 30 : 80);
      return () => clearTimeout(t);
    }
    scrollToTarget(0, true);
  }, [pathname, hash]);

  return null;
}

// Before paint, so type sized for the language is right on the first frame.
const useBeforePaint = typeof document === 'undefined' ? useEffect : useLayoutEffect;

function Shell({ locale }: { locale: Locale }) {
  useBeforePaint(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <UIProvider>
      <RouteEffects />
      <Header />
      <main key={locale} id="main" className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/bg" element={<Home />} />
          <Route path="/bg/work" element={<WorkPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/bg/privacy" element={<Privacy />} />
          <Route path="/portfolio" element={<Navigate to="/work" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </UIProvider>
  );
}

export default function App() {
  const { pathname } = useLocation();
  return <LocaleProvider locale={localeFromPath(pathname)}>{(locale) => <Shell locale={locale} />}</LocaleProvider>;
}
