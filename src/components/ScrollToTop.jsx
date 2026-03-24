import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try several strategies to ensure the page is at the top after navigation.
    // 1) If Lenis is available on window, use its scrollTo
    // 2) Fallback to window.scrollTo and setting scrollTop on document
    const tryScrollTop = () => {
      try {
        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          // Lenis scrollTo accepts y and an options object
          window.lenis.scrollTo(0, { duration: 0 });
          return;
        }
      } catch (e) {
        // ignore
      }

      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      } catch (e) {
        // ignore
      }
    };

    // Run immediately and schedule a few retries to handle race conditions
    tryScrollTop();
    const t1 = setTimeout(tryScrollTop, 20);
    const t2 = setTimeout(tryScrollTop, 120);
    const t3 = setTimeout(tryScrollTop, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}
