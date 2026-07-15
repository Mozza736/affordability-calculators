import { ArrowLeft, ArrowRight, Car, CreditCard, Info, TrendingUp } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { CarFinanceCalculator } from '../components/CarFinanceCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';

interface CarAffordabilityHubPageProps {
  navigate: (path: string) => void;
}

const budgetTiers = [
  {
    range: '£100 – £200 / mo',
    deposit: '£0 – £1,000',
    description: 'A used supermini or small hatchback (3–6 years old). Reliable everyday transport with low running costs. Good fit for first-time car buyers or those on a tight budget.',
  },
  {
    range: '£200 – £350 / mo',
    deposit: '£1,000 – £3,000',
    description: 'A nearly-new small hatchback, a used family hatchback, or an older crossover. Wider choice, better specification, and often still covered by warranty.',
  },
  {
    range: '£350 – £500 / mo',
    deposit: '£2,000 – £5,000',
    description: 'A new or nearly-new family SUV, a mid-spec executive car, or an entry-level EV on PCP. Comfortable and well-equipped — a popular bracket for buyers on £40k–£60k.',
  },
  {
    range: '£500+ / mo',
    deposit: '£3,000+',
    description: 'A new premium SUV, a higher-spec executive car, or a longer-range EV. At this level, running costs (insurance, servicing) are also higher — build those into your budget.',
  },
];

