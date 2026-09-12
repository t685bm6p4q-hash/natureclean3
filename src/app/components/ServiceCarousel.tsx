/**
 * ServiceCarousel — CSS transform carousel, zéro react-slick, zéro forced reflow.
 *
 * Desktop : CSS translateX via custom property --slide (pas de lecture DOM offsetWidth/scrollWidth).
 *   → Élimine 74 ms de forced layout reflow signalé par Lighthouse (vendor-slick TBT).
 * Mobile  : scroll natif inchangé (snap-x, overflow-x-auto).
 */
import { useRef, useState, useCallback } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
  HardHat, Building2, Store, Briefcase, PartyPopper,
  Home, CircleDot, Droplets, Star, Leaf, ArrowRight,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';
import type { ServiceCard } from '@/types/service';
import { IMAGES, cldSrcSet, getOptimizedCldUrl } from '@/app/utils/images';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

/* ─── Images par service ────────────────────────────────── */
const SERVICE_IMAGES: Record<string, string> = {
  '/services/nettoyage-chantiers':    IMAGES.finChantierMarseille,
  '/services/nettoyage-coproprietes': IMAGES.hallMarbreAscenseurs,
  '/services/nettoyage-commerces':    IMAGES.jdSportMarseilleFloor,
  '/services/entretien-bureaux':      IMAGES.entrepriseBureauxMarseille,
  '/services/nettoyage-evenementiel': IMAGES.salleEvenementielle,
  '/nettoyage-particuliers':          IMAGES.remiseEtatAppartMarseille,
  '/services/remise-etat-sols':       IMAGES.decapageSolEco,
  '/services/nettoyage-vitre':        IMAGES.lavageVitrine,
};

/* ─── Données ────────────────────────────────────────────── */
const services: ServiceCard[] = [
  {
    icon: HardHat,
    title: 'Fin de chantiers',
    description: 'Interventions de remise en propreté en fin de chantier de construction, de rénovation de logements ou de locaux.',
    features: [
      'Évacuation des menus gravats et des résidus de matériaux',
      'Nettoyage des surfaces de sols, murs...',
      'Nettoyage des surfaces vitrées',
    ],
    link: '/services/nettoyage-chantiers',
  },
  {
    icon: Building2,
    title: 'Copropriétés',
    description: 'Contactez-nous pour la réalisation d\'un devis gratuit concernant l\'entretien et le ménage de votre copropriété.',
    features: [
      'Aspiration, nettoyage et lessivage des sols',
      'Dépoussiérage, aspiration et lessivage des escaliers',
      'Nettoyage des vitres et fenêtres',
    ],
    link: '/services/nettoyage-coproprietes',
  },
  {
    icon: Store,
    title: 'Commerces',
    description: 'Propositions de solutions d\'hygiène et de propreté adaptées à vos besoins afin de bonifier l\'image de votre boutique auprès de votre clientèle.',
    features: [
      'Entretien courant de la surface de vente avant ouverture',
      'Nettoyage des espaces administratifs',
      'Nettoyage des vitrines, des façades et rideaux métaliques',
    ],
    link: '/services/nettoyage-commerces',
  },
  {
    icon: Briefcase,
    title: 'Bureaux',
    description: 'Interventions d\'entretien et de ménage de vos bureaux et de vos locaux, afin de garantir une qualité de service impeccable.',
    features: [
      'Aspiration, nettoyage et lessivage des sols',
      'Dépoussiérage, aspiration et lessivage des escaliers',
      'Nettoyage des vitres et fenêtres',
    ],
    link: '/services/entretien-bureaux',
  },
  {
    icon: PartyPopper,
    title: 'Événementiel',
    description: 'Ménage et remise en état avant, pendant et après vos événements — mariages, séminaires, salons professionnels.',
    features: [
      'Mise en propreté avant l\'événement',
      'Entretien continu pendant la manifestation',
      'Remise en état complète après l\'événement',
    ],
    link: '/services/nettoyage-evenementiel',
  },
  {
    icon: Home,
    title: 'Particuliers',
    description: 'Ménage à domicile, grand entretien de printemps, remise en état après déménagement ou entre deux locataires.',
    features: [
      'Nettoyage complet de l\'habitation',
      'Entretien régulier ou ponctuel',
      'Rotation Airbnb et conciergerie',
    ],
    link: '/nettoyage-particuliers',
  },
  {
    icon: CircleDot,
    title: 'Remise en état sols',
    description: 'Ponçage, cristallisation et lustrage de vos sols en marbre, granit, béton ciré ou carrelage.',
    features: [
      'Décapage et ponçage mécanique',
      'Cristallisation et protection',
      'Lustrage haute brillance',
    ],
    link: '/services/remise-etat-sols',
  },
  {
    icon: Droplets,
    title: 'Vitrerie',
    description: 'Entretien de vitres, baies vitrées, vérandas et façades vitrées en hauteur — nacelle ou perche.',
    features: [
      'Vitres intérieures et extérieures',
      'Intervention en hauteur sur nacelle',
      'Nettoyage de façades vitrées',
    ],
    link: '/services/nettoyage-vitre',
  },
];

const CARDS_VISIBLE = 3;
const TOTAL_CARDS   = services.length;        // 8
const MAX_SLIDE     = TOTAL_CARDS - CARDS_VISIBLE; // 5

