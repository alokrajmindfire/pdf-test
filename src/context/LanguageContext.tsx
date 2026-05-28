 'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Language } from '../types/document';
import { hasLanguageAssets } from '../data/ncertAssets';

const STORAGE_KEY = 'ncert-study-language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  hindiAvailable: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStored(): Language {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'hi' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStored);
  const hindiAvailable = hasLanguageAssets('hi');

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === 'hi' && !hindiAvailable) return;
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* ignore */
      }
    },
    [hindiAvailable],
  );

  const value = useMemo(
    () => ({ language, setLanguage, hindiAvailable }),
    [language, setLanguage, hindiAvailable],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
