import type { Plugin } from 'vite';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname);

export function prerenderPlugin(): Plugin {
  return {
    name: 'vite-plugin-prerender',
    apply: 'build',
    closeBundle: {
      // 'post' order: runs after all other closeBundle hooks (including sitemapPlugin)
      // sequential: ensures no parallel interference with asset writes
      order: 'post',
      sequential: true,
      async handler() {
        console.log('\n── Prerender plugin: generating route HTML files ────────');
        execSync('node scripts/prerender.js', { cwd: root, stdio: 'inherit' });
      },
    },
  };
}
