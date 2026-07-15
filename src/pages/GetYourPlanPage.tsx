import { useState } from 'react';
import { ArrowLeft, CheckCircle, ShieldCheck, Lock, Zap, AlertCircle, ArrowRight } from 'lucide-react';
import { submitLead } from '../lib/supabase';
import { usePageTitle } from '../hooks/usePageTitle';

interface GetYourPlanPageProps {
  navigate: (path: string) => void;
}

interface FormState {
  firstName: string;
  email: string;
  annualSalary: string;
  monthlyExpenses: string;
  consentContact: boolean;
}

const trustPoints = [
  { icon: ShieldCheck, text: 'Your data is encrypted and never sold' },
  { icon: Lock, text: 'No credit check required' },
  { icon: Zap, text: 'Takes less than 60 seconds' },
];

export function GetYourPlanPage({ navigate }: GetYourPlanPageProps) {
  usePageTitle(
    'Get Your Free Affordability Plan – UK Calculator (2026)',
    'Get a free personalised UK affordability plan in 2026. Tell us your salary and expenses and we\'ll show you exactly what you can realistically afford to buy.',
    '/get-your-plan'
  );
  const [form, setForm] = useState<FormState>({
    firstName: '',
    email: '',
    annualSalary: '',
    monthlyExpenses: '',
    consentContact: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const salary = parseFloat(form.annualSalary.replace(/[^0-9.]/g, ''));
    if (!form.firstName.trim()) { setError('Please enter your first name.'); return; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isNaN(salary) || salary < 1000) {
      setError('Please enter a valid annual salary.');
      return;
    }
    if (!form.consentContact) {
      setError('Please tick the consent checkbox to continue.');
      return;
    }

    setSubmitting(true);
    const expenses = parseFloat(form.monthlyExpenses.replace(/[^0-9.]/g, '')) || 0;

    const { error: submitError } = await submitLead({
      first_name: form.firstName.trim(),
      email: form.email.trim().toLowerCase(),
      annual_salary: salary,
      monthly_expenses: expenses || undefined,
    });

    setSubmitting(false);

    if (submitError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 sm:p-14">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Thanks, {form.firstName} — your plan is being prepared
          </h1>
          <p className="text-slate-500 leading-relaxed mb-8 max-w-md mx-auto">
            We have received your details. Check your inbox shortly for your personalised affordability plan and tailored options based on your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Back to calculator
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/mortgage-options')}
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-semibold text-sm px-6 py-3 rounded-xl transition-all"
            >
              Compare mortgage options
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to calculator
      </button>

      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
          Free &amp; no sign-up required
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-3">
          Get your personalised affordability plan
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Enter a few details and we'll show you what you can realistically afford — plus tailored options based on your situation.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {trustPoints.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-slate-500">
            <Icon size={15} className="text-primary-500 flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
                First name <span className="text-red-400">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                placeholder="e.g. Sarah"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. sarah@email.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="annualSalary" className="block text-sm font-medium text-slate-700 mb-1.5">
              Annual salary (£) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">£</span>
              <input
                id="annualSalary"
                name="annualSalary"
                type="text"
                inputMode="numeric"
                value={form.annualSalary}
                onChange={handleChange}
                placeholder="e.g. 45000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">Your gross (pre-tax) annual income</p>
          </div>

          <div>
            <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-slate-700 mb-1.5">
              Monthly expenses (£)
              <span className="text-slate-400 font-normal ml-1.5">optional</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">£</span>
              <input
                id="monthlyExpenses"
                name="monthlyExpenses"
                type="text"
                inputMode="numeric"
                value={form.monthlyExpenses}
                onChange={handleChange}
                placeholder="e.g. 800"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">Bills, food, travel, subscriptions, etc.</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              id="consentContact"
              name="consentContact"
              type="checkbox"
              checked={form.consentContact}
              onChange={handleChange}
              className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
            <span className="text-sm text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
              I agree to be contacted with my personalised affordability results and relevant financial services that may help with my enquiry.{' '}
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
                Preparing your plan...
              </>
            ) : (
              <>
                Get my personalised plan
                <ArrowRight size={15} />
              </>
            )}
          </button>

          <div className="space-y-2 pt-1">
            <p className="text-xs text-slate-500 leading-relaxed">
              Your information may be shared with trusted UK-based partners (such as mortgage advisors) to help you with your enquiry. You can opt out at any time.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <ShieldCheck size={11} className="inline mr-1 text-slate-400" />
              By submitting you confirm you have read and agree to our{' '}
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
      </div>

      <div className="mt-6 bg-slate-50 rounded-2xl border border-slate-100 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-3">What you'll get</h2>
        <ul className="space-y-2.5">
          {[
            'A breakdown of your maximum house price, rent budget, and car budget',
            'Tailored mortgage options based on your salary and situation',
            'Tips to improve your affordability position',
            'Guidance on next steps with no obligation',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
