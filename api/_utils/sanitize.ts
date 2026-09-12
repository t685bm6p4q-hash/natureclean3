/**
 * NATURE CLEAN — UTILITAIRES DE SANITIZATION (fichier privé)
 *
 * Centralise la sanitization serveur, eliminant la duplication entre
 * send-quote.ts, send-whatsapp-alert.ts et log-crisis.ts (SEC-012)
 */

export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&[#\w]+;/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

export function stripSqlInjection(input: string): string {
  return input
    .replace(/(['";\\\x00])/g, '')
    .replace(/(--)|(\*\/)/g, '')
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|EXEC|EXECUTE)\b/gi, '')
    .trim();
}

export function sanitize(input: string): string {
  return stripSqlInjection(stripHtml(input));
}

/**
 * Pseudonymise un email pour les logs (SEC-009)
 * ex: "martin.dupont@gmail.com" → "m***@g***.com"
 */
export function maskEmail(email: string): string {
  return email.replace(/^(.).+(@.+\.)(.{2,})$/, '$1***$2***');
}

/**
 * Pseudonymise un numéro de téléphone pour les logs (SEC-009)
 * ex: "06 12 34 56 78" → "••5678"
 */
export function maskPhone(phone: string): string {
  return '••' + phone.replace(/\D/g, '').slice(-4);
}
