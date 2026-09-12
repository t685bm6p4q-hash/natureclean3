import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logger } from '@/utils/logger';

/**
 * NATURE CLEAN — SYSTÈME D'AUTHENTIFICATION 2FA
 *
 * Architecture sécurisée (SEC-001 + SEC-002) :
 *  1. POST /api/send-otp  → génère OTP TOTP côté serveur, envoie via WhatsApp
 *  2. POST /api/verify-otp → vérifie OTP côté serveur, pose cookie HttpOnly signé
 *  3. GET  /api/check-session → vérifie le cookie côté serveur à chaque chargement
 *  4. POST /api/logout → efface le cookie HttpOnly
 *
 * Aucun secret (OTP, token) n'est jamais exposé côté client.
 * En mode développement (APIs indisponibles), fallback sur VITE_DEV_ADMIN_OTP.
 */

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (otp: string) => Promise<{ success: boolean; attemptsRemaining?: number; retryAfter?: number }>;
  logout: () => Promise<void>;
  sendOTP: () => Promise<{ success: boolean; devOtp?: string }>;
  otpSent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clé localStorage — utilisé uniquement en mode développement (fallback)
const DEV_SESSION_KEY = 'nc_admin_session_dev';
const DEV_SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

/**
 * Hint de session minimal (non-HttpOnly) — ne contient AUCUN secret.
 * Sert uniquement à éviter l'appel GET /api/check-session (→ 401 console)
 * pour les visiteurs ordinaires qui n'ont jamais été connectés.
 * Positionné au login, effacé au logout ou sur 401.
 */
const SESSION_HINT_KEY = 'nc_s';

// ─── HELPERS ────────────────────────────────────────────────────────────────

async function apiCall(path: string, options?: RequestInit): Promise<Response | null> {
  try {
    return await fetch(path, {
      ...options,
      credentials: 'include', // Indispensable pour envoyer/recevoir les cookies HttpOnly
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    });
  } catch {
    return null; // API indisponible (preview Figma Make, hors ligne, etc.)
  }
}

