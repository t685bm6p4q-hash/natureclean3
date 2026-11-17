/**
 * geoData.ts — Données structurées des landing pages géographiques SEO.
 * Chaque entrée cible un combo ville × service pour du SEO local longue traîne.
 */

import { IMAGES } from '@/app/utils/images';
import type { FAQItem } from '@/app/components/FAQSection';
import { FAQ_COPROPRIETES_LA_CIOTAT } from '@/app/data/geo/faq/coproprietes-la-ciotat';
import { FAQ_BUREAUX_AIX } from '@/app/data/geo/faq/bureaux-aix-en-provence';
import { FAQ_MEDICAL_MARSEILLE } from '@/app/data/geo/faq/medical-marseille';
import { FAQ_BUREAUX_MARSEILLE } from '@/app/data/geo/faq/bureaux-marseille';
import { FAQ_COPROPRIETES_AUBAGNE } from '@/app/data/geo/faq/coproprietes-aubagne';
import { FAQ_INDUSTRIEL_MARSEILLE } from '@/app/data/geo/faq/industriel-marseille';

export interface GeoPageData {
  slug: string;
  city: string;
  department: string;
  postalCode: string;
  service: string;
  serviceSlug: string;
  heroImage: string;
  heroAlt: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  intro: string;
  highlights: string[];
  secondaryImage: string;
  secondaryImageAlt: string;
  conversionTitle: string;
  conversionSubtitle: string;
  faqItems: FAQItem[];
  relatedGeoPages: string[];
  /** H1 distinct de « service + ville » (anti-cannibalisation). */
  heroTitle?: string;
  heroSubtitle?: string;
  breadcrumbLabel?: string;
  faqTitle?: string;
  /** Distinction explicite fiche service vs page locale (évite contenu dupliqué perçu). */
  serviceDifferentiator?: string;
  /** Preuves terrain (quartier, délai, cas client). */
  localProof?: ReadonlyArray<{ title: string; detail: string; href?: string }>;
}

