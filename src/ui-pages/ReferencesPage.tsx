'use client';

import { ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SourceReference } from '../components/SourceReference';
import { NCERT_SOURCE } from '../types/document';

export function ReferencesPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'References' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">References & sources</h1>
      <p className="text-slate-600 mb-6">
        Every chapter and exercise PDF comes from NCERT’s official site. English and Hindi books use separate
        NCERT book codes.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <a
          href={NCERT_SOURCE.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-indigo-700 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
        >
          ncert.nic.in
          <ExternalLink className="w-4 h-4 shrink-0 opacity-70" />
        </a>
        <a
          href={NCERT_SOURCE.textbooksPage}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-indigo-700 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
        >
          NCERT Online Textbooks
          <ExternalLink className="w-4 h-4 shrink-0 opacity-70" />
        </a>
      </div>

      <SourceReference />

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">How to cite</h2>
        <p className="text-sm text-slate-600 mb-3">Example (chapter):</p>
        <blockquote className="border-l-4 border-indigo-300 pl-4 text-sm text-slate-700 italic leading-relaxed">
          National Council of Educational Research and Training (NCERT). <em>Science Textbook for Class X</em>.
          New Delhi: NCERT. Retrieved from{' '}
          <a
            href={NCERT_SOURCE.textbooksPage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 not-italic hover:underline break-all"
          >
            {NCERT_SOURCE.textbooksPage}
          </a>
        </blockquote>
      </section>
    </div>
  );
}
