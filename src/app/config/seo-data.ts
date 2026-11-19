import { PHONE_DISPLAY } from '@/app/utils/constants';

interface SEOEntry {
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
}

/** Registre central des meta title / description / keywords par section. */
export const SEO_DATA: Record<string, SEOEntry> = {
  home: {
    title: 'Entreprise de Nettoyage Marseille | Bureaux, Copro, Chantiers – Nature Clean',
    description:
      'Nature Clean : entreprise de nettoyage à Marseille et Bouches-du-Rhône. Bureaux, copropriétés, fin de chantier, vitres, Diogène. RC Pro. Prise en charge 4 h ouvrées, devis après étude.',
    keywords:
      'entreprise nettoyage Marseille, nettoyage professionnel 13008, ménage bureaux Marseille, nettoyage copropriété 13, fin de chantier Marseille, société entretien Bouches-du-Rhône, Nature Clean',
  },
  services: {
    title: 'Services Nettoyage Professionnel Marseille | Catalogue Nature Clean',
    description:
      'Tous nos services : bureaux, copro, fin de chantier, commerces, vitres, médical, sols, graffitis, Diogène. Marseille et 13. Devis détaillé après étude.',
    keywords:
      'services nettoyage Marseille, catalogue entretien professionnel 13, nettoyage bureaux copropriété chantier, entreprise ménage Marseille 13001 13016, prestations nettoyage Bouches-du-Rhône',
  },
  about: {
    title: 'Pratiques responsables | Nettoyage Marseille – Nature Clean',
    description:
      'Microfibres, dosage, tri : pratiques responsables de Nature Clean à Marseille (22 Traverse Pupat). Pas de pourcentage éco affiché. Devis détaillé après étude.',
    keywords:
      'nettoyage écologique Marseille, entreprise nettoyage éco-responsable 13, produits entretien professionnels adaptés, Nature Clean Marseille',
  },
  quote: {
    title: 'Devis Gratuit Nettoyage Marseille | Nature Clean',
    description:
      'Demandez un devis gratuit de nettoyage à Marseille. Prise en charge sous 4 h ouvrées, devis détaillé après étude. Bureaux, copropriétés, fin de chantier.',
    keywords:
      'devis entretien Marseille, tarif ménage 13, prix nettoyage bureaux, estimation propreté copropriété, devis gratuit nettoyage professionnel',
  },
  merci: {
    title: 'Demande bien reçue | Nature Clean',
    description:
      'Votre demande de devis a été enregistrée. Nature Clean vous recontacte sous 4 h ouvrées (lun–ven) à Marseille et dans les Bouches-du-Rhône.',
    keywords: 'confirmation devis nettoyage Marseille',
  },
  contact: {
    title: 'Contact Nature Clean Marseille | Nature Clean',
    description:
      'Contactez Nature Clean pour un nettoyage à Marseille. Prise en charge sous 4 h ouvrées, devis détaillé après étude. Lun–ven, 9 h–18 h · 13001-13016, Aubagne, Aix.',
    keywords:
      'contact entretien Marseille, téléphone entreprise ménage 13, contacter Nature Clean, société propreté Bouches-du-Rhône, nettoyage Marseille contact',
  },
  realisations: {
    title: 'Réalisations de Nettoyage à Marseille | Avant / Après – Nature Clean',
    description:
      'Nos interventions récentes à Marseille et dans les Bouches-du-Rhône : fin de chantier, commerces, bureaux, locaux de santé. Photos avant/après et cas clients.',
    keywords:
      'réalisations entretien Marseille, portfolio ménage professionnel, références Nature Clean, projets nettoyage 13',
  },
  actualites: {
    title: 'Blog Nettoyage Écologique Marseille | Conseils Nature Clean',
    description:
      'Conseils et actualités du nettoyage écologique à Marseille. Méthodes éco-responsables, produits Ecolabel, guides pratiques pour entreprises.',
    keywords:
      'blog nettoyage écologique, conseils nettoyage Marseille, astuces propreté, actualités Nature Clean',
  },
  'entretien-bureaux': {
    title: 'Nettoyage de Bureaux à Marseille | Contrat & horaires décalés',
    description:
      'Entretien de bureaux à Marseille et Bouches-du-Rhône : open space, sanitaires, vitrages. Passage avant 8 h ou après 19 h, fiche de passage, RC Pro. Prise en charge 4 h ouvrées.',
    keywords:
      'entretien bureaux Marseille, nettoyage bureaux 13008, nettoyage open space Marseille, société nettoyage bureaux 13, entretien locaux professionnels, ménage bureau Prado Joliette, nettoyage tertiaire Bouches-du-Rhône',
  },
  'nettoyage-cabinet-medical-marseille': {
    title: 'Nettoyage Cabinet Médical Marseille | Locaux & surfaces',
    description:
      'Entretien cabinets médicaux et paramédicaux à Marseille : consultation, accueil, sanitaires. Hors bloc opératoire et DASRI. Créneaux hors consultation — devis après étude.',
    keywords:
      'nettoyage cabinet médical Marseille, entretien cabinet dentaire 13, ménage cabinet kiné, nettoyage pharmacie Marseille, entretien locaux santé Bouches-du-Rhône, désinfection surfaces cabinet',
  },
  'nettoyage-commerces': {
    title: 'Nettoyage de Commerces à Marseille | Avant ouverture & vitrines',
    description:
      'Entretien de commerces et boutiques à Marseille : sols, vitrines, sanitaires. Créneaux 6 h–22 h, fiche de passage sur demande. RC Pro — prise en charge 4 h ouvrées.',
    keywords:
      'nettoyage commerce Marseille, entretien boutique 13, nettoyage magasin avant ouverture, lavage vitrine centre-ville, ménage retail Bouches-du-Rhône, nettoyage surface de vente',
  },
  'remise-etat-urgence-commerce': {
    title: 'Remise en état Magasin Marseille | Nature Clean',
    description:
      'Remise en état d\'urgence après dégradation à Marseille : débarras, sols, désinfection. Cas octobre 2026. Prise en charge sous 4 h ouvrées, devis détaillé après étude.',
    keywords:
      'remise en état magasin Marseille, nettoyage après saccage, urgence commerce 13, réouverture boutique, dégradation magasin Marseille',
  },
  'nettoyage-coproprietes': {
    title: 'Nettoyage de Copropriétés à Marseille | Syndics & parties communes',
    description:
      'Nettoyage de copropriété à Marseille : halls, escaliers, ascenseurs, parkings, locaux poubelles. Contrat syndic, registre de passage, RC Pro. Prise en charge 4 h ouvrées.',
    keywords:
      'nettoyage copropriété Marseille, entretien parties communes 13, ménage immeuble Marseille, nettoyage syndic Bouches-du-Rhône, entretien hall escalier, nettoyage parking copropriété, société nettoyage immeuble 13001 13016',
  },
  'nettoyage-chantiers': {
    title: 'Nettoyage Fin de Chantier Marseille | Livraison promoteur & artisan',
    description:
      'Fin de chantier à Marseille : déblaiement, dépoussiérage, sols et vitres avant réception. Contrôle sur site et photos. Promoteurs, artisans, particuliers — devis après étude.',
    keywords:
      'nettoyage fin chantier Marseille, nettoyage après travaux 13, réception chantier livraison, nettoyage voile de ciment, lessivage fin de travaux Bouches-du-Rhône, entreprise nettoyage chantier',
  },
  'nettoyage-evenementiel': {
    title: 'Nettoyage Événementiel Marseille – Nature Clean',
    description:
      'Nettoyage événementiel à Marseille : avant, pendant et après séminaires, salons et concerts. Bouches-du-Rhône, RC Pro, devis détaillé après étude.',
    keywords:
      'nettoyage événementiel Marseille, nettoyage après mariage, nettoyage salon professionnel, entretien séminaire, remise en état événement Bouches-du-Rhône',
  },
  'nettoyage-graffitis': {
    title: 'Nettoyage de Graffitis Marseille | Effacement de Tags – Nature Clean',
    description:
      'Effacement de graffitis et de tags à Marseille et dans les Bouches-du-Rhône : façades, vitrines, rideaux. Produits adaptés au support, étude préalable.',
    keywords:
      'enlèvement graffiti Marseille, effacer tag 13, nettoyage façade Bouches-du-Rhône, graffitis vitrine commerce',
  },
  'nettoyage-gros-chantiers': {
    title: 'Gros Chantiers & Remise en État Marseille | Après rénovation lourde',
    description:
      'Remise en état résidentielle lourde à Marseille : après rénovation, sortie de bail, grand ménage. Volumes importants, équipes dimensionnées au projet. Devis détaillé après étude.',
    keywords:
      'remise en état appartement Marseille, nettoyage gros chantier 13, grand ménage après travaux, fin de bail nettoyage, nettoyage rénovation logement Bouches-du-Rhône',
  },
  'remise-etat-sols': {
    title: 'Remise en État de Sols Marseille | Décapage, Marbre – Nature Clean',
    description:
      'Décapage et remise en état de sols à Marseille : carrelage, parquet, béton ciré, marbre, tommettes. Traitement à la monobrosse, étude et devis sur demande.',
    keywords:
      'décapage sol Marseille, remise en état sol marbre, monobrosse sol 13, béton ciré Marseille, tommettes Bouches-du-Rhône',
  },
  'nettoyage-vitre': {
    title: 'Nettoyage de Vitres Marseille | Vitrines, bureaux & perches',
    description:
      'Lavage de vitres à Marseille : vitrines commerces, bureaux, parties communes. Eau déminéralisée, perches — partenaire cordes si besoin. Devis détaillé après étude.',
    keywords:
      'nettoyage vitres Marseille, lavage vitrine commerce, laveur vitres 13, nettoyage baie vitrée bureau, vitres copropriété Marseille, nettoyage vitres calcaire Bouches-du-Rhône',
  },
  'nettoyage-diogene': {
    title: 'Nettoyage Syndrome de Diogène Marseille | Discret – Nature Clean',
    description:
      'Tri, débarras et nettoyage d\'un logement en situation d\'accumulation à Marseille et dans les Bouches-du-Rhône. Intervention discrète, étude et devis sur demande.',
    keywords:
      'nettoyage Diogène Marseille, désencombrement logement 13, syndrome Diogène, nettoyage insalubre Marseille, remise en état logement',
  },
  'zones-intervention': {
    title: 'Zones d\'Intervention Nettoyage | Marseille et Bouches-du-Rhône',
    description:
      'Nature Clean intervient à Marseille (13001-13016), Aix-en-Provence, Aubagne, La Ciotat et dans les Bouches-du-Rhône. Prise en charge sous 4 h ouvrées, devis détaillé après étude.',
    keywords:
      'zones intervention Marseille, arrondissements Marseille, Aubagne, Aix-en-Provence, La Ciotat, devis gratuit nettoyage',
  },
  privacy: {
    title: 'Politique de confidentialité | Nature Clean Marseille',
    description:
      'Politique de confidentialité RGPD de Nature Clean Marseille : données collectées, cookies, droits d\'accès et de suppression.',
    keywords: 'politique confidentialité Nature Clean, RGPD nettoyage Marseille',
  },
  legal: {
    title: 'Mentions légales | Nature Clean Marseille',
    description:
      'Mentions légales de Nature Clean Marseille : éditeur du site, SIRET, hébergeur, contact. 22 Traverse Pupat, 13008 Marseille.',
    keywords: 'mentions légales Nature Clean, SIRET 89020726900022, entreprise nettoyage Marseille',
  },
  notfound: {
    title: 'Page introuvable | Nature Clean Marseille',
    description:
      `Cette page n'existe pas ou a été déplacée. Retrouvez nos services de nettoyage à Marseille, demandez un devis gratuit ou contactez Nature Clean au ${PHONE_DISPLAY}.`,
    keywords: '',
  },
};
