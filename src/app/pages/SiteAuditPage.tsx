/**
 * NATURE CLEAN — AUDIT SITE COMPLET (Light)
 *
 * Tableau de bord transversal couvrant 5 domaines :
 *   Sécurité · SEO · Code Quality · Performance · RGPD/Accessibilité
 *
 * Accessible sur : /admin/site-audit
 * Mis à jour le  : 2026-04-29
 */

import { useState } from 'react';
import {
  ShieldCheck, ShieldAlert, ShieldX, Globe, Code2,
  Zap, Eye, CheckCircle2, XCircle, AlertTriangle,
  Info, ChevronDown, ChevronUp, ExternalLink,
  Search, Gauge, Lock,
} from 'lucide-react';

// ──────────────────────────────────────────
// Types
// ──────────────────────────────────────────
type Domain = 'security' | 'seo' | 'code' | 'performance' | 'rgpd';
type Level = 'critique' | 'moyen' | 'faible' | 'info' | 'ok';
type Status = 'open' | 'fixed' | 'monitored';

interface AuditItem {
  id: string;
  domain: Domain;
  level: Level;
  title: string;
  file?: string;
  description: string;
  action?: string;
  status: Status;
}

// ──────────────────────────────────────────
// Data — Résultats de l'audit du 29/04/2026
// ──────────────────────────────────────────
const ITEMS: AuditItem[] = [
  // ── SÉCURITÉ ──
  {
    id: 'SA-001',
    domain: 'security',
    level: 'moyen',
    title: 'URL webhook Make.com visible dans le bundle JS',
    file: 'api/forward-quote.ts + src/app/pages/QuotePage.tsx',
    description:
      "L'URL Make.com était hardcodée dans QuotePage.tsx et exposée dans les DevTools. Un concurrent pouvait l'appeler directement, contournant le rate limiter Redis et le CORS.",
    action:
      '✅ CORRIGÉ [NCM-042] — Création de /api/forward-quote.ts : proxy serveur avec Zod, rate limit Redis, alerte WhatsApp. QuotePage.tsx appelle désormais /api/forward-quote. L\'URL Make.com est dans process.env.MAKE_WEBHOOK_URL, jamais dans le bundle.',
    status: 'fixed',
  },
  {
    id: 'SA-002',
    domain: 'security',
    level: 'faible',
    title: 'Brute-force OTP en mémoire → migré vers Redis persistant',
    file: 'api/verify-otp.ts + api/_utils/ratelimit.ts',
    description:
      'Le compteur de tentatives OTP était dans une Map en-mémoire. Sur Vercel (multi-instances), un attaquant pouvait tenter 5×N essais. Migré vers RATE_CONFIGS.otp (Sliding Window Redis, 5 tentatives / 15 min / IP, avec fallback in-memory).',
    action:
      '✅ CORRIGÉ [NCM-043] — verify-otp.ts utilise désormais checkRateLimit(ip, RATE_CONFIGS.otp). La Map in-memory et ses helpers (checkBruteForce, recordFailedAttempt, resetAttempts) sont supprimés. RATE_CONFIGS.otp ajouté dans _utils/ratelimit.ts.',
    status: 'fixed',
  },
  {
    id: 'SA-003',
    domain: 'security',
    level: 'faible',
    title: 'VITE_DEV_ADMIN_OTP fallback prévisible → fail-fast + blacklist',
    file: 'src/app/contexts/AuthContext.tsx',
    description:
      "Le fallback '000000' a été supprimé. Deux gardes maintenant actives : (1) sendOTP() échoue explicitement si VITE_DEV_ADMIN_OTP est absent de .env.local avec warning console ; (2) login() refuse '000000' même si quelqu'un le définit en .env — connexion refusée + warning. import.meta.env.DEV utilisé (pas process.env) pour cohérence avec le reste du fichier.",
    action:
      '✅ CORRIGÉ [NCM-045] — Jamais de fallback en dur. Fail-fast : absence ou valeur triviale → { success: false } + logger.warn(). Blacklist explicite de \"000000\" dans la vérification login().',
    status: 'fixed',
  },
  {
    id: 'SA-004',
    domain: 'security',
    level: 'ok',
    title: 'Audit sécurité principal : 18/18 findings résolus (100/100)',
    file: '/admin/security-audit',
    description:
      'SEC-001 à SEC-018 tous à l\'état mitigated. Cookie HttpOnly, CORS strict, CSP bloquante, HSTS 2 ans, rate limiting Redis, PII pseudonymisées, brute-force protection, X-Powered-By masqué.',
    status: 'fixed',
  },

  // ── SEO ──
  {
    id: 'SA-005',
    domain: 'seo',
    level: 'moyen',
    title: 'Sitemap incomplet — 4 pages indexables absentes',
    file: 'public/sitemap.xml',
    description:
      'Les routes /services/nettoyage-graffitis, /services/nettoyage-diogene, /services/nettoyage-gros-chantiers et /politique-de-confidentialite existaient dans le routeur mais étaient absentes du sitemap. Google ne les découvrait pas automatiquement.',
    action: '✅ CORRIGÉ — 4 URLs ajoutées avec lastmod 2026-04-29. 43 URLs total dans le sitemap.',
    status: 'fixed',
  },
  {
    id: 'SA-006',
    domain: 'seo',
    level: 'faible',
    title: 'Dates lastmod statiques → génération automatique au build',
    file: 'scripts/generate-sitemap.ts + vercel.json + package.json',
    description:
      'Toutes les URLs avaient lastmod figée au 2026-03-19. Google utilise lastmod pour décider quand recrawler — des dates stagnantes ralentissent la remontée du contenu récent.',
    action:
      '✅ CORRIGÉ [NCM-044] — Script scripts/generate-sitemap.ts créé : génère public/sitemap.xml avec lastmod = date du build (YYYY-MM-DD). Intégré dans vercel.json buildCommand : "npm run build:sitemap && npm run build". Le sitemap est maintenant daté automatiquement à chaque déploiement. 46 URLs définies dans le script.',
    status: 'fixed',
  },
  {
    id: 'SA-007',
    domain: 'seo',
    level: 'ok',
    title: 'SEO technique : JSON-LD LocalBusiness, meta par page, robots.txt, redirects 301',
    description:
      'SEO_Guardian injecte un JSON-LD LocalBusiness complet sur chaque page. 28 redirections 301 configurées dans vercel.json. robots.txt bloque /admin/ et /api/. 19 landing pages géo indexables.',
    status: 'fixed',
  },
  {
    id: 'SA-008',
    domain: 'seo',
    level: 'ok',
    title: 'Open Graph et Twitter Card présents',
    description:
      'og:title, og:description, og:image, og:url définis. Twitter:card summary_large_image. Vérifiable via opengraph.xyz.',
    status: 'fixed',
  },

  // ── CODE QUALITY ──
  {
    id: 'SA-009',
    domain: 'code',
    level: 'faible',
    title: 'console.log résiduel en production (QuotePage.tsx)',
    file: 'src/app/pages/QuotePage.tsx:157',
    description:
      'Un `console.log("Form data successfully sent to Make.com Webhook")` subsistait en production. Visible dans les DevTools, incompatible avec la charte "zéro console.log en prod" du dead-code-guard.',
    action: '✅ CORRIGÉ — Remplacé par un commentaire avec ticket [NCM-042].',
    status: 'fixed',
  },
  {
    id: 'SA-010',
    domain: 'code',
    level: 'faible',
    title: 'TODO sans ticket dans verify-otp.ts',
    file: 'api/verify-otp.ts:19',
    description:
      'Le commentaire "TODO: migrer vers Upstash Redis" n\'avait pas de numéro de ticket, violant le standard du dead-code-guard (R3 + O3 : TODO/FIXME doit avoir un ticket #NCM-xxx).',
    action: '✅ CORRIGÉ — Remplacé par NOTE [NCM-043] avec description précise.',
    status: 'fixed',
  },
  {
    id: 'SA-011',
    domain: 'code',
    level: 'ok',
    title: 'Architecture modulaire saine — 3 utilitaires partagés créés',
    file: 'api/_utils/',
    description:
      'whatsapp.ts, sanitize.ts et ratelimit.ts centralisent 100% de la logique commune. Zéro duplication entre send-quote.ts, log-crisis.ts et send-whatsapp-alert.ts. Dead-code-guard configuré.',
    status: 'fixed',
  },
  {
    id: 'SA-012',
    domain: 'code',
    level: 'info',
    title: 'Architecture devis unifiée : QuotePage.tsx → /api/forward-quote, QuoteForm.tsx → /api/send-quote',
    file: 'api/forward-quote.ts + src/app/pages/QuotePage.tsx',
    description:
      'Les deux formulaires de devis utilisent désormais des proxys serveur distincts. QuoteForm.tsx → /api/send-quote (WhatsApp + Resend). QuotePage.tsx → /api/forward-quote (WhatsApp + Make.com). Les deux partagent checkRateLimit, sanitize et sendWhatsApp via _utils/.',
    action: 'Architecture correcte. Prochaine étape possible : fusionner les deux endpoints en un seul /api/send-quote avec un champ source discriminant.',
    status: 'fixed',
  },

  // ── PERFORMANCE ──
  {
    id: 'SA-013',
    domain: 'performance',
    level: 'ok',
    title: 'Code splitting correct — Home eagerly loaded, reste lazy',
    file: 'src/app/routes.ts',
    description:
      '1 page chargée immédiatement (Home), 30+ pages en lazy(). Suspense fallback propre. ScrollRestoration actif. LCP minimal sur la page d\'accueil.',
    status: 'fixed',
  },
  {
    id: 'SA-014',
    domain: 'performance',
    level: 'ok',
    title: 'Cache Cloudinary + headers immutable sur /assets/',
    file: 'vercel.json + src/app/utils/images.ts',
    description:
      'Images servies via Cloudinary (f_auto, q_auto, w_auto). Assets statiques avec Cache-Control: public, max-age=31536000, immutable dans vercel.json. Pas de re-téléchargement inutile.',
    status: 'fixed',
  },
  {
    id: 'SA-015',
    domain: 'performance',
    level: 'info',
    title: 'Lighthouse non exécuté automatiquement sur ce projet',
    description:
      'Un score Lighthouse de référence n\'a pas encore été capturé. Recommandé : lancer PageSpeed Insights sur / (accueil), /devis et un service après déploiement Vercel pour obtenir la baseline LCP/CLS/FID.',
    action:
      'Exécuter : npx lighthouse https://natureclean.fr --output=html --output-path=reports/lighthouse.html\nOu via https://pagespeed.web.dev',
    status: 'monitored',
  },

  // ── RGPD / ACCESSIBILITÉ ──
  {
    id: 'SA-016',
    domain: 'rgpd',
    level: 'ok',
    title: 'CookieConsentBanner conforme RGPD — tracking conditionné',
    file: 'src/app/components/CookieConsentBanner.tsx + public/tracking.js',
    description:
      'Bannière avec Accept/Reject, localStorage key ncm_cookie_consent, event ncm:consent:accepted dispatché. tracking.js vérifie le consentement avant toute initialisation GA.',
    status: 'fixed',
  },
  {
    id: 'SA-017',
    domain: 'rgpd',
    level: 'ok',
    title: 'Accessibilité : Skip to content, focus trap, aria-labels',
    file: 'src/app/components/SkipToContent.tsx + Header.tsx',
    description:
      'SkipToContent vers #main-content implémenté. Focus trap actif sur le menu mobile. ARIA labels sur tous les boutons iconiques. tabIndex={-1} sur main pour le focus programmatique.',
    status: 'fixed',
  },
  {
    id: 'SA-018',
    domain: 'rgpd',
    level: 'ok',
    title: 'Page Politique de confidentialité présente et liée',
    file: 'src/app/pages/PolitiqueConfidentialitePage.tsx',
    description:
      'Route /politique-de-confidentialite, liée depuis le footer et depuis le formulaire devis (QuotePage). Mentions RGPD légales présentes.',
    status: 'fixed',
  },
  {
    id: 'SA-019',
    domain: 'rgpd',
    level: 'faible',
    title: 'PolitiqueConfidentialitePage absente du sitemap (jusqu\'au 29/04)',
    file: 'public/sitemap.xml',
    description:
      'La page /politique-de-confidentialite n\'était pas référencée dans le sitemap, ce qui empêchait Google de la scanner pour la conformité RGPD.',
    action: '✅ CORRIGÉ — Ajoutée avec changefreq: yearly, priority: 0.3.',
    status: 'fixed',
  },
];

