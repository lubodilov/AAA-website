import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * One IntersectionObserver for the whole site. Any element with
 * [data-reveal] or .split[data-split] gets `.is-in` once it enters the viewport.
 */
export function useRevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not(.is-in), .split[data-split]:not(.is-in)').forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches('[data-reveal], .split[data-split]')) io.observe(n);
            scan(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}
