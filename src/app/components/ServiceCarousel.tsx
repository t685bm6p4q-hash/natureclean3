/**
 * ServiceCarousel — CSS transform carousel, zéro react-slick, zéro forced reflow.
 *
 * Desktop (lg+) : 2 cartes visibles, 3 à partir de xl — images 4:3 mises en avant.
 * Mobile / tablette : scroll-snap horizontal, cartes ~88 % de largeur.
 */
import { useRef, useState, useCallback, useEffect } from 'react';
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
  '/services/nettoyage-chantiers': IMAGES.finChantierMarseille,
  '/services/nettoyage-coproprietes': IMAGES.hallMarbreAscenseurs,
  '/services/nettoyage-commerces': IMAGES.jdSportMarseilleFloor,
  '/services/entretien-bureaux': IMAGES.entrepriseBureauxMarseille,
  '/services/nettoyage-evenementiel': IMAGES.salleEvenementielle,
  '/services/remise-etat-sols': IMAGES.decapageSolEco,
  '/services/nettoyage-vitre': IMAGES.lavageVitrine,
  '/services/nettoyage-diogene': IMAGES.appartVideLumineux,
  '/services/nettoyage-graffitis': IMAGES.graffitiCarrefourAvant,
};

const CARD_IMG = {
  widths: [480, 640, 800] as const,
  q: 'auto:good' as const,
  fmt: 'webp' as const,
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
      'Devis détaillé après étude',
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
    icon: Store,
    title: 'Commerces & boutiques',
    description: 'Entretien régulier avant ouverture, vitrines et sols de vente.',
    features: [
      "Hors heures d'ouverture",
      'Surface de vente',
      'Devis sur mesure',
    ],
    link: '/services/nettoyage-commerces',
    cta: 'Nettoyage de commerces et boutiques à Marseille',
  },
  {
    icon: Briefcase,
    title: 'Bureaux',
    description: 'Open spaces et sanitaires — locaux tertiaires, pas vitrine magasin.',
    features: ['Contrats réguliers', 'Horaires décalés', 'À Marseille'],
    link: '/services/entretien-bureaux',
    cta: 'Nettoyage de bureaux à Marseille',
  },
  {
    icon: Droplets,
    title: 'Nettoyage de vitres',
    description: 'Lavage vitrines, bureaux, façades — perche, eau déminéralisée.',
    features: ['Intérieur / extérieur', 'Calcaire marseillais', 'Hauteur : perche & échelle'],
    link: '/services/nettoyage-vitre',
    cta: 'Nettoyage de vitres à Marseille',
  },
  {
    icon: CircleDot,
    title: 'Remise en état sols',
    description: 'Marbre, pierre, béton ciré — décapage à la monobrosse.',
    features: ['Visite avant devis', 'Tommettes & marbre', 'Commerces et halls'],
    link: '/services/remise-etat-sols',
    cta: 'Remise en état des sols à Marseille',
  },
  {
    icon: Eraser,
    title: 'Graffitis',
    description: 'Tags sur vitrine, pierre ou rideau — test zone discrète.',
    features: ['Commerces et syndics', 'Technique selon support', 'Intervention rapide'],
    link: '/services/nettoyage-graffitis',
    cta: 'Enlèvement de graffitis à Marseille',
  },
  {
    icon: PartyPopper,
    title: 'Événementiel',
    description: 'Avant, pendant et après séminaire, salon ou concert.',
    features: ['Salles et organisateurs', 'Sanitaires et communs', 'Planning serré'],
    link: '/services/nettoyage-evenementiel',
    cta: 'Nettoyage événementiel à Marseille',
  },
  {
    icon: Heart,
    title: 'Diogène',
    description: 'Tri, bennes, désinfection — discret pour familles et mandataires.',
    features: ['Désencombrement', 'Remise en propreté', 'RC Pro'],
    link: '/services/nettoyage-diogene',
    cta: 'Nettoyage Diogène à Marseille',
  },
];

const TOTAL_CARDS = services.length;

function cardsVisibleForWidth(innerWidth: number): number {
  return innerWidth >= 1280 ? 3 : 2;
}

/** Bandeau photo — format 4:3, icône en coin, pas de masque central */
function ServiceCardPhoto({
  service,
  loading,
  sizes,
}: {
  service: ServiceCard;
  loading: 'eager' | 'lazy';
  sizes: string;
}) {
  const IconComponent = service.icon;
  const imgSrc = SERVICE_IMAGES[service.link] || '';
  const alt = `${service.title} — nettoyage professionnel à Marseille`;

  return (
    <Link
      to={service.link}
      className="group relative block aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-gray-200"
      aria-label={service.cta}
    >
      <ImageWithFallback
        src={getOptimizedCldUrl(imgSrc, 640, CARD_IMG.q, CARD_IMG.fmt)}
        srcSet={cldSrcSet(imgSrc, [...CARD_IMG.widths], CARD_IMG.q, CARD_IMG.fmt)}
        sizes={sizes}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        loading={loading}
        decoding="async"
        width={800}
        height={600}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/55 via-gray-900/10 to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 shadow-md ring-1 ring-black/5">
        <IconComponent className="h-5 w-5 text-green-700" aria-hidden="true" />
      </div>
    </Link>
  );
}

