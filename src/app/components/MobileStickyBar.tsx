import { Link, useLocation } from 'react-router';
import { Phone, FileText } from 'lucide-react';
import { PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';

const HIDDEN_PREFIXES = ['/devis', '/contact', '/merci', '/admin'] as const;

/** Formulaires et admin : pas de barre sticky (évite le chevauchement avec les champs). */
export function isMobileStickyBarHidden(pathname: string): boolean {
  return HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));
}

/**
 * Barre CTA mobile — fixée dans la bande réservée sous le conteneur scroll (#ncm-mobile-scroll).
 * Toujours visible sur mobile (hors pages formulaire) : le layout réserve déjà la hauteur.
 */
export function MobileStickyBar() {
  const { pathname } = useLocation();
  const hidden = isMobileStickyBarHidden(pathname);

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]"
      role="complementary"
      aria-label="Actions rapides"
    >
      <div className="h-2 bg-gradient-to-t from-gray-900/95 to-transparent pointer-events-none" />

      <div className="bg-gray-900/95 border-t border-white/10 px-4 py-2 flex gap-3">
        <a
          href={PHONE_HREF}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl min-h-[44px] py-2.5 font-bold text-sm transition-colors border border-white/15"
          aria-label={ARIA_PHONE}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Appeler</span>
        </a>

        <Link
          to="/devis"
          className="flex-[1.3] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 rounded-xl min-h-[44px] py-2.5 font-black text-sm transition-colors shadow-lg shadow-green-500/20"
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>Devis gratuit</span>
        </Link>
      </div>
    </div>
  );
}
