#!/usr/bin/env node
/**
 * check-prerender.js
 * Validates every pre-rendered HTML file produced by scripts/prerender.js.
 *
 * Fails if any route:
 *   - is missing <title>, <meta name="description">, or <link rel="canonical">
 *   - has more than one canonical tag
 *   - has a canonical href that does not match the expected route URL
 *   - has homepage metadata (title/description) on a non-root route
 *   - has an effectively empty <div id="root">
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE_URL = 'https://affordabilitycalculators.co.uk';

// ─── Load route metadata from the prerender-routes SSR bundle ────────────────
const ssrBundle = resolve(root, 'dist-ssr/entry-server.js');

if (!existsSync(ssrBundle)) {
  console.error('SSR bundle not found at dist-ssr/entry-server.js');
  console.error('Run `npx vite build --mode ssr` first (or `npm run prerender`).');
  process.exit(1);
}

const ssrModule = await import(ssrBundle);
const allRoutes = ssrModule.ALL_ROUTES;

if (!allRoutes || allRoutes.length === 0) {
  console.error('ALL_ROUTES not exported from SSR bundle.');
  process.exit(1);
}

// ─── Homepage sentinel values (must NOT appear on other routes) ───────────────
const HOMEPAGE_TITLE = 'UK Affordability Calculator – What Can You Really Afford? (2026)';
const HOMEPAGE_DESCRIPTION = 'Find out exactly what you can afford in 2026. Free UK calculators for house, rent, car, and savings — instant results based on your salary and outgoings.';

// ─── Specific routes required to pass individual spot-checks ─────────────────
const SPOT_CHECK_PATHS = [
  '/',
  '/car-affordability',
  '/house-affordability',
  '/take-home-pay-50k-uk',
  '/can-i-afford-350k-house-on-50k-salary-uk',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1] : null;
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  return m ? m[1] : null;
}

function extractCanonicals(html) {
  const re = /<link\s[^>]*rel="canonical"[^>]*>/g;
  const tags = [];
  let match;
  while ((match = re.exec(html)) !== null) {
    tags.push(match[0]);
  }
  return tags;
}

function extractCanonicalHref(tag) {
  const m = tag.match(/href="([^"]*)"/);
  return m ? m[1] : null;
}

function extractRootContent(html) {
  const idx = html.indexOf('<div id="root">');
  if (idx === -1) return '';
  return html.slice(idx + '<div id="root">'.length);
}

function htmlFilePath(routePath) {
  return routePath === '/'
    ? resolve(root, 'dist/index.html')
    : resolve(root, `dist${routePath}/index.html`);
}

// ─── Main validation loop ─────────────────────────────────────────────────────

console.log(`\n── Checking pre-rendered HTML for ${allRoutes.length} routes ────────────────────`);

let errors = 0;
let checked = 0;
const spotCheckResults = {};

for (const route of allRoutes) {
  const filePath = htmlFilePath(route.path);
  const routeErrors = [];

  if (!existsSync(filePath)) {
    console.error(`  ✗ [MISSING FILE] ${route.path} → ${filePath}`);
    errors++;
    continue;
  }

  const html = readFileSync(filePath, 'utf8');

  // 1. Title present
  const title = extractTitle(html);
  if (!title || title.trim().length === 0) {
    routeErrors.push('missing <title>');
  }

  // 2. Meta description present
  const description = extractDescription(html);
  if (!description || description.trim().length === 0) {
    routeErrors.push('missing <meta name="description">');
  }

  // 3. Canonical checks
  const canonicalTags = extractCanonicals(html);
  if (canonicalTags.length === 0) {
    routeErrors.push('missing <link rel="canonical">');
  } else if (canonicalTags.length > 1) {
    routeErrors.push(`${canonicalTags.length} canonical tags (expected 1)`);
  } else {
    const href = extractCanonicalHref(canonicalTags[0]);
    const expectedCanonical = route.canonical || `${BASE_URL}${route.path}`;
    if (href !== expectedCanonical) {
      routeErrors.push(`canonical mismatch: got "${href}", expected "${expectedCanonical}"`);
    }
  }

  // 4. Homepage metadata must not appear on other routes
  if (route.path !== '/') {
    if (title === HOMEPAGE_TITLE) {
      routeErrors.push('homepage title found on non-root route');
    }
    if (description === HOMEPAGE_DESCRIPTION) {
      routeErrors.push('homepage description found on non-root route');
    }
  }

  // 5. Root div must not be effectively empty
  const rootContent = extractRootContent(html);
  // "effectively empty" = stripped content under 50 chars
  if (rootContent.replace(/<[^>]+>/g, '').trim().length < 50) {
    routeErrors.push('<div id="root"> is effectively empty');
  }

  if (routeErrors.length > 0) {
    console.error(`  ✗ ${route.path}`);
    for (const e of routeErrors) {
      console.error(`      → ${e}`);
    }
    errors += routeErrors.length;
  }

  // Record spot-check routes for summary
  if (SPOT_CHECK_PATHS.includes(route.path)) {
    spotCheckResults[route.path] = {
      errors: routeErrors,
      title,
      description,
      canonical: canonicalTags.length === 1 ? extractCanonicalHref(canonicalTags[0]) : canonicalTags.map(extractCanonicalHref),
    };
  }

  checked++;
}

// ─── Spot-check summary ───────────────────────────────────────────────────────

console.log('\n── Spot-check: named routes ─────────────────────────────────────────────');

for (const path of SPOT_CHECK_PATHS) {
  const r = spotCheckResults[path];
  if (!r) {
    console.error(`  ✗ ${path} — not found in allRoutes`);
    errors++;
    continue;
  }
  if (r.errors.length > 0) {
    console.error(`  ✗ ${path} — ${r.errors.join('; ')}`);
  } else {
    const titleSnip = (r.title || '').substring(0, 60);
    const canonicalStr = Array.isArray(r.canonical) ? r.canonical.join(', ') : r.canonical;
    console.log(`  ✓ ${path}`);
    console.log(`      title:     ${titleSnip}${(r.title || '').length > 60 ? '…' : ''}`);
    console.log(`      canonical: ${canonicalStr}`);
  }
}

// ─── FAQ schema vs visible content check ─────────────────────────────────────

console.log('\n── FAQ schema vs visible content ────────────────────────────────────────────');

const carFilePath = resolve(root, 'dist/car-affordability/index.html');
if (!existsSync(carFilePath)) {
  console.error('  ✗ dist/car-affordability/index.html not found — run npm run build');
  errors++;
} else {
  const carHtml = readFileSync(carFilePath, 'utf8');

  // Extract all JSON-LD blocks
  const ldBlocks = [];
  const ldRe = /<script type="application\/ld\+json">([^<]+)<\/script>/g;
  let ldMatch;
  while ((ldMatch = ldRe.exec(carHtml)) !== null) {
    try { ldBlocks.push(JSON.parse(ldMatch[1])); } catch { /* skip malformed */ }
  }

  const faqSchema = ldBlocks.find((b) => b['@type'] === 'FAQPage');
  if (!faqSchema) {
    console.error('  ✗ No FAQPage JSON-LD found in dist/car-affordability/index.html');
    errors++;
  } else {
    const schemaQuestions = (faqSchema.mainEntity || []).map((e) => e.name);
    const schemaAnswers   = (faqSchema.mainEntity || []).map((e) => e.acceptedAnswer?.text ?? '');

    let faqErrors = 0;

    // Every schema question must appear as visible text in the HTML
    for (let i = 0; i < schemaQuestions.length; i++) {
      const q = schemaQuestions[i];
      if (!carHtml.includes(q)) {
        console.error(`  ✗ FAQ schema question not found in visible HTML:`);
        console.error(`      "${q}"`);
        faqErrors++;
        errors++;
      }
    }

    // Every schema answer must appear as visible text in the HTML
    for (let i = 0; i < schemaAnswers.length; i++) {
      const a = schemaAnswers[i];
      if (a && !carHtml.includes(a)) {
        console.error(`  ✗ FAQ schema answer not found in visible HTML (question ${i + 1}):`);
        console.error(`      "${a.substring(0, 80)}…"`);
        faqErrors++;
        errors++;
      }
    }

    // Count how many schema questions appear as <h3> elements (FAQ-specific check)
    const faqH3Count = schemaQuestions.filter((q) => {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`<h3[^>]*>${escaped}<\\/h3>`).test(carHtml);
    }).length;

    if (faqH3Count !== schemaQuestions.length) {
      console.error(`  ✗ Only ${faqH3Count}/${schemaQuestions.length} schema questions found as <h3> elements`);
      faqErrors++;
      errors++;
    }

    if (faqErrors === 0) {
      console.log(`  ✓ All ${schemaQuestions.length} FAQ questions and answers match between schema and visible HTML`);
    }
  }
}

// ─── Final result ─────────────────────────────────────────────────────────────

console.log(`\n  Checked: ${checked} / ${allRoutes.length}  |  Errors: ${errors}`);

if (errors > 0) {
  console.error(`\nCHECK:PRERENDER FAIL — ${errors} error(s) found.\n`);
  process.exit(1);
} else {
  console.log(`\nCHECK:PRERENDER PASS — all ${checked} routes are valid.\n`);
}
