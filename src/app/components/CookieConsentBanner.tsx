import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Cookie, X, ShieldCheck, BarChart2 } from 'lucide-react';

const STORAGE_KEY = 'ncm_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export function CookieConsentBanner() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    if (!stored) {
      // Légère temporisation pour ne pas bloquer le LCP
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    } else {
      setStatus(stored);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setStatus('accepted');
    setVisible(false);
    // SEC-008 : Notifie tracking.js que le consentement vient d'être accordé
    window.dispatchEvent(new Event('ncm:consent:accepted'));
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setStatus('rejected');
    setVisible(false);
  };

  if (!visible || status !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bandeau de consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 md:p-4 ncm-cookie-slide-in"
    >
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            {/* Icône */}
            <div className="flex-shrink-0 w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center mt-0.5">
              <Cookie className="w-5 h-5 text-white" aria-hidden="true" />
            </div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-bold text-white text-base">
                  Nous respectons votre vie privée
                </h2>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                Nature Clean Marseille utilise des cookies pour mesurer l’audience et l’efficacité de nos campagnes (Google Analytics, Google Ads). Vos données ne sont jamais revendues.{' '}
                <Link
                  to="/politique-de-confidentialite"
                  className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </p>

              {/* Détails optionnels */}
              {showDetails && (
                <div className="mb-4 p-3 bg-gray-800 rounded-xl space-y-2 text-xs text-gray-300">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Cookies essentiels</span>{' '}
                      — navigation, formulaires, sécurité. Toujours actifs.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Cookies analytiques</span>{' '}
                      — Google Analytics et Google Ads (mesure d’audience et conversions). Désactivables.
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={accept}
                  className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Tout accepter
                </button>
                <button
                  onClick={reject}
                  className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Refuser
                </button>
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  className="px-4 py-2.5 text-gray-400 hover:text-white text-sm transition-colors underline underline-offset-2"
                >
                  {showDetails ? 'Masquer les détails' : 'En savoir plus'}
                </button>
              </div>
            </div>

            {/* Fermer = refuser */}
            <button
              onClick={reject}
              aria-label="Fermer et refuser les cookies"
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}