const CHUNK_RELOAD_KEY = 'nc-chunk-reload';
const EPHEMERAL_QUERY_KEYS = ['nc'] as const;

/** Retire les paramètres techniques de l’URL (Analytics, partage, canonical). */
export function stripEphemeralQueryParams(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  let changed = false;

  for (const key of EPHEMERAL_QUERY_KEYS) {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  }

  if (!changed) return;

  const next =
    url.pathname +
    (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '') +
    url.hash;

  window.history.replaceState(window.history.state, '', next);
}

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

/** Recharge une seule fois pour récupérer index + assets à jour. */
export function reloadOnceOnChunkError(): boolean {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    return false;
  }
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  const url = new URL(window.location.href);
  url.searchParams.set('nc', String(Date.now()));
  window.location.replace(url.toString());
  return true;
}

export function clearChunkReloadFlag(): void {
  sessionStorage.removeItem(CHUNK_RELOAD_KEY);
}
