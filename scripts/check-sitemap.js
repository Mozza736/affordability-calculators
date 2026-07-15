#!/usr/bin/env node
/**
 * check-sitemap.js
 * Verifies that every URL in vite-plugin-sitemap.ts has a matching route in App.tsx,
 * and that every data-driven slug is covered.
 * Run with: node scripts/check-sitemap.js
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

function readFile(path) {
  return readFileSync(path, 'utf8');
}

// ─── Extract static paths from vite-plugin-sitemap.ts ────────────────────────

const sitemapSrc = readFile(resolve('vite-plugin-sitemap.ts'));

// Extract all path: '...' strings from the staticRoutes array
const staticPathMatches = [...sitemapSrc.matchAll(/\bpath:\s*['"]([^'"]+)['"]/g)];
const sitemapStaticPaths = staticPathMatches.map(m => m[1]);

// ─── Extract routes handled in App.tsx ───────────────────────────────────────

const appSrc = readFile(resolve('src/App.tsx'));

// pathname === '/...' or pathname === '' style checks
const routeMatches = [...appSrc.matchAll(/pathname\s*===\s*['"]([^'"]*)['"]/g)];
const appRoutes = routeMatches.map(m => m[1]).filter(r => r !== '');

// Also detect data-array patterns (getSeoPageBySlug, getLocationPageBySlug, etc.)
const hasSeoLookup      = appSrc.includes('getSeoPageBySlug');
const hasLocationLookup = appSrc.includes('getLocationPageBySlug');
const hasTakeHomeLookup = appSrc.includes('getTakeHomePageBySlug');
const hasCarLookup      = appSrc.includes('getCarAffordabilityPageBySlug');

// ─── Check that every sitemap static path has a matching App.tsx route ────────

let errors = 0;
let warnings = 0;

console.log('\n── Static sitemap paths vs App.tsx routes ───────────────────');
let missingRoutes = 0;
for (const path of sitemapStaticPaths) {
  if (path === '/') {
    // '/' is handled by pathname === '' || pathname === '/'
    const ok = appSrc.includes("pathname === '/'") || appSrc.includes('pathname === ""');
    if (!ok) {
      console.error(`  ✗ No route for: ${path}`);
      errors++;
      missingRoutes++;
    } else {
      console.log(`  ✓ ${path}`);
    }
    continue;
  }
  if (appRoutes.includes(path)) {
    console.log(`  ✓ ${path}`);
  } else {
    console.error(`  ✗ No route found in App.tsx for: ${path}`);
    errors++;
    missingRoutes++;
  }
}
if (missingRoutes === 0) console.log('  ✓ All static paths have matching routes');

// ─── Check dynamic data arrays are used in App.tsx ───────────────────────────

console.log('\n── Dynamic data lookups in App.tsx ──────────────────────────');
const dynamicChecks = [
  { label: 'SEO pages (getSeoPageBySlug)',            ok: hasSeoLookup,      pattern: 'getSeoPageBySlug' },
  { label: 'Location pages (getLocationPageBySlug)',  ok: hasLocationLookup, pattern: 'getLocationPageBySlug' },
  { label: 'Take-home pages (getTakeHomePageBySlug)', ok: hasTakeHomeLookup, pattern: 'getTakeHomePageBySlug' },
  { label: 'Car pages (getCarAffordabilityPageBySlug)', ok: hasCarLookup,    pattern: 'getCarAffordabilityPageBySlug' },
];
for (const { label, ok } of dynamicChecks) {
  if (ok) {
    console.log(`  ✓ ${label}`);
  } else {
    console.error(`  ✗ Missing: ${label}`);
    errors++;
  }
}

// ─── Check sitemap contains key landmark URLs ─────────────────────────────────

console.log('\n── Required landmark URLs in sitemap ────────────────────────');
const requiredPaths = [
  '/',
  '/calculators',
  '/house-affordability',
  '/rent-affordability',
  '/car-affordability',
  '/savings-runway',
  '/how-long-will-my-savings-last',
  '/privacy-policy',
  '/terms',
];
for (const p of requiredPaths) {
  if (sitemapStaticPaths.includes(p)) {
    console.log(`  ✓ ${p}`);
  } else {
    console.error(`  ✗ Missing from sitemap: ${p}`);
    errors++;
  }
}

// ─── Check priority values are valid ─────────────────────────────────────────

console.log('\n── Sitemap priority values (must be 0.0–1.0) ───────────────');
const priorityMatches = [...sitemapSrc.matchAll(/priority:\s*['"]([^'"]+)['"]/g)];
let invalidPriority = 0;
for (const m of priorityMatches) {
  const v = parseFloat(m[1]);
  if (isNaN(v) || v < 0 || v > 1) {
    console.error(`  ✗ Invalid priority: "${m[1]}"`);
    errors++;
    invalidPriority++;
  }
}
if (invalidPriority === 0) console.log('  ✓ All priority values are valid');

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n─────────────────────────────────────────────────────────────`);
console.log(`  ${errors} error(s)  |  ${warnings} warning(s)`);
if (errors > 0) {
  console.error(`\nFAIL: ${errors} sitemap error(s) detected.\n`);
  process.exit(1);
} else {
  console.log(`\nPASS: Sitemap coverage check passed.\n`);
}
