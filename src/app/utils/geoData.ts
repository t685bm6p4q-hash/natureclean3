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
}

export const GEO_PAGES: Record<string, GeoPageData> = {

  'nettoyage-coproprietes-la-ciotat': {
    slug: 'nettoyage-coproprietes-la-ciotat',
    city: 'La Ciotat',
    department: 'Bouches-du-Rhone',
    postalCode: '13600',
    service: 'Nettoyage de coproprietes',
    serviceSlug: '/services/nettoyage-coproprietes',
    heroImage: IMAGES.residenceModerne,
    heroAlt: 'Nettoyage coproprietes et residences a La Ciotat — Nature Clean',
    seo: {
      title: 'Nettoyage Coproprietes La Ciotat (13600) | Nature Clean | Contrat Syndic',
      description: 'Entretien de coproprietes a La Ciotat : halls, escaliers, parkings, piscines communes. Contrat syndic flexible. Devis gratuit 04 84 89 68 75',
      keywords: 'nettoyage copropriete La Ciotat, entretien parties communes 13600, nettoyage syndic La Ciotat, menage immeuble La Ciotat, entretien residence La Ciotat',
    },
    intro: 'Nature Clean accompagne les coproprietes de La Ciotat dans l\'entretien de leurs parties communes. Ville en plein essor avec de nombreux programmes neufs, La Ciotat compte des residences variees — des immeubles du Vieux-Port aux residences modernes du quartier des Calanques ou de l\'Ile Verte — qui necessitent un entretien regulier et professionnel.',
    highlights: [
      'Experience des coproprietes neuves et anciennes (10 a 150+ lots)',
      'Entretien des piscines communes et espaces de loisirs',
      'Nettoyage des parkings souterrains et zones de stationnement',
      'Sortie/rentree containers et desinfection locaux poubelles',
      'Suivi qualite mensuel avec rapport photographique au syndic',
      'Zone couverte : La Ciotat, Ceyreste, Saint-Cyr-sur-Mer',
    ],
    secondaryImage: IMAGES.hallCoproBoites,
    secondaryImageAlt: 'Hall de copropriete entretenu a La Ciotat',
    conversionTitle: 'Syndics de La Ciotat : un partenaire proprete reactif',
    conversionSubtitle: 'Devis gratuit et audit de vos parties communes sous 48h',
    faqItems: [
      { question: 'Couvrez-vous les nouvelles residences de La Ciotat ?', answer: 'Oui, nous intervenons dans les residences neuves comme anciennes : quartier de l\'Ile Verte, ZAC des Calanques, Vieux-Port, Eoures et tous les nouveaux programmes de La Ciotat.' },
      { question: 'Gerez-vous l\'entretien des piscines de copropriete ?', answer: 'Nous assurons le nettoyage des abords de piscine, vestiaires et douches communes. Pour le traitement de l\'eau et la maintenance technique, nous recommandons un pisciniste specialise.' },
      { question: 'Quelle frequence recommandez-vous pour une copropriete en bord de mer ?', answer: 'En bord de mer, le sable et les embruns salissent davantage. Nous recommandons 3 passages hebdomadaires minimum, avec un renforcement en saison estivale.' },
      { question: 'Proposez-vous un renforcement en ete avec l\'afflux de residents ?', answer: 'Oui, nous adaptons la frequence des passages en haute saison (juin-septembre) quand les residences secondaires sont occupees et que les parties communes sont plus sollicitees.' },
    ],
    relatedGeoPages: ['nettoyage-coproprietes-aubagne', 'nettoyage-bureaux-marseille'],
  },

  'nettoyage-fin-chantier-marseille': {
    slug: 'nettoyage-fin-chantier-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhone',
    postalCode: '13000',
    service: 'Nettoyage fin de chantier',
    serviceSlug: '/services/nettoyage-chantiers',
    heroImage: IMAGES.cuisineLivraisonValentine,
    heroAlt: 'Nettoyage fin de chantier à Marseille — remise en état après travaux',
    seo: {
      title: 'Nettoyage Fin de Chantier Marseille (13) | Nature Clean | Devis Gratuit',
      description: 'Nettoyage après travaux à Marseille : évacuation gravats, lessivage complet, vitres. Livraison promoteur, rénovation appartement. Intervention rapide 7j/7. Devis gratuit 04 84 89 68 75',
      keywords: 'nettoyage fin chantier Marseille, nettoyage après travaux Marseille, remise en état chantier 13, nettoyage livraison promoteur Marseille, entreprise nettoyage construction Marseille',
    },
    intro: 'Nature Clean, entreprise marseillaise basée dans le 8ème, intervient tous les jours pour le nettoyage fin de chantier à Marseille et dans les Bouches-du-Rhône. Qu\'il s\'agisse d\'un programme neuf livré par un promoteur, d\'une rénovation d\'appartement entre locataires ou d\'un chantier commercial dans le centre-ville, on connaît Marseille par cœur — et on sait qu\'un chantier bien nettoyé, c\'est la différence entre une livraison qui traîne et un client satisfait qui signe le jour même.',
    highlights: [
      'Évacuation complète des gravats et tri sélectif des déchets',
      'Lessivage des sols, murs, plafonds et menuiseries neuves',
      'Nettoyage de vitres intérieures et extérieures après travaux',
      'Intervention rapide sous 24h à Marseille — équipe dédiée 7j/7',
      'Conforme aux exigences des promoteurs et syndics marseillais',
      'Zone couverte : tous arrondissements (13001 à 13016), Aubagne, Vitrolles',
    ],
    secondaryImage: IMAGES.remiseEtatCuisine,
    secondaryImageAlt: 'Cuisine remise en état après travaux à Marseille',
    conversionTitle: 'Promoteurs et artisans à Marseille : livrez propre du premier coup',
    conversionSubtitle: 'Devis gratuit sous 4h — intervention dès demain si besoin',
    faqItems: [
      { question: 'Combien de temps pour nettoyer un T3 après rénovation à Marseille ?', answer: 'Pour un T3 standard (60-70 m²) après rénovation complète, comptez 4 à 6 heures avec une équipe de 2 personnes. On évacue les gravats, on lessive tout, on fait les vitres. Si le chantier est vraiment sale (plâtre partout, ciment sur le carrelage), on rajoute 2 heures. On vous dit tout au téléphone avant de venir.' },
      { question: 'Vous intervenez dans quel délai à Marseille ?', answer: 'Notre bureau est à Marseille 8ème, rue Paradis. Si vous appelez avant 14h, on peut souvent passer le jour même pour les urgences. Sinon, intervention sous 24h partout à Marseille. Pour les gros chantiers promoteurs, on cale un planning une semaine avant la livraison, mais on garde toujours une marge pour les imprévus.' },
      { question: 'Vous gérez les gros programmes neufs à Marseille ?', answer: 'Oui, on a l\'habitude. On a déjà fait des livraisons de 30, 50, 80 logements sur Marseille — Euroméditerranée, Les Docks, Bonneveine, Saint-Giniez. On mobilise une équipe de 6 à 10 personnes selon la taille, avec un chef d\'équipe qui reste sur place et qui coordonne tout. Vous avez un interlocuteur unique, pas 15 numéros différents.' },
      { question: 'Vous évacuez vraiment tous les gravats ou faut prévoir une benne ?', answer: 'On évacue tout : sacs de gravats, cartons, chutes de placo, résidus de ciment. Si le chantier a déjà une benne, parfait, on remplit. Sinon, on embarque tout dans notre camion et on va à la déchetterie de Septèmes ou des Aygalades. C\'est inclus dans le devis, pas de supplément surprise.' },
    ],
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-industriel-marseille'],
  },

  'nettoyage-bureaux-aix-en-provence': {
    slug: 'nettoyage-bureaux-aix-en-provence',
    city: 'Aix-en-Provence',
    department: 'Bouches-du-Rhone',
    postalCode: '13100',
    service: 'Nettoyage de bureaux',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.grandOpenSpaceModerne,
    heroAlt: 'Nettoyage de bureaux professionnels a Aix-en-Provence — Nature Clean',
    seo: {
      title: 'Nettoyage Bureaux Aix-en-Provence (13100) | Nature Clean | Devis Gratuit',
      description: 'Entretien de bureaux a Aix-en-Provence : open spaces, sanitaires, vitres. Intervention 6h-22h, contrat sur mesure. 50% produits eco. Devis gratuit 04 84 89 68 75',
      keywords: 'nettoyage bureaux Aix-en-Provence, entretien locaux 13100, societe nettoyage Aix, nettoyage professionnel Aix-en-Provence, menage bureau Aix',
    },
    intro: 'Nature Clean intervient a Aix-en-Provence et dans tout le Pays d\'Aix pour l\'entretien regulier de vos bureaux et locaux professionnels. Que vous soyez installe dans le centre-ville, au Jas de Bouffan, aux Milles ou sur la zone d\'activites de la Duranne, nos equipes assurent un nettoyage professionnel adapte a votre rythme de travail.',
    highlights: [
      'Intervention 6h-22h, 7j/7 — avant ou apres vos horaires de bureau',
      'Contrats hebdomadaires ou quotidiens adaptes a votre surface',
      '50% de produits eco-labellises Bio et biodegradables',
      'Equipe dediee avec un referent unique pour votre site',
      'Zone couverte : centre Aix, Jas de Bouffan, Les Milles, Duranne',
      'Assurance RC Pro et garantie qualite contractuelle',
    ],
    secondaryImage: IMAGES.openSpaceBureaux,
    secondaryImageAlt: 'Open space entretenu par Nature Clean a Aix-en-Provence',
    conversionTitle: 'Vos bureaux a Aix meritent un entretien professionnel',
    conversionSubtitle: 'Devis gratuit sous 24h — intervention sur tout le Pays d\'Aix',
    faqItems: [
      { question: 'Intervenez-vous dans toutes les zones d\'Aix-en-Provence ?', answer: 'Oui, nous couvrons tout Aix-en-Provence : centre historique, Jas de Bouffan, Les Milles, Duranne, Luynes, Puyricard et les zones d\'activites environnantes.' },
      { question: 'Quel est le delai pour demarrer un contrat a Aix ?', answer: 'Nous pouvons demarrer sous 48h apres validation du devis. Un audit gratuit de vos locaux est realise pour calibrer la prestation.' },
      { question: 'Vos equipes sont-elles basees pres d\'Aix-en-Provence ?', answer: 'Notre siege est a Marseille 8e, a 25 minutes d\'Aix. Nous avons des equipes dediees aux secteurs Aix et Pays d\'Aix pour garantir ponctualite et reactivite.' },
      { question: 'Proposez-vous le nettoyage de vitres a Aix ?', answer: 'Oui, le nettoyage des vitres interieures et exterieures est inclus ou disponible en option dans nos contrats bureaux a Aix-en-Provence.' },
    ],
    relatedGeoPages: ['nettoyage-coproprietes-aubagne', 'nettoyage-bureaux-marseille'],
  },

  'nettoyage-medical-marseille': {
    slug: 'nettoyage-medical-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhone',
    postalCode: '13000',
    service: 'Nettoyage médical et locaux de santé',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.cabinetMedical,
    heroAlt: 'Nettoyage désinfection cabinet médical Marseille — protocole sanitaire Nature Clean',
    seo: {
      title: 'Nettoyage Médical Marseille | Nature Clean',
      description: 'Nettoyage médical à Marseille ⭐ 4,9/5 — Désinfection normes sanitaires : cabinets, dentistes, labos. Devis en 2h. 50% produits éco-certifiés.',
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
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-fin-chantier-marseille'],
  },

  'nettoyage-bureaux-marseille': {
    slug: 'nettoyage-bureaux-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhone',
    postalCode: '13000',
    service: 'Nettoyage de bureaux',
    serviceSlug: '/services/entretien-bureaux',
    heroImage: IMAGES.grandOpenSpaceModerne,
    heroAlt: 'Nettoyage de bureaux professionnels a Marseille — Nature Clean Marseille',
    seo: {
      title: 'Nettoyage Bureaux Marseille | Nature Clean',
      description: 'Nettoyage de bureaux à Marseille ⭐ 4,9/5 — Devis en 2h, sans engagement. Joliette, Vieux-Port, 13001-13016. 50% éco-responsable. Nature Clean.',
      keywords: 'nettoyage bureaux Marseille, entretien locaux Marseille, societe nettoyage Marseille, nettoyage professionnel Marseille 13, menage bureau Marseille, entreprise nettoyage 13008',
    },
    intro: 'Nature Clean est une entreprise de nettoyage professionnelle basee a Marseille 8e, et c\'est ici que nous intervenons au quotidien pour l\'entretien de vos bureaux et locaux professionnels. Du Vieux-Port a la Timone, du Prado aux Calanques, de la zone d\'activites de Vitrolles au technopole de Chateau-Gombert : nos equipes connaissent Marseille arrondissement par arrondissement, et nous assurons un nettoyage professionnel adapte a vos horaires, a votre surface et a votre secteur d\'activite.',
    highlights: [
      'Siege social a Marseille 8e — equipes locales et reactivite maximale',
      'Intervention 6h-22h, 7j/7 — avant ou apres vos horaires de bureau',
      'Contrats hebdomadaires ou quotidiens, resiliables avec 1 mois de preavis',
      '50% de produits eco-labellises Ecolabel Europeen et biodegradables',
      'Equipe dediee avec un referent unique et numero direct pour votre site',
      'Zone couverte : tous arrondissements (13001 a 13016), Aubagne, Vitrolles',
    ],
    secondaryImage: IMAGES.openSpaceBureaux,
    secondaryImageAlt: 'Open space marseillais entretenu par Nature Clean',
    conversionTitle: 'Vos bureaux a Marseille meritent le meilleur entretien',
    conversionSubtitle: 'Devis gratuit et audit de vos locaux sous 24h — toute la metropole',
    faqItems: [
      { question: 'Intervenez-vous dans tous les arrondissements de Marseille ?', answer: 'Oui, nous couvrons l\'integralite des 16 arrondissements de Marseille : centre-ville (13001-13006), Prado, Bonneveine, Saint-Giniez (13008), Vauban, Baille, Timone (13005), Nord-Marseille (13013-13015), La Rose, L\'Estaque et jusqu\'aux quartiers periferiques de Plan-de-Cuques, Allauch et Aubagne.' },
      { question: 'Quel est le delai pour demarrer un contrat d\'entretien a Marseille ?', answer: 'Notre siege etant a Marseille 8e, nous pouvons realiser un audit gratuit de vos locaux sous 24h et demarrer la prestation sous 48h apres validation du devis. Pas de periode d\'attente : vous beneficiez d\'une equipe dediee des le premier jour.' },
      { question: 'Intervenez-vous en dehors des heures de bureau ?', answer: 'Oui, c\'est meme notre mode operatoire standard a Marseille. La majorite de nos clients preferent un passage avant 8h ou apres 19h. Nos equipes interviennent de 6h a 22h, 7j/7. Pour les grandes surfaces en open space, on travaille souvent en binome pour aller plus vite sans perturber votre activite.' },
      { question: 'Proposez-vous un contrat sans engagement longue duree ?', answer: 'Oui. Nous proposons une periode d\'essai de 4 semaines pour que vous puissiez evaluer la qualite de notre travail. Les contrats sont ensuite resiliables avec 1 mois de preavis. C\'est la qualite constante du resultat qui fidelyse nos clients — pas une clause contractuelle.' },
    ],
    relatedGeoPages: ['nettoyage-bureaux-aix-en-provence', 'nettoyage-coproprietes-aubagne'],
  },

  'nettoyage-coproprietes-aubagne': {
    slug: 'nettoyage-coproprietes-aubagne',
    city: 'Aubagne',
    department: 'Bouches-du-Rhone',
    postalCode: '13400',
    service: 'Nettoyage de coproprietes',
    serviceSlug: '/services/nettoyage-coproprietes',
    heroImage: IMAGES.hallMarbreAscenseurs,
    heroAlt: 'Nettoyage coproprietes et parties communes a Aubagne — Nature Clean',
    seo: {
      title: 'Nettoyage Coproprietes Aubagne (13400) | Nature Clean | Contrat Syndic',
      description: 'Entretien de coproprietes a Aubagne : halls, escaliers, parkings, local poubelles. Contrat syndic sur mesure. Equipe de proximite. Devis gratuit 04 84 89 68 75',
      keywords: 'nettoyage copropriete Aubagne, entretien parties communes 13400, nettoyage syndic Aubagne, menage immeuble Aubagne, entretien residence Aubagne',
    },
    intro: 'Nature Clean accompagne les syndics, gestionnaires et coproprietes d\'Aubagne dans l\'entretien de leurs parties communes. Du centre-ville aux quartiers residentiels de la Tourtelle, du Pin Vert ou de Camp Major, nous assurons un nettoyage regulier et rigoureux de vos halls, escaliers, ascenseurs et espaces exterieurs.',
    highlights: [
      'Contrats adaptes aux petites et grandes coproprietes (10 a 200+ lots)',
      'Sortie/rentree des containers et desinfection des locaux poubelles',
      'Nettoyage des parkings souterrains et zones de stationnement',
      'Produits eco-responsables pour le respect des residents',
      'Suivi qualite mensuel avec rapport au syndic',
      'Proximite : a 15 minutes de notre siege marseillais',
    ],
    secondaryImage: IMAGES.cageEscalier,
    secondaryImageAlt: 'Cage d\'escalier entretenue dans une copropriete a Aubagne',
    conversionTitle: 'Syndics d\'Aubagne : un partenaire proprete fiable',
    conversionSubtitle: 'Devis gratuit et audit de vos parties communes sous 48h',
    faqItems: [
      { question: 'Couvrez-vous tous les quartiers d\'Aubagne ?', answer: 'Oui : centre-ville, Tourtelle, Pin Vert, Camp Major, Les Passons, Pont de l\'Etoile et toutes les residences alentour.' },
      { question: 'Pouvez-vous reprendre un contrat en cours avec un autre prestataire ?', answer: 'Absolument. Nous realisons un audit gratuit et proposons une transition sans interruption de service. Le preavis de votre ancien prestataire est gere en parallele.' },
      { question: 'Quelle frequence recommandez-vous pour une copropriete de 50 lots ?', answer: 'Pour 50 lots, nous recommandons 2 a 3 passages hebdomadaires pour les parties communes, avec un nettoyage approfondi mensuel des parkings et locaux techniques.' },
      { question: 'Les residents peuvent-ils vous contacter directement ?', answer: 'Oui, nous fournissons un numero de contact dedie. Les residents ou le gardien peuvent signaler un besoin ponctuel avec une reactivite garantie sous 24h.' },
    ],
    relatedGeoPages: ['nettoyage-bureaux-aix-en-provence', 'nettoyage-fin-chantier-marseille'],
  },

  'nettoyage-industriel-marseille': {
    slug: 'nettoyage-industriel-marseille',
    city: 'Marseille',
    department: 'Bouches-du-Rhone',
    postalCode: '13000',
    service: 'Nettoyage industriel',
    serviceSlug: '/services/nettoyage-chantiers',
    heroImage: IMAGES.openSpaceIndustrielNuit,
    heroAlt: 'Nettoyage industriel a Marseille — entrepots, ateliers, sites de production',
    seo: {
      title: 'Nettoyage Industriel Marseille (13) | Nature Clean | Devis Gratuit',
      description: 'Nettoyage industriel a Marseille : entrepots logistiques, ateliers, sites de production, plateformes. Degraissage, decapage, sols beton. Intervention 7j/7. Devis gratuit 04 84 89 68 75',
      keywords: 'nettoyage industriel Marseille, nettoyage entrepot Marseille, nettoyage atelier Marseille, degraissage industriel 13, decapage sols beton Marseille, societe nettoyage industriel Bouches-du-Rhone',
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
    relatedGeoPages: ['nettoyage-bureaux-marseille', 'nettoyage-coproprietes-aubagne'],
  },
};

/** Liste ordonnee des slugs pour le maillage interne */
export const GEO_PAGE_SLUGS = Object.keys(GEO_PAGES);