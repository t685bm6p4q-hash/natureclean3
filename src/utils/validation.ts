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

function sanitize(input: string): string {
  return stripSqlInjection(stripHtml(input));
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const POSTAL_REGEX = /^[0-9]{5}$/;

export const SURFACE_RANGE_OPTIONS = [
  { id: 'moins-50', label: 'Moins de 50 m²' },
  { id: '50-150', label: '50 à 150 m²' },
  { id: 'plus-150', label: 'Plus de 150 m²' },
  { id: 'inconnu', label: 'Je ne sais pas' },
] as const;

export const FREQUENCE_EXPRESS_OPTIONS = [
  { id: 'ponctuel', label: 'Ponctuel', apiValue: 'Ponctuel' },
  { id: 'regulier', label: 'Régulier / contrat', apiValue: 'Contrat régulier' },
] as const;

const leadExpressSchema = z
  .object({
    secteur: z.string().min(1, { message: 'Choisissez un type de prestation.' }),
    localisation: z
      .string()
      .min(2, { message: 'Indiquez une ville ou un code postal.' })
      .max(120, { message: 'Maximum 120 caractères.' })
      .transform(sanitize),
    nom: z
      .string()
      .min(2, { message: 'Indiquez votre nom ou le nom de votre entreprise.' })
      .max(200, { message: 'Maximum 200 caractères.' })
      .transform(sanitize),
    email: z.string().max(254).default(''),
    telephone: z.string().max(30).default(''),
    surface: z.string().default('inconnu'),
    frequence: z.string().min(1, { message: 'Indiquez une fréquence.' }),
    message: z
      .string()
      .max(2000, { message: 'Maximum 2000 caractères.' })
      .default('')
      .transform(sanitize),
    rgpd: z.literal(true, {
      message: 'Vous devez accepter la politique de confidentialité.',
    }),
  })
  .superRefine((data, ctx) => {
    const email = data.email.trim();
    const tel = data.telephone.trim();

    if (!tel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Le téléphone est indispensable pour vous rappeler rapidement.',
        path: ['telephone'],
      });
    } else if (!PHONE_REGEX.test(tel)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Format invalide (ex. 06 12 34 56 78).',
        path: ['telephone'],
      });
    }

    if (email && !EMAIL_REGEX.test(email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format d'email invalide.",
        path: ['email'],
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

type LeadExpressFormData = z.infer<typeof leadExpressSchema>;

export function validateLeadExpressStep(
  step: 1 | 2 | 3,
  data: Record<string, unknown>
): { success: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (step === 1) {
    if (!String(data.secteur ?? '').trim()) {
      errors.secteur = 'Choisissez un type de prestation.';
    }
  }

  if (step === 2) {
    const loc = String(data.localisation ?? '').trim();
    if (!loc || loc.length < 2) {
      errors.localisation = 'Indiquez une ville ou un code postal.';
    }
    if (!String(data.frequence ?? '').trim()) {
      errors.frequence = 'Choisissez ponctuel ou régulier.';
    }
  }

  if (step === 3) {
    const nom = String(data.nom ?? '').trim();
    if (nom.length < 2) {
      errors.nom = 'Indiquez votre nom ou le nom de votre entreprise.';
    }
    const tel = String(data.telephone ?? '').trim();
    if (!tel) {
      errors.telephone = 'Le téléphone est indispensable pour vous rappeler rapidement.';
    } else if (!PHONE_REGEX.test(tel)) {
      errors.telephone = 'Format invalide (ex. 06 12 34 56 78).';
    }
    const email = String(data.email ?? '').trim();
    if (email && !EMAIL_REGEX.test(email)) {
      errors.email = "Format d'email invalide.";
    }
    if (data.rgpd !== true) {
      errors.rgpd = 'Vous devez accepter la politique de confidentialité.';
    }
  }

  return { success: Object.keys(errors).length === 0, errors };
}

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

