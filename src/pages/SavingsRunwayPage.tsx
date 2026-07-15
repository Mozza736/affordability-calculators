import { ArrowLeft, PiggyBank } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { SavingsRunoutCalculator } from '../components/SavingsRunoutCalculator';
import { AdBanner } from '../components/AdBanner';
import { CTASection } from '../components/CTASection';
import { RelatedLinks } from '../components/RelatedLinks';

interface SavingsRunwayPageProps {
  navigate: (path: string) => void;
}

export function SavingsRunwayPage({ navigate }: SavingsRunwayPageProps) {
  usePageTitle(
    'Savings Runway Calculator UK (2026) – How Long Will My Money Last?',
    'Find out exactly how long your savings will last in the UK in 2026. Free calculator based on your balance, monthly spending, and any income you receive.'
  );

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
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          <PiggyBank size={13} />
          Savings Runway Calculator
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          How long will my savings last?
        </h1>

        <p className="text-slate-500 text-base leading-relaxed">
          This calculator helps you understand how long your savings will cover your expenses — useful if you are between jobs, taking a career break, or planning a major life change. Enter your total savings, monthly spending, and any income you receive for an instant result.
        </p>
      </div>

      <SavingsRunoutCalculator />

      <AdBanner position="mid" className="my-10" />

      <CTASection />

      <RelatedLinks
        navigate={navigate}
        title="Also check"
        links={[
          { label: 'House Affordability Calculator', path: '/house-affordability' },
          { label: 'Rent Affordability Calculator', path: '/rent-affordability' },
          { label: 'Car Budget Calculator', path: '/car-affordability' },
          { label: 'Can I afford a £350k house on a £50k salary?', path: '/can-i-afford-350k-house-on-50k-salary-uk' },
        ]}
        columns={1}
      />
    </main>
  );
}
