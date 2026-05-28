import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-slate-600">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
            {item.to ? (
              <Link
                href={item.to}
                className="text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-sm px-0.5"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
