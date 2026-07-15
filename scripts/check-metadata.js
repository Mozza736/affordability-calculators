#!/usr/bin/env node
/**
 * check-metadata.js
 * Detects duplicate page titles and meta descriptions across all page components.
 * Reads usePageTitle() call arguments from source files via AST-free regex parsing.
 * Run with: node scripts/check-metadata.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const PAGES_DIR = resolve('src/pages');
const DATA_DIR  = resolve('src/data');

// ─── Collect metadata from page source files ──────────────────────────────────

function readFile(path) {
  try { return readFileSync(path, 'utf8'); } catch { return ''; }
}

function extractStringArg(src, afterKeyword) {
  // Extracts the first quoted string (single or double, possibly template-literal-adjacent)
  // after `afterKeyword` in `src`. Returns null if not found.
  const idx = src.indexOf(afterKeyword);
  if (idx === -1) return null;
  const chunk = src.slice(idx + afterKeyword.length, idx + afterKeyword.length + 400);
  const m = chunk.match(/^\s*[\n,]?\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

// Collects all { file, title, description } from pages/
function collectFromPages() {
  const results = [];
  const files = readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));

  for (const file of files) {
    const src = readFile(join(PAGES_DIR, file));
    // Find all usePageTitle( calls
    const regex = /usePageTitle\(\s*/g;
    let m;
    while ((m = regex.exec(src)) !== null) {
      const chunk = src.slice(m.index, m.index + 600);
      // Extract first string arg (title)
      const titleMatch = chunk.match(/usePageTitle\(\s*(?:metaTitle|META_TITLE|title|page\.metaTitle)?([,\s]*['"]([^'"]+)['"])?/);
      // Try to parse the raw args more reliably
      const argsChunk = chunk.slice('usePageTitle('.length);
      const args = parseStringArgs(argsChunk);
      if (args.length > 0) {
        results.push({
          file,
          title: args[0] || '(dynamic)',
          description: args[1] || '(dynamic)',
          isDynamic: !args[0],
        });
      }
    }
  }
  return results;
}

// Very simple string-arg extractor: reads quoted strings from a JS call argument list
function parseStringArgs(chunk) {
  const args = [];
  let i = 0;
  let depth = 0;
  while (i < chunk.length && args.length < 2) {
    const ch = chunk[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') {
      if (depth === 0) break;
      depth--;
    } else if ((ch === '"' || ch === "'") && depth === 0) {
      let j = i + 1;
      while (j < chunk.length && chunk[j] !== ch) {
        if (chunk[j] === '\\') j++;
        j++;
      }
      args.push(chunk.slice(i + 1, j));
      i = j;
    } else if (ch === '`' && depth === 0) {
      // Template literal — skip, mark as dynamic
      args.push('(dynamic)');
      let j = i + 1;
      while (j < chunk.length && chunk[j] !== '`') j++;
      i = j;
    }
    i++;
  }
  return args;
}

