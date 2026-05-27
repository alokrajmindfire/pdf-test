import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ALL_DOCUMENTS } from '../data/documents';
import { CLASS_LEVELS, SUBJECT_LABELS, type Subject } from '../types/document';

const SUBJECTS: Subject[] = ['physics', 'chemistry', 'biology', 'mathematics'];

export function ClassesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Classes' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Select a Class</h1>
      <p className="text-slate-600 mb-8">Science stream study materials organized by class level.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CLASS_LEVELS.map((level) => {
          const count = ALL_DOCUMENTS.filter((d) => d.classLevel === level).length;
          return (
            <Link
              key={level}
              to={`/classes/${level}`}
              className="block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all"
            >
              <span className="text-4xl font-bold text-indigo-600">Class {level}</span>
              <p className="text-slate-600 mt-2 text-sm">{count} documents</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <li key={s}>
                    <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">
                      {SUBJECT_LABELS[s]}
                    </span>
                  </li>
                ))}
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
