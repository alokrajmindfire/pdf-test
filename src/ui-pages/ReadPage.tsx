'use client';

import { lazy, Suspense, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SourceReference } from '../components/SourceReference';
import { getMaterialById } from '../data/documents';

const PdfReaderScreen = lazy(() =>
  import('../components/PdfReaderScreen').then((m) => ({ default: m.PdfReaderScreen })),
);

export function ReadPage({ __nextParams }: { __nextParams: { materialId?: string } }) {
  const materialId = __nextParams.materialId;
  const router = useRouter();
  const material = materialId ? getMaterialById(materialId) : undefined;

  const handleClose = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else if (material) {
      router.push(`/classes/${material.classLevel}/${material.subject}`);
    } else {
      router.push('/');
    }
  }, [router, material]);

  if (!material) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-slate-600 mb-4">This chapter could not be found.</p>
        <button type="button" onClick={() => router.push('/classes')} className="text-indigo-600 font-medium hover:underline">
          Browse classes
        </button>
      </div>
    );
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#3c4043] text-white">
            Loading reader…
          </div>
        }
      >
        <PdfReaderScreen fileUrl={material.url} title={material.title} onClose={handleClose} />
      </Suspense>
      <div className="sr-only">
        <SourceReference sourceUrl={material.sourceUrl} />
      </div>
    </>
  );
}

