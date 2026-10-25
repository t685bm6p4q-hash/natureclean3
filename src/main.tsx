import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '@/app/App';
import '@/styles/index.css';
import {
  clearChunkReloadFlag,
  isChunkLoadError,
  reloadOnceOnChunkError,
  stripEphemeralQueryParams,
} from '@/app/utils/chunkLoadError';

stripEphemeralQueryParams();
clearChunkReloadFlag();

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  reloadOnceOnChunkError();
});

window.addEventListener('unhandledrejection', (event) => {
  if (isChunkLoadError(event.reason)) {
    event.preventDefault();
    reloadOnceOnChunkError();
  }
});

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root introuvable');
}

const app = <App />;

const path = window.location.pathname;
const isHome = path === '/' || path === '';

// Accueil : createRoot (pas d’hydrate) — le prerender reste pour SEO/LCP avant JS ; zéro #418/#423 en console.
// Autres routes SSG : hydrateRoot pour réutiliser le DOM prerender sans flash.
if (container.hasChildNodes() && !isHome) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