// ──────────────────────────────────────────
// Config visuelle
// ──────────────────────────────────────────

const DOMAIN_CONFIG: Record<Domain, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  security: { label: 'Sécurité', icon: ShieldAlert, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  seo: { label: 'SEO', icon: Search, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  code: { label: 'Code Quality', icon: Code2, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  performance: { label: 'Performance', icon: Gauge, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  rgpd: { label: 'RGPD / A11y', icon: Lock, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
};

const LEVEL_CONFIG: Record<Level, { label: string; badge: string; icon: React.ElementType }> = {
  critique: { label: 'CRITIQUE', badge: 'bg-red-600 text-white', icon: ShieldX },
  moyen: { label: 'MOYEN', badge: 'bg-orange-500 text-white', icon: AlertTriangle },
  faible: { label: 'FAIBLE', badge: 'bg-yellow-500 text-white', icon: Info },
  info: { label: 'INFO', badge: 'bg-slate-400 text-white', icon: Info },
  ok: { label: 'OK', badge: 'bg-green-700 text-white', icon: CheckCircle2 },
};

const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
  open: { label: 'À traiter', color: 'text-red-600 bg-red-50 border-red-200', icon: XCircle },
  fixed: { label: 'Corrigé', color: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle2 },
  monitored: { label: 'Surveillance', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Eye },
};

// ──────────────────────────────────────────
// Score par domaine
// ──────────────────────────────────────────

function domainScore(domain: Domain): number {
  const items = ITEMS.filter((i) => i.domain === domain);
  const open = items.filter((i) => i.status === 'open');
  const critiques = open.filter((i) => i.level === 'critique').length;
  const moyens = open.filter((i) => i.level === 'moyen').length;
  const faibles = open.filter((i) => i.level === 'faible').length;
  return Math.max(0, 100 - critiques * 25 - moyens * 10 - faibles * 5);
}

// ──────────────────────────────────────────
// Components
// ──────────────────────────────────────────

function DomainBadge({ domain }: { domain: Domain }) {
  const cfg = DOMAIN_CONFIG[domain];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = size * 0.36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * score) / 100;
  const color = score >= 85 ? '#16a34a' : score >= 60 ? '#d97706' : '#dc2626';
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={size * 0.09} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={size * 0.09}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <span className="relative z-10 font-black text-slate-900" style={{ fontSize: size * 0.22 }}>{score}</span>
    </div>
  );
}

function AuditCard({ item }: { item: AuditItem }) {
  const [open, setOpen] = useState(false);
  const lvl = LEVEL_CONFIG[item.level];
  const sta = STATUS_CONFIG[item.status];
  const LvlIcon = lvl.icon;
  const StaIcon = sta.icon;

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${item.status === 'fixed' ? 'opacity-60' : ''}`}>
      <button
        className="w-full text-left p-4 bg-white hover:bg-slate-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-3">
          <LvlIcon size={16} className={`flex-shrink-0 mt-0.5 ${item.level === 'ok' ? 'text-green-500' : item.level === 'critique' ? 'text-red-500' : item.level === 'moyen' ? 'text-orange-500' : 'text-yellow-500'}`} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${lvl.badge}`}>{lvl.label}</span>
              <DomainBadge domain={item.domain} />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${sta.color}`}>
                <StaIcon size={9} />
                {sta.label}
              </span>
              <span className="text-[10px] text-slate-400 font-mono ml-auto">{item.id}</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">{item.title}</p>
            {item.file && (
              <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{item.file}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
          </div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-100 space-y-3 text-sm">
          <p className="text-slate-700 leading-relaxed">{item.description}</p>
          {item.action && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-xs font-bold text-blue-700 mb-1 uppercase tracking-wide">Action recommandée</p>
              <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{item.action}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────
// Page principale
// ──────────────────────────────────────────

const ALL_DOMAINS: Domain[] = ['security', 'seo', 'code', 'performance', 'rgpd'];

export function SiteAuditPage() {
  const [activeDomain, setActiveDomain] = useState<Domain | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<Status | 'all'>('all');

  const open = ITEMS.filter((i) => i.status === 'open').length;
  const fixed = ITEMS.filter((i) => i.status === 'fixed').length;
  const monitored = ITEMS.filter((i) => i.status === 'monitored').length;

  const globalScore = Math.round(
    ALL_DOMAINS.reduce((sum, d) => sum + domainScore(d), 0) / ALL_DOMAINS.length
  );

  const filtered = ITEMS.filter((i) => {
    if (activeDomain !== 'all' && i.domain !== activeDomain) return false;
    if (activeStatus !== 'all' && i.status !== activeStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Globe size={22} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nature Clean Marseille</p>
                  <h1 className="text-xl font-black text-white">Audit Site Complet — Light</h1>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-lg">
                Bilan transversal sur 5 domaines : sécurité, SEO, qualité de code, performance et conformité RGPD/accessibilité.
                Mis à jour le <strong className="text-white">29 avril 2026</strong>.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <ScoreRing score={globalScore} size={96} />
              <p className="text-xs text-slate-400 mt-2">Score moyen global</p>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {ALL_DOMAINS.map((d) => {
              const cfg = DOMAIN_CONFIG[d];
              const score = domainScore(d);
              const Icon = cfg.icon;
              const scoreColor = score >= 85 ? 'text-green-400' : score >= 60 ? 'text-amber-400' : 'text-red-400';
              return (
                <button
                  key={d}
                  onClick={() => setActiveDomain(activeDomain === d ? 'all' : d)}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    activeDomain === d
                      ? 'bg-white/15 border-white/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} className={`mx-auto mb-1 ${cfg.color.replace('text-', 'text-').replace('-700', '-400')}`} />
                  <div className={`text-lg font-black ${scoreColor}`}>{score}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{cfg.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Résumé statuts ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center">
          {[
            { key: 'open' as const, label: `${open} À traiter`, color: 'text-red-600', bg: open > 0 ? 'bg-red-50' : '' },
            { key: 'monitored' as const, label: `${monitored} Surveillance`, color: 'text-amber-600', bg: '' },
            { key: 'fixed' as const, label: `${fixed} Corrigés`, color: 'text-green-600', bg: '' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveStatus(activeStatus === s.key ? 'all' : s.key)}
              className={`text-sm font-bold rounded-full px-3 py-1 transition-all border ${
                activeStatus === s.key
                  ? `${s.color} ${s.bg} border-current`
                  : 'text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => { setActiveDomain('all'); setActiveStatus('all'); }}
            className="text-xs text-slate-400 hover:text-slate-600 ml-auto underline underline-offset-2"
          >
            Réinitialiser filtres
          </button>
          <a
            href="/admin/security-audit"
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold border border-blue-200 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
          >
            <ShieldCheck size={12} />
            Audit sécurité détaillé
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Filtres domaine */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveDomain('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${
              activeDomain === 'all'
                ? 'bg-slate-900 text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            Tous ({ITEMS.length})
          </button>
          {ALL_DOMAINS.map((d) => {
            const cfg = DOMAIN_CONFIG[d];
            const count = ITEMS.filter((i) => i.domain === d).length;
            return (
              <button
                key={d}
                onClick={() => setActiveDomain(activeDomain === d ? 'all' : d)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${
                  activeDomain === d
                    ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <cfg.icon size={13} />
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Liste */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 size={36} className="mx-auto mb-3 text-green-400" />
              <p>Aucun résultat pour cette combinaison de filtres.</p>
            </div>
          )}
          {filtered.map((item) => (
            <AuditCard key={item.id} item={item} />
          ))}
        </div>

        {/* Actions prioritaires */}
        {ITEMS.filter((i) => i.status === 'open').length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3">
              <Zap size={18} />
              <h2 className="font-black text-base">Actions prioritaires restantes</h2>
            </div>
            <div className="p-5 space-y-3">
              {ITEMS.filter((i) => i.status === 'open').map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">{item.file}</p>
                  </div>
                  <DomainBadge domain={item.domain} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-6 text-xs text-slate-400 text-center pb-8">
          Audit réalisé par analyse statique du code source le 29/04/2026.
          Ne remplace pas un pentest ou un scan Lighthouse automatisé.
          <span className="mx-2">·</span>
          <a href="/admin/security-audit" className="text-blue-500 hover:underline">Audit sécurité complet →</a>
        </div>
      </div>
    </div>
  );
}