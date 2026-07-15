import { ArrowLeft, Home, ArrowRight, MapPin, Info } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useStructuredData } from '../hooks/useStructuredData';
import { calculatorSchema } from '../utils/structuredData';
import { useCalculator } from '../hooks/useCalculator';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { AffordabilityInsight } from '../components/AffordabilityInsight';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { formatCurrency } from '../utils/calculatorLogic';
import { PoundSterling, Wallet } from 'lucide-react';

interface HouseAffordabilityPageProps {
  navigate: (path: string) => void;
}

const otherCalculators = [
  { label: 'Rent Affordability Calculator', path: '/rent-affordability' },
  { label: 'Car Budget Calculator', path: '/car-affordability' },
  { label: 'Savings Runway Calculator', path: '/savings-runway' },
];

export function HouseAffordabilityPage({ navigate }: HouseAffordabilityPageProps) {
  usePageTitle(
    'House Affordability Calculator UK (2026) – What Can You Afford?',
    'Find out the maximum house price you can realistically afford in the UK in 2026. Free calculator based on your salary, deposit, and monthly outgoings.',
    '/house-affordability'
  );
  useStructuredData(calculatorSchema({
    name: 'House Affordability Calculator UK (2026)',
    description: 'Find out the maximum house price you can realistically afford in the UK in 2026.',
    url: '/house-affordability',
  }));

  const { inputs, results, updateInput } = useCalculator();
  const houseRangeMin = results.maxHousePrice * 0.88;
  const houseRangeMax = results.maxHousePrice * 1.12;
  const multiple = results.maxHousePrice / inputs.annualSalary;

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

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          <Home size={13} />
          House Affordability Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          How much house can I afford in the UK?
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-4">
          This calculator helps you understand what you can realistically afford to buy based on your income, expenses, and savings — using the same 4–4.5× salary multiples applied by UK mortgage lenders.
        </p>
        <div className="flex items-start gap-2.5 bg-primary-50 border border-primary-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
          <MapPin size={14} className="text-primary-500 flex-shrink-0 mt-0.5" />
          <span>
            Outside London, this budget typically goes further. In London and the South East, higher property prices and living costs reduce effective affordability by 15–25% compared to the national average.
          </span>
        </div>
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your finances</h2>
            <p className="text-sm text-slate-500 mt-0.5">Adjust the sliders to match your situation</p>
          </div>
          <div className="space-y-6 divide-y divide-slate-50">
            <InputField
              label="Annual salary"
              value={inputs.annualSalary}
              onChange={(v) => updateInput('annualSalary', v)}
              min={10000}
              max={300000}
              step={1000}
              hint="Your gross (pre-tax) annual income"
            />
            <div className="pt-5">
              <InputField
                label="Monthly expenses"
                value={inputs.monthlyExpenses}
                onChange={(v) => updateInput('monthlyExpenses', v)}
                min={0}
                max={10000}
                step={50}
                hint="Bills, food, subscriptions, travel, etc."
              />
            </div>
            <div className="pt-5">
              <InputField
                label="Debt repayments"
                value={inputs.debtRepayments}
                onChange={(v) => updateInput('debtRepayments', v)}
                min={0}
                max={5000}
                step={25}
                hint="Monthly loan, credit card, or other debt payments"
              />
            </div>
            <div className="pt-5">
              <InputField
                label="Savings"
                value={inputs.savings}
                onChange={(v) => updateInput('savings', v)}
                min={0}
                max={500000}
                step={1000}
                hint="Your total savings — helps estimate deposit capacity"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your house affordability</h2>
            <p className="text-sm text-slate-500 mt-0.5">Results update as you type</p>
          </div>

          <AffordabilityInsight inputs={inputs} results={results} />

          <ResultCard
            icon={Home}
            label="Home you could realistically afford"
            primaryValue={formatCurrency(results.maxHousePrice, true)}
            secondaryValue={`${multiple.toFixed(1)}× salary`}
            description={`Around ${formatCurrency(results.maxHousePrice, true)} is a realistic target based on your salary, savings, and outgoings. This is comfortable for most buyers with similar finances.`}
            highlight
            color="emerald"
          />

          {results.maxHousePrice > 0 && (
            <p className="text-xs text-slate-500 px-1 -mt-2">
              <span className="font-medium text-slate-600">Most UK buyers</span> with a similar income typically purchase between{' '}
              <span className="font-medium text-slate-700">{formatCurrency(houseRangeMin, true)}</span> and{' '}
              <span className="font-medium text-slate-700">{formatCurrency(houseRangeMax, true)}</span>
            </p>
          )}

          <ResultCard
            icon={Wallet}
            label="Safe monthly disposable income"
            primaryValue={formatCurrency(results.safeMonthlyIncome)}
            secondaryValue="per month"
            description={`After expenses and debt, you have around ${formatCurrency(results.safeMonthlyIncome)} left — with a 10% buffer built in for unexpected costs.`}
            color="blue"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={() => navigate('/mortgage-options')}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
            >
              Compare mortgage options
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/get-your-plan')}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-semibold text-sm px-5 py-3 rounded-xl transition-all"
            >
              Get a personalised plan
              <ArrowRight size={15} />
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Based on typical UK tax bands and lending criteria. This is an estimate, not financial advice.
          </p>
        </div>
      </div>

      <AdBanner position="mid" className="mb-10" />

      {/* What the numbers mean */}
      <section className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">What the numbers mean</h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">Standard lending multiple:</strong> Most UK mortgage lenders will lend between <strong>4 and 4.5 times your annual salary</strong>. On a salary of {formatCurrency(inputs.annualSalary, true)}, that is a maximum mortgage of roughly {formatCurrency(inputs.annualSalary * 4, true)} to {formatCurrency(inputs.annualSalary * 4.5, true)}.
          </p>
          <p>
            <strong className="text-slate-900">Your deposit matters:</strong> A larger deposit reduces the mortgage you need, improves your loan-to-value ratio, and typically unlocks better interest rates. Your savings of {formatCurrency(inputs.savings, true)} can contribute to this.
          </p>
          <p>
            <strong className="text-slate-900">Monthly commitments count:</strong> Lenders assess your affordability based on net disposable income after all regular outgoings. High monthly expenses or existing debts can reduce what you can borrow.
          </p>
          <div className="flex items-start gap-2.5 bg-white rounded-xl border border-slate-200 p-4 mt-2">
            <Info size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              These results are estimates based on standard UK guidelines. Actual offers will vary by lender, credit profile, employment type, and individual circumstances. Always speak to a qualified mortgage broker before making major decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Salary-linked pages */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Popular house affordability scenarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'Can I afford a £200k house on a £30k salary?', path: '/can-i-afford-200k-house-on-30k-salary-uk' },
            { label: 'Can I afford a £250k house on a £40k salary?', path: '/can-i-afford-250k-house-on-40k-salary-uk' },
            { label: 'Can I afford a £300k house on a £45k salary?', path: '/can-i-afford-300k-house-on-45k-salary-uk' },
            { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
            { label: 'Can I afford a £400k house on a £60k salary?', path: '/can-i-afford-400k-house-on-60k-salary-uk' },
            { label: 'Can I afford a house in London on a £50k salary?', path: '/can-i-afford-a-house-in-london-on-50k' },
            { label: 'How much mortgage can I afford on a £50k salary?', path: '/how-much-mortgage-can-i-afford-on-50k-salary-uk' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="group flex items-center justify-between gap-3 text-left bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 rounded-xl px-4 py-3 transition-all"
            >
              <span className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors leading-snug">{item.label}</span>
              <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-primary-500 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      <CTASection />

      <RelatedLinks
        navigate={navigate}
        title="Also check"
        links={otherCalculators}
        columns={1}
      />
    </main>
  );
}
