import { ArrowLeft, ArrowRight, MapPin, TrendingUp, Home, Info, XCircle, PoundSterling, Building2 } from 'lucide-react';
import { getLocationPageBySlug, LocationPageData } from '../data/locationPages';
import { usePageTitle } from '../hooks/usePageTitle';
import { MainCalculator } from '../components/MainCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';
import { formatCurrency } from '../utils/calculatorLogic';

const SALARY = 50000;
const AVG_PRICE = 525000;
const MULTIPLE = AVG_PRICE / SALARY;
const MAX_MORTGAGE_4X = SALARY * 4;
const MAX_MORTGAGE_45X = SALARY * 4.5;

const META_TITLE = 'Can I afford a house in London on £50k? UK Reality Check';
const META_DESC =
  'See what you can realistically afford in London on a £50k salary, including mortgage range, deposit pressure, monthly costs and affordability limits.';

interface PropertyType {
  type: string;
  zone: string;
  priceRange: string;
  verdict: 'possible' | 'stretched' | 'unlikely';
  note: string;
}

const PROPERTY_TYPES: PropertyType[] = [
  {
    type: 'Studio / 1-bed flat',
    zone: 'Zones 4–6',
    priceRange: '£250k–£320k',
    verdict: 'possible',
    note: 'With a 20–25% deposit, a mortgage of £200k–£240k is within standard lending. Areas like Barking, Dagenham, Croydon, and parts of Bromley.',
  },
  {
    type: '2-bed flat',
    zone: 'Zones 3–4',
    priceRange: '£350k–£450k',
    verdict: 'stretched',
    note: 'This range exceeds standard lending on a solo £50k income. A deposit of £100k+ or a joint application would be needed.',
  },
  {
    type: '2-bed house',
    zone: 'Zones 4–6',
    priceRange: '£380k–£500k',
    verdict: 'stretched',
    note: 'Possible in the most affordable outer boroughs, but requires a strong deposit and lean monthly outgoings.',
  },
  {
    type: 'Average London home',
    zone: 'London-wide avg.',
    priceRange: '~£525k',
    verdict: 'unlikely',
    note: 'At 10.5× your salary, the average property is firmly beyond what standard lenders will offer on a single £50k income.',
  },
];

const verdictStyle = {
  possible: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', label: 'Possible' },
  stretched: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', label: 'Stretched' },
  unlikely: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', label: 'Difficult' },
};

interface DepositRow {
  depositPct: number;
  depositAmt: number;
  totalBudget: number;
  note: string;
}

function buildDepositRows(): DepositRow[] {
  const targets = [
    { pct: 10, note: 'Minimum many lenders accept. Higher risk tier — expect a higher interest rate.' },
    { pct: 15, note: 'Unlocks a wider pool of lenders and reduces your monthly payments noticeably.' },
    { pct: 20, note: 'A strong position. Most high-street lenders will consider you on standard terms.' },
    { pct: 25, note: 'Best rates available to you. Significantly reduces the loan-to-value risk for lenders.' },
  ];
  return targets.map(({ pct, note }) => {
    const depositAmt = Math.round((pct / 100) * AVG_PRICE / 1000) * 1000;
    const totalBudget = MAX_MORTGAGE_45X + depositAmt;
    return { depositPct: pct, depositAmt, totalBudget, note };
  });
}

const DEPOSIT_ROWS = buildDepositRows();

interface RelatedLocationsProps {
  slugs: string[];
  navigate: (path: string) => void;
}

