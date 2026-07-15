import { TrendingUp } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <TrendingUp size={15} className="text-white" />
              </div>
              <span className="text-white font-semibold text-sm">AffordabilityCalculators</span>
            </button>
            <p className="text-sm leading-relaxed text-slate-500">
              Free UK affordability calculators to help you make confident financial decisions.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/calculators')} className="hover:text-white transition-colors">
                  House Affordability
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/calculators')} className="hover:text-white transition-colors">
                  Rent Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/calculators')} className="hover:text-white transition-colors">
                  Car Budget Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/calculators')} className="hover:text-white transition-colors">
                  Savings Growth
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms & Disclaimer</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} AffordabilityCalculators.co.uk. All rights reserved.</p>
          <p className="text-center">
            These calculators are for guidance only and do not constitute financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
