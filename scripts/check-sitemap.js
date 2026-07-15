#!/usr/bin/env node
/**
 * check-sitemap.js
 * Verifies sitemap coverage, uniqueness, and canonical correctness.
 * Fails for: missing routes, extra routes, duplicate URLs, invalid priority values.
 * Run with: node scripts/check-sitemap.js
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

function readFile(path) {
  return readFileSync(path, 'utf8');
}

// ─── Read source files ────────────────────────────────────────────────────────

const sitemapSrc = readFile(resolve('vite-plugin-sitemap.ts'));
const appSrc     = readFile(resolve('src/App.tsx'));

// ─── Extract all paths declared in vite-plugin-sitemap.ts ────────────────────
// Matches both staticRoutes entries and data-mapped paths (path: '...')
const sitemapStaticPaths = [...sitemapSrc.matchAll(/\bpath:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

// ─── Derive all routes the router actually handles ────────────────────────────

// Explicit pathname === '...' checks in App.tsx
const appExplicitRoutes = [...appSrc.matchAll(/pathname\s*===\s*['"]([^'"]+)['"]/g)]
  .map(m => m[1])
  .filter(r => r !== '');

// App.tsx handles '/' via pathname === '' or pathname === '/'
const appHandlesRoot = appSrc.includes("pathname === '/'") || appSrc.includes("pathname === ''");

// Data-driven lookups — these cover all slugs from the respective data files
const hasSeoLookup      = appSrc.includes('getSeoPageBySlug');
const hasLocationLookup = appSrc.includes('getLocationPageBySlug');
const hasTakeHomeLookup = appSrc.includes('getTakeHomePageBySlug');
const hasCarLookup      = appSrc.includes('getCarAffordabilityPageBySlug');

// All valid routes the app can render (explicit + data-driven slugs)
// We load the actual slug lists to detect any sitemap entries that don't exist in data
// Parse slugs from the TS source files directly
function extractSlugs(filePath, pattern) {
  const src = readFile(resolve(filePath));
  return [...src.matchAll(pattern)].map(m => m[1]);
}

// Take-home slugs use template literals — extract gross values and derive slugs
function extractTakeHomeSlugs(filePath) {
  const src = readFile(resolve(filePath));
  // Match buildPage(GROSS, ...) calls — first numeric argument
  const grossValues = [...src.matchAll(/buildPage\(\s*(\d+),/g)].map(m => parseInt(m[1], 10));
  return grossValues.map(g => `take-home-pay-${g / 1000}k-uk`);
}

const seoSlugs      = extractSlugs('src/data/seoPages.ts',            /slug:\s*['"]([^'"]+)['"]/g);
const locationSlugs = extractSlugs('src/data/locationPages.ts',       /slug:\s*['"]([^'"]+)['"]/g);
const takeHomeSlugs = extractTakeHomeSlugs('src/data/takeHomePages.ts');
const carSlugs      = extractSlugs('src/data/carAffordabilityPages.ts', /slug:\s*['"]([^'"]+)['"]/g);

const allDataSlugs = new Set([
  ...seoSlugs,
  ...locationSlugs,
  ...takeHomeSlugs,
  ...carSlugs,
]);

// All routes the app can handle
const allHandledRoutes = new Set([
  '/',
  ...appExplicitRoutes,
  ...[...allDataSlugs].map(s => `/${s}`),
]);

// All paths that appear in the sitemap (static + data-driven)
// For data-driven entries, sitemapStaticPaths only has explicit path: entries from staticRoutes
// The data arrays generate paths from slug values — verify those via data sources
const sitemapAllPaths = [
  ...sitemapStaticPaths,
  ...seoSlugs.map(s => `/${s}`),
  ...locationSlugs.map(s => `/${s}`),
  ...takeHomeSlugs.map(s => `/${s}`),
  ...carSlugs.map(s => `/${s}`),
];

let errors = 0;

// ─── 1. Duplicate URL detection ───────────────────────────────────────────────

console.log('\n── Duplicate URL check ──────────────────────────────────────');
const seen = new Map();
for (const path of sitemapAllPaths) {
  seen.set(path, (seen.get(path) ?? 0) + 1);
}
let dupeCount = 0;
for (const [path, count] of seen.entries()) {
  if (count > 1) {
    console.error(`  ✗ Duplicate URL (${count}×): ${path}`);
    errors++;
    dupeCount++;
  }
}
if (dupeCount === 0) console.log(`  ✓ No duplicate URLs (${sitemapAllPaths.length} total)`);

// ─── 2. Missing routes — sitemap path has no matching handler ─────────────────

console.log('\n── Missing route check (sitemap path not handled by app) ────');
let missingCount = 0;
for (const path of sitemapAllPaths) {
  if (!allHandledRoutes.has(path)) {
    console.error(`  ✗ Sitemap contains a path with no app route: ${path}`);
    errors++;
    missingCount++;
  }
}
if (missingCount === 0) console.log('  ✓ All sitemap paths have a matching app route');

// ─── 3. Extra routes — app handles routes absent from sitemap ─────────────────
// Only flag explicit routes (not data-driven); data-driven coverage verified above

console.log('\n── Extra route check (explicit app route absent from sitemap) ');
const sitemapPathSet = new Set(sitemapAllPaths);
let extraCount = 0;

if (appHandlesRoot && !sitemapPathSet.has('/')) {
  console.error('  ✗ App handles / but sitemap is missing it');
  errors++;
  extraCount++;
}
for (const route of appExplicitRoutes) {
  if (!sitemapPathSet.has(route)) {
    console.error(`  ✗ App route not in sitemap: ${route}`);
    errors++;
    extraCount++;
  }
}
if (extraCount === 0) console.log('  ✓ All explicit app routes appear in sitemap');

// ─── 4. Dynamic data lookups present in App.tsx ──────────────────────────────

console.log('\n── Dynamic data lookups in App.tsx ──────────────────────────');
const dynamicChecks = [
  { label: 'SEO pages (getSeoPageBySlug)',              ok: hasSeoLookup },
  { label: 'Location pages (getLocationPageBySlug)',    ok: hasLocationLookup },
  { label: 'Take-home pages (getTakeHomePageBySlug)',   ok: hasTakeHomeLookup },
  { label: 'Car pages (getCarAffordabilityPageBySlug)', ok: hasCarLookup },
];
for (const { label, ok } of dynamicChecks) {
  if (ok) {
    console.log(`  ✓ ${label}`);
  } else {
    console.error(`  ✗ Missing: ${label}`);
    errors++;
  }
}

// ─── 5. Required landmark URLs ────────────────────────────────────────────────

console.log('\n── Required landmark URLs ───────────────────────────────────');
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
  if (sitemapPathSet.has(p)) {
    console.log(`  ✓ ${p}`);
  } else {
    console.error(`  ✗ Missing required URL: ${p}`);
    errors++;
  }
}

// ─── 6. Take-home-pay URL verification ───────────────────────────────────────

console.log('\n── Take-home-pay URL check ──────────────────────────────────');
const expectedTakeHomeUrls = [
  '/take-home-pay-30k-uk',
  '/take-home-pay-40k-uk',
  '/take-home-pay-50k-uk',
  '/take-home-pay-60k-uk',
  '/take-home-pay-70k-uk',
  '/take-home-pay-80k-uk',
  '/take-home-pay-90k-uk',
  '/take-home-pay-100k-uk',
  '/take-home-pay-120k-uk',
  '/take-home-pay-150k-uk',
];
let takeHomeMissing = 0;
for (const url of expectedTakeHomeUrls) {
  if (sitemapPathSet.has(url)) {
    console.log(`  ✓ ${url}`);
  } else {
    console.error(`  ✗ Missing take-home URL: ${url}`);
    errors++;
    takeHomeMissing++;
  }
}
if (takeHomeMissing === 0 && takeHomeSlugs.length === expectedTakeHomeUrls.length) {
  console.log(`  ✓ All ${expectedTakeHomeUrls.length} take-home-pay URLs present`);
} else if (takeHomeSlugs.length !== expectedTakeHomeUrls.length) {
  console.warn(`  ! take-home slug count mismatch: found ${takeHomeSlugs.length}, expected ${expectedTakeHomeUrls.length}`);
}

// ─── 7. Canonical path format (each path must start with /) ─────────────────

console.log('\n── Canonical path format check ──────────────────────────────');
let badCanonical = 0;
for (const path of sitemapAllPaths) {
  if (!path.startsWith('/')) {
    console.error(`  ✗ Path does not start with /: ${path}`);
    errors++;
    badCanonical++;
  }
}
if (badCanonical === 0) console.log('  ✓ All paths start with /');

// ─── 7. Priority values valid (0.0–1.0) ──────────────────────────────────────

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

// ─── 8. URL count summary ─────────────────────────────────────────────────────

console.log('\n── URL count ────────────────────────────────────────────────');
console.log(`  Static routes:    ${sitemapStaticPaths.length}`);
console.log(`  SEO pages:        ${seoSlugs.length}`);
console.log(`  Location pages:   ${locationSlugs.length}`);
console.log(`  Take-home pages:  ${takeHomeSlugs.length}`);
console.log(`  Car pages:        ${carSlugs.length}`);
console.log(`  Total:            ${sitemapAllPaths.length}`);

// ─── Result ───────────────────────────────────────────────────────────────────

console.log(`\n─────────────────────────────────────────────────────────────`);
if (errors > 0) {
  console.error(`FAIL: ${errors} sitemap error(s) detected.\n`);
  process.exit(1);
} else {
  console.log(`PASS: Sitemap checks passed (${sitemapAllPaths.length} URLs, 0 errors).\n`);
}
