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
    rollupOptions: {
      output: {
        // Découpage manuel pour sortir les grosses librairies du bundle principal
        // → réduit le JS critique qui bloque le thread principal (TBT)
        manualChunks(id) {
          // React core → chunk stable, mis en cache indépendamment
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          // React Router
          if (id.includes('/node_modules/react-router')) {
            return 'vendor-router';
          }
          // Radix UI primitives (utilisés par shadcn/ui)
          // Chunk SÉPARÉ intentionnellement : produit des tâches JS plus courtes
          // → chaque chunk < 50ms de parse → contribue moins au TBT
          if (id.includes('/node_modules/@radix-ui/')) {
            return 'vendor-radix';
          }
          // lucide-react est lourd (icônes SVG) — chunk séparé
          if (id.includes('/node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
        },
      },
    },
  },
})