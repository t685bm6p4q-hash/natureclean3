import { Navigate } from 'react-router';

/** Ancienne page « bientôt disponible » — redirige vers le blog indexable. */
export function ActualitesPage() {
  return <Navigate to="/blog" replace />;
}
