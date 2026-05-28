'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MaterialCard } from '../components/MaterialCard';
import { useLanguage } from '../context/LanguageContext';
import { filterMaterials } from '../data/documents';
import { getSubjectsForClass } from '../data/ncertBooks';
import { SUBJECT_LABELS, type Subject } from '../types/document';

type Tab = 'chapters' | 'exercises';

export function SubjectPage({
  __nextParams,
}: {
  __nextParams: { classId?: string; subject?: string };
}) {
  const classId = __nextParams.classId;
  const subject = __nextParams.subject;
  const { language } = useLanguage();
  const classLevel = Number(classId);
  const sub = subject as Subject;
  const [tab, setTab] = useState<Tab>('chapters');

  const validSubjects = getSubjectsForClass(classLevel, language);
  const isValid =
    Number.isFinite(classLevel) && validSubjects.includes(sub);

  const all = useMemo(
    () =>
      isValid
        ? filterMaterials({ language, classLevel, subject: sub })
        : [],
    [isValid, language, classLevel, sub],
  );

  if (!isValid) {
    return <p className="text-red-600">Subject not available for this class and language.</p>;
  }

  const chapters = all.filter((m) => m.materialType === 'chapter');
  const exercises = all.filter((m) => m.materialType === 'exercises');
  const shown = tab === 'chapters' ? chapters : exercises;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Classes', to: '/classes' },
          { label: language === 'hi' ? `कक्षा ${classLevel}` : `Class ${classLevel}`, to: `/classes/${classLevel}` },
          { label: SUBJECT_LABELS[language][sub] },
        ]}
      />
      <h1 className="text-3xl font-bold text-slate-800 mb-1">
        {language === 'hi' ? `कक्षा ${classLevel}` : `Class ${classLevel}`} — {SUBJECT_LABELS[language][sub]}
      </h1>
      <p className="text-slate-600 mb-6">
        {chapters.length} chapters · {exercises.length} exercise sets
      </p>

      <div className="mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-1 grid grid-cols-2 gap-1 max-w-xl">
          {(
            [
              ['chapters', language === 'hi' ? `अध्याय (${chapters.length})` : `Chapters (${chapters.length})`],
              ['exercises', language === 'hi' ? `अभ्यास (${exercises.length})` : `Exercises (${exercises.length})`],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                tab === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-transparent text-slate-700 hover:bg-slate-50'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {shown.map((m) => (
          <MaterialCard key={m.id} material={m} />
        ))}
      </div>

      {shown.length === 0 && <p className="text-slate-500">No materials in this language yet.</p>}
    </div>
  );
}

