import { ArrowLeft, ArrowRight, Car, Info } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { CarFinanceCalculator } from '../components/CarFinanceCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';

interface HowMuchCarPageProps {
  navigate: (path: string) => void;
}

const salaryGuides = [
  { salary: '£25,000', takeHome: '£1,750', budget: '£175 – £350', notes: 'Best suited to a used small car on HP. Keep running costs low.' },
  { salary: '£30,000', takeHome: '£2,050', budget: '£205 – £410', notes: 'Good range of used family cars on HP or older PCP deals.' },
  { salary: '£40,000', takeHome: '£2,550', budget: '£255 – £510', notes: 'Nearly-new hatchbacks and crossovers become accessible.' },
  { salary: '£50,000', takeHome: '£3,150', budget: '£315 – £630', notes: 'New family SUVs, EVs, and executive cars enter reach on PCP.' },
  { salary: '£60,000', takeHome: '£3,650', budget: '£365 – £730', notes: 'Premium brands and larger SUVs are realistic on a finance deal.' },
  { salary: '£70,000', takeHome: '£4,150', budget: '£415 – £830', notes: 'Flagship SUVs, performance variants, or high-spec EVs.' },
];

export function HowMuchCarPage({ navigate }: HowMuchCarPageProps) {
  usePageTitle(
    'How Much Should I Spend on a Car in the UK? (2026 Guide)',
    'Find out how much you should spend on a car in the UK in 2026. Budget guidance by salary level, with a free car finance calculator to estimate your monthly payments.',
    '/how-much-should-i-spend-on-a-car-uk'
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <AdBanner position="top" className="mb-8" />

      <button
        onClick={() => navigate('/car-affordability')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to car affordability
      </button>

      <div className="max-w-3xl mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          UK Car Spending Guide · 2026
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-5">
          How much should I spend on a car in the UK?
        </h1>

        {/* Direct answer */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Car size={14} className="text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Direct answer</span>
          </div>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            Keep your monthly car finance payment at <strong>10–15% of your monthly take-home pay</strong> — or your total car costs (finance + insurance + fuel) below 20%. On a £30k salary that means roughly £200–£300/month. On £50k it's £300–£475/month.
          </p>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed">
          The right amount depends on your salary, other financial commitments, and how much you rely on the car. The table below gives a straightforward starting point by income level.
        </p>
      </div>

      {/* Salary table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recommended car budget by salary</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Salary</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Take-home / mo</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Finance budget</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5 hidden sm:table-cell">What that gets you</th>
              </tr>
            </thead>
            <tbody>
              {salaryGuides.map(({ salary, takeHome, budget, notes }, i) => (
                <tr
                  key={salary}
                  className={`border-b border-slate-100 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}
                >
                  <td className="px-5 py-4 font-semibold text-slate-900">{salary}</td>
                  <td className="px-5 py-4 text-slate-600">{takeHome}</td>
                  <td className="px-5 py-4 font-semibold text-primary-700">{budget}</td>
                  <td className="px-5 py-4 text-slate-500 hidden sm:table-cell">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-2 mt-3 text-xs text-slate-400 leading-relaxed">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>
            Finance budget = monthly PCP or HP payment only. Add insurance (typically £50–£150/mo), fuel or charging (£80–£200/mo), and servicing to get your total car cost. Budget accordingly.
          </span>
        </div>
      </section>

      {/* Calculator */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Calculate your monthly budget</h2>
        <p className="text-sm text-slate-500 mb-6">
          Enter your monthly budget and deposit to see what car value you can realistically finance.
        </p>
        <div className="max-w-lg">
          <CarFinanceCalculator />
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate('/car-affordability')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            See the full car finance guide
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <AdBanner position="mid" className="mb-12" />

      {/* Rules of thumb */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Rules of thumb</h2>
        <div className="space-y-3">
          {[
            {
              rule: '10% rule',
              detail: 'Keep your monthly finance payment below 10% of your take-home pay. This is the conservative approach — leaves room for higher insurance, fuel, or unexpected costs.',
            },
            {
              rule: '15% rule',
              detail: 'Monthly finance payment up to 15% of take-home is reasonable if your other outgoings are low. A common real-world figure for buyers with stable finances.',
            },
            {
              rule: '20% total car cost',
              detail: 'Some advisers suggest keeping total car costs (finance + insurance + fuel + tax) below 20% of net income. This is harder to hit, but a useful ceiling if you rely heavily on the car.',
            },
            {
              rule: 'No more than half of disposable income',
              detail: 'Disposable income (after rent/mortgage, food, and utilities) is a more personal check. Your car payment should not take up more than half of it — that leaves room for savings and unexpected bills.',
            },
          ].map(({ rule, detail }) => (
            <div key={rule} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2 text-center min-w-[80px]">
                <span className="text-xs font-bold text-primary-700">{rule}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PCP vs HP brief */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">PCP or HP — which affects your budget more?</h2>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            PCP deals show lower monthly payments because you are not paying off the full car — you pay a deposit, instalments, and then optionally a final balloon payment to own it. This makes it easier to access a more expensive car on a limited monthly budget.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            HP means higher monthly payments but you own the car at the end. There are no mileage restrictions, no balloon payment, and no risk of being over the condition limit. If you plan to keep a car for 5+ years, HP often works out cheaper overall.
          </p>
          <button
            onClick={() => navigate('/car-affordability')}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Full PCP vs HP comparison
            <ArrowRight size={14} />
          </button>
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
          { label: 'Full car affordability calculator', path: '/car-affordability' },
        ]}
      />

      <RelatedLinks
        navigate={navigate}
        title="Housing affordability"
        links={[
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
          { label: 'Can I afford a house in London on £50k?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