function RelatedLocations({ slugs, navigate }: RelatedLocationsProps) {
  const pages = slugs.map((s) => getLocationPageBySlug(s)).filter(Boolean) as LocationPageData[];
  if (pages.length === 0) return null;

  function getBand(salary: number, price: number) {
    const m = price / salary;
    if (m <= 5) return { label: 'Achievable', bg: 'bg-emerald-50', text: 'text-emerald-700' };
    if (m <= 6.5) return { label: 'Possible', bg: 'bg-blue-50', text: 'text-blue-700' };
    if (m <= 8) return { label: 'Stretched', bg: 'bg-amber-50', text: 'text-amber-700' };
    return { label: 'Very difficult', bg: 'bg-red-50', text: 'text-red-700' };
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Compare other UK cities</h2>
      <p className="text-sm text-slate-500 mb-5">
        See how affordability differs across the UK based on salary and average house prices.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((p) => {
          const band = getBand(p.salary, p.avgHousePrice);
          const m = (p.avgHousePrice / p.salary).toFixed(1);
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
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${band.bg} ${band.text}`}>
                  {band.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-0.5">{formatCurrency(p.avgHousePrice, true)}</div>
              <div className="text-sm text-slate-500 mb-3">avg. price · {formatCurrency(p.salary, true)} salary</div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400">{m}× salary multiple</div>
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

interface Props {
  navigate: (path: string) => void;
}

export function London50kPage({ navigate }: Props) {
  usePageTitle(META_TITLE, META_DESC);

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
          London · UK Affordability
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-5">
          Can I afford a house in London on a £50,000 salary?
        </h1>

        {/* Short answer */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Short answer</p>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            Buying a house in London on a £50k salary is difficult for most single-income buyers unless you have a large deposit, additional income, or are looking at shared ownership or lower-cost outer boroughs.
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 mb-5">
          <div className="flex items-center gap-2 mb-2.5">
            <XCircle size={14} className="text-red-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Affordability overview
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-100">
              Very difficult
            </span>
          </div>
          <p className="text-sm leading-relaxed font-medium text-slate-800">
            London is one of the least affordable housing markets in the world — not just the UK. On a £50,000 salary,
            the average London home costs roughly{' '}
            <strong>10.5 times your annual income</strong>, far exceeding the standard 4.5× lending limit. Buying in
            London solo at this salary is genuinely difficult and typically requires a large deposit, a joint income, or
            a deliberate focus on the most affordable outer boroughs. That said, it is not impossible with the right
            strategy.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900">London vs the UK average:</strong> The average UK house price is around
          £285,000. London's average is approximately £525,000 — nearly{' '}
          <strong>85% higher</strong>. For the same salary, you can typically borrow the same amount but need a much
          larger deposit to close the gap. The result: buyers in London face one of the toughest affordability ratios
          anywhere in the world.
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Avg. house price</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(AVG_PRICE, true)}</div>
            <div className="text-xs text-slate-400 mt-0.5">London average</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Annual salary</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{formatCurrency(SALARY, true)}</div>
            <div className="text-xs text-slate-400 mt-0.5">pre-filled below</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Info size={12} className="text-slate-400" />
              <div className="text-xs text-slate-500">Salary multiple</div>
            </div>
            <div className="text-xl font-bold text-slate-900">{MULTIPLE.toFixed(1)}×</div>
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
          Your salary is pre-filled. Add your monthly expenses, savings, and any existing debts for a complete picture.
        </p>
        <MainCalculator initialInputs={{ annualSalary: SALARY }} />
      </div>

      <AdBanner position="mid" className="mb-10" />

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={18} className="text-slate-500" />
          <h2 className="text-xl font-bold text-slate-900">What can you realistically buy in London on £50k?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          Not all London property is priced the same. Here is a realistic breakdown of what is in and out of reach
          on a single £50,000 income, depending on property type, zone, and deposit size.
        </p>

        <div className="space-y-3">
          {PROPERTY_TYPES.map((pt) => {
            const style = verdictStyle[pt.verdict];
            return (
              <div
                key={pt.type}
                className={`rounded-2xl border ${style.border} ${style.bg} p-5`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{pt.type}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{pt.zone}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{pt.priceRange}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
                      {style.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{pt.note}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Key takeaway:</strong> On a solo £50k salary, you are most likely to
          succeed at the lower end of the London market — small flats in zones 4–6 in the most affordable boroughs.
          Joint applications, shared ownership schemes, or Help to Buy alternatives can make the picture meaningfully
          better.
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <PoundSterling size={18} className="text-slate-500" />
          <h2 className="text-xl font-bold text-slate-900">How much deposit would you need?</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          Your deposit does two things: it reduces the loan amount (and therefore your monthly payments), and it
          determines which lenders will consider you. Below is how different deposit sizes affect your total buying
          power on a £50k salary — assuming maximum 4.5× borrowing of{' '}
          <strong className="text-slate-700">{formatCurrency(MAX_MORTGAGE_45X, true)}</strong>.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left font-semibold text-slate-600 px-5 py-3">Deposit</th>
                <th className="text-left font-semibold text-slate-600 px-5 py-3">Amount saved</th>
                <th className="text-left font-semibold text-slate-600 px-5 py-3">Total budget</th>
                <th className="text-left font-semibold text-slate-600 px-5 py-3 hidden sm:table-cell">What it unlocks</th>
              </tr>
            </thead>
            <tbody>
              {DEPOSIT_ROWS.map((row, i) => (
                <tr key={row.depositPct} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="px-5 py-4 font-bold text-slate-900">{row.depositPct}%</td>
                  <td className="px-5 py-4 text-slate-700">{formatCurrency(row.depositAmt, true)}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{formatCurrency(row.totalBudget, true)}</td>
                  <td className="px-5 py-4 text-slate-500 hidden sm:table-cell text-xs leading-relaxed">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Important:</strong> These figures assume maximum borrowing at 4.5× salary.
          Your actual mortgage offer will depend on your credit score, existing debts, monthly outgoings, and the
          specific lender. Use the calculator above to model your personal situation in full.
        </div>
      </div>

      {/* Section: What mortgage could you get */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">What mortgage could you get on a £50k salary?</h2>
        <p className="text-sm text-slate-500 mb-5">
          UK mortgage lenders typically offer between 4× and 4.5× your gross annual salary as a starting point, then run an affordability stress test.
        </p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Lending multiple</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Max mortgage</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Who this applies to</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { multiple: '4× (conservative)', mortgage: formatCurrency(MAX_MORTGAGE_4X, true), who: 'Buyers with high existing debt or variable income' },
                  { multiple: '4.5× (standard)', mortgage: formatCurrency(MAX_MORTGAGE_45X, true), who: 'Most mainstream high-street lenders' },
                  { multiple: '5× (stretch)', mortgage: '£250,000', who: 'Specialist lenders, professionals, or very low outgoings' },
                ].map((row, i) => (
                  <tr key={row.multiple} className={`border-b border-slate-50 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.multiple}</td>
                    <td className="px-4 py-3 text-slate-700">{row.mortgage}</td>
                    <td className="px-4 py-3 text-right text-slate-500 text-xs">{row.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
          <Info size={12} className="flex-shrink-0 mt-0.5" />
          <span>The average London home costs around £525,000 — more than double what most lenders will offer at 4.5× on a £50k income. That gap is why deposit size matters so much in London specifically.</span>
        </div>
      </section>

      {/* Section: Why London is harder */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Why London is harder than the UK average</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            The UK average house price is around <strong>£285,000</strong>. At 4.5×, a £50k salary covers a £225,000 mortgage — and a modest £60,000 deposit gets you to £285,000. That is a challenging but achievable savings target outside London.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            In London, the same salary has to cover an average price of <strong>£525,000</strong>. You would need a deposit of around £300,000 to close the gap on a standard mortgage offer. That is not realistic for most buyers on a single income.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            The mismatch is structural — London salaries are higher on average, but house prices have risen faster than wages for decades. A buyer earning £50,000 in Manchester or Birmingham is in a meaningfully different position to the same buyer in London.
          </p>
        </div>
      </section>

      {/* Section: How much deposit makes this realistic */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">How much deposit would make this more realistic?</h2>
        <p className="text-sm text-slate-500 mb-5">
          Because your borrowing is capped at around £225,000, a larger deposit directly expands what you can buy. Here is the relationship between deposit size and total purchase budget on a £50k salary:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left font-semibold text-slate-600 px-5 py-3">Deposit saved</th>
                <th className="text-left font-semibold text-slate-600 px-5 py-3">Max mortgage (4.5×)</th>
                <th className="text-left font-semibold text-slate-600 px-5 py-3">Total budget</th>
                <th className="text-left font-semibold text-slate-600 px-5 py-3 hidden sm:table-cell">What it can buy in London</th>
              </tr>
            </thead>
            <tbody>
              {[
                { deposit: '£25,000', mortgage: formatCurrency(MAX_MORTGAGE_45X, true), budget: '£250,000', note: 'Studio or 1-bed in outer Zone 6' },
                { deposit: '£50,000', mortgage: formatCurrency(MAX_MORTGAGE_45X, true), budget: '£275,000', note: '1-bed flat in zones 4–6 (affordable boroughs)' },
                { deposit: '£75,000', mortgage: formatCurrency(MAX_MORTGAGE_45X, true), budget: '£300,000', note: '1–2 bed flat, outer London boroughs' },
                { deposit: '£100,000', mortgage: formatCurrency(MAX_MORTGAGE_45X, true), budget: '£325,000', note: '2-bed flat in zones 4–5' },
                { deposit: '£150,000+', mortgage: formatCurrency(MAX_MORTGAGE_45X, true), budget: '£375,000+', note: '2-bed flat in zone 3–4, or 1-bed in zone 2' },
              ].map(({ deposit, mortgage, budget, note }, i) => (
                <tr key={deposit} className={`border-b border-slate-100 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                  <td className="px-5 py-4 font-semibold text-slate-900">{deposit}</td>
                  <td className="px-5 py-4 text-slate-600">{mortgage}</td>
                  <td className="px-5 py-4 font-semibold text-primary-700">{budget}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs hidden sm:table-cell">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The mortgage column stays fixed because the borrowing limit does not change with deposit size — only the total purchase budget moves. Figures are estimates; actual offers depend on full affordability assessment.
        </p>
      </section>

      {/* Section: Shared ownership */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Is shared ownership more realistic on £50k?</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Shared ownership allows you to buy a share of a property (typically 25–75%) and pay subsidised rent on the remainder. Because you only need a mortgage for your share, the borrowing required is significantly lower.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            On a £50k salary, buying a 50% share of a £350,000 property means mortgaging £175,000 — well within standard lending limits. The deposit required drops to roughly £8,750–£17,500 (5–10% of your share). This makes shared ownership one of the few realistic routes into London homeownership at this income level without a large lump sum.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Considerations:</strong> You pay both mortgage and rent simultaneously, which affects monthly cash flow. You will need to pay rent on the unowned share (typically 2.75–3% per year). Staircasing (buying more shares over time) is possible but has costs. Resale rules vary. Always review the lease terms carefully and take independent legal advice before proceeding.
            </p>
          </div>
          <button
            onClick={() => navigate('/how-much-mortgage-can-i-afford-on-50k-salary-uk')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            How much mortgage can I afford on a £50k salary?
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

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
              {formatCurrency(MAX_MORTGAGE_4X, true)} to {formatCurrency(MAX_MORTGAGE_45X, true)} on your income.
            </p>
            <p>
              <strong className="text-slate-900">The gap:</strong>{' '}
              The average London home costs {formatCurrency(AVG_PRICE, true)}.
              {' '}This is {MULTIPLE.toFixed(1)}× your salary, which significantly exceeds standard lending criteria.
              A large deposit is essential to bridge the gap.
            </p>
            <p>
              <strong className="text-slate-900">Deposit guidance:</strong>{' '}
              You will likely need a deposit of 20–30% or more to meet lending requirements at this price-to-income ratio.
              That means saving between £105,000 and £157,000 to buy the average London home.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Local context: London</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            London property prices are significantly higher than the UK average of around £285,000. Even on a £50,000
            salary, most buyers in the capital will need a substantial deposit, a joint income, or to focus on outer
            boroughs where prices are more within reach. The average London home costs roughly 10 times the average
            salary, making it one of the most stretched markets in the world.
          </p>
        </div>
      </div>

      <CTASection />

      <RelatedLocations
        slugs={['can-i-afford-a-house-in-bristol-on-45k', 'can-i-afford-a-house-in-edinburgh-on-45k', 'can-i-afford-a-house-in-manchester-on-40k']}
        navigate={navigate}
      />

      <RelatedLinks
        navigate={navigate}
        links={[
          { label: 'Can I afford a house in London on a £40k salary?', path: '/can-i-afford-a-house-in-london-on-40k' },
          { label: 'Can I afford a house in London on a £60k salary?', path: '/can-i-afford-a-house-in-london-on-60k' },
          { label: 'Can I afford a house in London on a £70k salary?', path: '/can-i-afford-a-house-in-london-on-70k' },
          { label: 'Can I afford a £400k house on a £60k salary?', path: '/can-i-afford-400k-house-on-60k-salary-uk' },
          { label: 'How much mortgage can I afford on a £50k salary?', path: '/how-much-mortgage-can-i-afford-on-50k-salary-uk' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
