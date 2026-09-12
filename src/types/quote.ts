/**
 * Types pour le formulaire de devis Nature Clean
 * Utilise dans QuoteForm et l'API send-quote
 */

/** Types de services proposés */
export type ServiceType = 'bureaux' | 'coproprietes' | 'fin-chantier' | 'particuliers';

/** Plages de surface */
export type SurfaceRange = 'moins-50' | '50-100' | '100-300' | 'plus-300';

/** Fréquences d'intervention */
export type FrequenceType = 'ponctuel' | 'hebdomadaire' | 'quotidien';

/** Données du formulaire de devis (champs react-hook-form) */
export interface QuoteFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  codePostal: string;
  typeNettoyage: string;
  surface: string;
  frequence: string;
  message: string;
  rgpd: boolean;
}

/** Payload complet envoyé à l'API */
export interface QuoteSubmissionPayload extends QuoteFormData {
  timestamp: string;
  source: string;
  /** Page d'origine du prospect (ex: /services/nettoyage-chantiers) */
  sourcePage: string;
  /** Referrer externe si disponible */
  referrer: string;
  /** Parcours complet du prospect formaté (ex: "Accueil → Bureaux → Devis (3 pages, 2min)") */
  journey: string;
}