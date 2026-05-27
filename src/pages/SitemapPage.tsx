import { Link } from 'react-router-dom';
import { ALL_DOCUMENTS } from '../data/documents';
import { CLASS_LEVELS, SUBJECT_LABELS, type Subject } from '../types/document';

const SUBJECTS: Subject[] = ['physics', 'chemistry', 'biology', 'mathematics'];

export function SitemapPage() {
  const libraryPages = Math.ceil(ALL_DOCUMENTS.length / 12);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Sitemap</h1>
      <p className="text-slate-600 mb-8">Flat link list for crawler discovery.</p>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-3">Main pages</h2>
        <ul className="list-disc ml-6 space-y-1 text-indigo-600">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/classes">Classes</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-3">Library pagination</h2>
        <ul className="flex flex-wrap gap-2">
          {Array.from({ length: Math.min(libraryPages, 20) }, (_, i) => (
            <li key={i}>
              <Link to={`/library?page=${i + 1}`} className="text-indigo-600 hover:underline text-sm">
                Page {i + 1}
              </Link>
            </li>
          ))}
          {libraryPages > 20 && <li className="text-slate-500 text-sm">… +{libraryPages - 20} more</li>}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-3">Classes & subjects</h2>
        <ul className="space-y-2 text-sm">
          {CLASS_LEVELS.map((c) => (
            <li key={c}>
              <Link to={`/classes/${c}`} className="text-indigo-600 hover:underline font-medium">
                Class {c}
              </Link>
              <ul className="ml-4 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {SUBJECTS.map((s) => (
                  <li key={s}>
                    <Link to={`/classes/${c}/${s}`} className="text-slate-600 hover:text-indigo-600">
                      {SUBJECT_LABELS[s]}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-3">Sample document detail URLs</h2>
        <ul className="columns-2 md:columns-3 gap-4 text-xs space-y-1">
          {ALL_DOCUMENTS.slice(0, 60).map((doc) => (
            <li key={doc.id}>
              <Link to={`/document/${doc.id}`} className="text-indigo-600 hover:underline">
                {doc.id}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-slate-500">Showing 60 of {ALL_DOCUMENTS.length} detail routes.</p>
      </section>
    </div>
  );
}
