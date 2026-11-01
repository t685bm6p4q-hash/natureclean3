/**
 * Zones d'intervention — liste définitive (GBP, JSON-LD, accueil, hub zones).
 * Bouches-du-Rhône (13) uniquement — 9 villes, 14 quartiers Marseille.
 */

export const SERVED_CITIES_SHORT = [
  'Marseille',
  'Aix-en-Provence',
  'Aubagne',
  'La Ciotat',
  'Marignane',
  'Vitrolles',
  'Salon-de-Provence',
  'Istres',
  'Martigues',
] as const;

export const SERVED_CITIES_LABELS = [
  'Marseille (13001 à 13016)',
  'Aix-en-Provence',
  'Aubagne',
  'La Ciotat',
  'Marignane',
  'Vitrolles',
  'Salon-de-Provence',
  'Istres',
  'Martigues',
] as const;

export const MARSEILLE_QUARTIERS = [
  'Vieux-Port',
  'La Joliette',
  'Castellane',
  'Endoume',
  'Le Prado',
  'La Timone',
  'Saint-Loup',
  'La Valentine',
  'Les Cinq Avenues',
  'Le Panier',
  'Saint-Charles',
  'La Blancarde',
  'Bonneveine',
  'Mazargues',
] as const;

/** Regroupement indicatif — délais depuis Marseille 8e (22 Traverse Pupat), hors heure de pointe. */
export const CITY_SECTORS = [
  {
    sector: 'Est des Bouches-du-Rhône',
    cities: 'Aubagne, La Ciotat',
    travel: '15–20 min vers Aubagne (A50) ; 25–35 min vers La Ciotat',
  },
  {
    sector: 'Pays d\'Aix',
    cities: 'Aix-en-Provence',
    travel: '25–40 min selon le quartier ; +10–15 min sur l\'A51 entre 7 h 30 et 9 h',
  },
  {
    sector: 'Étang de Berre',
    cities: 'Marignane, Vitrolles',
    travel: '20–35 min selon l\'accès et le trafic',
  },
  {
    sector: 'Ouest et Pays salonais',
    cities: 'Istres, Martigues, Salon-de-Provence',
    travel: '35–50 min selon la ville ; précisé au devis',
  },
] as const;

/** Pages locales avec contenu propre à la ville (pas de doublon industriel / médical / fin de chantier). */
export const LOCAL_GEO_PAGE_SLUGS = [
  'nettoyage-bureaux-marseille',
  'nettoyage-bureaux-aix-en-provence',
  'nettoyage-coproprietes-aubagne',
  'nettoyage-coproprietes-la-ciotat',
] as const;

export const ZONE_CASE_EXAMPLES = [
  {
    zone: 'Marseille',
    label: 'Cabinet médical (13005)',
    href: '/realisations/cas/cabinet-medical-marseille',
  },
  {
    zone: 'Marseille',
    label: 'Magasin centre-ville',
    href: '/realisations/cas/magasin-centre-ville',
  },
  {
    zone: 'Aubagne',
    label: 'Appartement après travaux',
    href: '/realisations',
  },
  {
    zone: 'La Ciotat',
    label: 'Copropriété — fiche locale',
    href: '/nettoyage-coproprietes-la-ciotat',
  },
] as const;
