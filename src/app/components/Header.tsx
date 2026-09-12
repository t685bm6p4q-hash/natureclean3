import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Phone, Menu, X, ChevronDown, ChevronRight,
  Building2, Store, HardHat, Layers, Droplet, User,
  Clock, Mail, FileText, MapPin, Shield, Heart, Eraser,
  Home as HomeIcon, Zap, MoreHorizontal, ImageIcon, Info, BookOpen, Sparkles
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useFocusTrap } from '@/app/hooks/useFocusTrap';
import { IMAGES } from '@/app/utils/images';
import { getOptimizedCldUrl } from '@/app/utils/cloudinaryHelper';
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, EMAIL_HREF, ARIA_PHONE, ARIA_EMAIL } from '@/app/utils/constants';

/* ──────────────────────────────────────────────────────────
   SMART DEVIS — Mapping page service → ?service=xxx
   Permet au bouton "Devis gratuit" du header de pointer vers
   le bon paramètre selon la page courante.
   ────────────────────────────────────────────────────────── */
const SERVICE_PAGE_DEVIS_MAP: Record<string, string> = {
  '/services/entretien-bureaux':         '/devis?service=bureaux',
  '/services/nettoyage-commerces':       '/devis?service=commerces',
  '/services/nettoyage-chantiers':       '/devis?service=fin-chantier',
  '/services/nettoyage-coproprietes':    '/devis?service=coproprietes',
  '/services/nettoyage-diogene':         '/devis?service=diogene',
  '/services/nettoyage-evenementiel':    '/devis?service=evenementiel',
  '/services/nettoyage-graffitis':       '/devis?service=graffitis',
  '/services/nettoyage-gros-chantiers':  '/devis?service=gros-chantier',
  '/services/remise-etat-sols':          '/devis?service=sols',
  '/nettoyage-particuliers':             '/devis?service=particuliers',
  '/nettoyage-vitre':                    '/devis?service=vitres',
};

/* ──────────────────────────────────────────────────────────
   DATA : Services — liens directs dans la nav pour SEO max
   ────────────────────────────────────────────────────────── */

/** Dropdown "Entreprise" — Bureaux, Commerces, Chantiers, Sols, Vitres, Evénementiel */
const entrepriseServices = [
  { icon: Building2, label: 'Bureaux', href: '/services/entretien-bureaux', desc: 'Nettoyage professionnel', thumb: IMAGES.entrepriseBureauxMarseille },
  { icon: Store, label: 'Commerces', href: '/services/nettoyage-commerces', desc: 'Entretien de locaux', thumb: IMAGES.vitrineBoutiqueLuxe },
  { icon: HardHat, label: 'Chantiers', href: '/services/nettoyage-chantiers', desc: 'Remise en etat', thumb: IMAGES.finChantierMarseille },
  { icon: Layers, label: 'Sols', href: '/services/remise-etat-sols', desc: 'Decapage & cristallisation', thumb: IMAGES.monobrosseAction },
  { icon: Droplet, label: 'Vitres', href: '/services/nettoyage-vitre', desc: 'Vitrerie en hauteur', thumb: IMAGES.facadeVitreeImmeuble },
  { icon: Sparkles, label: 'Événementiel', href: '/services/nettoyage-evenementiel', desc: 'Propreté pré/post événement', thumb: IMAGES.salleEvenementielle },
  { icon: Eraser,   label: 'Graffitis',    href: '/services/nettoyage-graffitis',    desc: 'Effacement tags & façades',  thumb: IMAGES.graffitiCarrefourAvant },
] as const;

/** Liens individuels directs dans la nav */
const individualServices = [
  { icon: HomeIcon, label: 'Coproprietes', href: '/services/nettoyage-coproprietes' },
  { icon: User, label: 'Particuliers', href: '/nettoyage-particuliers' },
  { icon: Heart, label: 'Diogene', href: '/services/nettoyage-diogene' },
  { icon: HardHat, label: 'Gros Chantiers', href: '/services/nettoyage-gros-chantiers' },
] as const;

/** Pages secondaires dans le dropdown "Plus" */
const secondaryPages = [
  {
    icon: ImageIcon,
    label: 'Realisations',
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
    label: 'A propos',
    href: '/a-propos',
    desc: 'Notre equipe et nos valeurs',
    thumb: IMAGES.equipe4Personnes,
  },
  {
    icon: BookOpen,
    label: 'Blog',
    href: '/blog',
    desc: 'Conseils et actualites',
    thumb: IMAGES.carnetBlog,
  },
  {
    icon: Mail,
    label: 'Contact',
    href: '/contact',
    desc: 'Nous ecrire ou nous appeler',
    thumb: IMAGES.poigneeMainDevis,
  },
] as const;

