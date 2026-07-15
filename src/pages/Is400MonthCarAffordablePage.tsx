import { ArrowLeft, ArrowRight, Car, AlertTriangle, CreditCard, TrendingUp, Info, CheckCircle } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { CarFinanceCalculator } from '../components/CarFinanceCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';

interface Props {
  navigate: (path: string) => void;
}

const salaryRows = [
  { salary: '£30,000', takeHome: '£2,050', pct: '20%', verdict: 'Too stretched', color: 'text-red-600' },
  { salary: '£35,000', takeHome: '£2,300', pct: '17%', verdict: 'Stretched', color: 'text-amber-600' },
  { salary: '£40,000', takeHome: '£2,550', pct: '16%', verdict: 'At the limit', color: 'text-amber-600' },
  { salary: '£45,000', takeHome: '£2,850', pct: '14%', verdict: 'Manageable', color: 'text-emerald-600' },
  { salary: '£55,000', takeHome: '£3,400', pct: '12%', verdict: 'Comfortable', color: 'text-emerald-600' },
  { salary: '£65,000', takeHome: '£3,900', pct: '10%', verdict: 'Sensible', color: 'text-emerald-600' },
];

const relatedLinks = [
  { label: 'Is £300 a month car affordable in the UK?', path: '/is-300-a-month-car-affordable-uk' },
  { label: 'How much car can I afford per month?', path: '/car-affordability' },
  { label: 'What car can I afford on a £40k salary?', path: '/what-car-can-i-afford-on-40k-salary-uk' },
  { label: 'What car can I afford on a £50k salary?', path: '/what-car-can-i-afford-on-50k-salary-uk' },
  { label: 'What car can I afford on a £60k salary?', path: '/what-car-can-i-afford-on-60k-salary-uk' },
  { label: 'How much should I spend on a car in the UK?', path: '/how-much-should-i-spend-on-a-car-uk' },
];

export function Is400MonthCarAffordablePage({ navigate }: Props) {
  usePageTitle(
    'Is £400 a Month Car Affordable in the UK? (2026 Guide)',
    'Is £400/month a sensible car payment in the UK? Find out if £400/month is affordable based on your salary, what car it gets you, and when it becomes too much.',
    '/is-400-a-month-car-affordable-uk'
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
          Is £400 a month car affordable in the UK?
        </h1>

        {/* Quick answer box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Quick answer</span>
          </div>
          <p className="text-sm font-medium text-amber-900 leading-relaxed">
            £400/month is manageable for buyers earning £45,000 or more, but starts to feel stretched below that. At this level, the car payment alone is approaching 15–20% of take-home pay for many UK earners — a point where financial advisers typically flag it as a high commitment. It is achievable, but only comfortably if your other outgoings are well under control.
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed mb-4">
          £400 a month puts you in the territory of nearly-new executive cars, newer family SUVs, and current-generation electric vehicles on PCP. It is a popular aspiration, but it is not the right budget for everyone. Whether it works depends heavily on your take-home pay, rent or mortgage, and how much you have left after other monthly commitments.
        </p>
        <p className="text-slate-600 leading-relaxed">
          This guide explains exactly when £400/month works, when it stretches too far, and what that budget realistically gets you across different finance deals in 2026.
        </p>
      </div>

      {/* Calculator */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Try the calculator at £400/month</h2>
        <p className="text-sm text-slate-500 mb-6">
          Pre-set to £400/month — adjust the deposit and term to see how the numbers change.
        </p>
        <div className="max-w-lg">
          <CarFinanceCalculator defaultMonthlyBudget={400} />
        </div>
      </div>

      <AdBanner position="mid" className="mb-12" />

      {/* Is it affordable by salary */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Is £400/month affordable on your salary?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-5">
          The standard UK guidance is to keep car finance below 10–15% of your monthly take-home pay. Here is how £400/month sits across different salary levels:
        </p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Salary</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Take-home / mo</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">£400 as % of income</th>
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
          <span>Take-home estimates are approximate after income tax and National Insurance. The 10–15% guideline covers the finance payment only — insurance, fuel, and servicing add considerably to your total monthly car cost.</span>
        </div>
      </section>

      {/* What £400/month gets you */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Car size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What does £400 a month get you in 2026?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-5">
          At £400/month with a modest deposit and a 48-month term, you are typically looking at a car valued in the £16,000–£21,000 range. Here is what that budget realistically buys:
        </p>
        <div className="space-y-3">
          {[
            {
              tier: 'No deposit',
              description: 'Around £16,000–£18,000 car value. A nearly-new mid-size family SUV, a 1–2 year old executive hatchback, or a used entry-level EV. Noticeably more choice and quality than the £300/month bracket.',
            },
            {
              tier: '£2,000 deposit',
              description: 'Around £18,000–£20,000 car value. A newer family SUV with better specification, or a used premium smaller car from a German brand. Getting into more aspirational territory.',
            },
            {
              tier: '£3,000–£5,000 deposit',
              description: 'Around £20,000–£23,000 car value. A new or nearly-new larger family SUV, a mid-spec executive saloon, or a current-generation electric vehicle with reasonable range. The deposit makes a meaningful difference at this level.',
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

      {/* When £400/month becomes a problem */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">When does £400/month become a problem?</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            £400/month can become a financial burden in any of the following situations:
          </p>
          <ul className="space-y-3">
            {[
              'Your take-home pay is below £2,700/month (salary under roughly £40,000)',
              'You have a mortgage or rent payment above £1,000/month',
              'You carry other debt — personal loans, credit cards, or a student loan deduction',
              'You are not budgeting for the full running cost: insurance (£70–£200/month), fuel or charging (£80–£200/month), and servicing',
              'Your income is variable, seasonal, or commission-based, reducing your reliable monthly amount',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center mt-0.5">!</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-2">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>The real cost of a £400/month car</strong> is typically £600–£750/month once insurance, fuel or charging, and routine servicing are included. Budget for the total, not just the headline finance figure.
            </p>
          </div>
        </div>
      </section>

      {/* Signs £400/month is right for you */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={16} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">When £400/month makes sense</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
          {[
            'Your salary is £45,000 or above and your take-home exceeds £2,800/month',
            'Your rent or mortgage is under £1,000/month, leaving a healthy surplus',
            'You have no other significant debt repayments running alongside',
            'You need a higher-spec, newer, or larger car — for work, family, or long commutes — that a £300/month deal cannot provide',
            'You have a deposit of £2,000 or more, which significantly increases the car value accessible at this monthly payment',
          ].map((point) => (
            <div key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              {point}
            </div>
          ))}
        </div>
      </section>

      {/* PCP vs HP at £400/month */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <CreditCard size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">PCP or HP at £400/month — which is better?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">PCP at £400/month</div>
            <ul className="space-y-2.5">
              {[
                'Access a higher-value car — typically £3,000–£5,000 more than HP at the same payment',
                'Manufacturer PCP deals from premium brands become more accessible at this budget',
                'Hand the car back at the end if circumstances change',
                'Mileage limits apply — typically 8,000–12,000 miles/year on manufacturer deals',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-primary-100 text-primary-700 text-[9px] font-bold flex items-center justify-center mt-0.5">+</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">HP at £400/month</div>
            <ul className="space-y-2.5">
              {[
                'Own the car outright once the final payment is made — no balloon payment',
                'No mileage restrictions and no end-of-term condition charges',
                'Lower total cost of borrowing over the full term',
                'Works better for buyers who drive high mileage or want to keep the car long-term',
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
        <p className="text-sm text-slate-500 mb-5">See how affordability changes at different budgets and salary levels.</p>
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
