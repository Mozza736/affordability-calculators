import { ArrowRight, Star } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 rounded-3xl p-8 sm:p-12 text-center">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
          ))}
          <span className="text-slate-400 text-sm ml-2">Trusted by thousands of UK home buyers</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to take the next step?
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          Use your affordability numbers to compare real mortgage deals or get personalised advice from a fee-free broker.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/mortgage-options"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/mortgage-options'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0 }); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-primary-900/30"
          >
            Compare mortgage options
            <ArrowRight size={16} />
          </a>
          <a
            href="/get-your-plan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors border border-white/10"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/get-your-plan'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0 }); }}
          >
            Get a personalised plan
            <ArrowRight size={16} />
          </a>
        </div>

        <p className="text-slate-600 text-xs mt-6">
          No sign-up required. Free to use. Not financial advice.
        </p>
      </div>
    </section>
  );
}
