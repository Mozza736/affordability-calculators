import { ShieldCheck, Calculator, TrendingUp, Users } from 'lucide-react';
import { RelatedLinks } from '../components/RelatedLinks';
import { usePageTitle } from '../hooks/usePageTitle';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export function AboutPage({ navigate }: AboutPageProps) {
  usePageTitle(
    'About Us – UK Affordability Calculators | Free Tools (2026)',
    'Learn about UK Affordability Calculators — free, no-nonsense tools built to give honest answers about house, rent, and car affordability based on UK lending standards.',
    '/about'
  );
  const values = [
    {
      icon: Calculator,
      title: 'Tool-first approach',
      description: 'Every page is built around a functional calculator. No fluff, no filler — just tools that help you make better financial decisions.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy by design',
      description: 'All calculations happen in your browser. We never store or transmit your financial data. No account required.',
    },
    {
      icon: TrendingUp,
      title: 'UK-specific logic',
      description: 'Our calculations use UK-standard lending multiples, ONS housing data, and FCA-recognised affordability rules.',
    },
    {
      icon: Users,
      title: 'Built for real people',
      description: 'Designed for first-time buyers, renters, and anyone trying to understand their financial headroom without jargon.',
    },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-14">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">About Affordability Calculators</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          We built AffordabilityCalculators.co.uk because most financial planning tools are either too complex, too vague, or hidden behind paywalls. We wanted something simple, honest, and fast.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
        {values.map((v) => (
          <div key={v.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
              <v.icon size={20} />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10">
        <h2 className="font-semibold text-amber-900 mb-2">Important disclaimer</h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          The calculators on this site are for guidance and educational purposes only. They do not constitute financial advice. Results are based on simplified formulas and general UK lending guidelines. Always consult a qualified independent financial adviser or mortgage broker before making any financial commitments.
        </p>
      </div>

      <div className="text-sm text-slate-400 mb-2">
        <p>AffordabilityCalculators.co.uk is not a regulated financial services provider.</p>
      </div>

      <RelatedLinks
        navigate={navigate}
        columns={1}
        links={[
          { label: 'Can I afford a £300k house on a £45k salary?', path: '/can-i-afford-300k-house-on-45k-salary-uk' },
          { label: 'Can I afford a house in London on a £50k salary?', path: '/can-i-afford-a-house-in-london-on-50k' },
          { label: 'Can I afford a house in Manchester on a £40k salary?', path: '/can-i-afford-a-house-in-manchester-on-40k' },
          { label: 'How long will my savings last?', path: '/how-long-will-my-savings-last' },
        ]}
      />
    </main>
  );
}
