/**
 * NATURE CLEAN — RATE LIMITER PERSISTANT (fichier privé)
 *
 * SEC-010 : Rate limiter en deux couches :
 *   1. Upstash Redis (Sliding Window) — persistant entre instances Vercel
 *   2. Fallback in-memory Map — si Redis non configuré (dev, cold start)
 *
 * Upstash REST API (pas de SDK nécessaire — requêtes HTTP simples) :
 *   Variables d'env : UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *
 * Algorithme Redis : Sorted Set (ZRANGEBYSCORE + ZADD + EXPIRE)
 *   → Sliding window précis, pas de bords de fenêtre fixes
 *   → Chaque membre = `{timestamp}-{random}`, score = timestamp en ms
 */

// ─── CONFIG ───────────────────────────────────────────────────────────────────

export interface RateLimitConfig {
  /** Nombre max de requêtes dans la fenêtre */
  max: number;
  /** Durée de la fenêtre en secondes */
  windowSeconds: number;
  /** Préfixe de la clé Redis (évite les collisions entre endpoints) */
  keyPrefix: string;
}

export interface RateLimitResult {
  limited: boolean;
  /** Nombre de requêtes dans la fenêtre courante */
  count: number;
  /** Retryafter en secondes si limité */
  retryAfter?: number;
}

// ─── IN-MEMORY FALLBACK ───────────────────────────────────────────────────────

const inMemoryMap = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of inMemoryMap) {
    if (now > v.resetAt) inMemoryMap.delete(k);
  }
}, 5 * 60_000);

function checkInMemory(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const resetAt = now + config.windowSeconds * 1000;
  const entry = inMemoryMap.get(key);

  if (!entry || now > entry.resetAt) {
    inMemoryMap.set(key, { count: 1, resetAt });
    return { limited: false, count: 1 };
  }

  entry.count += 1;

  if (entry.count > config.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { limited: true, count: entry.count, retryAfter };
  }

  return { limited: false, count: entry.count };
}

// ─── UPSTASH REDIS (SLIDING WINDOW) ──────────────────────────────────────────

/**
 * Implémente un Sliding Window via Sorted Sets Redis.
 * Chaque requête = un membre horodaté. On ne compte que ceux dans la fenêtre.
 *
 * Pipeline atomique :
 *   1. ZREMRANGEBYSCORE — retire les entrées hors fenêtre
 *   2. ZADD             �� ajoute l'entrée courante
 *   3. ZCARD            — compte les entrées dans la fenêtre
 *   4. EXPIRE           — renouvelle le TTL de la clé
 */
async function checkUpstashRedis(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null; // Non configuré → fallback in-memory

  const now = Date.now();
  const windowStart = now - config.windowSeconds * 1000;
  const member = `${now}-${Math.random().toString(36).slice(2, 8)}`;

  const pipeline = [
    ['ZREMRANGEBYSCORE', key, '-inf', String(windowStart)],
    ['ZADD', key, String(now), member],
    ['ZCARD', key],
    ['EXPIRE', key, String(config.windowSeconds + 10)],
  ];

  try {
    const response = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipeline),
    });

    if (!response.ok) {
      console.warn(`[RateLimit] Upstash HTTP ${response.status} — fallback in-memory`);
      return null;
    }

    const results: Array<{ result: unknown }> = await response.json();
    const count = typeof results[2]?.result === 'number' ? results[2].result : 0;

    if (count > config.max) {
      return {
        limited: true,
        count,
        retryAfter: config.windowSeconds,
      };
    }

    return { limited: false, count };
  } catch (err) {
    console.warn('[RateLimit] Erreur Upstash — fallback in-memory:', err);
    return null;
  }
}

// ─── POINT D'ENTRÉE PUBLIC ────────────────────────────────────────────────────

/**
 * Vérifie le rate limit pour une IP donnée.
 * Tente Upstash Redis en priorité, fallback sur in-memory.
 *
 * @param ip      Adresse IP du client
 * @param config  Paramètres du rate limiter
 */
export async function checkRateLimit(
  ip: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const key = `${config.keyPrefix}:${ip}`;

  // Tentative Redis
  const redisResult = await checkUpstashRedis(key, config);
  if (redisResult !== null) {
    const backend = process.env.UPSTASH_REDIS_REST_URL ? 'Redis' : 'memory';
    if (redisResult.limited) {
      console.warn(`[RateLimit/${backend}] Limité — IP: ${ip}, count: ${redisResult.count}`);
    }
    return redisResult;
  }

  // Fallback in-memory
  return checkInMemory(key, config);
}

// ─── CONFIGS PRÉDÉFINIES ─────────────────────────────────────────────────────

export const RATE_CONFIGS = {
  /** Formulaire devis (QuoteForm) : 5 soumissions / minute */
  quote: { max: 5, windowSeconds: 60, keyPrefix: 'rl:quote' } satisfies RateLimitConfig,

  /** Logger crisis : 10 requêtes / minute */
  crisis: { max: 10, windowSeconds: 60, keyPrefix: 'rl:crisis' } satisfies RateLimitConfig,

  /** Alerte WhatsApp directe : 3 / minute (endpoint legacy) */
  whatsappAlert: { max: 3, windowSeconds: 60, keyPrefix: 'rl:wa' } satisfies RateLimitConfig,

  /** Vérification OTP admin : 5 tentatives / 15 minutes (NCM-043)
   *  Remplace l'ancienne Map in-memory dans verify-otp.ts.
   *  Persistant entre instances Vercel grâce à Upstash Redis. */
  otp: { max: 5, windowSeconds: 900, keyPrefix: 'rl:otp' } satisfies RateLimitConfig,
} as const;