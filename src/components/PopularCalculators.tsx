import { Home, PoundSterling, Car, TrendingUp, ArrowRight } from 'lucide-react';

interface PopularCalculatorsProps {
  navigate: (path: string) => void;
}

const calculators = [
  {
    icon: Home,
    title: 'House Affordability',
    description: 'Find out the maximum house price you can afford based on your salary, deposit, and monthly outgoings.',
    color: 'bg-primary-50 text-primary-600',
    badge: 'Most popular',
    badgeColor: 'bg-primary-100 text-primary-700',
    path: '/house-affordability',
  },
  {
    icon: PoundSterling,
    title: 'Rent Affordability',
    description: 'Calculate the maximum monthly rent that keeps your finances in balance using the 30% income rule.',
    color: 'bg-emerald-50 text-emerald-600',
    badge: null,
    badgeColor: '',
    path: '/rent-affordability',
  },
  {
    icon: Car,
    title: 'Car Budget',
    description: 'Discover how much you should spend on a car per month based on your salary and financial commitments.',
    color: 'bg-amber-50 text-amber-600',
    badge: null,
    badgeColor: '',
    path: '/car-affordability',
  },
  {
    icon: TrendingUp,
    title: 'Savings Runway',
    description: 'See exactly how long your savings will last based on your monthly spending and any income you receive.',
    color: 'bg-slate-100 text-slate-600',
    badge: null,
    badgeColor: '',
    path: '/savings-runway',
  },
];

export function PopularCalculators({ navigate }: PopularCalculatorsProps) {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Popular calculators</h2>
        <p className="text-slate-500">Each calculator focuses on one decision. Choose the one that fits what you are planning.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {calculators.map((calc) => (
          <button
            key={calc.title}
            onClick={() => navigate(calc.path)}
            className="group text-left bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:border-primary-100 transition-all duration-200 p-6"
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${calc.color}`}>
                <calc.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-slate-900">{calc.title}</h3>
                  {calc.badge && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${calc.badgeColor}`}>
                      {calc.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
              </div>
              <ArrowRight
                size={16}
                className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
