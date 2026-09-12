import { useEffect } from 'react';
import { useLocation } from 'react-router';

/* ──────────────────────────────────────────────────────────
   HOOK : usePageJourney
   
   Enregistre chaque page visitée dans sessionStorage.
   Permet de reconstituer le parcours complet du prospect
   avant soumission du formulaire de devis.
   
   Données collectées (RGPD-safe : pas de PII) :
   - path : URL de la page visitée
   - ts   : timestamp ISO (pour calculer le temps passé)
   
   Usage :
   - Appeler dans RootLayout (enregistrement automatique)
   - Lire via getPageJourney() dans QuoteForm (envoi)
   ────────────────────────────────────────────────────────── */

const STORAGE_KEY = 'nc_page_journey';
const MAX_ENTRIES = 30; // Limite raisonnable par session

/** Structure d'une étape du parcours */
export interface JourneyStep {
  path: string;
  ts: string;
}

/**
 * Hook à placer dans RootLayout.
 * Enregistre automatiquement chaque changement de route.
 */
export function usePageJourney(): void {
  const location = useLocation();

  useEffect(() => {
    const step: JourneyStep = {
      path: location.pathname,
      ts: new Date().toISOString(),
    };

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const journey: JourneyStep[] = raw ? (JSON.parse(raw) as JourneyStep[]) : [];

      // Éviter les doublons consécutifs (ex: scroll restoration)
      const last = journey[journey.length - 1];
      if (last && last.path === step.path) return;

      // Ajouter et limiter
      journey.push(step);
      if (journey.length > MAX_ENTRIES) {
        journey.splice(0, journey.length - MAX_ENTRIES);
      }

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
    } catch {
      // sessionStorage indisponible (mode privé sur certains navigateurs)
    }
  }, [location.pathname]);
}

/**
 * Récupère le parcours complet du prospect.
 * À appeler dans QuoteForm au moment de la soumission.
 */
export function getPageJourney(): JourneyStep[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JourneyStep[]) : [];
  } catch {
    return [];
  }
}

/**
 * Formate le parcours en texte lisible pour la notification WhatsApp.
 * Ex: "Accueil → Bureaux → Devis (3 pages, 2min)"
 */
export function formatJourneyForWhatsApp(journey: JourneyStep[]): string {
  if (journey.length === 0) return 'Parcours inconnu';

  const PAGE_SHORT_NAMES: Record<string, string> = {
    '/': 'Accueil',
    '/services': 'Services',
    '/services/entretien-bureaux': 'Bureaux',
    '/services/nettoyage-commerces': 'Commerces',
    '/services/nettoyage-coproprietes': 'Copros',
    '/services/nettoyage-chantiers': 'Chantier',
    '/services/nettoyage-evenementiel': 'Event',
    '/services/remise-etat-sols': 'Sols',
    '/services/nettoyage-vitre': 'Vitres',
    '/nettoyage-particuliers': 'Particuliers',
    '/devis': 'Devis',
    '/contact': 'Contact',
    '/realisations': 'Realisations',
    '/a-propos': 'A propos',
    '/blog': 'Blog',
  };

  const steps = journey.map(s => PAGE_SHORT_NAMES[s.path] || s.path);

  // Durée totale de la session
  const firstTs = new Date(journey[0].ts).getTime();
  const lastTs = new Date(journey[journey.length - 1].ts).getTime();
  const durationMin = Math.round((lastTs - firstTs) / 60000);

  const durationStr = durationMin > 0 ? `${durationMin}min` : '<1min';

  return `${steps.join(' → ')} (${journey.length} pages, ${durationStr})`;
}
