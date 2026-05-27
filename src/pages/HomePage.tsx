import { ArrowRight, GraduationCap, Library, Search, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DocumentCard } from '../components/DocumentCard';
import { ALL_DOCUMENTS } from '../data/documents';
import { CLASS_LEVELS } from '../types/document';

const featured = ALL_DOCUMENTS.filter((d) => d.classLevel >= 9 && d.classLevel <= 10).slice(0, 6);

const sections = [
  {
    to: '/classes',
    title: 'Browse by Class',
    desc: 'Classes 6–12 with Physics, Chemistry, Biology & Math PDFs',
    icon: GraduationCap,
    color: 'bg-violet-100 text-violet-700',
  },
  {
    to: '/library',
    title: 'Full Library',
    desc: `${ALL_DOCUMENTS.length}+ documents with URL pagination (?page=)`,
    icon: Library,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    to: '/search',
    title: 'Advanced Search',
    desc: 'Filters, sort, and expandable “more options”',
    icon: Search,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    to: '/resources',
    title: 'More Options Hub',
    desc: 'Accordions, load-more, and hidden link batches',
    icon: Settings2,
    color: 'bg-amber-100 text-amber-800',
  },
];

export function HomePage() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Science Student PDF Library</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Crawler test site with class-wise NCERT science PDFs — each document has a unique{' '}
          <code>/pdf/…</code> link (161 real chapters downloaded from ncert.nic.in).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {sections.map(({ to, title, desc, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-2.5 rounded-lg mb-3 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="font-semibold text-slate-800 group-hover:text-indigo-700 flex items-center gap-1">
              {title}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <p className="text-sm text-slate-600 mt-1">{desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick class links</h2>
      <div className="flex flex-wrap gap-2 mb-10">
        {CLASS_LEVELS.map((c) => (
          <Link
            key={c}
            to={`/classes/${c}`}
            className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
          >
            Class {c}
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-4">Featured (Class 9–10)</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
