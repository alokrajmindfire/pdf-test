'use client';

import { ExternalLink } from 'lucide-react';
import { NCERT_SOURCE } from '../types/document';

interface SourceReferenceProps {
  compact?: boolean;
  sourceUrl?: string;
}

export function SourceReference({ compact = false, sourceUrl }: SourceReferenceProps) {
  if (compact) {
    return (
      <p className="text-xs text-slate-500">
        Ref:{' '}
        <a
          href={sourceUrl ?? NCERT_SOURCE.textbooksPage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          NCERT official textbook
        </a>
      </p>
    );
  }

  return (
    <section className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700">
      <h2 className="font-semibold text-slate-900 mb-2">Source & reference</h2>
      <p className="mb-3">
        All PDFs on this site are chapter-wise excerpts from textbooks published by the{' '}
        <strong>{NCERT_SOURCE.name}</strong> (India). We do not claim ownership of the content.
      </p>
      <ul className="space-y-2 list-disc list-inside">
        <li>
          Publisher:{' '}
          <a
            href={NCERT_SOURCE.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline inline-flex items-center gap-1"
          >
            ncert.nic.in
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </li>
        <li>
          Download portal:{' '}
          <a
            href={NCERT_SOURCE.textbooksPage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            NCERT Online Textbooks
          </a>
        </li>
        {sourceUrl && (
          <li>
            This chapter file:{' '}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {sourceUrl}
            </a>
          </li>
        )}
      </ul>
      <p className="mt-3 text-xs text-slate-500">{NCERT_SOURCE.copyright}</p>
    </section>
  );
}
