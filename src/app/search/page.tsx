import { Suspense } from 'react';
import { SearchPage } from '../../ui-pages/SearchPage';

export default function Page() {
  return (
    <Suspense fallback={<p className="text-slate-600">Loading search…</p>}>
      <SearchPage />
    </Suspense>
  );
}

