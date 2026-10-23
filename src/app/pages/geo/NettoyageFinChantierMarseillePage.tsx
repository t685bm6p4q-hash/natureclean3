import { Navigate } from 'react-router';

/** Ancienne landing geo — fusionnée dans la fiche service. 301 Vercel + redirect SPA. */
export function NettoyageFinChantierMarseillePage() {
  return <Navigate to="/services/nettoyage-chantiers" replace />;
}
