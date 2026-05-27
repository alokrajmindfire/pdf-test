import { Download, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PDFDocument } from '../types/document';
import { CATEGORY_LABELS, SUBJECT_LABELS } from '../types/document';

interface DocumentCardProps {
  doc: PDFDocument;
  showMeta?: boolean;
  compact?: boolean;
}

export function DocumentCard({ doc, showMeta = true, compact = false }: DocumentCardProps) {
  const isExternal = doc.url.startsWith('http');

  return (
    <article
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 ${
        compact ? 'p-4' : 'p-6'
      }`}
      data-document-id={doc.id}
      data-pdf-url={doc.url}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2.5 bg-indigo-50 rounded-lg shrink-0">
          <FileText className="w-7 h-7 text-indigo-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold text-slate-800 ${compact ? 'text-base' : 'text-lg'} leading-snug`}>
            {doc.title}
          </h3>
          {!compact && (
            <p className="text-slate-600 text-sm mt-1 line-clamp-2">{doc.description}</p>
          )}
        </div>
      </div>

      {showMeta && (
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Class {doc.classLevel}
          </span>
          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
            {SUBJECT_LABELS[doc.subject]}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
            {CATEGORY_LABELS[doc.category]}
          </span>
          {doc.year && (
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800">{doc.year}</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
        <span>{doc.size}</span>
        <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">PDF</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          {isExternal ? <ExternalLink className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          View PDF
        </a>
        <a
          href={doc.url}
          download
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
        <Link
          to={`/document/${doc.id}`}
          className="px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
