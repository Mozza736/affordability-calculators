import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitemapPlugin } from './vite-plugin-sitemap';

export default defineConfig(({ mode }) => ({
  plugins: mode === 'ssr' ? [react()] : [react(), sitemapPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ...(mode === 'ssr' && {
    build: {
      ssr: true,
      rollupOptions: {
        input: 'src/entry-server.tsx',
        output: { entryFileNames: 'entry-server.js' },
      },
      outDir: 'dist-ssr',
    },
  }),
}));
