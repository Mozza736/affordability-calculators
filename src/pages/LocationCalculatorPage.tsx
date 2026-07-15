import { ArrowLeft, ArrowRight, MapPin, TrendingUp, Home, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { LocationPageData, getLocationPageBySlug } from '../data/locationPages';
import { usePageTitle } from '../hooks/usePageTitle';
import { MainCalculator } from '../components/MainCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { formatCurrency } from '../utils/calculatorLogic';

interface LocationCalculatorPageProps {
  page: LocationPageData;
  navigate: (path: string) => void;
}

function getAffordabilityBand(salary: number, avgPrice: number): {
  label: string;
  bg: string;
  text: string;
  icon: typeof CheckCircle;
  ringColor: string;
} {
  const multiple = avgPrice / salary;
  if (multiple <= 5) {
    return { label: 'Achievable', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle, ringColor: 'border-emerald-100' };
  }
  if (multiple <= 6.5) {
    return { label: 'Possible', bg: 'bg-blue-50', text: 'text-blue-700', icon: CheckCircle, ringColor: 'border-blue-100' };
  }
  if (multiple <= 8) {
    return { label: 'Stretched', bg: 'bg-amber-50', text: 'text-amber-700', icon: AlertTriangle, ringColor: 'border-amber-100' };
  }
  return { label: 'Very difficult', bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, ringColor: 'border-red-100' };
}

function getDepositTip(multiple: number): string {
  if (multiple <= 5) return 'A 10% deposit should be enough for most standard lenders at this price-to-income ratio.';
  if (multiple <= 6.5) return 'A deposit of 15–20% will strengthen your application and unlock better mortgage rates.';
  if (multiple <= 8) return 'You will likely need at least 20–25% deposit to meet lending requirements at this ratio.';
  return 'A deposit of 30–40% is typically required at this level of price-to-income stretch.';
}

interface RelatedLocationsProps {
  slugs: string[];
  navigate: (path: string) => void;
}

function RelatedLocations({ slugs, navigate }: RelatedLocationsProps) {
  const pages = slugs.map((s) => getLocationPageBySlug(s)).filter(Boolean) as LocationPageData[];
  if (pages.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Compare other UK cities</h2>
      <p className="text-sm text-slate-500 mb-5">
        See how affordability differs across the UK based on salary and average house prices.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((p) => {
          const band = getAffordabilityBand(p.salary, p.avgHousePrice);
          const BandIcon = band.icon;
          const multiple = (p.avgHousePrice / p.salary).toFixed(1);
          return (
            <button
              key={p.slug}
              onClick={() => navigate(`/${p.slug}`)}
              className="group text-left bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{p.city}</span>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${band.bg} ${band.text}`}>
                  <BandIcon size={10} />
                  {band.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-0.5">
                {formatCurrency(p.avgHousePrice, true)}
              </div>
              <div className="text-sm text-slate-500 mb-3">
                avg. price · {formatCurrency(p.salary, true)} salary
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400">{multiple}× salary multiple</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  See calculation
                  <ArrowRight size={12} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function LocationCalculatorPage({ page, navigate }: LocationCalculatorPageProps) {
  const { city, salary, avgHousePrice, h1, intro, localContext, relatedSlugs, metaTitle, metaDescription } = page;
  usePageTitle(metaTitle, metaDescription);
  const band = getAffordabilityBand(salary, avgHousePrice);
  const BandIcon = band.icon;
  const multiple = avgHousePrice / salary;
  const maxMortgage4x = salary * 4;
  const maxMortgage4_5x = salary * 4.5;

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
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
          <MapPin size={13} />
          {city} · UK Affordability
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
          {h1}
        </h1>

        <div className={`rounded-2xl border p-5 mb-5 ${band.bg} ${band.ringColor}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <BandIcon size={14} className={band.text} />
            <span className={`text-xs font-bold uppercase tracking-wider ${band.text}`}>
              Affordability overview
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${band.bg} ${band.text} border ${band.ringColor}`}>
              {band.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed font-medium text-slate-800">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Avg. house price</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(avgHousePrice, true)}</div>
            <div className="text-xs text-slate-400 mt-0.5">{city} average</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Annual salary</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(salary, true)}</div>
            <div className="text-xs text-slate-400 mt-0.5">pre-filled below</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Info size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Salary multiple</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{multiple.toFixed(1)}×</div>
            <div className="text-xs text-slate-400 mt-0.5">UK standard: 4.5×</div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Based on typical UK tax bands and lending criteria. This is an estimate, not financial advice.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Personalise your calculation</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your salary is pre-filled based on this page. Add your monthly expenses, savings, and any existing debts for a complete picture.
        </p>
        <MainCalculator initialInputs={{ annualSalary: salary }} />
      </div>

      <AdBanner position="mid" className="mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Home size={16} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">What lenders will see</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Standard maximum mortgage:</strong>{' '}
              Most UK lenders offer between 4× and 4.5× your salary —{' '}
              {formatCurrency(maxMortgage4x, true)} to {formatCurrency(maxMortgage4_5x, true)} on your income.
            </p>
            <p>
              <strong className="text-slate-900">The gap:</strong>{' '}
              The average {city} home costs {formatCurrency(avgHousePrice, true)}.
              {multiple > 4.5
                ? ` This is ${multiple.toFixed(1)}× your salary, which exceeds standard criteria. A larger deposit bridges part of the gap.`
                : ` At ${multiple.toFixed(1)}× your salary, this sits within standard lending guidelines for most lenders.`}
            </p>
            <p>
              <strong className="text-slate-900">Deposit guidance:</strong>{' '}
              {getDepositTip(multiple)}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Local context: {city}</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {localContext}
          </p>
        </div>
      </div>

      <CTASection />

      {relatedSlugs.length > 0 && (
        <RelatedLocations slugs={relatedSlugs} navigate={navigate} />
      )}

      <RelatedLinks
        navigate={navigate}
        links={[
          { label: 'Affording a house in London on £50k', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'Can I afford a £200k house on a £30k salary?', path: '/can-i-afford-200k-house-on-30k-salary-uk' },
          { label: 'Can I afford a £300k house on a £45k salary?', path: '/can-i-afford-300k-house-on-45k-salary-uk' },
          { label: 'Can I afford a £400k house on a £60k salary?', path: '/can-i-afford-400k-house-on-60k-salary-uk' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
