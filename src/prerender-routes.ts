/**
 * prerender-routes.ts
 * Complete metadata map for every public route.
 * Imported by scripts/prerender.js (via Vite SSR bundle) to inject
 * title, description, canonical, and JSON-LD into pre-rendered HTML.
 */

import { SEO_PAGES } from './data/seoPages';
import { ALL_LOCATION_PAGES } from './data/locationPages';
import { TAKE_HOME_PAGES } from './data/takeHomePages';
import { CAR_AFFORDABILITY_PAGES } from './data/carAffordabilityPages';

const BASE_URL = 'https://affordabilitycalculators.co.uk';

export interface RouteMetadata {
  path: string;
  title: string;
  description: string;
  canonical: string;
  h1: string;
  jsonLd: object[];
}

function appSchema(name: string, desc: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description: desc,
    url: `${BASE_URL}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
  };
}

function webPageSchema(title: string, desc: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: desc,
    url: `${BASE_URL}${path}`,
    isPartOf: { '@type': 'WebSite', url: BASE_URL },
  };
}

// ─── Static routes ────────────────────────────────────────────────────────────

const staticRoutes: RouteMetadata[] = [
  {
    path: '/',
    title: 'UK Affordability Calculator – What Can You Really Afford? (2026)',
    description: 'Find out exactly what you can afford in 2026. Free UK calculators for house, rent, car, and savings — instant results based on your salary and outgoings.',
    canonical: `${BASE_URL}/`,
    h1: 'Find out what you can really afford',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Affordability Calculators',
        url: BASE_URL,
        description: 'Free UK affordability calculators for house, rent, car, and savings.',
      },
      appSchema('UK Affordability Calculator', 'Free UK affordability calculator. Find out what house, rent, or car you can afford based on your salary and expenses.', '/'),
    ],
  },
  {
    path: '/calculators',
    title: 'Free UK Affordability Calculators – House, Rent & More (2026)',
    description: 'Browse all free UK affordability calculators for 2026. Check house, rent, car, and savings affordability — instant results based on your real salary and expenses.',
    canonical: `${BASE_URL}/calculators`,
    h1: 'All affordability calculators',
    jsonLd: [webPageSchema('Free UK Affordability Calculators', 'Browse all free UK affordability calculators for 2026.', '/calculators')],
  },
  {
    path: '/about',
    title: 'About Us – UK Affordability Calculators | Free Tools (2026)',
    description: 'Learn about UK Affordability Calculators — free tools built to give honest answers about house, rent, and car affordability based on UK lending standards.',
    canonical: `${BASE_URL}/about`,
    h1: 'About Affordability Calculators',
    jsonLd: [webPageSchema('About UK Affordability Calculators', 'Free tools built to give honest answers about house, rent, and car affordability.', '/about')],
  },
  {
    path: '/get-your-plan',
    title: 'Get Your Free Affordability Plan – UK Calculator (2026)',
    description: "Get a free personalised UK affordability plan in 2026. Tell us your salary and expenses and we'll show you exactly what you can realistically afford to buy.",
    canonical: `${BASE_URL}/get-your-plan`,
    h1: 'Get your free affordability plan',
    jsonLd: [webPageSchema('Get Your Free Affordability Plan', 'Free personalised UK affordability plan.', '/get-your-plan')],
  },
  {
    path: '/house-affordability',
    title: 'House Affordability Calculator UK (2026) – What Can You Afford?',
    description: 'Find out the maximum house price you can realistically afford in the UK in 2026. Free calculator based on your salary, deposit, and monthly outgoings.',
    canonical: `${BASE_URL}/house-affordability`,
    h1: 'How much house can I afford in the UK?',
    jsonLd: [appSchema('House Affordability Calculator UK (2026)', 'Find out the maximum house price you can realistically afford in the UK in 2026.', '/house-affordability')],
  },
  {
    path: '/rent-affordability',
    title: 'Rent Affordability Calculator UK (2026) – How Much Should I Spend?',
    description: 'Find out how much rent you can afford in the UK in 2026. Free calculator using the 30% income rule and your real monthly expenses.',
    canonical: `${BASE_URL}/rent-affordability`,
    h1: 'How much rent can I afford?',
    jsonLd: [appSchema('Rent Affordability Calculator UK (2026)', 'Find out how much rent you can afford in the UK in 2026.', '/rent-affordability')],
  },
  {
    path: '/savings-runway',
    title: 'Savings Runway Calculator UK (2026) – How Long Will My Money Last?',
    description: 'Find out exactly how long your savings will last in the UK in 2026. Free calculator based on your balance, monthly spending, and any income you receive.',
    canonical: `${BASE_URL}/savings-runway`,
    h1: 'Savings runway calculator',
    jsonLd: [appSchema('Savings Runway Calculator UK (2026)', 'How long will your savings last?', '/savings-runway')],
  },
  {
    path: '/how-long-will-my-savings-last',
    title: 'How Long Will My Savings Last? – UK Calculator (2026)',
    description: 'Use our free UK savings runout calculator to find out how long your savings will last in 2026. Enter your balance and monthly spending for an instant result.',
    canonical: `${BASE_URL}/how-long-will-my-savings-last`,
    h1: 'How long will my savings last?',
    jsonLd: [appSchema('Savings Runout Calculator UK', 'Find out how long your savings will last.', '/how-long-will-my-savings-last')],
  },
  {
    path: '/car-affordability',
    title: 'Car Affordability Calculator UK (2026) – Free Instant Results',
    description: 'Free UK car affordability calculator. Enter your monthly budget, deposit and APR to see what car you can afford — PCP, HP and running costs explained.',
    canonical: `${BASE_URL}/car-affordability`,
    h1: 'UK car affordability calculator — how much can you afford per month?',
    jsonLd: [
      appSchema('Car Affordability Calculator UK (2026)', 'Free UK car affordability calculator. Enter your monthly budget, deposit and APR to see what car you can afford — PCP, HP and running costs explained.', '/car-affordability'),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much car can I afford based on my salary in the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Keep your car finance payment at 10–12% of your net monthly income. On a £30k salary (take-home ~£2,050/month), that suggests a £200–£250/month budget. On a £40k salary (~£2,550/month), around £255–£310/month. On a £50k salary (~£3,150/month), a comfortable range is £315–£380/month. Use the calculator above to see the car value that payment unlocks based on your deposit, APR, and term length.',
            },
          },
          {
            '@type': 'Question',
            name: 'What factors affect how much car I can afford?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The key factors are: your monthly disposable income after housing costs and other commitments; the deposit you can put down (a larger deposit reduces your loan and lowers monthly payments); the APR on your finance deal (typically 6–12% on used cars in the UK); and the term length (longer terms lower monthly payments but increase total interest). Your total monthly motoring costs — finance, insurance, fuel or charging, and servicing — will typically run £150–£400 more than the finance payment alone.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between PCP and HP car finance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "PCP (Personal Contract Purchase) finances only part of the car's value. You pay a deposit, fixed monthly payments, then choose to return the car, pay a balloon payment to own it, or part-exchange. Monthly costs are lower. HP (Hire Purchase) finances the full car value — higher monthly payments but you own the car outright at the end, with no balloon payment and no mileage limits.",
            },
          },
          {
            '@type': 'Question',
            name: 'What APR should I expect on UK car finance in 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Typical APRs in 2026 range from 6% to 12% on used cars, and 4% to 9% on new cars, depending on your credit score and the lender. Some manufacturers offer promotional 0% APR deals on specific new models. This calculator uses approximately 8% APR as a realistic working baseline for most buyers. Always compare rates from multiple lenders before signing a finance agreement.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I budget for total monthly motoring costs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Beyond the finance payment, budget for car insurance (typically £50–£150/month), fuel or charging (£80–£200/month depending on mileage and vehicle type), road tax (£0–£30/month), and maintenance including tyres (allow £30–£80/month averaged over the year). On top of a £300/month finance payment, total monthly motoring costs can reach £500–£700/month — factor these in before committing to a deal.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/how-much-should-i-spend-on-a-car-uk',
    title: 'How Much Should I Spend on a Car in the UK? (2026 Guide)',
    description: 'Find out how much you should spend on a car in the UK in 2026. Budget guidance by salary level, with a free car finance calculator to estimate your monthly payments.',
    canonical: `${BASE_URL}/how-much-should-i-spend-on-a-car-uk`,
    h1: 'How much should I spend on a car in the UK?',
    jsonLd: [webPageSchema('How Much Should I Spend on a Car in the UK?', 'Car spending guide with free calculator.', '/how-much-should-i-spend-on-a-car-uk')],
  },
  {
    path: '/mortgage-options',
    title: 'Your Next Steps – Mortgage Options | UK Affordability',
    description: 'See your next steps for getting a mortgage in the UK. Compare providers and get matched with the right deal based on your affordability.',
    canonical: `${BASE_URL}/mortgage-options`,
    h1: 'Mortgage options and next steps',
    jsonLd: [webPageSchema('Mortgage Options – UK Affordability', 'Compare mortgage options in the UK.', '/mortgage-options')],
  },
  {
    path: '/is-300-a-month-car-affordable-uk',
    title: 'Is £300 a Month Car Affordable in the UK? (2026 Guide)',
    description: 'Is £300/month a sensible car payment in the UK? We break down whether £300/month is affordable based on your salary, what car it gets you, and expert guidance.',
    canonical: `${BASE_URL}/is-300-a-month-car-affordable-uk`,
    h1: 'Is £300 a month car affordable in the UK?',
    jsonLd: [webPageSchema('Is £300 a Month Car Affordable?', 'Find out if £300/month car payment is affordable in the UK.', '/is-300-a-month-car-affordable-uk')],
  },
  {
    path: '/is-400-a-month-car-affordable-uk',
    title: 'Is £400 a Month Car Affordable in the UK? (2026 Guide)',
    description: 'Is £400/month a sensible car payment in the UK? Find out if £400/month is affordable based on your salary, what car it gets you, and when it becomes too much.',
    canonical: `${BASE_URL}/is-400-a-month-car-affordable-uk`,
    h1: 'Is £400 a month car affordable in the UK?',
    jsonLd: [webPageSchema('Is £400 a Month Car Affordable?', 'Find out if £400/month car payment is affordable in the UK.', '/is-400-a-month-car-affordable-uk')],
  },
  {
    path: '/how-much-mortgage-can-i-afford-on-50k-salary-uk',
    title: 'How much mortgage can I afford on £50k? UK Guide',
    description: 'Estimate how much mortgage you could get on a £50k salary in the UK, including realistic lender ranges, deposit impact and monthly affordability.',
    canonical: `${BASE_URL}/how-much-mortgage-can-i-afford-on-50k-salary-uk`,
    h1: 'How much mortgage can I afford on a £50k salary?',
    jsonLd: [webPageSchema('How Much Mortgage on £50k Salary?', 'UK mortgage guide for £50k earners.', '/how-much-mortgage-can-i-afford-on-50k-salary-uk')],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy – UK Affordability Calculators',
    description: 'Read our privacy policy. UK Affordability Calculators does not store or sell your data. All calculations are processed locally in your browser.',
    canonical: `${BASE_URL}/privacy-policy`,
    h1: 'Privacy policy',
    jsonLd: [webPageSchema('Privacy Policy', 'Privacy policy for UK Affordability Calculators.', '/privacy-policy')],
  },
  {
    path: '/terms',
    title: 'Terms of Use – UK Affordability Calculators',
    description: 'Read the terms of use for UK Affordability Calculators. Our tools provide indicative estimates only and do not constitute financial advice.',
    canonical: `${BASE_URL}/terms`,
    h1: 'Terms of use',
    jsonLd: [webPageSchema('Terms of Use', 'Terms of use for UK Affordability Calculators.', '/terms')],
  },
];

// ─── Dynamic routes from data arrays ─────────────────────────────────────────

const seoRoutes: RouteMetadata[] = SEO_PAGES.map((p) => ({
  path: `/${p.slug}`,
  title: p.metaTitle,
  description: p.metaDescription,
  canonical: `${BASE_URL}/${p.slug}`,
  h1: p.h1,
  jsonLd: [appSchema(p.metaTitle, p.metaDescription, `/${p.slug}`)],
}));

const locationRoutes: RouteMetadata[] = ALL_LOCATION_PAGES.map((p) => ({
  path: `/${p.slug}`,
  title: p.metaTitle,
  description: p.metaDescription,
  canonical: `${BASE_URL}/${p.slug}`,
  h1: p.h1,
  jsonLd: [appSchema(p.metaTitle, p.metaDescription, `/${p.slug}`)],
}));

const takeHomeRoutes: RouteMetadata[] = TAKE_HOME_PAGES.map((p) => ({
  path: `/${p.slug}`,
  title: p.metaTitle,
  description: p.metaDescription,
  canonical: `${BASE_URL}/${p.slug}`,
  h1: `Take home pay on a £${(p.grossSalary / 1000).toFixed(0)}k salary in the UK`,
  jsonLd: [webPageSchema(p.metaTitle, p.metaDescription, `/${p.slug}`)],
}));

const carRoutes: RouteMetadata[] = CAR_AFFORDABILITY_PAGES.map((p) => ({
  path: `/${p.slug}`,
  title: p.metaTitle,
  description: p.metaDescription,
  canonical: `${BASE_URL}/${p.slug}`,
  h1: p.h1,
  jsonLd: [webPageSchema(p.metaTitle, p.metaDescription, `/${p.slug}`)],
}));

export const ALL_ROUTES: RouteMetadata[] = [
  ...staticRoutes,
  ...seoRoutes,
  ...locationRoutes,
  ...takeHomeRoutes,
  ...carRoutes,
];
