/**
 * Moteur de prerender SSG — capture le DOM React via Puppeteer après vite build.
 * Utilisé par le plugin Vite (closeBundle) et par `npm run prerender`.
 */

import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { PRERENDER_ROUTES } from '../src/app/config/prerender-routes';

const PREVIEW_HOST = '127.0.0.1';

export interface PrerenderOptions {
  readonly distDir: string;
  readonly routes?: readonly string[];
}

async function findFreePort(): Promise<number> {
  if (process.env.PRERENDER_PORT) {
    return Number(process.env.PRERENDER_PORT);
  }
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.listen(0, PREVIEW_HOST, () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('Impossible de réserver un port libre'));
        return;
      }
      const { port } = address;
      server.close(() => resolvePort(port));
    });
    server.on('error', reject);
  });
}

function routeToOutputFile(distDir: string, route: string): string {
  if (route === '/') {
    return resolve(distDir, 'index.html');
  }
  return resolve(distDir, route.slice(1), 'index.html');
}

function startPreviewServer(distDir: string, port: number): Promise<ChildProcessWithoutNullStreams> {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['vite', 'preview', '--host', PREVIEW_HOST, '--port', String(port), '--strictPort'],
      {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, VITE_PREVIEW_DIST: distDir },
        cwd: process.cwd(),
      },
    );

    let settled = false;

    const tryResolve = (chunk: Buffer): void => {
      const text = chunk.toString();
      if (!settled && (text.includes(`localhost:${port}`) || text.includes(`${PREVIEW_HOST}:${port}`))) {
        settled = true;
        resolvePromise(proc);
      }
    };

    proc.stdout.on('data', tryResolve);
    proc.stderr.on('data', tryResolve);
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (!settled) {
        reject(new Error(`vite preview a quitté avec le code ${code ?? 'unknown'}`));
      }
    });

    setTimeout(() => {
      if (!settled) {
        proc.kill();
        reject(new Error('Timeout : vite preview ne répond pas après 45s'));
      }
    }, 45_000);
  });
}

async function waitForPrerenderReady(page: Page, route: string): Promise<void> {
  await page.waitForFunction(
    (expectedPath) => {
      const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      const footer = document.querySelector('footer');
      const main = document.querySelector('main');
      const h1 = document.querySelector('main h1');
      const mainTextLength = main?.textContent?.replace(/\s+/g, ' ').trim().length ?? 0;
      const canonicalHref = canonical?.href ?? '';

      const canonicalOk =
        expectedPath === '/'
          ? canonicalHref === 'https://natureclean.fr/' || canonicalHref === 'https://natureclean.fr'
          : canonicalHref.endsWith(expectedPath) || canonicalHref.endsWith(`${expectedPath}/`);

      return Boolean(footer && h1 && mainTextLength > 120 && canonicalOk);
    },
    { timeout: 90_000 },
    route,
  );
}

async function prerenderRoute(
  browser: Browser,
  distDir: string,
  previewUrl: string,
  route: string,
): Promise<void> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    await page.goto(`${previewUrl}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 120_000,
    });
    await waitForPrerenderReady(page, route);

    const html = await page.content();
    const outFile = routeToOutputFile(distDir, route);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, 'utf-8');
    console.log(`  ✓ ${route} → ${outFile.replace(`${distDir}/`, 'dist/')}`);
  } finally {
    await page.close();
  }
}

/** Lance le prerender SSG pour toutes les routes configurées. */
export async function runPrerender(options: PrerenderOptions): Promise<void> {
  const routes = options.routes ?? PRERENDER_ROUTES;
  const distDir = resolve(options.distDir);

  console.log(`\n🔨 [vite-plugin-prerender] ${routes.length} routes SSG…`);

  const previewPort = await findFreePort();
  const previewUrl = `http://${PREVIEW_HOST}:${previewPort}`;
  console.log(`   Preview : ${previewUrl}`);

  const preview = await startPreviewServer(distDir, previewPort);
  await new Promise((r) => setTimeout(r, 1500));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: puppeteer.executablePath(),
    timeout: 120_000,
    protocolTimeout: 120_000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    for (const route of routes) {
      await prerenderRoute(browser, distDir, previewUrl, route);
    }
  } finally {
    await browser.close();
    preview.kill('SIGKILL');
  }

  console.log(`✅ [vite-plugin-prerender] ${routes.length} fichiers HTML statiques générés\n`);
}
