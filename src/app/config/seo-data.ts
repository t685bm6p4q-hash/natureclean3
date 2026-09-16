export interface SEOEntry {
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
}

/** Registre central des meta title / description / keywords par section. */
export const SEO_DATA: Record<string, SEOEntry> = {
  home: {
    title: 'Nettoyage Professionnel Marseille | Nature Clean',
    description:
      'Nettoyage professionnel à Marseille et PACA. Devis gratuit sous 2 h, 7j/7. Bureaux, copropriétés, fin de chantier. Note 4,7/5 · Éco-responsable · 04 84 89 68 75',
    keywords:
      'entretien Marseille, nettoyage Marseille, ménage Marseille, entreprise nettoyage 13, entretien bureaux Marseille, ménage copropriété, propreté professionnelle Bouches-du-Rhône, Nature Clean',
  },
  services: {
    title: 'Services de Nettoyage Marseille | Nature Clean',
    description:
      'Tous nos services d\'entretien à Marseille : bureaux, copropriétés, fin de chantier, particuliers. Devis gratuit sous 2 h, 7j/7. Note 4,7/5 · Éco-responsable · 04 84 89 68 75',
    keywords:
      'services entretien Marseille, ménage professionnel 13, nettoyage bureaux, propreté copropriété, remise en état chantier, hygiène locaux Marseille',
  },
  about: {
    title: 'À Propos Nature Clean Marseille | Nature Clean',
    description:
      'Nature Clean, expert nettoyage éco-responsable à Marseille depuis 2021. Note 4,7/5 · 50 % produits bio · Personnel déclaré · SIRET 89020726900022.',
    keywords:
      'Nature Clean Marseille, entreprise entretien écologique 13, ménage éco-responsable, société propreté Bouches-du-Rhône, nettoyage professionnel Marseille',
  },
  quote: {
    title: 'Devis Gratuit Nettoyage Marseille | Nature Clean',
    description:
      'Devis gratuit sous 2 h pour votre nettoyage à Marseille. Sans engagement. Note 4,7/5 (12 avis Google) · 500+ clients · Arrondissements 13001-13016.',
    keywords:
      'devis entretien Marseille, tarif ménage 13, prix nettoyage bureaux, estimation propreté copropriété, devis gratuit nettoyage professionnel',
  },
  contact: {
    title: 'Contact Nature Clean Marseille | Nature Clean',
    description:
      'Contactez Nature Clean pour vos besoins de nettoyage à Marseille. Réponse sous 2 h, 7j/7. Note 4,7/5 · 13001-13016, Aubagne, Aix-en-Provence.',
    keywords:
      'contact entretien Marseille, téléphone entreprise ménage 13, contacter Nature Clean, société propreté Bouches-du-Rhône, nettoyage Marseille contact',
  },
  realisations: {
    title: 'Réalisations Nettoyage Marseille | Nature Clean',
    description:
      'Réalisations de nettoyage professionnel à Marseille : bureaux, copropriétés, chantiers, commerces. Note 4,7/5 · Depuis 2021.',
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
  'nettoyage-particuliers': {
    title: 'Ménage Particuliers Marseille | Nature Clean',
    description:
      'Ménage à domicile, grand nettoyage, Airbnb à Marseille. Devis sous 2 h. Note 4,7/5 · Produits éco-responsables · 7j/7 · 04 84 89 68 75',
    keywords:
      'ménage domicile Marseille, nettoyage particulier 13, femme ménage Marseille, nettoyage déménagement, ménage Airbnb Marseille, entretien maison Marseille, produits écologiques',
  },
  'entretien-bureaux': {
    title: 'Entretien Bureaux Marseille | Nature Clean',
    description:
      'Nettoyage de bureaux à Marseille : open spaces, sanitaires, vitres. Intervention 6h-22h, 7j/7. Devis sous 2 h. Note 4,7/5 · RC Pro · Éco-responsable.',
    keywords:
      'entretien bureaux Marseille, nettoyage bureaux 13, nettoyage open space, société nettoyage bureaux, entretien locaux professionnels Marseille, ménage bureau quotidien',
  },
  'nettoyage-commerces': {
    title: 'Nettoyage Commerces Marseille | Nature Clean',
    description:
      'Nettoyage de commerces et boutiques à Marseille : avant ouverture dès 6 h. Devis sous 2 h. Note 4,7/5 · Image de marque soignée · 7j/7.',
    keywords:
      'nettoyage commerce Marseille, entretien boutique 13, nettoyage vitrine magasin, nettoyage restaurant Marseille, propreté commerce, nettoyage surface de vente',
  },
  'nettoyage-coproprietes': {
    title: 'Nettoyage Copropriétés Marseille | Nature Clean',
    description:
      'Entretien parties communes à Marseille : halls, escaliers, parkings. Contrats syndic sur mesure. Devis sous 2 h. Note 4,7/5 · Éco-responsable.',
    keywords:
      'nettoyage copropriété Marseille, entretien parties communes 13, ménage immeuble Marseille, nettoyage syndic, entretien hall escalier, nettoyage résidence Marseille',
  },
  'nettoyage-chantiers': {
    title: 'Nettoyage Chantiers Marseille | Nature Clean',
    description:
      'Nettoyage après travaux à Marseille. Gravats, lessivage, vitres. Devis sous 2 h, intervention rapide. Note 4,7/5 · Bouches-du-Rhône · 04 84 89 68 75',
    keywords:
      'nettoyage fin chantier Marseille, nettoyage après travaux 13, remise en état chantier, nettoyage livraison promoteur, nettoyage construction Marseille, débarras gravats',
  },
  'nettoyage-evenementiel': {
    title: 'Nettoyage Événementiel Marseille | Nature Clean',
    description:
      'Nettoyage avant, pendant et après événements à Marseille. Mariages, séminaires, salons pro. Devis sous 2 h. Note 4,7/5 · Intervention 7j/7 · PACA.',
    keywords:
      'nettoyage événementiel Marseille, nettoyage après mariage, nettoyage salon professionnel, entretien séminaire, remise en état événement PACA',
  },
  'nettoyage-graffitis': {
    title: 'Nettoyage Graffitis Marseille | Nature Clean',
    description:
      'Effacement de tags et graffitis à Marseille. Intervention rapide. Devis sous 2 h. Note 4,7/5 · Murs, vitrines, rideaux métalliques.',
    keywords: 'enlèvement graffiti Marseille, effacer tag 13, aérogommage, nettoyage façade Bouches-du-Rhône',
  },
  'nettoyage-gros-chantiers': {
    title: 'Gros Chantiers Marseille | Nature Clean',
    description:
      'Nettoyage après travaux, fin de bail et grands projets résidentiels à Marseille. Devis sous 2 h. Note 4,7/5 · Délai 48 h max · 04 84 89 68 75',
    keywords:
      'nettoyage gros chantier Marseille, remise en état fin de bail, nettoyage après rénovation, grand ménage particulier, état des lieux sortie Marseille',
  },
  'remise-etat-sols': {
    title: 'Remise en état sols Marseille | Nature Clean',
    description:
      'Ponçage, cristallisation et lustrage de sols à Marseille. Marbre, granit, parquet, béton ciré. Devis sous 2 h. Note 4,7/5 · Éco-responsable.',
    keywords:
      'remise état sols Marseille, ponçage marbre 13, cristallisation sol, lustrage parquet Marseille, nettoyage béton ciré, polissage granit Bouches-du-Rhône',
  },
  'nettoyage-vitre': {
    title: 'Nettoyage Vitres Marseille | Nature Clean',
    description:
      'Lavage de vitres à Marseille : intérieur, extérieur, baies vitrées, façades en hauteur. Devis sous 2 h. Note 4,7/5 · Nacelle et perche · 04 84 89 68 75',
    keywords:
      'nettoyage vitres Marseille, laveur vitres 13, nettoyage baie vitrée, nettoyage façade vitrée, lavage vitres hauteur, nettoyage véranda Marseille',
  },
  'nettoyage-diogene': {
    title: 'Nettoyage Diogène Marseille | Nature Clean',
    description:
      'Nettoyage syndrome de Diogène à Marseille : désencombrement, désinfection, accompagnement humain. Intervention discrète. Devis sous 2 h · 04 84 89 68 75',
    keywords:
      'nettoyage Diogène Marseille, désencombrement logement 13, syndrome Diogène, nettoyage insalubre Marseille, remise en état logement',
  },
  'zones-intervention': {
    title: 'Zones d\'Intervention Marseille | Nature Clean',
    description:
      'Nature Clean intervient à Marseille (13001-13016), Aix-en-Provence, Aubagne et La Ciotat. Devis gratuit sous 2 h.',
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
