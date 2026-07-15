import { ArrowLeft, ArrowRight, Home, Info, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { MainCalculator } from '../components/MainCalculator';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';

interface Props {
  navigate: (path: string) => void;
}

const SALARY = 50000;
const MORTGAGE_4X = SALARY * 4;
const MORTGAGE_45X = SALARY * 4.5;

const estimates = [
  {
    label: 'Conservative',
    range: '£175k – £200k',
    detail: '3.5–4× salary. Appropriate for buyers with significant existing debt, high monthly expenses, or a smaller deposit. Many lenders cap offers at this level when affordability is tight.',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    label: 'Realistic',
    range: '£200k – £225k',
    detail: '4–4.5× salary with moderate expenses and a deposit of £20,000–£30,000. This is the range most £50k buyers are offered by mainstream UK lenders in practice.',
    icon: CheckCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Stretch',
    range: '£225k – £250k',
    detail: '4.5× salary or above. Possible through specialist lenders, income booster mortgages, or very low outgoings. Requires a clean credit profile and a deposit of 10–20%.',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
];

const faqs = [
  {
    q: 'How is the mortgage amount calculated?',
    a: 'Most UK high-street lenders use a salary multiple of 4–4.5× your gross annual income as a starting point. On £50,000, that is £200,000–£225,000. They then apply an affordability stress test — checking that you can still meet repayments if interest rates rise by 3%.',
  },
  {
    q: 'Does my deposit affect how much I can borrow?',
    a: 'Your deposit does not directly change the mortgage multiple lenders will offer, but it does affect which deals you can access. A 10% deposit (£25,000 on a £250k home) gives you access to a wider range of lenders and better interest rates than a 5% deposit. A larger deposit also reduces your loan-to-value ratio, which can mean lower monthly repayments.',
  },
  {
    q: 'What if I have existing debt?',
    a: 'Existing monthly debt commitments — car finance, personal loans, credit card minimum payments — reduce the amount lenders will offer. A £300/month car payment could reduce your mortgage offer by £30,000–£40,000 depending on the lender.',
  },
  {
    q: 'Can I get a joint mortgage on a £50k salary?',
    a: 'Yes — and it significantly improves your options. A joint mortgage with a partner earning £30,000+ would put your combined income at £80,000+, meaning lenders could offer £320,000–£360,000. Many first-time buyers use joint applications for exactly this reason.',
  },
  {
    q: 'What about government schemes like Help to Buy?',
    a: 'Help to Buy equity loans have ended for new applications. However, Shared Ownership and the First Homes scheme (which offers 30–50% discounts on new builds for eligible buyers) remain available. These can make a £50k salary go further in higher-cost areas.',
  },
];

export function MortgageOn50kPage({ navigate }: Props) {
  usePageTitle(
    'How much mortgage can I afford on £50k? UK Guide',
    'Estimate how much mortgage you could get on a £50k salary in the UK, including realistic lender ranges, deposit impact and monthly affordability.'
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate('/house-affordability')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to house affordability
      </button>

      {/* Hero */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          <Home size={13} />
          UK Mortgage Affordability Guide · 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-5">
          How much mortgage can I afford on a £50k salary in the UK?
        </h1>

        {/* Quick answer */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700">Quick answer</span>
          </div>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            On a £50k salary, many UK buyers may be offered around <strong>£200k–£250k</strong> as a rough mortgage range, depending on deposit, debts, expenses and lender criteria. The standard high-street maximum is around £225,000 (4.5× salary). Specialist lenders can stretch further, but affordability becomes tighter and stress tests harder to pass.
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed mb-4">
          A £50,000 salary puts you just above the UK median income. It is enough to get onto the property ladder in many parts of England, Wales, and Scotland — but in London and the South East it covers a narrower range of properties. Your actual offer will depend heavily on your deposit, existing debts, and monthly outgoings.
        </p>
        <p className="text-slate-600 leading-relaxed">
          This guide covers what you can realistically expect, how a £300k house purchase stacks up, and what you can do to improve your borrowing position.
        </p>
      </div>

      {/* Mortgage range section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Typical mortgage range on a £50k salary</h2>
        <p className="text-sm text-slate-500 mb-5">
          UK lenders use a salary multiple as a starting point, then apply an affordability stress test. Here is how that plays out at different borrowing levels:
        </p>
        <div className="space-y-3 mb-5">
          {estimates.map(({ label, range, detail, icon: Icon, color, bg, border }) => (
            <div key={label} className={`${bg} ${border} border rounded-2xl p-5 flex items-start gap-4`}>
              <div className="flex-shrink-0 mt-0.5">
                <Icon size={18} className={color} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-bold ${color}`}>{label}</span>
                  <span className="text-sm font-semibold text-slate-900">{range}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Salary multiple</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Max mortgage</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">+ £20k deposit</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">House price range</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { multiple: '3.5×', mortgage: '£175,000', withDeposit: '£195,000', range: '£175k–£195k' },
                  { multiple: '4×', mortgage: `£${(MORTGAGE_4X / 1000).toFixed(0)},000`, withDeposit: '£220,000', range: '£200k–£220k' },
                  { multiple: '4.5×', mortgage: `£${(MORTGAGE_45X / 1000).toFixed(0)},000`, withDeposit: '£245,000', range: '£225k–£245k' },
                  { multiple: '5× (specialist)', mortgage: '£250,000', withDeposit: '£270,000', range: '£250k–£270k' },
                ].map((row, i) => (
                  <tr key={row.multiple} className={`border-b border-slate-50 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.multiple}</td>
                    <td className="px-4 py-3 text-slate-600">{row.mortgage}</td>
                    <td className="px-4 py-3 text-slate-600">{row.withDeposit}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>Assumes a £20,000 deposit for the "with deposit" column. Actual offers depend on credit score, employment type, existing debts, and individual lender criteria.</span>
        </div>
      </section>

      {/* Can I afford a £300k house */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Can I afford a £300k house on a £50k salary?</h2>
        <p className="text-sm text-slate-500 mb-5">
          A £300,000 property is above the maximum most mainstream lenders will offer at 4.5× a £50k salary. Here is how it stacks up:
        </p>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Without a large deposit:</strong> A £300k purchase with a 5% deposit (£15,000) means borrowing £285,000 — 5.7× your salary. Most high-street lenders will not go above 4.5×. This scenario is unlikely without a specialist lender or guarantor.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>With a larger deposit:</strong> If you can put down £75,000–£100,000, the required mortgage drops to £200,000–£225,000 (4–4.5×). This is within standard lending range. The challenge is accumulating that deposit on a £50k income.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Joint purchase:</strong> With a second income of £30,000+, combined borrowing of £280,000–£315,000 becomes realistic on standard terms. Most £300k purchases at this salary level are done on a joint basis.
            </p>
          </div>
          <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-500 leading-relaxed mt-2">
            <Info size={12} className="flex-shrink-0 mt-0.5" />
            <span>
              Existing monthly debt (car finance, loans, credit cards) significantly reduces lender offers. A £400/month car payment can reduce your mortgage offer by up to £40,000.
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/can-i-afford-300k-house-on-50k-salary-uk')}
            className="group flex items-center justify-between gap-3 text-left bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 rounded-xl px-4 py-3 transition-all"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors leading-snug">
              Full guide: Can I afford a £300k house on £50k?
            </span>
            <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors" />
          </button>
          <button
            onClick={() => navigate('/can-i-afford-350k-house-on-50k-salary-uk')}
            className="group flex items-center justify-between gap-3 text-left bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 rounded-xl px-4 py-3 transition-all"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors leading-snug">
              Full guide: Can I afford a £350k house on £50k?
            </span>
            <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors" />
          </button>
        </div>
      </section>

      {/* Calculator */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Calculate your mortgage affordability</h2>
        <p className="text-sm text-slate-500 mb-6">
          Pre-filled for a £50k salary — adjust your actual expenses, debt repayments, and savings to get a personalised estimate.
        </p>
        <MainCalculator
          initialInputs={{
            annualSalary: 50000,
            monthlyExpenses: 800,
            debtRepayments: 200,
            savings: 20000,
          }}
        />
      </section>

      {/* How deposit changes affordability */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">How deposit changes affordability</h2>
        <p className="text-sm text-slate-500 mb-5">
          Your deposit does not raise the salary multiple lenders will apply — but it directly reduces how much you need to borrow, which makes a real difference to what you can buy.
        </p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Deposit</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Max borrow (4.5×)</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Total budget</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">LTV tier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { deposit: '£10,000', total: '£235,000', ltv: '95% — higher rate' },
                  { deposit: '£20,000', total: '£245,000', ltv: '91% — standard rate' },
                  { deposit: '£35,000', total: '£260,000', ltv: '86% — better rates' },
                  { deposit: '£50,000', total: '£275,000', ltv: '82% — good rates' },
                  { deposit: '£75,000', total: '£300,000', ltv: '75% — best rates' },
                ].map(({ deposit, total, ltv }, i) => (
                  <tr key={deposit} className={`border-b border-slate-50 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{deposit}</td>
                    <td className="px-4 py-3 text-slate-600">£{(MORTGAGE_45X / 1000).toFixed(0)},000</td>
                    <td className="px-4 py-3 font-semibold text-primary-700">{total}</td>
                    <td className="px-4 py-3 text-right text-slate-500 text-xs">{ltv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>A higher deposit also reduces your loan-to-value (LTV) ratio, which typically unlocks lower interest rates — reducing your monthly repayments on top of the smaller loan amount.</span>
        </div>
      </section>

      {/* Single vs joint */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Single income vs joint income</h2>
        <p className="text-sm text-slate-500 mb-5">
          Adding a second income to your mortgage application is one of the most effective ways to increase what you can borrow.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Solo — £50k salary</p>
            <div className="space-y-2.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Max borrow (4.5×)</span>
                <span className="font-semibold text-slate-900">£{(MORTGAGE_45X / 1000).toFixed(0)},000</span>
              </div>
              <div className="flex justify-between">
                <span>With £20k deposit</span>
                <span className="font-semibold text-slate-900">£245,000 budget</span>
              </div>
              <div className="flex justify-between">
                <span>Typical UK range</span>
                <span className="font-semibold text-slate-900">£200k–£225k offer</span>
              </div>
            </div>
          </div>
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-3">Joint — £50k + £30k</p>
            <div className="space-y-2.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Combined income</span>
                <span className="font-semibold text-slate-900">£80,000</span>
              </div>
              <div className="flex justify-between">
                <span>Max borrow (4.5×)</span>
                <span className="font-semibold text-slate-900">£360,000</span>
              </div>
              <div className="flex justify-between">
                <span>With £20k deposit</span>
                <span className="font-semibold text-slate-900">£380,000 budget</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          A joint application roughly doubles your buying power in this example. Even a lower second income of £20,000 adds £90,000 in potential borrowing at 4.5×.
        </p>
      </section>

      {/* How to improve affordability */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-5">How to improve affordability on a £50k salary</h2>
        <div className="space-y-3">
          {[
            {
              action: 'Clear existing debts',
              detail: 'Paying off car finance, personal loans, or credit card balances before applying removes them from lenders\' affordability calculations. A £300/month car payment could be limiting your mortgage by £30,000–£40,000.',
            },
            {
              action: 'Grow your deposit',
              detail: 'Every extra £10,000 saved adds £10,000 to your total purchase budget. It also reduces your LTV, which improves your interest rate — lowering monthly costs on top of the smaller loan.',
            },
            {
              action: 'Reduce monthly outgoings',
              detail: 'Lenders stress-test your ability to make payments if rates rise. Lower monthly expenses — subscriptions, bills, eating out — improve the disposable income figure they assess.',
            },
            {
              action: 'Use a fee-free broker',
              detail: 'Brokers search the whole market including deals not available directly. They know which lenders are currently most generous at your income level and can position your application to its best advantage.',
            },
            {
              action: 'Consider shared ownership',
              detail: 'Buying a 40–60% share means mortgaging a much smaller amount. On a £350k property, a 50% share means borrowing around £150,000–£175,000 — well within standard limits on a £50k salary.',
            },
          ].map(({ action, detail }) => (
            <div key={action} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="flex-shrink-0 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-center min-w-[100px]">
                <span className="text-xs font-bold text-emerald-700 leading-tight">{action}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What affects your mortgage offer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-5">What affects your mortgage offer on £50k?</h2>
        <div className="space-y-3">
          {[
            {
              factor: 'Deposit size',
              impact: 'A 10% deposit gives access to a wider range of lenders. A 20%+ deposit typically unlocks better interest rates and reduces monthly repayments. The deposit does not increase your salary multiple, but it does reduce how much you need to borrow.',
            },
            {
              factor: 'Existing monthly debt',
              impact: 'Car finance, personal loans, and credit card minimums all count against you. Lenders look at your net disposable income after all commitments. A £400/month car payment can reduce your maximum mortgage by £30,000–£40,000.',
            },
            {
              factor: 'Credit profile',
              impact: 'A strong credit score opens access to lower rates and more lenders. Missed payments, CCJs, or defaults in the last 3–6 years can reduce offers or require a specialist lender with higher rates.',
            },
            {
              factor: 'Employment type',
              impact: 'PAYE employees are typically straightforward to assess. Self-employed buyers usually need 2–3 years of accounts. Contractors may use day rate calculations. Each type is treated differently across lenders.',
            },
            {
              factor: 'Monthly expenses',
              impact: "Lenders run an affordability stress test using your declared monthly outgoings. Higher expenses reduce the mortgage they'll offer, even if your salary multiple looks fine on paper.",
            },
          ].map(({ factor, impact }) => (
            <div key={factor} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2 text-center min-w-[90px]">
                <span className="text-xs font-bold text-primary-700 leading-tight">{factor}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Common questions</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm font-semibold text-slate-900 mb-2">{q}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />

      <RelatedLinks
        navigate={navigate}
        title="Related affordability guides"
        links={[
          { label: 'Can I afford a £300k house on a £50k salary?', path: '/can-i-afford-300k-house-on-50k-salary-uk' },
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
          { label: 'Can I afford a house in London on £50k?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'House affordability calculator', path: '/house-affordability' },
          { label: 'How much mortgage can I get on a £40k salary?', path: '/can-i-afford-250k-house-on-40k-salary-uk' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
