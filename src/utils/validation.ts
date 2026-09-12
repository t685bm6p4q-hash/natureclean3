/**
 * COUCHE 3 — VALIDATION PARANOIAQUE (Zod v4)
 *
 * Chaque caractere saisi est passe au scanner avant traitement.
 * Double validation : cote client (QuoteForm) + cote serveur (API).
 *
 * Protections :
 * - XSS : strip toutes les balises HTML
 * - SQL Injection : strip les patterns dangereux
 * - Longueur max : chaque champ est borne
 * - Format strict : email, telephone, code postal valides par regex
 */

import { z } from 'zod';

// ===============================================
// SANITIZERS (nettoyage avant validation)
// ===============================================

/** Supprime toutes les balises HTML et les entites dangereuses */
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')        // balises HTML
    .replace(/&[#\w]+;/g, '')       // entites HTML
    .replace(/javascript:/gi, '')    // liens JS
    .replace(/on\w+\s*=/gi, '')     // event handlers inline
    .trim();
}

/** Supprime les patterns d'injection SQL classiques */
function stripSqlInjection(input: string): string {
  return input
    .replace(/(['";\\])/g, '')           // quotes et backslash
    .replace(/(--|\/\*|\*\/)/g, '')  // commentaires SQL
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|EXEC|EXECUTE)\b/gi, '')
    .trim();
}

/** Pipeline de sanitization complete */
export function sanitize(input: string): string {
  return stripSqlInjection(stripHtml(input));
}

// ===============================================
// SCHEMA ZOD - Formulaire de devis
// (Zod v4 compatible — no .pipe(), no .email() method)
// ===============================================

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^[0-9\s.+()-]{10,20}$/;
const POSTAL_REGEX = /^[0-9]{5}$/;

export const quoteFormSchema = z.object({
  nom: z.string()
    .min(1, { message: 'Le nom est obligatoire' })
    .max(100, { message: 'Maximum 100 caracteres' })
    .transform(sanitize),

  prenom: z.string()
    .min(1, { message: 'Le prenom est obligatoire' })
    .max(100, { message: 'Maximum 100 caracteres' })
    .transform(sanitize),

  email: z.string()
    .min(1, { message: "L'email est obligatoire" })
    .max(254, { message: 'Email trop long' })
    .regex(EMAIL_REGEX, { message: 'Adresse email invalide' })
    .transform((v: string) => v.toLowerCase().trim()),

  telephone: z.string()
    .min(1, { message: 'Le telephone est obligatoire' })
    .max(20, { message: 'Numero trop long' })
    .regex(PHONE_REGEX, { message: 'Numero de telephone invalide' })
    .transform((v: string) => v.replace(/[^\d+]/g, '')),

  codePostal: z.string()
    .regex(POSTAL_REGEX, { message: 'Code postal invalide (5 chiffres)' }),

  message: z.string()
    .max(2000, { message: 'Maximum 2000 caracteres' })
    .default('')
    .transform(sanitize),

  rgpd: z.boolean()
    .refine((v) => v === true, { message: 'Vous devez accepter la politique de confidentialité' }),
});

/** Type infere depuis le schema Zod */
export type ValidatedQuoteData = z.infer<typeof quoteFormSchema>;

// ===============================================
// HELPER pour integration react-hook-form
// ===============================================

/** Valide et sanitize les donnees du formulaire. Retourne les erreurs par champ. */
export function validateQuoteForm(data: Record<string, unknown>): {
  success: boolean;
  data?: ValidatedQuoteData;
  errors?: Record<string, string>;
} {
  const result = quoteFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}