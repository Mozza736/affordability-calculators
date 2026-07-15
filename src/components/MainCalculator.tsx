import { useState } from 'react';
import { Home, PoundSterling, Wallet, ArrowRight, Mail, CheckCircle, AlertCircle, ShieldCheck, MapPin } from 'lucide-react';
import { InputField } from './InputField';
import { ResultCard } from './ResultCard';
import { AffordabilityInsight } from './AffordabilityInsight';
import { CarFinanceCalculator } from './CarFinanceCalculator';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorInputs } from '../types';
import { formatCurrency } from '../utils/calculatorLogic';
import { submitLead } from '../lib/supabase';

interface MainCalculatorProps {
  initialInputs?: Partial<CalculatorInputs>;
  compact?: boolean;
}

const SALARY_PRESETS = [
  { label: '£30k', value: 30000 },
  { label: '£45k', value: 45000 },
  { label: '£60k', value: 60000 },
  { label: '£80k', value: 80000 },
];

export function MainCalculator({ initialInputs, compact = false }: MainCalculatorProps) {
  const { inputs, results, updateInput } = useCalculator(initialInputs);

  const houseRangeMin = results.maxHousePrice * 0.88;
  const houseRangeMax = results.maxHousePrice * 1.12;

  // Email capture state
  const [email, setEmail] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailSubmitting(true);
    const { error } = await submitLead({
      first_name: '',
      email: email.trim().toLowerCase(),
      annual_salary: inputs.annualSalary,
      monthly_expenses: inputs.monthlyExpenses,
      source_url: '/',
    });
    setEmailSubmitting(false);
    if (error) {
      setEmailError('Something went wrong. Please try again.');
      return;
    }
    setEmailSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Your finances</h2>
          <p className="text-sm text-slate-500 mt-0.5">Adjust the sliders to match your situation</p>
        </div>

        {/* Try a scenario */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Try a scenario</p>
          <div className="flex gap-2 flex-wrap">
            {SALARY_PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => updateInput('annualSalary', p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  inputs.annualSalary === p.value
                    ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
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
          {!compact && (
            <div className="pt-5">
              <InputField
                label="Savings"
                value={inputs.savings}
                onChange={(v) => updateInput('savings', v)}
                min={0}
                max={500000}
                step={1000}
                hint="Your total savings (helps with deposits)"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Your affordability</h2>
          <p className="text-sm text-slate-500 mt-0.5">Results update as you type</p>
        </div>

        <AffordabilityInsight inputs={inputs} results={results} />

        <ResultCard
          icon={Wallet}
          label="Safe monthly disposable income"
          primaryValue={formatCurrency(results.safeMonthlyIncome)}
          secondaryValue="per month"
          description={`After expenses and debt, you have around ${formatCurrency(results.safeMonthlyIncome)} left each month — with a 10% buffer built in for unexpected costs. This is comfortable for most people at this income level.`}
          highlight
          color="blue"
        />

        <ResultCard
          icon={Home}
          label="Home you could realistically afford"
          primaryValue={formatCurrency(results.maxHousePrice, true)}
          secondaryValue={`${(results.maxHousePrice / inputs.annualSalary).toFixed(1)}× salary`}
          description={`Around ${formatCurrency(results.maxHousePrice, true)} is a realistic target based on your salary, savings, and outgoings. Outside London, this budget typically goes further.`}
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
          icon={PoundSterling}
          label="Recommended rent budget"
          primaryValue={`${formatCurrency(results.recommendedRentMin)} – ${formatCurrency(results.recommendedRentMax)}`}
          secondaryValue="per month"
          description={`Up to ${formatCurrency(results.recommendedRentMax)}/month keeps your finances healthy based on the 30–35% income rule. Anything above this may start to feel like a stretch.`}
          color="amber"
        />

        <CarFinanceCalculator />

        <p className="text-xs text-slate-500 px-1 -mt-2">
          <span className="font-medium text-slate-600">Most UK car buyers</span> use PCP or HP finance — affordability is based on monthly payments, not total price.{' '}
          <button
            className="underline underline-offset-2 hover:text-slate-700 transition-colors"
            onClick={() => { window.history.pushState(null, '', '/car-affordability'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0 }); }}
          >
            See the full car finance guide
          </button>
        </p>

        {/* Regional context */}
        <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
          <MapPin size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Outside London, this budget typically goes further. In London and higher-cost areas, affordability is usually 15–25% lower than these figures suggest.
          </p>
        </div>

        {/* Why this is different */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-4">
          <p className="text-xs font-bold text-primary-800 mb-1.5">Why this calculator is different</p>
          <p className="text-xs text-primary-700 leading-relaxed">
            Most calculators show the maximum you <em>can</em> borrow. This tool focuses on what you can <strong>comfortably afford</strong> — based on real UK salaries, actual expenses, and everyday spending patterns.
          </p>
        </div>

        {/* Inline email capture */}
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-4">
          {emailSubmitted ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Plan sent</p>
                <p className="text-xs text-slate-500">Check your inbox for your personalised breakdown.</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-900 mb-0.5">Want a personalised breakdown?</p>
              <p className="text-xs text-slate-500 mb-3">We'll send a simple summary based on your inputs. No spam.</p>
              <form onSubmit={handleEmailSubmit} noValidate className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-100 transition-all">
                    <Mail size={13} className="text-slate-400 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(null); }}
                      placeholder="your@email.com"
                      className="flex-1 text-sm text-slate-900 bg-transparent outline-none placeholder-slate-400 min-w-0"
                      autoComplete="email"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={emailSubmitting}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {emailSubmitting ? (
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    ) : (
                      <>Send plan <ArrowRight size={12} /></>
                    )}
                  </button>
                </div>
                {emailError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle size={12} className="flex-shrink-0" />
                    {emailError}
                  </div>
                )}
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck size={10} className="text-slate-300" />
                  No spam. Your data is not sold or shared.
                </p>
              </form>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href="/mortgage-options"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/mortgage-options'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0 }); }}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
          >
            Compare mortgage options
            <ArrowRight size={15} />
          </a>
          <a
            href="/get-your-plan"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/get-your-plan'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0 }); }}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-semibold text-sm px-5 py-3 rounded-xl transition-all"
          >
            Get a personalised plan
            <ArrowRight size={15} />
          </a>
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          Based on typical UK tax bands and lending criteria. This is an estimate, not financial advice.
        </p>
      </div>
    </div>
  );
}
