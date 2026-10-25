import { Link, useLocation } from 'react-router';
import { IMAGES, cldResize } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE, FOUNDING_YEAR } from '@/app/utils/constants';
import {
  Phone, Leaf,
  ChevronRight, Shield, Star, FileText,
} from 'lucide-react';
import { FooterContactHeroUI } from '@/app/components/FooterContactHeroUI';
import { Button } from '@/app/components/ui/button';

const MOBILE_DEVIS_BAR_HIDDEN = ['/devis', '/contact', '/merci', '/admin'] as const;

export function isMobileFooterDevisBarVisible(pathname: string): boolean {
  return !MOBILE_DEVIS_BAR_HIDDEN.some((p) => pathname.startsWith(p));
}

export function Footer() {
  const { pathname } = useLocation();
  const showMobileDevisBar = isMobileFooterDevisBarVisible(pathname);

  return (
    <>
    <footer className="bg-gray-900 text-gray-300">
      {/* ═══ BANDE CTA PRE-FOOTER ═══ */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-white mb-1">
                Un devis gratuit en moins de 24h
              </h2>
              <p className="text-white/80 text-sm md:text-base">
                Réponse sous 2 h, devis sous 24 h — Marseille et Bouches-du-Rhône
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="shine" size="lg" className="rounded-xl px-6">
                <Link to="/devis">
                  Demander un devis gratuit
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                aria-label={ARIA_PHONE}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENU PRINCIPAL DU FOOTER ═══ */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Colonne 1 : Entreprise */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={cldResize(IMAGES.logoNatureClean, 80)}
                alt=""
                width="40"
                height="40"
                className="w-10 h-10 rounded-full shadow-md object-contain bg-white"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-black text-white">Nature Clean</h3>
                <p className="text-[11px] text-green-400 font-medium">Entretien & propreté à Marseille</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-300 mb-5">
              Entreprise d'entretien et de nettoyage professionnel à Marseille.
              50 % de produits éco-labellisés pour un résultat impeccable et respectueux de l'environnement.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300">
                <Shield className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                RC Pro
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300">
                <Leaf className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                50 % éco-labellisés
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300">
                <Star className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                Depuis {FOUNDING_YEAR}
              </span>
            </div>
          </div>

          {/* Colonne 2 : Prestations SEO — 7 services clés à Marseille */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Nos prestations à Marseille</h4>
            <ul className="space-y-2">
              {[
                { label: 'Nettoyage de copropriétés à Marseille', href: '/services/nettoyage-coproprietes' },
                { label: 'Nettoyage de fin de chantier à Marseille', href: '/services/nettoyage-chantiers' },
                { label: 'Entretien de bureaux à Marseille', href: '/services/entretien-bureaux' },
                { label: 'Nettoyage de cabinets médicaux à Marseille', href: '/services/nettoyage-cabinet-medical-marseille' },
                { label: 'Nettoyage de commerces à Marseille', href: '/services/nettoyage-commerces' },
                { label: 'Nettoyage syndrome de Diogène à Marseille', href: '/services/nettoyage-diogene' },
                { label: 'Enlèvement de graffitis à Marseille', href: '/services/nettoyage-graffitis' },
                { label: 'Remise en état des sols à Marseille', href: '/services/remise-etat-sols' },
                { label: 'Nettoyage de vitres à Marseille', href: '/services/nettoyage-vitre' },
                { label: 'Nettoyage événementiel à Marseille', href: '/services/nettoyage-evenementiel' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-200 hover:text-green-300 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              <Link to="/services/remise-etat-urgence-commerce" className="hover:text-green-400 transition-colors">
                Urgence magasin après dégradation
              </Link>
            </p>
          </div>

          {/* Colonne 3 : Navigation + Ressources */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Tous nos services', href: '/services' },
                { label: 'Nos réalisations', href: '/realisations' },
                { label: 'À propos', href: '/a-propos' },
                { label: 'Blog & Conseils', href: '/blog' },
                { label: 'Zones d\'intervention', href: '/zones-intervention' },
                { label: 'Contact', href: '/contact' },
                { label: 'Devis gratuit', href: '/devis' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-200 hover:text-green-300 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contact + zone (HeroUI, thème sombre NC) */}
          <FooterContactHeroUI />
        </div>
      </div>

      {/* ═══ COPYRIGHT ═══ */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Nature Clean Marseille — SIRET : 89020726900022
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-1">
              <Link to="/politique-de-confidentialite" className="text-xs text-gray-400 hover:text-green-400 transition-colors">
                Politique de confidentialité
              </Link>
              <span className="text-gray-700 text-xs hidden md:inline" aria-hidden="true">·</span>
              <Link to="/mentions-legales" className="text-xs text-gray-400 hover:text-green-400 transition-colors">
                Mentions légales
              </Link>
              <span className="text-gray-700 text-xs hidden md:inline" aria-hidden="true">·</span>
              <p className="text-xs text-gray-400 text-center md:text-right">
                22 Traverse Pupat, 13008 Marseille — Lun–Sam 8h–18h
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    {showMobileDevisBar && (
      <div
        className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-gray-900/95 backdrop-blur-sm px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] md:hidden"
        role="complementary"
        aria-label="Actions rapides"
      >
        <div className="flex gap-3">
          <a
            href={PHONE_HREF}
            className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            Appeler
          </a>
          <Button
            asChild
            variant="shine"
            size="lg"
            className="min-h-[48px] flex-[1.3] rounded-xl py-2.5 text-sm font-black"
          >
            <Link to="/devis">
              <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              Devis gratuit
            </Link>
          </Button>
        </div>
      </div>
    )}
    </>
  );
}