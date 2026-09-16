/**
 * Moteur de prerender SSG — capture le DOM React via Puppeteer après vite build.
 * Utilisé par le plugin Vite (closeBundle) et par `npm run prerender`.
 */

import { createServer as createHttpServer, type Server } from 'node:http';
import { createServer } from 'node:net';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { dirname, resolve } from 'node:path';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { PRERENDER_ROUTES } from '../src/app/config/prerender-routes';

const PUPPETEER_LAUNCH_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
] as const;

async function launchPrerenderBrowser(): Promise<Browser> {
  if (process.env.VERCEL === '1') {
    const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
      import('@sparticuz/chromium'),
      import('puppeteer-core'),
    ]);

    return puppeteerCore.launch({
      args: [...chromium.args, ...PUPPETEER_LAUNCH_ARGS],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
      timeout: 120_000,
      protocolTimeout: 120_000,
    });
  }

  return puppeteer.launch({
    headless: true,
    executablePath: puppeteer.executablePath(),
    timeout: 120_000,
    protocolTimeout: 120_000,
    args: [...PUPPETEER_LAUNCH_ARGS],
  });
}

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

const MIME_TYPES: Readonly<Record<string, string>> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

function resolveStaticFile(distDir: string, urlPath: string): string | null {
  const normalizedPath = urlPath.split('?')[0] ?? '/';
  const relativePath = normalizedPath === '/' ? 'index.html' : normalizedPath.replace(/^\//, '');
  const directPath = join(distDir, relativePath);

  if (existsSync(directPath) && statSync(directPath).isFile()) {
    return directPath;
  }

  const spaFallback = join(distDir, 'index.html');
  return existsSync(spaFallback) ? spaFallback : null;
}

/** Serveur statique local — plus fiable que `vite preview` sur Vercel CI. */
function startPreviewServer(distDir: string, port: number): Promise<Server> {
  return new Promise((resolvePromise, reject) => {
    const server = createHttpServer((request, response) => {
      const filePath = resolveStaticFile(distDir, request.url ?? '/');

      if (!filePath) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
      }

      const body = readFileSync(filePath);
      const contentType = MIME_TYPES[extname(filePath)] ?? 'application/octet-stream';
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(body);
    });

    server.on('error', reject);
    server.listen(port, PREVIEW_HOST, () => {
      resolvePromise(server);
    });
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

      // /devis n'a pas de footer (layout conversion) — h1 + contenu suffisent.
      const chromeOk = expectedPath === '/devis' ? Boolean(h1) : Boolean(footer && h1);

      return Boolean(chromeOk && mainTextLength > 120 && canonicalOk);
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

/**
 * Capture la page 404 React (noindex, canonical accueil) dans dist/404.html.
 * Vercel sert ce fichier avec un vrai HTTP 404 dès qu'aucune route statique
 * ni rewrite /admin|/api ne correspond.
 */
const NOT_FOUND_CAPTURE_PATH = '/__not-found__';

async function prerenderNotFoundPage(
  browser: Browser,
  distDir: string,
  previewUrl: string,
): Promise<void> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    await page.goto(`${previewUrl}${NOT_FOUND_CAPTURE_PATH}`, {
      waitUntil: 'networkidle0',
      timeout: 120_000,
    });
    await page.waitForFunction(() => {
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
      const canonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href ?? '';
      const h1 = document.querySelector('main h1')?.textContent ?? '';
      return (
        robots.includes('noindex') &&
        (canonical === 'https://natureclean.fr/' || canonical === 'https://natureclean.fr') &&
        h1.includes('404')
      );
    }, { timeout: 90_000 });

    const html = await page.content();
    const outFile = resolve(distDir, '404.html');
    writeFileSync(outFile, html, 'utf-8');
    console.log('  ✓ 404.html → dist/404.html (HTTP 404 Vercel)');
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

  const browser = await launchPrerenderBrowser();

  try {
    for (const route of routes) {
      await prerenderRoute(browser, distDir, previewUrl, route);
    }
    await prerenderNotFoundPage(browser, distDir, previewUrl);
  } finally {
    await browser.close();
    await new Promise<void>((resolveClose, rejectClose) => {
      preview.close((error) => {
        if (error) {
          rejectClose(error);
          return;
        }
        resolveClose();
      });
    });
  }

  console.log(`✅ [vite-plugin-prerender] ${routes.length} pages + 404.html générés\n`);
}
