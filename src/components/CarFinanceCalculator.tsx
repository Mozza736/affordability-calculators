import { useState, useMemo } from 'react';
import { Car, Info, TrendingUp, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { calculateCarFinance, formatCurrency } from '../utils/calculatorLogic';

interface RealityCheck {
  label: string;
  message: string;
  salaryRange: string;
  color: string;
  bg: string;
  border: string;
  Icon: typeof CheckCircle;
}

function getRealityCheck(monthly: number): RealityCheck {
  if (monthly < 200) {
    return {
      label: 'Conservative',
      message: 'Under £200/month is a very manageable car budget. Comfortable for most UK earners and leaves plenty of room for everything else.',
      salaryRange: '£20,000 – £28,000',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      Icon: CheckCircle,
    };
  }
  if (monthly <= 350) {
    return {
      label: 'Sensible range',
      message: '£200–£350/month is a sensible range for most UK buyers. This is what many people on a typical salary comfortably spend on a car.',
      salaryRange: '£28,000 – £45,000',
      color: 'text-primary-700',
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      Icon: TrendingUp,
    };
  }
  if (monthly <= 500) {
    return {
      label: 'Getting stretched',
      message: 'Anything above £400/month typically starts to stretch budgets. Fine on a higher income, but keep it below 15% of your take-home pay.',
      salaryRange: '£45,000 – £65,000',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      Icon: AlertTriangle,
    };
  }
  return {
    label: 'High commitment',
    message: '£500+/month is a high commitment unless you have a strong income. At this level, the car payment alone can crowd out savings, holidays, and flexibility.',
    salaryRange: '£65,000+',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    Icon: AlertCircle,
  };
}

const TERM_OPTIONS = [24, 36, 48, 60] as const;

interface CarFinanceCalculatorProps {
  defaultMonthlyBudget?: number;
}

export function CarFinanceCalculator({ defaultMonthlyBudget = 300 }: CarFinanceCalculatorProps) {
  const [monthlyBudget, setMonthlyBudget] = useState(defaultMonthlyBudget);
  const [deposit, setDeposit] = useState(1000);
  const [termMonths, setTermMonths] = useState<number>(48);

  const result = useMemo(
    () => calculateCarFinance(monthlyBudget, deposit, termMonths),
    [monthlyBudget, deposit, termMonths]
  );

  const pct = (val: number, min: number, max: number) =>
    Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-50">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
            <Car size={15} className="text-slate-600" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Car finance calculator</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Most cars in the UK are purchased using finance (PCP or HP), where buyers pay a deposit and a fixed monthly cost. This estimate gives a realistic guide based on typical finance rates (~8% APR).
        </p>
      </div>

      <div className="p-5 space-y-6">
        {/* Monthly budget slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Monthly budget</label>
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-200 transition-all">
              <span className="text-slate-500 text-sm font-medium">£</span>
              <input
                type="text"
                inputMode="numeric"
                value={monthlyBudget}
                onChange={(e) => {
                  const v = parseInt(e.target.value.replace(/\D/g, ''), 10);
                  if (!isNaN(v)) setMonthlyBudget(Math.min(2000, Math.max(50, v)));
                  else if (e.target.value === '') setMonthlyBudget(50);
                }}
                className="w-20 text-right text-sm font-semibold text-slate-900 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min={50}
              max={2000}
              step={25}
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value))}
              className="input-range"
              style={{ background: `linear-gradient(to right, #2563EB ${pct(monthlyBudget, 50, 2000)}%, #E2E8F0 ${pct(monthlyBudget, 50, 2000)}%)` }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-slate-400">£50</span>
              <span className="text-xs text-slate-400">£2,000</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">How much you can comfortably pay each month</p>
        </div>

        {/* Deposit slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Deposit
              <span className="text-slate-400 font-normal ml-1.5 text-xs">optional</span>
            </label>
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-200 transition-all">
              <span className="text-slate-500 text-sm font-medium">£</span>
              <input
                type="text"
                inputMode="numeric"
                value={deposit}
                onChange={(e) => {
                  const v = parseInt(e.target.value.replace(/\D/g, ''), 10);
                  if (!isNaN(v)) setDeposit(Math.min(20000, Math.max(0, v)));
                  else if (e.target.value === '') setDeposit(0);
                }}
                className="w-20 text-right text-sm font-semibold text-slate-900 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min={0}
              max={20000}
              step={250}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="input-range"
              style={{ background: `linear-gradient(to right, #2563EB ${pct(deposit, 0, 20000)}%, #E2E8F0 ${pct(deposit, 0, 20000)}%)` }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-slate-400">£0</span>
              <span className="text-xs text-slate-400">£20,000</span>
            </div>
          </div>
        </div>

        {/* Term selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Term length</label>
          <div className="grid grid-cols-4 gap-2">
            {TERM_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTermMonths(t)}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                  termMonths === t
                    ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {t}mo
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-slate-500">Estimated car value</span>
            <span className="text-base font-bold text-slate-900">
              {formatCurrency(result.estimatedCarValue, true)}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-slate-500">Monthly payment</span>
            <span className="text-sm font-semibold text-slate-700">
              {formatCurrency(result.monthlyPayment)} / mo
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-slate-500">Total paid over term</span>
            <span className="text-sm font-semibold text-slate-700">
              {formatCurrency(result.totalPaid)}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-slate-500">Interest paid (est.)</span>
            <span className="text-sm font-semibold text-slate-500">
              {formatCurrency(result.totalInterest)}
            </span>
          </div>
        </div>

        {/* Reality check */}
        {(() => {
          const check = getRealityCheck(monthlyBudget);
          const { Icon } = check;
          return (
            <div className={`rounded-xl border p-4 ${check.bg} ${check.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={check.color} />
                <span className={`text-xs font-bold uppercase tracking-wider ${check.color}`}>
                  {check.label}
                </span>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${check.color}`}>
                {check.message}
              </p>
              <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-500">Typical salary needed</span>
                <span className={`text-xs font-bold ${check.color}`}>{check.salaryRange}</span>
              </div>
            </div>
          );
        })()}

        <div className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>
            Estimate based on ~8% APR, typical for UK PCP/HP agreements. Actual rates vary by lender, credit score, and vehicle age. Not financial advice.
          </span>
        </div>
      </div>
    </div>
  );
}