export const GEO_PAGES: Record<string, GeoPageData> = {

  'nettoyage-coproprietes-la-ciotat': {
    slug: 'nettoyage-coproprietes-la-ciotat',
    city: 'La Ciotat',
    department: 'Bouches-du-Rhône',
    postalCode: '13600',
    service: 'Nettoyage de copropriétés',
    serviceSlug: '/services/nettoyage-coproprietes',
    heroImage: IMAGES.residenceModerne,
    heroAlt: 'Résidence et parties communes à La Ciotat',
    heroTitle: 'Nettoyage de copropriétés à La Ciotat',
    heroSubtitle:
      'Syndics : halls, escaliers, parkings et locaux poubelles — 13600, depuis Marseille 8e',
    breadcrumbLabel: 'Copropriétés à La Ciotat',
    seo: {
      title: 'Nettoyage Copropriétés La Ciotat (13600) | Syndic | Nature Clean',
      description:
        'Entretien de parties communes à La Ciotat : halls, escaliers, parkings, locaux poubelles. Prise en charge sous 4 h ouvrées, devis détaillé après étude. RC Pro.',
      keywords:
        'nettoyage copropriété La Ciotat, entretien parties communes 13600, nettoyage syndic La Ciotat, ménage immeuble La Ciotat',
    },
    intro:
      'Depuis Marseille 8e, La Ciotat est à environ 25–35 minutes selon le quartier (A50, route de la Ciotat). Nature Clean travaille avec des syndics et des conseils syndicaux pour l\'entretien des parties communes : centre et Vieux-Port, L\'Île Verte, L\'Aubépine, Eoures. Sur place, le sable remonté dans les halls, les embruns sur les vitrages de cage et les parkings souterrains mal ventilés imposent des fréquences réalistes — on les fixe à la visite, pas sur un forfait générique.',
    highlights: [
      '25–35 min depuis Marseille 8e selon le quartier',
      'Centre, L\'Île Verte, L\'Aubépine, Eoures et résidences récentes',
      'Halls, cages, ascenseurs, parkings, locaux poubelles',
      'Sortie / rentrée des containers si prévu avec le syndic',
      'Renfort estival possible si écrit au contrat (juin–septembre)',
      'Pratiques responsables, RC Pro — pas d\'entretien « piscine » (eau / chimie)',
    ],
    secondaryImage: IMAGES.hallCoproBoites,
    secondaryImageAlt: 'Hall de copropriété avec boîtes aux lettres à La Ciotat',
    conversionTitle: 'Syndics de La Ciotat : cahier des charges clair',
    conversionSubtitle: 'Prise en charge sous 4 h ouvrées, devis détaillé après visite des parties communes',
    faqItems: FAQ_COPROPRIETES_LA_CIOTAT,
    relatedGeoPages: ['nettoyage-coproprietes-aubagne', 'nettoyage-bureaux-marseille'],
    serviceDifferentiator:
      'Cette page décrit le terrain ciotaden (accès, mer, parkings). La fiche service « nettoyage de copropriétés » détaille contrat syndic, suivi et pièces administratives.',
    localProof: [
      {
        title: 'Hall proche du port',
        detail:
          'Sable et sel : passages hall et cage calés sur la saison, local poubelles désinfecté les jours de collecte.',
      },
      {
        title: '25–35 min depuis Marseille 8e',
        detail:
          'Trajet A50 / route de la Ciotat. Les reprises urgentes (local poubelles, hall) restent possibles dans la journée si appel aux heures d\'ouverture.',
      },
      {
        title: 'Vitres de cage',
        detail:
          'Vitrages communs au contrat ; façades ou grande hauteur : voir la fiche nettoyage de vitres (perche, calcaire).',
        href: '/services/nettoyage-vitre',
      },
    ],
  },

  'nettoyage-bureaux-aix-en-provence': {
    slug: 'nettoyage-bureaux-aix-en-provence',
    city: 'Aix-en-Provence',
    department: 'Bouches-du-Rhône',
    postalCode: '13100',
    service: 'Nettoyage de bureaux',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.grandOpenSpaceModerne,
    heroAlt: 'Open space de bureaux à Aix-en-Provence entretenu par Nature Clean',
    seo: {
      title: 'Nettoyage Bureaux Aix-en-Provence (13100) | Nature Clean | Devis gratuit',
      description: 'Entretien de bureaux à Aix-en-Provence : centre, Jas de Bouffan, Les Milles, Duranne. 25 à 40 min depuis Marseille 8e. Prise en charge sous 4 h ouvrées, devis détaillé après étude.',
      keywords: 'nettoyage bureaux Aix-en-Provence, entretien locaux 13100, société nettoyage Aix, nettoyage professionnel Aix-en-Provence, ménage bureau Les Milles',
    },
    intro: 'Nature Clean part de Marseille 8e (22 Traverse Pupat) pour l\'entretien de bureaux à Aix-en-Provence. Hors heure de pointe, comptez environ 30 minutes jusqu\'au centre-ville et 25 minutes jusqu\'au pôle d\'activités des Milles ; entre 7 h 30 et 9 h, l\'A51 allonge souvent le trajet de 10 à 15 minutes. Nous intervenons dans le centre historique (agences, coworkings, étages au-dessus des commerces), au Jas de Bouffan, aux Milles, à la Duranne, à Luynes et à Puyricard. Les contraintes ne sont pas les mêmes partout : dans le centre, les rues semi-piétonnes interdisent souvent le stationnement d\'un utilitaire après 10 h — on arrive tôt et on porte le matériel. Aux Milles, les parcs d\'activités demandent un badge, un créneau avant l\'arrivée des salariés, et le parking visiteurs est saturé dès 8 h.',
    highlights: [
      '25 à 40 min depuis Marseille 8e selon le créneau et l\'A51',
      'Centre historique : matériel léger, passage avant 10 h',
      'Pôle des Milles : badge, open spaces, créneau avant 7 h 30',
      'Jas de Bouffan, Duranne, Luynes, Puyricard',
      'Intervention 6 h–22 h, créneaux sur organisation spécifique — hors horaires de bureau',
      'Produits professionnels adaptés à chaque chantier, RC Pro, interlocuteur dédié',
    ],
    secondaryImage: IMAGES.openSpaceBureaux,
    secondaryImageAlt: 'Plateaux de bureaux au pôle d\'activités des Milles, près d\'Aix-en-Provence',
    conversionTitle: 'Vos bureaux à Aix méritent un entretien calé sur vos horaires',
    conversionSubtitle: 'Prise en charge sous 4 h ouvrées, devis détaillé après étude — centre, Milles, Duranne, Jas de Bouffan',
    faqItems: FAQ_BUREAUX_AIX,
    relatedGeoPages: ['nettoyage-coproprietes-aubagne', 'nettoyage-bureaux-marseille'],
    serviceDifferentiator:
      'Cette page décrit les accès et horaires propres à Aix (centre, Milles, A51). La fiche service « entretien de bureaux » détaille le protocole : sols, sanitaires, planning.',
    localProof: [
      {
        title: 'Pôle d\'activités des Milles',
        detail: 'Type d\'intervention : open space d\'environ 600 m², 2 passages par semaine avant 7 h 30, badge d\'accès, sanitaires et kitchenette. Le parking visiteurs se remplit dès 8 h.',
      },
      {
        title: 'Centre historique',
        detail: 'Agences et coworkings en étage : matériel porté à la main, pas d\'utilitaire en double file. Passage souvent avant 10 h, quand les rues sont encore praticables.',
      },
      {
        title: 'Trajet depuis Marseille 8e',
        detail: '22 Traverse Pupat → Aix : ~30 min hors pointe, davantage sur l\'A51 aux heures de bureau. On cale les tournées en conséquence.',
      },
      {
        title: 'Duranne & Jas de Bouffan',
        detail: 'Parkings plus simples qu\'en centre-ville. Contrats hebdomadaires ou quotidiens selon la surface, même équipe dédiée.',
      },
    ],
  },

  'nettoyage-medical-marseille': {
    slug: 'nettoyage-medical-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhône',
    postalCode: '13001–13016',
    service: 'Nettoyage médical et locaux de santé',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.cabinetMedical,
    heroAlt: 'Nettoyage désinfection cabinet médical Marseille — protocole sanitaire Nature Clean',
    seo: {
      title: 'Nettoyage Cabinet Médical Marseille | Désinfection | Nature Clean',
      description:
        'Nettoyage cabinet médical à Marseille : dentistes, kinés, labos. Protocole désinfection & traçabilité. Devis après étude · 04 84 89 68 75 · Pratiques responsables.',
      keywords: 'nettoyage médical Marseille, entretien cabinet médical Marseille, hygiène locaux santé 13, nettoyage pharmacie Marseille, désinfection surfaces cabinet',
    },
    intro: 'À Marseille, un cabinet médical ou paramédical ne peut pas se permettre l\'approximation. Nature Clean entretient les locaux et surfaces des cabinets de médecins, spécialistes, kinésithérapeutes, dentistes, infirmières libérales, pharmacies et laboratoires — sans blocs opératoires ni zones stériles, sans gestion des DASRI. Produits bactéricides, virucides et fongicides adaptés aux zones définies au devis, traçabilité sur demande, discrétion entre deux consultations.',
    highlights: [
      'Entretien et désinfection des surfaces de contact, salles d’attente et zones définies au devis',
      'Produits bactéricides, virucides et fongicides adaptés à l’usage cabinet',
      'Intervention après fermeture ou entre créneaux de consultation',
      'Protocoles adaptés : DPS (désinfection des points de contact) systématique',
      'Traçabilité des interventions disponible sur demande pour vos audits',
      'Zone couverte : Marseille (13001 à 13016) et communes du 13 sur devis',
    ],
    secondaryImage: IMAGES.hygieneLocauxSante,
    secondaryImageAlt: 'Hygiène locaux de santé Marseille — protocole renforcé Nature Clean',
    conversionTitle: 'Professionnels de santé à Marseille : un prestataire qui parle votre langue',
    conversionSubtitle: 'Prise en charge sous 4 h ouvrées — devis détaillé après étude',
    faqItems: FAQ_MEDICAL_MARSEILLE,
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-coproprietes-aubagne'],
  },

  'nettoyage-bureaux-marseille': {
    slug: 'nettoyage-bureaux-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhône',
    postalCode: '13001–13016',
    service: 'Nettoyage de bureaux',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.grandOpenSpaceModerne,
    heroAlt: 'Plateau de bureaux vitrés côté Joliette, postes alignés le long des baies',
    heroTitle: 'Entretien de bureaux au Prado, à La Joliette et à Euroméditerranée',
    heroSubtitle: 'Accès, badges, parkings et horaires décalés depuis Marseille 8e',
    breadcrumbLabel: 'Prado, Joliette, Euromed',
    faqTitle: 'Questions fréquentes — Bureaux Prado, Joliette, Euromed',
    seo: {
      title: 'Bureaux Prado, Joliette, Euromed | Nature Clean',
      description:
        'Entretien de bureaux au Prado, à La Joliette et à Euroméditerranée. Depuis le 8e. Horaires décalés, RC Pro. Prise en charge sous 4 h ouvrées, devis détaillé après étude.',
      keywords: 'nettoyage bureaux Prado, entretien bureaux Joliette, nettoyage bureaux Euroméditerranée, ménage open space Marseille 8e, bureaux docks Marseille',
    },
    intro: 'Cette page n\'est pas un second « nettoyage de bureaux à Marseille ». Elle parle de trois quartiers d\'affaires : le Prado et le 8e (près de notre base, Traverse Pupat), La Joliette et les docks, Euroméditerranée. Badge, parking visiteur, livraison le matin, open space qui ouvre à 8 h 30 : ce sont ces contraintes-là qu\'on cale au devis. Le protocole (fréquences, sanitaires, planning) reste sur la fiche service.',
    highlights: [
      'Base à Marseille 8e — Prado et Saint-Giniez à quelques minutes',
      'Joliette / docks : badges, parkings souterrains, horaires de livraison',
      'Euroméditerranée : plateaux, coworkings, intervention avant 8 h',
      'Horaires décalés 6 h–22 h, standard lun–ven 9 h–18 h',
      'Produits professionnels adaptés à chaque chantier, matériel et consommables fournis',
      'La Valentine est un quartier du 11e, pas une ville à côté de Marseille',
    ],
    secondaryImage: IMAGES.openSpaceBureaux,
    secondaryImageAlt: 'Open space en open plan, moquette et postes, quartier d\'affaires marseillais',
    conversionTitle: 'Un site au Prado, à la Joliette ou à Euromed ?',
    conversionSubtitle: 'Prise en charge sous 4 h ouvrées, devis détaillé après étude — visite des accès et du parking',
    faqItems: FAQ_BUREAUX_MARSEILLE,
    relatedGeoPages: ['nettoyage-bureaux-aix-en-provence', 'nettoyage-coproprietes-aubagne'],
    serviceDifferentiator:
      'Cette page décrit les accès des quartiers d\'affaires (Prado, Joliette, Euroméditerranée). La fiche service détaille fréquences, sanitaires et démarrage de contrat.',
    localProof: [
      {
        title: 'Prado / 8e — près de Traverse Pupat',
        detail: 'Cabinets et petites agences : 2 à 3 passages par semaine, souvent avant 8 h. Le siège est dans le même arrondissement.',
      },
      {
        title: 'Joliette et docks',
        detail: 'Immeubles tertiaires, badge, parking sous-sol. On note les horaires de livraison pour ne pas coincer l\'autolaveuse dans la rampe.',
      },
      {
        title: 'Euroméditerranée — plateaux',
        detail: 'Open spaces et coworkings : binôme tôt le matin, surfaces tactiles et kitchenette à chaque passage.',
      },
      {
        title: 'Sols tertiaires — déjà en réalisations',
        detail: 'Remise en état de sols dans un immeuble de bureaux de la métropole : décapage, monobrosse, émulsion.',
        href: '/realisations',
      },
    ],
  },

  'nettoyage-coproprietes-aubagne': {
    slug: 'nettoyage-coproprietes-aubagne',
    city: 'Aubagne',
    department: 'Bouches-du-Rhône',
    postalCode: '13400',
    service: 'Nettoyage de copropriétés',
    serviceSlug: '/services/nettoyage-coproprietes',
    heroImage: IMAGES.hallMarbreAscenseurs,
    heroAlt: 'Hall et parties communes d\'une copropriété à Aubagne',
    heroTitle: 'Nettoyage de copropriétés à Aubagne',
    heroSubtitle: 'Syndics : halls, parkings, locaux poubelles — 13400, 15–20 min depuis Marseille 8e',
    breadcrumbLabel: 'Copropriétés à Aubagne',
    seo: {
      title: 'Nettoyage Copropriété Aubagne (13400) | Syndic | Nature Clean',
      description:
        'Nettoyage de copropriété à Aubagne : halls, escaliers, parkings, locaux poubelles. 15 à 20 min depuis Marseille 8e. Prise en charge sous 4 h ouvrées, devis détaillé après étude.',
      keywords: 'nettoyage copropriété Aubagne, entretien parties communes 13400, nettoyage syndic Aubagne, ménage immeuble Aubagne, entretien résidence Tourtelle',
    },
    intro: 'Depuis Marseille 8e, Aubagne est à 15–20 minutes par l\'A50 — c\'est notre secteur Est le plus proche. Nature Clean travaille avec des syndics et des conseils syndicaux d\'Aubagne pour l\'entretien des parties communes : centre-ville, Tourtelle, Pin Vert, Camp Major, Les Passons et Pont-de-l\'Étoile. Sur place, les sujets qui reviennent sont concrets : jours de collecte des ordures, locaux poubelles à désinfecter, parkings souterrains souvent mal éclairés, et halls qui prennent la poussière dès qu\'un chantier de ravalement démarre. Nous calons les passages sur les horaires de sortie des containers et sur la vie de l\'immeuble, pas sur un planning générique écrit à Marseille.',
    highlights: [
      '15 à 20 min depuis Marseille 8e via l\'A50',
      'Tourtelle, Pin Vert, Camp Major, Les Passons, Pont-de-l\'Étoile',
      'Sortie / rentrée des containers calée sur les jours de collecte',
      'Parkings souterrains, halls, cages d\'escalier, ascenseurs',
      'Registre ou compte-rendu photo si prévu au contrat',
      'RC Pro, Pratiques responsables — petites copropriétés et résidences de plusieurs dizaines de lots',
    ],
    secondaryImage: IMAGES.cageEscalier,
    secondaryImageAlt: 'Cage d\'escalier d\'une copropriété à Aubagne après entretien',
    conversionTitle: 'Syndics d\'Aubagne : un prestataire déjà dans le 13 Est',
    conversionSubtitle: 'Prise en charge sous 4 h ouvrées, devis détaillé après étude — audit des parties communes sur place',
    faqItems: FAQ_COPROPRIETES_AUBAGNE,
    relatedGeoPages: ['nettoyage-bureaux-aix-en-provence', 'nettoyage-coproprietes-la-ciotat'],
    serviceDifferentiator:
      'Cette page décrit le terrain aubagnais (A50, collecte, parkings). La fiche service « nettoyage de copropriétés » détaille le protocole halls, escaliers et contrat syndic.',
    localProof: [
      {
        title: 'Résidence type 40 à 70 lots',
        detail: 'Halls, cages, local poubelles et parking : 2 à 3 passages par semaine, calés sur les jours de collecte. Fréquent à la Tourtelle, au Pin Vert et à Camp Major.',
      },
      {
        title: '15–20 min depuis Marseille 8e',
        detail: 'A50 direction Toulon. C\'est pour ça qu\'un oubli de container ou un hall sali le matin peut encore être rattrapé dans la journée.',
      },
      {
        title: 'Remise en état après travaux — Aubagne',
        detail: 'Un appartement aubagnais déjà présenté dans nos réalisations : sols, plinthes et pièces de vie livrés pour la réception. Le même secteur Est, un autre métier.',
        href: '/realisations',
      },
      {
        title: 'Chantier de ravalement en cours',
        detail: 'Poussière dans les halls dès qu\'un échafaudage est monté. On renforce temporairement les passages plutôt que d\'attendre la fin du chantier.',
      },
    ],
  },

  'nettoyage-industriel-marseille': {
    slug: 'nettoyage-industriel-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhône',
    postalCode: '13001–13016',
    service: 'Nettoyage industriel',
    serviceSlug: '/services/nettoyage-chantiers',
    heroImage: IMAGES.openSpaceIndustrielNuit,
    heroAlt: 'Nettoyage industriel a Marseille — entrepots, ateliers, sites de production',
    seo: {
      title: 'Nettoyage Industriel Marseille | Entrepôts & ateliers 13 | Nature Clean',
      description:
        'Nettoyage industriel à Marseille : entrepôts, logistique, ateliers, dégraissage sols béton. Créneaux sur organisation · Prise en charge 4 h ouvrées · 04 84 89 68 75',
      keywords:
        'nettoyage industriel marseille, nettoyage entrepot marseille, nettoyage atelier 13, dégraissage industriel marseille, société nettoyage industriel bouches-du-rhône',
    },
    intro: 'Nature Clean intervient dans les entrepôts logistiques, ateliers, plateformes de stockage et locaux techniques de Marseille et des Bouches-du-Rhône. Sols béton, allées, quais, bureaux de quartier : produits et matériel professionnels adaptés au site, créneaux calés pour limiter l\'arrêt de production. Nous n\'annonçons pas de certification type HACCP ou ISO : le périmètre est écrit au devis.',
    highlights: [
      'Nettoyage et dégraissage de sols béton, époxy ou résine — selon faisabilité au devis',
      'Monobrosse, mini-autolaveuse, aspirateurs eau/poussière',
      'Hauteur courante : perches et échelles ; accès complexes (charpentes, cordes) via partenaire',
      'Entrepôts, ateliers et zones logistiques — hors conduits de hotte annoncés séparément',
      'Créneaux sur organisation spécifique, y compris hors horaires de production',
      'Marseille (13001-13016) et communes du 13 sur devis',
    ],
    secondaryImage: IMAGES.decapageSolEco,
    secondaryImageAlt: 'Decapage de sol industriel a Marseille — Nature Clean',
    conversionTitle: 'Sites industriels a Marseille : une proprete a la hauteur de vos enjeux',
    conversionSubtitle: 'Prise en charge sous 4 h ouvrées — devis détaillé après visite ou photos',
    faqItems: FAQ_INDUSTRIEL_MARSEILLE,
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-coproprietes-aubagne'],
    serviceDifferentiator:
      'Page locale « industriel + Marseille » : entrepôts, dégraissage et horaires de nuit. La fiche service chantiers couvre aussi les remises en état après travaux.',
    localProof: [
      {
        title: 'Zones portuaires & logistique',
        detail: 'Joliette, Fos, Vitrolles, Arnavant — interventions hors production.',
      },
      {
        title: 'Devis après étude',
        detail: 'Visite ou photos pour surfaces importantes — délai annoncé au devis.',
        href: '/blog/devis-nettoyage-marseille-guide',
      },
    ],
  },
};