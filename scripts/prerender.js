#!/usr/bin/env node
/**
 * prerender.js
 * SSR pre-renders every public route into dist/{route}/index.html.
 * Run after `vite build` (client) and `vite build --mode ssr` (server bundle).
 *
 * Each generated file contains the correct title, meta description,
 * canonical URL, H1, and JSON-LD before JavaScript loads.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ─── 1. Build SSR bundle ──────────────────────────────────────────────────────
console.log('\n── Building SSR bundle ──────────────────────────────────────');
execSync('npx vite build --mode ssr', { cwd: root, stdio: 'inherit' });

// ─── 2. Load template and SSR bundle ─────────────────────────────────────────
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
const ssrBundle = resolve(root, 'dist-ssr/entry-server.js');

if (!existsSync(ssrBundle)) {
  console.error('SSR bundle not found at dist-ssr/entry-server.js');
  process.exit(1);
}

const { render } = await import(ssrBundle);

// ─── 3. Load route metadata from SSR bundle exports ─────────────────────────
// The prerender-routes module is bundled into the SSR output; import separately.
const routesBundle = resolve(root, 'dist-ssr/entry-server.js');
// ALL_ROUTES is re-exported through a dedicated SSR routes export
// We load it via a dynamic import of the TS source compiled by the SSR build.
// Actually we need to import it from the same bundle — re-export it from entry-server.tsx.

// Load routes by importing the SSR bundle which re-exports ALL_ROUTES
const ssrModule = await import(ssrBundle);
const allRoutes = ssrModule.ALL_ROUTES;

if (!allRoutes || allRoutes.length === 0) {
  console.error('ALL_ROUTES not exported from SSR bundle. Ensure entry-server.tsx exports it.');
  process.exit(1);
}

console.log(`\n── Pre-rendering ${allRoutes.length} routes ─────────────────────────────`);

let rendered = 0;
let errors = 0;

for (const route of allRoutes) {
  try {
    // Render the React app for this pathname
    const appHtml = render(route.path);

    // Build <head> injection: title, description, canonical, JSON-LD
    const jsonLdTags = (route.jsonLd || [])
      .map((schema) => `  <script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join('\n');

    // Replace placeholder tags in the template
    let html = template
      // Title
      .replace(
        /<title>[^<]*<\/title>/,
        `<title>${escapeHtml(route.title)}</title>`
      )
      // Meta description (update existing tag)
      .replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${escapeHtml(route.description)}"`
      )
      // Canonical (inject or replace — template has none after our earlier fix)
      .replace(
        '</head>',
        `  <link rel="canonical" href="${route.canonical}" />\n${jsonLdTags ? jsonLdTags + '\n' : ''}</head>`
      )
      // Inject rendered app HTML
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Write to dist/{route}/index.html  (root → dist/index.html)
    const outPath = route.path === '/'
      ? resolve(root, 'dist/index.html')
      : resolve(root, `dist${route.path}/index.html`);

    const outDir = dirname(outPath);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, html, 'utf8');

    rendered++;
    if (rendered % 10 === 0 || rendered <= 5) {
      console.log(`  ✓ [${rendered}/${allRoutes.length}] ${route.path}`);
    }
  } catch (err) {
    console.error(`  ✗ Failed to render ${route.path}: ${err.message}`);
    errors++;
  }
}

console.log(`\n  Rendered: ${rendered}  |  Errors: ${errors}`);

if (errors > 0) {
  console.error(`\nPREREND FAIL: ${errors} route(s) failed.\n`);
  process.exit(1);
} else {
  console.log(`\nPREREND PASS: ${rendered} routes pre-rendered successfully.\n`);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
