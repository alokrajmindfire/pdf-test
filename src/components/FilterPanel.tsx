import { useLanguage } from '../context/LanguageContext';
import type { MaterialType, Subject } from '../types/document';
import { CLASS_LEVELS, MATERIAL_LABELS, SUBJECT_LABELS } from '../types/document';
import { getSubjectsForClass } from '../data/ncertBooks';

export interface FilterValues {
  classLevel: string;
  subject: string;
  materialType: string;
  search: string;
  sort: string;
}

interface FilterPanelProps {
  values: FilterValues;
  onChange: (key: keyof FilterValues, value: string) => void;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

export function FilterPanel({
  values,
  onChange,
  showAdvanced = false,
  onToggleAdvanced,
}: FilterPanelProps) {
  const { language } = useLanguage();
  const classNum = values.classLevel ? Number(values.classLevel) : null;
  const subjectOptions: Subject[] = classNum
    ? getSubjectsForClass(classNum, language)
    : (Object.keys(SUBJECT_LABELS[language]) as Subject[]);

  return (
    <form
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Search</span>
          <input
            type="search"
            value={values.search}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Chapter name or topic…"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Class</span>
          <select
            value={values.classLevel}
            onChange={(e) => onChange('classLevel', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All classes</option>
            {CLASS_LEVELS.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Subject</span>
          <select
            value={values.subject}
            onChange={(e) => onChange('subject', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All subjects</option>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>
                {SUBJECT_LABELS[language][s]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Sort by</span>
          <select
            value={values.sort}
            onChange={(e) => onChange('sort', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="chapter">Chapter order</option>
            <option value="title">Title A–Z</option>
            <option value="class-desc">Class (higher first)</option>
          </select>
        </label>
      </div>

      {showAdvanced && (
        <div className="pt-2 border-t border-slate-100">
          <label className="block max-w-xs">
            <span className="text-sm font-medium text-slate-700">Material type</span>
            <select
              value={values.materialType}
              onChange={(e) => onChange('materialType', e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Chapters & exercises</option>
              {(Object.keys(MATERIAL_LABELS) as MaterialType[]).map((t) => (
                <option key={t} value={t}>
                  {MATERIAL_LABELS[language][t]}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {onToggleAdvanced && (
        <button
          type="button"
          onClick={onToggleAdvanced}
          className="text-sm text-indigo-600 hover:underline font-medium"
        >
          {showAdvanced ? 'Hide filters' : 'More filters'}
        </button>
      )}
    </form>
  );
}
