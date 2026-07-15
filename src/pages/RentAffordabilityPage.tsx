import { ArrowLeft, PoundSterling, ArrowRight, MapPin, Info } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useCalculator } from '../hooks/useCalculator';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { AffordabilityInsight } from '../components/AffordabilityInsight';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { formatCurrency } from '../utils/calculatorLogic';
import { Wallet } from 'lucide-react';

interface RentAffordabilityPageProps {
  navigate: (path: string) => void;
}

const otherCalculators = [
  { label: 'House Affordability Calculator', path: '/house-affordability' },
  { label: 'Car Budget Calculator', path: '/car-affordability' },
  { label: 'Savings Runway Calculator', path: '/savings-runway' },
];

export function RentAffordabilityPage({ navigate }: RentAffordabilityPageProps) {
  usePageTitle(
    'Rent Affordability Calculator UK (2026) – How Much Should I Spend?',
    'Find out how much rent you can afford in the UK in 2026. Free calculator using the 30% income rule and your real monthly expenses.'
  );

  const { inputs, results, updateInput } = useCalculator();

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
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">
          <PoundSterling size={13} />
          Rent Affordability Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          How much rent can I afford in the UK?
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-4">
          This calculator helps you understand the maximum monthly rent that keeps your finances healthy — based on your income and actual monthly outgoings. It uses the widely-accepted 30–35% income rule as a guide.
        </p>
        <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
          <MapPin size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
          <span>
            London rents are significantly higher than the national average. Outside London, the same budget typically covers more space. If you are renting in London, budget at least 20–30% more than these figures suggest.
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
                hint="Bills, food, subscriptions, travel — excluding rent"
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
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your rent affordability</h2>
            <p className="text-sm text-slate-500 mt-0.5">Results update as you type</p>
          </div>

          <AffordabilityInsight inputs={inputs} results={results} />

          <ResultCard
            icon={PoundSterling}
            label="Recommended rent budget"
            primaryValue={`${formatCurrency(results.recommendedRentMin)} – ${formatCurrency(results.recommendedRentMax)}`}
            secondaryValue="per month"
            description={`Up to ${formatCurrency(results.recommendedRentMax)}/month keeps your finances healthy based on the 30–35% income rule. This is comfortable for most people at this income level.`}
            highlight
            color="emerald"
          />

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">What these figures mean</p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">30</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Lower end ({formatCurrency(results.recommendedRentMin)}/mo)</strong> — 30% of gross income. Leaves good room for savings and unexpected costs.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">35</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Upper end ({formatCurrency(results.recommendedRentMax)}/mo)</strong> — 35% of gross income. Workable if your other outgoings are low. Anything above this may start to feel like a stretch.
                </p>
              </div>
            </div>
          </div>

          <ResultCard
            icon={Wallet}
            label="Safe monthly disposable income"
            primaryValue={formatCurrency(results.safeMonthlyIncome)}
            secondaryValue="per month"
            description={`After expenses and debt, you have around ${formatCurrency(results.safeMonthlyIncome)} left — with a 10% buffer included for unexpected costs.`}
            color="blue"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={() => navigate('/get-your-plan')}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
            >
              Get a personalised plan
              <ArrowRight size={15} />
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Based on typical UK tax bands. This is an estimate, not financial advice.
          </p>
        </div>
      </div>

      <AdBanner position="mid" className="mb-10" />

      {/* Context section */}
      <section className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Why the 30% rule?</h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            The 30% rule — keeping rent below 30% of gross income — has been used by financial advisers and housing economists for decades. It's a practical threshold that leaves enough money for food, transport, savings, and unexpected costs.
          </p>
          <p>
            In practice, many UK renters — especially in London — spend 35–50% of income on rent. While that's common, it often means cutting savings, going into debt for emergencies, or having very little financial flexibility.
          </p>
          <p>
            <strong className="text-slate-900">If you must go above 35%:</strong> reduce other fixed costs where possible (phone contract, subscriptions), avoid car finance on top of high rent, and build a small emergency fund first.
          </p>
          <div className="flex items-start gap-2.5 bg-white rounded-xl border border-slate-200 p-4 mt-2">
            <Info size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              These figures are based on gross salary. Your take-home pay after tax will be lower, which means the real percentage of take-home going to rent will be higher than the 30% figure suggests. Use the disposable income figure above as the more practical check.
            </p>
          </div>
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
