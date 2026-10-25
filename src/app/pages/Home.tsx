import { Link } from 'react-router';
import { BulletList } from '@/app/components/BulletList';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import {
  Leaf, ArrowRight, Phone, Sparkles, CheckCircle2,
  Star, MapPin, HardHat, Shield, Clock, Banknote, Building, Building2,
  Recycle, Users, SprayCan, Cog, FileCheck, Eraser, Zap, Store, Heart,
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { BRAND_SLOGAN_FULL } from '@/app/constants/brand';
import { homeHeroLcpSrc, homeHeroLcpSrcSet, LCP_HERO } from '@/app/constants/lcpHero';
import { useLcpHeroBoot } from '@/app/hooks/useLcpHeroBoot';
import { IMAGES, cldSrcSet, getOptimizedCldUrl } from '@/app/utils/images';
import { BeforeAfterCompare } from '@/app/components/BeforeAfterCompare';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// ServiceCarousel : import EAGER (direct, non lazy).
//
// Pourquoi eager et pas lazy ?
//   → Avec lazy() : le chunk se charge APRÈS le premier render → transition
//     skeleton→contenu dans le viewport (Moto G Power voit ~270px de la section)
//     → Lighthouse mesure chaque screenshot comme "visuellement incomplet"
//     → Speed Index 4.5-4.6s même avec skeleton statique. Confirmé sur 3 tests.
//   → Eager : ServiceCarousel rend en même temps que le héros, zéro transition,
//     zéro changement visuel après T=FCP → Speed Index attendu ~2.0s.
//
// Coût : +~6KB dans index.js (39.83 → ~46KB).
//   → Desktop TBT : +~12ms (110ms → ~122ms) — même bande de score, desktop reste 98.
//   → Mobile SI : 4.5s → ~2.0s → score mobile 90 → ~94.
import { MobileSnapRail } from '@/app/components/MobileSnapRail';
import { ServiceCarousel } from '@/app/components/ServiceCarousel';
import { RealisationsSlider } from '@/app/components/RealisationsSlider';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { FAQSection, FAQAccordionList } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { SERVED_CITIES_SHORT, MARSEILLE_QUARTIERS } from '@/app/config/zone-data';

/* ──────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const stats = [
  { icon: Clock, value: '2021', label: 'Année de création' },
  { icon: Shield, value: 'RC Pro', label: 'Assurance professionnelle' },
  { icon: Clock, value: '24 h', label: 'Devis gratuit' },
  { icon: Recycle, value: '50 %', label: 'Produits éco-labellisés' },
];

const whyUs = [
  { icon: SprayCan, title: 'Produits d\'entretien fournis', desc: 'Produits professionnels inclus dans chaque prestation — 50 % sont éco-labellisés. Vous ne fournissez rien.' },
  { icon: Cog, title: 'Machinerie professionnelle', desc: 'Autolaveuses, monobrosses, aspirateurs industriels — matériel de pointe pour un résultat impeccable.' },
  { icon: Users, title: 'Personnel formé & déclaré', desc: 'Équipes qualifiées, formées aux normes d\'hygiène et de sécurité, déclarées et en conformité.' },
  { icon: Banknote, title: 'Tarifs transparents', desc: 'Devis détaillé, gratuit et sans engagement. Réponse sous 2 h, devis sous 24 h — sans frais cachés.' },
  { icon: Shield, title: 'Assurance RC Pro', desc: 'Responsabilité civile professionnelle et garantie de résultat sur chaque intervention.' },
  { icon: FileCheck, title: 'Contrats sur mesure', desc: 'Ponctuel ou récurrent, horaires flexibles 6h-22h, 7j/7 — on s\'adapte à vos contraintes.' },
];

const zones = [...SERVED_CITIES_SHORT];
const quartiersMarseille = [...MARSEILLE_QUARTIERS];

/** Maillage SEO — landings locales indexables (Bouches-du-Rhône). */
const localExpertisePages = [
  {
    to: '/nettoyage-bureaux-marseille',
    title: 'Nettoyage de bureaux à Marseille',
    subtitle: '13001 à 13016',
    icon: Building,
  },
  {
    to: '/nettoyage-bureaux-aix-en-provence',
    title: 'Nettoyage de bureaux à Aix',
    subtitle: 'Accès, Milles, Duranne',
    icon: Building,
  },
  {
    to: '/nettoyage-coproprietes-aubagne',
    title: 'Copropriétés à Aubagne',
    subtitle: 'Syndics — Est 13',
    icon: Building2,
  },
  {
    to: '/nettoyage-coproprietes-la-ciotat',
    title: 'Copropriétés à La Ciotat',
    subtitle: 'Parties communes',
    icon: Building2,
  },
  {
    to: '/services/nettoyage-chantiers',
    title: 'Fin de chantier',
    subtitle: 'Après travaux',
    icon: HardHat,
  },
  {
    to: '/services/nettoyage-commerces',
    title: 'Nettoyage de commerces à Marseille',
    subtitle: 'Boutiques, vitrines, surfaces de vente',
    icon: Store,
  },
] as const;

const HOME_FAQ: FAQItem[] = [
  {
    question: 'Comment sont calculés vos tarifs ?',
    answer: 'Chaque prestation est chiffrée sur mesure selon la surface, la fréquence d’intervention et l’état des locaux. Le devis est gratuit, détaillé et sans frais cachés, et il vous est remis avant le début de la prestation.',
  },
  {
    question: 'Pourquoi ne pas afficher vos prix en ligne ?',
    answer: 'Un nettoyage de bureaux, une fin de chantier et un logement très encombré n’ont rien en commun. Un prix affiché serait faux dans la plupart des cas, alors nous préférons un devis précis, gratuit et sous 24 h.',
  },
  {
    question: 'En combien de temps recevrai-je mon devis ?',
    answer: 'Nous répondons à votre demande sous 2 h en horaires d’ouverture (lun–sam 8h–18h), et vous remettons un devis détaillé sous 24 h.',
  },
  {
    question: 'Qui fournit les produits et le matériel ?',
    answer: 'Nous. Produits professionnels, autolaveuses, monobrosses et aspirateurs industriels sont inclus dans chaque prestation. Vous ne fournissez rien.',
  },
  {
    question: 'Vos produits sont-ils écologiques ?',
    answer: 'Environ 50 % de nos produits d’entretien courant sont éco-labellisés. Pour la désinfection des locaux (cabinets médicaux notamment), nous utilisons des produits professionnels adaptés — sans stérilisation d’instruments ni gestion des DASRI.',
  },
  {
    question: 'Intervenez-vous en dehors des horaires de bureau, le week-end ?',
    answer: 'Oui, dans le cadre de contrats sur mesure : horaires flexibles de 6 h à 22 h, 7 j/7, sans perturber votre activité. Notre standard est ouvert du lundi au samedi, de 8 h à 18 h.',
  },
  {
    question: 'Dans quelles zones intervenez-vous ?',
    answer: 'Marseille (13001 à 13016), Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Salon-de-Provence, Istres et Martigues. Nous sommes basés dans le 8e arrondissement.',
  },
  {
    question: 'Êtes-vous assurés ?',
    answer: 'Oui. Nature Clean est couverte par une assurance responsabilité civile professionnelle (RC Pro) sur chaque intervention.',
  },
  {
    question: 'Comment se passe un nettoyage de fin de chantier ?',
    answer: 'Après la visite, nous retirons poussières, résidus de plâtre et de béton, nettoyons sols, murs, vitres et sanitaires, et évacuons les menus gravats. Le logement ou le local est remis propre et conforme, dans les délais convenus.',
  },
  {
    question: 'Proposez-vous des contrats récurrents ?',
    answer: 'Oui : ponctuel ou récurrent (quotidien, hebdomadaire, mensuel), avec un contrat sur mesure et un interlocuteur dédié.',
  },
  {
    question: 'Faites-vous le nettoyage de copropriétés et d’immeubles ?',
    answer: 'Oui : halls, escaliers, parties communes, vitres, sols. Nous travaillons avec des syndics de Marseille, Aubagne et La Ciotat.',
  },
];

/** FAQ accueil — hors questions tarifs (déjà couvertes par le devis / page services). */
const HOME_FAQ_ON_PAGE_ORDER = [
  'Dans quelles zones intervenez-vous ?',
  'Qui fournit les produits et le matériel ?',
  'Intervenez-vous en dehors des horaires de bureau, le week-end ?',
  'Êtes-vous assurés ?',
  'Comment se passe un nettoyage de fin de chantier ?',
  'Proposez-vous des contrats récurrents ?',
  'Faites-vous le nettoyage de copropriétés et d’immeubles ?',
  'Vos produits sont-ils écologiques ?',
] as const;

function homeFaqForDisplay(maxCount: number): FAQItem[] {
  const byQuestion = new Map(HOME_FAQ.map((item) => [item.question, item]));
  return HOME_FAQ_ON_PAGE_ORDER.map((q) => byQuestion.get(q)).filter((item): item is FAQItem => item != null).slice(0, maxCount);
}

const DIOGENE_HOME_FAQ: FAQItem[] = [
  {
    question: 'Peut-on intervenir si la personne n’est pas d’accord ?',
    answer: 'Nous intervenons avec l’accord de l’occupant ou de son représentant légal (tuteur, curateur, mandataire). Si la situation est complexe, nous pouvons vous orienter vers les interlocuteurs adaptés : médecin, assistante sociale, mairie.',
  },
  {
    question: 'Combien de temps dure une intervention ?',
    answer: 'De quelques heures à plusieurs jours selon le logement. Nous vous donnons une estimation précise lors de la visite.',
  },
  {
    question: 'Les voisins ou le syndic seront-ils informés ?',
    answer: 'Non, pas par nous. Nous restons discrets sur les lieux et sur la nature de l’intervention.',
  },
];

const DIOGENE_STEPS = [
  {
    title: 'Appel et échange confidentiel',
    desc: 'Vous nous décrivez la situation, sans filtre. Réponse sous 2 h en horaires d’ouverture.',
  },
  {
    title: 'Visite et devis gratuit',
    desc: 'Nous évaluons le volume, l’état du logement et les accès, puis vous remettons un devis détaillé sous 24 h.',
  },
  {
    title: 'Tri et évacuation',
    desc: 'Débarras des encombrants et déchets, avec mise de côté des objets de valeur ou à caractère personnel, selon vos consignes.',
  },
  {
    title: 'Nettoyage et désinfection',
    desc: 'Sols, murs, sanitaires, cuisine, avec du matériel professionnel et des produits fournis.',
  },
  {
    title: 'Remise du logement',
    desc: 'Un état des lieux final, avec photos si vous le souhaitez.',
  },
];

const realisationsPreview = [
  {
    title: 'Remise en état urgence — boutique prêt-à-porter Marseille',
    category: 'Cas clients',
    image: IMAGES.magasinPretAPorterUrgence,
    location: 'Marseille',
  },
  {
    title: 'Nettoyage de vitrines de boutique en centre commercial, Marseille',
    category: 'Commerces',
    image: IMAGES.vitrinesBoutiqueCentreCommercialMarseille,
    location: 'Marseille — centre commercial',
  },
  {
    title: 'Entretien entrée et sols — boutique jeux vidéo, Marseille',
    category: 'Commerces',
    image: IMAGES.entretienEntreeBoutiqueCentreCommercialMarseille,
    location: 'Marseille — centre commercial',
  },
  {
    title: 'Entretien bureaux — Entreprise Marseille',
    category: 'Entretien bureaux',
    image: IMAGES.entrepriseBureauxMarseille,
    location: 'Marseille',
  },
  {
    title: 'Remise en état appartement — Aubagne',
    category: 'Fin de chantier',
    image: IMAGES.finChantierAppartement,
    location: 'Aubagne',
  },
  {
    title: 'Nettoyage fin de chantier — Intervention Nature Clean',
    category: 'Fin de chantier',
    image: IMAGES.nettoyageFinChantier,
    location: 'Marseille',
  },
  {
    title: 'Mariage champêtre — 200 convives',
    category: 'Événementiel',
    image: IMAGES.salleEvenementielle,
    location: 'Cassis',
  },
  {
    title: 'Désinfection cabinet médical Marseille',
    category: 'Cabinets médicaux',
    image: IMAGES.cabinetMedical,
    location: 'Marseille',
  },
];

/** Home version courte — `git revert` du commit « version courte » ou `HOME_SHORT = false` pour la home longue. */
const HOME_SHORT = true;
const HOME_FAQ_VISIBLE_COUNT = 5;
/** Limites affichées sur mobile uniquement quand HOME_SHORT (desktop = contenu complet). */
const HOME_SHORT_MOBILE_WHY_US = 4;
const HOME_SHORT_MOBILE_EXPERTISE = 4;
const HOME_SHORT_MOBILE_REALISATIONS = 4;

const cardBgs = [
  IMAGES.openSpaceBureaux,
  IMAGES.openSpaceIndustrielNuit,
  IMAGES.equipe4Personnes,
  IMAGES.grandOpenSpaceModerne,
  IMAGES.finChantierMaison,
  IMAGES.salleConference,
];

export function Home() {
  const { heroReady, onHeroReady } = useLcpHeroBoot();

  return (
    <>
      <SEO_Guardian
        currentSection="home"
        faqItems={
          HOME_SHORT
            ? homeFaqForDisplay(HOME_FAQ_VISIBLE_COUNT)
            : [...homeFaqForDisplay(HOME_FAQ_VISIBLE_COUNT), ...DIOGENE_HOME_FAQ]
        }
      />

      {/* ═══════════════════════════════════════════
          1. HERO — Impact visuel + CTA
          ══════════════════════════════════════════ */}
      <section className="ncm-home-hero relative min-h-[max(420px,58vh)] overflow-hidden text-white md:min-h-[36rem] md:pb-24">
        <img
          id="ncm-hero-react"
          src={homeHeroLcpSrc()}
          srcSet={homeHeroLcpSrcSet()}
          sizes="100vw"
          alt="Vue de Marseille et Notre-Dame de la Garde depuis une baie vitrée — Nature Clean"
          width={LCP_HERO.intrinsicWidth}
          height={LCP_HERO.intrinsicHeight}
          loading="eager"
          // @ts-ignore — attribut HTML valide (React 18 typings)
          fetchpriority="high"
          decoding="async"
          onLoad={onHeroReady}
          className={`absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center ${heroReady ? 'opacity-100' : 'opacity-0'}`}
        />

        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950/95 via-gray-900/50 to-gray-900/15 md:bg-gradient-to-r md:from-gray-950/88 md:via-gray-900/45 md:to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-4 pt-6 pb-6 md:pt-28 md:pb-10">
          <div className="max-w-lg md:max-w-3xl lg:max-w-4xl ncm-hero-fade-in">
            <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-sm border border-white/20 text-green-100 px-3 py-1 rounded-full text-xs md:text-sm mb-3 md:mb-4">
              <Leaf className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-bold text-white">Nature Clean</strong>
                {' · '}Marseille depuis 2021
              </span>
            </div>

            <p className="ncm-brand-signature ncm-brand-signature--on-dark mb-3 max-w-xl text-sm md:mb-4 md:text-base">
              {BRAND_SLOGAN_FULL}
            </p>

            <h1 className="ncm-display-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Entreprise de nettoyage
              <span className="block text-green-400">professionnel à Marseille</span>
            </h1>
            <p className="text-base md:text-xl text-gray-100 mb-6 md:mb-8 max-w-xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Bureaux, copropriétés, fin de chantier — Nature Clean intervient à Marseille
              et dans les Bouches-du-Rhône. Réponse sous 2 h, devis gratuit sous 24 h.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <Button
                asChild
                variant="shine"
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-gray-900 font-black text-base px-8 shadow-lg shadow-green-500/25 w-full sm:w-auto border-green-400/40"
              >
                <Link to="/devis">
                  Obtenir mon devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outlineOnDark" className="w-full sm:w-auto font-semibold">
                <a href={PHONE_HREF} className="flex items-center justify-center gap-2" aria-label={ARIA_PHONE}>
                  <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats : en flux sur mobile (évite chevauchement CTA) · fixe en bas sur desktop */}
        <div className="relative z-10 bg-gray-950/80 backdrop-blur-sm border-t border-white/10 md:absolute md:bottom-0 md:left-0 md:right-0">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 py-3 px-2 sm:gap-3 sm:py-4 sm:px-4 md:py-5 md:px-6 min-w-0"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-white font-black text-base sm:text-lg md:text-xl leading-tight">{stat.value}</div>
                    <div className="text-gray-300 text-[10px] sm:text-xs leading-snug">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. CARROUSEL DES 9 SERVICES
          ══════════════════════════════════════════ */}
      <section className="pt-10 pb-5 md:py-20 bg-gray-50 overflow-x-clip ncm-below-fold">
        <div className="container mx-auto px-4">
          <ScrollReveal eager>
            <div className="text-center mb-6 md:mb-12">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                9 spécialités
              </span>
              <h2 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-4">
                Nos services d'entretien et de nettoyage
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Des solutions professionnelles adaptées à chaque besoin — de l'entretien courant aux interventions ponctuelles, y compris le nettoyage Diogène.
              </p>
            </div>
          </ScrollReveal>

          <ServiceCarousel />

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-5 md:mt-12">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-bold">
                <Link to="/services">
                  Découvrir tous nos services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. POURQUOI NOUS CHOISIR — 6 avantages
          ═══════════════════════════════════════════ */}
      <section className="pt-5 pb-10 md:py-24 bg-white overflow-hidden ncm-below-fold">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-12 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Nos engagements
              </span>
              <h2 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-4">
                Pourquoi choisir Nature Clean ?
              </h2>
              <p className="text-lg text-gray-500">
                Plus qu'un prestataire, un partenaire de confiance pour l'entretien de vos locaux.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {/* Mobile : scroll horizontal — Desktop : grille 3 colonnes */}
            <div className="-mx-4 px-4 pb-1 md:pb-0 flex overflow-x-auto snap-x snap-mandatory gap-4 md:mx-auto md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:gap-6 lg:grid-cols-3 max-w-5xl">
              {whyUs.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex-shrink-0 w-[82vw] snap-start md:w-auto group relative overflow-hidden p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all${HOME_SHORT && i >= HOME_SHORT_MOBILE_WHY_US ? ' max-md:hidden' : ''}`}
                >
                  {/* Ambient background — ultra-light, masqué sur mobile */}
                  <img
                    src={getOptimizedCldUrl(cardBgs[i], 250)}
                    srcSet={`${getOptimizedCldUrl(cardBgs[i], 250)} 250w, ${getOptimizedCldUrl(cardBgs[i], 450)} 450w`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt=""
                    aria-hidden="true"
                    width={400}
                    height={267}
                    loading="lazy"
                    className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-[0.055] pointer-events-none select-none scale-105 group-hover:opacity-[0.09] transition-opacity duration-500"
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-700 transition-colors">
                      <item.icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ══════════════════════════════════════════
              4. DUO DYNAMIQUE — même section (évite bande blanche doublon mobile)
              ══════════════════════════════════════════ */}
          <div className="max-w-6xl mx-auto mt-6 md:mt-20 pt-5 md:pt-0 border-t border-gray-100 md:border-0">

            {/* ── Titre éditorial ── */}
            <ScrollReveal>
              <div className="text-center mb-6 md:mb-16 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3 md:mb-4">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Expert multi-spécialités à Marseille
                </span>
                <h2 className="ncm-section-title text-3xl md:text-5xl text-gray-900 mb-5">
                  De l'entretien de vos locaux
                  <span className="block text-green-700">à la remise en état après travaux</span>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Peu importe l'état de départ — poussière de chantier, fin de bail
                  ou locaux très fréquentés — le résultat est toujours le même :
                  {' '}<strong className="text-gray-700">soigné et contrôlé en fin de mission.</strong>
                </p>
              </div>
            </ScrollReveal>

            {/* ── BLOC 1 — Commerces & Santé ── */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-20">

              {/* Duo d'images — gauche */}
              <ScrollReveal direction="left">
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-green-100 rounded-2xl -z-10 hidden md:block" />

                  <MobileSnapRail
                    ariaLabel="Photos — locaux professionnels"
                    className="md:hidden"
                    slideClassName="w-[90%] snap-center"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.entrepriseBureauxMarseille, 700)}
                        srcSet={cldSrcSet(IMAGES.entrepriseBureauxMarseille, [350, 600, 900])}
                        sizes="90vw"
                        alt="Open space de bureaux nettoyé à Marseille"
                        className="w-full h-full object-cover"
                        width={600}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          Commerces & magasins · Marseille
                        </span>
                      </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.cabinetMedical, 600)}
                        srcSet={cldSrcSet(IMAGES.cabinetMedical, [300, 500, 700])}
                        sizes="90vw"
                        alt="Agent désinfectant un cabinet médical à Marseille"
                        className="w-full h-full object-cover"
                        width={600}
                        height={256}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Cabinets médicaux · Normes sanitaires
                        </span>
                      </div>
                    </div>
                  </MobileSnapRail>

                  <div className="hidden md:flex relative flex-col gap-3">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-80 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.entrepriseBureauxMarseille, 700)}
                        srcSet={cldSrcSet(IMAGES.entrepriseBureauxMarseille, [350, 600, 900])}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        alt="Open space de bureaux nettoyé à Marseille"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        width={600}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <span className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          Commerces & magasins · Marseille
                        </span>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-xl h-56 lg:h-64 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.cabinetMedical, 600)}
                        srcSet={cldSrcSet(IMAGES.cabinetMedical, [300, 500, 700])}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        alt="Agent désinfectant un cabinet médical à Marseille"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        width={600}
                        height={256}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Cabinets médicaux · Normes sanitaires
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Texte — droite */}
              <ScrollReveal direction="right">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Store className="w-3 h-3" aria-hidden="true" /> Locaux professionnels
                </span>
                <h3 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-4">
                  Vos locaux professionnels
                  <span className="block text-green-600">toujours impeccables</span>
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Commerces en centre-ville, cabinets médicaux, agences, boutiques — vos espaces
                  reflètent votre image. Nos équipes assurent une <strong>propreté irréprochable
                  de vos locaux à Marseille</strong>, en horaires décalés, sans interrompre votre activité.
                </p>
                <BulletList
                  className="mb-8"
                  itemClassName="text-gray-600"
                  lines={[
                    'Entretien régulier magasins & boutiques Marseille',
                    'Entretien et désinfection des locaux — cabinets médicaux',
                    'Vitres, sols, sanitaires & espaces de vente',
                    "Contrats sur mesure, intervention hors heures d'ouverture",
                  ]}
                />
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                    <Link to="/services/nettoyage-commerces">
                      Nettoyage de commerces à Marseille <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-green-600 text-green-800 font-bold">
                    <Link to="/services/nettoyage-cabinet-medical-marseille">
                      Nettoyage de cabinets médicaux à Marseille
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 hover:border-green-300 hover:bg-green-50 font-bold text-green-800">
                    <Link to="/services/entretien-bureaux" className="text-green-800">
                      Nettoyage de bureaux à Marseille
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Bande centrale — Citation clé ── */}
            <ScrollReveal>
              <div className="ncm-shine ncm-shine--band relative z-0 rounded-2xl overflow-hidden bg-gray-900 py-8 px-6 md:py-10 md:px-8 text-center mb-10 md:mb-20 border border-green-600/25 shadow-lg shadow-green-900/10">
                <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
                  <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-500 rounded-full blur-[90px]" />
                  <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500 rounded-full blur-[90px]" />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                  <p className="text-2xl md:text-3xl font-black text-white leading-snug">
                    "Peu importe l'état de départ,
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-green-400 leading-snug mb-3">
                    le résultat est toujours Nature Clean."
                  </p>
                  <p className="ncm-brand-signature ncm-brand-signature--on-dark mx-auto max-w-xl mt-2">
                    Au-delà du nettoyage, un véritable entretien professionnel
                  </p>
                  <p className="ncm-brand-signature-sub text-gray-400 text-xs sm:text-sm leading-relaxed mx-auto max-w-xl mt-3 tracking-normal">
                    Expertise terrain, méthodes rigoureuses et tarifs raisonnables — Marseille et Bouches-du-Rhône (13).
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* ── BLOC 2 — Fin de chantier & Remise en état ── */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Texte — gauche */}
              <ScrollReveal direction="left">
                <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <HardHat className="w-3 h-3" aria-hidden="true" /> Fin de chantier & remise en état
                </span>
                <h3 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-4">
                  Après travaux, fin de bail
                  <span className="block text-amber-600">ou remise en état des sols</span>
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Poussière de béton, résidus de plâtre, terrasses encrassées — la fin de chantier
                  laisse des traces que seule une équipe spécialisée peut effacer. Nature Clean
                  intervient sur <strong>Marseille et les Bouches-du-Rhône</strong> pour une livraison propre,
                  conforme et dans les délais impartis.
                </p>
                <BulletList
                  className="mb-8"
                  bulletClassName="text-amber-600"
                  itemClassName="text-gray-600"
                  lines={[
                    'Nettoyage fin de chantier maison & appartement Marseille',
                    'Remise en état après travaux — fin de bail, locaux pros',
                    'Terrasses, extérieurs & façades professionnels',
                    'Débarras, évacuation gravats, restitution locaux',
                  ]}
                />
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md">
                    <Link to="/services/nettoyage-chantiers">
                      Nettoyage de fin de chantier à Marseille <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 hover:border-amber-300 hover:bg-amber-50 font-bold text-green-800">
                    <Link to="/services/remise-etat-sols" className="text-green-800">
                      Remise en état sols
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>

              {/* Duo d'images — droite */}
              <ScrollReveal direction="right">
                <div className="relative">
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-amber-100 rounded-2xl -z-10 hidden md:block" />

                  <MobileSnapRail
                    ariaLabel="Photos — fin de chantier et extérieurs"
                    className="md:hidden"
                    slideClassName="w-[90%] snap-center"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.finChantierMaison, 640)}
                        srcSet={cldSrcSet(IMAGES.finChantierMaison, [320, 480, 640])}
                        sizes="(max-width: 767px) 82vw, 100vw"
                        alt="Équipe Nature Clean en remise en état après travaux à Marseille"
                        className="w-full h-full object-cover"
                        width={600}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          Fin de chantier maison · Marseille
                        </span>
                      </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.nettoyageTerrassePro, 640)}
                        srcSet={cldSrcSet(IMAGES.nettoyageTerrassePro, [320, 480, 640])}
                        sizes="(max-width: 767px) 82vw, 100vw"
                        alt="Terrasse professionnelle nettoyée à haute pression à Marseille"
                        className="w-full h-full object-cover"
                        width={600}
                        height={256}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Terrasses & extérieurs pro
                        </span>
                      </div>
                    </div>
                  </MobileSnapRail>

                  <div className="hidden md:flex relative flex-col gap-3">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-80 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.finChantierMaison, 640)}
                        srcSet={cldSrcSet(IMAGES.finChantierMaison, [320, 480, 640, 800])}
                        sizes="(max-width: 1023px) 100vw, 38vw"
                        alt="Équipe Nature Clean en remise en état après travaux à Marseille"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        width={600}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          Fin de chantier maison · Marseille
                        </span>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-xl h-56 lg:h-64 group">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.nettoyageTerrassePro, 640)}
                        srcSet={cldSrcSet(IMAGES.nettoyageTerrassePro, [320, 480, 640, 800])}
                        sizes="(max-width: 1023px) 100vw, 38vw"
                        alt="Terrasse professionnelle nettoyée à haute pression à Marseille"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        width={600}
                        height={256}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Terrasses & extérieurs pro
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4b. FOCUS GRAFFITIS — Spotlight service urgent
          ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white overflow-hidden ncm-below-fold">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
              <div className="bg-gray-900 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <ScrollReveal direction="left">
                  <div>
                    <span className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 text-red-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                      <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                      Intervention d'urgence
                    </span>
                    <h2 className="ncm-section-title text-3xl md:text-4xl text-white mb-4">
                      Nettoyage de Graffitis
                      <span className="block text-green-400">& Tags à Marseille</span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Effacement rapide de tags et graffitis sur tous supports — façades, murs, portails, vitres.
                      Intervention sous 48h, aérogommage ou traitement chimique respectueux des matériaux.
                    </p>
                    <BulletList
                      className="mb-8"
                      bulletClassName="text-green-400"
                      itemClassName="text-gray-200"
                      lines={[
                        'Tous supports : pierre, béton, métal, verre',
                        'Aérogommage doux ou nettoyage chimique',
                        'Application de protection anti-graffiti',
                        'Devis gratuit sous 24h',
                      ]}
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
                        <Link to="/services/nettoyage-graffitis">
                          <Eraser className="w-4 h-4 mr-2" aria-hidden="true" />
                          Découvrir ce service
                          <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold">
                        <Link to="/devis" className="!border-white !bg-white/20 !text-white">Demander un devis</Link>
                      </Button>
                    </div>
                    {!HOME_SHORT && (
                      <div className="grid grid-cols-2 gap-4 mt-10">
                        {[
                          { value: '48h', label: "Délai d'intervention" },
                          { value: '24h', label: 'Devis gratuit' },
                          { value: 'RC Pro', label: 'Assurance' },
                          { value: '13', label: 'Dép. Bouches-du-Rhône' },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center"
                          >
                            <div className="text-2xl md:text-3xl font-black text-green-400 mb-1">{stat.value}</div>
                            <div className="text-xs text-gray-300 leading-tight">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
              <BeforeAfterCompare
                beforeSrc={getOptimizedCldUrl(IMAGES.graffitiCarrefourAvant, 700)}
                beforeSrcSet={cldSrcSet(IMAGES.graffitiCarrefourAvant, [400, 700, 900])}
                afterSrc={getOptimizedCldUrl(IMAGES.effacementTagVitrine, 640)}
                afterSrcSet={cldSrcSet(IMAGES.effacementTagVitrine, [400, 640, 700])}
                sizes="(min-width: 1024px) 38vw, 100vw"
                beforeAlt="Façade Carrefour à Marseille recouverte de graffitis, avant intervention Nature Clean"
                afterAlt="Façade Carrefour à Marseille après effacement des tags — Nature Clean"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4c. DIOGÈNE — Teaser (version courte) ou section complète
          ═══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-gray-50 overflow-hidden ncm-below-fold">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {HOME_SHORT ? (
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <ScrollReveal direction="left">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={getOptimizedCldUrl(IMAGES.appartVideLumineux, 800)}
                      srcSet={cldSrcSet(IMAGES.appartVideLumineux, [400, 700, 1000])}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      alt="Intérieur de logement lumineux après remise en propreté"
                      className="w-full h-[240px] lg:h-[320px] object-cover"
                      width={800}
                      height={320}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="right">
                  <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                    <Heart className="w-4 h-4" aria-hidden="true" />
                    Discrétion & accompagnement
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                    Nettoyage syndrome de Diogène à Marseille
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Tri, évacuation et remise en propreté du logement —{' '}
                    <strong className="text-gray-800">sans jugement</strong>, avec l’accord de l’occupant ou de son représentant légal.
                  </p>
                  <BulletList
                    className="mb-6"
                    lines={[
                      'Personnel déclaré, RC Pro, véhicule banalisé sur demande',
                      'Visite et devis gratuits sous 24 h',
                      'Étapes détaillées et FAQ sur la fiche Diogène',
                    ]}
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                      <Link to="/services/nettoyage-diogene">
                        Fiche Diogène complète
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-gray-300 hover:border-green-300 hover:bg-green-50 font-bold">
                      <Link to="/devis?service=diogene">Devis confidentiel</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            ) : (
              <>
                <ScrollReveal>
                  <div className="text-center mb-12 max-w-3xl mx-auto">
                    <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      Discrétion & accompagnement
                    </span>
                    <h2 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-4">
                      Nettoyage syndrome de Diogène à Marseille
                    </h2>
                    <p className="text-lg text-gray-500">
                      Une intervention discrète et encadrée, pour remettre le logement en propreté et en hygiène.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
                  <ScrollReveal direction="left">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <ImageWithFallback
                        src={getOptimizedCldUrl(IMAGES.appartVideLumineux, 800)}
                        srcSet={cldSrcSet(IMAGES.appartVideLumineux, [400, 700, 1000])}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        alt="Intérieur de logement lumineux après remise en propreté"
                        className="w-full h-[280px] lg:h-[420px] object-cover"
                        width={800}
                        height={420}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="right">
                    <div className="space-y-5 text-gray-600 leading-relaxed">
                      <p>
                        Un logement encombré à l’extrême, des accumulations qui s’étendent depuis des mois ou des années : le syndrome de Diogène touche des personnes de tous profils, et leurs proches se sentent souvent démunis. Chez Nature Clean, nous intervenons à Marseille et dans les Bouches-du-Rhône avec une règle simple :{' '}
                        <strong className="text-gray-800">faire le travail sans jugement, avec discrétion et dans le respect de la personne</strong>.
                      </p>
                      <p>
                        Notre équipe déclarée s’occupe du tri, de l’évacuation, du nettoyage en profondeur et de la remise en état de propreté du logement. Nous travaillons avec les familles, les syndics, les bailleurs, les mandataires judiciaires et les services sociaux — avec l’accord de l’occupant ou de son représentant légal.
                      </p>
                      <BulletList
                        lines={[
                          'Discrétion : véhicule banalisé sur demande, horaires adaptés',
                          'Personnel déclaré, assurance RC Pro',
                          'Visite et devis gratuits sous 24 h — sans engagement',
                          'Évacuation vers filières adaptées (benne ou déchetterie)',
                        ]}
                      />
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal>
                  <h3 className="text-2xl font-black text-gray-900 mb-6">
                    Comment se déroule une intervention
                  </h3>
                  <MobileSnapRail
                    ariaLabel="Étapes d'une intervention Diogène"
                    className="mb-3 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4 md:overflow-visible md:snap-none md:max-w-none"
                    slideClassName="w-[85%] max-w-md snap-center md:w-auto"
                  >
                    {DIOGENE_STEPS.map((step, index) => (
                      <article
                        key={step.title}
                        className="bg-white rounded-2xl border border-gray-200 p-5 h-full"
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-black text-sm mb-3">
                          {index + 1}
                        </span>
                        <p className="font-bold text-gray-900 mb-1.5">{step.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      </article>
                    ))}
                  </MobileSnapRail>
                  <p className="text-center text-xs text-gray-400 mb-8 md:hidden">Glissez pour voir les 5 étapes</p>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-10">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      <strong className="text-gray-900">Un devis adapté à chaque situation</strong> : chaque logement est différent, donc nous ne proposons pas de tarif standard. Après une visite gratuite, nous vous remettons un devis détaillé, clair et sans engagement, avant toute intervention.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                        <Link to="/devis?service=diogene">
                          Demander un devis confidentiel
                          <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-gray-300 hover:border-green-300 hover:bg-green-50 font-bold">
                        <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                          <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                          {PHONE_DISPLAY}
                        </a>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <FAQAccordionList items={DIOGENE_HOME_FAQ} defaultOpenFirst={false} />
                  <p className="text-center mt-6">
                    <Link
                      to="/services/nettoyage-diogene"
                      className="text-sm font-semibold text-green-700 hover:text-green-800 underline underline-offset-4"
                    >
                      Voir la page dédiée au nettoyage Diogène à Marseille
                    </Link>
                  </p>
                </ScrollReveal>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. CONVERSION BREAK — Photo immersive mid-page
          ═══════════════════════════════════════════ */}
      <ConversionBreak
        image={IMAGES.equipeCamionnette}
        imageAlt="Équipe Nature Clean prête à intervenir à Marseille"
        title="Devis gratuit sous 24 h"
        subtitle="Intervention à Marseille (13001 à 13016), Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Istres, Martigues et Salon-de-Provence."
        urgencyText="Réponse sous 2 h, devis sous 24 h"
      />

      {/* ═══════════════════════════════════════════
          6. REALISATIONS PREVIEW — 3 cartes
          ════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white ncm-below-fold">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Star className="w-4 h-4" aria-hidden="true" />
                Portfolio
              </span>
              <h2 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-4">
                Nos dernières réalisations
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Découvrez nos interventions récentes auprès de professionnels à Marseille et dans les Bouches-du-Rhône.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="px-6 md:px-8">
            <RealisationsSlider
              items={realisationsPreview}
              mobileItemLimit={HOME_SHORT ? HOME_SHORT_MOBILE_REALISATIONS : undefined}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
                <Link to="/realisations">
                  Voir toutes nos réalisations
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. ENGAGEMENT ECO — Bande accent
          ═══════════════════════════════════════════ */}
      <section className={`${HOME_SHORT ? 'py-10 md:py-12' : 'py-14 md:py-16'} bg-green-700 text-white overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollReveal direction="left">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Leaf className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">
                    Engagement éco-responsable
                  </h2>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  50 % de nos produits sont éco-labellisés pour l'entretien courant. Nous recourons aux
                  normes de désinfection médicale uniquement lorsque la réglementation sanitaire l'exige —
                  expertise pragmatique, propreté irréprochable, impact minimal.
                </p>
                <Button asChild className="bg-white text-green-900 hover:bg-green-50 font-bold shadow-md">
                  <Link to="/a-propos" className="text-green-900">
                    Notre démarche verte
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
              </ScrollReveal>

              <ScrollReveal direction="right" className={HOME_SHORT ? 'max-md:hidden' : undefined}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">50 %</div>
                    <div className="text-sm text-white/80 mt-1">Éco-labellisés</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">Mix</div>
                    <div className="text-sm text-white/80 mt-1">Marques pro éco</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">Inclus</div>
                    <div className="text-sm text-white/80 mt-1">Produits fournis</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">RC Pro</div>
                    <div className="text-sm text-white/80 mt-1">Assurance</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. AVIS GOOGLE — Preuve sociale
          ═══════════════════════════════════════════ */}
      <GoogleReviews spacing="compactBottom" />

      {/* ═══════════════════════════════════════════
          10. ZONE D'INTERVENTION — SEO local
          ═══════════════════════════════════════════ */}
      <section className="pt-3 md:pt-4 pb-14 md:pb-16 bg-gray-50 ncm-below-fold">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-6 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Zone d'intervention
              </span>
              <h2 className="ncm-section-title text-3xl md:text-4xl text-gray-900 mb-3">
                Entretien professionnel à Marseille et dans le 13
              </h2>
              <p className="text-lg text-gray-500">
                Basés à Marseille 8e, nous intervenons à Marseille, Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Salon-de-Provence, Istres et Martigues — réponse sous 2 h, devis gratuit sous 24 h.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto mb-10">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
                Nos expertises locales
              </h3>
              <MobileSnapRail
                ariaLabel="Nos expertises locales"
                className="md:mx-0 md:px-0 md:pb-0 md:grid sm:grid-cols-2 lg:grid-cols-3 md:gap-3 md:overflow-visible md:snap-none md:max-w-none"
                slideClassName="w-[82%] snap-start md:w-auto"
              >
                {localExpertisePages.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`group flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-4 hover:border-green-400 hover:shadow-md transition-all h-full${HOME_SHORT && index >= HOME_SHORT_MOBILE_EXPERTISE ? ' max-md:hidden' : ''}`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700 group-hover:bg-green-100">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-gray-900 group-hover:text-green-800">
                          {item.title}
                        </span>
                        <span className="text-sm text-gray-500">{item.subtitle}</span>
                      </span>
                      <ArrowRight
                        className="w-4 h-4 text-green-600 shrink-0 mt-1 opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </MobileSnapRail>
              <p className="text-center text-xs text-gray-400 mt-2 md:hidden">Glissez pour parcourir les expertises</p>
              <p className="text-center mt-4">
                <Link
                  to="/devis"
                  className="text-sm font-semibold text-green-700 hover:text-green-800 underline underline-offset-4"
                >
                  Demander un devis express
                </Link>
                <span className="text-gray-400 mx-2">·</span>
                <Link
                  to="/zones-intervention"
                  className="text-sm font-semibold text-gray-600 hover:text-green-700"
                >
                  Toutes nos zones
                </Link>
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {zones.map((zone) => (
                <div key={zone} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-green-300 hover:bg-green-50 transition-all">
                  <MapPin className="w-3.5 h-3.5 text-green-500 flex-shrink-0" aria-hidden="true" />
                  <span>{zone}</span>
                </div>
              ))}
            </div>

            {HOME_SHORT && (
              <p className="mt-8 text-center text-sm text-gray-500 max-w-xl mx-auto leading-relaxed md:hidden">
                Tous les arrondissements de Marseille (13001 à 13016) et le détail par quartier sont sur la{' '}
                <Link to="/zones-intervention" className="font-semibold text-green-700 hover:text-green-800 underline underline-offset-4">
                  page zones d’intervention
                </Link>
                .
              </p>
            )}
            <div className={`mt-8${HOME_SHORT ? ' hidden md:block' : ''}`}>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
                Quartiers de Marseille desservis
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {quartiersMarseille.map((q) => (
                  <span key={q} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-green-300 hover:text-green-700 transition-colors">
                    <MapPin className="w-3 h-3 text-green-400 flex-shrink-0" aria-hidden="true" />
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        items={homeFaqForDisplay(HOME_FAQ_VISIBLE_COUNT)}
        title="Questions fréquentes sur nos services de nettoyage à Marseille"
        subtitle="Zones d’intervention, prestations, horaires flexibles et assurance"
        defaultOpenFirst={false}
        footer={
          <span className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <Link
              to="/services"
              className="text-sm font-semibold text-green-700 hover:text-green-800 underline underline-offset-4"
            >
              Voir nos services et demander un devis
            </Link>
            {HOME_SHORT && (
              <>
                <span className="hidden sm:inline text-gray-300" aria-hidden="true">
                  ·
                </span>
                <Link
                  to="/services/nettoyage-diogene"
                  className="text-sm font-semibold text-gray-600 hover:text-green-700 underline underline-offset-4"
                >
                  FAQ nettoyage Diogène
                </Link>
              </>
            )}
          </span>
        }
      />

      {/* ═══════════════════════════════════════════
          11. CTA FINAL — Photo + conversion
          ══════════════════════════════════════════ */}
      {/* content-visibility: auto — dernier bloc, ~3600px sous le fold mobile */}
      <section className="py-12 md:py-24 bg-gray-900 max-md:content-visibility-visible max-md:[contain-intrinsic-size:auto_0px]">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4">
                Prêt à transformer vos locaux ?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto">
                Contactez-nous pour un devis gratuit et personnalisé.
                Réponse sous 2 h, devis sous 24 h — Marseille et Bouches-du-Rhône.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black text-lg px-10 shadow-xl shadow-green-500/20">
                  <Link to="/devis">
                    Obtenir mon devis gratuit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outlineOnDark" className="text-lg">
                  <a href={PHONE_HREF} className="flex items-center justify-center gap-2" aria-label={ARIA_PHONE}>
                    <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}