import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ALL_MATERIALS, filterMaterials } from '../data/documents';

export function useLanguageMaterials(
  extra?: Parameters<typeof filterMaterials>[0],
) {
  const { language } = useLanguage();
  return useMemo(
    () => filterMaterials({ ...extra, language }),
    [language, extra],
  );
}

export function useLanguageMaterialCount() {
  const { language } = useLanguage();
  return useMemo(() => ALL_MATERIALS.filter((m) => m.language === language).length, [language]);
}
