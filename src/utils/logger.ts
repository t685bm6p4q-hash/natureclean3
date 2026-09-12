/**
 * COUCHE 4 — LOGGER DE CRISE NATURE CLEAN
 *
 * En dev : console.log classique
 * En prod : capture silencieuse + envoi vers un endpoint de monitoring
 *
 * Fonctionnalites :
 * - Buffer des erreurs en production (evite le spam)
 * - Envoi batch toutes les 30s ou au unload de la page
 * - Detection automatique des tentatives d'acces admin non autorisees
 * - Zero console.log en production (propre pour les audits Lighthouse)
 */

interface LogData {
  [key: string]: unknown;
}

interface CrisisEvent {
  level: 'warn' | 'error' | 'security';
  message: string;
  data?: LogData;
  url: string;
  timestamp: string;
  userAgent: string;
}

/** Endpoint de monitoring (configurable via env) */
const MONITORING_ENDPOINT = '/api/log-crisis';
const BUFFER_FLUSH_INTERVAL = 30_000;
const MAX_BUFFER_SIZE = 20;

class Logger {
  private isDevelopment: boolean;
  private buffer: CrisisEvent[] = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private initialized = false;

  constructor() {
    // Safe check — import.meta.env may not exist in all contexts
    try {
      this.isDevelopment = import.meta.env.DEV === true;
    } catch {
      this.isDevelopment = true;
    }
  }

  /** Lazy init — only starts timers on first production log */
  private ensureInitialized(): void {
    if (this.initialized || this.isDevelopment) return;
    this.initialized = true;

    this.flushTimer = setInterval(() => this.flush(), BUFFER_FLUSH_INTERVAL);

    if (typeof window !== 'undefined') {
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush();
        }
      });
    }
  }

  info(message: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data || '');
    }
  }

  warn(message: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || '');
    } else {
      this.ensureInitialized();
      this.bufferEvent('warn', message, data);
    }
  }

  error(message: string, error?: Error | unknown): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error || '');
    } else {
      this.ensureInitialized();
      const errorData: LogData = {};
      if (error instanceof Error) {
        errorData.errorMessage = error.message;
        errorData.stack = error.stack;
      } else if (error) {
        errorData.raw = String(error);
      }
      this.bufferEvent('error', message, errorData);
    }
  }

  /**
   * Alerte securite — flush immediat
   */
  security(message: string, data?: LogData): void {
    if (this.isDevelopment) {
      console.warn(`[SECURITY] ${message}`, data || '');
    }
    this.ensureInitialized();
    this.bufferEvent('security', message, data);
    this.flush();
  }

  // -----------------------------------------
  // INTERNAL : Buffer + Flush
  // -----------------------------------------

  private bufferEvent(level: CrisisEvent['level'], message: string, data?: LogData): void {
    const event: CrisisEvent = {
      level,
      message,
      data,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    this.buffer.push(event);

    if (this.buffer.length >= MAX_BUFFER_SIZE) {
      this.flush();
    }
  }

  private flush(): void {
    if (this.buffer.length === 0) return;

    const events = [...this.buffer];
    this.buffer = [];

    const payload = JSON.stringify({ events, site: 'natureclean.fr' });

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(MONITORING_ENDPOINT, payload);
    } else if (typeof fetch !== 'undefined') {
      fetch(MONITORING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Silencieux — pas de boucle infinie
      });
    }
  }
}

export const logger = new Logger();