export function CarAffordabilityHubPage({ navigate }: CarAffordabilityHubPageProps) {
  usePageTitle(
    'How Much Car Can I Afford Per Month in the UK? (2026 Guide)',
    'Use our free UK car finance calculator to find out what car you can afford per month in 2026. Based on PCP and HP finance — the way most UK buyers actually buy.'
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <AdBanner position="top" className="mb-8" />

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to home
      </button>

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          UK Car Finance Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-5">
          How much car can I afford per month in the UK?
        </h1>
        <p className="text-slate-600 leading-relaxed mb-3">
          Most people in the UK think about car affordability as a monthly payment, not an outright price. This calculator helps estimate a sensible monthly budget based on income, deposit, term length and typical finance rates.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          Adjust the monthly budget, deposit, and term length to see an instant estimate of the car value you could finance, plus total cost over the deal.
        </p>
      </div>

      {/* Calculator */}
      <div className="mb-12">
        <div className="max-w-lg">
          <CarFinanceCalculator />
        </div>
      </div>

      <AdBanner position="mid" className="mb-12" />

      {/* Section 1: How much should you spend */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">How much should you spend on a car?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            A widely used rule is to keep your total monthly car costs — including finance, insurance, fuel or charging, and servicing — between <strong>10% and 20% of your net monthly income</strong>. For most UK salaries, that means:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Annual salary</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Est. take-home</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">10% budget</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">20% budget</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { salary: '£25,000', takeHome: '£1,750', low: '£175', high: '£350' },
                  { salary: '£30,000', takeHome: '£2,050', low: '£205', high: '£410' },
                  { salary: '£40,000', takeHome: '£2,550', low: '£255', high: '£510' },
                  { salary: '£50,000', takeHome: '£3,150', low: '£315', high: '£630' },
                  { salary: '£60,000', takeHome: '£3,650', low: '£365', high: '£730' },
                  { salary: '£70,000', takeHome: '£4,150', low: '£415', high: '£830' },
                ].map((row, i) => (
                  <tr
                    key={row.salary}
                    className={`border-b border-slate-50 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.salary}</td>
                    <td className="px-4 py-3 text-slate-600">{row.takeHome} / mo</td>
                    <td className="px-4 py-3 text-slate-600">{row.low} / mo</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">{row.high} / mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
            <Info size={12} className="flex-shrink-0 mt-0.5" />
            <span>
              The 10% figure covers just the finance payment. The 20% figure includes an allowance for insurance, fuel or charging, and basic maintenance. If you commute long distances, a lower finance payment leaves more room for running costs.
            </span>
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">The practical rule:</strong> If your car payment (finance only) is more than 15% of your take-home pay, you are likely to feel financial pressure — especially if you also have a mortgage, rent, or other loan repayments. Staying at or below 10–12% gives you a comfortable buffer.
          </p>
        </div>
      </section>

      {/* Section 2: What does your budget get you */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Car size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What does your budget get you?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-5">
          A rough guide to the car types typically available at each monthly finance budget, assuming a modest deposit and 48-month term.
        </p>
        <div className="space-y-3">
          {budgetTiers.map(({ range, deposit, description }) => (
            <div
              key={range}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 text-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 min-w-[110px]">
                <div className="text-xs font-bold text-slate-800 leading-tight whitespace-nowrap">{range}</div>
                <div className="text-xs text-slate-400 mt-0.5">{deposit} dep.</div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          General guidance only — not specific models. Car values and availability change frequently. Always get quotes from multiple dealers and lenders.
        </p>
      </section>

      {/* Section 3: PCP vs HP */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <CreditCard size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">PCP vs HP explained simply</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">PCP — Personal Contract Purchase</div>
            <ul className="space-y-2.5">
              {[
                'Lower monthly payments — you only finance part of the car\'s value',
                'Large "balloon" payment at the end if you want to own it',
                'Can hand the car back with nothing more to pay (if in good condition)',
                'Mileage limits apply — exceed them and you pay a penalty',
                'Good if you want a newer car every 3–4 years',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold flex items-center justify-center mt-0.5">+</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">HP — Hire Purchase</div>
            <ul className="space-y-2.5">
              {[
                'Higher monthly payments — you pay off the full car value',
                'You own the car outright once the final payment is made',
                'No mileage limits or end-of-term condition worries',
                'Simpler structure — no balloon payment surprises',
                'Good if you plan to keep the car long-term',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center mt-0.5">+</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Which is better?</strong> It depends on how you use cars. If you like changing cars every few years, PCP keeps monthly costs low. If you want to own and keep driving, HP gives you a clean financial endpoint. Both use the same APR-based interest calculation — this tool estimates the car value you can reach under either approach.
          </p>
        </div>
      </section>

      {/* Section 4: What salary for £300/month */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Car size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What salary do you need for £300/month?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            A £300/month car payment represents 10–15% of take-home pay at around £35,000–£40,000 salary — the point where most financial advisers consider it comfortable. Below £30,000, £300/month starts to stretch the budget.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            At £400/month, you generally want a salary of £45,000 or more for it to sit at a manageable percentage of net income. See our detailed breakdowns:
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => navigate('/is-300-a-month-car-affordable-uk')}
              className="group flex items-center justify-between gap-3 text-left bg-slate-50 border border-slate-200 hover:border-primary-200 hover:bg-primary-50 rounded-xl px-4 py-3 transition-all"
            >
              <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors">Is £300/month car affordable?</span>
              <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors" />
            </button>
            <button
              onClick={() => navigate('/is-400-a-month-car-affordable-uk')}
              className="group flex items-center justify-between gap-3 text-left bg-slate-50 border border-slate-200 hover:border-primary-200 hover:bg-primary-50 rounded-xl px-4 py-3 transition-all"
            >
              <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors">Is £400/month car affordable?</span>
              <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: When does car finance become too expensive */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Info size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">When does car finance become too expensive?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Car finance becomes a financial strain when it starts to crowd out other important spending. Watch out for these warning signs:
          </p>
          {[
            'Your monthly finance payment exceeds 15% of your take-home pay',
            'You also carry significant rent, mortgage, or other loan repayments',
            'You have not budgeted for running costs — insurance, fuel, and servicing can add £200–£400/month on top of the finance payment',
            'Your income is variable or seasonal, reducing your reliable monthly amount',
            'You are extending the loan term to 5–6 years to make the payment feel affordable — this significantly increases total interest paid',
          ].map((point) => (
            <div key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center mt-0.5">!</span>
              {point}
            </div>
          ))}
          <div className="pt-2">
            <button
              onClick={() => navigate('/how-much-should-i-spend-on-a-car-uk')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Full spending guide with rules of thumb
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <CTASection />

      <RelatedLinks
        navigate={navigate}
        title="Car affordability by salary"
        links={[
          { label: 'What car can I afford on a £30k salary?', path: '/what-car-can-i-afford-on-30k-salary-uk' },
          { label: 'What car can I afford on a £40k salary?', path: '/what-car-can-i-afford-on-40k-salary-uk' },
          { label: 'What car can I afford on a £50k salary?', path: '/what-car-can-i-afford-on-50k-salary-uk' },
          { label: 'What car can I afford on a £60k salary?', path: '/what-car-can-i-afford-on-60k-salary-uk' },
          { label: 'What car can I afford on a £70k salary?', path: '/what-car-can-i-afford-on-70k-salary-uk' },
          { label: 'How much should I spend on a car?', path: '/how-much-should-i-spend-on-a-car-uk' },
          { label: 'Is £300 a month car affordable in the UK?', path: '/is-300-a-month-car-affordable-uk' },
          { label: 'Is £400 a month car affordable in the UK?', path: '/is-400-a-month-car-affordable-uk' },
        ]}
      />

      <RelatedLinks
        navigate={navigate}
        title="Other affordability calculators"
        links={[
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
          { label: 'Can I afford a house in London on £50k?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
