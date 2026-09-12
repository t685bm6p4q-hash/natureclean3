import { Navigate } from 'react-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * COMPOSANT PROTECTEUR DE ROUTE
 * 
 * Vérifie l'authentification avant d'afficher une page admin.
 * Si non authentifié → Redirection vers /admin/login
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Attendre la vérification de la session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  // Si non authentifié, rediriger vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si authentifié, afficher la page demandée
  return <>{children}</>;
}