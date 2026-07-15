import { ArrowRight } from 'lucide-react';

export interface RelatedLink {
  label: string;
  path: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  navigate: (path: string) => void;
  columns?: 1 | 2;
}

export function RelatedLinks({
  title = 'Related affordability questions',
  links,
  navigate,
  columns = 2,
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-100 pt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-1">{title}</h2>
      <p className="text-sm text-slate-500 mb-6">
        Explore more UK affordability scenarios tailored to different salaries and locations.
      </p>
      <div className={`grid grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : ''} gap-2`}>
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className="group flex items-center justify-between gap-3 text-left bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl px-4 py-3 transition-all"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors leading-snug">
              {link.label}
            </span>
            <ArrowRight
              size={14}
              className="flex-shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
