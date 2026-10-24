/** Mois + année en français — déterministe (pas de toLocaleDateString → hydratation SSG safe). */
const FR_MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const;

export function formatFrenchMonthYear(isoDate: string): string {
  const [yearStr, monthStr] = isoDate.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  if (!yearStr || !monthStr || month < 1 || month > 12) {
    return isoDate;
  }
  return `${FR_MONTHS[month - 1]} ${year}`;
}
