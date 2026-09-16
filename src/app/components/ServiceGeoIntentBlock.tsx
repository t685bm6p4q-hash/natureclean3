import { Link } from 'react-router';

interface CaseStudyLink {
  href: string;
  label: string;
}

interface ServiceGeoIntentBlockProps {
  /** Rôle de la fiche service (métier, protocole). */
  serviceIntent: string;
  geoHref?: string;
  geoLabel?: string;
  caseStudy?: CaseStudyLink;
}

/** Clarifie service générique vs landing locale — limite la duplication perçue par Google. */
export function ServiceGeoIntentBlock({
  serviceIntent,
  geoHref,
  geoLabel,
  caseStudy,
}: ServiceGeoIntentBlockProps) {
  return (
    <section className="py-6 bg-green-50 border-y border-green-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          {serviceIntent}
          {geoHref && geoLabel && (
            <>
              {' '}
              <Link
                to={geoHref}
                className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
              >
                {geoLabel}
              </Link>
              .
            </>
          )}
          {!geoHref && !caseStudy && !serviceIntent.trim().endsWith('.') && '.'}
          {caseStudy && (
            <>
              {!geoHref && !serviceIntent.trim().endsWith(':') && !serviceIntent.trim().endsWith('.') && '.'}
              {' '}
              Retour d&apos;expérience :{' '}
              <Link
                to={caseStudy.href}
                className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
              >
                {caseStudy.label}
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
}
