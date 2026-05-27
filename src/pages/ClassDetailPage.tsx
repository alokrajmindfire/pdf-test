import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DocumentCard } from '../components/DocumentCard';
import { filterDocuments } from '../data/documents';
import { SUBJECT_LABELS, type Subject } from '../types/document';

const SUBJECTS: Subject[] = ['physics', 'chemistry', 'biology', 'mathematics'];

export function ClassDetailPage() {
  const { classId } = useParams();
  const classLevel = Number(classId);

  if (!Number.isFinite(classLevel) || classLevel < 6 || classLevel > 12) {
    return <p className="text-red-600">Invalid class. Choose from Classes 6–12.</p>;
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Classes', to: '/classes' },
          { label: `Class ${classLevel}` },
        ]}
      />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Class {classLevel} — Science PDFs</h1>
      <p className="text-slate-600 mb-6">Pick a subject or browse all documents for this class.</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {SUBJECTS.map((subject) => {
          const count = filterDocuments({ classLevel, subject }).length;
          return (
            <Link
              key={subject}
              to={`/classes/${classLevel}/${subject}`}
              className="px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-800 font-medium hover:bg-indigo-100"
            >
              {SUBJECT_LABELS[subject]}
              <span className="block text-xs font-normal text-indigo-600 mt-0.5">{count} files</span>
            </Link>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold text-slate-800 mb-4">All Class {classLevel} documents</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {filterDocuments({ classLevel })
          .slice(0, 8)
          .map((doc) => (
            <DocumentCard key={doc.id} doc={doc} compact />
          ))}
      </div>
      {filterDocuments({ classLevel }).length > 8 && (
        <p className="mt-6 text-center">
          <Link
            to={`/library?class=${classLevel}`}
            className="text-indigo-600 font-medium hover:underline"
          >
            View all {filterDocuments({ classLevel }).length} in paginated library →
          </Link>
        </p>
      )}
    </div>
  );
}
