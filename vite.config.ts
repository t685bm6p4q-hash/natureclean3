import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from './scripts/vite-plugin-prerender'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    vitePrerenderPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        // Découpage manuel pour sortir les grosses librairies du bundle principal
        // → réduit le JS critique qui bloque le thread principal (TBT)
        manualChunks(id) {
          if (id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('/node_modules/react-router')) {
            return 'vendor-router';
          }
          if (id.includes('/node_modules/@radix-ui/')) {
            return 'vendor-radix';
          }
          if (id.includes('/node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          if (
            id.includes('/node_modules/clsx/') ||
            id.includes('/node_modules/class-variance-authority/') ||
            id.includes('/node_modules/tailwind-merge/')
          ) {
            return 'vendor-ui-utils';
          }
          if (id.includes('/node_modules/zod/')) {
            return 'vendor-zod';
          }
        },
      },
    },
  },
})