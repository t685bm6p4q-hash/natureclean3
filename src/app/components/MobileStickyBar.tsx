import { useState, useEffect } from 'react';
import { Phone, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';

/**
 * Sticky CTA bar — visible uniquement sur mobile.
 * Apparaît après 350px de scroll, se masque sur /devis et /contact
 * (pour ne pas gêner les formulaires).
 *
 * Stratégie marketing : capter les visiteurs qui ne scrollent jamais
 * jusqu'aux ConversionBreak mid-page ou au CTA final en bas.
 */
export function MobileStickyBar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  // Pages où la barre est masquée (formulaires, merci, admin)
  const hidden = ['/devis', '/contact', '/merci', '/admin'].some((p) =>
    pathname.startsWith(p)
  );

  useEffect(() => {
    if (hidden) {
      setShow(false);
      return;
    }

    function onScroll() {
      setShow(window.scrollY > 350);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check initial position
    return () => window.removeEventListener('scroll', onScroll);
  }, [hidden]);

  if (!show || hidden) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden"
      role="complementary"
      aria-label="Actions rapides"
    >
      {/* Gradient fade pour ne pas couper brutalement */}
      <div className="h-3 bg-gradient-to-t from-gray-900/95 to-transparent pointer-events-none" />

      <div className="bg-gray-900/95 border-t border-white/10 px-4 py-2.5 flex gap-3">
        {/* Bouton Appeler — conversion immédiate */}
        <a
          href={PHONE_HREF}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl min-h-[48px] py-3 font-bold text-sm transition-colors border border-white/15"
          aria-label={ARIA_PHONE}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Appeler</span>
        </a>

        {/* Bouton Devis — conversion lead */}
        <Link
          to="/devis"
          className="flex-[1.3] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 rounded-xl min-h-[48px] py-3 font-black text-sm transition-colors shadow-lg shadow-green-500/20"
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>Devis gratuit</span>
        </Link>
      </div>
    </div>
  );
}