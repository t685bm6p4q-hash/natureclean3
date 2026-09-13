/**
 * JSON-LD CleaningService — sans avis (aggregateRating / review).
 * Évite les erreurs GSC « extraits d'avis » et « type d'objet non valide pour parent_node ».
 */

import {
  BASE_URL,
  COMPANY_FULL_NAME,
  COMPANY_NAME,
  EMAIL,
  FOUNDING_YEAR,
  LOGO_URL,
  SIRET,
} from '@/app/utils/constants';

/** Référence provider pour les schemas Service (pages prestations). */
export const NATURE_CLEAN_PROVIDER = {
  '@type': 'CleaningService' as const,
  '@id': BASE_URL,
  name: COMPANY_FULL_NAME,
};

const FORBIDDEN_REVIEW_KEYS = ['aggregateRating', 'review', 'reviewRating', 'reviewCount'] as const;

function assertNoReviewMarkup(payload: Record<string, unknown>): void {
  const serialized = JSON.stringify(payload);
  for (const key of FORBIDDEN_REVIEW_KEYS) {
    if (serialized.includes(`"${key}"`)) {
      throw new Error(`JSON-LD interdit : propriété "${key}" détectée`);
    }
  }
}

export function buildCleaningServiceJsonLd(): Record<string, unknown> {
  const marseilleDistricts = Array.from({ length: 16 }, (_, i) => {
    const district = String(i + 1).padStart(2, '0');
    return {
      '@type': 'City',
      name: `Marseille ${district} (13${district})`,
      addressRegion: 'Bouches-du-Rhône',
    };
  });

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': BASE_URL,
    name: COMPANY_FULL_NAME,
    alternateName: COMPANY_NAME,
    image: LOGO_URL,
    logo: LOGO_URL,
    description:
      "Entreprise d'entretien et de nettoyage professionnel éco-responsable à Marseille. Ménage de bureaux, copropriétés, fin de chantier et particuliers. Propreté et hygiène garanties sur tous les arrondissements de Marseille (13001-13016), Aubagne, Aix-en-Provence et La Ciotat.",
    url: BASE_URL,
    telephone: '+33484896875',
    email: EMAIL,
    priceRange: '$$',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Virement, Chèque, Espèces',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '22 Traverse Pupat',
      addressLocality: 'Marseille',
      postalCode: '13008',
      addressRegion: 'Bouches-du-Rhône',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.2965,
      longitude: 5.3698,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      ...marseilleDistricts,
      { '@type': 'City', name: 'Aubagne', addressRegion: 'Bouches-du-Rhône' },
      { '@type': 'City', name: 'Aix-en-Provence', addressRegion: 'Bouches-du-Rhône' },
      { '@type': 'City', name: 'La Ciotat', addressRegion: 'Bouches-du-Rhône' },
    ],
    serviceType: [
      'Entretien de bureaux',
      'Ménage de copropriétés',
      'Nettoyage fin de chantier',
      'Ménage particuliers',
      'Nettoyage industriel',
      'Propreté commerciale',
      'Nettoyage événementiel',
      'Remise en état de sols',
      'Hygiène et désinfection professionnelle',
      'Entretien vitrerie',
      'Entretien espaces verts communs',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de nettoyage professionnel',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nettoyage de Bureaux & Locaux Professionnels',
            description:
              'Entretien régulier ou ponctuel des espaces de travail, magasins et restaurants à Marseille et sa région',
            areaServed: 'Marseille, Bouches-du-Rhône',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nettoyage de Copropriétés & Parties Communes',
            description: 'Service dédié aux syndics et gestionnaires de copropriétés sur Marseille',
            areaServed: 'Marseille, Bouches-du-Rhône',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nettoyage Fin de Chantier',
            description:
              'Intervention après construction, rénovation ou déménagement. Remise en état complète.',
            areaServed: 'Marseille, Aubagne, Aix-en-Provence',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nettoyage pour Particuliers & Seniors',
            description:
              'Entretien de maisons particulières et accompagnement personnalisé pour seniors',
            areaServed: 'Marseille, Bouches-du-Rhône',
          },
        },
      ],
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'SIRET',
      value: SIRET,
    },
    foundingDate: FOUNDING_YEAR,
    slogan: 'Entretien et nettoyage éco-responsable à Marseille',
    sameAs: [
      'https://share.google/LGuTIovk5ovTXGzuc',
      'https://www.pagesjaunes.fr/pros/61828182',
      'https://www.instagram.com/natureclean13/',
      'https://www.linkedin.com/in/nature-clean-612261285/',
    ],
  };

  assertNoReviewMarkup(jsonLd);
  return jsonLd;
}

/** Sérialise un objet JSON-LD (objet bien formé, sans clés avis). */
export function serializeJsonLd(payload: Record<string, unknown>): string {
  assertNoReviewMarkup(payload);
  return JSON.stringify(payload);
}
