import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DocumentCard } from '../components/DocumentCard';
import { ALL_DOCUMENTS } from '../data/documents';
import { CATEGORY_LABELS, SUBJECT_LABELS, type DocCategory } from '../types/document';

const BATCH_SIZE = 6;

export function ResourcesPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'question-paper': true,
  });
  const [visibleBatches, setVisibleBatches] = useState(1);
  const [revealedHidden, setRevealedHidden] = useState(false);

  const byCategory = (cat: DocCategory) => ALL_DOCUMENTS.filter((d) => d.category === cat).slice(0, 12);

  const loadMorePool = ALL_DOCUMENTS.filter((d) => d.classLevel === 11 || d.classLevel === 12);
  const visibleLoadMore = loadMorePool.slice(0, visibleBatches * BATCH_SIZE);

  const hiddenLinks = ALL_DOCUMENTS.filter((d) => d.id.startsWith('legacy') || d.classLevel >= 12).slice(0, 8);

  function toggleSection(key: string) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'More Options' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Resources — More Options</h1>
      <p className="text-slate-600 mb-8">
        Accordions, progressive “load more”, and a reveal panel for crawler edge cases.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">By category (accordion)</h2>
        <div className="space-y-3">
          {(Object.keys(CATEGORY_LABELS) as DocCategory[]).map((cat) => {
            const open = openSections[cat] ?? false;
            const docs = byCategory(cat);
            return (
              <div key={cat} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSection(cat)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-slate-800 hover:bg-slate-50"
                  aria-expanded={open}
                >
                  {CATEGORY_LABELS[cat]}
                  <span className="text-sm text-slate-500 mr-2">{docs.length} shown</span>
                  {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {open && (
                  <div className="px-5 pb-5 grid gap-4 md:grid-cols-2 border-t border-slate-100 pt-4">
                    {docs.map((doc) => (
                      <DocumentCard key={doc.id} doc={doc} compact showMeta={false} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Class 11–12 — Load more</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleLoadMore.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} compact />
          ))}
        </div>
        {visibleBatches * BATCH_SIZE < loadMorePool.length && (
          <button
            type="button"
            onClick={() => setVisibleBatches((b) => b + 1)}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Load more documents ({loadMorePool.length - visibleLoadMore.length} remaining)
          </button>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Reveal hidden links</h2>
        {!revealedHidden ? (
          <button
            type="button"
            onClick={() => setRevealedHidden(true)}
            className="px-5 py-2.5 border-2 border-dashed border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50"
          >
            Click to reveal legacy &amp; external PDF links
          </button>
        ) : (
          <ul className="bg-white rounded-xl border p-4 space-y-2">
            {hiddenLinks.map((doc) => (
              <li key={doc.id} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-700">{doc.title}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{SUBJECT_LABELS[doc.subject]}</span>
                <a href={doc.url} className="text-indigo-600 hover:underline ml-auto">
                  Open PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Table index (alternate markup)</h2>
        <div className="overflow-x-auto bg-white rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {ALL_DOCUMENTS.slice(0, 15).map((doc) => (
                <tr key={doc.id} className="border-t border-slate-100">
                  <td className="px-4 py-2 text-slate-800">{doc.title}</td>
                  <td className="px-4 py-2">{doc.classLevel}</td>
                  <td className="px-4 py-2">
                    <a href={doc.url} className="text-indigo-600 hover:underline">
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
