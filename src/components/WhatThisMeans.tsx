import { Info, CheckCircle, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';

export function WhatThisMeans() {
  const points = [
    {
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      title: 'House affordability is about more than salary',
      body: 'Lenders look at your full financial picture — income, debts, expenses, and deposit size. The 4.5× figure is a starting point. Your actual offer will depend on what you spend each month and what you have saved. This is comfortable for most buyers with modest outgoings.',
    },
    {
      icon: TrendingUp,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      title: 'The 30% rent rule keeps you financially healthy',
      body: 'Keeping rent below 30% of gross income leaves room for savings, emergencies, and life. Going above 35% can start to feel like a stretch — especially once you factor in bills, commuting, and the occasional unexpected cost.',
    },
    {
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      title: 'The 10% safety buffer is there for a reason',
      body: 'We deduct 10% from your disposable income before showing your result. This accounts for the costs most budgets forget — car repairs, a higher-than-expected bill, or simply a month where things don\'t go to plan. Anything above this buffer may start to feel like a stretch.',
    },
    {
      icon: MapPin,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      title: 'Location changes everything',
      body: 'Outside London and the South East, the same budget goes noticeably further. A £300k home in Manchester or Leeds buys significantly more space than in Greater London. Higher living costs in London typically reduce effective affordability by 15–25% compared to the national average.',
    },
    {
      icon: Info,
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      title: 'These are estimates, not financial advice',
      body: 'Use these numbers as a starting point for your thinking — not a final answer. Individual circumstances vary widely. Before making any major financial decision, speak to a qualified mortgage broker or independent financial adviser.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 rounded-3xl px-6 sm:px-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">What this means in practice</h2>
        <p className="text-slate-500 mb-10">Plain-English explanations of how these numbers work — and what they don't tell you.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {points.map((point, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border border-slate-100 shadow-card p-5 ${i === points.length - 1 && points.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl ${point.bg} flex items-center justify-center mb-4`}>
                <point.icon size={18} className={point.color} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{point.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
