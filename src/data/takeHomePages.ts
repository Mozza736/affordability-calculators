export interface TakeHomePageData {
  slug: string;
  grossSalary: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  incomeTax: number;
  nationalInsurance: number;
  personalAllowance: number;
  metaTitle: string;
  metaDescription: string;
  relatedAffordabilitySlugs: string[];
  relatedLocationSlugs: string[];
}

function calcTakeHome(gross: number): {
  annualTakeHome: number;
  monthlyTakeHome: number;
  incomeTax: number;
  nationalInsurance: number;
} {
  const personalAllowance = gross >= 125140 ? 0 : gross >= 100000 ? Math.max(0, 12570 - (gross - 100000) / 2) : 12570;
  const taxableIncome = Math.max(0, gross - personalAllowance);

  let incomeTax = 0;
  if (taxableIncome <= 37700) {
    incomeTax = taxableIncome * 0.2;
  } else if (taxableIncome <= 125140) {
    incomeTax = 37700 * 0.2 + (taxableIncome - 37700) * 0.4;
  } else {
    incomeTax = 37700 * 0.2 + (125140 - 37700) * 0.4 + (taxableIncome - 125140) * 0.45;
  }

  let ni = 0;
  const niLower = 12570;
  const niUpper = 50270;
  if (gross > niLower) {
    const niBasic = Math.min(gross, niUpper) - niLower;
    ni += niBasic * 0.08;
    if (gross > niUpper) {
      ni += (gross - niUpper) * 0.02;
    }
  }

  const annualTakeHome = Math.round(gross - incomeTax - ni);
  return {
    annualTakeHome,
    monthlyTakeHome: Math.round(annualTakeHome / 12),
    incomeTax: Math.round(incomeTax),
    nationalInsurance: Math.round(ni),
  };
}

interface TakeHomePageOverrides {
  metaTitle: string;
  metaDescription: string;
}

function buildPage(
  gross: number,
  relatedAffordabilitySlugs: string[],
  relatedLocationSlugs: string[],
  overrides: TakeHomePageOverrides
): TakeHomePageData {
  const { annualTakeHome, monthlyTakeHome, incomeTax, nationalInsurance } = calcTakeHome(gross);
  return {
    slug: `take-home-pay-${gross / 1000}k-uk`,
    grossSalary: gross,
    annualTakeHome,
    monthlyTakeHome,
    incomeTax,
    nationalInsurance,
    personalAllowance: gross >= 125140 ? 0 : gross >= 100000 ? Math.max(0, 12570 - (gross - 100000) / 2) : 12570,
    metaTitle: overrides.metaTitle,
    metaDescription: overrides.metaDescription,
    relatedAffordabilitySlugs,
    relatedLocationSlugs,
  };
}

export const TAKE_HOME_PAGES: TakeHomePageData[] = [
  buildPage(
    30000,
    ['can-i-afford-200k-house-on-30k-salary-uk', 'can-i-afford-250k-house-on-40k-salary-uk'],
    ['can-i-afford-a-house-in-liverpool-on-30k', 'can-i-afford-a-house-in-glasgow-on-30k', 'can-i-afford-a-house-in-nottingham-on-35k'],
    {
      metaTitle: '£30k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'How much do you take home on a £30k salary in the UK? See your exact monthly and annual pay after tax and National Insurance in 2026.',
    }
  ),
  buildPage(
    40000,
    ['can-i-afford-250k-house-on-40k-salary-uk', 'can-i-afford-300k-house-on-45k-salary-uk', 'can-i-afford-350k-house-on-50k-salary-uk'],
    ['can-i-afford-a-house-in-manchester-on-40k', 'can-i-afford-a-house-in-leeds-on-35k', 'can-i-afford-a-house-in-birmingham-on-35k'],
    {
      metaTitle: '£40k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'What is the take-home pay on a £40k salary in the UK in 2026? See your monthly income after income tax, NI, and your personal allowance.',
    }
  ),
  buildPage(
    50000,
    ['can-i-afford-350k-house-on-50k-salary-uk', 'can-i-afford-400k-house-on-60k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-bristol-on-45k', 'can-i-afford-a-house-in-edinburgh-on-45k'],
    {
      metaTitle: '£50k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'Earning £50k? See exactly how much you take home each month in 2026 after UK income tax and National Insurance deductions.',
    }
  ),
  buildPage(
    60000,
    ['can-i-afford-400k-house-on-60k-salary-uk', 'can-i-afford-500k-house-on-70k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-bristol-on-45k', 'can-i-afford-a-house-in-edinburgh-on-45k'],
    {
      metaTitle: '£60k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'How much do you keep from a £60k salary in the UK in 2026? Get a full breakdown: income tax, National Insurance, and monthly take-home.',
    }
  ),
  buildPage(
    70000,
    ['can-i-afford-500k-house-on-70k-salary-uk', 'can-i-afford-600k-house-on-80k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-bristol-on-45k', 'can-i-afford-a-house-in-edinburgh-on-45k'],
    {
      metaTitle: '£70k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'Earning £70k in the UK? Find out your real take-home pay in 2026 after 40% tax, NI, and deductions. Monthly and annual figures included.',
    }
  ),
  buildPage(
    80000,
    ['can-i-afford-600k-house-on-80k-salary-uk', 'can-i-afford-700k-house-on-90k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-bristol-on-45k', 'can-i-afford-a-house-in-edinburgh-on-45k'],
    {
      metaTitle: '£80k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'What do you actually take home on an £80k salary in the UK in 2026? See your net monthly and annual income after tax and National Insurance.',
    }
  ),
  buildPage(
    90000,
    ['can-i-afford-700k-house-on-90k-salary-uk', 'can-i-afford-800k-house-on-100k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-edinburgh-on-45k', 'can-i-afford-a-house-in-bristol-on-45k'],
    {
      metaTitle: '£90k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'Earning £90k in the UK? See your 2026 take-home pay after income tax, NI, and the higher-rate band. Monthly and annual figures included.',
    }
  ),
  buildPage(
    100000,
    ['can-i-afford-800k-house-on-100k-salary-uk', 'can-i-afford-1m-house-on-120k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-edinburgh-on-45k', 'can-i-afford-a-house-in-bristol-on-45k'],
    {
      metaTitle: '£100k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'How much do you take home on £100k in the UK in 2026? The personal allowance tapers at this level — see your real net income after all deductions.',
    }
  ),
  buildPage(
    120000,
    ['can-i-afford-1m-house-on-120k-salary-uk', 'can-i-afford-800k-house-on-100k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-edinburgh-on-45k', 'can-i-afford-a-house-in-bristol-on-45k'],
    {
      metaTitle: '£120k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'Earning £120k in the UK? Your personal allowance is fully withdrawn at this level. See your exact 2026 monthly take-home after tax and NI.',
    }
  ),
  buildPage(
    150000,
    ['can-i-afford-1m-house-on-120k-salary-uk', 'can-i-afford-800k-house-on-100k-salary-uk'],
    ['can-i-afford-a-house-in-london-on-50k', 'can-i-afford-a-house-in-edinburgh-on-45k', 'can-i-afford-a-house-in-bristol-on-45k'],
    {
      metaTitle: '£150k Salary Take Home Pay UK – 2026 After Tax',
      metaDescription: 'What is the take-home pay on £150k in the UK in 2026? Tax at 45% kicks in above £125k — see your exact monthly and annual net income.',
    }
  ),
];

export function getTakeHomePageBySlug(slug: string): TakeHomePageData | undefined {
  return TAKE_HOME_PAGES.find((p) => p.slug === slug);
}
