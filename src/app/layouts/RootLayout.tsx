import { Suspense, lazy } from 'react';
import { Outlet, ScrollRestoration, useLocation, Link } from 'react-router';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { SkipToContent } from '@/app/components/SkipToContent';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { usePageJourney } from '@/app/hooks/usePageJourney';

// Lazy-load non-critical layout components — hors du bundle critique
const WhatsAppButton  = lazy(() => import('@/app/components/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));
const MobileStickyBar = lazy(() => import('@/app/components/MobileStickyBar').then(m => ({ default: m.MobileStickyBar })));
const CookieConsentBanner = lazy(() => import('@/app/components/CookieConsentBanner').then(m => ({ default: m.CookieConsentBanner })));

// Logo URL statique — pas besoin d'importer IMAGES + cloudinaryHelper dans le bundle principal
const LOGO_URL = 'https://res.cloudinary.com/dq6pesttn/image/upload/f_auto,q_auto,w_144/v1742932740/logo-nature-clean-marseille_wu9ql5.png';

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-green-700 font-semibold">Nature Clean Marseille...</p>
      </div>
    </div>
  );
}

function DevisHeader() {
  return (
    <header className="h-[80px] border-b border-gray-100 bg-white flex items-center justify-center px-4">
      <Link to="/" aria-label="Nature Clean - Retour à l'accueil" className="flex items-center gap-3 group">
        <img
          src={LOGO_URL}
          alt=""
          width="56"
          height="56"
          className="w-14 h-14 rounded-full shadow-sm object-contain bg-white ring-2 ring-gray-100 group-hover:shadow-md transition-shadow"
          aria-hidden="true"
        />
        <div>
          <span className="text-base font-black text-gray-900 leading-tight block">Nature Clean</span>
          <p className="text-[11px] text-green-700 font-medium -mt-0.5">Nettoyage Professionnel Marseille</p>
        </div>
      </Link>
    </header>
  );
}

export function RootLayout() {
  usePageJourney();
  const { pathname } = useLocation();
  const isDevis = pathname.startsWith('/devis');

  return (
    <AuthProvider>
      <SkipToContent />
      <div className="min-h-screen bg-white">
        {isDevis ? <DevisHeader /> : <Header />}
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
        {!isDevis && (
          <>
            <Footer />
            <Suspense fallback={null}>
              <WhatsAppButton />
              <MobileStickyBar />
            </Suspense>
          </>
        )}
        <Suspense fallback={null}>
          <CookieConsentBanner />
        </Suspense>
      </div>
      <ScrollRestoration />
    </AuthProvider>
  );
}
