/**
 * 🛡️ ERROR BOUNDARY - Protection contre les crashes
 * 
 * Empêche l'app entière de crasher en cas d'erreur dans un composant.
 * Affiche un fallback UI professionnel.
 * 
 * Usage :
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/app/utils/constants';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log l'erreur avec notre système de logging production-safe
    logger.error('React Error Boundary caught an error', error);

    this.setState({
      error,
      errorInfo
    });

    // En production, envoyer à Sentry ou service similaire
    if (import.meta.env.PROD) {
      // window.Sentry?.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Si un fallback personnalisé est fourni, l'utiliser
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Sinon, afficher le fallback par défaut
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                Une erreur est survenue
              </h1>
              <p className="text-red-100 text-sm">
                L'application a rencontré un problème inattendu
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="font-bold text-slate-900 mb-2">
                  Ce qui s'est passé :
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Un composant de l'application n'a pas pu se charger correctement. 
                  Pas d'inquiétude, vos données sont sécurisées et le problème a été automatiquement signalé.
                </p>
              </div>

              {/* Error details (dev only) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <summary className="cursor-pointer font-semibold text-slate-700 mb-2">
                    📋 Détails techniques (dev only)
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-xs font-mono text-red-600 mb-2">
                        {this.state.error.message}
                      </p>
                      <pre className="text-xs bg-slate-100 p-3 rounded overflow-x-auto text-slate-700">
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2">
                          Component Stack:
                        </p>
                        <pre className="text-xs bg-slate-100 p-3 rounded overflow-x-auto text-slate-700">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={this.handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Réessayer
                </button>
                <a
                  href="/"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-slate-200 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  Retour à l'accueil
                </a>
              </div>

              {/* Support info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong>Besoin d'aide ?</strong> Contactez-nous au{' '}
                  <a 
                    href={PHONE_HREF} 
                    className="font-bold underline hover:no-underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}