function MobileServiceCard({ service, isFirstVisible }: { service: ServiceCard; isFirstVisible?: boolean }) {
  return (
    <article className="flex h-full min-w-0 w-full max-w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      <ServiceCardPhoto
        service={service}
        loading={isFirstVisible ? 'eager' : 'lazy'}
        sizes="88vw"
      />
      <div className="flex min-w-0 flex-grow flex-col p-4">
        <h3 className="mb-1.5 font-bold text-gray-900">{service.title}</h3>
        <p className="mb-3 flex-grow text-sm leading-relaxed text-gray-600 line-clamp-3">
          {service.description}
        </p>
        <ul className="mb-4 space-y-1.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-gray-700">
              <span className="mt-0.5 text-green-600" aria-hidden="true">
                •
              </span>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to={service.link}
          aria-label={service.cta}
          className="mt-auto inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
        >
          <span className="line-clamp-2 text-center leading-snug">{service.cta}</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function DesktopServiceCard({ service }: { service: ServiceCard }) {
  return (
    <article className="h-full">
      <Card className="flex h-full min-h-0 flex-col overflow-hidden border-green-100 transition-shadow hover:shadow-xl">
        <CardContent className="flex h-full flex-col p-0">
          <ServiceCardPhoto service={service} loading="lazy" sizes="(min-width: 1280px) 28vw, 42vw" />
          <div className="flex flex-grow flex-col border-t border-gray-100 p-5 xl:p-6">
            <h3 className="mb-2 flex-shrink-0 text-lg font-bold text-gray-900 xl:text-xl">{service.title}</h3>
            <p className="mb-3 flex-shrink-0 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {service.description}
            </p>
            <ul className="mb-4 flex-grow space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start text-sm text-gray-700">
                  <span className="mr-2 flex-shrink-0 text-green-600">•</span>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-auto h-auto min-h-11 w-full max-w-full whitespace-normal bg-green-700 px-3 py-2.5 text-sm leading-snug hover:bg-green-800"
              asChild
            >
              <Link to={service.link} className="text-center text-white line-clamp-2" aria-label={service.cta}>
                {service.cta}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

export function ServiceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(2);

  const maxSlide = Math.max(0, TOTAL_CARDS - cardsVisible);

  const syncTrackVars = useCallback((slide: number, visible: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.setProperty('--slide', String(slide));
    el.style.setProperty('--cards-visible', String(visible));
  }, []);

  useEffect(() => {
    const updateVisible = () => {
      const visible = cardsVisibleForWidth(window.innerWidth);
      setCardsVisible(visible);
      setCurrent((c) => Math.min(c, Math.max(0, TOTAL_CARDS - visible)));
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  useEffect(() => {
    syncTrackVars(Math.min(current, maxSlide), cardsVisible);
  }, [current, cardsVisible, maxSlide, syncTrackVars]);

  const goTo = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(n, maxSlide));
      setCurrent(next);
      syncTrackVars(next, cardsVisible);
    },
    [maxSlide, cardsVisible, syncTrackVars],
  );

  return (
    <div role="region" aria-label="Carrousel de nos services de nettoyage" aria-roledescription="carrousel">
      {/* Mobile + tablette (< lg) — cartes larges, photo 4:3 */}
      <div className="flex max-w-[100vw] gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-4 -mx-4 snap-x snap-mandatory [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {services.map((service, index) => (
          <div key={service.title} className="w-[min(100%,22rem)] flex-shrink-0 snap-center sm:w-[min(88%,24rem)]">
            <MobileServiceCard service={service} isFirstVisible={index === 0} />
          </div>
        ))}
      </div>

      {/* Desktop (lg+) */}
      <div className="hidden lg:block">
        <div className="overflow-hidden">
          <div ref={trackRef} className="ncm-svc-carousel-track flex items-stretch">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="flex-none px-2"
                style={{ width: `${100 / cardsVisible}%` }}
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${service.title}, ${i + 1} sur ${TOTAL_CARDS}`}
              >
                <DesktopServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-all hover:bg-gray-50 hover:shadow-lg disabled:opacity-30"
            aria-label="Services précédents"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <div className="flex gap-2" role="group" aria-label="Navigation des services">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Aller au groupe ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                onClick={() => goTo(i)}
                className="group flex min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === current ? 'h-2.5 w-8 bg-green-700' : 'h-2.5 w-2.5 bg-gray-300 group-hover:bg-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === maxSlide}
            className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-all hover:bg-gray-50 hover:shadow-lg disabled:opacity-30"
            aria-label="Services suivants"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}