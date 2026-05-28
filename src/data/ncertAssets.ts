import type { Language } from '../types/document';

export function getNcertPdfUrl(lang: Language, filename: string): string | undefined {
  if (!filename) return undefined;
  return `/ncert/${lang}/${filename}`;
}

export function hasLanguageAssets(lang: Language): boolean {
  // In Next.js we serve PDFs from public/, so availability is determined at runtime.
  // We assume at least English exists; Hindi becomes available after running `npm run fetch-pdfs:hi`.
  return lang === 'en' ? true : true;
}
