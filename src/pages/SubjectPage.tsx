import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DocumentCard } from '../components/DocumentCard';
import { filterDocuments } from '../data/documents';
import { SUBJECT_LABELS, type Subject } from '../types/document';

const VALID: Subject[] = ['physics', 'chemistry', 'biology', 'mathematics'];

export function SubjectPage() {
  const { classId, subject } = useParams();
  const classLevel = Number(classId);
  const sub = subject as Subject;

  if (!VALID.includes(sub) || !Number.isFinite(classLevel)) {
    return <p className="text-red-600">Invalid class or subject.</p>;
  }

  const docs = filterDocuments({ classLevel, subject: sub });

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Classes', to: '/classes' },
          { label: `Class ${classLevel}`, to: `/classes/${classLevel}` },
          { label: SUBJECT_LABELS[sub] },
        ]}
      />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Class {classLevel} — {SUBJECT_LABELS[sub]}
      </h1>
      <p className="text-slate-600 mb-8">{docs.length} PDF documents</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
