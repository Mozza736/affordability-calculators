import { ArrowLeft, ArrowRight, Car, CheckCircle, AlertTriangle, CreditCard, TrendingUp, Info } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { CarFinanceCalculator } from '../components/CarFinanceCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';

interface Props {
  navigate: (path: string) => void;
}

const salaryRows = [
  { salary: '£25,000', takeHome: '£1,750', pct: '17%', verdict: 'Stretched', color: 'text-amber-600' },
  { salary: '£30,000', takeHome: '£2,050', pct: '15%', verdict: 'At the limit', color: 'text-amber-600' },
  { salary: '£35,000', takeHome: '£2,300', pct: '13%', verdict: 'Manageable', color: 'text-emerald-600' },
  { salary: '£40,000', takeHome: '£2,550', pct: '12%', verdict: 'Comfortable', color: 'text-emerald-600' },
  { salary: '£50,000', takeHome: '£3,150', pct: '10%', verdict: 'Sensible', color: 'text-emerald-600' },
  { salary: '£60,000', takeHome: '£3,650', pct: '8%', verdict: 'Conservative', color: 'text-emerald-600' },
];

const relatedLinks = [
  { label: 'Is £400 a month car affordable in the UK?', path: '/is-400-a-month-car-affordable-uk' },
  { label: 'How much car can I afford per month?', path: '/car-affordability' },
  { label: 'What car can I afford on a £30k salary?', path: '/what-car-can-i-afford-on-30k-salary-uk' },
  { label: 'What car can I afford on a £40k salary?', path: '/what-car-can-i-afford-on-40k-salary-uk' },
  { label: 'What car can I afford on a £50k salary?', path: '/what-car-can-i-afford-on-50k-salary-uk' },
  { label: 'How much should I spend on a car in the UK?', path: '/how-much-should-i-spend-on-a-car-uk' },
];

export function Is300MonthCarAffordablePage({ navigate }: Props) {
  usePageTitle(
    'Is £300 a Month Car Affordable in the UK? (2026 Guide)',
    'Is £300/month a sensible car payment in the UK? We break down whether £300/month is affordable based on your salary, what car it gets you, and expert guidance.',
    '/is-300-a-month-car-affordable-uk'
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

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          UK Car Finance Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-5">
          Is £300 a month car affordable in the UK?
        </h1>

        {/* Quick answer box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Quick answer</span>
          </div>
          <p className="text-sm font-medium text-emerald-900 leading-relaxed">
            Yes — £300/month is a sensible and achievable car payment for most UK earners on a salary of £35,000 or above. It falls within the widely recommended 10–15% of net monthly income guideline for buyers on typical UK wages. Below £30k it starts to feel stretched.
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed mb-4">
          £300 a month is one of the most common car finance budgets in the UK. At this level you are looking at a nearly-new mid-size hatchback, a used family SUV, or an entry-level electric vehicle on a PCP deal. It is a realistic budget, but whether it is <em>affordable</em> depends entirely on your income and other outgoings.
        </p>
        <p className="text-slate-600 leading-relaxed">
          This guide breaks down exactly when £300/month works, when it starts to stretch, and what that budget will realistically get you in 2026.
        </p>
      </div>

      {/* Calculator */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Try the calculator at £300/month</h2>
        <p className="text-sm text-slate-500 mb-6">
          Pre-set to £300/month — adjust the deposit and term to see how the numbers change.
        </p>
        <div className="max-w-lg">
          <CarFinanceCalculator defaultMonthlyBudget={300} />
        </div>
      </div>

      <AdBanner position="mid" className="mb-12" />

      {/* Is it affordable by salary */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Is £300/month affordable on your salary?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-5">
          The widely used rule is to keep car finance below 10–15% of your take-home pay. Here is how £300/month sits across different UK salary levels:
        </p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Salary</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Take-home / mo</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">£300 as % of income</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {salaryRows.map((row, i) => (
                  <tr key={row.salary} className={`border-b border-slate-50 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.salary}</td>
                    <td className="px-4 py-3 text-slate-600">{row.takeHome}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pct}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${row.color}`}>{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>Take-home estimates are approximate after income tax and National Insurance. The 10–15% guideline covers the finance payment only, not insurance, fuel, or servicing.</span>
        </div>
      </section>

      {/* What £300/month gets you */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Car size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What does £300 a month get you in 2026?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-5">
          At £300/month with a modest deposit and a 48-month term, you are typically looking at a car valued in the £12,000–£16,000 range. Here is what that budget realistically buys:
        </p>
        <div className="space-y-3">
          {[
            {
              tier: 'No deposit',
              description: 'Around £12,000–£13,500 car value. A 2–3 year old mid-size hatchback (Golf, Focus, or similar class) with a reasonable mileage and service history. Reliable everyday transport.',
            },
            {
              tier: '£1,000 deposit',
              description: 'Around £13,000–£14,500 car value. A nearly-new small SUV (e.g. Peugeot 2008 class, Ford Puma class) or a 1–2 year old well-specified family hatchback.',
            },
            {
              tier: '£2,000–£3,000 deposit',
              description: 'Around £14,500–£16,000 car value. A newer mid-size SUV or a lower-spec used EV with reasonable range. This is the sweet spot for the money at this monthly budget.',
            },
          ].map(({ tier, description }) => (
            <div key={tier} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2 text-center min-w-[110px]">
                <span className="text-xs font-bold text-primary-700 leading-tight whitespace-nowrap">{tier}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Based on ~8% APR over 48 months. Actual car values vary by lender, credit score, and market conditions.
        </p>
      </section>

      {/* When does £300/month become too much */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">When does £300/month become too much?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            £300/month starts to feel tight if any of the following apply to your situation:
          </p>
          <ul className="space-y-3">
            {[
              'Your take-home pay is below £2,000/month (salary under roughly £28,000)',
              'You have existing debt repayments — loans, credit cards, or student loan deductions',
              'You are paying rent above £800/month or have a mortgage with significant monthly costs',
              'You have dependants or irregular income that reduces your predictable disposable income',
              'You are not accounting for insurance (£50–£150/month), fuel (£80–£200/month), and servicing',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center mt-0.5">!</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-2">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>The real cost of a £300/month car</strong> is often £450–£550/month once insurance, fuel, and basic servicing are included. Make sure your budget accounts for the full running cost, not just the finance payment.
            </p>
          </div>
        </div>
      </section>

      {/* PCP vs HP at £300/month */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <CreditCard size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">PCP or HP at £300/month — which is better?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">PCP at £300/month</div>
            <ul className="space-y-2.5">
              {[
                'Access a higher-value car for the same £300/month (larger GFV = lower payments)',
                'Flexibility to hand the car back at the end with nothing more to pay',
                'Manufacturer deals sometimes available below market APR rates',
                'Mileage limits apply — typically 8,000–12,000 miles/year',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-primary-100 text-primary-700 text-[9px] font-bold flex items-center justify-center mt-0.5">+</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">HP at £300/month</div>
            <ul className="space-y-2.5">
              {[
                'You own the car outright once the final payment is made',
                'No mileage limits or end-of-term condition penalties',
                'Lower total cost over the full term compared with PCP',
                'Slightly lower car value accessible at the same monthly payment',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold flex items-center justify-center mt-0.5">+</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Related links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Related car affordability guides</h2>
        <p className="text-sm text-slate-500 mb-5">See how affordability changes at different salary levels.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {relatedLinks.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="group flex items-center justify-between gap-3 text-left bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 rounded-xl px-4 py-3 transition-all"
            >
              <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors leading-snug">
                {label}
              </span>
              <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors" />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
