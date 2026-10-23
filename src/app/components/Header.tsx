import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Phone, Menu, X, ChevronRight,
  Building2, Store, HardHat, Layers, Droplet,
  Clock, Mail, FileText, MapPin, Shield, Heart, Eraser,
  Home as HomeIcon, Zap, ImageIcon, Info, BookOpen, Sparkles
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useFocusTrap } from '@/app/hooks/useFocusTrap';
import { IMAGES } from '@/app/utils/images';
import { getOptimizedCldUrl } from '@/app/utils/cloudinaryHelper';
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, EMAIL_HREF, ARIA_PHONE, ARIA_EMAIL } from '@/app/utils/constants';

const SERVICE_PAGE_DEVIS_MAP: Record<string, string> = {
  '/services/entretien-bureaux':         '/devis?service=bureaux',
  '/services/nettoyage-commerces':       '/devis?service=commerces',
  '/services/remise-etat-urgence-commerce': '/devis?service=commerces',
  '/services/nettoyage-chantiers':       '/devis?service=fin-chantier',
  '/services/nettoyage-coproprietes':    '/devis?service=coproprietes',
  '/services/nettoyage-diogene':         '/devis?service=diogene',
  '/services/nettoyage-evenementiel':    '/devis?service=evenementiel',
  '/services/nettoyage-graffitis':       '/devis?service=graffitis',
  '/services/nettoyage-gros-chantiers':  '/devis?service=gros-chantier',
  '/services/remise-etat-sols':          '/devis?service=sols',
  '/nettoyage-vitre':                    '/devis?service=vitres',
};

/** Prestations B2B (pros, syndics, commerces) — pas Diogène (accompagnement logement). */
const professionalServices = [
  { icon: HomeIcon, label: 'Copropriétés', href: '/services/nettoyage-coproprietes', desc: 'Parties communes', thumb: IMAGES.hallCoproBoites },
  { icon: HardHat, label: 'Chantiers', href: '/services/nettoyage-chantiers', desc: 'Fin de chantier', thumb: IMAGES.finChantierMarseille },
  { icon: Building2, label: 'Bureaux', href: '/services/entretien-bureaux', desc: 'Locaux tertiaires', thumb: IMAGES.entrepriseBureauxMarseille },
  { icon: Store, label: 'Commerces', href: '/services/nettoyage-commerces', desc: 'Entretien de locaux', thumb: IMAGES.vitrineBoutiqueLuxe },
  { icon: Eraser, label: 'Graffitis', href: '/services/nettoyage-graffitis', desc: 'Effacement tags & façades', thumb: IMAGES.graffitiCarrefourAvant },
  { icon: Layers, label: 'Sols', href: '/services/remise-etat-sols', desc: 'Décapage & cristallisation', thumb: IMAGES.monobrosseAction },
  { icon: Droplet, label: 'Vitres', href: '/services/nettoyage-vitre', desc: 'Lavage de vitres', thumb: IMAGES.facadeVitreeImmeuble },
  { icon: Sparkles, label: 'Événementiel', href: '/services/nettoyage-evenementiel', desc: 'Propreté pré/post événement', thumb: IMAGES.salleEvenementielle },
] as const;

const diogeneNav = {
  icon: Heart,
  label: 'Diogène',
  href: '/services/nettoyage-diogene',
  desc: 'Désencombrement discret',
  thumb: IMAGES.appartVideLumineux,
} as const;

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Diogène', href: '/services/nettoyage-diogene' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Zones', href: '/zones-intervention' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
] as const;

