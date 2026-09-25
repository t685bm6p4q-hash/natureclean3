import { Suspense, lazy } from 'react';
import { Link } from 'react-router';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import {
  Leaf, ArrowRight, Phone, Sparkles, CheckCircle2,
  Star, MapPin, HardHat, Shield, Clock, Banknote,
  Recycle, Users, SprayCan, Cog, FileCheck, Eraser, Zap, Store,
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { IMAGES, cldSrcSet, getOptimizedCldUrl } from '@/app/utils/images';
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
import { ServiceCarousel } from '@/app/components/ServiceCarousel';
import { RealisationsSlider } from '@/app/components/RealisationsSlider';

// GoogleReviews reste lazy : vrai below-fold sur tous les viewports.
const GoogleReviews = lazy(() => import('@/app/components/GoogleReviews').then(m => ({ default: m.GoogleReviews })));

/* ──────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const stats = [
  { icon: Users, value: '500+', label: 'Clients satisfaits' },
  { icon: Shield, value: '100%', label: 'Assuré & certifié' },
  { icon: Clock, value: '24h', label: 'Devis gratuit' },
  { icon: Recycle, value: '50%', label: 'Produits éco-labellisés' },
];

const whyUs = [
  { icon: SprayCan, title: 'Produits d\'entretien fournis', desc: 'Produits professionnels éco-responsables inclus dans chaque prestation — vous ne fournissez rien.' },
  { icon: Cog, title: 'Machinerie professionnelle', desc: 'Autolaveuses, monobrosses, aspirateurs industriels — matériel de pointe pour un résultat impeccable.' },
  { icon: Users, title: 'Personnel formé & déclaré', desc: 'Équipes qualifiées, formées aux normes d\'hygiène et de sécurité, déclarées et en conformité.' },
  { icon: Banknote, title: 'Tarifs transparents', desc: 'Prix justes sans frais cachés, devis détaillé gratuit sous 24h et sans engagement.' },
  { icon: Shield, title: 'Assurance RC Pro', desc: 'Responsabilité civile professionnelle et garantie de résultat sur chaque intervention.' },
  { icon: FileCheck, title: 'Contrats sur mesure', desc: 'Ponctuel ou récurrent, horaires flexibles 6h-22h, 7j/7 — on s\'adapte à vos contraintes.' },
];

const zones = [
  'Marseille', 'Aix-en-Provence', 'Aubagne', 'La Ciotat',
  'Marignane', 'Vitrolles', 'Salon-de-Provence', 'Istres', 'Martigues',
];

const quartiersMarseille = [
  'Vieux-Port', 'La Joliette', 'Castellane', 'Endoume', 'Le Prado',
  'La Timone', 'Saint-Loup', 'La Valentine', 'Les Cinq Avenues',
  'Le Panier', 'Saint-Charles', 'La Blancarde', 'Bonneveine', 'Mazargues',
];

const realisationsPreview = [
  {
    title: 'Nettoyage magasin JD Sport Marseille',
    category: 'Commerces',
    image: IMAGES.jdSportMarseilleFloor,
    location: 'Marseille Centre',
  },
  {
    title: 'Entretien bureaux — Entreprise Marseille',
    category: 'Entretien bureaux',
    image: IMAGES.entrepriseBureauxMarseille,
    location: 'Marseille',
  },
  {
    title: 'Programme neuf — 120 logements',
    category: 'Fin de chantier',
    image: IMAGES.finChantierAppartement,
    location: 'Marseille 13010',
  },
  {
    title: 'Mariage champetre — 200 convives',
    category: 'Evenementiel',
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

const cardBgs = [
  IMAGES.openSpaceBureaux,
  IMAGES.openSpaceIndustrielNuit,
  IMAGES.equipe4Personnes,
  IMAGES.grandOpenSpaceModerne,
  IMAGES.finChantierMaison,
  IMAGES.salleConference,
];

export function Home() {
  return (
    <>
      <SEO_Guardian currentSection="home" />

      {/* ═══════════════════════════════════════════
          1. HERO — Impact visuel + CTA
          ══════════════════════════════════════════ */}
      <section className="relative bg-gray-900 text-white py-32 md:py-44 overflow-hidden">
        <img
          src={getOptimizedCldUrl(IMAGES.heroHome, 1200, 30, 'webp')}
          srcSet={cldSrcSet(IMAGES.heroHome, [400, 850, 1200, 1920], 30, 'webp')}
          sizes="100vw"
          alt="Nettoyage professionnel industriel à Marseille - Machine industrielle de lavage de sols professionnelle Nature Clean"
          width="1920"
          height="1080"
          // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-green-900/40" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl ncm-hero-fade-in">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-200 px-4 py-1.5 rounded-full text-sm mb-6">
              <Leaf className="w-4 h-4" aria-hidden="true" />
              Entretien & nettoyage éco-responsable depuis 2021
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              Nettoyage Professionnel
              <span className="block text-green-400">à Marseille & PACA</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Bureaux, copropriétés, fin de chantier, événementiel — Nature Clean garantit propreté,
              hygiène et éclat pour vos locaux au meilleur rapport qualité-prix sur tout le Sud de la France.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black text-base px-8 shadow-lg shadow-green-500/25">
                <Link to="/devis">
                  Obtenir mon devis gratuit en 2 min
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold">
                <a href={PHONE_HREF} className="flex items-center gap-2" aria-label={ARIA_PHONE}>
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/70 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 py-4 md:py-5 px-4 md:px-6"
                >
                  <stat.icon className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-white font-black text-lg md:text-xl">{stat.value}</div>
                    <div className="text-gray-300 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          1b. PREUVE SOCIALE — Barre Google compacte
          ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 md:py-5">
            
            <span className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>Assurance RC Pro</span>
            </div>
            <span className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Leaf className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>Eco-responsable</span>
            </div>
            <span className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-green-500" aria-hidden="true" />
              <Link to="/zones-intervention" className="hover:text-green-700 hover:underline">
                Marseille & PACA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. CARROUSEL DES 8 SERVICES
          ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                8 specialites
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Nos services d'entretien et de nettoyage
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Des solutions professionnelles adaptees a chaque besoin — du menage quotidien aux interventions ponctuelles.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ServiceCarousel />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-bold">
                <Link to="/services">
                  Decouvrir tous nos services
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
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Nos engagements
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Pourquoi choisir Nature Clean ?
              </h2>
              <p className="text-lg text-gray-500">
                Plus qu'un prestataire, un partenaire de confiance pour l'entretien de vos locaux.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {/* Mobile : scroll horizontal — Desktop : grille 3 colonnes */}
            <div className="-mx-4 px-4 pb-4 flex overflow-x-auto snap-x snap-mandatory gap-4 md:mx-auto md:px-0 md:pb-0 md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:gap-6 lg:grid-cols-3 max-w-5xl">
              {whyUs.map((item, i) => (
                <div key={item.title} className="flex-shrink-0 w-[82vw] snap-start md:w-auto group relative overflow-hidden p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all">
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
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-gray-50/80 via-gray-50/60 to-transparent pointer-events-none" />
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
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. DUO DYNAMIQUE — Commerces/Santé × Fin de chantier
          ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* ── Titre éditorial ── */}
            <ScrollReveal>
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Expert multi-spécialités à Marseille
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
                  De l'entretien de vos locaux
                  <span className="block text-green-600">à la remise en état après travaux</span>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Peu importe l'état de départ — poussière de chantier, fin de bail
                  ou locaux très fréquentés — le résultat est toujours le même :
                  {' '}<strong className="text-gray-700">impeccable, certifié Nature Clean.</strong>
                </p>
              </div>
            </ScrollReveal>

            {/* ── BLOC 1 — Commerces & Santé ── */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">

              {/* Duo d'images — gauche */}
              <ScrollReveal direction="left">
                <div className="relative flex flex-col gap-3">
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-green-100 rounded-2xl -z-10" />

                  {/* Image principale */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-80 group">
                    <ImageWithFallback
                      src={getOptimizedCldUrl(IMAGES.entrepriseBureauxMarseille, 700)}
                      srcSet={cldSrcSet(IMAGES.entrepriseBureauxMarseille, [350, 600, 900])}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      alt="Entreprise nettoyage bureaux locaux professionnels Marseille — Nature Clean"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      width={600} height={320} loading="lazy" decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <span className="bg-green-500/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Commerces & magasins · Marseille
                      </span>
                    </div>
                  </div>

                  {/* Image secondaire */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-56 lg:h-64 group">
                    <ImageWithFallback
                      src={getOptimizedCldUrl(IMAGES.cabinetMedical, 600)}
                      srcSet={cldSrcSet(IMAGES.cabinetMedical, [300, 500, 700])}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      alt="Nettoyage désinfection cabinet médical Marseille — hygiène locaux santé normes sanitaires"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      width={600} height={256} loading="lazy" decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-blue-500/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Cabinets médicaux · Normes sanitaires
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Texte — droite */}
              <ScrollReveal direction="right">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Store className="w-3 h-3" aria-hidden="true" /> Locaux professionnels
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  Vos locaux professionnels
                  <span className="block text-green-600">toujours impeccables</span>
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Commerces en centre-ville, cabinets médicaux, agences, boutiques — vos espaces
                  reflètent votre image. Nos équipes assurent une <strong>propreté irréprochable
                  de vos locaux à Marseille</strong>, en horaires décalés, sans interrompre votre activité.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    'Entretien régulier magasins & boutiques Marseille',
                    'Désinfection aux normes sanitaires — cabinets médicaux',
                    'Vitres, sols, sanitaires & espaces de vente',
                    'Contrats sur mesure, intervention hors heures d\'ouverture',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                    <Link to="/services/nettoyage-commerces">
                      Commerces <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 hover:border-green-300 hover:bg-green-50 font-bold">
                    <Link to="/services/entretien-bureaux">Bureaux & santé</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Bande centrale — Citation clé ── */}
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 py-10 px-8 text-center mb-20">
                <div className="absolute inset-0 opacity-25 pointer-events-none">
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
                  <p className="text-gray-400 text-sm tracking-wide">
                    Marseille & PACA · Propreté garantie · Devis gratuit sous 24h
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
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  Après travaux, fin de bail
                  <span className="block text-amber-600">ou remise en état des sols</span>
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Poussière de béton, résidus de plâtre, terrasses encrassées — la fin de chantier
                  laisse des traces que seule une équipe spécialisée peut effacer. Nature Clean
                  intervient sur <strong>Marseille et en PACA</strong> pour une livraison propre,
                  conforme et dans les délais impartis.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {[
                    'Nettoyage fin de chantier maison & appartement Marseille',
                    'Remise en état après travaux — fin de bail, locaux pros',
                    'Terrasses, extérieurs & façades professionnels',
                    'Débarras, évacuation gravats, restitution locaux',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md">
                    <Link to="/services/nettoyage-chantiers">
                      Fin de chantier <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 hover:border-amber-300 hover:bg-amber-50 font-bold">
                    <Link to="/services/remise-etat-sols">Remise en état sols</Link>
                  </Button>
                </div>
              </ScrollReveal>

              {/* Duo d'images — droite */}
              <ScrollReveal direction="right">
                <div className="relative flex flex-col gap-3">
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-amber-100 rounded-2xl -z-10" />

                  {/* Image principale */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-80 group">
                    <ImageWithFallback
                      src={IMAGES.finChantierMaison}
                      srcSet={cldSrcSet(IMAGES.finChantierMaison, [350, 600, 900])}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      alt="Nettoyage fin de chantier maison Marseille après travaux — remise en état Nature Clean"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      width={600} height={320} loading="lazy" decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-amber-500/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Fin de chantier maison · Marseille
                      </span>
                    </div>
                  </div>

                  {/* Image secondaire */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-56 lg:h-64 group">
                    <ImageWithFallback
                      src={IMAGES.nettoyageTerrassePro}
                      srcSet={cldSrcSet(IMAGES.nettoyageTerrassePro, [350, 600, 900])}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      alt="Nettoyage terrasse professionnel Marseille haute pression — extérieurs après travaux Nature Clean"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      width={600} height={256} loading="lazy" decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-orange-500/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Terrasses & extérieurs pro
                      </span>
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
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Photo graffitis en fond */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={getOptimizedCldUrl(IMAGES.graffitiCarrefourAvant, 1200)}
                  srcSet={cldSrcSet(IMAGES.graffitiCarrefourAvant, [600, 1200])}
                  sizes="100vw"
                  alt="Nettoyage graffiti Carrefour Marseille avant – Nature Clean"
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  width={1200}
                  height={500}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/30" />
              </div>

              {/* Contenu */}
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center min-h-[420px]">
                <ScrollReveal direction="left">
                  <div>
                    <span className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 text-red-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                      <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                      Intervention d'urgence
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                      Nettoyage de Graffitis
                      <span className="block text-green-400">& Tags à Marseille</span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Effacement rapide de tags et graffitis sur tous supports — façades, murs, portails, vitres.
                      Intervention sous 48h, aérogommage ou traitement chimique respectueux des matériaux.
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {[
                        'Tous supports : pierre, béton, métal, verre',
                        'Aérogommage doux ou nettoyage chimique',
                        'Application de protection anti-graffiti',
                        'Devis gratuit sous 24h',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
                  </div>
                </ScrollReveal>

                {/* Chiffres clés */}
                <ScrollReveal direction="right" className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '48h', label: "Délai d'intervention" },
                      { value: '100%', label: 'Garantie effacement' },
                      { value: '0', label: 'Trace résiduelle' },
                      { value: '13', label: 'Dép. Bouches-du-Rhône' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center"
                      >
                        <div className="text-3xl font-black text-green-400 mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-300 leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. CONVERSION BREAK — Photo immersive mid-page
          ═══════════════════════════════════════════ */}
      <ConversionBreak
        image={IMAGES.equipeCamionnette}
        imageAlt="Equipe Nature Clean devant camionnette — intervention rapide Marseille PACA"
        title="Devis gratuit en moins de 24h"
        subtitle="Intervention rapide sur Marseille (13001 a 13016), Aix-en-Provence, Aubagne et toute la region PACA."
        urgencyText="Reponse garantie sous 2h"
      />

      {/* ═══════════════════════════════════════════
          6. REALISATIONS PREVIEW — 3 cartes
          ════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Star className="w-4 h-4" aria-hidden="true" />
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Nos dernières réalisations
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Découvrez nos interventions récentes auprès de professionnels et particuliers sur Marseille et en région PACA.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="px-6 md:px-8">
            <RealisationsSlider items={realisationsPreview} />
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
          7. SECTION EQUIPE — Confiance + chiffres
          ═══════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ScrollReveal direction="left">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={getOptimizedCldUrl('v1773953029/Capture_d_e%CC%81cran_2026-03-19_a%CC%80_21.43.35_zqhtvo.png', 600)}
                    srcSet={cldSrcSet('v1773953029/Capture_d_e%CC%81cran_2026-03-19_a%CC%80_21.43.35_zqhtvo.png', [350, 600, 900])}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    alt="Equipe Nature Clean en intervention nettoyage professionnel"
                    className="w-full h-[380px] lg:h-[460px] object-cover"
                    width={600}
                    height={460}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Notre engagement
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                  Une équipe formée et engagée
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed text-lg">
                  Depuis 2021, Nature Clean réunit des professionnels qualifiés,
                  équipés de matériels de pointe et formés aux dernières normes d'hygiène.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl md:text-3xl font-black text-green-600">4+</div>
                    <div className="text-xs text-gray-500 mt-1">Années d'exp.</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl md:text-3xl font-black text-green-600">100%</div>
                    <div className="text-xs text-gray-500 mt-1">Clients fidèles</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-2xl md:text-3xl font-black text-green-600">3</div>
                    <div className="text-xs text-gray-500 mt-1">Départements</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                    <Link to="/a-propos">
                      Découvrir l'équipe
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 hover:border-green-300 hover:bg-green-50 font-bold">
                    <Link to="/services/nettoyage-chantiers">
                      <HardHat className="w-4 h-4 mr-1.5" aria-hidden="true" />
                      Fin de chantier
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. ENGAGEMENT ECO — Bande accent
          ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-16 bg-green-700 text-white overflow-hidden">
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
                <Button asChild className="bg-white text-green-700 hover:bg-green-50 font-bold shadow-md">
                  <Link to="/a-propos">
                    Notre démarche verte
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">50%</div>
                    <div className="text-sm text-white/80 mt-1">Éco-labellisés</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">0</div>
                    <div className="text-sm text-white/80 mt-1">Produit toxique</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">100%</div>
                    <div className="text-sm text-white/80 mt-1">Tri sélectif</div>
                  </div>
                  <div className="bg-white/15 rounded-xl p-5 text-center border border-white/20">
                    <div className="text-3xl font-black">-30%</div>
                    <div className="text-sm text-white/80 mt-1">Conso. d'eau</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. AVIS GOOGLE — Preuve sociale
          ═══════════════════════════════════════════ */}
      {/* content-visibility: auto — section ~2500px sous le fold mobile
          contain-intrinsic-size: auto 400px correspond au fallback Suspense h-[400px]
          → zéro CLS : le navigateur réserve 400px avant de rendre le composant */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:auto_400px]">
        <Suspense fallback={<div className="w-full h-[400px] bg-gray-50 animate-pulse" aria-hidden="true" />}>
          <GoogleReviews />
        </Suspense>
      </div>

      {/* ═══════════════════════════════════════════
          10. ZONE D'INTERVENTION — SEO local
          ═══════════════════════════════════════════ */}
      {/* content-visibility: auto — section ~3000px sous le fold mobile
          contain-intrinsic-size: auto 520px — hauteur estimée (titre + grille zones + quartiers) */}
      <section className="py-16 md:py-20 bg-gray-50 [content-visibility:auto] [contain-intrinsic-size:auto_520px]">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Zone d'intervention
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Entretien professionnel dans tout le Sud
              </h2>
              <p className="text-lg text-gray-500">
                Nous intervenons sur Marseille et l'ensemble de la région PACA pour le ménage, l'entretien et le nettoyage de vos locaux — Bouches-du-Rhône, Var, Alpes-Maritimes.
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

            <div className="mt-8">
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

      {/* ═══════════════════════════════════════════
          11. CTA FINAL — Photo + conversion
          ══════════════════════════════════════════ */}
      {/* content-visibility: auto — dernier bloc, ~3600px sous le fold mobile */}
      <section className="relative py-20 md:py-24 bg-gray-900 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_380px]">
        <ImageWithFallback
          src={IMAGES.poigneeMainDevis}
          srcSet={cldSrcSet(IMAGES.poigneeMainDevis, [400, 850, 1200, 1920])}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          width={1920}
          height={600}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/85 to-gray-900/75" />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                Prêt à transformer vos locaux ?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Contactez-nous pour un devis gratuit et personnalisé.
                Intervention rapide sur tout le Sud de la France.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black text-lg px-10 shadow-xl shadow-green-500/20">
                  <Link to="/devis">
                    Obtenir mon devis en 2 min
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold text-lg">
                  <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
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