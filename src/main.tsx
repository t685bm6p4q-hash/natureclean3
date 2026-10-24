import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
