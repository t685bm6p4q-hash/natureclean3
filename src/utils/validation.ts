/**
 * Validation Zod — formulaire Lead Express (/devis)
 */

import { z } from 'zod';

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&[#\w]+;/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

function stripSqlInjection(input: string): string {
  return input
    .replace(/(['";\\])/g, '')
    .replace(/(--|\/\*|\*\/)/g, '')
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|EXEC|EXECUTE)\b/gi, '')
    .trim();
}

export function sanitize(input: string): string {
  return stripSqlInjection(stripHtml(input));
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const POSTAL_REGEX = /^[0-9]{5}$/;

export const SURFACE_RANGE_OPTIONS = [
  { id: 'moins-50', label: 'Moins de 50 m²' },
  { id: '50-150', label: '50 – 150 m²' },
  { id: '150-300', label: '150 – 300 m²' },
  { id: 'plus-300', label: 'Plus de 300 m²' },
  { id: 'inconnu', label: 'Je ne sais pas' },
] as const;

export type SurfaceRangeId = (typeof SURFACE_RANGE_OPTIONS)[number]['id'];

export const leadExpressSchema = z
  .object({
    secteur: z.string().min(1, { message: 'Choisissez un type de prestation.' }),
    localisation: z
      .string()
      .min(2, { message: 'Indiquez une ville ou un code postal.' })
      .max(120, { message: 'Maximum 120 caractères.' })
      .transform(sanitize),
    email: z.string().max(254).default(''),
    telephone: z.string().max(30).default(''),
    surface: z.string().default('inconnu'),
    message: z
      .string()
      .min(3, { message: 'Décrivez votre besoin en quelques mots.' })
      .max(2000, { message: 'Maximum 2000 caractères.' })
      .transform(sanitize),
    rgpd: z.literal(true, {
      errorMap: () => ({ message: 'Vous devez accepter la politique de confidentialité.' }),
    }),
  })
  .superRefine((data, ctx) => {
    const email = data.email.trim();
    const tel = data.telephone.trim();

    if (!email && !tel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Indiquez un téléphone ou un email pour que nous puissions vous rappeler.',
        path: ['contact'],
      });
      return;
    }

    if (email && !EMAIL_REGEX.test(email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format d'email invalide.",
        path: ['email'],
      });
    }

    if (tel && !PHONE_REGEX.test(tel)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Format invalide (ex. 06 12 34 56 78).',
        path: ['telephone'],
      });
    }

    const loc = data.localisation.trim();
    if (!POSTAL_REGEX.test(loc) && loc.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Ville ou code postal invalide.',
        path: ['localisation'],
      });
    }
  });

export type LeadExpressFormData = z.infer<typeof leadExpressSchema>;

export function validateLeadExpressForm(data: Record<string, unknown>): {
  success: boolean;
  data?: LeadExpressFormData;
  errors?: Record<string, string>;
} {
  const result = leadExpressSchema.safeParse(data);

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

/** @deprecated Utiliser validateLeadExpressForm */
export function validateQuoteForm(data: Record<string, unknown>) {
  return validateLeadExpressForm(data);
}

export const quoteFormSchema = leadExpressSchema;
