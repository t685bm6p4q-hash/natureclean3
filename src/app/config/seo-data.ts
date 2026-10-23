export interface SEOEntry {
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
}

/** Registre central des meta title / description / keywords par section. */
export const SEO_DATA: Record<string, SEOEntry> = {
  home: {
    title: 'Entreprise de Nettoyage Marseille | Nature Clean – Devis 24h',
    description:
      'Entreprise de nettoyage à Marseille depuis 2021 : bureaux, copropriétés, fin de chantier. ✓ RC Pro ✓ Produits fournis ✓ Devis gratuit sous 24 h',
    keywords:
      'entretien Marseille, nettoyage Marseille, ménage Marseille, entreprise nettoyage 13, entretien bureaux Marseille, ménage copropriété, propreté professionnelle Bouches-du-Rhône, Nature Clean',
  },
  services: {
    title: 'Services de Nettoyage Professionnel à Marseille | Nature Clean',
    description:
      'Bureaux, copropriétés, fin de chantier, commerces, vitres, sols, graffitis et nettoyage Diogène à Marseille et dans le 13. RC Pro, devis gratuit sous 24 h.',
    keywords:
      'services entretien Marseille, ménage professionnel 13, nettoyage bureaux, propreté copropriété, remise en état chantier, hygiène locaux Marseille',
  },
  about: {
    title: 'Notre démarche éco-responsable | Nettoyage Marseille – Nature Clean',
    description:
      'Produits d\'entretien éco-labellisés, matériel professionnel et pratiques de nettoyage de Nature Clean à Marseille depuis 2021. Devis gratuit sous 24 h.',
    keywords:
      'nettoyage écologique Marseille, entreprise nettoyage éco-responsable 13, produits entretien éco-labellisés, Nature Clean Marseille',
  },
  quote: {
    title: 'Devis Gratuit Nettoyage Marseille | Nature Clean',
    description:
      'Demandez un devis de nettoyage à Marseille. Réponse sous 2 h, devis gratuit sous 24 h. Bureaux, copropriétés, fin de chantier.',
    keywords:
      'devis entretien Marseille, tarif ménage 13, prix nettoyage bureaux, estimation propreté copropriété, devis gratuit nettoyage professionnel',
  },
  merci: {
    title: 'Demande bien reçue | Nature Clean',
    description:
      'Votre demande de devis a été enregistrée. Nature Clean vous contacte sous 24 h à Marseille et dans les Bouches-du-Rhône.',
    keywords: 'confirmation devis nettoyage Marseille',
  },
  contact: {
    title: 'Contact Nature Clean Marseille | Nature Clean',
    description:
      'Contactez Nature Clean pour un nettoyage à Marseille. Réponse sous 2 h, devis sous 24 h. Lun–sam 8 h–18 h · 13001-13016, Aubagne, Aix.',
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
    title: 'Nettoyage de Bureaux à Marseille | Nature Clean',
    description:
      'Entretien de bureaux à Marseille depuis 2021 : horaires décalés 6h-22h, produits et matériel fournis, RC Pro. Réponse sous 2 h, devis gratuit sous 24 h.',
    keywords:
      'entretien bureaux Marseille, nettoyage bureaux 13, nettoyage open space, société nettoyage bureaux, entretien locaux professionnels Marseille, ménage bureau quotidien',
  },
  'nettoyage-commerces': {
    title: 'Nettoyage de Commerces à Marseille | Nature Clean',
    description:
      'Entretien de commerces à Marseille depuis 2021 : avant ouverture, vitrines, sols, sanitaires. RC Pro. Réponse sous 2 h, devis gratuit sous 24 h.',
    keywords:
      'nettoyage commerce Marseille, entretien boutique 13, nettoyage vitrine magasin, ménage magasin Marseille, propreté commerce Bouches-du-Rhône',
  },
  'remise-etat-urgence-commerce': {
    title: 'Remise en état Magasin Marseille | Nature Clean',
    description:
      'Remise en état d\'urgence après dégradation à Marseille : débarras, sols, désinfection. Cas octobre 2026. Réponse sous 2 h, devis sous 24 h.',
    keywords:
      'remise en état magasin Marseille, nettoyage après saccage, urgence commerce 13, réouverture boutique, dégradation magasin Marseille',
  },
  'nettoyage-coproprietes': {
    title: 'Nettoyage de Copropriétés à Marseille | Syndics – Nature Clean',
    description:
      'Entretien de parties communes à Marseille : halls, escaliers, ascenseurs, parkings, locaux poubelles. Contrat sur mesure, RC Pro, devis gratuit sous 24 h.',
    keywords:
      'nettoyage copropriété Marseille, entretien parties communes 13, ménage immeuble Marseille, nettoyage syndic, entretien hall escalier, nettoyage résidence Marseille',
  },
  'nettoyage-chantiers': {
    title: 'Nettoyage Fin de Chantier Marseille | Nature Clean',
    description:
      'Nettoyage de fin de chantier à Marseille pour promoteurs, artisans et particuliers : voile de ciment, plâtre, vitres. Matériel fourni, RC Pro, devis sous 24 h.',
    keywords:
      'nettoyage fin chantier Marseille, nettoyage après travaux 13, remise en état chantier, nettoyage livraison promoteur, nettoyage construction Marseille, débarras gravats',
  },
  'nettoyage-evenementiel': {
    title: 'Nettoyage Événementiel Marseille – Nature Clean',
    description:
      'Nettoyage événementiel à Marseille : avant, pendant et après séminaires, salons et concerts. Bouches-du-Rhône, RC Pro, devis gratuit sous 24 h.',
    keywords:
      'nettoyage événementiel Marseille, nettoyage après mariage, nettoyage salon professionnel, entretien séminaire, remise en état événement Bouches-du-Rhône',
  },
  'nettoyage-graffitis': {
    title: 'Nettoyage Graffitis Marseille | Nature Clean',
    description:
      'Effacement de tags et graffitis à Marseille. Intervention rapide. Devis sous 2 h. Murs, vitrines, rideaux métalliques.',
    keywords: 'enlèvement graffiti Marseille, effacer tag 13, aérogommage, nettoyage façade Bouches-du-Rhône',
  },
  'nettoyage-gros-chantiers': {
    title: 'Gros Chantiers Marseille | Nature Clean',
    description:
      'Nettoyage après travaux, fin de bail et grands projets résidentiels à Marseille. Devis sous 2 h. Délai 48 h max · 04 84 89 68 75',
    keywords:
      'nettoyage gros chantier Marseille, remise en état fin de bail, nettoyage après rénovation, grand ménage particulier, état des lieux sortie Marseille',
  },
  'remise-etat-sols': {
    title: 'Rénovation de Sols Marseille | Marbre – Nature Clean',
    description:
      'Polissage, cristallisation, décapage et lustrage de sols à Marseille : marbre, béton ciré, parquet. Réponse sous 2 h, devis sous 24 h, RC Pro.',
    keywords:
      'cristallisation marbre Marseille, polissage marbre 13, décapage sol commerce, béton ciré Marseille, remise en état sols Bouches-du-Rhône',
  },
  'nettoyage-vitre': {
    title: 'Nettoyage de Vitres Marseille | Façades – Nature Clean',
    description:
      'Nettoyage de vitres à Marseille : vitrines, bureaux, façades vitrées et hauteur accessible. RC Pro, matériel fourni, devis gratuit sous 24 h.',
    keywords:
      'nettoyage vitres Marseille, laveur vitres 13, nettoyage baie vitrée, nettoyage façade vitrée, lavage vitres hauteur, nettoyage véranda Marseille',
  },
  'nettoyage-diogene': {
    title: 'Nettoyage Syndrome de Diogène Marseille | Discret – Nature Clean',
    description:
      'Désencombrement, tri, nettoyage et désinfection d\'un logement en situation d\'accumulation à Marseille. Intervention discrète, devis gratuit et confidentiel.',
    keywords:
      'nettoyage Diogène Marseille, désencombrement logement 13, syndrome Diogène, nettoyage insalubre Marseille, remise en état logement',
  },
  'zones-intervention': {
    title: 'Zones d\'Intervention Nettoyage | Marseille et Bouches-du-Rhône',
    description:
      'Nature Clean intervient à Marseille (13001-13016), Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Salon-de-Provence, Istres et Martigues. Devis sous 24 h.',
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
      'Cette page n\'existe pas ou a été déplacée. Retrouvez nos services de nettoyage à Marseille, demandez un devis gratuit ou contactez Nature Clean au 04 84 89 68 75.',
    keywords: '',
  },
};
