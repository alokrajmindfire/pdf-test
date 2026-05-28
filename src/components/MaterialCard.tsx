import { BookOpen, ClipboardList, Download } from 'lucide-react';
import Link from 'next/link';
import type { StudyMaterial } from '../types/document';
import { MATERIAL_LABELS, SUBJECT_LABELS } from '../types/document';

interface MaterialCardProps {
  material: StudyMaterial;
  compact?: boolean;
}

export function MaterialCard({ material, compact = false }: MaterialCardProps) {
  const isExercise = material.materialType === 'exercises';
  const Icon = isExercise ? ClipboardList : BookOpen;
  const readLabel = material.language === 'hi' ? 'ऑनलाइन पढ़ें' : 'Read online';
  const downloadLabel = material.language === 'hi' ? 'डाउनलोड' : 'PDF';

  return (
    <article
      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 h-full flex flex-col ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`p-2.5 rounded-xl shrink-0 ${
            isExercise ? 'bg-amber-50' : 'bg-indigo-50'
          }`}
        >
          <Icon className={`w-6 h-6 ${isExercise ? 'text-amber-700' : 'text-indigo-600'}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold text-slate-800 leading-snug ${
              compact ? 'text-base' : 'text-lg'
            } line-clamp-2`}
          >
            {material.title}
          </h3>
          {!compact && (
            <p className="text-slate-600 text-sm mt-1 line-clamp-3">{material.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
          {material.language === 'hi' ? 'कक्षा' : 'Class'} {material.classLevel}
        </span>
        <span className="px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-800">
          {SUBJECT_LABELS[material.language][material.subject]}
        </span>
        <span
          className={`px-2 py-0.5 rounded-lg border ${
            isExercise ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'
          }`}
        >
          {MATERIAL_LABELS[material.language][material.materialType]}
        </span>
      </div>

      <div className="mt-auto flex flex-col sm:flex-row gap-2">
        <Link
          href={`/read/${material.id}`}
          className="w-full sm:flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
        >
          <BookOpen className="w-4 h-4" />
          {readLabel}
        </Link>
        <a
          href={material.url}
          download
          className="w-full sm:flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 text-sm font-semibold border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
        >
          <Download className="w-4 h-4" />
          {downloadLabel}
        </a>
      </div>
    </article>
  );
}

export function DocumentCard({
  doc,
  compact,
}: {
  doc: StudyMaterial;
  compact?: boolean;
}) {
  return <MaterialCard material={doc} compact={compact} />;
}
