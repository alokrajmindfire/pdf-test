'use client';

import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import { filterMaterials } from '../data/documents';
import { getSubjectsForClass } from '../data/ncertBooks';
import { SUBJECT_LABELS, type Subject } from '../types/document';

export function ClassDetailPage({ __nextParams }: { __nextParams: { classId?: string } }) {
  const classId = __nextParams.classId;
  const { language } = useLanguage();
  const classLevel = Number(classId);

  if (!Number.isFinite(classLevel) || classLevel < 6 || classLevel > 12) {
    return <p className="text-red-600">Please choose a class between 6 and 12.</p>;
  }

  const subjects = getSubjectsForClass(classLevel, language);
  const isSeniorSplit = classLevel >= 11;

  if (subjects.length === 0) {
    return (
      <div>
        <p className="text-slate-600 mb-4">
          No {language === 'hi' ? 'Hindi' : 'English'} books for this class yet. Try the other language or run{' '}
          <code className="bg-slate-100 px-1 rounded">npm run fetch-pdfs:hi</code>.
        </p>
        <Link href="/classes" className="text-indigo-600 hover:underline">
          Back to classes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Classes', to: '/classes' },
          { label: language === 'hi' ? `कक्षा ${classLevel}` : `Class ${classLevel}` },
        ]}
      />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        {language === 'hi' ? `कक्षा ${classLevel}` : `Class ${classLevel}`}
      </h1>
      <p className="text-slate-600 mb-8">
        {isSeniorSplit
          ? language === 'hi'
            ? 'भौतिकी, रसायन, जीव विज्ञान या गणित चुनें।'
            : 'Choose Physics, Chemistry, Biology, or Mathematics.'
          : language === 'hi'
            ? 'विज्ञान और गणित — अध्याय और अभ्यास।'
            : 'Science and Mathematics — chapters and exercises.'}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {subjects.map((subject) => {
          const count = filterMaterials({ language, classLevel, subject }).length;
          return (
            <Link
              key={subject}
              href={`/classes/${classLevel}/${subject}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md transition-all h-full flex flex-col"
            >
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700">
                {SUBJECT_LABELS[language][subject as Subject]}
              </h2>
              <p className="text-sm text-slate-500 mt-2 flex-1">{count / 2} chapters</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

