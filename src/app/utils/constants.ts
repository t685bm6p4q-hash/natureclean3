/**
 * CONSTANTES METIER — Nature Clean Marseille
 * ============================================
 * Source unique de verite (Loi VII : Zero Magic Numbers).
 * Toute valeur business apparaissant dans 2+ fichiers DOIT vivre ici.
 *
 * Impact Lighthouse : 0 (tree-shaked, string inlinee par Vite).
 */

// ─── Coordonnees ────────────────────────────────────────
/** Telephone d'affichage (format humain) */
export const PHONE_DISPLAY = '04 84 89 68 75';

/** Telephone href (sans espaces) */
export const PHONE_HREF = 'tel:0484896875';

/** Schema.org / JSON-LD (E.164 France) */
export const PHONE_E164 = '+33484896875';

/** Telephone WhatsApp (format international) */
const PHONE_WHATSAPP = '33783952804';

/** Email de contact */
export const EMAIL = 'contact@natureclean.fr';

/** Email href */
export const EMAIL_HREF = `mailto:${EMAIL}`;

// ─── URLs ───────────────────────────────────────────────
/** Domaine canonique (sans trailing slash) */
export const BASE_URL = 'https://natureclean.fr';

/** Logo pour JSON-LD et Open Graph */
export const LOGO_URL = `${BASE_URL}/logo.svg`;

/** Logo PNG pour les articles blog JSON-LD */
export const LOGO_PNG_URL = `${BASE_URL}/logo.png`;

// ─── Identite entreprise ─────────────────────────────────
export const COMPANY_NAME = 'Nature Clean';
export const COMPANY_FULL_NAME = 'Nature Clean Marseille';
/** Réservé usage interne — ne pas afficher sur le site tant que le Kbis n’est pas vérifié. */
export const FOUNDING_YEAR = '2021';
export const SIRET = '89020726900022';

// ─── Horaires & SLA (questionnaire nov. 2026) ─────────────
/** Accueil téléphonique */
export const PHONE_RECEPTION_HOURS = 'Lun–ven, 9 h–18 h';
export const PHONE_RECEPTION_HOURS_LONG =
  'du lundi au vendredi, de 9 h à 18 h';

/** Prise en charge d’une demande (appel, formulaire, e-mail) */
export const LEAD_RESPONSE_SLA = `Prise en charge sous 4 h ouvrées (${PHONE_RECEPTION_HOURS})`;
export const LEAD_RESPONSE_SLA_SHORT = 'Prise en charge sous 4 h ouvrées';

/** Créneaux d’intervention sur site (contrat) */
export const INTERVENTION_SCHEDULE_NOTE =
  'Interventions principalement du lundi au samedi ; nuit, dimanche et jours fériés sur organisation spécifique.';

export const INTERVENTION_ON_SITE_WINDOW =
  'Créneaux d’intervention sur site (souvent 6 h–22 h) définis au contrat';

export const QUOTE_PROCESS_LINE =
  'Devis détaillé à partir des informations, photos, plans et surfaces transmis';

export const MOBILIZATION_AFTER_QUOTE =
  'Mobilisation en général sous 48 h après validation du devis';

/** Copie éco / responsabilité (remplace les pourcentages éco-labellisés) */
export const RESPONSIBLE_PRACTICES_SHORT =
  'Microfibres réutilisables, dosage adapté des produits, tri des déchets, eau limitée lorsque c’est possible';

export const RESPONSIBLE_PRACTICES_LINE = `Pratiques responsables : ${RESPONSIBLE_PRACTICES_SHORT}.`;

export const GOOGLE_RATING_DISPLAY = '4,8/5';

/** Pas de compteur d’avis figé sur le site — la fiche Google fait foi. */
export const GOOGLE_RATING_SITE_NOTE =
  'Note affichée : alignée sur la fiche Google Business Profile. Le nombre d’avis n’est pas publié en dur sur natureclean.fr.';

/** RC Pro — ligne courte (tuiles, cartes). */
export const RC_PRO_SHORT_LINE =
  'Personnel déclaré, couvert par notre assurance responsabilité civile professionnelle (RC Pro) — attestation sur demande.';

/** RC Pro — périmètre d’activités (questionnaire nov. 2026). */
export const RC_PRO_FAQ_ANSWER =
  'Oui : assurance responsabilité civile professionnelle (RC Pro), attestation sur demande. Elle couvre nos prestations d’entretien de locaux, vitres et façades vitrées, enlèvement de graffitis, fin de chantier, remise en état des sols, interventions après sinistre léger et nettoyage syndrome de Diogène — dans le cadre du contrat, hors déchets dangereux, travaux de rénovation et dommages immatériels non prévus.';

export const WASTE_BORDEREAU_LINE =
  'Traçabilité des déchets évacués : bordereau de suivi (BSD ou document équivalent) remis au donneur d’ordre lorsque la filière ou la réglementation l’impose.';

export const DIOGENE_VOIAGE_LINE =
  'Stationnement, rotations ou benne : organisation avant chantier. Demande d’autorisation de voirie auprès de la mairie si le stationnement sur voie publique l’exige — délais à anticiper.';

export const DIOGENE_DISCRETION_LINE =
  'Tenue sobre, véhicule banalisé sur demande, horaires calés avec vous pour limiter l’exposition aux voisins.';

// ─── Geographie ─────────────────────────────────────────
export const ZONE_LABEL = 'Marseille et Bouches-du-Rhône';

/** Adresse unique — site, JSON-LD, GBP, mentions légales */
export const OFFICE_ADDRESS_LINE = '22 Traverse Pupat, 13008 Marseille';

// ─── Avis Google (chiffres de la fiche, pas de JSON-LD) ──
export const GOOGLE_PROFILE_URL = 'https://share.google/LGuTIovk5ovTXGzuc';

// ─── WhatsApp ───────────────────────────────────────────
const WHATSAPP_DEFAULT_MESSAGE =
  'Bonjour, je souhaite obtenir un devis pour vos services de nettoyage a Marseille.';
export const WHATSAPP_URL = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

// ─── Aria labels reutilisables ──────────────────────────
export const ARIA_PHONE = `Appeler Nature Clean au ${PHONE_DISPLAY}`;
export const ARIA_EMAIL = `Envoyer un email a ${EMAIL}`;
export const ARIA_WHATSAPP = 'Contactez-nous sur WhatsApp';