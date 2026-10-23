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

/** Regroupement indicatif — délais [à confirmer] côté rédaction. */
export const CITY_SECTORS = [
  { sector: 'Est des Bouches-du-Rhône', cities: 'Aubagne, La Ciotat' },
  { sector: 'Pays d\'Aix', cities: 'Aix-en-Provence' },
  { sector: 'Étang de Berre', cities: 'Marignane, Vitrolles' },
  { sector: 'Ouest et Pays salonais', cities: 'Istres, Martigues, Salon-de-Provence' },
] as const;

export const LOCAL_GEO_PAGE_SLUGS = [
  'nettoyage-bureaux-aix-en-provence',
  'nettoyage-coproprietes-aubagne',
  'nettoyage-coproprietes-la-ciotat',
] as const;
