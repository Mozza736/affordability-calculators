import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CalculatorInputs, CalculatorResults } from '../types';
import { getAffordabilityTier } from '../utils/calculatorLogic';

interface AffordabilityInsightProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

const tierConfig = {
  strong: {
    icon: TrendingUp,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    iconColor: 'text-emerald-600',
    headlineColor: 'text-emerald-800',
    detailColor: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  average: {
    icon: Minus,
    bg: 'bg-primary-50',
    border: 'border-primary-100',
    iconColor: 'text-primary-600',
    headlineColor: 'text-primary-800',
    detailColor: 'text-primary-700',
    dot: 'bg-primary-500',
  },
  below: {
    icon: TrendingDown,
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconColor: 'text-amber-600',
    headlineColor: 'text-amber-800',
    detailColor: 'text-amber-700',
    dot: 'bg-amber-500',
  },
};

export function AffordabilityInsight({ inputs, results }: AffordabilityInsightProps) {
  const insight = getAffordabilityTier(inputs, results);
  const config = tierConfig[insight.tier];
  const Icon = config.icon;

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${config.bg} ${config.border} transition-all duration-300`}>
      <div className="flex items-start gap-3.5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/70`}>
          <Icon size={18} className={config.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
            <p className={`text-sm font-semibold leading-snug ${config.headlineColor}`}>
              {insight.headline}
            </p>
          </div>
          <p className={`text-xs leading-relaxed ${config.detailColor} opacity-90`}>
            {insight.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