const secondaryPages = [
  { icon: ImageIcon, label: 'Réalisations', href: '/realisations' },
  { icon: MapPin, label: 'Zones d\'intervention', href: '/zones-intervention' },
  { icon: Info, label: 'À propos', href: '/a-propos' },
  { icon: BookOpen, label: 'Blog', href: '/blog' },
  { icon: Mail, label: 'Contact', href: '/contact' },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useFocusTrap(mobileMenuOpen);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/services') {
      return (
        location.pathname === '/services' ||
        (location.pathname.startsWith('/services/') && location.pathname !== diogeneNav.href)
      );
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const smartDevisLink = SERVICE_PAGE_DEVIS_MAP[location.pathname] ?? '/devis';

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm transition-all min-h-[44px] inline-flex items-center ${
      isActive(path)
        ? 'text-green-700 bg-green-50 font-medium'
        : 'text-gray-600 hover:text-green-700 hover:bg-green-50/60'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden lg:block bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 flex items-center justify-between h-9 text-xs">
          <ul className="flex items-center gap-5 list-none" aria-label="Informations entreprise">
            <li className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              Lun-Sam : 8h-18h
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              Marseille et Bouches-du-Rhône
            </li>
            <li className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              Assurance RC Pro
            </li>
          </ul>
          <ul className="flex items-center gap-5 list-none" aria-label="Contact rapide">
            <li>
              <a
                href={EMAIL_HREF}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label={ARIA_EMAIL}
              >
                <Mail className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
                aria-label={ARIA_PHONE}
              >
                <Phone className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="Nature Clean - Accueil">
            <img
              src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_auto,q_auto,w_144,h_144,c_thumb,g_center/v1773953029/Capture_d_e%CC%81cran_2026-03-19_a%CC%80_21.43.35_zqhtvo.png"
              alt=""
              width="72"
              height="72"
              className="w-[72px] h-[72px] rounded-full shadow-md group-hover:shadow-lg transition-shadow object-cover bg-white ring-2 ring-white"
              aria-hidden="true"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-black text-gray-900 leading-tight block">Nature Clean</span>
              <p className="text-[11px] text-green-700 font-medium -mt-0.5">Nettoyage Professionnel Marseille</p>
            </div>
          </Link>

          <nav className="hidden lg:block" aria-label="Navigation principale">
            <ul className="flex items-center gap-0.5 list-none flex-wrap justify-end">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Button asChild size="sm" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-medium min-h-[44px]">
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-1.5" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
            <Button asChild size="sm" className="bg-green-700 hover:bg-green-800 text-white font-bold shadow-md hover:shadow-lg transition-all min-h-[44px]">
              <Link to={smartDevisLink}>
                <FileText className="w-4 h-4 mr-1.5" />
                Devis gratuit
              </Link>
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              className="p-2.5 bg-green-700 text-white rounded-xl shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={ARIA_PHONE}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden mobile-overlay-enter"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <nav
            ref={mobileMenuRef}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden overflow-y-auto shadow-2xl mobile-panel-enter"
            aria-label="Menu mobile"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-black text-gray-900">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-green-50 border-b border-green-100">
              <Link
                to={smartDevisLink}
                className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-bold shadow-md transition-colors min-h-[48px]"
              >
                <FileText className="w-5 h-5" />
                Demander un devis gratuit
              </Link>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 w-full mt-2 border-2 border-green-600 text-green-700 py-3 rounded-xl font-bold transition-colors hover:bg-green-50 min-h-[48px]"
              >
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </div>

            <ul className="p-4 space-y-1 list-none">
              <li>
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors min-h-[48px] ${
                    isActive('/') && location.pathname === '/' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="font-medium">Accueil</span>
                </Link>
              </li>

              <li className="pt-3 pb-1 px-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" aria-hidden="true" />
                  Professionnels
                </span>
              </li>

              {professionalServices.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors min-h-[48px] ${
                      location.pathname === s.href ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {s.thumb ? (
                      <img
                        src={getOptimizedCldUrl(s.thumb, 72)}
                        alt=""
                        width="32"
                        height="32"
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        <s.icon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm">{s.label}</span>
                      <span className="block text-[11px] text-gray-500">{s.desc}</span>
                    </div>
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-green-700 rounded-xl hover:bg-green-50 transition-colors min-h-[44px]"
                >
                  Tous les services
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </li>

              <li className="pt-3 pb-1 px-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <Heart className="w-3 h-3" aria-hidden="true" />
                  Logement &amp; famille
                </span>
              </li>
              <li>
                <Link
                  to={diogeneNav.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors min-h-[48px] ${
                    location.pathname === diogeneNav.href
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={getOptimizedCldUrl(diogeneNav.thumb, 72)}
                    alt=""
                    width="32"
                    height="32"
                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm">{diogeneNav.label}</span>
                    <span className="block text-[11px] text-gray-500">{diogeneNav.desc}</span>
                  </div>
                </Link>
              </li>

              <li aria-hidden="true" className="mx-4 border-t border-gray-100 my-2" />

              <li className="pt-1 pb-1 px-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  Découvrir
                </span>
              </li>

              {secondaryPages.map((page) => (
                <li key={page.href}>
                  <Link
                    to={page.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors min-h-[48px] ${
                      isActive(page.href) ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <page.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{page.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="p-4 mt-auto border-t border-gray-100 bg-gray-50">
              <ul className="space-y-2 text-xs text-gray-600 list-none">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <span>Lun-Sam : 8h-18h | Dim : sur RDV</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <span>Marseille (13001-13016), Aix, Aubagne</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <span>Assurance RC Pro | SIRET 89020726900022</span>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
