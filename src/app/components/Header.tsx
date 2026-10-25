import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Phone, Menu, X, ChevronRight,
  Building2, Store, HardHat, Layers, Droplet,
  Clock, Mail, FileText, MapPin, Eraser,
  Home as HomeIcon, ImageIcon, Info, BookOpen, Sparkles, Stethoscope
} from 'lucide-react';
import { useFocusTrap } from '@/app/hooks/useFocusTrap';
import { IMAGES } from '@/app/utils/images';
import { getOptimizedCldUrl } from '@/app/utils/cloudinaryHelper';
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, EMAIL_HREF, ARIA_PHONE, ARIA_EMAIL } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { AnimatedTabs } from '@/app/components/ui/animated-tabs';

const HEADER_MAIN_TABS = [
  'Entreprise',
  'Gros chantiers',
  'Événementiel',
  'Commerces',
  'Plus',
] as const;

/* ──────────────────────────────────────────────────────────
   SMART DEVIS — Mapping page service → ?service=xxx
   Permet au bouton "Devis gratuit" du header de pointer vers
   le bon paramètre selon la page courante.
   ────────────────────────────────────────────────────────── */
const SERVICE_PAGE_DEVIS_MAP: Record<string, string> = {
  '/services/entretien-bureaux':         '/devis?service=bureaux',
  '/services/nettoyage-cabinet-medical-marseille': '/devis?service=bureaux',
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

/* ──────────────────────────────────────────────────────────
   DATA : Services — liens directs dans la nav pour SEO max
   ────────────────────────────────────────────────────────── */

/** Dropdown « Entreprise » — prestations pro (sans Diogène ni Événementiel, liens directs à part). */
const entrepriseServices = [
  { icon: HomeIcon, label: 'Copropriétés', href: '/services/nettoyage-coproprietes', desc: 'Parties communes', thumb: IMAGES.hallCoproBoites },
  { icon: HardHat, label: 'Chantiers', href: '/services/nettoyage-chantiers', desc: 'Fin de chantier', thumb: IMAGES.finChantierMarseille },
  { icon: Building2, label: 'Bureaux', href: '/services/entretien-bureaux', desc: 'Locaux tertiaires', thumb: IMAGES.entrepriseBureauxMarseille },
  { icon: Stethoscope, label: 'Cabinets médicaux', href: '/services/nettoyage-cabinet-medical-marseille', desc: 'Locaux de santé', thumb: IMAGES.cabinetMedical },
  { icon: Eraser, label: 'Graffitis', href: '/services/nettoyage-graffitis', desc: 'Effacement tags & façades', thumb: IMAGES.graffitiCarrefourAvant },
  { icon: Layers, label: 'Sols', href: '/services/remise-etat-sols', desc: 'Décapage & cristallisation', thumb: IMAGES.monobrosseAction },
  { icon: Droplet, label: 'Vitres', href: '/services/nettoyage-vitre', desc: 'Lavage de vitres', thumb: IMAGES.facadeVitreeImmeuble },
] as const;

/** Liens directs dans la barre (hors menus déroulants). */
const individualServices = [
  { icon: HardHat, label: 'Gros chantiers', href: '/services/nettoyage-gros-chantiers' },
  { icon: Sparkles, label: 'Événementiel', href: '/services/nettoyage-evenementiel' },
  { icon: Store, label: 'Commerces', href: '/services/nettoyage-commerces' },
] as const;

/** Pages secondaires dans le dropdown "Plus" */
const secondaryPages = [
  {
    icon: ImageIcon,
    label: 'Réalisations',
    href: '/realisations',
    desc: 'Portfolio de nos chantiers',
    thumb: IMAGES.appartVidePropre,
  },
  {
    icon: MapPin,
    label: 'Zones d\'intervention',
    href: '/zones-intervention',
    desc: 'Marseille, Aix, Aubagne, La Ciotat...',
    thumb: IMAGES.vueMarseilleBasin,
  },
  {
    icon: Info,
    label: 'À propos',
    href: '/a-propos',
    desc: 'Notre équipe et nos valeurs',
    thumb: IMAGES.equipe4Personnes,
  },
  {
    icon: BookOpen,
    label: 'Blog',
    href: '/blog',
    desc: 'Conseils et actualités',
    thumb: IMAGES.carnetBlog,
  },
  {
    icon: Mail,
    label: 'Contact',
    href: '/contact',
    desc: 'Nous écrire ou nous appeler',
    thumb: IMAGES.poigneeMainDevis,
  },
] as const;

/** Menu mobile — une liste : copro → chantiers → gros chantiers → locaux pro → commerces → sols/vitres → événementiel */
const MOBILE_SERVICE_NAV = [
  entrepriseServices[0],
  entrepriseServices[1],
  {
    icon: HardHat,
    label: 'Gros chantiers',
    href: '/services/nettoyage-gros-chantiers',
    desc: 'Chantiers lourds & industriels',
    thumb: IMAGES.finChantierMarseille,
  },
  entrepriseServices[2],
  entrepriseServices[3],
  {
    icon: Store,
    label: 'Commerces',
    href: '/services/nettoyage-commerces',
    desc: 'Boutiques & surfaces de vente',
    thumb: IMAGES.magasinBoutiquePACA,
  },
  entrepriseServices[4],
  entrepriseServices[5],
  entrepriseServices[6],
  {
    icon: Sparkles,
    label: 'Événementiel',
    href: '/services/nettoyage-evenementiel',
    desc: 'Salles & réceptions',
    thumb: IMAGES.salleEvenementielle,
  },
] as const;

/* ──────────────────────────────────────────────
   COMPOSANT HEADER
   ───────────────────────────────────────────── */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [entrepriseOpen, setEntrepriseOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useFocusTrap(mobileMenuOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entrepriseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setPlusOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setPlusOpen(false);
    }, 250);
  }, []);

  const handleEntrepriseEnter = useCallback(() => {
    if (entrepriseTimeoutRef.current) {
      clearTimeout(entrepriseTimeoutRef.current);
      entrepriseTimeoutRef.current = null;
    }
    setEntrepriseOpen(true);
  }, []);

  const handleEntrepriseLeave = useCallback(() => {
    entrepriseTimeoutRef.current = setTimeout(() => {
      setEntrepriseOpen(false);
    }, 250);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
        setPlusOpen(false);
        setEntrepriseOpen(false);
      }
    };
    if (plusOpen || entrepriseOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [plusOpen, entrepriseOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (entrepriseTimeoutRef.current) clearTimeout(entrepriseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  /* ── Escape ferme les dropdowns desktop ── */
  useEffect(() => {
    if (!entrepriseOpen && !plusOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setEntrepriseOpen(false);
        setPlusOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [entrepriseOpen, plusOpen]);

  const isActive = (path: string) => location.pathname === path;
  const isEntrepriseActive = entrepriseServices.some((s) => isActive(s.href));
  const isSecondaryActive = secondaryPages.some((p) => isActive(p.href));

  const activeHeaderTab = (() => {
    if (plusOpen || isSecondaryActive) return 'Plus';
    if (entrepriseOpen || isEntrepriseActive) return 'Entreprise';
    const direct = individualServices.find((s) => isActive(s.href));
    if (direct) return direct.label;
    return 'Entreprise';
  })();

  const handleHeaderTabChange = useCallback(
    (label: string) => {
      if (label === 'Entreprise') {
        setPlusOpen(false);
        setEntrepriseOpen((open) => !open);
        return;
      }
      if (label === 'Plus') {
        setEntrepriseOpen(false);
        setPlusOpen((open) => !open);
        return;
      }
      const service = individualServices.find((s) => s.label === label);
      if (service) {
        setEntrepriseOpen(false);
        setPlusOpen(false);
        navigate(service.href);
      }
    },
    [navigate],
  );

  /** Lien du bouton "Devis gratuit" — contextualisé si on est sur une page service */
  const smartDevisLink = SERVICE_PAGE_DEVIS_MAP[location.pathname] ?? '/devis';

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm isolate">
      <div className="pt-[env(safe-area-inset-top,0px)]">
        <div className="ncm-liseré-fin" aria-hidden="true" />
        {/* ═══ TOP BAR : Confiance & Contact rapide ═══ */}
        <div className="hidden lg:block bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 flex items-center justify-between h-9 text-xs">
          <ul className="flex items-center gap-5 list-none" aria-label="Informations entreprise">
            <li className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              Lun-Sam : 8h-18h
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
          </ul>
        </div>
        </div>

        {/* ═══ NAV PRINCIPALE ═══ */}
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-16 py-2 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-3 lg:h-[68px] lg:py-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink-0 max-w-[min(100%,280px)] lg:max-w-[320px]">
            <img
              src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_auto,q_auto,w_144,h_144,c_thumb,g_center/v1773953029/Capture_d_e%CC%81cran_2026-03-19_a%CC%80_21.43.35_zqhtvo.png"
              alt=""
              width="56"
              height="56"
              className="w-14 h-14 lg:w-[72px] lg:h-[72px] shrink-0 rounded-full shadow-md group-hover:shadow-lg transition-shadow object-cover bg-white ring-2 ring-white"
              aria-hidden="true"
            />
            <div className="min-w-0 leading-tight">
              <span className="text-base sm:text-lg font-black text-gray-900 block truncate">Nature Clean</span>
              <span className="ncm-brand-signature ncm-brand-signature--header mt-1.5">
                Au-delà du nettoyage, un véritable entretien professionnel
              </span>
            </div>
          </Link>

          {/* ═══ Navigation Desktop — AnimatedTabs + menus ═══ */}
          <nav
            className="hidden lg:flex min-w-0 items-center justify-center px-1"
            aria-label="Navigation principale"
          >
            <div
              ref={navMenuRef}
              className="relative min-w-0"
              onMouseLeave={() => {
                handleEntrepriseLeave();
                handleMouseLeave();
              }}
            >
              <AnimatedTabs
                tabs={HEADER_MAIN_TABS}
                activeTab={activeHeaderTab}
                onTabChange={handleHeaderTabChange}
                layoutId="ncm-header-main-tabs"
                ariaLabel="Navigation principale"
                className="max-w-full"
                dropdownTabs={['Entreprise', 'Plus']}
                isDropdownOpen={(tab) =>
                  (tab === 'Entreprise' && entrepriseOpen) || (tab === 'Plus' && plusOpen)
                }
              />

              <div
                className={`absolute top-full left-0 mt-2 w-[340px] rounded-xl shadow-2xl overflow-hidden z-50 transition-opacity duration-200 ${
                  entrepriseOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
                }`}
                aria-hidden={!entrepriseOpen}
                onMouseEnter={handleEntrepriseEnter}
                onMouseLeave={handleEntrepriseLeave}
              >
                <div className="rounded-xl border border-gray-100 bg-white shadow-2xl">
                  <ul className="relative list-none space-y-0.5 p-2">
                    {entrepriseServices.map((s) => (
                      <li key={s.href}>
                        <Link
                          to={s.href}
                          className={`group flex min-h-[44px] items-center gap-3 rounded-lg px-2.5 py-2 transition-all ${
                            isActive(s.href) ? 'bg-green-500/15 text-green-700' : 'hover:bg-white/50'
                          }`}
                        >
                          {s.thumb ? (
                            <img
                              src={getOptimizedCldUrl(s.thumb, 96)}
                              alt=""
                              width="44"
                              height="44"
                              className="h-11 w-11 shrink-0 rounded-lg border border-white/60 object-cover shadow-sm transition-colors group-hover:border-green-300/60"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/60 bg-gray-100 shadow-sm transition-colors group-hover:border-green-300/60">
                              <s.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 transition-colors group-hover:text-green-700">{s.label}</div>
                            <div className="text-xs text-gray-500">{s.desc}</div>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-colors group-hover:text-green-500" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="relative border-t border-white/30 px-2 py-2">
                    <Link
                      to="/services"
                      className="flex min-h-[44px] items-center justify-between rounded-lg bg-green-700 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
                    >
                      Tous nos services
                      <ChevronRight className="h-4 w-4 text-white" />
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-2xl overflow-hidden z-50 transition-opacity duration-200 ${
                  plusOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
                }`}
                aria-hidden={!plusOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="rounded-xl border border-gray-100 bg-white shadow-2xl">
                  <ul className="relative list-none space-y-0.5 p-2">
                    {secondaryPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          to={page.href}
                          className={`group flex min-h-[44px] items-center gap-3 rounded-lg px-2.5 py-2.5 transition-all ${
                            isActive(page.href) ? 'bg-green-500/15 text-green-700' : 'hover:bg-white/50'
                          }`}
                        >
                          <img
                            src={getOptimizedCldUrl(page.thumb, 96)}
                            alt=""
                            width="48"
                            height="48"
                            className="h-12 w-12 shrink-0 rounded-lg border border-white/60 object-cover shadow-sm transition-colors group-hover:border-green-300/60"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900">{page.label}</div>
                            <div className="mt-0.5 text-xs text-gray-500">{page.desc}</div>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-colors group-hover:text-green-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="relative border-t border-white/30 px-2 py-2">
                    <Link
                      to="/services"
                      className="flex min-h-[44px] items-center justify-between rounded-lg bg-green-700 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
                    >
                      Voir tous nos services
                      <ChevronRight className="h-4 w-4 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop — téléphone + devis */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 justify-self-end">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-1 px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-bold text-green-800 border border-green-200 bg-green-50 hover:bg-green-100 transition-colors whitespace-nowrap min-h-[44px]"
              aria-label={ARIA_PHONE}
            >
              <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <Button
              asChild
              variant="shine"
              size="sm"
              className="rounded-lg px-3 xl:px-4 text-xs xl:text-sm min-h-[44px] whitespace-nowrap"
            >
              <Link to={smartDevisLink}>
                <FileText className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                Devis gratuit
              </Link>
            </Button>
          </div>

          {/* Mobile : menu uniquement (CTA dans le panneau menu / footer) */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
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
      </div>

      {/* ═══ MENU MOBILE SLIDE-IN PANEL ═══ */}
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
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-black text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ═══ Navigation mobile ═══ */}
            <ul className="space-y-1 list-none p-4 pt-3">
              <li>
                <Link
                  to="/"
                  className={`flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                    isActive('/') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span className="font-medium">Accueil</span>
                </Link>
              </li>

              {MOBILE_SERVICE_NAV.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors min-h-[48px] ${
                      isActive(s.href) ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {'thumb' in s && s.thumb ? (
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
                  className="flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-green-700 transition-colors hover:bg-green-50"
                >
                  Tous les services
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>

              <li className="pt-3 pb-1" aria-hidden="true">
                <div className="border-t border-gray-100" />
              </li>
              <li>
                <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">Plus</p>
              </li>

              {secondaryPages.map((page) => (
                <li key={page.href}>
                  <Link
                    to={page.href}
                    className={`flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                      isActive(page.href) ? 'bg-green-50 font-medium text-green-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={getOptimizedCldUrl(page.thumb, 72)}
                      alt=""
                      width="32"
                      height="32"
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm">{page.label}</span>
                      <span className="block text-[11px] text-gray-500">{page.desc}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}