// ─── PROVIDER ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    verifySession();
  }, []);

  /**
   * Vérifie la session au chargement.
   * Priorité 1 : API /api/check-session (cookie HttpOnly) — production
   * Priorité 2 : localStorage dev — fallback si API indisponible
   */
  const verifySession = async () => {
    // ── Guard : ne déclenche l'appel API QUE si un hint de session existe.
    // Évite le 401 (Unauthorized) dans la console pour les visiteurs ordinaires,
    // ce qui impacte le score Lighthouse "Best Practices".
    const hasSessionHint = !!localStorage.getItem(SESSION_HINT_KEY);

    if (!hasSessionHint) {
      // Pas de hint → visiteur anonyme, pas besoin de vérifier
      setIsAuthenticated(false);
      setIsLoading(false);

      // Fallback dev : si une session dev est active, on pose le hint manquant
      if (import.meta.env.DEV) {
        try {
          const raw = localStorage.getItem(DEV_SESSION_KEY);
          if (raw) {
            const { timestamp } = JSON.parse(raw);
            if (Date.now() - timestamp < DEV_SESSION_DURATION) {
              localStorage.setItem(SESSION_HINT_KEY, '1');
              setIsAuthenticated(true);
            } else {
              localStorage.removeItem(DEV_SESSION_KEY);
            }
          }
        } catch {
          localStorage.removeItem(DEV_SESSION_KEY);
        }
        setIsLoading(false);
      }
      return;
    }

    // Tentative via API (production) — hint présent, l'appel est légitime
    const res = await apiCall('/api/check-session');
    if (res) {
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setIsAuthenticated(!!data.authenticated);
        setIsLoading(false);
        return;
      }
      // 401 = session expirée ou invalide — efface le hint pour éviter les 401 futurs
      localStorage.removeItem(SESSION_HINT_KEY);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    // Fallback dev : localStorage (uniquement si API non disponible)
    if (import.meta.env.DEV) {
      try {
        const raw = localStorage.getItem(DEV_SESSION_KEY);
        if (raw) {
          const { timestamp } = JSON.parse(raw);
          if (Date.now() - timestamp < DEV_SESSION_DURATION) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem(DEV_SESSION_KEY);
            localStorage.removeItem(SESSION_HINT_KEY);
          }
        }
      } catch {
        localStorage.removeItem(DEV_SESSION_KEY);
        localStorage.removeItem(SESSION_HINT_KEY);
      }
    }

    setIsLoading(false);
  };

  /**
   * Demande l'envoi d'un OTP WhatsApp.
   * Production : appelle /api/send-otp (OTP généré côté serveur)
   * Dev (API indisponible) : retourne un devOtp pour les tests
   */
  const sendOTP = async (): Promise<{ success: boolean; devOtp?: string }> => {
    const res = await apiCall('/api/send-otp', { method: 'POST' });

    if (res) {
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        logger.warn('Limite de demandes OTP atteinte', { retryAfter: data.retryAfter });
        return { success: false };
      }
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setOtpSent(true);
        logger.info('📱 OTP envoyé via WhatsApp');
        // En dev sans WhatsApp configuré, l'API retourne devOtp
        return { success: true, devOtp: data.devOtp };
      }
      return { success: false };
    }

    // Fallback dev total (Figma Make preview)
    if (import.meta.env.DEV) {
      // SA-003 / NCM-045 : Jamais de fallback en dur.
      // Si VITE_DEV_ADMIN_OTP n'est pas défini dans .env.local → échec explicite.
      const devOtp = import.meta.env.VITE_DEV_ADMIN_OTP;
      if (!devOtp) {
        logger.warn(
          '⚠️  VITE_DEV_ADMIN_OTP non défini dans .env.local — auth dev désactivée. ' +
          'Ajoutez VITE_DEV_ADMIN_OTP=<6 chiffres> dans .env.local pour tester le panneau admin.',
        );
        return { success: false };
      }
      logger.info('📱 OTP (mode preview — API indisponible)');
      setOtpSent(true);
      return { success: true, devOtp };
    }

    return { success: false };
  };

  /**
   * Vérifie l'OTP et établit la session.
   * Production : POST /api/verify-otp → reçoit cookie HttpOnly
   * Dev (API indisponible) : vérifie contre VITE_DEV_ADMIN_OTP
   */
  const login = async (otp: string): Promise<{ success: boolean; attemptsRemaining?: number; retryAfter?: number }> => {
    const res = await apiCall('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ otp }),
    });

    if (res) {
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        localStorage.setItem(SESSION_HINT_KEY, '1'); // pose le hint pour les prochains chargements
        setIsAuthenticated(true);
        setOtpSent(false);
        return { success: true };
      }

      if (res.status === 429) {
        return { success: false, retryAfter: data.retryAfter };
      }

      // Échec OTP
      logger.security('Tentative de connexion admin échouée', {
        otpLength: otp.length,
        timestamp: new Date().toISOString(),
      });
      return { success: false, attemptsRemaining: data.attemptsRemaining };
    }

    // Fallback dev (Figma Make preview)
    if (import.meta.env.DEV) {
      // SA-003 : '000000' explicitement interdit même si défini en .env
      const devOtp = import.meta.env.VITE_DEV_ADMIN_OTP;
      if (!devOtp || devOtp === '000000') {
        logger.warn(
          '⚠️  VITE_DEV_ADMIN_OTP absent ou valeur triviale (000000) — connexion refusée. ' +
          'Définissez une valeur non triviale dans .env.local.',
        );
        return { success: false };
      }
      if (otp === devOtp) {
        localStorage.setItem(DEV_SESSION_KEY, JSON.stringify({ timestamp: Date.now() }));
        localStorage.setItem(SESSION_HINT_KEY, '1'); // pose le hint en mode dev
        setIsAuthenticated(true);
        setOtpSent(false);
        return { success: true };
      }
      logger.security('Tentative de connexion admin échouée (dev)', {
        otpLength: otp.length,
      });
      return { success: false };
    }

    return { success: false };
  };

  /**
   * Déconnexion.
   * Production : POST /api/logout (efface cookie HttpOnly côté serveur)
   * Dev : efface localStorage
   */
  const logout = async (): Promise<void> => {
    await apiCall('/api/logout', { method: 'POST' });
    localStorage.removeItem(DEV_SESSION_KEY);
    localStorage.removeItem(SESSION_HINT_KEY); // efface le hint → plus de 401 au prochain chargement
    setIsAuthenticated(false);
    setOtpSent(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, sendOTP, otpSent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}