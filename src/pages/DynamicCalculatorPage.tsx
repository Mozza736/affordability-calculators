import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { DynamicPageParams } from '../types';
import { MainCalculator } from '../components/MainCalculator';
import { CTASection } from '../components/CTASection';
import { AdBanner } from '../components/AdBanner';
import { formatCurrency, getAffordabilityVerdict } from '../utils/calculatorLogic';
import { usePageTitle } from '../hooks/usePageTitle';

interface DynamicCalculatorPageProps {
  params: DynamicPageParams;
  navigate: (path: string) => void;
}

const confidenceConfig = {
  strong: {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    label: 'Very affordable',
    shortBorder: 'border-emerald-200',
    shortText: 'text-emerald-900',
  },
  possible: {
    icon: CheckCircle,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
    label: 'Likely affordable',
    shortBorder: 'border-primary-200',
    shortText: 'text-primary-900',
  },
  stretched: {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    label: 'Potentially stretched',
    shortBorder: 'border-amber-200',
    shortText: 'text-amber-900',
  },
  unlikely: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    label: 'Unlikely affordable',
    shortBorder: 'border-red-200',
    shortText: 'text-red-900',
  },
};

function buildPageTitle(params: DynamicPageParams): string {
  if (params.type === 'house' && params.housePrice && params.salary) {
    return `Can I afford a ${formatCurrency(params.housePrice, true)} house on a ${formatCurrency(params.salary, true)} salary?`;
  }
  if (params.type === 'rent' && params.rentBudget && params.salary) {
    return `Can I afford ${formatCurrency(params.rentBudget)} per month rent on a ${formatCurrency(params.salary, true)} salary?`;
  }
  if (params.type === 'car' && params.carBudget && params.salary) {
    return `Can I afford a ${formatCurrency(params.carBudget, true)} car on a ${formatCurrency(params.salary, true)} salary?`;
  }
  return 'Affordability Calculator';
}

function buildPageDescription(params: DynamicPageParams): string {
  if (params.type === 'house' && params.housePrice && params.salary) {
    return `Find out if you can afford a ${formatCurrency(params.housePrice, true)} house on a ${formatCurrency(params.salary, true)} salary in the UK. Get an instant 2026 affordability result based on real lending standards.`;
  }
  if (params.type === 'rent' && params.rentBudget && params.salary) {
    return `Can you afford ${formatCurrency(params.rentBudget)} rent per month on a ${formatCurrency(params.salary, true)} salary? Get an instant 2026 answer based on recommended UK affordability guidelines.`;
  }
  if (params.type === 'car' && params.carBudget && params.salary) {
    return `Find out if a ${formatCurrency(params.carBudget, true)} car is affordable on a ${formatCurrency(params.salary, true)} salary in the UK. Instant 2026 result including monthly payment estimates.`;
  }
  return 'Free UK affordability calculator. Get an instant 2026 result for house, rent, or car affordability based on your salary.';
}

