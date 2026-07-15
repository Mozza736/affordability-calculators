import { ArrowDown, ArrowRight, ShieldCheck, Zap, BarChart3, Home, Car, TrendingUp, BookOpen, Database, Users, PiggyBank } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { MainCalculator } from '../components/MainCalculator';
import { WhatThisMeans } from '../components/WhatThisMeans';
import { PopularCalculators } from '../components/PopularCalculators';
import { CTASection } from '../components/CTASection';

interface HomePageProps {
  navigate: (path: string) => void;
}

const trustBadges = [
  { icon: Zap, text: 'Instant results' },
  { icon: ShieldCheck, text: 'No sign-up required' },
  { icon: BarChart3, text: 'UK lending standards' },
];

const popularQuestions = [
  {
    category: 'House',
    icon: Home,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    links: [
      { label: 'Can I afford a £200k house on a £30k salary?', path: '/can-i-afford-200k-house-on-30k-salary-uk' },
      { label: 'Can I afford a £300k house on a £50k salary?', path: '/can-i-afford-300k-house-on-50k-salary-uk' },
      { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
      { label: 'Can I afford a house in London on £50k?', path: '/can-i-afford-a-house-in-london-on-50k' },
      { label: 'How much mortgage can I afford on a £50k salary?', path: '/how-much-mortgage-can-i-afford-on-50k-salary-uk' },
    ],
  },
  {
    category: 'Car',
    icon: Car,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
    links: [
      { label: 'How much car can I afford per month?', path: '/car-affordability' },
      { label: 'How much should I spend on a car?', path: '/how-much-should-i-spend-on-a-car-uk' },
      { label: 'Is £300 a month car affordable?', path: '/is-300-a-month-car-affordable-uk' },
      { label: 'Is £400 a month car affordable?', path: '/is-400-a-month-car-affordable-uk' },
    ],
  },
  {
    category: 'Savings',
    icon: PiggyBank,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    links: [
      { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
      { label: 'Savings runway calculator', path: '/savings-runway' },
    ],
  },
];

export function HomePage({ navigate }: HomePageProps) {
  usePageTitle(
    'UK Affordability Calculator – What Can You Really Afford? (2026)',
    'Find out exactly what you can afford in 2026. Free UK calculators for house, rent, car, and savings — instant results based on your salary and outgoings.'
  );
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            Free UK Affordability Tools
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-5 text-balance">
            Find out what you can{' '}
            <span className="text-primary-600">really afford</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-3 text-balance">
            Instantly calculate how much house, rent, or car you can afford based on your income and expenses.
          </p>

          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            Built for UK buyers, renters and car finance decisions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm text-slate-500">
                <badge.icon size={15} className="text-primary-500" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Reality check summary */}
          <div className="mt-8 mb-2 text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Typical ranges on a £50k salary</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Home size={14} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Home to buy</div>
                  <div className="text-sm font-bold text-slate-900">£200k – £250k</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={14} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Monthly rent</div>
                  <div className="text-sm font-bold text-slate-900">£875 – £1,020</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Car size={14} className="text-slate-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Car finance</div>
                  <div className="text-sm font-bold text-slate-900">£250 – £400/mo</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Adjust the calculator below for your actual salary, expenses, and debts — these figures change significantly based on your full financial picture.
            </p>
          </div>

          <a
            href="#calculator"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors mt-6"
          >
            <ArrowDown size={15} className="animate-bounce" />
            Scroll to calculator
          </a>
        </div>

        <div id="calculator">
          <MainCalculator />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Results are estimates based on standard UK lending guidelines. Not financial advice.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <WhatThisMeans />
        <PopularCalculators navigate={navigate} />
        <CTASection />
      </div>

      {/* Popular affordability questions — grouped by category */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Popular affordability questions</h2>
          <p className="text-sm text-slate-500 mb-7">
            The most searched UK affordability scenarios — house buying, car finance, and savings.
          </p>
          <div className="space-y-6">
            {popularQuestions.map(({ category, icon: Icon, color, bg, border, links }) => (
              <div key={category}>
                <div className={`inline-flex items-center gap-1.5 ${bg} ${border} border rounded-full px-3 py-1 mb-3`}>
                  <Icon size={12} className={color} />
                  <span className={`text-xs font-semibold ${color}`}>{category}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {links.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="group flex items-center justify-between gap-3 text-left bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl px-4 py-3 transition-all"
                    >
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors leading-snug">
                        {item.label}
                      </span>
                      <ArrowRight size={14} className="flex-shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust / methodology section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">How these estimates are calculated</h2>
          <p className="text-sm text-slate-500 mb-6">
            These numbers are not guesses. They are based on real UK lending rules, salary data, and spending patterns.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: Database,
                title: 'UK salary and tax data',
                body: 'We use current HMRC tax bands and National Insurance thresholds to estimate realistic take-home pay for each income level.',
              },
              {
                icon: BookOpen,
                title: 'Standard lender affordability rules',
                body: 'Mortgage estimates apply the 4–4.5× salary multiple used by most UK high-street lenders. Car budgets follow the 10–15% of net income rule used by financial advisers.',
              },
              {
                icon: Users,
                title: 'Real-world spending patterns',
                body: 'Expense defaults reflect typical UK household costs. The 10% safety buffer we apply accounts for the irregular costs most budgets forget.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={15} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 mb-1">{title}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-5 leading-relaxed border-t border-slate-50 pt-4">
            Results are estimates based on standard UK guidelines. Individual circumstances vary. Always speak to a qualified mortgage broker or financial adviser before making major decisions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
        <button
          onClick={() => navigate('/can-i-afford-350k-house-on-50k-salary-uk')}
          className="group w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50 border border-blue-100 hover:border-blue-300 hover:bg-blue-100 rounded-2xl px-6 py-5 transition-all text-left"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">Reality Check</div>
            <div className="text-base font-bold text-slate-900 leading-snug">
              Can I afford a £350k house on a £50k salary in the UK?
            </div>
            <p className="text-sm text-slate-500 mt-1">
              7× your income — stretched, but not impossible. See your real options.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex-shrink-0 transition-colors">
            Get the answer
            <ArrowRight size={15} />
          </div>
        </button>
      </div>
    </main>
  );
}