// Also harvest static metaTitle / metaDescription strings from data files
function collectFromData() {
  const results = [];
  const files = readdirSync(DATA_DIR).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const src = readFile(join(DATA_DIR, file));
    const titleMatches = [...src.matchAll(/metaTitle:\s*['"]([^'"\\]|\\[\s\S])*['"]/g)].map(m => m[0].replace(/^metaTitle:\s*['"]/, '').replace(/['"]$/, '').replace(/\\'/g, "'"));
    const descMatches  = [...src.matchAll(/metaDescription:\s*\n\s*['"]([^'"\\]|\\[\s\S])*['"]/g)].map(m => {
      return m[0].replace(/^metaDescription:\s*\n\s*['"]/, '').replace(/['"]$/, '').replace(/\\'/g, "'");
    });
    const titleMatchesRaw = [...src.matchAll(/metaTitle:\s*['"]([^'"]+)['"]/g)];
    const descMatchesRaw  = [...src.matchAll(/metaDescription:\s*\n?\s*['"]([^'"\\]|\\[^])*['"]/g)];
    titleMatchesRaw.forEach((m, i) => {
      const rawDesc = descMatchesRaw[i]?.[0] ?? '';
      const cleanDesc = rawDesc
        .replace(/^metaDescription:\s*\n?\s*['"]/, '')
        .replace(/['"]$/, '')
        .replace(/\\'/g, "'");
      results.push({
        file: `data/${file}`,
        title: m[1],
        description: cleanDesc || '(none)',
        isDynamic: false,
      });
    });
  }
  return results;
}

const pageEntries = collectFromPages();
const dataEntries = collectFromData();

// Filter to only static (non-dynamic) entries for dupe checking
const staticEntries = [
  ...pageEntries.filter(e => !e.isDynamic),
  ...dataEntries,
];

// ─── Duplicate detection ──────────────────────────────────────────────────────

let errors = 0;
let warnings = 0;

// Titles
const titleMap = {};
for (const e of staticEntries) {
  if (!e.title || e.title === '(dynamic)') continue;
  const key = e.title.trim().toLowerCase();
  if (!titleMap[key]) titleMap[key] = [];
  titleMap[key].push(e.file);
}

console.log('\n── Title uniqueness ─────────────────────────────────────────');
let titleDupes = 0;
for (const [title, files] of Object.entries(titleMap)) {
  if (files.length > 1) {
    console.error(`  ✗ DUPLICATE title found in: ${files.join(', ')}`);
    console.error(`    "${title}"`);
    errors++;
    titleDupes++;
  }
}
if (titleDupes === 0) console.log('  ✓ No duplicate titles found');

// Descriptions
const descMap = {};
for (const e of staticEntries) {
  if (!e.description || e.description === '(dynamic)' || e.description === '(none)') continue;
  const key = e.description.trim().toLowerCase();
  if (!descMap[key]) descMap[key] = [];
  descMap[key].push(e.file);
}

console.log('\n── Description uniqueness ───────────────────────────────────');
let descDupes = 0;
for (const [desc, files] of Object.entries(descMap)) {
  if (files.length > 1) {
    console.error(`  ✗ DUPLICATE description found in: ${files.join(', ')}`);
    console.error(`    "${desc.slice(0, 80)}..."`);
    errors++;
    descDupes++;
  }
}
if (descDupes === 0) console.log('  ✓ No duplicate descriptions found');

// ─── Missing metadata ─────────────────────────────────────────────────────────
console.log('\n── Missing metadata ─────────────────────────────────────────');
const allPageFiles = readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
let missing = 0;
for (const file of allPageFiles) {
  const src = readFile(join(PAGES_DIR, file));
  if (!src.includes('usePageTitle(')) {
    console.warn(`  ! No usePageTitle() found in ${file}`);
    warnings++;
    missing++;
  }
}
if (missing === 0) console.log('  ✓ All page files call usePageTitle()');

// ─── Title length check ───────────────────────────────────────────────────────
console.log('\n── Title length (30–70 chars recommended) ───────────────────');
let lengthWarnings = 0;
for (const e of staticEntries) {
  if (!e.title || e.title === '(dynamic)') continue;
  if (e.title.length < 30 || e.title.length > 70) {
    console.warn(`  ! ${e.file}: title length ${e.title.length} — "${e.title}"`);
    warnings++;
    lengthWarnings++;
  }
}
if (lengthWarnings === 0) console.log('  ✓ All titles within recommended length range');

// ─── Description length check ─────────────────────────────────────────────────
console.log('\n── Description length (120–160 chars recommended) ───────────');
let descLengthWarnings = 0;
for (const e of staticEntries) {
  if (!e.description || e.description === '(dynamic)' || e.description === '(none)') continue;
  if (e.description.length < 100 || e.description.length > 165) {
    console.warn(`  ! ${e.file}: desc length ${e.description.length}`);
    warnings++;
    descLengthWarnings++;
  }
}
if (descLengthWarnings === 0) console.log('  ✓ All descriptions within recommended length range');

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n─────────────────────────────────────────────────────────────`);
console.log(`  ${errors} error(s)  |  ${warnings} warning(s)`);
if (errors > 0) {
  console.error(`\nFAIL: ${errors} metadata error(s) detected.\n`);
  process.exit(1);
} else {
  const warnNote = warnings > 0 ? ` (${warnings} warnings — review above)` : '';
  console.log(`\nPASS: No duplicate metadata errors found.${warnNote}\n`);
}
