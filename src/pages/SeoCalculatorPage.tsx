import { ArrowLeft, ArrowRight, MessageSquare, CheckCircle, AlertTriangle, XCircle, TrendingUp, Home, Info, MapPin, Building2, Calculator, ThumbsUp, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { SeoPageData, getSeoPageBySlug, FaqItem, BuyerScenario, MonthlyCostContext } from '../data/seoPages';
import { getLocationPageBySlug } from '../data/locationPages';
import { usePageTitle } from '../hooks/usePageTitle';
import { MainCalculator } from '../components/MainCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { formatCurrency, getAffordabilityVerdict } from '../utils/calculatorLogic';

interface SeoCalculatorPageProps {
  page: SeoPageData;
  navigate: (path: string) => void;
}

const confidenceConfig = {
  strong: {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    label: 'Very affordable',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  possible: {
    icon: CheckCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    label: 'Likely affordable',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  stretched: {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    label: 'Potentially stretched',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  unlikely: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    label: 'Unlikely affordable',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
  },
};

function formatSalaryMultiple(housePrice: number, salary: number): string {
  return (housePrice / salary).toFixed(1);
}

function getDepositGuidance(multiple: number): string {
  if (multiple <= 4.5) return 'A 10% deposit should be sufficient for most standard lenders.';
  if (multiple <= 6) return 'A deposit of at least 15–20% will strengthen your application considerably.';
  if (multiple <= 7.5) return 'You will likely need a deposit of 20–25% or more to meet lender requirements.';
  return 'A deposit of 25–40% is typically required for properties at this price-to-income ratio.';
}

function getLenderGuidance(multiple: number): string {
  if (multiple <= 4.5) return 'Most high-street lenders should accept your application under standard criteria.';
  if (multiple <= 5.5) return 'Some high-street lenders may accept this. A mortgage broker can help identify the best options.';
  if (multiple <= 7) return 'Specialist lenders or a dedicated mortgage broker will be important in finding a suitable deal.';
  return 'Private banks and high-net-worth mortgage specialists are likely your best route at this borrowing level.';
}

const verdictBadge = {
  strong:   { label: 'Very affordable',       bg: 'bg-emerald-100', text: 'text-emerald-700' },
  possible: { label: 'Likely affordable',     bg: 'bg-blue-100',    text: 'text-blue-700'    },
  stretched:{ label: 'Potentially stretched', bg: 'bg-amber-100',   text: 'text-amber-700'   },
  unlikely: { label: 'Unlikely affordable',   bg: 'bg-red-100',     text: 'text-red-700'     },
};

interface RelatedPagesProps {
  slugs: string[];
  navigate: (path: string) => void;
}

function RelatedPages({ slugs, navigate }: RelatedPagesProps) {
  const items = slugs.map((s) => {
    const seo = getSeoPageBySlug(s);
    if (seo) return { type: 'seo' as const, slug: s, data: seo };
    const loc = getLocationPageBySlug(s);
    if (loc) return { type: 'location' as const, slug: s, data: loc };
    return null;
  }).filter(Boolean) as Array<
    { type: 'seo'; slug: string; data: SeoPageData } |
    { type: 'location'; slug: string; data: ReturnType<typeof getLocationPageBySlug> & object }
  >;

  if (items.length === 0) return null;

  function getLocationBand(salary: number, price: number) {
    const m = price / salary;
    if (m <= 5) return { label: 'Achievable', bg: 'bg-emerald-100', text: 'text-emerald-700' };
    if (m <= 6.5) return { label: 'Possible', bg: 'bg-blue-100', text: 'text-blue-700' };
    if (m <= 8) return { label: 'Stretched', bg: 'bg-amber-100', text: 'text-amber-700' };
    return { label: 'Very difficult', bg: 'bg-red-100', text: 'text-red-700' };
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Related affordability questions</h2>
      <p className="text-sm text-slate-500 mb-5">
        Explore similar salary and house price combinations to see how your scenario compares.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          if (item.type === 'seo') {
            const p = item.data;
            const v = getAffordabilityVerdict(p.housePrice, p.salary);
            const badge = verdictBadge[v.confidence];
            const multiple = (p.housePrice / p.salary).toFixed(1);
            return (
              <button
                key={item.slug}
                onClick={() => navigate(`/${item.slug}`)}
                className="group text-left bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Home size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">House</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-0.5">
                  {formatCurrency(p.housePrice, true)}
                </div>
                <div className="text-sm text-slate-500 mb-3">
                  on a {formatCurrency(p.salary, true)} salary
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
          }

          const p = item.data!;
          const band = getLocationBand(p.salary, p.avgHousePrice);
          const multiple = (p.avgHousePrice / p.salary).toFixed(1);
          return (
            <button
              key={item.slug}
              onClick={() => navigate(`/${item.slug}`)}
              className="group text-left bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{p.city}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${band.bg} ${band.text}`}>
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

function MonthlyCostCard({ context }: { context: MonthlyCostContext }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Calculator size={14} className="text-slate-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated monthly cost</span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-2">{context.estimate}</p>
      <p className="text-sm text-slate-600 leading-relaxed">{context.note}</p>
    </div>
  );
}

function BuyerScenarioCard({ scenario }: { scenario: BuyerScenario }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg">
          <User size={16} className="text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">A realistic buyer scenario</h2>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{scenario.name}</p>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">{scenario.situation}</p>
        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">{scenario.outcome}</p>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
          <MessageSquare size={16} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
      </div>
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white">
            <button
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
              <ChevronDown
                size={16}
                className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SeoCalculatorPage({ page, navigate }: SeoCalculatorPageProps) {
  const { housePrice, salary, h1, shortAnswer, relatedSlugs, metaTitle, metaDescription, richSections } = page;
  usePageTitle(metaTitle, metaDescription);
  const verdict = getAffordabilityVerdict(housePrice, salary);
  const cfg = confidenceConfig[verdict.confidence];
  const VerdictIcon = cfg.icon;
  const multiple = housePrice / salary;
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
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
          UK Affordability Calculator
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
          {h1}
        </h1>

        <div className={`rounded-2xl border p-5 mb-5 ${cfg.bg} ${cfg.border}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <MessageSquare size={14} className={cfg.color} />
            <span className={`text-xs font-bold uppercase tracking-wider ${cfg.color}`}>
              Short answer
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
              {cfg.label}
            </span>
          </div>
          <p className={`text-sm leading-relaxed font-medium text-slate-800`}>
            {shortAnswer}
          </p>
        </div>

        {richSections?.monthlyCostContext && (
          <MonthlyCostCard context={richSections.monthlyCostContext} />
        )}

        <div className={`flex items-start gap-3 p-4 rounded-xl border mb-8 ${cfg.bg} ${cfg.border}`}>
          <VerdictIcon size={17} className={`${cfg.color} flex-shrink-0 mt-0.5`} />
          <p className="text-xs text-slate-600 leading-relaxed">{verdict.summary}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Home size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">House price</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(housePrice, true)}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Annual salary</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(salary, true)}</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Info size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Salary multiple</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatSalaryMultiple(housePrice, salary)}×</div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Based on typical UK tax bands and lending criteria. This is an estimate, not financial advice.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Personalise your calculation</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your salary is pre-filled. Add your monthly expenses, savings, and existing debts for a complete picture.
        </p>
        <MainCalculator initialInputs={{ annualSalary: salary }} />
      </div>

      <AdBanner position="mid" className="mb-10" />

      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">What the numbers mean for you</h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">Standard lending multiple:</strong> Most UK mortgage lenders will lend between{' '}
            <strong>4 and 4.5 times your annual salary</strong>. On a salary of{' '}
            {formatCurrency(salary, true)}, that translates to a maximum mortgage of roughly{' '}
            {formatCurrency(maxMortgage4x, true)} to {formatCurrency(maxMortgage4_5x, true)}.
          </p>
          <p>
            <strong className="text-slate-900">The {formatCurrency(housePrice, true)} property:</strong> This home is{' '}
            <strong>{multiple.toFixed(1)} times</strong> your annual salary.{' '}
            {multiple <= 4.5
              ? 'This sits within standard lending criteria, meaning most high-street lenders should consider your application on its merits.'
              : 'This exceeds the standard lending multiple. You will need either a significant deposit or to explore specialist lending options.'}
          </p>
          <p>
            <strong className="text-slate-900">Deposit strategy:</strong> {getDepositGuidance(multiple)}
          </p>
          <p>
            <strong className="text-slate-900">Which lenders to approach:</strong> {getLenderGuidance(multiple)}
          </p>
          <p>
            <strong className="text-slate-900">Other factors that affect lending:</strong> Credit score, employment type, existing debts, number of dependants, and monthly expenditure all influence what you can borrow. Speaking to an independent mortgage broker gives you the clearest picture of your real options.
          </p>
        </div>
      </div>

      <CTASection />

      {richSections?.propertyExamples && richSections.propertyExamples.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
              <Building2 size={16} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              What does a {formatCurrency(housePrice, true)} property look like in the UK?
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-5 ml-[2.75rem]">
            What your money buys varies enormously depending on where you look.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {richSections.propertyExamples.map((ex) => (
              <div
                key={ex.location}
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <MapPin size={12} className="text-blue-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{ex.location}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{ex.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {richSections?.mortgageScenarios && richSections.mortgageScenarios.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
              <Calculator size={16} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              What mortgage would you need for {formatCurrency(housePrice, true)}?
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-5 ml-[2.75rem]">
            Estimated monthly repayments based on a 25-year repayment mortgage at current indicative rates.
            Actual rates will vary by lender, credit profile, and deposit size.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Deposit</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Loan amount</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Rate</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3.5">Est. monthly</th>
                </tr>
              </thead>
              <tbody>
                {richSections.mortgageScenarios.map((s, i) => {
                  const pct = Math.round((s.deposit / housePrice) * 100);
                  return (
                    <tr
                      key={i}
                      className={`border-b border-slate-100 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'}`}
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-slate-900">{formatCurrency(s.deposit, true)}</span>
                        <span className="ml-1.5 text-xs text-slate-400">({pct}%)</span>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{formatCurrency(s.loanAmount, true)}</td>
                      <td className="px-5 py-4 text-slate-700">{s.rate}%</td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-bold text-slate-900">{formatCurrency(s.monthlyPayment, true)}/mo</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            On a take-home salary of roughly £3,100–£3,200/month at £50k, the lowest payment scenario above
            still represents nearly half your monthly income — before bills, food, or childcare.
            That is why most lenders treat this combination as stretched.
          </p>
        </section>
      )}

      {richSections?.realisticVerdict && (
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
              <ThumbsUp size={16} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Is {formatCurrency(housePrice, true)} realistic on a {formatCurrency(salary, true)} salary?
            </h2>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mt-5">
            <p className="font-semibold text-slate-900 mb-4">{richSections.realisticVerdict.headline}</p>
            <ul className="space-y-3">
              {richSections.realisticVerdict.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center mt-0.5">
                    <span className="text-[10px] font-bold text-amber-800">{i + 1}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-amber-200">
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {richSections.realisticVerdict.bottomLine}
              </p>
            </div>
          </div>
        </section>
      )}

      {richSections?.buyerScenario && (
        <BuyerScenarioCard scenario={richSections.buyerScenario} />
      )}

      {richSections?.faqs && richSections.faqs.length > 0 && (
        <FaqAccordion faqs={richSections.faqs} />
      )}

      {relatedSlugs.length > 0 && (
        <RelatedPages slugs={relatedSlugs} navigate={navigate} />
      )}

      <RelatedLinks
        navigate={navigate}
        links={[
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
          { label: 'Can I afford a house in London on a £50k salary?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'How much mortgage can I afford on a £50k salary?', path: '/how-much-mortgage-can-i-afford-on-50k-salary-uk' },
          { label: 'Can I afford a house in Manchester on a £40k salary?', path: '/can-i-afford-a-house-in-manchester-on-40k' },
          { label: 'Can I afford a house in Birmingham on a £35k salary?', path: '/can-i-afford-a-house-in-birmingham-on-35k' },
          { label: 'Can I afford a house in Bristol on a £45k salary?', path: '/can-i-afford-a-house-in-bristol-on-45k' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ].filter((l) => l.path !== `/${page.slug}`)}
      />
    </main>
  );
}
