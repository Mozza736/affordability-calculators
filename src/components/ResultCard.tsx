import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

type LucideIcon = FC<LucideProps>;

interface ResultCardProps {
  icon: LucideIcon;
  label: string;
  primaryValue: string;
  secondaryValue?: string;
  description: string;
  highlight?: boolean;
  color?: 'blue' | 'emerald' | 'amber' | 'slate';
}

const colorMap = {
  blue: {
    bg: 'bg-primary-50',
    border: 'border-primary-100',
    icon: 'bg-primary-100 text-primary-600',
    value: 'text-primary-700',
    badge: 'bg-primary-100 text-primary-700',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    icon: 'bg-emerald-100 text-emerald-600',
    value: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    icon: 'bg-amber-100 text-amber-600',
    value: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
  slate: {
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    icon: 'bg-slate-100 text-slate-600',
    value: 'text-slate-800',
    badge: 'bg-slate-100 text-slate-700',
  },
};

export function ResultCard({
  icon: Icon,
  label,
  primaryValue,
  secondaryValue,
  description,
  highlight = false,
  color = 'slate',
}: ResultCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 ${
        highlight
          ? `${c.bg} ${c.border} shadow-result`
          : 'bg-white border-slate-100 shadow-card hover:shadow-card-hover'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{label}</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`text-2xl font-bold ${c.value}`}>{primaryValue}</span>
            {secondaryValue && (
              <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${c.badge}`}>
                {secondaryValue}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
