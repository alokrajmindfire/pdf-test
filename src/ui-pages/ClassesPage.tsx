'use client';

import Link from 'next/link';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import { filterMaterials } from '../data/documents';
import { getSubjectsForClass } from '../data/ncertBooks';
import { CLASS_LEVELS, LANGUAGE_LABELS, SENIOR_CLASSES, SUBJECT_LABELS } from '../types/document';

export function ClassesPage() {
  const { language } = useLanguage();

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Classes' }]} />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        {language === 'hi' ? 'अपनी कक्षा चुनें' : 'Choose your class'}
      </h1>
      <p className="text-slate-600 mb-10">
        {language === 'hi'
          ? `${LANGUAGE_LABELS[language]} माध्यम — विषय, अध्याय और अभ्यास।`
          : `${LANGUAGE_LABELS[language]} medium — subjects, chapters, and exercises.`}
      </p>

      <h2 className="text-lg font-semibold text-slate-800 mb-4">Classes 9–12</h2>
      <div className="grid gap-5 sm:grid-cols-2 mb-12">
        {SENIOR_CLASSES.map((level) => {
          const count = filterMaterials({ language, classLevel: level }).length;
          const subjects = getSubjectsForClass(level, language);
          return (
            <Link
              key={level}
              href={`/classes/${level}`}
              className="block bg-white rounded-2xl border-2 border-indigo-100 p-6 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <span className="text-3xl font-bold text-indigo-600">
                {language === 'hi' ? `कक्षा ${level}` : `Class ${level}`}
              </span>
              <p className="text-slate-600 mt-2 text-sm">{count} materials</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                    {SUBJECT_LABELS[language][s]}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold text-slate-800 mb-4">Classes 6–8</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {CLASS_LEVELS.filter((c) => c < 9).map((level) => {
          const count = filterMaterials({ language, classLevel: level }).length;
          if (count === 0) return null;
          return (
            <Link key={level} href={`/classes/${level}`} className="block bg-white rounded-xl border p-5 hover:shadow-md">
              <span className="text-xl font-bold">{language === 'hi' ? `कक्षा ${level}` : `Class ${level}`}</span>
              <p className="text-slate-500 text-sm mt-1">{count} materials</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