export function DynamicCalculatorPage({ params, navigate }: DynamicCalculatorPageProps) {
  const title = buildPageTitle(params);
  const description = buildPageDescription(params);
  usePageTitle(title, description);

  const initialInputs = params.salary
    ? { annualSalary: params.salary }
    : undefined;

  let verdict = null;
  let verdictConfig = null;
  if (params.type === 'house' && params.housePrice && params.salary) {
    verdict = getAffordabilityVerdict(params.housePrice, params.salary);
    verdictConfig = confidenceConfig[verdict.confidence];
  }

  const relatedSearches = params.salary
    ? [
        { label: `£300k house on ${formatCurrency(params.salary, true)} salary`, path: `/can-i-afford-a-300k-house-on-${params.salary / 1000}k-salary-uk` },
        { label: `£400k house on ${formatCurrency(params.salary, true)} salary`, path: `/can-i-afford-a-400k-house-on-${params.salary / 1000}k-salary-uk` },
        { label: `£500k house on ${formatCurrency(params.salary, true)} salary`, path: `/can-i-afford-a-500k-house-on-${params.salary / 1000}k-salary-uk` },
      ].filter((s) => params.housePrice ? !s.path.includes(`-${params.housePrice / 1000}k-house-`) : true)
    : [];

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

      <div className="max-w-3xl mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          UK Affordability Calculator
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
          {title}
        </h1>

        {verdict && verdictConfig && (
          <>
            <div className={`rounded-2xl border p-5 mb-4 ${verdictConfig.bg} ${verdictConfig.shortBorder}`}>
              <div className="flex items-center gap-2 mb-2.5">
                <MessageSquare size={14} className={verdictConfig.color} />
                <span className={`text-xs font-bold uppercase tracking-wider ${verdictConfig.color}`}>
                  Short answer
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${verdictConfig.bg} ${verdictConfig.color} border ${verdictConfig.border}`}>
                  {verdictConfig.label}
                </span>
              </div>
              <p className={`text-sm leading-relaxed font-medium ${verdictConfig.shortText}`}>
                {verdict.shortAnswer}
              </p>
            </div>

            <div className={`flex items-start gap-3 p-4 rounded-xl border ${verdictConfig.bg} ${verdictConfig.border} mb-6`}>
              <verdictConfig.icon size={17} className={`${verdictConfig.color} flex-shrink-0 mt-0.5`} />
              <p className="text-xs text-slate-600 leading-relaxed">{verdict.summary}</p>
            </div>
          </>
        )}

        {params.type === 'house' && params.housePrice && params.salary && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-xs text-slate-500 mb-1">House price</div>
              <div className="text-xl font-bold text-slate-900">{formatCurrency(params.housePrice, true)}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-xs text-slate-500 mb-1">Annual salary</div>
              <div className="text-xl font-bold text-slate-900">{formatCurrency(params.salary, true)}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-xs text-slate-500 mb-1">Salary multiple</div>
              <div className="text-xl font-bold text-slate-900">
                {(params.housePrice / params.salary).toFixed(1)}×
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Based on typical UK tax bands and lending criteria. This is an estimate, not financial advice.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Adjust for your full picture</h2>
        <p className="text-sm text-slate-500 mb-6">
          Pre-filled with your salary. Add monthly expenses and debts for a complete, personalised result.
        </p>
        <MainCalculator initialInputs={initialInputs} />
      </div>

      <div className="my-8">
        <AdBanner position="mid" />
      </div>

      {params.type === 'house' && params.housePrice && params.salary && (
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-5">What the numbers mean</h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Standard lending multiple:</strong> Most UK mortgage lenders will lend up to{' '}
              <strong>4 to 4.5 times your annual salary</strong>. On a salary of{' '}
              {formatCurrency(params.salary, true)}, that means a maximum mortgage of roughly{' '}
              {formatCurrency(params.salary * 4, true)} to {formatCurrency(params.salary * 4.5, true)}.
            </p>
            <p>
              <strong className="text-slate-900">The {formatCurrency(params.housePrice, true)} house:</strong> This property
              is <strong>{(params.housePrice / params.salary).toFixed(1)} times</strong> your annual salary.{' '}
              {(params.housePrice / params.salary) <= 4.5
                ? 'This falls within standard lending criteria, so most high-street lenders should consider your application.'
                : 'This is above the standard multiple. You may need a large deposit or specialist lending.'}
            </p>
            <p>
              <strong className="text-slate-900">Your deposit matters:</strong> A larger deposit reduces the loan-to-value (LTV) ratio, which can unlock better mortgage rates and help you borrow more. Aim for at least 10%, ideally 20% or more.
            </p>
            <p>
              <strong className="text-slate-900">Other factors lenders consider:</strong> Credit score, employment type, other debts, number of dependants, and monthly expenditure all affect what you can borrow. Always speak to a mortgage broker for a personalised assessment.
            </p>
          </div>
        </div>
      )}

      <CTASection />

      {relatedSearches.length > 0 && (
        <div className="mt-10 bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Related searches</h2>
          <div className="flex flex-wrap gap-2">
            {relatedSearches.map((s) => (
              <button
                key={s.path}
                onClick={() => navigate(s.path)}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary-700 hover:bg-primary-50 bg-white border border-slate-200 hover:border-primary-200 px-3 py-1.5 rounded-lg transition-all"
              >
                {s.label}
                <ArrowRight size={13} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
