'use client';

import { BookOpen, ClipboardList, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { MaterialCard } from '../components/MaterialCard';
import { useLanguage } from '../context/LanguageContext';
import { useLanguageMaterialCount, useLanguageMaterials } from '../hooks/useLanguageMaterials';
import { LANGUAGE_LABELS, SENIOR_CLASSES, SUBJECT_LABELS, type Subject } from '../types/document';

const seniorCards = [
  { classLevel: 12, subjects: ['physics', 'chemistry', 'biology'] as Subject[] },
  { classLevel: 11, subjects: ['physics', 'chemistry', 'biology'] as Subject[] },
  { classLevel: 10, subjects: ['science'] as Subject[] },
  { classLevel: 9, subjects: ['science'] as Subject[] },
];

const colors = [
  'from-violet-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
];

export function HomePage() {
  const { language } = useLanguage();
  const total = useLanguageMaterialCount();
  const featured = useLanguageMaterials({
    classLevel: 10,
    subject: 'science',
    materialType: 'chapter',
  }).slice(0, 3);

  return (
    <div>
      <section className="text-center mb-14 py-6">
        <p className="text-sm font-medium text-indigo-600 mb-2">{LANGUAGE_LABELS[language]} medium</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          {language === 'hi' ? 'एनसीईआरटी विज्ञान और गणित' : 'Learn NCERT Science & Maths'}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {language === 'hi'
            ? 'छात्रों और शिक्षकों के लिए मुफ़्त पाठ्यपुस्तक — अध्याय पढ़ें, अभ्यास करें, पीडीएफ डाउनलोड करें।'
            : 'Free textbooks for students and teachers — read chapters, practise exercises, download PDFs.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            href="/classes/10"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-md"
          >
            {language === 'hi' ? 'कक्षा 10' : 'Start Class 10'}
          </Link>
          <Link
            href="/classes/12/physics"
            className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl font-medium hover:bg-slate-50"
          >
            {language === 'hi' ? 'कक्षा 12 भौतिकी' : 'Class 12 Physics'}
          </Link>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-indigo-600" />
          {language === 'hi' ? 'कक्षा 9–12' : 'Classes 9, 10, 11 & 12'}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {seniorCards.map(({ classLevel, subjects }, i) => (
            <div
              key={classLevel}
              className={`rounded-2xl bg-gradient-to-br ${colors[i]} p-6 text-white shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-2">
                {language === 'hi' ? `कक्षा ${classLevel}` : `Class ${classLevel}`}
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {subjects.map((s) => (
                  <Link
                    key={s}
                    href={`/classes/${classLevel}/${s}`}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium"
                  >
                    {SUBJECT_LABELS[language][s]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border p-6">
          <BookOpen className="w-10 h-10 text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {language === 'hi' ? 'पाठ्यपुस्तक अध्याय' : 'Textbook chapters'}
          </h3>
          <p className="text-slate-600 text-sm">
            {total} {language === 'hi' ? 'सामग्री' : 'materials'} in {LANGUAGE_LABELS[language]}.
          </p>
        </div>
        <div className="bg-white rounded-2xl border p-6">
          <ClipboardList className="w-10 h-10 text-amber-600 mb-3" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {language === 'hi' ? 'अभ्यास और प्रश्न' : 'Exercises & questions'}
          </h3>
          <p className="text-slate-600 text-sm">
            {language === 'hi'
              ? 'प्रत्येक अध्याय के लिए अलग अभ्यास सूची।'
              : 'Separate exercise entry for every chapter.'}
          </p>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {language === 'hi' ? 'लोकप्रिय — कक्षा 10 विज्ञान' : 'Popular — Class 10 Science'}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((m) => (
              <MaterialCard key={m.id} material={m} compact />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <div className="flex flex-wrap gap-2">
          {[6, 7, 8, ...SENIOR_CLASSES].map((c) => (
            <Link
              key={c}
              href={`/classes/${c}`}
              className="px-4 py-2 rounded-full bg-white border text-sm font-medium hover:border-indigo-300 hover:text-indigo-700"
            >
              {language === 'hi' ? `कक्षा ${c}` : `Class ${c}`}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

