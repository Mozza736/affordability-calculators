import { ArrowLeft, Shield, Database, Mail, FileText, UserCheck, Lock } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

interface PrivacyPolicyPageProps {
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
        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export function PrivacyPolicyPage({ navigate }: PrivacyPolicyPageProps) {
  usePageTitle(
    'Privacy Policy – UK Affordability Calculators',
    'Read our privacy policy. UK Affordability Calculators does not store or sell your data. All calculations are processed locally in your browser.',
    '/privacy-policy'
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
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
          Legal
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-500 text-sm">
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-slate-600 mt-4 leading-relaxed">
          This Privacy Policy explains how <strong className="text-slate-800">AffordabilityCalculators.co.uk</strong> collects,
          uses, and protects your personal information when you use our website and tools.
          We keep things simple and clear — because you deserve to know exactly where your data goes.
        </p>
      </div>

      <div className="space-y-4">
        <Section icon={<Database size={16} className="text-blue-600" />} title="What data we collect">
          <p>When you use our calculators or contact us, we may collect the following information:</p>
          <ul className="space-y-2 mt-2">
            {[
              { label: 'Name', desc: 'So we can address you personally if you get in touch.' },
              { label: 'Email address', desc: 'To respond to your enquiries or send relevant financial information, where you have opted in.' },
              { label: 'Annual salary', desc: 'Used as an input for your affordability calculation.' },
              { label: 'Financial inputs', desc: 'This includes monthly expenses, existing debts, deposit amount, and similar figures you enter into the calculator. These are used solely to generate your result.' },
            ].map(({ label, desc }) => (
              <li key={label} className="flex gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                <span>
                  <strong className="text-slate-800">{label}:</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-slate-500 text-xs mt-3">
            We only collect information that is necessary to provide the service. You are never required to enter real personal details to use the calculator.
          </p>
        </Section>

        <Section icon={<FileText size={16} className="text-blue-600" />} title="How we use your data">
          <p>The information you provide is used for the following purposes only:</p>
          <ul className="space-y-2 mt-2">
            {[
              'To run your affordability calculation and display your personalised result.',
              'To improve the accuracy and usefulness of our tools over time.',
              'To send you relevant financial guidance or updates — only if you have specifically opted in to receive these.',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            We will never use your data for purposes other than those listed above without first asking your permission.
          </p>
        </Section>

        <Section icon={<Lock size={16} className="text-blue-600" />} title="Data protection">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-800 font-medium leading-relaxed">
              We do not sell your personal data. Your information is handled securely and in accordance with UK data protection laws.
            </p>
          </div>
          <p className="mt-3">
            We comply with the <strong className="text-slate-800">UK General Data Protection Regulation (UK GDPR)</strong> and
            the <strong className="text-slate-800">Data Protection Act 2018</strong>. This means you have the right to:
          </p>
          <ul className="space-y-2 mt-2">
            {[
              'Access the personal data we hold about you.',
              'Request that we correct inaccurate data.',
              'Ask us to delete your data at any time.',
              'Withdraw your consent to receive communications.',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Shield size={16} className="text-blue-600" />} title="Cookies and analytics">
          <p>
            Our website may use cookies to understand how visitors use the site, so we can improve the experience.
            These are anonymous analytics cookies and do not identify you personally.
          </p>
          <p>
            You can disable cookies at any time through your browser settings. This will not affect your ability to use our calculators.
          </p>
        </Section>

        <Section icon={<UserCheck size={16} className="text-blue-600" />} title="Third parties">
          <p>
            We do not share your personal data with third parties for marketing purposes. We may use trusted third-party
            services to help run the site (such as hosting and analytics providers), and these partners are bound by
            strict data processing agreements.
          </p>
        </Section>

        <Section icon={<Mail size={16} className="text-blue-600" />} title="Contact us about your data">
          <p>
            If you have any questions about how we handle your data, would like to access the information we hold about you,
            or wish to request its deletion, please get in touch:
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-slate-700 font-medium">AffordabilityCalculators.co.uk</p>
            <p className="mt-1">
              Email:{' '}
              <a
                href="mailto:privacy@affordabilitycalculators.co.uk"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                privacy@affordabilitycalculators.co.uk
              </a>
            </p>
            <p className="text-slate-500 text-xs mt-2">
              We aim to respond to all data enquiries within 5 working days.
            </p>
          </div>
        </Section>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400 leading-relaxed">
        This policy may be updated from time to time. Any significant changes will be reflected in the
        "Last updated" date above. Continued use of the site after changes are posted constitutes your
        acceptance of the updated policy.
      </div>
    </main>
  );
}
