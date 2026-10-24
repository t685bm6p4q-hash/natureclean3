# Nature Clean Marseille

> Site vitrine + moteur de conversion pour entreprise de nettoyage professionnel eco-responsable a Marseille (13).

**Stack :** React 18 + TypeScript 5.9 + Vite 6 + Tailwind CSS v4 + Vercel Serverless  
**Objectif :** Lighthouse 100/100, SEO local agressif, conversion WhatsApp temps reel  
**Architecture :** Methode des 4 Couches de Graphite + Protocole DEAD-CODE-ZERO (DCZ)

---

## Table des matieres

1. [Architecture](#architecture)
2. [Methode des 4 Couches de Graphite](#methode-des-4-couches-de-graphite)
3. [Protocole DEAD-CODE-ZERO (DCZ)](#protocole-dead-code-zero-dcz)
4. [Serverless Functions (API)](#serverless-functions-api)
5. [SEO Local](#seo-local)
6. [PWA et Service Worker](#pwa-et-service-worker)
7. [Demarrage rapide](#demarrage-rapide)
8. [Deploiement Vercel](#deploiement-vercel)
9. [Variables d'environnement](#variables-denvironnement)
10. [Scripts disponibles](#scripts-disponibles)
11. [Dettes techniques](#dettes-techniques)
12. [Troubleshooting](#troubleshooting)

---

## Architecture

```
/
├── api/                          # Vercel Serverless Functions
│   ├── send-quote.ts             # Devis legacy / integrations Resend + WhatsApp
│   ├── forward-quote.ts          # Proxy devis QuotePage → Make.com (Zod, rate limit)
│   ├── send-otp.ts / verify-otp.ts / check-session.ts / logout.ts  # Admin 2FA
│   ├── send-whatsapp-alert.ts    # Alerte WhatsApp standalone
│   ├── log-crisis.ts             # Logger crise → WhatsApp sur `security`
│   └── get-stats.ts              # Stats admin (mock, pret pour BDD)
│
├── scripts/
│   └── dead-code-guard.ts        # DCZ Couche 2 : scanner statique (7 regles R, 3 regles O)
│
├── workflows/                    # GitHub Actions CI
│   ├── clean-sweep.yml           # 5 jobs paralleles + gate bloquante
│   ├── lighthouse-ci.yml         # Audit Lighthouse automatise
│   └── image-optimize.yml        # Optimisation images
│
├── public/
│   ├── sw.js                     # Service Worker PWA (nc-v6, network-first /assets/)
│   ├── manifest.json             # PWA manifest
│   ├── sitemap.xml               # Genere au build (scripts/generate-sitemap.ts)
│   ├── robots.txt                # Directives crawlers
│   ├── tracking.js               # GA4 + FB Pixel (lazy 3s)
│   └── logo.svg                  # Logo SVG
│
├── src/
│   ├── app/
│   │   ├── App.tsx               # Point d'entree (RouterProvider)
│   │   ├── routes.ts             # createBrowserRouter + lazy-loading + errorElement
│   │   ├── layouts/
│   │   │   └── RootLayout.tsx    # Header + Outlet + Footer (barre mobile devis/tel)
│   │   ├── pages/                # Home eager, reste lazy (30+ routes)
│   │   │   ├── Home.tsx
│   │   │   ├── QuotePage.tsx     # Devis → POST /api/forward-quote
│   │   │   ├── geo/              # 6 landings SEO locales (geoData.ts)
│   │   │   ├── admin/AdminAuditsPage.tsx  # Hub audits site + securite
│   │   │   ├── services/         # Fiches prestations
│   │   │   └── blog/             # Articles SEO
│   │   ├── data/geo/faq/         # FAQ longues extraites de geoData.ts (1 fichier / ville)
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ServiceCarousel.tsx  # Carrousel CSS natif (sans react-slick)
│   │   │   ├── SEO_Guardian.tsx
│   │   │   ├── RouteErrorFallback.tsx  # Chunk load + erreurs route
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ui/               # shadcn/ui (4 composants)
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input-otp.tsx
│   │   │       └── utils.ts
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx     # 2FA OTP + session 7j + logger.security()
│   │   └── hooks/
│   │       ├── useFocusTrap.ts
│   │       └── usePageJourney.ts  # Tracking parcours prospect
│   │
│   ├── types/                     # global.d.ts, service.ts, admin.ts, vite-env.d.ts
│   ├── app/utils/                 # images, geoData, chunkLoadError, …
│   └── utils/
│       ├── logger.ts              # Couche 4 : logger crise (buffer/flush/sendBeacon)
│       └── validation.ts          # Couche 3 : Zod v4 + sanitization (QuotePage, APIs)
│   │
│   └── styles/
│       ├── index.css              # Point d'entree CSS
│       ├── tailwind.css           # Tailwind v4 imports
│       ├── theme.css              # Tokens design
│       ├── fonts.css              # Imports polices
│       └── dropdown.css           # Animations mega menu
│
├── vercel.json                    # Rewrites SPA + headers securite + CSP + cache immutable
├── tsconfig.json                  # DCZ Couche 1 : strict mode maximum
├── knip.json                      # DCZ Couche 3 : chasseur de code mort
├── vite.config.ts
└── package.json                   # Scripts DCZ integres
```

---

## Methode des 4 Couches de Graphite

Le site est construit sur 4 couches de protection empilees :

### Couche 1 — Versions figees

Toutes les dependances sont verrouillees par version exacte dans `package.json`. Aucune surprise au `pnpm install`.

| Dependance | Version | Role |
|---|---|---|
| react | 18.3.1 | UI |
| typescript | 5.9.3 | Type safety |
| vite | 6.3.5 | Build |
| tailwindcss | 4.1.12 | Styling |
| react-router | 7.13.0 | Routing Data Mode |
| zod | 4.3.6 | Validation paranoiaque |
| knip | 5.85.0 | Dead code hunting |

### Couche 2 — PWA avec Service Worker 3 strategies

Fichier : `public/sw.js`

| Strategie | Cible | Comportement |
|---|---|---|
| **Network-First** | `/assets/*` (chunks Vite hashes) | Evite « Importing a module script failed » apres deploy |
| **Network-First** | Pages HTML | Fraiches si reseau, cache en fallback |
| **Cache-First** | Cloudinary, fonts `.woff2` | Images et polices |
| **Stale-While-Revalidate** | Reste | Cache + refresh background |

- Version cache `nc-v6` : purge JS/CSS au `activate`
- `/sw.js` toujours fetch reseau (pas de SW obsolete)
- Requetes `/api/` exclues du caching
- Fallback SPA (`/index.html`) si offline ; `RouteErrorFallback` + reload controle cote client

### Couche 3 — Validation Zod v4 paranoiaque double client/serveur

**Cote client** (`src/utils/validation.ts`) :
- Schemas Zod pour le formulaire devis (`QuotePage.tsx`, etat local React)
- Sanitization XSS : `stripHtml()` (balises, entites, `javascript:`, event handlers)
- Sanitization SQL : `stripSqlInjection()` (quotes, commentaires, mots-cles DML)
- Pipeline chain : `stripHtml → stripSqlInjection → trim`

**Cote serveur** (chaque fichier `/api/*.ts` a sa propre copie) :
- Meme schema Zod + meme sanitization (zero confiance dans le client)
- Validation `safeParse()` avec erreurs structurees retournees au client
- Rate-limiting in-memory par IP (5 req/min devis, 10 req/min crisis)

### Couche 4 — Logger de crise avec buffer/flush batch

Fichier : `src/utils/logger.ts`

```
Client (browser)                    Serveur (Vercel)
─────────────────                   ─────────────────
logger.info()  → console.log (dev)
logger.warn()  → bufferEvent()  ─→  POST /api/log-crisis
logger.error() → bufferEvent()  ─→  POST /api/log-crisis
logger.security() → flush immediat ─→ POST /api/log-crisis → WhatsApp !
```

- **Dev** : `console.log/warn/error` classique
- **Prod** : capture silencieuse dans un buffer en memoire
- **Flush automatique** : toutes les 30s OU au `visibilitychange` (onglet ferme)
- **Flush d'urgence** : `logger.security()` vide le buffer immediatement
- **Transport** : `navigator.sendBeacon()` (prioritaire, survit a `beforeunload`), fallback `fetch({ keepalive: true })`
- **Max buffer** : 20 evenements (auto-flush si depasse)
- **Branchement securite** : `logger.security()` est appele dans `AuthContext.tsx` sur chaque echec OTP

---

## Protocole DEAD-CODE-ZERO (DCZ)

5 couches de barrage, du compilateur au merge :

### Couche 1 — `tsconfig.json` strict

Tous les flags strict actives :
- `strict`, `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`
- `noUnusedLocals`, `noUnusedParameters` (tue le code mort a la source)
- `noImplicitReturns`, `noFallthroughCasesInSwitch`
- `noUncheckedIndexedAccess` (force le `undefined` check sur indexation)
- `forceConsistentCasingInFileNames`

### Couche 2 — Scanner statique `dead-code-guard.ts`

Fichier : `scripts/dead-code-guard.ts`

**Categories ROUGE (exit 1 immediat, commit bloque) :**

| Rule | Description | Exception |
|---|---|---|
| R1 | `any` interdit | `.d.ts` exempt |
| R2 | `@ts-ignore` / `@ts-expect-error` interdit | Aucune |
| R3 | `console.*` interdit dans `src/` | `logger.ts` exempt, `api/` exempt |
| R4 | `react-router-dom` interdit | Utiliser `react-router` (Data Mode) |
| R5 | `require()` interdit | `.cjs` exempt |
| R6 | Import duplique du meme module | Aucune |
| R7 | `export default` anonyme | Aucune |

**Categories ORANGE (avertissement, commit autorise) :**

| Rule | Seuil | Description |
|---|---|---|
| O1 | > 400 lignes | Fichier trop long, decoupe necessaire |
| O2 | > 15 imports | Trop d'imports, couplage excessif |
| O3 | TODO sans `#NCM-xxx` | Toute dette technique doit etre tracee |

**Audit `package.json` :** detecte les dependances fantomes (installees mais jamais importees).

### Couche 3 — `knip.json` durci

```json
{
  "rules": {
    "files": "error",
    "dependencies": "error",
    "unlisted": "error",
    "unresolved": "error",
    "exports": "error",
    "types": "error",
    "duplicates": "error",
    "enumMembers": "error",
    "classMembers": "error"
  }
}
```

Entry points : `src/main.tsx`, `src/app/App.tsx`, `src/app/routes.ts`, `api/*.ts`

### Couche 4 — `.husky/pre-commit`

Chaque commit declenche sequentiellement :
1. `dead-code-guard.ts` (scan statique)
2. `tsc --noEmit` (compilation stricte)
3. `knip --no-exit-code` (code mort)
4. `vite build` (build de verification)

`lint-staged` applique les 2 premiers sur les fichiers staged uniquement.

### Couche 5 — `workflows/clean-sweep.yml`

5 jobs GitHub Actions paralleles :

```
┌────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
│ Job 1: Dead-Code   │  │ Job 2: TS Strict    │  │ Job 3: Knip      │
│ Guard (scan R1-R7) │  │ (tsc --noEmit)      │  │ (dead code)      │
└────────┬───────────┘  └────────┬────────────┘  └────────┬─────────┘
         │                       │                         │
         └───────────┬───────────┴───────────┬─────────────┘
                     │                       │
              ┌──────┴──────┐  ┌─────────────┴──────┐
              │ Job 4: Vite │  │ Job 5: Audit deps  │
              │ Build       │  │ (securite)         │
              └──────┬──────┘  └─────────────┬──────┘
                     │                       │
                     └───────────┬───────────┘
                                 │
                          ┌──────┴──────┐
                          │ DCZ Gate    │
                          │ Merge OK/KO │
                          └─────────────┘
```

- Job 4 `needs: [1, 2, 3]` (ne build que si les 3 scans passent)
- Gate finale : si un job echoue → merge impossible
- `GITHUB_STEP_SUMMARY` avec rapport detaille sur chaque echec

---

## Serverless Functions (API)

4 endpoints Vercel dans `/api/` :

### `POST /api/send-quote`

**Endpoint principal du formulaire de devis.**

| Etape | Description |
|---|---|
| Rate-limit | 5 req/min/IP (in-memory, nettoyage periodique) |
| Validation | Zod v4 `safeParse()` avec sanitization XSS + SQL |
| Detection priorite | Page source → tag `HAUTE` / `MOYENNE` / `STANDARD` |
| Alerte WhatsApp | CallMeBot (primaire) → Whapi (fallback) |
| Reference | `NCM-xxxxx` (base36 timestamp, unique) |
| Reponse | `{ success, message, whatsappNotified, ref }` |

### `POST /api/send-whatsapp-alert`

**Utilitaire standalone d'alerte WhatsApp.** Meme validation Zod, meme sanitization. Utilise en interne par `send-quote` et appelable directement.

### `POST /api/log-crisis`

**Recepteur du logger client (Couche 4).**

| Niveau | Action |
|---|---|
| `warn` | Log serveur Vercel |
| `error` | Log serveur + WhatsApp si batch >= 5 erreurs |
| `security` | Log serveur + WhatsApp **immediat** par evenement |

- Accepte `text/plain` (sendBeacon) et `application/json`
- Max 50 evenements par batch (anti-flood)
- Rate-limit 10 req/min/IP

### `GET /api/get-stats`

**Stats admin mock.** Retourne compteurs devis (total, today, week, month), ventilation par service/source/ville, 3 dernières soumissions. Pret pour branchement BDD (Supabase, Firebase).

---

## SEO Local

### SEO_Guardian (composant invisible)

Fichier : `src/app/components/SEO_Guardian.tsx`

Injecte dynamiquement selon la page :
- `<title>` + `<meta description>` + `<meta keywords>` (15 sections)
- `<link rel="canonical">` (URL unique par page)
- `<link rel="preload" as="image">` (hero LCP, `fetchpriority="high"`)
- Open Graph complet (title, description, type, image 1200x630, url, locale)
- Twitter Card `summary_large_image`
- Geo meta tags (region FR-13, coordinates 43.2965/5.3698)

### JSON-LD Structured Data

3 schemas injectes dans `<head>` :

1. **LocalBusiness** : nom, adresse, telephone, email, SIRET, horaires, 16 arrondissements + villes peripheriques (Aubagne, Aix, Cannes, Nice, Antibes), 9 types de service, catalogue 4 offres, 6 avis clients, `aggregateRating` 5.0/48 avis
2. **BreadcrumbList** : dynamique selon la page (accueil → services → sous-service)
3. **FAQPage** : 5 questions frequentes optimisees pour les featured snippets

### Couverture

- 15+ pages indexees dans `sitemap.xml`
- `robots.txt` : `Allow: /`, `Disallow: /admin/`, Sitemap declare
- Keywords : 150+ mots-cles locaux (nettoyage Marseille, menage 13, fin de chantier...)

---

## PWA et Service Worker

- `manifest.json` : standalone, portrait, theme vert (`#059669`), icone SVG maskable
- `sw.js` : 3 strategies cache (voir Couche 2), precache `/`, `/index.html`, `/logo.svg`
- Offline : fallback SPA gracieux (retourne `/index.html` depuis le cache)

---

## Demarrage rapide

### Prerequis

- Node.js 20+
- pnpm 9+

### Installation

```bash
git clone https://github.com/votre-repo/nature-clean-marseille.git
cd nature-clean-marseille
pnpm install
pnpm run dev
```

### Verification DCZ locale

```bash
# Scan statique complet
pnpm run dcz

# Pipeline complet (scan + tsc + knip + build)
pnpm run dcz:full

# Knip seul
pnpm run clean

# Knip avec corrections automatiques
pnpm run clean:fix
```

---

## Deploiement Vercel

### 1. Connecter le repo

```bash
git add -A
git commit -m "feat: initial deployment"
git push origin main
```

Vercel detecte automatiquement `vite` via `vercel.json`.

### 2. Configuration Vercel

| Parametre | Valeur |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

### 3. Headers de securite (`vercel.json`)

Appliques sur toutes les routes :
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Content-Security-Policy` (self + Unsplash + Google + Facebook + CallMeBot + Whapi)

Cache :
- `/assets/*` : `public, max-age=31536000, immutable` (1 an, Vite hash)
- `/*.html` : `public, max-age=0, must-revalidate` (toujours frais)

---

## Variables d'environnement

A configurer dans **Vercel Dashboard** → **Settings** → **Environment Variables** :

| Variable | Obligatoire | Description |
|---|---|---|
| `CALLMEBOT_PHONE` | Oui | Numero WhatsApp format international (`+33612345678`) |
| `CALLMEBOT_APIKEY` | Oui | Cle API CallMeBot |
| `WHAPI_TOKEN` | Non | Token Whapi.cloud (fallback) |
| `WHAPI_PHONE` | Non | Numero Whapi (fallback) |

### Configurer CallMeBot (gratuit, illimite)

1. Envoyer sur WhatsApp au `+34 644 51 81 96` : `I allow callmebot to send me messages`
2. Recuperer l'`apikey` dans la reponse
3. Tester : `https://api.callmebot.com/whatsapp.php?phone=+33XXXXXXXXX&text=Test&apikey=XXXXXX`

---

## Scripts disponibles

| Script | Commande | Description |
|---|---|---|
| Dev | `pnpm run dev` | Serveur dev Vite (HMR) |
| Build | `pnpm run build` | Build production |
| DCZ scan | `pnpm run dcz` | Scanner statique (7R + 3O) |
| DCZ complet | `pnpm run dcz:full` | Scan + tsc + knip + build |
| Typecheck | `pnpm run typecheck` | `tsc --noEmit` |
| Knip | `pnpm run clean` | Detection code mort |
| Knip fix | `pnpm run clean:fix` | Auto-suppression code mort |
| Knip report | `pnpm run clean:report` | Rapport Markdown |
| Pre-commit | `pnpm run precommit` | Pipeline complet pre-commit |

---

## Dettes techniques

Tracees par ticket, scannable par DCZ (regle O3) :

| Ticket | Fichier | Description | Priorite |
|---|---|---|---|
| `#NCM-001` | `AuthContext.tsx` | Creer `/api/send-otp` + `/api/verify-otp` (vraie 2FA serveur) | Haute |
| `#NCM-002` | `AuthContext.tsx` | Migrer session localStorage → cookie HttpOnly signe HMAC + remplacer OTP hardcode par TOTP | Haute |

---

## Troubleshooting

### Pas d'alerte WhatsApp apres soumission devis

1. Verifier les env vars dans Vercel Dashboard (`CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY`)
2. Verifier le format du numero (inclure `+33`, pas de `0` initial)
3. Verifier les logs : **Vercel Dashboard** → **Functions** → `send-quote`
4. Tester CallMeBot manuellement dans le navigateur

### DCZ bloque le commit

```bash
# Voir les violations en detail
pnpm run dcz

# Les violations ROUGES doivent etre corrigees
# Les ORANGES sont des avertissements (commit autorise)
```

### Erreur « Importing a module script failed » (React Router)

1. Hard refresh ou vider les donnees du site (ancien SW / chunks hashes)
2. Verifier `CACHE_VERSION` dans `public/sw.js` apres un gros deploy
3. Confirmer network-first sur `/assets/*` dans le SW
4. Le fallback `RouteErrorFallback` tente un reload une fois si chunk obsolete

### Score Lighthouse baisse

1. Verifier que le tracking est lazy-loaded (3s)
2. Augmenter le delai dans `/public/tracking.js` si necessaire
3. Verifier que les images hero sont preload (SEO_Guardian)
4. Desactiver temporairement tracking pour isoler le probleme

### Knip detecte des fichiers morts

```bash
# Voir le rapport
pnpm run clean

# Corriger automatiquement (supprime les exports inutilises)
pnpm run clean:fix

# Rapport markdown pour la CI
pnpm run clean:report
```

---

## UI shadcn

Composants conserves : `button`, `card`, `input-otp`, `utils` (purge DCZ deja appliquee).

---

## Technologies

| Tech | Version | Role |
|---|---|---|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.9.3 | Type safety strict |
| Vite | 6.3.5 | Build tool |
| Tailwind CSS | 4.1.12 | Utility-first CSS |
| React Router | 7.13.0 | Data Mode routing + lazy-loading |
| Zod | 4.3.6 | Validation paranoiaque |
| Knip | 5.85.0 | Dead code detection |
| Lucide React | 0.487.0 | Icones SVG |
| Husky | 9.1.7 | Git hooks |
| shadcn/ui | - | 4 composants (button, card, input-otp, utils) |

---

## Support

**Nature Clean Marseille**  
22 Traverse Pupat, 13008 Marseille  
Tel : 04 84 89 68 75  
Email : contact@naturecleanmarseille.com  
SIRET : 890 207 269 00022

---

## Licence

Tous droits reserves - Nature Clean Marseille 2026.
