import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ALL_DOCUMENTS } from '../data/documents';
import { CATEGORY_LABELS, SUBJECT_LABELS, type DocCategory, type Subject } from '../types/document';

export function ArchivePage() {
  const years = [...new Set(ALL_DOCUMENTS.map((d) => d.year).filter(Boolean))].sort(
    (a, b) => (b ?? 0) - (a ?? 0),
  ) as number[];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Archive' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Document Archive</h1>
      <p className="text-slate-600 mb-8">Nested index by year → category → subject (link farm for crawlers).</p>

      {years.map((year) => (
        <section key={year} className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b pb-2">{year}</h2>
          {(Object.keys(CATEGORY_LABELS) as DocCategory[]).map((cat) => {
            const subset = ALL_DOCUMENTS.filter((d) => d.year === year && d.category === cat).slice(0, 3);
            if (subset.length === 0) return null;
            return (
              <div key={cat} className="ml-4 mb-4">
                <h3 className="font-medium text-slate-700 mb-2">{CATEGORY_LABELS[cat]}</h3>
                <ul className="ml-4 space-y-1 text-sm">
                  {subset.map((doc) => (
                    <li key={doc.id}>
                      <Link to={`/document/${doc.id}`} className="text-indigo-600 hover:underline">
                        Class {doc.classLevel} {SUBJECT_LABELS[doc.subject as Subject]} — {doc.chapter ?? doc.title}
                      </Link>
                      {' · '}
                      <a href={doc.url} className="text-slate-500 hover:text-indigo-600">
                        [pdf]
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      to={`/search?year=${year}&category=${cat}`}
                      className="text-slate-500 hover:text-indigo-600"
                    >
                      View all for {year} / {CATEGORY_LABELS[cat]} →
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
