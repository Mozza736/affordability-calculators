export interface LocationPageData {
  slug: string;
  city: string;
  salary: number;
  avgHousePrice: number;
  h1: string;
  intro: string;
  localContext: string;
  metaTitle: string;
  metaDescription: string;
  relatedSlugs: string[];
}

export const LOCATION_PAGES: LocationPageData[] = [
  {
    slug: 'can-i-afford-a-house-in-london-on-50k',
    city: 'London',
    salary: 50000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £50,000 salary?',
    intro:
      'On a £50,000 salary, the average London home of £525,000 is 10.5 times your income — a ratio that makes solo ownership in most of the capital very difficult. The buyers who succeed at this income in London typically bring a large deposit, buy jointly with a partner, or use shared ownership in an outer borough. The calculator below will show you exactly where you stand.',
    localContext:
      'London\'s average house price is roughly 85% higher than the national UK average of around £285,000 — and that gap has widened materially since 2012. On £50,000, standard 4.5× lending supports a mortgage of £225,000. Even with a 20% deposit of £105,000, your budget reaches £330,000 — below the floor price for most two-bedroom flats in Zone 3. Outer boroughs like Barking and Dagenham, Havering, and Bexley offer the most accessible outright purchase options. Alternatively, shared ownership schemes let buyers purchase a 30–50% stake, reducing the mortgage needed and making Zone 4–5 flats achievable. A second income changes the picture considerably: two salaries of £50k together unlock up to £450,000 in standard borrowing.',
    metaTitle: 'Buy in London on £50k Salary? Real Answer (2026)',
    metaDescription:
      'Can you afford a house in London on a £50k salary in 2026? Get an instant, honest affordability result. See deposit requirements and what lenders will offer.',
    relatedSlugs: [
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-a-house-in-bristol-on-45k',
      'can-i-afford-a-house-in-edinburgh-on-45k',
      'can-i-afford-a-house-in-manchester-on-40k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-manchester-on-40k',
    city: 'Manchester',
    salary: 40000,
    avgHousePrice: 245000,
    h1: 'Can I afford a house in Manchester on a £40,000 salary?',
    intro:
      'Manchester has seen strong house price growth over the past decade, but it remains far more affordable than London. On a £40,000 salary, buying in Manchester is a realistic goal for many — particularly if you have a decent deposit saved and keep monthly outgoings manageable.',
    localContext:
      'Average house prices in Manchester sit at around £245,000, roughly 6 times a £40,000 salary. Certain areas like Salford and parts of East Manchester remain more accessible, while Didsbury and Chorlton command a premium. Manchester\'s regeneration and strong rental market also make it attractive for first-time buyers looking to build equity.',
    metaTitle: 'Buy in Manchester on £40k Salary? 2026 Affordability',
    metaDescription:
      'Can you afford a house in Manchester on a £40k salary in 2026? Get an instant affordability estimate. See average prices, deposit guidance, and lending limits.',
    relatedSlugs: [
      'can-i-afford-a-house-in-liverpool-on-30k',
      'can-i-afford-a-house-in-leeds-on-35k',
      'can-i-afford-a-house-in-birmingham-on-35k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-birmingham-on-35k',
    city: 'Birmingham',
    salary: 35000,
    avgHousePrice: 230000,
    h1: 'Can I afford a house in Birmingham on a £35,000 salary?',
    intro:
      'Birmingham offers considerably more value than London or Bristol, making it one of the more achievable cities for first-time buyers on modest salaries. A £35,000 salary gives you a reasonable starting point, though your deposit and monthly commitments will still determine whether a lender says yes.',
    localContext:
      'Average house prices in Birmingham are approximately £230,000, placing the salary multiple at around 6.6 times a £35,000 income. Areas like Harborne and Moseley are more expensive, while suburbs such as Erdington and Perry Barr offer more accessible entry points. Birmingham\'s ongoing regeneration — boosted by investment around the 2022 Commonwealth Games — has steadily pushed prices upward.',
    metaTitle: 'Buy in Birmingham on £35k Salary? 2026 Affordability',
    metaDescription:
      'Can you afford a house in Birmingham on a £35k salary in 2026? Find out instantly with our free UK affordability calculator. See what you can realistically borrow.',
    relatedSlugs: [
      'can-i-afford-a-house-in-manchester-on-40k',
      'can-i-afford-a-house-in-nottingham-on-35k',
      'can-i-afford-a-house-in-leeds-on-35k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-leeds-on-35k',
    city: 'Leeds',
    salary: 35000,
    avgHousePrice: 220000,
    h1: 'Can I afford a house in Leeds on a £35,000 salary?',
    intro:
      'Leeds is one of the more accessible major UK cities for buyers on mid-range salaries. Average prices are broadly in line with what a £35,000 earner could realistically target, especially with a 10–15% deposit saved. Your full affordability picture depends on your expenses and any existing debt.',
    localContext:
      'The average house price in Leeds is around £220,000 — approximately 6.3 times a £35,000 salary. Popular areas like Headingley and Chapel Allerton sit above this average, while Beeston, Armley, and parts of East Leeds offer more affordable options. Leeds benefits from a strong jobs market and good transport links, supporting sustained demand and steady price growth.',
    metaTitle: 'Buy in Leeds on £35k Salary? Instant Result (2026)',
    metaDescription:
      'Can you afford a house in Leeds on a £35k salary in 2026? Get an instant result with our free UK affordability calculator. See local prices and mortgage options.',
    relatedSlugs: [
      'can-i-afford-a-house-in-manchester-on-40k',
      'can-i-afford-a-house-in-birmingham-on-35k',
      'can-i-afford-a-house-in-nottingham-on-35k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-bristol-on-45k',
    city: 'Bristol',
    salary: 45000,
    avgHousePrice: 360000,
    h1: 'Can I afford a house in Bristol on a £45,000 salary?',
    intro:
      'Bristol is one of the most in-demand cities outside London, with prices that reflect its reputation for quality of life, strong employment, and vibrant culture. On a £45,000 salary, buying in Bristol is challenging but not impossible — it depends on where you buy and how much deposit you have.',
    localContext:
      'Bristol\'s average house price is approximately £360,000, which is 8 times a £45,000 salary — well above the standard 4.5× lending multiple. Areas like Clifton and Redland are among the most expensive, while Knowle, St George, and Filton offer more accessible entry points. Strong demand from young professionals and limited housing supply continue to keep prices elevated relative to incomes.',
    metaTitle: 'Buy in Bristol on £45k Salary? Honest Answer (2026)',
    metaDescription:
      'Can you afford a house in Bristol on a £45k salary in 2026? Get an honest affordability estimate. See deposit needs, lending caps, and realistic buying options.',
    relatedSlugs: [
      'can-i-afford-350k-house-on-50k-salary-uk',
      'can-i-afford-a-house-in-london-on-50k',
      'can-i-afford-a-house-in-edinburgh-on-45k',
      'can-i-afford-a-house-in-cardiff-on-35k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-liverpool-on-30k',
    city: 'Liverpool',
    salary: 30000,
    avgHousePrice: 175000,
    h1: 'Can I afford a house in Liverpool on a £30,000 salary?',
    intro:
      'Liverpool remains one of the most affordable large cities in England, making it one of the few places where a £30,000 salary gives buyers a genuine chance of purchasing without an enormous deposit. Your personal finances — particularly monthly outgoings and savings — will shape what you can realistically borrow.',
    localContext:
      'The average house price in Liverpool is around £175,000 — approximately 5.8 times a £30,000 salary. While still above the standard 4.5× lending multiple, Liverpool is among the most accessible cities for first-time buyers in the UK. Areas like Wavertree, Knotty Ash, and parts of North Liverpool offer good value, while Woolton and Mossley Hill command higher prices.',
    metaTitle: 'Buy in Liverpool on £30k Salary? 2026 Affordability',
    metaDescription:
      'Can you afford a house in Liverpool on a £30k salary in 2026? Find out instantly. Liverpool is one of the UK\'s most affordable cities — see what you can buy.',
    relatedSlugs: [
      'can-i-afford-a-house-in-manchester-on-40k',
      'can-i-afford-a-house-in-glasgow-on-30k',
      'can-i-afford-a-house-in-nottingham-on-35k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-nottingham-on-35k',
    city: 'Nottingham',
    salary: 35000,
    avgHousePrice: 205000,
    h1: 'Can I afford a house in Nottingham on a £35,000 salary?',
    intro:
      'Nottingham offers solid value for buyers looking outside the most expensive UK cities. On a £35,000 salary, you have a reasonable chance of getting on the property ladder here — provided your deposit is adequate and your monthly costs are under control.',
    localContext:
      'Average house prices in Nottingham are approximately £205,000 — around 5.9 times a £35,000 salary. This puts Nottingham among the more affordable English cities for mid-range earners. West Bridgford and Wollaton are the most desirable and expensive areas, while districts like Bestwood and Bulwell remain accessible for buyers on tighter budgets. Nottingham\'s large student population and growing tech sector support continued housing demand.',
    metaTitle: 'Buy in Nottingham on £35k Salary? 2026 Result',
    metaDescription:
      'Can you afford a house in Nottingham on a £35k salary in 2026? Get an instant affordability estimate. One of England\'s most accessible cities for buyers.',
    relatedSlugs: [
      'can-i-afford-a-house-in-leeds-on-35k',
      'can-i-afford-a-house-in-birmingham-on-35k',
      'can-i-afford-a-house-in-liverpool-on-30k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-glasgow-on-30k',
    city: 'Glasgow',
    salary: 30000,
    avgHousePrice: 165000,
    h1: 'Can I afford a house in Glasgow on a £30,000 salary?',
    intro:
      'Glasgow is one of the most affordable major cities in the UK, offering buyers on lower salaries a genuine pathway to homeownership. On £30,000 a year, purchasing in Glasgow is achievable — particularly in areas outside the city centre. The calculator below will give you a personalised result based on your full financial picture.',
    localContext:
      'Average house prices in Glasgow sit at around £165,000 — approximately 5.5 times a £30,000 salary. Scotland also operates under a different property purchase tax system (LBTT) rather than Stamp Duty, which can reduce upfront buying costs for properties below £145,000. Popular affordable areas include Shettleston, Baillieston, and parts of the south side, while the West End and Merchant City carry a significant premium.',
    metaTitle: 'Buy in Glasgow on £30k Salary? 2026 Affordability',
    metaDescription:
      'Can you afford a house in Glasgow on a £30k salary in 2026? Glasgow is among the UK\'s most affordable cities — get an instant, free result now.',
    relatedSlugs: [
      'can-i-afford-a-house-in-liverpool-on-30k',
      'can-i-afford-a-house-in-edinburgh-on-45k',
      'can-i-afford-a-house-in-cardiff-on-35k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-edinburgh-on-45k',
    city: 'Edinburgh',
    salary: 45000,
    avgHousePrice: 310000,
    h1: 'Can I afford a house in Edinburgh on a £45,000 salary?',
    intro:
      'Edinburgh is Scotland\'s most expensive city for property, driven by its status as a financial and cultural hub. On a £45,000 salary, buying in Edinburgh is competitive — you will need a solid deposit and a clear budget to stand a realistic chance in the current market.',
    localContext:
      'Average house prices in Edinburgh are approximately £310,000 — around 6.9 times a £45,000 salary. Unlike the rest of the UK, Scottish properties often sell above their Home Report valuation, adding further pressure on buyers. Leith, Gorgie, and Granton offer more affordable entry points, while Morningside and Stockbridge are among the most expensive areas. Scotland\'s Land and Buildings Transaction Tax (LBTT) applies instead of Stamp Duty, with rates and thresholds that can differ significantly.',
    metaTitle: 'Buy in Edinburgh on £45k Salary? 2026 Answer',
    metaDescription:
      'Can you afford a house in Edinburgh on a £45k salary in 2026? Edinburgh is competitive — get an instant, personalised result with our free calculator.',
    relatedSlugs: [
      'can-i-afford-a-house-in-glasgow-on-30k',
      'can-i-afford-a-house-in-bristol-on-45k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-cardiff-on-35k',
    city: 'Cardiff',
    salary: 35000,
    avgHousePrice: 240000,
    h1: 'Can I afford a house in Cardiff on a £35,000 salary?',
    intro:
      'Cardiff is the most affordable UK capital city for property, offering buyers on mid-range salaries a more realistic path to ownership than London or Edinburgh. On £35,000, buying in Cardiff is within reach for many — though your deposit and monthly outgoings will determine exactly what you can borrow.',
    localContext:
      'Average house prices in Cardiff are approximately £240,000 — around 6.9 times a £35,000 salary. While above the standard 4.5× lending multiple, Cardiff remains significantly cheaper than other UK capitals. Pontprennau and Lisvane are premium areas, while Ely, Llanrumney, and Rumney offer more affordable options. Wales operates under its own Land Transaction Tax (LTT) rather than Stamp Duty, with a nil-rate threshold currently set at £225,000 for first-time buyers.',
    metaTitle: 'Buy in Cardiff on £35k Salary? 2026 Affordability',
    metaDescription:
      'Can you afford a house in Cardiff on a £35k salary in 2026? Cardiff is the UK\'s most affordable capital — find out instantly with our free calculator.',
    relatedSlugs: [
      'can-i-afford-a-house-in-bristol-on-45k',
      'can-i-afford-a-house-in-birmingham-on-35k',
      'can-i-afford-a-house-in-glasgow-on-30k',
    ],
  },
];

export const LONDON_SALARY_PAGES: LocationPageData[] = [
  {
    slug: 'can-i-afford-a-house-in-london-on-30k',
    city: 'London',
    salary: 30000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £30,000 salary?',
    intro:
      'London\'s average house price of around £525,000 is 17.5 times a £30,000 salary — the rawest mismatch in the UK housing market. For most buyers at this income, outright solo purchase in the capital is not realistic without either significant inherited wealth or a joint application. Shared ownership and part-buy schemes are the practical entry points.',
    localContext:
      'On £30,000, standard 4.5× lending supports a mortgage of just £135,000. Even the most affordable London boroughs — Barking and Dagenham, Havering, Bexley — typically start at £250,000–£300,000 for a flat, meaning you would need a deposit of £115,000–£165,000 just to buy at the bottom of the market. Shared ownership (purchasing a 25–75% share through a housing association) is the route most buyers on £30k pursue in London. It reduces the mortgage needed but comes with rental payments on the unowned share, so total monthly costs still need careful budgeting.',
    metaTitle: 'Can I Afford a House in London on £30k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £30k salary in 2026? Honest, instant result. London averages are £525k — see what\'s realistic at this income level.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-35k',
      'can-i-afford-a-house-in-london-on-40k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-35k',
    city: 'London',
    salary: 35000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £35,000 salary?',
    intro:
      'At £35,000, the average London home of £525,000 is still 15 times your annual income. The gap is so wide that even a decade of aggressive saving would not close it through salary alone. The buyers who do get onto the London ladder at this income tend to use shared ownership, receive a family deposit contribution, or buy jointly with a partner.',
    localContext:
      'Standard 4.5× lending on £35,000 gives you a maximum mortgage of £157,500. At that level, a 10% deposit (£52,500) only funds a £210,000 property — covering a small number of leasehold flats in the very outer boroughs like Havering, Sutton, or Bexley. For anything resembling a typical London flat, you are looking at shared ownership with a housing association, where buying a 30–40% stake might only require a mortgage of £120,000–£150,000, suddenly bringing it into reach. Keep in mind that London\'s transport zones mean outer-borough living still gives you access to the whole city.',
    metaTitle: 'Can I Afford a House in London on £35k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £35k salary in 2026? Honest, instant answer. London prices average £525k — see what options exist at this salary.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-30k',
      'can-i-afford-a-house-in-london-on-40k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-40k',
    city: 'London',
    salary: 40000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £40,000 salary?',
    intro:
      'On a £40,000 salary, the arithmetic of London homeownership is uncompromising. At 13 times your income, the average property sits far beyond what any mainstream lender will offer. The buyers who succeed at this income tend to be in a joint application, have received a significant deposit gift, or buy via shared ownership in an outer borough.',
    localContext:
      'On £40,000, standard 4.5× lending supports a mortgage of up to £180,000. Even adding a healthy 15% deposit of £40,000 only creates a £220,000 budget — enough for a very small number of leasehold flats in zone 5–6 areas like Rainham, Chafford Hundred, or the outer edges of Croydon. The shared ownership market widens the options considerably: buying a 40% share of a £350,000 flat requires a mortgage of roughly £140,000, which at £40k salary is borderline feasible. Barking and Dagenham regularly has the lowest outright purchase prices in Greater London.',
    metaTitle: 'Can I Afford a House in London on £40k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £40k salary in 2026? Honest answer with instant calculator. See what\'s possible and where in London you might buy.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-30k',
      'can-i-afford-a-house-in-london-on-35k',
      'can-i-afford-a-house-in-london-on-45k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-45k',
    city: 'London',
    salary: 45000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £45,000 salary?',
    intro:
      'A £45,000 salary gives you a maximum standard mortgage of around £202,500 — which covers roughly 38% of the average London house price. Solo outright purchase remains very difficult, but the shared ownership market and outer-borough flats do present genuinely achievable options for a determined buyer with a deposit saved.',
    localContext:
      'While £45k is above the London median salary, London\'s property market prices in far more than local earnings — it reflects global demand and constrained supply. The most accessible paths at this salary are: shared ownership in zones 3–6 (where buying a 35–50% share brings the mortgage into reach); outright purchase of a leasehold studio or one-bedroom flat in boroughs like Sutton, Bexley, or Havering with a substantial deposit; or a joint application where two incomes of around £45k each unlock the full market. London\'s first-time buyer Stamp Duty relief (£0 on the first £425,000) also helps reduce upfront costs.',
    metaTitle: 'Can I Afford a House in London on £45k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £45k salary in 2026? Get an instant, honest result. London prices are 85% above the UK average — see what\'s realistic for you.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-30k',
      'can-i-afford-a-house-in-london-on-35k',
      'can-i-afford-a-house-in-london-on-40k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-55k',
    city: 'London',
    salary: 55000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £55,000 salary?',
    intro:
      'At £55,000 you can borrow up to £247,500 under standard criteria — enough to start making a dent in London prices when combined with a meaningful deposit. A solo purchase of a one or two-bedroom flat in outer zones is achievable for a buyer with £60,000–£80,000 saved; without that deposit, shared ownership remains the more realistic path.',
    localContext:
      'The average London price of £525,000 is 9.5 times a £55,000 salary — still very stretched, but the picture starts to shift in outer boroughs. Waltham Forest, Enfield, and Bromley have seen strong growth, but still offer one-bedroom flats in the £300,000–£375,000 range. With a 20% deposit of £75,000 and a £55k salary, you can access mortgages up to £247,500 — giving a combined budget of around £322,500. That places a small flat within reach in the right areas. Inner London and anything above zone 3 generally remains out of scope for a solo buyer at this income.',
    metaTitle: 'Can I Afford a House in London on £55k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £55k salary in 2026? Find out instantly. London averages are £525k — see where your budget could take you.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-45k',
      'can-i-afford-a-house-in-london-on-60k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-60k',
    city: 'London',
    salary: 60000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £60,000 salary?',
    intro:
      'A £60,000 salary is where a solo London purchase starts to feel genuinely possible rather than aspirational. Your standard borrowing capacity of £270,000 combined with a solid deposit can realistically fund a flat in zones 3–5. You are still unlikely to crack inner London on one income, but the outer borough market is meaningfully within reach.',
    localContext:
      'At £60,000, the average London property (£525,000) is 8.75 times your income — still stretched, but a different conversation from sub-£50k. A 20% deposit (£75,000) plus a £270,000 mortgage gives a total budget of £345,000. In this range, buyers can consider two-bedroom flats in Lewisham, Hounslow, East Ham, or Woolwich — all areas with good transport links and ongoing regeneration. Terraced houses become available in the outermost zones with the right combination of deposit size and lender flexibility. A specialist lender willing to go 5.5× would push the budget to £330,000 in borrowing alone.',
    metaTitle: 'Can I Afford a House in London on £60k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £60k salary in 2026? Get an honest affordability estimate. See what London boroughs are within reach on this salary.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-55k',
      'can-i-afford-a-house-in-london-on-70k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-70k',
    city: 'London',
    salary: 70000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £70,000 salary?',
    intro:
      'At £70,000, London homeownership shifts from theoretical to genuinely achievable for many buyers. Your maximum standard mortgage of £315,000, combined with a deposit of 15–20%, opens a real range of properties across mid and outer London. You are not yet cracking Zone 2, but Zone 3–5 has a lot to offer.',
    localContext:
      'On £70,000, standard 4.5× lending gives you up to £315,000. Adding a 20% deposit of £87,500 (a significant but not impossible savings target over several years) creates a combined budget of £402,500. At this level, buyers can compete for two-bedroom flats in regenerating inner-outer zones: Croydon, Newham, Bexley, and Barking all have stock in this range. Some two-bedroom houses in the far outer zones start here too. Specialist lenders offering 5.5× push the borrowing to £385,000, meaning a 15% deposit unlocks nearly £440,000 — approaching the inner zone flat market.',
    metaTitle: 'Can I Afford a House in London on £70k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £70k salary in 2026? Instant affordability result. London prices are 85% above the UK average — see your realistic options.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-60k',
      'can-i-afford-a-house-in-london-on-80k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-80k',
    city: 'London',
    salary: 80000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on an £80,000 salary?',
    intro:
      'An £80,000 salary opens London up in a meaningful way. For the first time, the average London property (£525,000) starts to look like something you could approach with the right deposit rather than something structurally out of reach. A 20% deposit puts a broad range of Zone 2–3 flats and Zone 3–4 houses within striking distance.',
    localContext:
      'On £80,000, the standard 4.5× mortgage maximum is £360,000. A 20% deposit of £105,000 (achievable with a sustained savings plan or help from family) gives a combined budget of £465,000 — approaching the London average. This opens up: two-bedroom flats in Hackney, Haringey, and Lewisham; smaller houses in Wandsworth and parts of East London; and a wide selection of properties in Zones 3–4. Specialist lenders at 5.5× push the mortgage alone to £440,000, which combined with a 15% deposit creates a £520,000 budget — right at the London average without needing a very large deposit.',
    metaTitle: 'Can I Afford a House in London on £80k? (2026)',
    metaDescription:
      'Can you afford a house in London on an £80k salary in 2026? Honest, instant result. See which London boroughs become realistic at this income level.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-70k',
      'can-i-afford-a-house-in-london-on-90k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-90k',
    city: 'London',
    salary: 90000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £90,000 salary?',
    intro:
      'At £90,000, you are within striking distance of the London average. The average property (£525,000) is 5.8 times your income — above the 4.5× standard, but close enough that a 15–20% deposit closes most of the gap without needing specialist lenders. This is the income level where inner-London starts to enter the picture.',
    localContext:
      'On £90,000, a 4.5× mortgage supports borrowing of £405,000. With a 15% deposit of £90,000, your total budget reaches £495,000 — near the London average, and realistic without any specialist lending. At this level, buyers can seriously consider two and three-bedroom flats in Peckham, Walthamstow, Battersea, and Stoke Newington. Parts of Islington, Hackney, and Kentish Town also start to appear. A specialist lender at 5.5× extends the mortgage to £495,000, with a 15% deposit creating a £585,000 total budget — opening up larger inner-city properties and small family houses.',
    metaTitle: 'Can I Afford a House in London on £90k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £90k salary in 2026? Get an instant result. At this salary, inner London starts to become realistic — see the details.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-80k',
      'can-i-afford-a-house-in-london-on-100k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-100k',
    city: 'London',
    salary: 100000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £100,000 salary?',
    intro:
      'On £100,000, the average London property is 5.25 times your income — close enough to standard lending limits that a 15% deposit puts the London average comfortably within reach without any specialist lending. This is the income level where London starts to feel accessible rather than aspirational, and where your choice of location genuinely widens.',
    localContext:
      'Note: on £100,000, your personal allowance begins to taper, which reduces your take-home pay more sharply than the salary increase suggests. Despite this, a 4.5× mortgage on £100,000 supports up to £450,000 in borrowing. With a 15% deposit of £90,000, your total budget reaches £540,000 — covering the full London average. This unlocks family-sized properties in areas like Lewisham, Haringey, and Enfield, as well as quality two and three-bedroom flats in Zone 2 boroughs including Brixton, Dalston, and Camberwell. Adding a specialist lender at 5.5× and a slightly larger deposit moves the budget to £600,000+, bringing parts of Clapham and Stoke Newington into view.',
    metaTitle: 'Can I Afford a House in London on £100k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £100k salary in 2026? Instant result. At £100k, the average London home is within reach — see your full affordability picture.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-90k',
      'can-i-afford-a-house-in-london-on-120k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-120k',
    city: 'London',
    salary: 120000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £120,000 salary?',
    intro:
      'At £120,000, the average London home (£525,000) is just 4.4 times your salary — inside the standard 4.5× lending limit for the first time in this cluster. This marks a genuine turning point: for buyers at this income, London\'s mainstream market is open without needing specialist lenders, and a standard deposit gives you real choice across a broad range of boroughs.',
    localContext:
      'At £120,000 your personal allowance is fully withdrawn (it tapers to zero between £100,000 and £125,140), so your effective marginal tax rate on earnings above £100k is 60%. Despite this, a 4.5× mortgage supports borrowing of up to £540,000 — enough to fund the average London home outright without any deposit. Adding a 10–15% deposit takes your budget to £594,000–£621,000, covering: well-presented houses and larger flats in Clapham, Greenwich, Stoke Newington, and Hammersmith; period conversions in Kensal Rise and Honor Oak; and new builds in Zone 1 fringe areas. Almost all of London becomes theoretically accessible with specialist lending at this income.',
    metaTitle: 'Can I Afford a House in London on £120k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £120k salary in 2026? At this income, the average London home is within standard lending limits — get your full result instantly.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-100k',
      'can-i-afford-a-house-in-london-on-150k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
  {
    slug: 'can-i-afford-a-house-in-london-on-150k',
    city: 'London',
    salary: 150000,
    avgHousePrice: 525000,
    h1: 'Can I afford a house in London on a £150,000 salary?',
    intro:
      'At £150,000, the average London home is just 3.5 times your salary — comfortably within standard lending criteria. The question is no longer whether you can afford London, but which part of London and what size of property. The capital is largely open to you; the main constraint shifts from affordability to finding the right home in your preferred area.',
    localContext:
      'On £150,000, the 45% income tax rate applies above £125,140, meaning your take-home is lower than the gross figure suggests — roughly £7,800–£8,000 per month. Despite this, a 4.5× mortgage supports borrowing of up to £675,000. With a 10% deposit of £67,500, your total budget reaches £742,500 — well above the London average. At this level you can seriously consider: terraced and semi-detached houses in Richmond, Chiswick, and Clapham; larger flats in Kensington and Chelsea with a shared freehold; and new builds in Zone 1 river-facing developments. Standard 4.5× lending already exceeds the average London price, so the focus is on what kind of home you want rather than what you can access.',
    metaTitle: 'Can I Afford a House in London on £150k? (2026)',
    metaDescription:
      'Can you afford a house in London on a £150k salary in 2026? At £150k, most of London is comfortably within reach — get your instant affordability result now.',
    relatedSlugs: [
      'can-i-afford-a-house-in-london-on-120k',
      'can-i-afford-a-house-in-london-on-100k',
      'can-i-afford-a-house-in-london-on-50k',
    ],
  },
];

export const ALL_LOCATION_PAGES: LocationPageData[] = [...LOCATION_PAGES, ...LONDON_SALARY_PAGES];

export function getLocationPageBySlug(slug: string): LocationPageData | undefined {
  return ALL_LOCATION_PAGES.find((p) => p.slug === slug);
}
