import { ArrowLeft, PiggyBank } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { SavingsRunoutCalculator } from '../components/SavingsRunoutCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';

interface SavingsRunoutPageProps {
  navigate: (path: string) => void;
}

export function SavingsRunoutPage({ navigate }: SavingsRunoutPageProps) {
  usePageTitle(
    'How Long Will My Savings Last? – UK Calculator (2026)',
    'Use our free UK savings runout calculator to find out how long your savings will last in 2026. Enter your balance, monthly spending, and interest rate for an instant result.',
    '/how-long-will-my-savings-last'
  );
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <AdBanner position="top" className="mb-8" />

      <button
        onClick={() => navigate('/calculators')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to calculators
      </button>

      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
          <PiggyBank size={13} />
          Savings Calculator
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          How long will my savings last?
        </h1>

        <p className="text-slate-500 text-base leading-relaxed">
          Enter your total savings, what you spend each month, and any income you receive. The calculator works out exactly how long your money will last — and flags whether you are in a safe, cautious, or critical position.
        </p>
      </div>

      <SavingsRunoutCalculator />

      <AdBanner position="mid" className="my-10" />

      <CTASection />

      <RelatedLinks
        navigate={navigate}
        links={[
          { label: 'Can I afford a £200k house on a £30k salary?', path: '/can-i-afford-200k-house-on-30k-salary-uk' },
          { label: 'Can I afford a £300k house on a £45k salary?', path: '/can-i-afford-300k-house-on-45k-salary-uk' },
          { label: 'Can I afford a £400k house on a £60k salary?', path: '/can-i-afford-400k-house-on-60k-salary-uk' },
          { label: 'Can I afford a house in London on a £50k salary?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'Can I afford a house in Manchester on a £40k salary?', path: '/can-i-afford-a-house-in-manchester-on-40k' },
        ]}
      />
    </main>
  );
}
