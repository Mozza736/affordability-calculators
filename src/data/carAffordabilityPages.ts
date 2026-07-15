export interface CarAffordabilityPageData {
  slug: string;
  salary: number;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  openingLine: string;
  monthlyBudgetMin: number;
  monthlyBudgetMax: number;
  monthlyBudgetNote: string;
  whatYouGet: {
    tier: string;
    description: string;
  }[];
  financeNote: string;
  relatedSlugs: string[];
  housingRelatedSlugs: string[];
}

export const CAR_AFFORDABILITY_PAGES: CarAffordabilityPageData[] = [
  {
    slug: 'what-car-can-i-afford-on-30k-salary-uk',
    salary: 30000,
    h1: 'What car can I afford on a £30k salary in the UK?',
    metaTitle: 'What Car Can I Afford on a £30k Salary? (UK 2026 Guide)',
    metaDescription:
      'On a £30k salary in the UK, find out what car you can realistically afford in 2026. Monthly budget estimates, finance options, and practical examples.',
    openingLine:
      'On a £30,000 salary, a typical monthly car budget would be around £150–£250 depending on your other commitments. That covers a modest but practical finance deal — enough for a reliable used car with relatively low running costs.',
    monthlyBudgetMin: 150,
    monthlyBudgetMax: 250,
    monthlyBudgetNote:
      'At £30k gross, your take-home is roughly £2,000–£2,100/month. A reasonable car finance payment sits at 8–12% of that — around £160–£250. Going higher than this leaves little room for insurance, fuel, and servicing.',
    whatYouGet: [
      {
        tier: 'Around £150/mo',
        description:
          'A 3–5 year old small hatchback or supermini (e.g. similar class to a Fiesta, Polo, or Corsa) with under 50,000 miles. Reliable daily transport with low running costs.',
      },
      {
        tier: 'Around £200/mo',
        description:
          'A newer (1–3 year old) small hatchback or a slightly older family hatchback. Better spec, newer plate, and warranty coverage likely still in place.',
      },
      {
        tier: 'Around £250/mo',
        description:
          'A newer small SUV or crossover, or a nearly-new hatchback. At the upper end of a comfortable budget for this income — make sure insurance and fuel costs still fit.',
      },
    ],
    financeNote:
      'Most UK car buyers use PCP (Personal Contract Purchase) or HP (Hire Purchase) finance rather than paying cash. PCP tends to offer lower monthly payments because you are not paying off the full value — instead you pay a deposit, monthly instalments, and then either hand the car back or pay a final "balloon" payment to own it. HP is simpler: you pay off the full value and own the car at the end. Both typically come with APRs between 6% and 12% for used cars. A deposit lowers your monthly payment significantly.',
    relatedSlugs: [
      'what-car-can-i-afford-on-40k-salary-uk',
      'what-car-can-i-afford-on-50k-salary-uk',
    ],
    housingRelatedSlugs: [
      'can-i-afford-200k-house-on-30k-salary-uk',
      'can-i-afford-250k-house-on-40k-salary-uk',
    ],
  },
  {
    slug: 'what-car-can-i-afford-on-40k-salary-uk',
    salary: 40000,
    h1: 'What car can I afford on a £40k salary in the UK?',
    metaTitle: 'What Car Can I Afford on a £40k Salary? (UK 2026 Guide)',
    metaDescription:
      'On a £40k salary in the UK, find out what car you can realistically afford in 2026. Monthly budget estimates, finance examples, and real-world guidance.',
    openingLine:
      'On a £40,000 salary, a typical monthly car budget would be around £200–£350 depending on your other financial commitments. That is enough to finance a solid used family car or a nearly-new smaller vehicle with some spec.',
    monthlyBudgetMin: 200,
    monthlyBudgetMax: 350,
    monthlyBudgetNote:
      'Your take-home on £40k is roughly £2,500–£2,600/month. Keeping car finance at 8–12% of net income suggests a comfortable range of £200–£310. Stretching to £350 is workable if your other outgoings are low, but leaves less room for savings.',
    whatYouGet: [
      {
        tier: 'Around £200/mo',
        description:
          'A well-kept 3–4 year old family hatchback or SUV with a good service history. Practical, spacious, and manageable to insure. Sensible choice if you want financial breathing room.',
      },
      {
        tier: 'Around £280/mo',
        description:
          'A newer 1–2 year old family car, or an older but larger SUV or estate. Good value-for-money territory — reliable and suitable for longer commutes or family use.',
      },
      {
        tier: 'Around £350/mo',
        description:
          'A nearly-new mid-size SUV or a lower-spec executive car (e.g. older 3 Series or A4 class). Attractive but factor in higher servicing and insurance costs before committing.',
      },
    ],
    financeNote:
      'At £40k, you have more choice in the finance market. PCP deals on nearly-new cars become accessible, and some manufacturers offer promotional rates (0% or close to it) on specific models. HP deals on used cars remain the most straightforward option. A deposit of £2,000–£5,000 makes a noticeable difference to monthly payments. Watch out for mileage limits on PCP contracts — exceeding them leads to penalty charges.',
    relatedSlugs: [
      'what-car-can-i-afford-on-30k-salary-uk',
      'what-car-can-i-afford-on-50k-salary-uk',
      'what-car-can-i-afford-on-60k-salary-uk',
    ],
    housingRelatedSlugs: [
      'can-i-afford-250k-house-on-40k-salary-uk',
      'can-i-afford-300k-house-on-45k-salary-uk',
    ],
  },
  {
    slug: 'what-car-can-i-afford-on-50k-salary-uk',
    salary: 50000,
    h1: 'What car can I afford on a £50k salary in the UK?',
    metaTitle: 'What Car Can I Afford on a £50k Salary? (UK 2026 Guide)',
    metaDescription:
      'On a £50k salary in the UK, what car can you realistically afford in 2026? Monthly budget, finance options, and what your money gets you explained.',
    openingLine:
      'On a £50,000 salary, a typical monthly car budget would be around £300–£450 depending on your other commitments. That opens up a wide range of options — from nearly-new family SUVs to lower-tier executive or electric vehicles on finance.',
    monthlyBudgetMin: 300,
    monthlyBudgetMax: 450,
    monthlyBudgetNote:
      'Your take-home on £50k is roughly £3,100–£3,200/month. A car payment of 10–14% of net income is manageable, putting a sensible budget at £300–£450. Many buyers at this income level also have a mortgage or rent commitment, so make sure your total fixed outgoings remain sustainable.',
    whatYouGet: [
      {
        tier: 'Around £300/mo',
        description:
          'A nearly-new mid-size family SUV, a 1–2 year old family hatchback with high spec, or a used premium smaller car. Wide choice, competitive finance rates available.',
      },
      {
        tier: 'Around £380/mo',
        description:
          'A new or nearly-new larger SUV, or a used entry-level executive saloon or estate. At this budget you are moving into more premium territory with better equipment and comfort.',
      },
      {
        tier: 'Around £450/mo',
        description:
          'A used luxury SUV, a newer mid-range executive car, or a current-generation electric vehicle on PCP. Budget carefully — servicing, insurance, and electricity or fuel costs add up quickly at this level.',
      },
    ],
    financeNote:
      'PCP is particularly popular at this income level because it makes aspirational cars accessible on a predictable monthly budget. The key variable is the Guaranteed Future Value (GFV) — a higher GFV means lower monthly payments but less equity if you want to change cars. HP works well for buyers who want to own the car outright at the end of the term. Electric vehicles often have competitive PCP deals due to strong residual values, though this is changing as used EV supply grows.',
    relatedSlugs: [
      'what-car-can-i-afford-on-40k-salary-uk',
      'what-car-can-i-afford-on-60k-salary-uk',
      'what-car-can-i-afford-on-70k-salary-uk',
    ],
    housingRelatedSlugs: [
      'can-i-afford-300k-house-on-50k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
    ],
  },
  {
    slug: 'what-car-can-i-afford-on-60k-salary-uk',
    salary: 60000,
    h1: 'What car can I afford on a £60k salary in the UK?',
    metaTitle: 'What Car Can I Afford on a £60k Salary? (UK 2026 Guide)',
    metaDescription:
      'On a £60k salary in the UK, find out what car you can realistically afford in 2026. Budget guidance, finance options, and what to expect at each price point.',
    openingLine:
      'On a £60,000 salary, a typical monthly car budget would be around £400–£600 depending on your financial commitments. That comfortably covers most executive cars, large SUVs, or a premium EV on a PCP deal.',
    monthlyBudgetMin: 400,
    monthlyBudgetMax: 600,
    monthlyBudgetNote:
      'Your take-home on £60k is roughly £3,600–£3,700/month (slightly lower due to 40% tax on earnings above £50,270). A 10–15% car budget gives you £360–£555. At this level many buyers also have significant mortgage repayments, so keep total debt payments below 50% of net income.',
    whatYouGet: [
      {
        tier: 'Around £400/mo',
        description:
          'A new or nearly-new mid-size executive car (saloon, estate, or SUV), or a premium EV on a manufacturer PCP deal. Good range of brand-new options from mainstream manufacturers.',
      },
      {
        tier: 'Around £500/mo',
        description:
          'A larger luxury SUV, a high-spec executive estate, or a premium EV with longer range. Entering the market where the car itself becomes a meaningful lifestyle asset.',
      },
      {
        tier: 'Around £600/mo',
        description:
          'A new premium SUV (e.g. full-size German SUV class), a luxury EV, or a performance-oriented executive car. Comfortable at this salary but factor in higher insurance and servicing bills.',
      },
    ],
    financeNote:
      'At £60k, manufacturer and premium brand finance programmes become highly relevant. Brands like BMW, Mercedes, Audi, and Volvo offer structured PCP deals often featuring low deposit options and competitive APRs for buyers with strong credit histories. Salary sacrifice schemes — offered by some employers — can make EVs significantly more tax-efficient, sometimes reducing the effective monthly cost by 30–40% for higher-rate taxpayers.',
    relatedSlugs: [
      'what-car-can-i-afford-on-50k-salary-uk',
      'what-car-can-i-afford-on-70k-salary-uk',
    ],
    housingRelatedSlugs: [
      'can-i-afford-400k-house-on-60k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
    ],
  },
  {
    slug: 'what-car-can-i-afford-on-70k-salary-uk',
    salary: 70000,
    h1: 'What car can I afford on a £70k salary in the UK?',
    metaTitle: 'What Car Can I Afford on a £70k Salary? (UK 2026 Guide)',
    metaDescription:
      'On a £70k salary in the UK, what car can you realistically afford in 2026? Budget guidance, premium finance options, and what to expect at each level.',
    openingLine:
      'On a £70,000 salary, a typical monthly car budget would be around £500–£750 depending on your other commitments. That puts most new premium and executive vehicles within reach on a finance deal.',
    monthlyBudgetMin: 500,
    monthlyBudgetMax: 750,
    monthlyBudgetNote:
      'Your take-home on £70k is roughly £4,100–£4,200/month after 40% tax and National Insurance. A 12–18% allocation for a car payment gives £490–£755. At this salary it is common to have substantial mortgage repayments alongside, so maintain a healthy gap between income and total debt obligations.',
    whatYouGet: [
      {
        tier: 'Around £500/mo',
        description:
          'A new premium mid-size SUV, a high-spec executive estate, or a long-range electric vehicle on PCP. Broad choice including new stock from premium brands.',
      },
      {
        tier: 'Around £620/mo',
        description:
          'A large luxury SUV, a performance-spec executive saloon, or a premium EV in the higher trim levels. At this level you are getting significant equipment and a prestige badge.',
      },
      {
        tier: 'Around £750/mo',
        description:
          'A flagship SUV, a near-sports car, or an ultra-premium EV. Approaching the budget where lease or PCP often makes more sense than HP, as depreciation risk increases on high-value vehicles.',
      },
    ],
    financeNote:
      'At £70k, a company car or salary sacrifice scheme is worth evaluating seriously. For higher-rate taxpayers, an electric vehicle via salary sacrifice can be substantially cheaper than a personal finance deal, often saving hundreds of pounds per month in tax. If buying personally, PCP from a premium manufacturer typically offers the most flexibility — low monthly payments, defined end-of-term options, and protected against excessive depreciation risk. HP suits buyers who want to own outright and are confident in the vehicle\'s long-term reliability.',
    relatedSlugs: [
      'what-car-can-i-afford-on-50k-salary-uk',
      'what-car-can-i-afford-on-60k-salary-uk',
    ],
    housingRelatedSlugs: [
      'can-i-afford-500k-house-on-70k-salary-uk',
      'can-i-afford-400k-house-on-60k-salary-uk',
    ],
  },
];

export function getCarAffordabilityPageBySlug(slug: string): CarAffordabilityPageData | undefined {
  return CAR_AFFORDABILITY_PAGES.find((p) => p.slug === slug);
}
