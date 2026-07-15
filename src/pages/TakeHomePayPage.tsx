import { ArrowLeft, ArrowRight, TrendingUp, PoundSterling, Home, Info } from 'lucide-react';
import { TakeHomePageData } from '../data/takeHomePages';
import { usePageTitle } from '../hooks/usePageTitle';
import { getSeoPageBySlug } from '../data/seoPages';
import { getLocationPageBySlug } from '../data/locationPages';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { formatCurrency } from '../utils/calculatorLogic';

interface TakeHomePayPageProps {
  page: TakeHomePageData;
  navigate: (path: string) => void;
}

function formatAmount(n: number): string {
  return n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
}

function getEffectiveRate(gross: number, incomeTax: number, ni: number): string {
  return (((incomeTax + ni) / gross) * 100).toFixed(1);
}

function getTaxBandSummary(gross: number): string {
  if (gross <= 12570) return 'Your full salary falls within your personal allowance, so you pay no income tax.';
  if (gross <= 50270) return 'Your salary falls entirely within the basic rate band (20%) after your personal allowance.';
  if (gross <= 100000) return 'Your salary spans the basic rate (20%) and higher rate (40%) bands.';
  if (gross <= 125140) return 'Your salary is in the higher rate band, and your personal allowance is being tapered, meaning some income is effectively taxed at 60%.';
  return 'Your salary exceeds £125,140, so your personal allowance is fully withdrawn and a portion is taxed at the additional rate (45%).';
}

interface RelatedAffordabilityCardsProps {
  slugs: string[];
  navigate: (path: string) => void;
}

function RelatedAffordabilityCards({ slugs, navigate }: RelatedAffordabilityCardsProps) {
  const pages = slugs.map((s) => getSeoPageBySlug(s)).filter(Boolean);
  if (pages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pages.map((p) => (
        <button
          key={p!.slug}
          onClick={() => navigate(`/${p!.slug}`)}
          className="group text-left bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition-all"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <Home size={13} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Affordability</span>
          </div>
          <div className="text-lg font-bold text-slate-900 mb-1 leading-snug">{p!.h1}</div>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700 mt-3">
            See calculation
            <ArrowRight size={12} />
          </div>
        </button>
      ))}
    </div>
  );
}

interface RelatedLocationCardsProps {
  slugs: string[];
  navigate: (path: string) => void;
}

function RelatedLocationCards({ slugs, navigate }: RelatedLocationCardsProps) {
  const pages = slugs.map((s) => getLocationPageBySlug(s)).filter(Boolean);
  if (pages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {pages.map((p) => (
        <button
          key={p!.slug}
          onClick={() => navigate(`/${p!.slug}`)}
          className="group text-left bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition-all"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{p!.city}</div>
          <div className="text-lg font-bold text-slate-900 mb-1">{formatCurrency(p!.avgHousePrice, true)}</div>
          <div className="text-xs text-slate-400 mb-3">avg. house price</div>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
            See affordability
            <ArrowRight size={12} />
          </div>
        </button>
      ))}
    </div>
  );
}

