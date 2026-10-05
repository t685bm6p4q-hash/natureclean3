export const DEVIS_LEAD_STORAGE_KEY = 'ncm_devis_lead';
const LEAD_MAX_AGE_MS = 15 * 60 * 1000;

export function storeDevisLeadForMerci(serviceId: string) {
  sessionStorage.setItem(
    DEVIS_LEAD_STORAGE_KEY,
    JSON.stringify({ t: Date.now(), service: serviceId })
  );
}

export function consumeDevisLeadForMerci(): { service: string } | null {
  try {
    const raw = sessionStorage.getItem(DEVIS_LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t?: number; service?: string };
    if (!parsed.t || Date.now() - parsed.t > LEAD_MAX_AGE_MS) {
      sessionStorage.removeItem(DEVIS_LEAD_STORAGE_KEY);
      return null;
    }
    sessionStorage.removeItem(DEVIS_LEAD_STORAGE_KEY);
    return { service: parsed.service ?? '' };
  } catch {
    sessionStorage.removeItem(DEVIS_LEAD_STORAGE_KEY);
    return null;
  }
}