/* ──────────────────────────────────────────────
   COMPOSANT HEADER
   ───────────────────────────────────────────── */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [entrepriseOpen, setEntrepriseOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const entrepriseRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useFocusTrap(mobileMenuOpen);
  const location = useLocation();
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPlusOpen(false);
      }
      if (entrepriseRef.current && !entrepriseRef.current.contains(event.target as Node)) {
        setEntrepriseOpen(false);
      }
    };
    if (plusOpen || entrepriseOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [plusOpen, entrepriseOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileMoreOpen(false);
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

  /** Lien du bouton "Devis gratuit" — contextualisé si on est sur une page service */
  const smartDevisLink = SERVICE_PAGE_DEVIS_MAP[location.pathname] ?? '/devis';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ═══ TOP BAR : Confiance & Contact rapide ═══ */}
      <div className="hidden lg:block bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 flex items-center justify-between h-9 text-xs">
          <ul className="flex items-center gap-5 list-none" aria-label="Informations entreprise">
            <li className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              Lun-Sam : 8h-18h
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              Marseille & PACA
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

      {/* ═══ NAV PRINCIPALE ═══ */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
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

          {/* ═══ Navigation Desktop — Services en liens directs ═══ */}
          <nav className="hidden lg:block" aria-label="Navigation principale">
            <ul className="flex items-center gap-0.5 list-none">
              {/* ═══ Dropdown "Entreprise" — Bureaux, Commerces, Chantiers ═══ */}
              <li
                className="relative"
                ref={entrepriseRef}
                onMouseEnter={handleEntrepriseEnter}
                onMouseLeave={handleEntrepriseLeave}
              >
                <button
                  onClick={() => setEntrepriseOpen((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all min-h-[44px] ${
                    isEntrepriseActive
                      ? 'text-green-700 bg-green-50 font-medium'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50/60'
                  }`}
                  aria-expanded={entrepriseOpen}
                  aria-haspopup="true"
                >
                  <Building2 className={`w-3.5 h-3.5 flex-shrink-0 ${isEntrepriseActive ? 'text-green-600' : 'text-gray-400'}`} aria-hidden="true" />
                  <span>Entreprise</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${entrepriseOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                <div
                  className={`absolute top-full left-0 mt-1.5 w-[340px] rounded-xl shadow-2xl overflow-hidden z-50 transition-opacity duration-200 ${
                    entrepriseOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!entrepriseOpen}
                >
                    {/* ── Zone GAUCHE : opaque + blur (couvre texte) ── */}
                    <div className="absolute inset-y-0 left-0 w-[74%] bg-white/92 backdrop-blur-xl pointer-events-none" aria-hidden="true" />
                    {/* ── Zone DROITE : RIEN — 100% transparent, on voit la page ── */}
                    {/* ── Bordure vitre verticale — trait lumineux net ── */}
                    <div className="absolute inset-y-0 left-[74%] w-[3px] pointer-events-none z-10" aria-hidden="true">
                      <div className="absolute inset-0 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <div className="absolute inset-0 translate-x-[3px] w-[1px] bg-white/30" />
                    </div>
                    {/* ── Reflets vitre ultra-légers côté droit ── */}
                    <div className="absolute top-0 left-[75%] right-0 h-full pointer-events-none overflow-hidden" aria-hidden="true">
                      <div className="absolute -top-1/2 -right-1/4 w-full h-[200%] rotate-[20deg] bg-gradient-to-b from-white/10 via-transparent to-white/8 blur-[1px]" />
                    </div>
                    {/* ── Cadre extérieur ─ */}
                    <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-black/[0.05] pointer-events-none" aria-hidden="true" />
                    <ul className="relative p-2 space-y-0.5 list-none">
                      {entrepriseServices.map((s) => (
                        <li key={s.href}>
                        <Link
                          to={s.href}
                          className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all group min-h-[44px] ${
                            isActive(s.href) ? 'bg-green-500/15 text-green-700' : 'hover:bg-white/50'
                          }`}
                        >
                          {s.thumb ? (
                            <img
                              src={getOptimizedCldUrl(s.thumb, 96)}
                              alt=""
                              width="44"
                              height="44"
                              className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-white/60 group-hover:border-green-300/60 transition-colors shadow-sm"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 border border-white/60 group-hover:border-green-300/60 transition-colors shadow-sm">
                              <s.icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 group-hover:text-green-700 transition-colors">{s.label}</div>
                            <div className="text-xs text-gray-500">{s.desc}</div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" aria-hidden="true" />
                        </Link>
                        </li>
                      ))}
                    </ul>
                    {/* CTA intégré — vert avec flèche blanche */}
                    <div className="relative px-2 py-2 border-t border-white/30">
                      <Link
                        to="/services"
                        className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg transition-colors shadow-sm"
                      >
                        Tous nos services
                        <ChevronRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                  </div>
              </li>

              {/* Liens individuels directs */}
              {individualServices.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm transition-all min-h-[44px] ${
                      isActive(s.href)
                        ? 'text-green-700 bg-green-50 font-medium'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50/60'
                    }`}
                  >
                    <s.icon className={`w-3.5 h-3.5 flex-shrink-0 ${
                      isActive(s.href) ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'
                    }`} />
                    <span>{s.label}</span>
                  </Link>
                </li>
              ))}

              {/* Separateur visuel */}
              <li aria-hidden="true" className="w-px h-6 bg-gray-200 mx-1" />

              {/* Dropdown "Plus" pour pages secondaires */}
              <li
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setPlusOpen((v) => !v)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
                    isSecondaryActive
                      ? 'text-green-700 bg-green-50'
                      : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                  }`}
                  aria-expanded={plusOpen}
                  aria-haspopup="true"
                >
                  <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium text-sm">Plus</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${plusOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {/* ══ DROPDOWN "Plus" — avec vignettes AVIF ═══ */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl shadow-2xl overflow-hidden z-50 transition-opacity duration-200 ${
                    plusOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!plusOpen}
                >
                    {/* ── Zone GAUCHE : opaque + blur (couvre texte) ── */}
                    <div className="absolute inset-y-0 left-0 w-[74%] bg-white/92 backdrop-blur-xl pointer-events-none" aria-hidden="true" />
                    {/* ── Zone DROITE : RIEN — 100% transparent ── */}
                    {/* ── Bordure vitre verticale — trait lumineux net ── */}
                    <div className="absolute inset-y-0 left-[74%] w-[3px] pointer-events-none z-10" aria-hidden="true">
                      <div className="absolute inset-0 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <div className="absolute inset-0 translate-x-[3px] w-[1px] bg-white/30" />
                    </div>
                    {/* ── Reflets vitre ultra-légers côté droit ── */}
                    <div className="absolute top-0 left-[75%] right-0 h-full pointer-events-none overflow-hidden" aria-hidden="true">
                      <div className="absolute -top-1/2 -right-1/4 w-full h-[200%] rotate-[20deg] bg-gradient-to-b from-white/10 via-transparent to-white/8 blur-[1px]" />
                    </div>
                    {/* ── Cadre extérieur ── */}
                    <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none" aria-hidden="true" />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-black/[0.05] pointer-events-none" aria-hidden="true" />
                    <ul className="relative p-2 space-y-0.5 list-none">
                      {secondaryPages.map((page) => (
                        <li key={page.href}>
                          <Link
                            to={page.href}
                            className={`flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all group min-h-[44px] ${
                              isActive(page.href) ? 'bg-green-500/15 text-green-700' : 'hover:bg-white/50'
                            }`}
                          >
                            {/* Vignette AVIF */}
                            <img
                              src={getOptimizedCldUrl(page.thumb, 96)}
                              alt=""
                              width="48"
                              height="48"
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/60 group-hover:border-green-300/60 transition-colors shadow-sm"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-gray-900">{page.label}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{page.desc}</div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* CTA integre au dropdown */}
                    <div className="relative px-2 py-2 border-t border-white/30">
                      <Link
                        to="/services"
                        className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg transition-colors shadow-sm min-h-[44px]"
                      >
                        Voir tous nos services
                        <ChevronRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                  </div>
              </li>
            </ul>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-3">
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

          {/* Mobile : Telephone + Burger (tap targets 44px) */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              className="p-2.5 bg-green-700 text-white rounded-xl shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={ARIA_PHONE}
            >
              <Phone className="w-5 h-5" />
            </a>
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

            {/* CTA mobile prioritaire */}
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

            {/* ═══ Navigation mobile : Services directs en priorite ═══ */}
            <ul className="p-4 space-y-1 list-none">
              <li>
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors min-h-[48px] ${
                    isActive('/') ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="font-medium">Accueil</span>
                </Link>
              </li>

              {/* Titre section services */}
              <li className="pt-3 pb-1 px-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" aria-hidden="true" />
                  Entreprise
                </span>
              </li>

              {/* Services entreprise — liens directs */}
              {entrepriseServices.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors min-h-[48px] ${
                      isActive(s.href) ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
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

              {/* Titre section autres services */}
              <li className="pt-3 pb-1 px-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  Autres Services
                </span>
              </li>

              {/* Services individuels — liens directs */}
              {individualServices.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors min-h-[48px] ${
                      isActive(s.href) ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <s.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{s.label}</span>
                  </Link>
                </li>
              ))}

              {/* Lien tous les services */}
              <li>
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-green-700 rounded-xl hover:bg-green-50 transition-colors min-h-[44px]"
                >
                  Tous les services
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </li>

              {/* Separateur */}
              <li aria-hidden="true" className="mx-4 border-t border-gray-100 my-2" />

              {/* Pages secondaires — Accordion "Plus" */}
              <li>
                <button
                  onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors min-h-[48px] ${
                    isSecondaryActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-expanded={mobileMoreOpen}
                >
                  <span className="flex items-center gap-3">
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="font-medium">Plus</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileMoreOpen && (
                  <ul className="mt-1 ml-3 pl-4 border-l-2 border-green-200 space-y-0.5 list-none">
                    {secondaryPages.map((page) => (
                      <li key={page.href}>
                        <Link
                          to={page.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors min-h-[44px] ${
                            isActive(page.href) ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                          }`}
                        >
                          <page.icon className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{page.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            {/* Trust footer mobile */}
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