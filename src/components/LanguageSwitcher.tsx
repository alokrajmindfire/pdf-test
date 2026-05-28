'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_LABELS, type Language } from '../types/document';

export function LanguageSwitcher() {
  const { language, setLanguage, hindiAvailable } = useLanguage();

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm sm:ml-4"
      role="group"
      aria-label="Textbook language"
    >
      <Languages className="w-4 h-4 text-slate-500 shrink-0" />
      {(['en', 'hi'] as Language[]).map((lang) => {
        const disabled = lang === 'hi' && !hindiAvailable;
        return (
          <button
            key={lang}
            type="button"
            disabled={disabled}
            onClick={() => setLanguage(lang)}
            title={disabled ? 'Run npm run fetch-pdfs:hi to enable Hindi PDFs' : undefined}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
              language === lang
                ? 'bg-indigo-600 text-white'
                : disabled
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {LANGUAGE_LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
}
