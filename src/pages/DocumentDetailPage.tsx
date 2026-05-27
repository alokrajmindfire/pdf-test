import { Download, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getDocumentById } from '../data/documents';
import { CATEGORY_LABELS, SUBJECT_LABELS } from '../types/document';

export function DocumentDetailPage() {
  const { docId } = useParams();
  const doc = docId ? getDocumentById(docId) : undefined;

  if (!doc) {
    return (
      <div>
        <p className="text-red-600 mb-4">Document not found.</p>
        <Link to="/library" className="text-indigo-600 hover:underline">
          Back to library
        </Link>
      </div>
    );
  }

  const isExternal = doc.url.startsWith('http');

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: `Class ${doc.classLevel}`, to: `/classes/${doc.classLevel}` },
          { label: SUBJECT_LABELS[doc.subject], to: `/classes/${doc.classLevel}/${doc.subject}` },
          { label: doc.title },
        ]}
      />
      <article className="bg-white rounded-xl border border-slate-200 p-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">{doc.title}</h1>
        <p className="text-slate-600 mb-6">{doc.description}</p>
        <dl className="grid grid-cols-2 gap-4 text-sm mb-8">
          <div>
            <dt className="text-slate-500">Class</dt>
            <dd className="font-medium">{doc.classLevel}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Subject</dt>
            <dd className="font-medium">{SUBJECT_LABELS[doc.subject]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Category</dt>
            <dd className="font-medium">{CATEGORY_LABELS[doc.category]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Size</dt>
            <dd className="font-medium">{doc.size}</dd>
          </div>
          {doc.chapter && (
            <div className="col-span-2">
              <dt className="text-slate-500">Chapter</dt>
              <dd className="font-medium">{doc.chapter}</dd>
            </div>
          )}
        </dl>
        <div className="flex flex-wrap gap-3">
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isExternal ? <ExternalLink className="w-4 h-4" /> : null}
            Open PDF
          </a>
          <a
            href={doc.url}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
        <link rel="alternate" type="application/pdf" href={doc.url} />
      </article>
    </div>
  );
}