/* ─── Carte mobile ──────────────────────────────────────── */
function MobileServiceCard({ service }: { service: ServiceCard }) {
  const IconComponent = service.icon;
  const imgSrc = SERVICE_IMAGES[service.link] || '';
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md flex flex-col h-full">
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <ImageWithFallback
          src={getOptimizedCldUrl(imgSrc, 600)}
          srcSet={cldSrcSet(imgSrc, [300, 450, 600])}
          sizes="75vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={400}
          height={176}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center shadow-xl">
            <IconComponent className="w-7 h-7 text-green-600" aria-hidden="true" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            4.7
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold">
            <Leaf className="w-2.5 h-2.5 text-green-400" aria-hidden="true" />
            Éco
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 mb-1.5">{service.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-grow">
          {service.description}
        </p>
        <div className="flex items-start gap-1.5 mb-4">
          <span className="text-green-500 text-xs mt-0.5 flex-shrink-0">✓</span>
          <span className="text-xs text-gray-600 leading-tight">{service.features[0]}</span>
        </div>
        <Button asChild size="sm" className="w-full bg-green-700 hover:bg-green-800 mt-auto">
          <Link to={service.link} className="flex items-center justify-center gap-1.5">
            Découvrir
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

/* ─── Carte desktop ─────────────────────────────────────── */
function DesktopServiceCard({ service }: { service: ServiceCard }) {
  const imgSrc = SERVICE_IMAGES[service.link] || '';
  return (
    <article>
      <Card className="h-[520px] hover:shadow-xl transition-shadow border-green-100 flex flex-col overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative h-40 flex-shrink-0 overflow-hidden">
            <ImageWithFallback
              src={getOptimizedCldUrl(imgSrc, 600)}
              srcSet={cldSrcSet(imgSrc, [300, 450, 600])}
              sizes="(max-width: 1024px) 50vw, 33vw"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={400}
              height={200}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-transparent to-white" />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center flex-shrink-0">
              {service.title}
            </h3>
            <div className="flex items-center justify-center gap-3 mb-3 flex-shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-semibold">
                <Leaf className="w-3 h-3" aria-hidden="true" />
                Eco-responsable
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm flex-shrink-0 line-clamp-2">
              {service.description}
            </p>
            <ul className="space-y-2 mb-4 flex-shrink-0 flex-grow">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 flex-shrink-0">•</span>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-green-700 hover:bg-green-800 text-base py-2.5 mt-auto" asChild>
              <Link to={service.link}>Voir {service.title}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

/* ─── Composant principal ───────────────────────────────── */
export function ServiceCarousel() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  /**
   * goTo — navigue vers la slide N.
   *
   * Technique : on écrit une CSS custom property (--slide) sur le nœud DOM.
   * Une écriture de custom property ne déclenche JAMAIS de forced layout reflow
   * (contrairement à la lecture de offsetWidth / scrollWidth).
   * Le navigateur applique la nouvelle valeur via CSS calc() au prochain frame
   * de composition — 100 % sur le compositor thread, pas sur le main thread.
   */
  const goTo = useCallback((n: number) => {
    const next = Math.max(0, Math.min(n, MAX_SLIDE));
    setCurrent(next);
    // Écriture CSS pure — zéro lecture DOM, zéro forced reflow ✅
    trackRef.current?.style.setProperty('--slide', String(next));
  }, []);

  return (
    <div
      role="region"
      aria-label="Carrousel de nos services de nettoyage"
      aria-roledescription="carrousel"
    >

      {/* ── MOBILE : scroll horizontal natif (inchangé) ── */}
      <div className="md:hidden -mx-4 px-4 pb-4 flex overflow-x-auto snap-x snap-mandatory gap-4">
        {services.map((service) => (
          <div key={service.title} className="flex-shrink-0 w-[75vw] snap-start">
            <MobileServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* ── DESKTOP : CSS transform carousel, sans react-slick ── */}
      <div className="hidden md:block">
        {/*
          Outer wrapper — clip les cartes hors-champ.
          Le track se translate via --slide sans aucune lecture DOM.

          Formule CSS :
            translateX(calc(var(--slide, 0) * -100% / 3))
            ↕
            100% = largeur RENDUE du track (= largeur du wrapper parent).
            Chaque carte occupe w-1/3 = 33,33 % du wrapper.
            Un step = 33,33 % du wrapper = 100 % / 3.
            Pour N steps : N × (-100% / 3).
            Zéro mesure DOM, calcul purement mathématique. ✅
        */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{
              transition: 'transform 500ms ease-out',
              transform: 'translateX(calc(var(--slide, 0) * -100% / 3))',
            } as React.CSSProperties}
          >
            {services.map((service, i) => (
              <div
                key={service.title}
                className="flex-none w-1/3 px-2"
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${service.title}, ${i + 1} sur ${TOTAL_CARDS}`}
              >
                <DesktopServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation : flèches + dots */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 hover:shadow-lg transition-all border border-gray-100"
            aria-label="Services précédents"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Navigation des services">
            {Array.from({ length: MAX_SLIDE + 1 }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Groupe ${i + 1} sur ${MAX_SLIDE + 1}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === current
                    ? 'w-6 h-2.5 bg-green-600'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            disabled={current === MAX_SLIDE}
            className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 hover:shadow-lg transition-all border border-gray-100"
            aria-label="Services suivants"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

    </div>
  );
}
