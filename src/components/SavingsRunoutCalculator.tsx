import { useState, useMemo } from 'react';
import { PiggyBank, TrendingDown, Calendar, ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';
import { InputField } from './InputField';

interface SavingsInputs {
  totalSavings: number;
  monthlySpending: number;
  monthlyIncome: number;
}

interface SavingsResult {
  monthsUntilEmpty: number | null;
  netMonthlyBurn: number;
  band: 'safe' | 'warning' | 'danger';
  summary: string;
}

function calculateRunout(inputs: SavingsInputs): SavingsResult {
  const { totalSavings, monthlySpending, monthlyIncome } = inputs;
  const netMonthlyBurn = monthlySpending - monthlyIncome;

  if (netMonthlyBurn <= 0) {
    return {
      monthsUntilEmpty: null,
      netMonthlyBurn,
      band: 'safe',
      summary: 'Your income covers your spending — your savings will not run out.',
    };
  }

  const months = totalSavings / netMonthlyBurn;

  let band: 'safe' | 'warning' | 'danger';
  let summary: string;

  if (months >= 24) {
    band = 'safe';
    summary = `You have ${formatMonths(months)} of runway. That is a solid financial cushion.`;
  } else if (months >= 6) {
    band = 'warning';
    summary = `You have ${formatMonths(months)} of runway. Consider reducing spending or increasing income.`;
  } else {
    band = 'danger';
    summary = `Your savings will last ${formatMonths(months)}. This is a short runway — act quickly.`;
  }

  return { monthsUntilEmpty: months, netMonthlyBurn, band, summary };
}

function formatMonths(months: number): string {
  const m = Math.floor(months);
  if (m >= 24) {
    const years = Math.floor(m / 12);
    const rem = m % 12;
    return rem > 0 ? `${years} yr ${rem} mo` : `${years} years`;
  }
  if (m >= 12) {
    const years = Math.floor(m / 12);
    const rem = m % 12;
    return rem > 0 ? `${years} yr ${rem} mo` : `${years} year`;
  }
  return `${m} month${m !== 1 ? 's' : ''}`;
}

function formatCurrencyShort(n: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
}

const bandConfig = {
  safe: {
    bar: 'bg-emerald-500',
    track: 'bg-emerald-100',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    label: 'Safe',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-100 text-emerald-600',
    valueBg: 'bg-emerald-100',
    valueText: 'text-emerald-800',
  },
  warning: {
    bar: 'bg-amber-400',
    track: 'bg-amber-100',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    label: 'Warning',
    icon: AlertTriangle,
    iconBg: 'bg-amber-100 text-amber-600',
    valueBg: 'bg-amber-100',
    valueText: 'text-amber-800',
  },
  danger: {
    bar: 'bg-red-500',
    track: 'bg-red-100',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    label: 'Danger',
    icon: XCircle,
    iconBg: 'bg-red-100 text-red-600',
    valueBg: 'bg-red-100',
    valueText: 'text-red-800',
  },
};

export function SavingsRunoutCalculator() {
  const [inputs, setInputs] = useState<SavingsInputs>({
    totalSavings: 20000,
    monthlySpending: 2000,
    monthlyIncome: 0,
  });

  const result = useMemo(() => calculateRunout(inputs), [inputs]);
  const cfg = bandConfig[result.band];
  const BandIcon = cfg.icon;

  const barWidth = useMemo(() => {
    if (result.monthsUntilEmpty === null) return 100;
    const pct = Math.min(100, (result.monthsUntilEmpty / 36) * 100);
    return Math.max(2, pct);
  }, [result.monthsUntilEmpty]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Your finances</h2>
          <p className="text-sm text-slate-500 mt-0.5">Adjust the values to match your situation</p>
        </div>

        <div className="space-y-6 divide-y divide-slate-50">
          <InputField
            label="Total savings"
            value={inputs.totalSavings}
            onChange={(v) => setInputs((p) => ({ ...p, totalSavings: v }))}
            min={0}
            max={500000}
            step={500}
            hint="Your current total savings balance"
          />
          <div className="pt-5">
            <InputField
              label="Monthly spending"
              value={inputs.monthlySpending}
              onChange={(v) => setInputs((p) => ({ ...p, monthlySpending: v }))}
              min={0}
              max={20000}
              step={50}
              hint="Everything you spend per month — bills, food, rent, etc."
            />
          </div>
          <div className="pt-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Monthly income{' '}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-200 transition-all">
                  <span className="text-slate-500 text-sm font-medium">£</span>
                  <input
                    type="text"
                    value={inputs.monthlyIncome === 0 ? '' : new Intl.NumberFormat('en-GB').format(inputs.monthlyIncome)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setInputs((p) => ({ ...p, monthlyIncome: raw === '' ? 0 : Math.min(50000, parseInt(raw, 10)) }));
                    }}
                    placeholder="0"
                    className="w-24 text-right text-sm font-semibold text-slate-900 bg-transparent outline-none"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min={0}
                  max={20000}
                  step={50}
                  value={inputs.monthlyIncome}
                  onChange={(e) => setInputs((p) => ({ ...p, monthlyIncome: Number(e.target.value) }))}
                  className="input-range"
                  style={{
                    background: `linear-gradient(to right, #2563EB ${(inputs.monthlyIncome / 20000) * 100}%, #E2E8F0 ${(inputs.monthlyIncome / 20000) * 100}%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-slate-400">£0</span>
                  <span className="text-xs text-slate-400">£20,000</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">Any income you receive monthly — salary, benefits, freelance, etc.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Your runway</h2>
          <p className="text-sm text-slate-500 mt-0.5">Results update as you type</p>
        </div>

        <div className={`rounded-2xl border p-5 ${cfg.bg} ${cfg.border}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
              <BandIcon size={16} />
            </div>
            <div className="flex-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${cfg.text}`}>
                {cfg.label}
              </span>
            </div>
          </div>

          <div className={`rounded-xl px-4 py-3 mb-4 ${cfg.valueBg}`}>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Savings last until
            </div>
            <div className={`text-3xl font-bold ${cfg.valueText}`}>
              {result.monthsUntilEmpty === null
                ? 'Indefinitely'
                : formatMonths(result.monthsUntilEmpty)}
            </div>
            {result.monthsUntilEmpty !== null && (
              <div className="text-sm text-slate-500 mt-0.5">
                ~{Math.floor(result.monthsUntilEmpty)} month{Math.floor(result.monthsUntilEmpty) !== 1 ? 's' : ''} of runway
              </div>
            )}
          </div>

          <div className="mb-1.5">
            <div className={`w-full h-3 rounded-full ${cfg.track}`}>
              <div
                className={`h-3 rounded-full transition-all duration-500 ${cfg.bar}`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-400">0 months</span>
              <span className="text-xs text-slate-400">36+ months</span>
            </div>
          </div>

          <p className={`text-sm leading-relaxed mt-3 font-medium ${cfg.text}`}>
            {result.summary}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Net monthly burn</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                {result.netMonthlyBurn <= 0 ? (
                  <>
                    <span className="text-2xl font-bold text-emerald-700">
                      +{formatCurrencyShort(Math.abs(result.netMonthlyBurn))}
                    </span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      saving per month
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-slate-800">
                      {formatCurrencyShort(result.netMonthlyBurn)}
                    </span>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      per month
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {result.netMonthlyBurn <= 0
                  ? `Your income exceeds your spending by ${formatCurrencyShort(Math.abs(result.netMonthlyBurn))} per month — your savings balance will grow.`
                  : `You spend ${formatCurrencyShort(result.netMonthlyBurn)} more than you earn each month. This is the rate your savings are being drawn down.`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Milestones</p>
              <div className="space-y-2 mt-2">
                {[3, 6, 12].map((milestone) => {
                  const needed = result.netMonthlyBurn > 0
                    ? result.netMonthlyBurn * milestone
                    : 0;
                  const has = result.netMonthlyBurn <= 0 || inputs.totalSavings >= needed;
                  return (
                    <div key={milestone} className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${has ? 'text-slate-700' : 'text-slate-400'}`}>
                        {milestone} months
                      </span>
                      <div className="flex items-center gap-2">
                        {result.netMonthlyBurn > 0 && (
                          <span className="text-xs text-slate-400">
                            needs {formatCurrencyShort(needed)}
                          </span>
                        )}
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          has
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {has ? 'Covered' : 'Shortfall'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          This is an estimate based on the figures you provide. It does not account for interest, inflation, or irregular expenses.
        </p>
      </div>
    </div>
  );
}