export function TakeHomePayPage({ page, navigate }: TakeHomePayPageProps) {
  const {
    grossSalary,
    annualTakeHome,
    monthlyTakeHome,
    incomeTax,
    nationalInsurance,
    personalAllowance,
    relatedAffordabilitySlugs,
    relatedLocationSlugs,
    metaTitle,
    metaDescription,
  } = page;
  usePageTitle(metaTitle, metaDescription, `/${page.slug}`);

  const effectiveRate = getEffectiveRate(grossSalary, incomeTax, nationalInsurance);
  const taxBandSummary = getTaxBandSummary(grossSalary);
  const grossLabel = formatAmount(grossSalary);

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
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
          UK Take-Home Pay Calculator
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
          Take home pay on a {grossLabel} salary in the UK
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          Your actual take-home pay depends on income tax, National Insurance contributions, and your personal allowance.
          On a {grossLabel} gross salary, here is what you keep after all standard deductions under 2024/25 rates.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <PoundSterling size={16} className="text-blue-600" />
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Your take-home pay</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10 mb-6">
            <div>
              <div className="text-xs text-slate-500 mb-1">Monthly take-home</div>
              <div className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                {formatAmount(monthlyTakeHome)}
              </div>
              <div className="text-xs text-slate-400 mt-1">per month</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Annual take-home</div>
              <div className="text-2xl font-bold text-slate-700">
                {formatAmount(annualTakeHome)}
              </div>
              <div className="text-xs text-slate-400 mt-1">per year</div>
            </div>
          </div>

          <div className="border-t border-blue-100 pt-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Deductions breakdown</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Gross salary</span>
                <span className="font-semibold text-slate-900">{formatAmount(grossSalary)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Personal allowance (tax-free)</span>
                <span className="font-semibold text-slate-900">{formatAmount(personalAllowance)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Income tax</span>
                <span className="font-semibold text-red-600">−{formatAmount(incomeTax)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">National Insurance</span>
                <span className="font-semibold text-red-600">−{formatAmount(nationalInsurance)}</span>
              </div>
              <div className="border-t border-blue-100 pt-2 mt-2 flex items-center justify-between text-sm font-bold">
                <span className="text-slate-900">Total take-home</span>
                <span className="text-slate-900">{formatAmount(annualTakeHome)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Info size={12} className="flex-shrink-0" />
              <span>
                You keep <strong className="text-slate-700">{(100 - parseFloat(effectiveRate)).toFixed(1)}%</strong> of your gross pay.
                Effective deduction rate: <strong className="text-slate-700">{effectiveRate}%</strong>.
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 mb-8 leading-relaxed">
          Based on typical UK tax bands and lending criteria. This is an estimate, not financial advice.
        </p>

        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">How UK tax bands work</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Personal allowance:</strong> Everyone gets a tax-free personal allowance of £12,570. You only pay income tax on earnings above this threshold.
            </p>
            <p>
              <strong className="text-slate-900">Basic rate (20%):</strong> Income between £12,571 and £50,270 is taxed at 20%.
            </p>
            <p>
              <strong className="text-slate-900">Higher rate (40%):</strong> Income between £50,271 and £125,140 is taxed at 40%.
            </p>
            <p>
              <strong className="text-slate-900">Additional rate (45%):</strong> Income above £125,140 is taxed at 45%. Above £100,000, your personal allowance is also gradually removed.
            </p>
            <p>
              <strong className="text-slate-900">National Insurance:</strong> You pay 8% NI on earnings between £12,570 and £50,270, and 2% on anything above that.
            </p>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 mt-2">
              <p className="text-slate-700 font-medium">{taxBandSummary}</p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner position="mid" className="mb-10" />

      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-3xl p-8 sm:p-10 mb-10 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">Next step</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Now see what you can afford with this salary
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-7 text-sm leading-relaxed">
          Use your monthly take-home of <strong className="text-white">{formatAmount(monthlyTakeHome)}</strong> to find out how much house you can realistically afford in the UK.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-900/30"
        >
          Check my affordability
          <ArrowRight size={16} />
        </button>
        <p className="text-slate-600 text-xs mt-5">Free to use. No sign-up required.</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Related affordability questions</h2>
        <p className="text-sm text-slate-500 mb-5">
          See what a {grossLabel} salary can buy across different UK house prices.
        </p>
        <RelatedAffordabilityCards slugs={relatedAffordabilitySlugs} navigate={navigate} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Can you afford to buy in these cities?</h2>
        <p className="text-sm text-slate-500 mb-5">
          Explore location-specific affordability based on average house prices across the UK.
        </p>
        <RelatedLocationCards slugs={relatedLocationSlugs} navigate={navigate} />
      </section>

      <RelatedLinks
        navigate={navigate}
        title="More take-home pay calculations"
        links={[
          { label: 'Take home pay on a £30k salary', path: '/take-home-pay-30k-uk' },
          { label: 'Take home pay on a £40k salary', path: '/take-home-pay-40k-uk' },
          { label: 'Take home pay on a £50k salary', path: '/take-home-pay-50k-uk' },
          { label: 'Take home pay on a £60k salary', path: '/take-home-pay-60k-uk' },
          { label: 'Take home pay on a £70k salary', path: '/take-home-pay-70k-uk' },
          { label: 'Take home pay on an £80k salary', path: '/take-home-pay-80k-uk' },
          { label: 'Take home pay on a £90k salary', path: '/take-home-pay-90k-uk' },
          { label: 'Take home pay on a £100k salary', path: '/take-home-pay-100k-uk' },
          { label: 'Take home pay on a £120k salary', path: '/take-home-pay-120k-uk' },
          { label: 'Take home pay on a £150k salary', path: '/take-home-pay-150k-uk' },
        ].filter((l) => l.path !== `/${page.slug}`)}
      />

      <CTASection />
    </main>
  );
}
