import { renderToString } from 'react-dom/server';
import App from './App';

export { ALL_ROUTES } from './prerender-routes';

export function render(pathname: string): string {
  // Inject pathname for useRouter's SSR path
  (globalThis as Record<string, unknown>).__SSR_PATHNAME__ = pathname;
  return renderToString(<App />);
}
