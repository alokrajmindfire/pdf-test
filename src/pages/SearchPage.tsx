import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DocumentCard } from '../components/DocumentCard';
import { FilterPanel, type FilterValues } from '../components/FilterPanel';
import { Pagination } from '../components/Pagination';
import { DOCUMENTS_PER_PAGE, filterDocuments, paginate } from '../data/documents';
import type { DocCategory, Subject } from '../types/document';

function sortDocs(
  docs: ReturnType<typeof filterDocuments>,
  sort: string,
): ReturnType<typeof filterDocuments> {
  const copy = [...docs];
  switch (sort) {
    case 'class-desc':
      return copy.sort((a, b) => b.classLevel - a.classLevel);
    case 'class-asc':
      return copy.sort((a, b) => a.classLevel - b.classLevel);
    case 'year-desc':
      return copy.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    default:
      return copy.sort((a, b) => a.title.localeCompare(b.title));
  }
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(
    () =>
      Boolean(searchParams.get('category')) ||
      Boolean(searchParams.get('year')) ||
      searchParams.get('advanced') === '1',
  );

  const values: FilterValues = {
    search: searchParams.get('q') ?? '',
    classLevel: searchParams.get('class') ?? '',
    subject: searchParams.get('subject') ?? '',
    category: searchParams.get('category') ?? '',
    year: searchParams.get('year') ?? '',
    sort: searchParams.get('sort') ?? 'title',
  };

  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  function updateFilter(key: keyof FilterValues, value: string) {
    const next = new URLSearchParams(searchParams);
    const map: Record<keyof FilterValues, string> = {
      search: 'q',
      classLevel: 'class',
      subject: 'subject',
      category: 'category',
      year: 'year',
      sort: 'sort',
    };
    const param = map[key];
    if (value) next.set(param, value);
    else next.delete(param);
    next.delete('page');
    if (showAdvanced) next.set('advanced', '1');
    setSearchParams(next);
  }

  const filtered = useMemo(() => {
    const list = filterDocuments({
      search: values.search || undefined,
      classLevel: values.classLevel ? Number(values.classLevel) : undefined,
      subject: (values.subject as Subject) || undefined,
      category: (values.category as DocCategory) || undefined,
      year: values.year ? Number(values.year) : undefined,
    });
    return sortDocs(list, values.sort);
  }, [values.search, values.classLevel, values.subject, values.category, values.year, values.sort]);

  const { items, totalPages } = paginate(filtered, page, DOCUMENTS_PER_PAGE);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Advanced Search' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Advanced Search</h1>
      <p className="text-slate-600 mb-6">
        Filters sync to the URL. Use <strong>more options</strong> for category and year.
      </p>

      <FilterPanel
        values={values}
        onChange={updateFilter}
        showAdvanced={showAdvanced}
        onToggleAdvanced={() => setShowAdvanced((v) => !v)}
      />

      <p className="mt-6 text-sm text-slate-600 mb-4">
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/search"
        preserveParams={['q', 'class', 'subject', 'category', 'year', 'sort', 'advanced']}
      />
    </div>
  );
}
