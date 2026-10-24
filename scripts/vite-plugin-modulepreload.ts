/**
 * Injecte modulepreload pour index + vendor-react (réduit le délai avant exécution JS).
 */
import type { Plugin } from 'vite';

export function viteModulePreloadPlugin(): Plugin {
  let base = '/';

  return {
    name: 'vite-module-preload',
    apply: 'build',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const hrefs: string[] = [];
        for (const chunk of Object.values(ctx.bundle)) {
          if (chunk.type !== 'chunk') continue;
          const name = chunk.fileName;
          if (
            /\/index-[^/]+\.js$/.test(name) ||
            /\/vendor-react-[^/]+\.js$/.test(name)
          ) {
            hrefs.push(`${base}${name}`.replace(/\/{2,}/g, '/'));
          }
        }

        if (hrefs.length === 0) return html;

        const tags = hrefs
          .map(
            (href) =>
              `<link rel="modulepreload" crossorigin href="${href}">`,
          )
          .join('\n    ');

        return html.replace('</head>', `    ${tags}\n  </head>`);
      },
    },
  };
}
