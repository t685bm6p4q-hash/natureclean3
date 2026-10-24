import { StrictMode } from 'react';
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

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prérendu SSG : conserver le HTML (héros, H1) au lieu de le remplacer — réduit le render delay LCP.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
