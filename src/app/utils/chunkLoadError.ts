const CHUNK_RELOAD_KEY = 'nc-chunk-reload';

/** Erreur typique après un deploy Vercel : HTML neuf, chunk JS ancien (404). */
export function isChunkLoadError(error: unknown): boolean {
  if (error == null) return false;
  const msg =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : String(error);
  const normalized = msg.toLowerCase();
  return (
    normalized.includes('importing a module script failed') ||
    normalized.includes('failed to fetch dynamically imported module') ||
    normalized.includes('error loading dynamically imported module') ||
    normalized.includes('loading chunk') ||
    normalized.includes('loading css chunk') ||
    normalized.includes('dynamically imported module')
  );
}

/** Recharge une fois pour récupérer index + assets à jour. */
export function reloadOnceOnChunkError(): boolean {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    return false;
  }
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  window.location.reload();
  return true;
}

export function clearChunkReloadFlag(): void {
  sessionStorage.removeItem(CHUNK_RELOAD_KEY);
}
