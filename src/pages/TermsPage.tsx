import { ArrowLeft, AlertTriangle, Calculator, UserCheck, ShieldOff } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

interface TermsPageProps {
  navigate: (path: string) => void;
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function TermsPage({ navigate }: TermsPageProps) {
  usePageTitle(
    'Terms of Use – UK Affordability Calculators',
    'Read the terms of use for UK Affordability Calculators. Our tools provide indicative estimates only and do not constitute financial advice.'
  );
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to home
      </button>

      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
          Legal
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          Terms & Disclaimer
        </h1>
        <p className="text-slate-500 text-sm">
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-slate-600 mt-4 leading-relaxed">
          Please read this page before using any calculator or tool on{' '}
          <strong className="text-slate-800">AffordabilityCalculators.co.uk</strong>. By using this
          site, you agree to the terms set out below.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Important:</strong> Nothing on this website constitutes financial, mortgage, legal,
            or tax advice. All results are estimates for informational purposes only.
          </p>
        </div>

        <Section icon={<Calculator size={16} className="text-amber-600" />} title="Estimates only">
          <p>
            The results produced by our calculators are <strong className="text-slate-800">estimates based on the figures you enter</strong>.
            They are designed to give you a general indication of affordability and are not a guarantee
            of what you can borrow, spend, or save.
          </p>
          <p>
            Results may not reflect your actual financial circumstances, lender criteria, current
            interest rates, or changes in legislation. Figures can vary significantly depending on
            your personal situation.
          </p>
        </Section>

        <Section icon={<UserCheck size={16} className="text-amber-600" />} title="Not financial advice">
          <p>
            This website is not regulated by the Financial Conduct Authority (FCA) and does not
            provide regulated financial advice.
          </p>
          <p>
            Before making any financial decision — including taking out a mortgage, loan, or rental
            agreement — you should <strong className="text-slate-800">consult a qualified financial adviser, mortgage broker,
            or other relevant professional</strong> who can assess your full personal circumstances.
          </p>
          <p>
            A professional adviser can account for factors our calculators cannot, such as your credit
            history, employment status, and current market conditions.
          </p>
        </Section>

        <Section icon={<ShieldOff size={16} className="text-amber-600" />} title="No liability">
          <p>
            AffordabilityCalculators.co.uk accepts <strong className="text-slate-800">no responsibility or liability</strong> for
            any financial loss, damage, or adverse outcome arising from decisions made based on the
            results of any calculator or content on this website.
          </p>
          <p>
            Use of this site is entirely at your own risk. We make no warranties, express or implied,
            regarding the accuracy, completeness, or suitability of the information provided.
          </p>
        </Section>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400 leading-relaxed">
        These terms may be updated periodically. Continued use of the site following any changes
        constitutes acceptance of the revised terms. For questions, contact us at{' '}
        <a
          href="mailto:hello@affordabilitycalculators.co.uk"
          className="text-slate-500 hover:text-slate-700 transition-colors"
        >
          hello@affordabilitycalculators.co.uk
        </a>.
      </div>
    </main>
  );
}
