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
  CircleDot, Droplets, ArrowRight, Heart, Eraser,
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
  '/services/remise-etat-sols':       IMAGES.decapageSolEco,
  '/services/nettoyage-vitre':        IMAGES.lavageVitrine,
  '/services/nettoyage-diogene':      IMAGES.appartVideLumineux,
  '/services/nettoyage-graffitis':    IMAGES.graffitiCarrefourAvant,
};

/* ─── Données ────────────────────────────────────────────── */
const services: ServiceCard[] = [
  {
    icon: HardHat,
    title: 'Fin de chantiers',
    description: 'Poussières, voile de ciment, vitres — menus gravats si prévu au devis.',
    features: [
      'Promoteurs, artisans, locataires sortants',
      'Matériel fourni, RC Pro',
      'Devis sous 24 h',
    ],
    link: '/services/nettoyage-chantiers',
    cta: 'Nettoyage de fin de chantier à Marseille',
  },
  {
    icon: Building2,
    title: 'Copropriétés',
    description: 'Halls, escaliers, ascenseurs — contrat ou ponctuel pour syndics.',
    features: [
      'Parties communes',
      'Fréquences au contrat',
      'Marseille et 13',
    ],
    link: '/services/nettoyage-coproprietes',
    cta: 'Nettoyage de copropriétés à Marseille',
  },
  {
    icon: Heart,
    title: 'Diogène',
    description: 'Tri, bennes, désinfection — discret pour familles et mandataires.',
    features: [
      'Désencombrement',
      'Remise en propreté',
      'RC Pro',
    ],
    link: '/services/nettoyage-diogene',
    cta: 'Nettoyage Diogène à Marseille',
  },
  {
    icon: Store,
    title: 'Commerces',
    description: 'Entretien régulier avant ouverture, vitrines et sols.',
    features: [
      'Hors heures d\'ouverture',
      'Surface de vente',
      'Devis sur mesure',
    ],
    link: '/services/nettoyage-commerces',
    cta: 'Nettoyage de commerces à Marseille',
  },
  {
    icon: Briefcase,
    title: 'Bureaux',
    description: 'Open spaces et sanitaires — locaux tertiaires, pas vitrine magasin.',
    features: [
      'Contrats réguliers',
      'Horaires décalés',
      'Depuis 2021',
    ],
    link: '/services/entretien-bureaux',
    cta: 'Nettoyage de bureaux à Marseille',
  },
  {
    icon: Droplets,
    title: 'Nettoyage de vitres',
    description: 'Lavage vitrines, bureaux, façades — perche, eau déminéralisée.',
    features: [
      'Intérieur / extérieur',
      'Calcaire marseillais',
      'Voirie si nacelle',
    ],
    link: '/services/nettoyage-vitre',
    cta: 'Nettoyage de vitres à Marseille',
  },
  {
    icon: CircleDot,
    title: 'Remise en état sols',
    description: 'Marbre, pierre, béton ciré — décapage et cristallisation.',
    features: [
      'Visite avant devis',
      'Polissage marbre',
      'Commerces et halls',
    ],
    link: '/services/remise-etat-sols',
    cta: 'Remise en état des sols à Marseille',
  },
  {
    icon: Eraser,
    title: 'Graffitis',
    description: 'Tags sur vitrine, pierre ou rideau — test zone discrète.',
    features: [
      'Commerces et syndics',
      'Technique selon support',
      'Intervention rapide',
    ],
    link: '/services/nettoyage-graffitis',
    cta: 'Enlèvement de graffitis à Marseille',
  },
  {
    icon: PartyPopper,
    title: 'Événementiel',
    description: 'Avant, pendant et après séminaire, salon ou concert.',
    features: [
      'Salles et organisateurs',
      'Sanitaires et communs',
      'Planning serré',
    ],
    link: '/services/nettoyage-evenementiel',
    cta: 'Nettoyage événementiel à Marseille',
  },
];

const CARDS_VISIBLE = 3;
const TOTAL_CARDS   = services.length;
const MAX_SLIDE     = TOTAL_CARDS - CARDS_VISIBLE;

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
          sizes="(max-width: 768px) 88vw, 75vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={400}
          height={176}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/95 rounded-2xl flex items-center justify-center shadow-xl">
            <IconComponent className="w-7 h-7 text-green-600" aria-hidden="true" />
          </div>
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
        <Link
          to={service.link}
          aria-label={service.cta}
          className="mt-auto inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-green-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
        >
          En savoir plus
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </Link>
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
          </div>
          <div className="p-6 flex flex-col flex-grow border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center flex-shrink-0">
              {service.title}
            </h3>
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
            <Button
              className="w-full max-w-full bg-green-700 hover:bg-green-800 text-sm py-2.5 mt-auto whitespace-normal h-auto min-h-11 leading-snug px-3"
              asChild
            >
              <Link to={service.link} className="text-center line-clamp-2">
                {service.cta}
              </Link>
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
      <div className="md:hidden -mx-4 px-4 pb-2 flex overflow-x-auto snap-x snap-mandatory gap-3 overscroll-x-contain scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {services.map((service) => (
          <div key={service.title} className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center">
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
