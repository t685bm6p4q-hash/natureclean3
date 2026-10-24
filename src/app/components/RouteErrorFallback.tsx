import { useEffect } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { RefreshCw, Home, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { isChunkLoadError, reloadOnceOnChunkError } from '@/app/utils/chunkLoadError';

/**
 * Page d'erreur React Router (lazy routes, chargement de modules).
 * En cas de chunk obsolète post-deploy → une actualisation automatique.
 */
export function RouteErrorFallback() {
  const error = useRouteError();
  const chunkStale = isChunkLoadError(error);

  useEffect(() => {
    if (chunkStale) {
      reloadOnceOnChunkError();
    }
  }, [chunkStale]);

  if (chunkStale) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50 px-4 text-center">
        <RefreshCw className="h-8 w-8 animate-spin text-green-600" aria-hidden="true" />
        <p className="text-gray-700 font-medium">Mise à jour de Nature Clean…</p>
        <p className="text-sm text-gray-500">Chargement de la dernière version du site.</p>
      </div>
    );
  }

  const message = isRouteErrorResponse(error)
    ? error.statusText || `Erreur ${error.status}`
    : error instanceof Error
      ? error.message
      : 'Une erreur est survenue';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <h1 className="text-xl font-black text-gray-900 mb-2">Page temporairement indisponible</h1>
        <p className="text-sm text-gray-600 mb-6">
          Un fichier n&apos;a pas pu se charger. Actualisez la page ou revenez à l&apos;accueil.
        </p>
        {import.meta.env.DEV && (
          <p className="text-xs text-red-600 mb-4 font-mono break-all">{message}</p>
        )}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-bold text-white hover:bg-green-800"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Actualiser
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 py-3 font-bold text-gray-700 hover:bg-gray-50"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Accueil
          </Link>
          <a
            href={PHONE_HREF}
            aria-label={ARIA_PHONE}
            className="inline-flex items-center justify-center gap-2 text-sm text-green-700 font-semibold"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
