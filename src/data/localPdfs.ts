export function getDocumentPdfUrl(docId: string): string {
  const override = (import.meta as any).env?.VITE_PDF_OVERRIDE_URL as string | undefined;
  if (override && override.trim().length > 0) return override.trim();

  // Keep a unique per-document URL.
  return `/pdf/${docId}.pdf`;
}

/** Fallback when public/pdf files are not generated yet. */
export function getDocumentPdfFallback(index: number): string {
  void index;
  return getDocumentPdfUrl('fallback');
}

export const SCIENCE_SOURCE_COUNT = 0;
