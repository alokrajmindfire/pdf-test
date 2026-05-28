'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FilterPanel, type FilterValues } from '../components/FilterPanel';
import { MaterialCard } from '../components/MaterialCard';
import { Pagination } from '../components/Pagination';
import { useLanguage } from '../context/LanguageContext';
import { DOCUMENTS_PER_PAGE, filterMaterials, paginate } from '../data/documents';
import type { MaterialType, Subject } from '../types/document';

function sortMaterials(
  docs: ReturnType<typeof filterMaterials>,
  sort: string,
): ReturnType<typeof filterMaterials> {
  const copy = [...docs];
  switch (sort) {
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'class-desc':
      return copy.sort((a, b) => b.classLevel - a.classLevel || a.chapterNumber - b.chapterNumber);
    default:
      return copy.sort(
        (a, b) =>
          a.classLevel - b.classLevel ||
          a.subject.localeCompare(b.subject) ||
          a.chapterNumber - b.chapterNumber,
      );
  }
}

export function SearchPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() ?? '/search';
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(() => Boolean(searchParams.get('type')));

  const values: FilterValues = {
    search: searchParams.get('q') ?? '',
    classLevel: searchParams.get('class') ?? '',
    subject: searchParams.get('subject') ?? '',
    materialType: searchParams.get('type') ?? '',
    sort: searchParams.get('sort') ?? 'chapter',
  };

  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  function updateFilter(key: keyof FilterValues, value: string) {
    const next = new URLSearchParams(searchParams);
    const map: Record<keyof FilterValues, string> = {
      search: 'q',
      classLevel: 'class',
      subject: 'subject',
      materialType: 'type',
      sort: 'sort',
    };
    const param = map[key];
    if (value) next.set(param, value);
    else next.delete(param);
    next.delete('page');
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  const filtered = useMemo(() => {
    const list = filterMaterials({
      language,
      search: values.search || undefined,
      classLevel: values.classLevel ? Number(values.classLevel) : undefined,
      subject: (values.subject as Subject) || undefined,
      materialType: (values.materialType as MaterialType) || undefined,
    });
    return sortMaterials(list, values.sort);
  }, [language, values.search, values.classLevel, values.subject, values.materialType, values.sort]);

  const { items, totalPages } = paginate(filtered, page, DOCUMENTS_PER_PAGE);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Search</h1>
      <p className="text-slate-600 mb-6">Find chapters and exercise sets by class, subject, or topic name.</p>

      <FilterPanel
        values={values}
        onChange={updateFilter}
        showAdvanced={showAdvanced}
        onToggleAdvanced={() => setShowAdvanced((v) => !v)}
      />

      <p className="mt-6 text-sm text-slate-600 mb-4">
        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <MaterialCard key={m.id} material={m} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/search"
        preserveParams={['q', 'class', 'subject', 'type', 'sort']}
      />
    </div>
  );
}

