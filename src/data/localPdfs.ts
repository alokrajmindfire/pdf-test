/**
 * Each catalog document maps to a unique URL: /pdf/{docId}.pdf
 * Files are generated from NCERT sources in src/assets/science (npm run link-pdfs).
 */
const sciencePdfModules = import.meta.glob('../assets/science/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const legacyPdfModules = import.meta.glob('../*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const SCIENCE_PDF_URLS = Object.values(sciencePdfModules);
const LEGACY_PDF_URLS = Object.values(legacyPdfModules);

/** Unique path per document for crawlers (served from public/pdf after link-pdfs). */
export function getDocumentPdfUrl(docId: string): string {
  return `/pdf/${docId}.pdf`;
}

/** Fallback when public/pdf files are not generated yet. */
export function getDocumentPdfFallback(index: number): string {
  if (SCIENCE_PDF_URLS.length > 0) return SCIENCE_PDF_URLS[index % SCIENCE_PDF_URLS.length];
  if (LEGACY_PDF_URLS.length > 0) return LEGACY_PDF_URLS[index % LEGACY_PDF_URLS.length];
  return '/documents/placeholder-science-notes.pdf';
}

export const SCIENCE_SOURCE_COUNT = SCIENCE_PDF_URLS.length;
