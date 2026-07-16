import { ArrowLeft, ArrowRight, Car, CreditCard, Info, TrendingUp, HelpCircle } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useStructuredData } from '../hooks/useStructuredData';
import { calculatorSchema, faqSchema } from '../utils/structuredData';
import { CarFinanceCalculator } from '../components/CarFinanceCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { CAR_AFFORDABILITY_FAQS } from '../data/carAffordabilityFaqs';

interface CarAffordabilityHubPageProps {
  navigate: (path: string) => void;
}

const DESCRIPTION =
  'Free UK car affordability calculator. Enter your monthly budget, deposit and APR to see what car you can afford — PCP, HP and running costs explained.';

const budgetTiers = [
  {
    range: '£100 – £200 / mo',
    deposit: '£0 – £1,000',
    description:
      'A used supermini or small hatchback (3–6 years old). Reliable everyday transport with low running costs. Good fit for first-time car buyers or those on a tight budget.',
  },
  {
    range: '£200 – £350 / mo',
    deposit: '£1,000 – £3,000',
    description:
      'A nearly-new small hatchback, a used family hatchback, or an older crossover. Wider choice, better specification, and often still covered by warranty.',
  },
  {
    range: '£350 – £500 / mo',
    deposit: '£2,000 – £5,000',
    description:
      'A new or nearly-new family SUV, a mid-spec executive car, or an entry-level EV on PCP. Comfortable and well-equipped — a popular bracket for buyers on £40k–£60k.',
  },
  {
    range: '£500+ / mo',
    deposit: '£3,000+',
    description:
      'A new premium SUV, a higher-spec executive car, or a longer-range EV. At this level, running costs (insurance, servicing) are also higher — build those into your budget.',
  },
];

export function CarAffordabilityHubPage({ navigate }: CarAffordabilityHubPageProps) {
  usePageTitle(
    'Car Affordability Calculator UK (2026) – Free Instant Results',
    'Free UK car affordability calculator. Enter your monthly budget, deposit and APR to see what car you can afford — PCP, HP and running costs explained.',
    '/car-affordability'
  );
  useStructuredData([
    calculatorSchema({
      name: 'Car Affordability Calculator UK (2026)',
      description: DESCRIPTION,
      url: '/car-affordability',
    }),
    faqSchema(CAR_AFFORDABILITY_FAQS),
  ]);

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
      <div className="max-w-3xl mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          Free UK Car Finance Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          UK car affordability calculator — how much can you afford per month?
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Enter your monthly budget, deposit, and term length to instantly see the car value you can realistically finance in the UK. The calculator uses 8% APR as an illustrative starting figure — actual rates vary by lender, credit profile, and vehicle. Results are estimates for planning purposes only, not financial advice.
        </p>
      </div>

      {/* Calculator — prominent above fold */}
      <div className="mb-12">
        <div className="max-w-lg">
          <CarFinanceCalculator />
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-lg">
          Results are estimates based on ~8% APR. Actual rates vary by lender, credit score, and vehicle age. Not financial advice.
        </p>
      </div>

      <AdBanner position="mid" className="mb-12" />

      {/* How much should you spend based on salary */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">How much car can I afford based on my salary?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            The following figures are general budgeting guidance only — not lending criteria or financial advice. They show what portion of take-home pay a car finance payment represents at common salary levels.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Annual salary</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Est. take-home</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">10% budget</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">15% budget</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { salary: '£25,000', takeHome: '£1,750', low: '£175', high: '£265' },
                  { salary: '£30,000', takeHome: '£2,050', low: '£205', high: '£310' },
                  { salary: '£40,000', takeHome: '£2,550', low: '£255', high: '£385' },
                  { salary: '£50,000', takeHome: '£3,150', low: '£315', high: '£475' },
                  { salary: '£60,000', takeHome: '£3,650', low: '£365', high: '£550' },
                  { salary: '£70,000', takeHome: '£4,150', low: '£415', high: '£625' },
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
              10% column: finance payment only. 15% column: finance with some headroom for running costs. These are illustrative planning figures — not affordability assessments or financial advice. See individual salary guides:{' '}
              <button onClick={() => navigate('/what-car-can-i-afford-on-30k-salary-uk')} className="text-primary-600 hover:underline">£30k</button>,{' '}
              <button onClick={() => navigate('/what-car-can-i-afford-on-40k-salary-uk')} className="text-primary-600 hover:underline">£40k</button>,{' '}
              <button onClick={() => navigate('/what-car-can-i-afford-on-50k-salary-uk')} className="text-primary-600 hover:underline">£50k</button>.
            </span>
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">General budgeting guidance:</strong> Many personal finance guides suggest keeping a car finance payment below 10–15% of take-home pay to maintain a healthy budget — particularly if you also have mortgage or rent commitments. This is a planning heuristic, not a lending rule or regulated financial advice.
          </p>
        </div>
      </section>

      {/* What does your budget get you */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Car size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What does your monthly budget get you?</h2>
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

      {/* PCP vs HP */}
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
                "Lower monthly payments — you only finance part of the car's value",
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
            <strong className="text-slate-800">Which is better?</strong> It depends on how you use cars. PCP suits buyers who want to change cars every few years and keep monthly costs low. HP suits buyers who want to own outright and avoid a balloon payment. Both are calculated on the same APR basis — this calculator estimates the car value accessible under either approach.
          </p>
        </div>
      </section>

      {/* When does car finance become too expensive */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Info size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">When does car finance become too expensive?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            Car finance becomes a financial strain when it crowds out other important spending. Watch for these warning signs:
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

      {/* FAQ section */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <HelpCircle size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
        </div>
        <div className="space-y-4">
          {CAR_AFFORDABILITY_FAQS.map(({ question, answer }) => (
            <div key={question} className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-2">{question}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
            </div>
          ))}
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
          { label: 'House affordability calculator UK', path: '/house-affordability' },
          { label: 'Rent affordability calculator UK', path: '/rent-affordability' },
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
          { label: 'Take-home pay on a £50k salary', path: '/take-home-pay-50k-uk' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
