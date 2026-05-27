import type { DocCategory, Subject } from '../types/document';
import { CATEGORY_LABELS, CLASS_LEVELS, SUBJECT_LABELS } from '../types/document';

export interface FilterValues {
  classLevel: string;
  subject: string;
  category: string;
  year: string;
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
            placeholder="Chapter, topic, tag…"
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
            {(Object.keys(SUBJECT_LABELS) as Subject[]).map((s) => (
              <option key={s} value={s}>
                {SUBJECT_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Sort</span>
          <select
            value={values.sort}
            onChange={(e) => onChange('sort', e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="title">Title A–Z</option>
            <option value="class-desc">Class (high first)</option>
            <option value="class-asc">Class (low first)</option>
            <option value="year-desc">Year (newest)</option>
          </select>
        </label>
      </div>

      {showAdvanced && (
        <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-100">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={values.category}
              onChange={(e) => onChange('category', e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">All categories</option>
              {(Object.keys(CATEGORY_LABELS) as DocCategory[]).map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Year</span>
            <select
              value={values.year}
              onChange={(e) => onChange('year', e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Any year</option>
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                <option key={y} value={y}>
                  {y}
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
          {showAdvanced ? 'Hide more options' : 'Show more options'}
        </button>
      )}
    </form>
  );
}
