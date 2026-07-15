export interface PropertyExample {
  location: string;
  description: string;
}

export interface MortgageScenario {
  deposit: number;
  loanAmount: number;
  monthlyPayment: number;
  rate: number;
  term: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BuyerScenario {
  name: string;
  situation: string;
  outcome: string;
}

export interface MonthlyCostContext {
  estimate: string;
  note: string;
}

export interface RichSections {
  propertyExamples?: PropertyExample[];
  mortgageScenarios?: MortgageScenario[];
  realisticVerdict?: {
    headline: string;
    points: string[];
    bottomLine: string;
  };
  buyerScenario?: BuyerScenario;
  monthlyCostContext?: MonthlyCostContext;
  faqs?: FaqItem[];
}

export interface SeoPageData {
  slug: string;
  h1: string;
  shortAnswer: string;
  housePrice: number;
  salary: number;
  metaTitle: string;
  metaDescription: string;
  relatedSlugs: string[];
  richSections?: RichSections;
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: 'can-i-afford-200k-house-on-30k-salary-uk',
    h1: 'Can I afford a £200k house on a £30k salary in the UK?',
    shortAnswer:
      'Of all the house price and salary combinations on this site, £200k on £30k is among the more manageable for a first-time buyer. Standard lending gives you up to £135,000 — so a deposit of around £65,000 bridges the full gap. That is a lot to save, but with family help or a longer savings runway it is genuinely achievable.',
    housePrice: 200000,
    salary: 30000,
    metaTitle: '£200k House on £30k Salary – Can You Afford It? (2026)',
    metaDescription:
      'Can you afford a £200k house on a £30k salary in the UK? Get an instant 2026 affordability result with our free calculator. See deposit requirements and monthly costs.',
    relatedSlugs: [
      'can-i-afford-250k-house-on-40k-salary-uk',
      'can-i-afford-300k-house-on-45k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Priya, 27 — NHS nurse, Nottingham',
        situation: 'Priya earns £30,000 and has saved £40,000 over four years while renting. She has no debts and a clean credit file. A two-bedroom terrace in the Basford area of Nottingham is listed at £195,000. Her parents have offered a £15,000 gift, bringing her total deposit to £55,000 — around 28%.',
        outcome: 'With a £140,000 mortgage at 4.5× salary (£135,000 limit), Priya is just over standard multiples. However, because her deposit is strong and her outgoings are low, a building society offering 5× to NHS workers approves her application. Monthly repayments come to around £770 — comfortably below 30% of her take-home.',
      },
    },
  },
  {
    slug: 'can-i-afford-250k-house-on-40k-salary-uk',
    h1: 'Can I afford a £250k house on a £40k salary in the UK?',
    shortAnswer:
      'A £250k purchase on a £40k salary is where many first-time buyers find themselves: the numbers are tight but not impossible. You can borrow up to £180,000 under standard 4.5× rules, leaving a £70,000 deposit gap. A Help to Buy equity loan (where still available regionally), shared ownership, or a solid savings pot can close that gap for the right buyer.',
    housePrice: 250000,
    salary: 40000,
    metaTitle: '£250k House on £40k Salary – Affordable in 2026?',
    metaDescription:
      'Wondering if you can afford a £250k house on a £40k salary in the UK? Find out instantly with our free 2026 mortgage affordability calculator.',
    relatedSlugs: [
      'can-i-afford-200k-house-on-30k-salary-uk',
      'can-i-afford-300k-house-on-45k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'James, 31 — secondary school teacher, Sheffield',
        situation: 'James earns £40,000 including TLR responsibilities and has saved £35,000. He is looking at a three-bedroom semi in the Hillsborough area of Sheffield at £248,000. His only debt is a small £4,000 car finance agreement with 18 months remaining.',
        outcome: 'Standard lenders cap James at around £180,000. With his £35,000 deposit, the mortgage needed is £213,000 — too high. A broker finds a building society that offers 5.5× to public-sector employees, bringing the maximum to £220,000. With a small top-up gift from his parents, James proceeds. His monthly payment of £1,190 is around 37% of take-home — manageable but requiring careful budgeting.',
      },
    },
  },
  {
    slug: 'can-i-afford-300k-house-on-45k-salary-uk',
    h1: 'Can I afford a £300k house on a £45k salary in the UK?',
    shortAnswer:
      'At 6.7 times your salary, £300k sits in the bracket where some lenders will say yes and others will not. The difference between approval and rejection often comes down to how much deposit you have and whether you have any outstanding credit commitments. A deposit of 20% or more materially changes what lenders are willing to offer.',
    housePrice: 300000,
    salary: 45000,
    metaTitle: '£300k House on £45k Salary – Real Affordability (2026)',
    metaDescription:
      'Can you afford a £300k house on a £45k salary in the UK? Get a real 2026 affordability estimate. See what lenders will offer and how much deposit you need.',
    relatedSlugs: [
      'can-i-afford-200k-house-on-30k-salary-uk',
      'can-i-afford-250k-house-on-40k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-400k-house-on-60k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Aisha, 34 — marketing manager, Bristol',
        situation: 'Aisha earns £45,000 and has £55,000 saved — partly from inheritance. She is buying solo and targeting a two-bedroom flat in Bedminster, Bristol, listed at £295,000. She has a credit card with a £2,000 balance she clears monthly.',
        outcome: 'Her maximum standard mortgage is £202,500. With a £55,000 deposit the mortgage required is £240,000 — still above the 4.5× cap but within 5.3×. A specialist lender targeting professionals with low outgoings approves her at 5.3×. Her repayment is £1,340/month — roughly 43% of her monthly take-home. Aisha decides to overpay the credit card before completion to remove it from her affordability assessment entirely.',
      },
    },
  },
  {
    slug: 'can-i-afford-280k-house-on-50k-salary-uk',
    h1: 'Can I afford a £280k house on a £50k salary in the UK?',
    shortAnswer:
      'A £280k home on a £50k salary is one of the more realistic targets in this salary bracket. At 5.6 times your income, you are still above the standard 4.5× lending cap — but a deposit of around 15% brings the required mortgage down to roughly 4.8× salary, which many high-street lenders will consider without needing specialist products.',
    housePrice: 280000,
    salary: 50000,
    metaTitle: '£280k House on £50k Salary – Can You Afford It? (2026)',
    metaDescription:
      'Can you afford a £280k house on a £50k salary in the UK? Get an instant 2026 affordability result. See deposit requirements, lending limits, and monthly costs.',
    relatedSlugs: [
      'can-i-afford-300k-house-on-50k-salary-uk',
      'can-i-afford-320k-house-on-50k-salary-uk',
      'can-i-afford-250k-house-on-40k-salary-uk',
    ],
    richSections: {
      monthlyCostContext: {
        estimate: '£1,200 – £1,580 / month',
        note: 'Based on a 25-year repayment mortgage at rates between 4% and 5%, with a deposit of 10–20%. On a £50k salary your take-home is roughly £3,100–£3,200/month, so this represents 38–50% of net income. That is tight but workable if your other monthly outgoings are modest.',
      },
      buyerScenario: {
        name: 'Callum, 29 — project manager, Leicester',
        situation: 'Callum earns £50,000 and has saved £42,000 over four years. He is buying a three-bedroom semi-detached in Oadby, Leicester at £277,000. He has no outstanding debts and a clean credit record.',
        outcome: 'With a £42,000 deposit (15.2%), Callum needs a £235,000 mortgage — 4.7× his salary. That is just above the standard 4.5× cap, but his low outgoings and stable employment history lead a high-street building society to approve him under discretionary criteria. His monthly repayment of £1,300 is around 41% of take-home — tight but manageable on his budget.',
      },
    },
  },
  {
    slug: 'can-i-afford-300k-house-on-50k-salary-uk',
    h1: 'Can I afford a £300k house on a £50k salary in the UK?',
    shortAnswer:
      'A £300k property on a £50k salary is possible, but for most buyers it will feel tight and depends heavily on deposit size and existing debt. At 6 times your income it exceeds the standard 4.5× lending cap, but a deposit of 15–20% brings the required mortgage low enough that several high-street lenders will still consider your application under normal criteria.',
    housePrice: 300000,
    salary: 50000,
    metaTitle: 'Can I afford a £300k house on £50k salary? (UK Reality Check 2026)',
    metaDescription:
      'See what you can realistically afford on a £50k salary in the UK, including estimated house price, monthly costs, and lender expectations.',
    relatedSlugs: [
      'can-i-afford-280k-house-on-50k-salary-uk',
      'can-i-afford-320k-house-on-50k-salary-uk',
      'can-i-afford-330k-house-on-50k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
    ],
    richSections: {
      monthlyCostContext: {
        estimate: '£1,300 – £1,700 / month',
        note: 'Based on a 25-year repayment mortgage at rates between 4% and 5%, with a deposit of 10–20%. The exact figure depends on your interest rate, deposit size, and mortgage term. On a £50k salary your take-home is roughly £3,100–£3,200/month, so this represents 40–55% of net income — manageable with low outgoings, but tight if you have other financial commitments.',
      },
      buyerScenario: {
        name: 'Tom, 36 — software developer, Leeds',
        situation: 'Tom earns £50,000 and has £52,000 saved. He is buying a three-bedroom semi in Horsforth, Leeds at £298,000. He has no credit card debt and no car finance, but he does have a student loan which factors into lenders\' affordability assessments.',
        outcome: 'With a £52,000 deposit (17.4%), Tom needs a £246,000 mortgage — 4.92× his salary. His student loan repayments reduce his assessed disposable income slightly, but his low outgoings otherwise compensate. A high-street lender approves him at 4.92× under discretionary criteria. His monthly repayment of £1,370 is around 43% of his take-home.',
      },
    },
  },
  {
    slug: 'can-i-afford-320k-house-on-50k-salary-uk',
    h1: 'Can I afford a £320k house on a £50k salary in the UK?',
    shortAnswer:
      'Moving up to £320k on a £50k salary adds meaningful pressure compared to the £300k scenario. Standard lending covers £225k at most, so you need at least a £95k deposit to avoid specialist lenders — or a deposit of around £40k alongside a lender willing to stretch to 5.6×. Your employment type and existing monthly commitments will decide which path is open to you.',
    housePrice: 320000,
    salary: 50000,
    metaTitle: '£320k House on £50k Salary – Affordable in 2026?',
    metaDescription:
      'Is a £320k house affordable on a £50k salary in the UK? Get an instant 2026 result with our free mortgage affordability calculator. See what deposit you need.',
    relatedSlugs: [
      'can-i-afford-300k-house-on-50k-salary-uk',
      'can-i-afford-330k-house-on-50k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-370k-house-on-50k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Rachel, 32 — chartered accountant, Birmingham',
        situation: 'Rachel earns £50,000 basic plus a small annual bonus she does not rely on. She has £45,000 saved and is buying a three-bedroom end-of-terrace in Erdington, Birmingham at £315,000. As a qualified professional, she qualifies for a professional mortgage product.',
        outcome: 'Rachel needs a £270,000 mortgage — 5.4× her salary. Her professional mortgage lender offers up to 5.5× for ICAEW-qualified accountants with five or more years post-qualification. She qualifies. Her monthly repayment of £1,520 is around 47% of take-home, which is high — but her bonus covers the gap in tight months. She plans to review and remortgage at a lower LTV once prices appreciate.',
      },
    },
  },
  {
    slug: 'can-i-afford-330k-house-on-50k-salary-uk',
    h1: 'Can I afford a £330k house on a £50k salary in the UK?',
    shortAnswer:
      'At £330k you are firmly in specialist-lender territory on a £50k salary. The standard cap of £225k means even a 20% deposit (£66k) leaves a mortgage of £264k — almost 5.3× your salary. A handful of lenders will go there for the right applicant, but you need low outgoings, a clean credit record, and ideally a stable employment history of at least two years.',
    housePrice: 330000,
    salary: 50000,
    metaTitle: '£330k House on £50k Salary – Real Affordability (2026)',
    metaDescription:
      'Can you afford a £330k house on a £50k salary? Find out instantly with our free 2026 calculator. Honest assessment based on UK lending criteria.',
    relatedSlugs: [
      'can-i-afford-300k-house-on-50k-salary-uk',
      'can-i-afford-320k-house-on-50k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-370k-house-on-50k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Dan and Claire — combined income £50k, Manchester',
        situation: 'Dan earns £30,000 and Claire earns £20,000. They are buying together as a couple and have saved £60,000 jointly over five years. They are targeting a three-bedroom semi in Stretford at £328,000. Neither has any outstanding loans or credit commitments.',
        outcome: 'As joint applicants their combined income of £50,000 is assessed together. Standard 4.5× gives them £225,000. With their £60,000 deposit, they need £268,000 — still above the cap, but only 5.36×. A high-street lender accepts their application after a full affordability assessment confirms their low monthly outgoings. Monthly repayments are £1,510 — split equally, this is manageable for both.',
      },
    },
  },
  {
    slug: 'can-i-afford-340k-house-on-50k-salary-uk',
    h1: 'Can I afford a £340k house on a £50k salary in the UK?',
    shortAnswer:
      'A £340k property at 6.8 times salary requires you to find a lender willing to go well beyond standard criteria — or to bring a deposit large enough to reduce the mortgage to manageable levels. A 25% deposit of £85k brings the loan down to £255k (5.1×), which opens the door to a wider range of specialist lenders without needing to approach private banks.',
    housePrice: 340000,
    salary: 50000,
    metaTitle: '£340k House on £50k Salary – Affordable in 2026?',
    metaDescription:
      'Can you afford a £340k house on a £50k salary in the UK? Get an instant 2026 affordability result with our free calculator. See deposit requirements and monthly costs.',
    relatedSlugs: [
      'can-i-afford-330k-house-on-50k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-360k-house-on-50k-salary-uk',
      'can-i-afford-375k-house-on-50k-salary-uk',
    ],
    richSections: {
      realisticVerdict: {
        headline: 'Difficult on a single £50k salary — a large deposit or joint application will help.',
        points: [
          'At 4.5× salary, a standard lender will offer around £225k — meaning you would need a £115k deposit to bridge the gap to £340k. That is a 34% deposit, well above the typical first-buyer range.',
          'Some specialist lenders and building societies do consider applications above 5× salary, particularly for professionals or those with low outgoings and clean credit.',
          'Adding a second income makes a significant difference. A combined household income of £75k–£80k would bring a £340k mortgage into standard lending territory.',
          'Monthly repayments on a £306k mortgage (10% deposit) at 4.5% over 25 years would be around £1,700 per month — roughly 55% of your net monthly pay.',
        ],
        bottomLine: 'A £340k home on £50k solo is possible only with specialist lending or a very large deposit. A joint application or a slightly lower purchase price will give you far more options and better rates.',
      },
      buyerScenario: {
        name: 'Marcus, 38 — senior engineer, Cambridge',
        situation: 'Marcus earns £50,000 and has been saving aggressively for three years, accumulating £90,000. He is buying a two-bedroom terraced house in Cambridge at £338,000. Cambridge prices are high relative to the national average, but his employer — a tech company — offers a salary sacrifice scheme that has helped him save efficiently.',
        outcome: 'With a £90,000 deposit (26.6%), Marcus only needs a £248,000 mortgage — exactly 4.96× his salary. Several building societies operate at up to 5× without specialist criteria. Marcus is approved by his first-choice lender with a five-year fixed rate of 4.1%. His monthly repayment of £1,320 is about 41% of his take-home — workable given his modest lifestyle and no dependants.',
      },
      faqs: [
        {
          question: 'Can I buy a £340k house with a £50k salary?',
          answer: 'It is challenging on a single income. £340k is 6.8 times a £50k salary, above the 4–4.5× cap most lenders apply. A large deposit, specialist lender, or a joint application would improve your chances considerably.',
        },
        {
          question: 'How much deposit do I need for a £340k house?',
          answer: 'A minimum 5–10% deposit (£17,000–£34,000) is needed to start, but at 10% you are still asking a lender for 6.1× salary. A deposit of 20–30% (£68,000–£102,000) brings the loan-to-income ratio down to a more lender-friendly level.',
        },
        {
          question: 'What salary do I need for a £340k house?',
          answer: 'To borrow £340k at the standard 4.5× multiple, you would need a salary of around £76,000. With a 20% deposit (£68,000), the required mortgage drops to £272,000 — needing roughly £60,500 salary.',
        },
        {
          question: 'How does £340k compare to £350k affordability?',
          answer: 'The £10k difference is relatively small — both prices sit well above what a £50k salary can support with standard lending. The key factors (deposit size, lender type, joint vs. solo) are the same for both.',
        },
      ],
    },
  },
  {
    slug: 'can-i-afford-350k-house-on-50k-salary-uk',
    h1: 'Can I afford a £350k house on a £50k salary in the UK?',
    shortAnswer:
      'Seven times salary is where even specialist lenders start to raise an eyebrow. On £50k, £350k is genuinely hard to buy alone without either a deposit of £125k or more, or a second income on the application. That said, it is not unheard of — the right combination of clean credit, stable employment, and low outgoings can still open doors with the right broker.',
    housePrice: 350000,
    salary: 50000,
    metaTitle: '£350k House on £50k Salary: Reality Check (2026) – Can You Actually Afford It?',
    metaDescription:
      'Is a £350k house affordable on a £50k salary in the UK? Find out instantly with our free 2026 calculator, built around UK lending standards.',
    relatedSlugs: [
      'can-i-afford-330k-house-on-50k-salary-uk',
      'can-i-afford-340k-house-on-50k-salary-uk',
      'can-i-afford-360k-house-on-50k-salary-uk',
      'can-i-afford-370k-house-on-50k-salary-uk',
      'can-i-afford-375k-house-on-50k-salary-uk',
      'can-i-afford-400k-house-on-50k-salary-uk',
      'can-i-afford-a-house-in-london-on-50k',
    ],
    richSections: {
      propertyExamples: [
        {
          location: 'London (Zone 4–6)',
          description: 'A one-bedroom flat or a small two-bedroom apartment in outer boroughs such as Croydon, Bromley, or Barking. Expect compact living — around 500–650 sq ft — with good transport links into the city.',
        },
        {
          location: 'Manchester / Leeds',
          description: 'A well-presented two or three-bedroom semi-detached house in a commuter suburb. Areas like Salford, Stretford, or Headingley regularly see properties in this price range.',
        },
        {
          location: 'Birmingham',
          description: 'A spacious three-bedroom semi or a smaller detached house in areas like Solihull, Sutton Coldfield, or Erdington. Good value for money compared to London.',
        },
        {
          location: 'Bristol',
          description: 'A two-bedroom flat or a compact terraced house in areas such as Bedminster, Fishponds, or Horfield. Bristol remains one of the more expensive regional cities.',
        },
        {
          location: 'Yorkshire / East Midlands',
          description: 'A detached three or four-bedroom family home is well within reach. Cities like Sheffield, Nottingham, and Derby offer strong value at this price point.',
        },
      ],
      mortgageScenarios: [
        {
          deposit: 35000,
          loanAmount: 315000,
          monthlyPayment: 1780,
          rate: 4.5,
          term: 25,
        },
        {
          deposit: 52500,
          loanAmount: 297500,
          monthlyPayment: 1638,
          rate: 4.2,
          term: 25,
        },
        {
          deposit: 70000,
          loanAmount: 280000,
          monthlyPayment: 1518,
          rate: 4.0,
          term: 25,
        },
      ],
      realisticVerdict: {
        headline: 'Tight on a single £50k salary — possible, but not straightforward.',
        points: [
          'Most high-street lenders cap borrowing at 4–4.5× salary. On £50k that is a maximum mortgage of £200k–£225k, leaving a gap of £125k–£150k that you would need to cover with a deposit.',
          'To bridge that gap with a 10% deposit (£35k) you would need a lender willing to go to 6.3× salary. This is above the standard limit, but some specialist lenders and smaller building societies do offer it in the right circumstances.',
          'A joint application changes the maths significantly. Adding a second income of £30k–£40k would typically bring this purchase into standard lending range.',
          'Your take-home pay on £50k is roughly £3,100–£3,200 per month. A mortgage of £315k at current rates costs around £1,780/month — over half your take-home before any bills, food, or childcare.',
          'Government schemes such as Shared Ownership or First Homes (where available) could reduce the purchase price and make the numbers work more comfortably.',
        ],
        bottomLine: 'On a single £50k salary, buying a £350k home solo is genuinely difficult without either a large deposit (£100k+) or a specialist lender. A joint application or a lower-priced property is likely to be a more realistic starting point for most buyers.',
      },
      buyerScenario: {
        name: 'Nadia, 41 — GP partner, outer London',
        situation: 'Nadia earns £50,000 from her salaried GP role (she recently reduced her sessions) and has £120,000 saved from a previous property sale. She is targeting a two-bedroom flat in Croydon at £349,000 for a fresh start after separating from her partner.',
        outcome: 'With a £120,000 deposit (34%), Nadia only needs a £229,000 mortgage — 4.58× her salary, just above standard criteria. A lender that includes professional income flexibility for NHS practitioners approves her at 4.6×. Her monthly repayment is £1,280. Although she is buying at the top of what her income supports, the large deposit gives her significant equity from day one.',
      },
      faqs: [
        {
          question: 'Can I buy a £350k house with a £50k salary?',
          answer: 'It is possible, but difficult on a single income. £350k is 7 times a £50k salary, which is above the 4–4.5× cap most high-street lenders apply. You would typically need either a large deposit (£100k+), a specialist lender, or a second applicant to make it work.',
        },
        {
          question: 'How much deposit would I need for a £350k house?',
          answer: 'The minimum is usually 5–10% (£17,500–£35,000), but at a 10% deposit you would still be asking a lender to offer 6.3× your salary, which most will not do. A 25–30% deposit (£87,500–£105,000) brings the loan-to-income ratio down to a more acceptable level and gives you access to better rates.',
        },
        {
          question: 'What salary do I need for a £350k house?',
          answer: 'At the standard 4.5× lending multiple, you need a gross salary of around £78,000 to borrow £350k. If you have a 25% deposit (£87,500) and only need a £262,500 mortgage, you would need roughly £58,000. A joint application combining two incomes is often the most practical route.',
        },
        {
          question: 'How much mortgage can I get on a £50k salary?',
          answer: 'Most lenders will offer between £200,000 and £225,000 (4–4.5× salary). Some specialist lenders go up to 5× or even 5.5× for professionals, giving a maximum of around £250,000–£275,000. Going higher than that typically requires exceptional circumstances or a very large deposit.',
        },
      ],
    },
  },
  {
    slug: 'can-i-afford-360k-house-on-50k-salary-uk',
    h1: 'Can I afford a £360k house on a £50k salary in the UK?',
    shortAnswer:
      'At 7.2 times your salary, £360k is £10k harder than £350k — and £350k was already a stretch. The deposit maths is unforgiving: even at 25% down (£90k) you are borrowing £270k, which is 5.4× your salary. You need a specialist lender or a second income. The calculator below will show you exactly how your own numbers stack up.',
    housePrice: 360000,
    salary: 50000,
    metaTitle: '£360k House on £50k Salary – Real Affordability (2026)',
    metaDescription:
      'Can you afford a £360k house on a £50k salary in the UK? Get an instant 2026 result. See deposit requirements, lending limits, and what your monthly payments would look like.',
    relatedSlugs: [
      'can-i-afford-340k-house-on-50k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-370k-house-on-50k-salary-uk',
      'can-i-afford-375k-house-on-50k-salary-uk',
    ],
    richSections: {
      realisticVerdict: {
        headline: 'Very stretched on a single £50k salary — specialist lending or a joint application needed.',
        points: [
          'Standard lenders cap borrowing at 4–4.5× salary. On £50k that is £200k–£225k, meaning you would need a £135k–£160k deposit to buy at £360k without exceeding that limit.',
          'Some specialist lenders will consider 5–5.5× salary for the right applicant, bringing the required deposit down to around £85k–£110k (roughly 24–30%).',
          'Monthly repayments on a £324k mortgage (10% deposit) at 4.5% over 25 years are approximately £1,800 — around 58% of your net monthly income.',
          'A second income on the application can bring the purchase well within standard lending range. A combined income of £80k would put a £360k mortgage comfortably within reach.',
        ],
        bottomLine: 'Buying a £360k home on a single £50k salary is very difficult without a substantial deposit or specialist lending. The £350k page covers similar territory — the same constraints apply here, just slightly more acute.',
      },
      buyerScenario: {
        name: 'Sophie and Ben — blended household, Bristol',
        situation: 'Sophie earns £35,000 and Ben earns £15,000 part-time, giving a joint income of £50,000. They have £70,000 saved including a Help to Buy ISA bonus. They are looking at a three-bedroom family home in Fishponds, Bristol at £358,000, which they need for space as they have a toddler.',
        outcome: 'Their £70,000 deposit (19.6%) means they need £288,000 — 5.76× combined salary. A specialist family mortgage lender assesses their full household outgoings and, despite Ben\'s lower income, his long-term employment history as a teaching assistant counts in their favour. They are offered £285,000, leaving a small £3,000 shortfall they cover by negotiating the purchase price down. Monthly repayments are £1,600, which is manageable on their combined take-home.',
      },
      faqs: [
        {
          question: 'Can I buy a £360k house with a £50k salary?',
          answer: 'It is very difficult on a single income. £360k is 7.2 times a £50k salary, well above the standard 4–4.5× lending cap. You would need either a deposit of £135k+, a specialist lender willing to go above 5×, or a second applicant on the mortgage.',
        },
        {
          question: 'How much deposit do I need for a £360k house?',
          answer: 'A minimum of 5–10% (£18,000–£36,000) is required to start, but at that level the remaining mortgage is still far above standard lending multiples for £50k. A 25–30% deposit (£90,000–£108,000) is more realistic for getting a lender to say yes.',
        },
        {
          question: 'What salary do I need for a £360k house?',
          answer: 'To borrow £360k at the standard 4.5× multiple you would need a salary of about £80,000. With a 20% deposit (£72,000), the mortgage drops to £288,000, requiring roughly £64,000 — still above £50k.',
        },
        {
          question: 'Is £360k similar to £350k for a £50k salary?',
          answer: 'Yes — the affordability picture is almost identical. Both sit around 7× your salary and require either a large deposit or a joint application. If the £350k page results do not look encouraging, the £360k calculation will be equally challenging.',
        },
      ],
    },
  },
  {
    slug: 'can-i-afford-375k-house-on-50k-salary-uk',
    h1: 'Can I afford a £375k house on a £50k salary in the UK?',
    shortAnswer:
      'A £375k purchase on a £50k income is in the same difficult territory as £350k–£370k, but the extra £25k matters: it rules out a few lenders who draw a hard line at 7× salary. If you are serious about this price point on this income, your best opening move is speaking to a whole-of-market broker rather than approaching lenders directly — they know which policies will flex for the right borrower profile.',
    housePrice: 375000,
    salary: 50000,
    metaTitle: '£375k House on £50k Salary – Can You Afford It? (2026)',
    metaDescription:
      'Can you afford a £375k house on a £50k salary in the UK? Get an honest 2026 affordability estimate. See what deposit you would need and what monthly payments look like.',
    relatedSlugs: [
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-360k-house-on-50k-salary-uk',
      'can-i-afford-370k-house-on-50k-salary-uk',
      'can-i-afford-400k-house-on-50k-salary-uk',
    ],
    richSections: {
      realisticVerdict: {
        headline: 'Very difficult on a single £50k salary without specialist lending or a joint application.',
        points: [
          'At 4.5× salary, a standard lender offers £225k. To buy at £375k you would need a deposit of £150k (40%) — substantial even for experienced homeowners.',
          'Specialist lenders at 5× offer £250k, reducing the required deposit to £125k (33%). At 5.5× you could borrow £275k and need £100k deposit (27%).',
          'Monthly repayments on a £337,500 mortgage (10% deposit) at 4.5% over 25 years would be around £1,875 — close to 60% of your net monthly pay.',
          'A joint application with a combined income of around £83k–£85k would allow most standard lenders to comfortably offer the full mortgage amount needed.',
        ],
        bottomLine: 'On a single £50k salary, a £375k purchase is only realistic with either a very large deposit (£100k+), a specialist lender, or a second applicant. Compare with the £350k page — if that already looked tight, this will be harder still.',
      },
      buyerScenario: {
        name: 'Kieran, 44 — self-employed photographer, Edinburgh',
        situation: 'Kieran has been self-employed for eight years and averages £50,000 net profit per year over the last three years. He has £100,000 in savings, partly from selling his studio equipment and downsizing his business. He is buying a two-bedroom flat in Leith at £370,000.',
        outcome: 'Self-employed buyers need at least two years of accounts, which Kieran has. His average income over three years is used by lenders, which smooths out his variable earnings. With a £100,000 deposit (27%), he needs £270,000 — 5.4×. A lender specialising in self-employed mortgages assesses his SA302 tax calculations and approves him. The process takes longer than an employed buyer, but his strong deposit and consistent profit history make it achievable.',
      },
      faqs: [
        {
          question: 'Can I buy a £375k house with a £50k salary?',
          answer: 'It is very unlikely without substantial help. £375k is 7.5 times a £50k salary, which is well beyond the 4–4.5× most lenders accept. You would need either a £150k+ deposit, a specialist lender, or a second income on the application.',
        },
        {
          question: 'How much deposit do I need for a £375k house?',
          answer: 'A 10% deposit is £37,500, but that still leaves a £337,500 mortgage — 6.75 times your salary. To get the loan-to-income ratio below 5×, you would need a deposit of around £125,000 (33%). A 25% deposit (£93,750) helps on rates but still leaves the multiple above standard limits.',
        },
        {
          question: 'What salary do I need for a £375k house?',
          answer: 'At the standard 4.5× multiple you would need a salary of £83,333 to borrow the full £375k. With a 25% deposit (£93,750), the mortgage is £281,250 — needing roughly £62,500. A joint application is the most practical route at lower salaries.',
        },
        {
          question: 'How does £375k compare to £350k on a £50k salary?',
          answer: 'The extra £25k makes an already stretched scenario slightly harder. Both require specialist lending or a large deposit on a £50k salary. If the £350k affordability check already looks tight, expect the same issues here — just with £25k less room to manoeuvre.',
        },
      ],
    },
  },
  {
    slug: 'can-i-afford-370k-house-on-50k-salary-uk',
    h1: 'Can I afford a £370k house on a £50k salary in the UK?',
    shortAnswer:
      'At 7.4 times salary, £370k on £50k represents one of the harder scenarios in this cluster. The gap between what standard lenders offer (£225k) and what you need to borrow (£333k at 10% deposit) is substantial. Unless you have a deposit exceeding £100k, a joint application is almost certainly the most practical path to ownership at this price.',
    housePrice: 370000,
    salary: 50000,
    metaTitle: '£370k House on £50k Salary – What Are Your Options? (2026)',
    metaDescription:
      'Can you afford a £370k house on a £50k salary in the UK? Get an honest 2026 affordability estimate. See how much deposit you need and which lenders to approach.',
    relatedSlugs: [
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-360k-house-on-50k-salary-uk',
      'can-i-afford-375k-house-on-50k-salary-uk',
      'can-i-afford-400k-house-on-50k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Liam, 35 — civil servant (HEO grade), London commuter belt',
        situation: 'Liam earns £50,000 in a senior civil service role and has saved £85,000 over seven years. He is relocating from London and targeting a four-bedroom detached house in Milton Keynes at £368,000, giving him the space to work from home.',
        outcome: 'With an £85,000 deposit (23%), Liam needs a £283,000 mortgage — 5.66× salary. A lender that considers stable public-sector employment as a reduced-risk factor offers up to 5.5×, approving £275,000. Liam negotiates the seller down to £360,000, closing the gap. His monthly repayment on the revised purchase is £1,560, which is around 48% of take-home — tight, but enabled by his exceptionally low outgoings and no other debt.',
      },
    },
  },
  {
    slug: 'can-i-afford-400k-house-on-50k-salary-uk',
    h1: 'Can I afford a £400k house on a £50k salary in the UK?',
    shortAnswer:
      'At 8 times salary, a £400k property on £50k is where most solo buyers genuinely hit a wall. Even private banks rarely lend above 6× without exceptional collateral. To make this work without a second applicant, you would typically need a deposit of £175,000 or more — bringing the mortgage down to 4.5× or below. That level of savings is uncommon on a £50k salary without inheritance, property equity, or a long savings horizon.',
    housePrice: 400000,
    salary: 50000,
    metaTitle: '£400k House on £50k Salary – Is It Possible? (2026)',
    metaDescription:
      'Can you afford a £400k house on a £50k salary in the UK? This is a challenging scenario — find out exactly what it would take with our free 2026 calculator.',
    relatedSlugs: [
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-370k-house-on-50k-salary-uk',
      'can-i-afford-400k-house-on-60k-salary-uk',
      'can-i-afford-500k-house-on-70k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Emma and David — joint application, Surrey',
        situation: 'Emma earns £32,000 and David earns £18,000 — a combined income of £50,000. They have £80,000 saved, largely from a Help to Buy ISA held for six years. They want a four-bedroom home in Guildford, Surrey at £398,000 to accommodate Emma\'s mother who will contribute £15,000 toward the deposit.',
        outcome: 'Total deposit is £95,000 (24%), leaving a mortgage of £303,000 — 6.06× combined income. This is very high, even for specialist lenders assessing joint applications. A broker finds a lender who applies individual income multiples rather than combined, allowing 5.5× on Emma\'s income (£176,000) and 5× on David\'s (£90,000) for a combined maximum of £266,000 — still short. They adjust their search to a £365,000 property nearby and succeed.',
      },
    },
  },
  {
    slug: 'can-i-afford-400k-house-on-60k-salary-uk',
    h1: 'Can I afford a £400k house on a £60k salary in the UK?',
    shortAnswer:
      'A £400k property on a £60k salary is 6.7 times your income — considerably more manageable than the same property on £50k. With a 20% deposit (£80k) you need a £320,000 mortgage, which is 5.3× salary. That is achievable through specialist and professional mortgage lenders without venturing into private-bank territory. The key differentiators at this level are your existing debt load and employment stability.',
    housePrice: 400000,
    salary: 60000,
    metaTitle: '£400k House on £60k Salary – Mortgage Affordability (2026)',
    metaDescription:
      'Can a £60k salary support a £400k mortgage in the UK? Check your 2026 affordability instantly. See deposit options, lending limits, and monthly payments.',
    relatedSlugs: [
      'can-i-afford-300k-house-on-45k-salary-uk',
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-500k-house-on-70k-salary-uk',
      'can-i-afford-600k-house-on-80k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Helen, 40 — finance director (early career), Reading',
        situation: 'Helen has just been promoted to finance director at a mid-size firm and her salary jumped from £48,000 to £60,000 six months ago. She has £75,000 in savings and is buying a three-bedroom detached house in Caversham, Reading at £398,000. Her previous two years of P60s show the lower salary, which complicates her application.',
        outcome: 'Lenders typically use the lower of the last two years\' income for salary assessment. Helen\'s broker finds a lender who will use the latest contracted salary where supported by an employer letter. With this, she qualifies for a £280,000 mortgage at 4.67× her new salary. Combined with her £75,000 deposit and a small seller contribution negotiated at exchange, the purchase proceeds. Repayments are £1,560/month.',
      },
    },
  },
  {
    slug: 'can-i-afford-500k-house-on-70k-salary-uk',
    h1: 'Can I afford a £500k house on a £70k salary in the UK?',
    shortAnswer:
      'A £500k property on a £70k salary (7.1× income) is firmly in the stretched-but-possible territory familiar to buyers in southern England and major cities. Standard lending gives you £315,000 — so a deposit of £185,000 would make this straightforward, but that is a high bar. More realistic is a 20% deposit (£100k) and a specialist lender at 5.7×, or a joint application if a second income is available.',
    housePrice: 500000,
    salary: 70000,
    metaTitle: '£500k House on £70k Salary – Is It Achievable? (2026)',
    metaDescription:
      'Is a £500k home affordable on a £70k salary in the UK? Our free 2026 calculator gives you an instant, personalised result based on real lending criteria.',
    relatedSlugs: [
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-400k-house-on-60k-salary-uk',
      'can-i-afford-600k-house-on-80k-salary-uk',
      'can-i-afford-700k-house-on-90k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Chloe and Ryan — two incomes, South West London',
        situation: 'Chloe earns £42,000 as a solicitor and Ryan earns £28,000 as a graphic designer — a combined income of £70,000. They have £90,000 saved between them and are looking at a two-bedroom flat in Tooting, South West London at £495,000.',
        outcome: 'With a £90,000 deposit (18.2%), they need a £405,000 mortgage — 5.79× combined income. A joint mortgage specialist lender approved by a broker offers 5.75× for dual-income applications where both borrowers have been continuously employed for two or more years. They qualify. Their monthly repayment of £2,280 is split across two incomes, making it more sustainable than it looks on paper.',
      },
    },
  },
  {
    slug: 'can-i-afford-600k-house-on-80k-salary-uk',
    h1: 'Can I afford a £600k house on an £80k salary in the UK?',
    shortAnswer:
      'A £600k property on an £80k salary (7.5×) sits in the bracket where you are moving away from high-street lenders and toward the specialist market. The encouraging news at this salary level is that your take-home is substantially higher, giving you more room to absorb repayments. A £120k deposit (20%) leaves a £480k mortgage at 6× — still needing a specialist lender, but one that serves a large market of buyers at this income level.',
    housePrice: 600000,
    salary: 80000,
    metaTitle: '£600k House on £80k Salary – Honest Affordability (2026)',
    metaDescription:
      'Can you afford a £600k home on an £80k salary in the UK? Get an honest 2026 affordability estimate. Discover what deposit and lender you would need.',
    relatedSlugs: [
      'can-i-afford-400k-house-on-60k-salary-uk',
      'can-i-afford-500k-house-on-70k-salary-uk',
      'can-i-afford-700k-house-on-90k-salary-uk',
      'can-i-afford-800k-house-on-100k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Jonathan, 47 — senior finance manager, Surrey',
        situation: 'Jonathan earns £80,000 basic salary with a discretionary bonus of around £15,000 — only the base is guaranteed. He has £150,000 saved from the sale of his previous flat. He is upsizing to a four-bedroom detached house in Esher, Surrey at £595,000.',
        outcome: 'With a £150,000 deposit (25.2%), Jonathan needs a £445,000 mortgage — 5.56× base salary. A specialist lender confirms they can include 50% of his average bonus over three years in the income assessment, bringing effective income to £87,500 and the multiple to 5.09×. He is approved. His monthly repayment of £2,500 is 41% of his take-home on base salary alone — sustainable, and lower if his bonus continues.',
      },
    },
  },
  {
    slug: 'can-i-afford-700k-house-on-90k-salary-uk',
    h1: 'Can I afford a £700k house on a £90k salary in the UK?',
    shortAnswer:
      'At 7.8 times salary, a £700k property on £90k represents a serious borrowing stretch. However, buyers at this income level are starting to attract the attention of private banks and high-net-worth lenders, who apply different criteria than the high street. A clean financial profile, a 25–30% deposit, and ideally assets beyond your salary will all strengthen your case significantly.',
    housePrice: 700000,
    salary: 90000,
    metaTitle: '£700k House on £90k Salary – What Are Your Options? (2026)',
    metaDescription:
      'Is a £700k house within reach on a £90k salary in the UK? Use our free 2026 calculator to find out what is realistically possible for your situation.',
    relatedSlugs: [
      'can-i-afford-500k-house-on-70k-salary-uk',
      'can-i-afford-600k-house-on-80k-salary-uk',
      'can-i-afford-800k-house-on-100k-salary-uk',
      'can-i-afford-1m-house-on-120k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Sarah and Paul — relocating from London, commuter belt',
        situation: 'Sarah is a barrister earning £90,000 and Paul has recently left employment to start a business. They have £200,000 equity from their London flat and are targeting a five-bedroom house in a village near Oxford at £695,000. Paul\'s lack of income complicates the application.',
        outcome: 'With Paul counted out of the mortgage for now, Sarah applies as a sole borrower. Her £200,000 deposit leaves a £495,000 mortgage — 5.5× her income. A legal professional mortgage product specifically for barristers and solicitors offers up to 5.5× on employed income. She is approved. Paul plans to add himself to the mortgage when his business income has two years of accounts, at which point they could remortgage at a lower rate.',
      },
    },
  },
  {
    slug: 'can-i-afford-800k-house-on-100k-salary-uk',
    h1: 'Can I afford an £800k house on a £100k salary in the UK?',
    shortAnswer:
      'An £800k property on £100k (8× salary) is where the private banking market becomes most relevant. High-street lenders will not touch this ratio, and even most specialist lenders cap at 6×. However, private banks and high-net-worth mortgage providers assess your full financial picture — investments, pension, assets — not just your salary multiple. If you have wealth beyond your salary, this becomes a different conversation.',
    housePrice: 800000,
    salary: 100000,
    metaTitle: '£800k House on £100k Salary – Can You Borrow Enough? (2026)',
    metaDescription:
      'Can you afford an £800k home on a £100k salary in the UK? Our free 2026 calculator shows an honest picture based on real UK lending standards.',
    relatedSlugs: [
      'can-i-afford-600k-house-on-80k-salary-uk',
      'can-i-afford-700k-house-on-90k-salary-uk',
      'can-i-afford-1m-house-on-120k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Michael, 51 — technology director, North London',
        situation: 'Michael earns £100,000 and has £220,000 in a Stocks & Shares ISA alongside £35,000 in cash savings. He is not planning to liquidate investments but wants to buy an £800,000 Victorian semi in Highgate, North London. He previously owned a property and has a strong credit record.',
        outcome: 'A private bank reviews Michael\'s full asset picture. With £255,000 total savings (31.9% deposit), he needs a £545,000 mortgage — 5.45× salary. The private bank approves up to 5.5× for clients with significant investable assets, treating the ISA as collateral for their affordability model. His repayment of £3,000/month is 42% of his take-home on £100k — challenging but achievable with his financial discipline and no other debt.',
      },
    },
  },
  {
    slug: 'can-i-afford-1m-house-on-120k-salary-uk',
    h1: 'Can I afford a £1 million house on a £120k salary in the UK?',
    shortAnswer:
      'A £1m property on a £120k salary (8.3×) sits firmly in private bank and specialist HNW lender territory. At this income level — above the personal allowance taper — your take-home pay is limited by a 60% effective marginal tax rate on £100k–£125k. This makes the monthly repayment as a proportion of take-home even more acute than the raw multiple suggests. That said, buyers at £120k with strong assets and pension wealth frequently do purchase at this level through the right channels.',
    housePrice: 1000000,
    salary: 120000,
    metaTitle: '£1 Million House on £120k Salary – Is It Possible? (2026)',
    metaDescription:
      'Can you afford a £1 million house on a £120k salary in the UK? Find out instantly with our free 2026 affordability calculator built for UK buyers.',
    relatedSlugs: [
      'can-i-afford-600k-house-on-80k-salary-uk',
      'can-i-afford-700k-house-on-90k-salary-uk',
      'can-i-afford-800k-house-on-100k-salary-uk',
    ],
    richSections: {
      buyerScenario: {
        name: 'Anna, 48 — senior partner at a law firm, West London',
        situation: 'Anna earns £120,000 and has built up £350,000 in savings over 20 years of senior roles. She is buying a four-bedroom house in Chiswick, West London at £1,000,000 as a long-term family home. Her pension pot stands at £480,000 and she has no outstanding mortgage or debt.',
        outcome: 'Anna\'s £350,000 deposit (35%) leaves a £650,000 mortgage — 5.42× her salary. Her effective take-home on £120k is around £6,400/month due to the personal allowance taper. A private bank, weighing her pension wealth and spotless credit history, approves the full £650,000 at a preferential rate of 3.9% for a 20-year term. Monthly repayments of £3,850 represent 60% of her take-home — tight, but manageable given no other financial commitments.',
      },
    },
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
