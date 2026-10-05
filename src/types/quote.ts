/**
 * Types — formulaire Lead Express (/devis) et payload API
 */

export interface LeadExpressPayload {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  codePostal: string;
  adresse: string;
  typeNettoyage: string;
  typeSurfaceGraffiti: string;
  surface: string;
  frequence: string;
  message: string;
  source: string;
  sourcePage: string;
  referrer: string;
  journey: string;
  timestamp: string;
}
