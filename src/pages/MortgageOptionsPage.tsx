import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, ShieldCheck, AlertCircle, ExternalLink, Home, TrendingUp, Users } from 'lucide-react';
import { submitLead } from '../lib/supabase';
import { usePageTitle } from '../hooks/usePageTitle';

interface MortgageOptionsPageProps {
  navigate: (path: string) => void;
}

const providers = [
  {
    name: 'Habito',
    description: 'Free online mortgage broker. Searches the whole market including deals not on comparison sites.',
    tag: 'Fee-free broker',
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    href: 'https://www.habito.com/',
    icon: Users,
  },
  {
    name: 'MoneySuperMarket',
    description: 'Compare mortgage rates from major UK lenders side-by-side. Good starting point to see what rates are available.',
    tag: 'Comparison site',
    tagColor: 'text-blue-700 bg-blue-50 border-blue-100',
    href: 'https://www.moneysupermarket.com/mortgages/',
    icon: TrendingUp,
  },
  {
    name: 'L&C Mortgages',
    description: 'One of the UK\'s largest fee-free mortgage brokers. Specialist advice for first-time buyers and remortgages.',
    tag: 'Fee-free broker',
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    href: 'https://www.landc.co.uk/',
    icon: Home,
  },
];

const steps = [
  'Check your credit report (free via Experian or Checkmyfile)',
  'Get a mortgage in principle — most lenders offer this in minutes',
  'Speak to a fee-free broker to find the best deal for your situation',
  'Use your affordability numbers from this calculator to guide your search',
];

export function MortgageOptionsPage({ navigate }: MortgageOptionsPageProps) {
  usePageTitle(
    'Your Next Steps – Mortgage Options | UK Affordability',
    'See your next steps for getting a mortgage in the UK. Compare providers and get matched with the right deal based on your affordability.'
  );

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('Please tick the consent checkbox to continue.');
      return;
    }

    setSubmitting(true);
    const { error: submitError } = await submitLead({
      first_name: '',
      email: email.trim().toLowerCase(),
      annual_salary: 0,
      source_url: '/mortgage-options',
    });
    setSubmitting(false);

    if (submitError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to calculator
      </button>

      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          Next steps
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
          Here are the next steps based on your affordability
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Use your affordability estimate to take action. Below you'll find useful places to compare mortgage options, plus a simple guide on where to start.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">How to get started</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Email capture */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8 mb-8">
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">You're all set</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We've noted your details. Scroll down to explore mortgage providers below.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              Get a summary sent to your inbox
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              Enter your email and we'll send you a plain-English summary of your options and suggested next steps.
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="mo-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  id="mo-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                  placeholder="e.g. sarah@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => { setConsent(e.target.checked); if (error) setError(null); }}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                  I agree to be contacted with relevant mortgage options and financial services that may help with my enquiry.{' '}
                  <span className="text-red-400">*</span>
                </span>
              </label>

              {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-sm"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send my options
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <div className="space-y-1.5 pt-0.5">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your information may be shared with trusted UK-based partners (such as mortgage advisors) to help you with your enquiry. You can opt out at any time.
                </p>
                <p className="text-xs text-slate-400">
                  <ShieldCheck size={11} className="inline mr-1 text-slate-400" />
                  By submitting you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/privacy-policy')}
                    className="underline underline-offset-2 hover:text-slate-600 transition-colors"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Provider cards */}
      <h2 className="text-base font-semibold text-slate-900 mb-4">Useful places to compare mortgage options</h2>
      <div className="space-y-3 mb-8">
        {providers.map(({ name, description, tag, tagColor, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-md p-5 transition-all group"
          >
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
              <Icon size={18} className="text-slate-500 group-hover:text-primary-600 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-semibold text-slate-900">{name}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tagColor}`}>{tag}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
            </div>
            <ExternalLink size={14} className="flex-shrink-0 text-slate-300 group-hover:text-primary-400 mt-1 transition-colors" />
          </a>
        ))}
      </div>

      <p className="text-xs text-slate-400 leading-relaxed text-center">
        Links above are to third-party sites. We may receive a referral fee if you use one of these services. This does not affect our affordability calculations. Not financial advice.
      </p>
    </main>
  );
}
