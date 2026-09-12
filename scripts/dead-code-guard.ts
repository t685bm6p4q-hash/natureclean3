#!/usr/bin/env tsx
/**
 * ══════════════════════════════════════════════════════════════
 * PROTOCOLE DCZ — COUCHE 2 : DEAD-CODE-GUARD
 * ══════════════════════════════════════════════════════════════
 *
 * Scanner statique qui interdit le code qui se comporte mal.
 * Exécuté en pre-commit (Husky) + CI (GitHub Actions).
 *
 * CATÉGORIE ROUGE (exit 1 immédiat) :
 *   R1  — `any` dans le code (sauf .d.ts)
 *   R2  — @ts-ignore / @ts-expect-error
 *   R3  — console.log/warn/error dans src/ (utiliser logger)
 *   R4  — import depuis 'react-router-dom'
 *   R5  — require() en dehors de .cjs
 *   R6  — import dupliqué du même module dans un fichier
 *   R7  — export default anonyme (pas de nom = debug enfer)
 *
 * CATÉGORIE ORANGE (exit 1 si > seuil) :
 *   O1  — Fichier > 400 lignes (seuil split)
 *   O2  — Plus de 15 imports dans un fichier
 *   O3  — TODO/FIXME/HACK sans ticket (#NCM-xxx)
 *
 * Usage :
 *   npx tsx scripts/dead-code-guard.ts          # scan complet
 *   npx tsx scripts/dead-code-guard.ts --staged  # fichiers staged seulement
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCAN_DIRS = ['src', 'api'];
const EXTENSIONS = new Set(['.ts', '.tsx']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', 'public', 'scripts']);

/** Fichiers qui échappent à certaines règles */
const EXCEPTIONS = {
  /** R1 : fichiers .d.ts ont le droit d'utiliser any */
  anyAllowed: /\.d\.ts$/,
  /** R3 : logger.ts a le droit d'utiliser console.* */
  consoleAllowed: /logger\.ts$/,
  /** R5 : fichiers CJS ont le droit d'utiliser require */
  requireAllowed: /\.cjs$/,
};

/** Seuils orange */
const THRESHOLDS = {
  maxLinesPerFile: 400,
  maxImportsPerFile: 15,
};

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface Violation {
  file: string;
  line: number;
  rule: string;
  severity: 'RED' | 'ORANGE';
  message: string;
  code: string;
}

// ─────────────────────────────────────────
// FILE DISCOVERY
// ─────────────────────────────────────────

function collectFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(current: string): void {
    let entries: string[];
    try {
      entries = readdirSync(current);
    } catch {
      return;
    }

    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry) || entry.startsWith('.')) continue;

      const fullPath = join(current, entry);
      let stats;
      try {
        stats = statSync(fullPath);
      } catch {
        continue;
      }

      if (stats.isDirectory()) {
        walk(fullPath);
      } else if (EXTENSIONS.has(extname(entry))) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// ─────────────────────────────────────────
// RULES ENGINE
// ─────────────────────────────────────────

function scanFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const rel = relative(ROOT, filePath);

  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    return violations;
  }

  const lines = content.split('\n');
  const importModules: Map<string, number[]> = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trim();

    // Ignorer les lignes vides et les commentaires purs
    if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
      // Mais on vérifie quand même les commentaires pour R2 et O3

      // R2 — @ts-ignore / @ts-expect-error
      if (/@ts-ignore|@ts-expect-error/.test(trimmed)) {
        violations.push({
          file: rel, line: lineNum, rule: 'R2', severity: 'RED',
          message: 'Interdit : @ts-ignore/@ts-expect-error — corrige le type au lieu de le masquer',
          code: trimmed,
        });
      }

      // O3 — TODO/FIXME/HACK sans ticket
      if (/\b(TODO|FIXME|HACK|XXX)\b/i.test(trimmed) && !/#NCM-\d+/.test(trimmed)) {
        violations.push({
          file: rel, line: lineNum, rule: 'O3', severity: 'ORANGE',
          message: 'TODO/FIXME sans ticket — ajoute #NCM-xxx pour tracer',
          code: trimmed,
        });
      }

      continue;
    }

    // ═══════ CATÉGORIE ROUGE ═══════

    // R1 — `any` dans le code (sauf .d.ts)
    if (!EXCEPTIONS.anyAllowed.test(filePath)) {
      // Détecte : any, <any>, : any, as any, Record<string, any>
      // Mais pas "company", "many", etc.
      if (/(?::\s*any\b|<any>|as\s+any\b|\bany\s*[,\]>)|Array<any>)/.test(line)) {
        // Vérifier que ce n'est pas dans un string ou commentaire inline
        const codeBeforeComment = line.split('//')[0];
        if (/(?::\s*any\b|<any>|as\s+any\b|\bany\s*[,\]>)|Array<any>)/.test(codeBeforeComment)) {
          violations.push({
            file: rel, line: lineNum, rule: 'R1', severity: 'RED',
            message: 'Interdit : type `any` — utilise un type explicite ou `unknown`',
            code: trimmed,
          });
        }
      }
    }

    // R2 — @ts-ignore / @ts-expect-error (dans code aussi)
    if (/@ts-ignore|@ts-expect-error/.test(line)) {
      violations.push({
        file: rel, line: lineNum, rule: 'R2', severity: 'RED',
        message: 'Interdit : @ts-ignore/@ts-expect-error — corrige le type',
        code: trimmed,
      });
    }

    // R3 — console.* dans src/ (sauf logger.ts)
    if (!EXCEPTIONS.consoleAllowed.test(filePath) && filePath.includes('/src/')) {
      if (/\bconsole\.(log|warn|error|debug|info|trace)\s*\(/.test(line)) {
        // Vérifier que ce n'est pas dans un commentaire
        const codeBeforeComment = line.split('//')[0];
        if (/\bconsole\.(log|warn|error|debug|info|trace)\s*\(/.test(codeBeforeComment)) {
          violations.push({
            file: rel, line: lineNum, rule: 'R3', severity: 'RED',
            message: 'Interdit : console.* dans src/ — utilise `logger` depuis @/utils/logger',
            code: trimmed,
          });
        }
      }
    }

    // R4 — import depuis react-router-dom
    if (/from\s+['"]react-router-dom['"]/.test(line)) {
      violations.push({
        file: rel, line: lineNum, rule: 'R4', severity: 'RED',
        message: "Interdit : 'react-router-dom' — utilise 'react-router' (Data Mode)",
        code: trimmed,
      });
    }

    // R5 — require() en dehors de .cjs
    if (!EXCEPTIONS.requireAllowed.test(filePath)) {
      if (/\brequire\s*\(/.test(line) && !/\/\//.test(line.split('require')[0])) {
        violations.push({
          file: rel, line: lineNum, rule: 'R5', severity: 'RED',
          message: "Interdit : require() — utilise import ESM",
          code: trimmed,
        });
      }
    }

    // R6 — Détection des imports dupliqués (collecte)
    const importMatch = line.match(/^import\s+.*\s+from\s+['"]([^'"]+)['"]/);
    if (importMatch) {
      const mod = importMatch[1];
      if (!importModules.has(mod)) {
        importModules.set(mod, []);
      }
      importModules.get(mod)!.push(lineNum);
    }

    // R7 — export default anonyme (pas de nom de fonction/classe)
    if (/^export\s+default\s+(function|class)\s*\(/.test(trimmed)) {
      violations.push({
        file: rel, line: lineNum, rule: 'R7', severity: 'RED',
        message: 'Interdit : export default anonyme — nomme ta fonction/classe pour le debug',
        code: trimmed,
      });
    }

    // O3 — TODO/FIXME/HACK sans ticket (dans code)
    if (/\b(TODO|FIXME|HACK|XXX)\b/i.test(line) && !/#NCM-\d+/.test(line)) {
      // Éviter les doublons avec la vérification de commentaire ci-dessus
      if (!trimmed.startsWith('//') && !trimmed.startsWith('*')) {
        violations.push({
          file: rel, line: lineNum, rule: 'O3', severity: 'ORANGE',
          message: 'TODO/FIXME sans ticket — ajoute #NCM-xxx pour tracer',
          code: trimmed,
        });
      }
    }
  }

  // R6 — imports dupliqués (analyse après collecte)
  for (const [mod, lineNums] of importModules) {
    if (lineNums.length > 1) {
      violations.push({
        file: rel, line: lineNums[1], rule: 'R6', severity: 'RED',
        message: `Interdit : import dupliqué de '${mod}' (déjà importé ligne ${lineNums[0]}) — fusionne les imports`,
        code: `import ... from '${mod}' (x${lineNums.length})`,
      });
    }
  }

  // ═══════ CATÉGORIE ORANGE ═══════

  // O1 — Fichier > seuil de lignes
  if (lines.length > THRESHOLDS.maxLinesPerFile) {
    violations.push({
      file: rel, line: 1, rule: 'O1', severity: 'ORANGE',
      message: `Fichier trop long (${lines.length} lignes > ${THRESHOLDS.maxLinesPerFile}) — découpe en composants`,
      code: `${lines.length} lignes`,
    });
  }

  // O2 — Trop d'imports
  if (importModules.size > THRESHOLDS.maxImportsPerFile) {
    violations.push({
      file: rel, line: 1, rule: 'O2', severity: 'ORANGE',
      message: `Trop d'imports (${importModules.size} > ${THRESHOLDS.maxImportsPerFile}) — signe de couplage excessif`,
      code: `${importModules.size} modules importés`,
    });
  }

  return violations;
}

// ─────────────────────────────────────────
// PACKAGE.JSON AUDIT
// ─────────────────────────────────────────

function auditPackageJson(allFiles: string[]): Violation[] {
  const violations: Violation[] = [];

  let pkgContent: string;
  try {
    pkgContent = readFileSync(join(ROOT, 'package.json'), 'utf-8');
  } catch {
    return violations;
  }

  const pkg = JSON.parse(pkgContent);
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = Object.keys(pkg.devDependencies || {});
  const allDeps = [...deps, ...devDeps];

  // Lire tout le code source en une seule passe
  let allCode = '';
  for (const file of allFiles) {
    try {
      allCode += readFileSync(file, 'utf-8') + '\n';
    } catch {
      continue;
    }
  }

  // Dépendances qui sont des plugins/configs (pas importées directement)
  const INFRA_DEPS = new Set([
    '@tailwindcss/vite', '@vitejs/plugin-react', 'tailwindcss', 'vite',
    'typescript', 'tsx', 'husky', 'lint-staged', 'knip',
    '@types/react', '@types/react-dom', '@types/react-slick',
    'tw-animate-css', 'slick-carousel', // CSS-only deps
  ]);

  for (const dep of allDeps) {
    if (INFRA_DEPS.has(dep)) continue;
    if (dep.startsWith('@types/')) continue;

    // Vérifier si le package est importé quelque part
    // Normaliser : @radix-ui/react-label → chercher '@radix-ui/react-label'
    const importPattern = new RegExp(`from\\s+['"]${dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    const requirePattern = new RegExp(`require\\s*\\(\\s*['"]${dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');

    if (!importPattern.test(allCode) && !requirePattern.test(allCode)) {
      violations.push({
        file: 'package.json', line: 0, rule: 'R-PKG', severity: 'RED',
        message: `Dépendance fantôme : '${dep}' est dans package.json mais jamais importée`,
        code: `"${dep}": "${(pkg.dependencies || {})[dep] || (pkg.devDependencies || {})[dep]}"`,
      });
    }
  }

  return violations;
}

// ─────────────────────────────────────────
// MAIN EXECUTION
// ─────────────────────────────────────────

function main(): void {
  const startTime = Date.now();

  console.log('');
  console.log('══════════════════════════════════════════════════');
  console.log('  PROTOCOLE DCZ — DEAD-CODE-GUARD v1.0');
  console.log('  Nature Clean Marseille');
  console.log('══════════════════════════════════════════════════');
  console.log('');

  // Collecter les fichiers
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    const dirPath = join(ROOT, dir);
    allFiles.push(...collectFiles(dirPath));
  }

  console.log(`  Fichiers scannés : ${allFiles.length}`);

  // Scanner chaque fichier
  const allViolations: Violation[] = [];
  for (const file of allFiles) {
    allViolations.push(...scanFile(file));
  }

  // Audit package.json
  allViolations.push(...auditPackageJson(allFiles));

  // Trier par sévérité
  const reds = allViolations.filter(v => v.severity === 'RED');
  const oranges = allViolations.filter(v => v.severity === 'ORANGE');

  const elapsed = Date.now() - startTime;

  // Afficher les résultats
  if (reds.length > 0) {
    console.log('');
    console.log(`  🔴 VIOLATIONS ROUGES (${reds.length}) — BLOQUANT :`);
    console.log('  ─────────────────────────────────────');
    for (const v of reds) {
      console.log(`  ${v.rule} | ${v.file}:${v.line}`);
      console.log(`       ${v.message}`);
      console.log(`       > ${v.code}`);
      console.log('');
    }
  }

  if (oranges.length > 0) {
    console.log('');
    console.log(`  🟠 VIOLATIONS ORANGES (${oranges.length}) — AVERTISSEMENT :`);
    console.log('  ───────────────────────────��─────────');
    for (const v of oranges) {
      console.log(`  ${v.rule} | ${v.file}:${v.line}`);
      console.log(`       ${v.message}`);
      console.log('');
    }
  }

  // Résumé
  console.log('');
  console.log('──────────────────────────────────────────────────');
  console.log(`  Scan terminé en ${elapsed}ms`);
  console.log(`  Fichiers : ${allFiles.length} | Rouge : ${reds.length} | Orange : ${oranges.length}`);

  if (reds.length === 0 && oranges.length === 0) {
    console.log('');
    console.log('  ✅ PROTOCOLE DCZ : ZÉRO VIOLATION');
    console.log('');
    process.exit(0);
  } else if (reds.length > 0) {
    console.log('');
    console.log('  ❌ PROTOCOLE DCZ : COMMIT INTERDIT');
    console.log(`     ${reds.length} violation(s) rouge(s) doivent être corrigées.`);
    console.log('');
    process.exit(1);
  } else {
    console.log('');
    console.log('  ⚠️  PROTOCOLE DCZ : COMMIT AUTORISÉ AVEC AVERTISSEMENTS');
    console.log(`     ${oranges.length} avertissement(s) à traiter bientôt.`);
    console.log('');
    process.exit(0);
  }
}

main();