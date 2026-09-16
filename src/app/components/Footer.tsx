import { Link } from 'react-router';
import { IMAGES, cldResize } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, EMAIL_HREF, ARIA_PHONE, FOUNDING_YEAR } from '@/app/utils/constants';
import {
  MapPin, Phone, Mail, Clock, Leaf,
  Building2, Store, HardHat, Layers, Droplet, User,
  ChevronRight, Shield, Star,
  Home as HomeIcon, PartyPopper, Eraser
} from 'lucide-react';

export function Footer() {
  return (
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
                Intervention rapide sur Marseille et les Bouches-du-Rhone
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/devis"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg"
              >
                Demander un devis
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
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
                <p className="text-[11px] text-green-400 font-medium">Entretien & Proprete Eco-Responsable</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-300 mb-5">
              Entreprise d'entretien et de nettoyage professionnel eco-responsable a Marseille.
              50% de produits ecologiques pour un resultat impeccable et respectueux de l'environnement.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300">
                <Shield className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                RC Pro
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300">
                <Leaf className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                Eco-responsable
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-300">
                <Star className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                Depuis {FOUNDING_YEAR}
              </span>
            </div>
          </div>

          {/* Colonne 2 : Prestations SEO — 7 services clés à Marseille */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Nos Prestations à Marseille</h4>
            <ul className="space-y-2 mb-5">
              {[
                { label: 'Nettoyage de chantiers à Marseille', href: '/services/nettoyage-chantiers' },
                { label: 'Nettoyage de copropriétés à Marseille', href: '/services/nettoyage-coproprietes' },
                { label: 'Nettoyage de commerces à Marseille', href: '/services/nettoyage-commerces' },
                { label: 'Entretien de bureaux à Marseille', href: '/services/entretien-bureaux' },
                { label: 'Remise en état des sols à Marseille', href: '/services/remise-etat-sols' },
                { label: 'Nettoyage de graffitis à Marseille', href: '/services/nettoyage-graffitis' },
                { label: 'Nettoyage syndrome de Diogène à Marseille', href: '/services/nettoyage-diogene' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              <Building2 className="w-3 h-3 text-green-500" aria-hidden="true" />
              Autres services
            </p>
            <ul className="space-y-2">
              {[
                { icon: PartyPopper, label: 'Événementiel', href: '/services/nettoyage-evenementiel' },
                { icon: Droplet, label: 'Nettoyage Vitres', href: '/services/nettoyage-vitre' },
                { icon: HardHat, label: 'Gros chantiers', href: '/services/nettoyage-gros-chantiers' },
                { icon: User, label: 'Ménage Particuliers', href: '/nettoyage-particuliers' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-green-400 transition-colors group"
                  >
                    <item.icon className="w-4 h-4 text-gray-500 group-hover:text-green-500 transition-colors flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Navigation + Ressources */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Tous nos services', href: '/services' },
                { label: 'Nos realisations', href: '/realisations' },
                { label: 'A propos', href: '/a-propos' },
                { label: 'Blog & Conseils', href: '/blog' },
                { label: 'Zones d\'intervention', href: '/zones-intervention' },
                { label: 'Contact', href: '/contact' },
                { label: 'Devis gratuit', href: '/devis' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contact + Zone */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 mb-6">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-green-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={EMAIL_HREF}
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-green-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span className="break-all">{EMAIL}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic">
                  22 Traverse Pupat<br />
                  13008 Marseille
                </address>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span>Lun-Sam : 8h-18h</span>
              </div>
              <a
                href="https://www.instagram.com/natureclean13/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-pink-400 transition-colors group"
                aria-label="Suivre Nature Clean sur Instagram"
              >
                <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <span className="font-medium">@natureclean13</span>
              </a>
              <a
                href="https://www.linkedin.com/in/nature-clean-612261285/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-blue-400 transition-colors group"
                aria-label="Suivre Nature Clean sur LinkedIn"
              >
                <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </span>
                <span className="font-medium">LinkedIn</span>
              </a>
              <a
                href="https://www.pagesjaunes.fr/pros/61828182"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-yellow-400 transition-colors group"
                aria-label="Fiche Nature Clean sur Pages Jaunes"
              >
                <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 2H6C4.897 2 4 2.897 4 4v16c0 1.103.897 2 2 2h13c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1zm-1 18H6V4h12v16zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
                  </svg>
                </span>
                <span className="font-medium">Pages Jaunes</span>
              </a>
              <a
                href="https://share.google/LGuTIovk5ovTXGzuc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-blue-400 transition-colors group"
                aria-label="Avis Nature Clean sur Google"
              >
                <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span>
                <span className="font-medium">Google</span>
              </a>
            </div>

            {/* Zone d'intervention */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                Zone d'intervention
              </h5>
              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                <strong className="text-gray-300">Marseille</strong> (13001 a 13016),{' '}
                <strong className="text-gray-300">Aix-en-Provence</strong>,{' '}
                Aubagne et La Ciotat — Bouches-du-Rhone (13).
              </p>
              <ul className="flex flex-wrap gap-x-3 gap-y-2" role="list">
                {[
                  { label: 'Bureaux Marseille', href: '/nettoyage-bureaux-marseille' },
                  { label: 'Fin de chantier Marseille', href: '/nettoyage-fin-chantier-marseille' },
                  { label: 'Industriel Marseille', href: '/nettoyage-industriel-marseille' },
                  { label: 'Médical Marseille', href: '/nettoyage-medical-marseille' },
                  { label: 'Bureaux Aix', href: '/nettoyage-bureaux-aix-en-provence' },
                  { label: 'Copros Aubagne', href: '/nettoyage-coproprietes-aubagne' },
                  { label: 'Copros La Ciotat', href: '/nettoyage-coproprietes-la-ciotat' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-xs text-gray-400 hover:text-green-400 transition-colors inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
                Nettoyage professionnel ecologique Marseille | Bureaux, Commerces, Coproprietes, Chantiers, Evenementiel | Bouches-du-Rhone 13 & PACA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}