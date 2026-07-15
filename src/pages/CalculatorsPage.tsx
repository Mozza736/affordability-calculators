import { Home, PoundSterling, Car, PiggyBank, ArrowRight } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { MainCalculator } from '../components/MainCalculator';
import { CTASection } from '../components/CTASection';
import { AdBanner } from '../components/AdBanner';
import { RelatedLinks } from '../components/RelatedLinks';

interface CalculatorsPageProps {
  navigate: (path: string) => void;
}

export function CalculatorsPage({ navigate }: CalculatorsPageProps) {
  usePageTitle(
    'Free UK Affordability Calculators – House, Rent & More (2026)',
    'Browse all free UK affordability calculators for 2026. Check house, rent, car, and savings affordability — instant results based on your real salary and expenses.'
  );
  const categories = [
    { icon: Home, label: 'House Affordability', color: 'text-primary-600 bg-primary-50' },
    { icon: PoundSterling, label: 'Rent Calculator', color: 'text-emerald-600 bg-emerald-50' },
    { icon: Car, label: 'Car Budget', color: 'text-amber-600 bg-amber-50' },
    { icon: PiggyBank, label: 'Savings Runway', color: 'text-teal-600 bg-teal-50' },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <AdBanner position="top" className="mb-8" />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">All Calculators</h1>
        <p className="text-slate-500 max-w-xl">
          Use our suite of free UK affordability calculators to plan your finances with confidence.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-700"
          >
            <cat.icon size={14} className={cat.color.split(' ')[0]} />
            {cat.label}
          </div>
        ))}
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
            <Home size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Full Affordability Calculator</h2>
            <p className="text-sm text-slate-500">House, rent, and car — all in one place</p>
          </div>
        </div>
        <MainCalculator />
      </div>

      <AdBanner position="mid" className="mb-12" />

      <div className="mb-12">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
              <PiggyBank size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Savings Runway Calculator</h2>
              <p className="text-sm text-slate-500">How long will your savings last?</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/how-long-will-my-savings-last')}
            className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Open full page
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-6">
          <p className="text-sm text-teal-800 leading-relaxed">
            Enter your savings balance, monthly spending, and any income you receive to see exactly how long your money will last — with a safe / warning / danger indicator.
          </p>
        </div>
        <button
          onClick={() => navigate('/how-long-will-my-savings-last')}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
        >
          <PiggyBank size={16} />
          Try the savings runway calculator
          <ArrowRight size={15} />
        </button>
      </div>

      <CTASection />

      <RelatedLinks
        navigate={navigate}
        links={[
          { label: 'Can I afford a £200k house on a £30k salary?', path: '/can-i-afford-200k-house-on-30k-salary-uk' },
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
          { label: 'Can I afford a house in London on a £50k salary?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'Can I afford a house in Leeds on a £35k salary?', path: '/can-i-afford-a-house-in-leeds-on-35k' },
          { label: 'Can I afford a house in Glasgow on a £30k salary?', path: '/can-i-afford-a-house-in-glasgow-on-30k' },
        ]}
      />
    </main>
  );
}
