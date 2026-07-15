# AGENTS.md — affordabilitycalculators.co.uk

## Purpose and Objective

**affordabilitycalculators.co.uk** is a UK personal finance tool designed to grow organic search
traffic from UK audiences and, once the site reaches sufficient scale, generate passive advertising
income through display ads (e.g. Google AdSense or a premium programmatic network).

The site must remain genuinely useful to real UK users. Traffic quality and user trust matter more
than raw page counts. Every page should answer a real question a UK person would type into Google.

---

## Audience and Conventions

- **Audience:** UK residents researching whether they can afford a home, car, or rental property.
- **Currency:** Always use **£ GBP**. Format with `formatCurrency()` from `src/utils/calculatorLogic.ts`.
- **Number formatting:** `en-GB` locale. Thousands separator is a comma: `£45,000` not `45000`.
- **Spelling:** British English. "colour", "neighbourhood", "licence" (noun), "analyse".
- **Salary references:** Annual gross (before tax). Always state "gross annual salary" or "annual salary before tax".
- **Tax year:** UK tax year runs April to April. Note the year in page titles where relevant.
- **Mortgage multiples:** Standard UK high-street cap is 4–4.5× income. Mention specialist lenders
  at 5–6× for high earners only where accurate. Never overstate borrowing capacity.

---

## Calculator Accuracy Requirements

The core formulas live in `src/utils/calculatorLogic.ts`. Do not change them without:

1. Citing a credible UK source (Bank of England, FCA, ONS, HMRC, or a named major lender).
2. Writing a new test case in `scripts/check-calculator.js` that passes before and after.
3. Noting the change, source, and date in a comment in `calculatorLogic.ts`.

**Key constants (current):**
| Constant | Value | Basis |
|---|---|---|
| `HOUSE_MULTIPLIER` | 4.5× | Standard UK lending multiple |
| `SAFETY_BUFFER` | 90% | Disposable income buffer |
| `RENT_MIN_RATIO` | 30% | Gross monthly income |
| `RENT_MAX_RATIO` | 35% | Gross monthly income |
| `CAR_CONSERVATIVE_RATIO` | 10% | Annual salary |
| `CAR_MAX_RATIO` | 15% | Annual salary |

Affordability verdicts use income multiples: ≤3.5× strong, ≤4.5× possible, ≤5.5× stretched, >5.5× unlikely.

**Do not make misleading financial claims.** All outputs are estimates. Every calculator page must
carry a disclaimer that results are indicative only and do not constitute financial advice.

---

## SEO Requirements

Every public URL must have:

- A unique `<title>` tag (set via `usePageTitle()` first argument).
- A unique `<meta name="description">` (set via `usePageTitle()` second argument).
- A `<link rel="canonical">` pointing to the canonical URL (set via `usePageTitle()` third argument).
- The canonical URL must exactly match the URL in `vite-plugin-sitemap.ts`.

Page title format: `[Primary keyword] – [Secondary context] | Affordability Calculators`

Structured data (`application/ld+json`) is required on:
- All calculator pages: `WebApplication` or `WebPage` schema.
- SEO and location pages: `FAQPage` where FAQ items exist.
- Homepage: `WebSite` + `SiteLinksSearchBox` if applicable.

**Never duplicate titles or descriptions** across different URLs. Run `scripts/check-metadata.js`
before publishing to verify uniqueness.

Sitemap coverage:
- Every URL registered in `vite-plugin-sitemap.ts` must have a matching route in `App.tsx`.
- `scripts/check-sitemap.js` enforces this automatically.
- Legal pages (`/privacy-policy`, `/terms`) are included at priority `0.3`.
- Dynamic user-generated URLs are excluded.

---

## Commands That Must Pass Before Publishing

Run these in order. All must exit with code 0:

```bash
npm run build          # Vite build — catches import errors and type issues
npm run typecheck      # tsc --noEmit — catches TypeScript errors
npm run lint           # ESLint — enforces code quality
node scripts/check-calculator.js    # Verifies calculator formula accuracy
node scripts/check-metadata.js      # Detects duplicate titles / descriptions
node scripts/check-sitemap.js       # Checks every sitemap URL has a route
```

A convenience script runs them all:

```bash
npm run check
```

---

## Publishing and Deployment Rules

- **Never publish or deploy automatically.** All deployments require a human confirmation step.
- Do not enable auto-deploy hooks in Bolt, Vercel, Netlify, or any CI system without explicit
  approval.
- Before any deployment, confirm the domain is `affordabilitycalculators.co.uk` and that
  `robots.txt` correctly points crawlers to `/sitemap.xml`.

---

## Advertising Policy

- **Do not add advertising code until the site is ready.** "Ready" means:
  - Organic traffic is consistently above 1,000 sessions/month.
  - Core Web Vitals (LCP, CLS, FID) pass on mobile.
  - All `npm run check` scripts pass.
  - The site has been reviewed by a human for content quality.
- When ads are added, use the existing `<AdBanner>` component. Do not introduce third-party ad
  scripts that are not already part of the codebase.
- Never let ads obscure calculator inputs or results.

---

## File Conventions

| Path | Purpose |
|---|---|
| `src/utils/calculatorLogic.ts` | All calculator formulas — the single source of truth |
| `src/hooks/usePageTitle.ts` | Sets `<title>`, `<meta description>`, and `<link canonical>` |
| `src/utils/structuredData.ts` | JSON-LD helpers — use these, do not inline schema |
| `vite-plugin-sitemap.ts` | Sitemap generation — add new routes here |
| `scripts/` | Automated checks — run before every publish |
| `public/robots.txt` | Crawler directives |
| `public/site.webmanifest` | PWA manifest |

---

## What Not to Change

- Do not redesign the UI unless explicitly requested.
- Do not alter calculator formulas without a cited source and a passing test.
- Do not change `tailwind.config.js` colours without a design review.
- Do not remove the `AdBanner` component — it is wired up and may be activated at any time.
- Do not remove existing `usePageTitle` calls — only extend them.
