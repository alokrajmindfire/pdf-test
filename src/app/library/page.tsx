import { Suspense } from 'react';
import { LibraryPage } from '../../ui-pages/LibraryPage';

export default function Page() {
  return (
    <Suspense fallback={<p className="text-slate-600">Loading library…</p>}>
      <LibraryPage />
    </Suspense>
  );
}

