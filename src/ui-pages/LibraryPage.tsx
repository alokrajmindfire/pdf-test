'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MaterialCard } from '../components/MaterialCard';
import { Pagination } from '../components/Pagination';
import { useLanguage } from '../context/LanguageContext';
import { DOCUMENTS_PER_PAGE, filterMaterials, paginate } from '../data/documents';
import type { MaterialType, Subject } from '../types/document';

export function LibraryPage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const classParam = searchParams.get('class');
  const subjectParam = searchParams.get('subject') as Subject | null;
  const typeParam = searchParams.get('type') as MaterialType | null;

  const filtered = useMemo(() => {
    return filterMaterials({
      language,
      classLevel: classParam ? Number(classParam) : undefined,
      subject: subjectParam || undefined,
      materialType: typeParam || undefined,
    });
  }, [language, classParam, subjectParam, typeParam]);

  const { items, totalPages } = paginate(filtered, page, DOCUMENTS_PER_PAGE);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'All chapters' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">All chapters & exercises</h1>
      <p className="text-slate-600 mb-8">
        Page {page} of {totalPages} · {filtered.length} materials
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-4">
        {items.map((m) => (
          <MaterialCard key={m.id} material={m} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/library" preserveParams={['class', 'subject', 'type']} />
    </div>
  );
}

