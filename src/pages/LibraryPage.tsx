import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DocumentCard } from '../components/DocumentCard';
import { Pagination } from '../components/Pagination';
import {
  ALL_DOCUMENTS,
  DOCUMENTS_PER_PAGE,
  filterDocuments,
  paginate,
} from '../data/documents';
import type { DocCategory, Subject } from '../types/document';

export function LibraryPage() {
  const [searchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const classParam = searchParams.get('class');
  const subjectParam = searchParams.get('subject') as Subject | null;
  const categoryParam = searchParams.get('category') as DocCategory | null;

  const filtered = useMemo(() => {
    return filterDocuments({
      classLevel: classParam ? Number(classParam) : undefined,
      subject: subjectParam || undefined,
      category: categoryParam || undefined,
    });
  }, [classParam, subjectParam, categoryParam]);

  const { items, totalPages } = paginate(filtered, page, DOCUMENTS_PER_PAGE);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Library (Paginated)' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Document Library</h1>
      <p className="text-slate-600 mb-2">
        Showing page {page} of {totalPages} — {filtered.length} total documents,{' '}
        {DOCUMENTS_PER_PAGE} per page.
      </p>
      <p className="text-xs text-slate-500 mb-6">
        URL pattern: <code className="bg-slate-100 px-1 rounded">/library?page=2&amp;class=10</code>
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-4">
        {items.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/library"
        preserveParams={['class', 'subject', 'category']}
      />

      <aside className="mt-10 p-4 bg-slate-100 rounded-lg text-sm text-slate-600">
        <strong>Crawler note:</strong> {ALL_DOCUMENTS.length} entries, each with a unique PDF URL{' '}
        <code>/pdf/&lt;document-id&gt;.pdf</code> (NCERT sources in <code>src/assets/science</code>).
        Pagination uses <code>page</code> with rel prev/next.
      </aside>
    </div>
  );
}
