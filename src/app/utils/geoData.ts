/**
 * geoData.ts — Données structurées des landing pages géographiques SEO.
 * Chaque entrée cible un combo ville × service pour du SEO local longue traîne.
 */

import { IMAGES } from '@/app/utils/images';
import type { FAQItem } from '@/app/components/FAQSection';

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
        'Entretien de parties communes à La Ciotat : halls, escaliers, parkings, locaux poubelles. Réponse sous 2 h, devis sous 24 h. RC Pro.',
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
      '50 % éco-labellisés, RC Pro — pas d\'entretien « piscine » (eau / chimie)',
    ],
    secondaryImage: IMAGES.hallCoproBoites,
    secondaryImageAlt: 'Hall de copropriété avec boîtes aux lettres à La Ciotat',
    conversionTitle: 'Syndics de La Ciotat : cahier des charges clair',
    conversionSubtitle: 'Réponse sous 2 h, devis sous 24 h après visite des parties communes',
    faqItems: [
      {
        question: 'Intervenez-vous dans les résidences neuves de La Ciotat ?',
        answer:
          'Oui, après visite : L\'Île Verte, programmes récents autour du port, immeubles anciens du centre. Le devis liste hall, cage, parking et local poubelles avec les fréquences adaptées au site.',
      },
      {
        question: 'Nettoyez-vous les piscines collectives ?',
        answer:
          'Non pour le traitement de l\'eau et la maintenance technique (pisciniste). En revanche, nettoyage des abords, vestiaires ou douches communes si c\'est au contrat de ménage.',
      },
      {
        question: 'Comment adaptez-vous la fréquence en bord de mer ?',
        answer:
          'Le sable et le sel accélèrent l\'encrassement des sols et des vitrages. On propose un planning après audit — souvent plus dense qu\'à l\'intérieur des terres, sans imposer un chiffre fixe sans visite.',
      },
      {
        question: 'Peut-on renforcer les passages en été ?',
        answer:
          'Oui si c\'est prévu au contrat ou par avenant quand les résidences secondaires sont occupées et que les parties communes sont plus sollicitées.',
      },
      {
        question: 'Quelle zone couvrez-vous depuis La Ciotat ?',
        answer:
          'La Ciotat (13600) en priorité. Hors Bouches-du-Rhône : déplacement chiffré au devis.',
      },
    ],
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
      title: 'Nettoyage Bureaux Aix-en-Provence (13100) | Nature Clean | Devis Gratuit',
      description: 'Entretien de bureaux à Aix-en-Provence : centre, Jas de Bouffan, Les Milles, Duranne. 25 à 40 min depuis Marseille 8e. Réponse sous 2 h, devis sous 24 h.',
      keywords: 'nettoyage bureaux Aix-en-Provence, entretien locaux 13100, société nettoyage Aix, nettoyage professionnel Aix-en-Provence, ménage bureau Les Milles',
    },
    intro: 'Nature Clean part de Marseille 8e (22 Traverse Pupat) pour l\'entretien de bureaux à Aix-en-Provence. Hors heure de pointe, comptez environ 30 minutes jusqu\'au centre-ville et 25 minutes jusqu\'au pôle d\'activités des Milles ; entre 7 h 30 et 9 h, l\'A51 allonge souvent le trajet de 10 à 15 minutes. Nous intervenons dans le centre historique (agences, coworkings, étages au-dessus des commerces), au Jas de Bouffan, aux Milles, à la Duranne, à Luynes et à Puyricard. Les contraintes ne sont pas les mêmes partout : dans le centre, les rues semi-piétonnes interdisent souvent le stationnement d\'un utilitaire après 10 h — on arrive tôt et on porte le matériel. Aux Milles, les parcs d\'activités demandent un badge, un créneau avant l\'arrivée des salariés, et le parking visiteurs est saturé dès 8 h.',
    highlights: [
      '25 à 40 min depuis Marseille 8e selon le créneau et l\'A51',
      'Centre historique : matériel léger, passage avant 10 h',
      'Pôle des Milles : badge, open spaces, créneau avant 7 h 30',
      'Jas de Bouffan, Duranne, Luynes, Puyricard',
      'Intervention 6 h–22 h, 7 j/7 — hors horaires de bureau',
      '50 % de produits éco-labellisés, RC Pro, interlocuteur dédié',
    ],
    secondaryImage: IMAGES.openSpaceBureaux,
    secondaryImageAlt: 'Plateaux de bureaux au pôle d\'activités des Milles, près d\'Aix-en-Provence',
    conversionTitle: 'Vos bureaux à Aix méritent un entretien calé sur vos horaires',
    conversionSubtitle: 'Réponse sous 2 h, devis sous 24 h — centre, Milles, Duranne, Jas de Bouffan',
    faqItems: [
      { question: 'Intervenez-vous dans toutes les zones d\'Aix-en-Provence ?', answer: 'Oui : centre historique, Jas de Bouffan, pôle d\'activités des Milles, Duranne, Luynes, Puyricard et les zones d\'activités autour. Chaque site a ses accès : on les note dès la visite.' },
      { question: 'Combien de temps faut-il depuis Marseille 8e ?', answer: 'Environ 25 minutes jusqu\'aux Milles et 30 minutes jusqu\'au centre hors pointe. Sur l\'A51 entre 7 h 30 et 9 h, prévoyez 10 à 15 minutes de plus. C\'est pour ça que les contrats bureaux à Aix commencent souvent avant 7 h 30 ou après 19 h.' },
      { question: 'Comment gérez-vous le stationnement dans le centre d\'Aix ?', answer: 'Les rues semi-piétonnes et les livraisons limitées le matin interdisent souvent de laisser un utilitaire. On arrive tôt, on décharge, et on travaille avec du matériel compact. Aux Milles et à la Duranne, le sujet est plutôt le badge et la place visiteurs avant 8 h.' },
      { question: 'Quel délai pour démarrer un contrat à Aix ?', answer: 'Réponse sous 2 h, devis sous 24 h après la visite. Démarrage généralement sous 48 h une fois le devis validé.' },
      { question: 'Proposez-vous le nettoyage de vitres à Aix ?', answer: 'Oui, vitres intérieures et extérieures, en option ou inclus selon le contrat. En centre-ville, on privilégie les perches plutôt que la nacelle dès que la hauteur le permet.' },
    ],
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
    postalCode: '13000',
    service: 'Nettoyage médical et locaux de santé',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.cabinetMedical,
    heroAlt: 'Nettoyage désinfection cabinet médical Marseille — protocole sanitaire Nature Clean',
    seo: {
      title: 'Nettoyage Cabinet Médical Marseille | Désinfection | Nature Clean',
      description:
        'Nettoyage cabinet médical à Marseille : dentistes, kinés, labos. Protocole désinfection & traçabilité. Devis 24 h · 04 84 89 68 75 · 50 % produits éco-certifiés.',
      keywords: 'nettoyage médical Marseille, désinfection cabinet médical Marseille, nettoyage clinique Marseille, entretien locaux santé 13, nettoyage pharmacie Marseille, protocole désinfection ARS Marseille',
    },
    intro: 'À Marseille, un cabinet médical ou paramédical ne peut pas se permettre l\'approximation. Nos clients dans le milieu de la santé nous le disent clairement : ils ont besoin d\'un prestataire qui connaît les protocoles, qui n\'arrive pas avec du produit multi-usage et une serpillière. Nature Clean intervient dans les cabinets de médecins généralistes, spécialistes, kinésithérapeutes, dentistes, infirmières libérales et laboratoires d\'analyses à Marseille. Produits virucides et bactéricides adaptés à chaque zone, traçabilité des interventions sur demande, et discrétion totale entre deux consultations.',
    highlights: [
      'Désinfection certifiée : surfaces de contact, salles de soins, salle d\'attente',
      'Produits virucides, bactéricides et fongicides — conformes aux recommandations ARS',
      'Intervention après fermeture ou entre créneaux de consultation',
      'Protocoles adaptés : DPS (désinfection des points de contact) systématique',
      'Traçabilité des interventions disponible sur demande pour vos audits',
      'Zone couverte : tous arrondissements de Marseille, Aubagne, Cassis, La Ciotat',
    ],
    secondaryImage: IMAGES.hygieneLocauxSante,
    secondaryImageAlt: 'Hygiène locaux de santé Marseille — protocole renforcé Nature Clean',
    conversionTitle: 'Professionnels de santé à Marseille : un prestataire qui parle votre langue',
    conversionSubtitle: 'Devis gratuit sous 4h — premier passage d\'essai offert',
    faqItems: [
      {
        question: 'Vous intervenez dans quel type de locaux médicaux à Marseille ?',
        answer: 'Cabinets de médecins généralistes et spécialistes, dentistes, kinésithérapeutes, ostéopathes, infirmières libérales, pharmacies, laboratoires d\'analyses médicales, centres de radiologie, cabinets de psychologues. On connaît bien les contraintes de chaque type de local — un cabinet dentaire ne se nettoie pas comme une salle de kiné.',
      },
      {
        question: 'Quels produits utilisez-vous pour la désinfection médicale ?',
        answer: 'On utilise des produits bactéricides, virucides et fongicides adaptés aux surfaces médicales : désinfectants de surfaces norme EN 14476 (actifs sur les virus enveloppés et non enveloppés), lingettes imprégnées pour les points de contact, et produits de sol compatibles avec les revêtements vinyle et linoléum des cabinets. Tout est en conformité avec les recommandations de la HAS et de l\'ARS PACA.',
      },
      {
        question: 'Pouvez-vous intervenir entre deux consultations à Marseille ?',
        answer: 'Oui, c\'est même souvent ce qu\'on fait. Une heure de coupure le midi, une demi-journée de fermeture le mercredi — on s\'adapte. Nos équipes arrivent avec le strict minimum de matériel pour ne pas gêner l\'accueil des patients. Si vous avez une salle d\'attente avec des enfants ou des personnes âgées dans la journée, on utilise des produits sans odeur forte et à séchage rapide.',
      },
      {
        question: 'Proposez-vous un contrat d\'entretien régulier pour les cabinets marseillais ?',
        answer: 'Oui, c\'est le fonctionnement de la grande majorité de nos clients médicaux. Contrat hebdomadaire, bi-hebdomadaire ou quotidien selon la fréquentation du cabinet. On établit un protocole écrit, un planning fixe, et vous avez toujours le même agent — ce qui est essentiel dans un cabinet médical pour des raisons de confidentialité et de confiance.',
      },
    ],
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-industriel-marseille'],
  },

  'nettoyage-bureaux-marseille': {
    slug: 'nettoyage-bureaux-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhône',
    postalCode: '13000',
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
        'Entretien de bureaux au Prado, à La Joliette et à Euroméditerranée. Depuis le 8e. Horaires décalés, RC Pro. Réponse sous 2 h, devis sous 24 h.',
      keywords: 'nettoyage bureaux Prado, entretien bureaux Joliette, nettoyage bureaux Euroméditerranée, ménage open space Marseille 8e, bureaux docks Marseille',
    },
    intro: 'Cette page n\'est pas un second « nettoyage de bureaux à Marseille ». Elle parle de trois quartiers d\'affaires : le Prado et le 8e (près de notre base, Traverse Pupat), La Joliette et les docks, Euroméditerranée. Badge, parking visiteur, livraison le matin, open space qui ouvre à 8 h 30 : ce sont ces contraintes-là qu\'on cale au devis. Le protocole (fréquences, sanitaires, planning) reste sur la fiche service.',
    highlights: [
      'Base à Marseille 8e — Prado et Saint-Giniez à quelques minutes',
      'Joliette / docks : badges, parkings souterrains, horaires de livraison',
      'Euroméditerranée : plateaux, coworkings, intervention avant 8 h',
      'Horaires décalés 6 h–22 h, standard lun–sam 8 h–18 h',
      '50 % de produits éco-labellisés, matériel et consommables fournis',
      'La Valentine est un quartier du 11e, pas une ville à côté de Marseille',
    ],
    secondaryImage: IMAGES.openSpaceBureaux,
    secondaryImageAlt: 'Open space en open plan, moquette et postes, quartier d\'affaires marseillais',
    conversionTitle: 'Un site au Prado, à la Joliette ou à Euromed ?',
    conversionSubtitle: 'Réponse sous 2 h, devis sous 24 h — visite des accès et du parking',
    faqItems: [
      { question: 'Pourquoi une page Prado / Joliette / Euromed en plus de la fiche bureaux ?', answer: 'La fiche service décrit le contrat et le protocole. Ici on parle d\'accès : badge Euromed, parking docks, créneau avant l\'ouverture au Prado. Deux pages, deux rôles — pas deux fois la même requête.' },
      { question: 'Combien de temps depuis le 8e jusqu\'à La Joliette ?', answer: 'En pratique, 15 à 25 minutes selon l\'heure, via le tunnel Prado ou le littoral. Un oubli le matin (kitchenette, sanitaires) peut encore être rattrapé dans la journée.' },
      { question: 'Gérez-vous les badges et les parkings souterrains ?', answer: 'Oui. On récupère les badges à la visite, on note le local poubelles et le niveau de parking. Rien n\'est improvisé le premier lundi devant une barrière.' },
      { question: 'Intervenez-vous aussi à La Valentine ou à Château-Gombert ?', answer: 'Oui, La Valentine (11e) et Château-Gombert sont des quartiers de Marseille. Ce n\'est pas le même trajet que la Joliette : on le dit au devis, on ne promet pas le même créneau qu\'un site du 8e.' },
      { question: 'Les horaires 6 h–22 h sont-ils ceux du standard ?', answer: 'Non. 6 h–22 h = fenêtre d\'intervention sur site. Le standard répond du lundi au samedi, 8 h–18 h. Réponse sous 2 h, devis sous 24 h.' },
    ],
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
        'Nettoyage de copropriété à Aubagne : halls, escaliers, parkings, locaux poubelles. 15 à 20 min depuis Marseille 8e. Réponse sous 2 h, devis sous 24 h.',
      keywords: 'nettoyage copropriété Aubagne, entretien parties communes 13400, nettoyage syndic Aubagne, ménage immeuble Aubagne, entretien résidence Tourtelle',
    },
    intro: 'Depuis Marseille 8e, Aubagne est à 15–20 minutes par l\'A50 — c\'est notre secteur Est le plus proche. Nature Clean travaille avec des syndics et des conseils syndicaux d\'Aubagne pour l\'entretien des parties communes : centre-ville, Tourtelle, Pin Vert, Camp Major, Les Passons et Pont-de-l\'Étoile. Sur place, les sujets qui reviennent sont concrets : jours de collecte des ordures, locaux poubelles à désinfecter, parkings souterrains souvent mal éclairés, et halls qui prennent la poussière dès qu\'un chantier de ravalement démarre. Nous calons les passages sur les horaires de sortie des containers et sur la vie de l\'immeuble, pas sur un planning générique écrit à Marseille.',
    highlights: [
      '15 à 20 min depuis Marseille 8e via l\'A50',
      'Tourtelle, Pin Vert, Camp Major, Les Passons, Pont-de-l\'Étoile',
      'Sortie / rentrée des containers calée sur les jours de collecte',
      'Parkings souterrains, halls, cages d\'escalier, ascenseurs',
      'Registre ou compte-rendu photo si prévu au contrat',
      'RC Pro, 50 % éco-labellisés — petites copropriétés et résidences de plusieurs dizaines de lots',
    ],
    secondaryImage: IMAGES.cageEscalier,
    secondaryImageAlt: 'Cage d\'escalier d\'une copropriété à Aubagne après entretien',
    conversionTitle: 'Syndics d\'Aubagne : un prestataire déjà dans le 13 Est',
    conversionSubtitle: 'Réponse sous 2 h, devis sous 24 h — audit des parties communes sur place',
    faqItems: [
      { question: 'Couvrez-vous tous les quartiers d\'Aubagne ?', answer: 'Oui : centre-ville, Tourtelle, Pin Vert, Camp Major, Les Passons, Pont-de-l\'Étoile et les résidences autour. Le délai depuis Marseille 8e reste le même, environ 15 à 20 minutes.' },
      { question: 'Comment gérez-vous les jours de collecte et les locaux poubelles ?', answer: 'On note les jours de collecte dès l\'audit. Sortie et rentrée des containers, lavage et désinfection du local : c\'est dans le contrat, pas en extra surprise. Si le jour change, le gardien ou le syndic nous prévient sur le numéro dédié.' },
      { question: 'Pouvez-vous reprendre un contrat en cours avec un autre prestataire ?', answer: 'Oui. Audit gratuit, transition sans trou dans le planning, préavis de l\'ancien prestataire géré en parallèle. On ne laisse pas un hall une semaine sans passage.' },
      { question: 'Quelle fréquence pour une copropriété d\'environ 50 lots ?', answer: 'En pratique à Aubagne, 2 à 3 passages hebdomadaires sur les parties communes, plus un passage mensuel approfondi parking et locaux techniques. On ajuste si un ravalement ou des travaux salissent les halls.' },
      {
        question: 'Les résidents peuvent-ils vous joindre directement ?',
        answer:
          'En priorité via le syndic ou le gardien. Si le contrat le prévoit, un contact pour les urgences propreté (local poubelles, hall). Tags ou dégât des eaux : intervention chiffrée à part, souvent sans attendre l\'AG.',
      },
    ],
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
    postalCode: '13000',
    service: 'Nettoyage industriel',
    serviceSlug: '/services/nettoyage-chantiers',
    heroImage: IMAGES.openSpaceIndustrielNuit,
    heroAlt: 'Nettoyage industriel a Marseille — entrepots, ateliers, sites de production',
    seo: {
      title: 'Nettoyage Industriel Marseille | Entrepôts & ateliers 13 | Nature Clean',
      description:
        'Nettoyage industriel à Marseille : entrepôts, logistique, ateliers, dégraissage sols béton. Nuit & week-end · Protocoles HSE · Devis 24 h · 04 84 89 68 75',
      keywords:
        'nettoyage industriel marseille, nettoyage industriel paca, nettoyage entrepot marseille, nettoyage atelier 13, dégraissage industriel marseille, société nettoyage industriel bouches-du-rhône',
    },
    intro: 'Nature Clean est une entreprise marseillaise specialisee dans le nettoyage industriel. Nous intervenons dans les entrepots logistiques, ateliers de production, plateformes de stockage et sites industriels de Marseille et sa metropole — du port de la Joliette aux zones d\'activites d\'Arnavant, de la Cabucelle a Saint-Menet, en passant par les Aygalades, La Valentine et Vitrolles. Sols beton, machines, structures metalliques, zones de production : nos equipes disposent du materiel professionnel et des protocoles adaptes aux environnements industriels exigeants.',
    highlights: [
      'Nettoyage et degraissage de sols beton, epoxy et resine industrielle',
      'Decapage haute pression et autolaveuses grande capacite',
      'Intervention en hauteur (charpentes, structures metalliques, gaines)',
      'Entretien des entrepots logistiques et plateformes de stockage',
      'Equipes formees aux protocoles HSE et habilitees travail en hauteur',
      'Intervention 7j/7, y compris la nuit pour ne pas perturber la production',
      'Zone couverte : Marseille (13001-13016), Vitrolles, Arnavant, Saint-Menet',
    ],
    secondaryImage: IMAGES.decapageSolEco,
    secondaryImageAlt: 'Decapage de sol industriel a Marseille — Nature Clean',
    conversionTitle: 'Sites industriels a Marseille : une proprete a la hauteur de vos enjeux',
    conversionSubtitle: 'Devis gratuit et audit technique sous 48h — intervention sur toute la metropole',
    faqItems: [
      { question: 'Quels types de sites industriels nettoyez-vous a Marseille ?', answer: 'Nous intervenons dans tous types d\'environnements industriels : entrepots logistiques, plateformes de distribution, ateliers de production, sites agroalimentaires, garages et concessions, imprimeries, ateliers metallurgiques. Chaque secteur a ses contraintes — notre devis integre une visite technique prealable.' },
      { question: 'Pouvez-vous intervenir la nuit ou le week-end pour ne pas arreter la production ?', answer: 'Oui, c\'est notre fonctionnement standard pour les sites industriels marseillais. Nous intervenons 7j/7, de 22h a 6h pour les sites en production continue, ou le week-end pour les nettoyages approfondis. Vos lignes de production ne sont jamais interrompues.' },
      { question: 'Disposez-vous du materiel pour le degraissage et le decapage industriel ?', answer: 'Oui : autolaveuses autoportees, monobrosses haute vitesse, nettoyeurs haute pression eau chaude, decapeurs vapeur, aspirateurs industriels. Nous utilisons des degraissants alimentaires (HACCP) ou industriels selon votre secteur d\'activite.' },
      { question: 'Vos equipes sont-elles habilitees pour le travail en hauteur ?', answer: 'Oui, nos agents disposent des habilitations CACES nacelle et travail en hauteur pour le nettoyage des charpentes, structures metalliques, gaines de ventilation et eclairages industriels. Nous fournissons l\'attestation d\'habilitation sur demande.' },
      { question: 'Couvrez-vous les zones industrielles peripheriques de Marseille ?', answer: 'Oui, nous couvrons toutes les zones d\'activites de la metropole : Arnavant, La Cabucelle, Saint-Menet, La Valentine, Les Aygalades, Plan-de-Campagne, Vitrolles et la zone portuaire de Marseille-Fos. Notre siege a Marseille 8e garantit une reactivite optimale.' },
    ],
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-industriel-marseille'],
    serviceDifferentiator:
      'Page locale « industriel + Marseille » : entrepôts, dégraissage et horaires de nuit. La fiche service chantiers couvre aussi les remises en état après travaux.',
    localProof: [
      {
        title: 'Zones portuaires & logistique',
        detail: 'Joliette, Fos, Vitrolles, Arnavant — interventions hors production.',
      },
      {
        title: 'Devis sous 48 h',
        detail: 'Visite technique incluse pour surfaces > 500 m².',
        href: '/blog/devis-nettoyage-marseille-guide',
      },
    ],
  },
};

/** Liste ordonnee des slugs pour le maillage interne */
export const GEO_PAGE_SLUGS = Object.keys(GEO_PAGES);