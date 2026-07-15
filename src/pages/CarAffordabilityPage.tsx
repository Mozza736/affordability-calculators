import { ArrowLeft, ArrowRight, Car, Info, TrendingUp, CreditCard, Home } from 'lucide-react';
import { CarAffordabilityPageData, getCarAffordabilityPageBySlug } from '../data/carAffordabilityPages';
import { getSeoPageBySlug } from '../data/seoPages';
import { CAR_AFFORDABILITY_PAGES } from '../data/carAffordabilityPages';
import { usePageTitle } from '../hooks/usePageTitle';
import { CarFinanceCalculator } from '../components/CarFinanceCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { formatCurrency } from '../utils/calculatorLogic';

interface CarAffordabilityPageProps {
  page: CarAffordabilityPageData;
  navigate: (path: string) => void;
}

function RelatedCarPages({
  slugs,
  navigate,
}: {
  slugs: string[];
  navigate: (path: string) => void;
}) {
  const pages = slugs
    .map((s) => getCarAffordabilityPageBySlug(s))
    .filter(Boolean) as CarAffordabilityPageData[];

  if (pages.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Other salary guides</h2>
      <p className="text-sm text-slate-500 mb-5">See how car affordability changes at different income levels.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pages.map((p) => (
          <button
            key={p.slug}
            onClick={() => navigate(`/${p.slug}`)}
            className="group text-left bg-white border border-slate-200 hover:border-primary-200 hover:shadow-md rounded-2xl p-5 transition-all"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Car size={13} className="text-slate-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Car affordability</span>
            </div>
            <div className="text-xl font-bold text-slate-900 mb-0.5">
              {formatCurrency(p.salary, true)} salary
            </div>
            <div className="text-sm text-slate-500 mb-3">
              {formatCurrency(p.monthlyBudgetMin)}&ndash;{formatCurrency(p.monthlyBudgetMax)} / mo budget
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:text-primary-700">
              See guide <ArrowRight size={12} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function RelatedHousingPages({
  slugs,
  navigate,
}: {
  slugs: string[];
  navigate: (path: string) => void;
}) {
  const pages = slugs
    .map((s) => getSeoPageBySlug(s))
    .filter(Boolean);

  if (pages.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Housing affordability</h2>
      <p className="text-sm text-slate-500 mb-5">
        Understand the full picture — what you can afford to borrow for a home at this income level.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pages.map((p) => (
          <button
            key={p!.slug}
            onClick={() => navigate(`/${p!.slug}`)}
            className="group text-left bg-white border border-slate-200 hover:border-primary-200 hover:shadow-md rounded-2xl p-5 transition-all"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Home size={13} className="text-slate-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Mortgage guide</span>
            </div>
            <div className="text-lg font-bold text-slate-900 leading-snug mb-1">{p!.h1}</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:text-primary-700 mt-2">
              See calculation <ArrowRight size={12} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function CarAffordabilityPage({ page, navigate }: CarAffordabilityPageProps) {
  usePageTitle(page.metaTitle, page.metaDescription);

  const defaultMonthly = Math.round((page.monthlyBudgetMin + page.monthlyBudgetMax) / 2 / 25) * 25;

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
          UK Car Affordability Guide
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
          {page.h1}
        </h1>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Car size={14} className="text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Quick answer</span>
          </div>
          <p className="text-sm leading-relaxed font-medium text-slate-800">{page.openingLine}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Annual salary</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(page.salary, true)}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <CreditCard size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Monthly budget</div>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {formatCurrency(page.monthlyBudgetMin, true)}&ndash;{formatCurrency(page.monthlyBudgetMax, true)}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-primary-50 rounded-xl p-4 border border-primary-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Info size={12} className="text-primary-500" />
              <div className="text-xs text-primary-600">As % of income</div>
            </div>
            <div className="text-xl font-bold text-primary-700">
              {Math.round((page.monthlyBudgetMin / (page.salary / 12)) * 100)}–{Math.round((page.monthlyBudgetMax / (page.salary / 12)) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Interactive calculator */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Try the car finance calculator</h2>
        <p className="text-sm text-slate-500 mb-6">
          Adjust the monthly budget and deposit to see what car value you could realistically finance.
          Pre-filled with a typical budget for a {formatCurrency(page.salary, true)} salary.
        </p>
        <div className="max-w-md">
          <CarFinanceCalculator defaultMonthlyBudget={defaultMonthly} />
        </div>
      </div>

      <AdBanner position="mid" className="mb-10" />

      {/* Monthly budget section */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <TrendingUp size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Typical monthly car budget</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-sm text-slate-700 leading-relaxed">{page.monthlyBudgetNote}</p>
          <div className="mt-4 flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <CreditCard size={16} className="text-primary-500 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Suggested budget range</div>
              <div className="text-lg font-bold text-slate-900">
                {formatCurrency(page.monthlyBudgetMin)} – {formatCurrency(page.monthlyBudgetMax)}{' '}
                <span className="text-sm font-normal text-slate-500">per month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What does that get you */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Car size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">What does that get you?</h2>
        </div>
        <div className="space-y-3">
          {page.whatYouGet.map(({ tier, description }) => (
            <div
              key={tier}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 bg-primary-50 border border-primary-100 rounded-xl px-3 py-2 text-center min-w-[90px]">
                <span className="text-xs font-bold text-primary-700 leading-tight whitespace-nowrap">{tier}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Examples are illustrative by car class. Actual availability and pricing varies. Always factor in insurance, fuel/charging, tax, and servicing costs on top of your finance payment.
        </p>
      </section>

      {/* Finance explanation */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <CreditCard size={16} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">How car finance works in the UK</h2>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
          <p className="text-sm text-slate-700 leading-relaxed">{page.financeNote}</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">PCP</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pay a deposit, then fixed monthly payments. At the end, choose to return the car, pay the balloon amount to keep it, or part-exchange. Lower monthly costs, higher flexibility.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">HP</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pay a deposit, then fixed monthly payments that cover the full car value. You own it outright at the end. Higher monthly cost, but no mileage limits and no balloon payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <RelatedCarPages slugs={page.relatedSlugs} navigate={navigate} />
      <RelatedHousingPages slugs={page.housingRelatedSlugs} navigate={navigate} />
    </main>
  );
}
