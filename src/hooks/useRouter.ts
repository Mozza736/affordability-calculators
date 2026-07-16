import { useState, useEffect } from 'react';

// SSR: global injected by prerender script; undefined in browser
declare const __SSR_PATHNAME__: string | undefined;

function getInitialPathname(): string {
  if (typeof window === 'undefined') {
    return typeof __SSR_PATHNAME__ !== 'undefined' ? __SSR_PATHNAME__ : '/';
  }
  return window.location.pathname;
}

export function useRouter() {
  const [pathname, setPathname] = useState(getInitialPathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setPathname(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { pathname, navigate };
}
