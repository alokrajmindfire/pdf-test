import type { Language, MaterialType, StudyMaterial, Subject } from '../types/document';
import { getChapterTitle } from './ncertChapterTitles';
import { getNcertPdfUrl } from './ncertAssets';
import { getBook } from './ncertBooks';
import { NCERT_MANIFEST } from './manifest';

function chapterLabel(lang: Language, num: number, title: string): string {
  if (lang === 'hi') return `अध्याय ${num}: ${title}`;
  return `Chapter ${num}: ${title}`;
}

function exerciseLabel(lang: Language, num: number): string {
  if (lang === 'hi') {
    return `अध्याय ${num}: अभ्यास एवं NCERT प्रश्न`;
  }
  return `Chapter ${num}: Exercises & NCERT Questions`;
}

function buildStudyCatalog(): StudyMaterial[] {
  const materials: StudyMaterial[] = [];

  for (const entry of NCERT_MANIFEST) {
    const lang = (entry.lang ?? 'en') as Language;
    const book = getBook(lang, entry.book);
    const pdfUrl = getNcertPdfUrl(lang, entry.file);
    if (!book || !pdfUrl) continue;

    const chapterTitle = getChapterTitle(lang, entry.book, entry.chapter);
    const baseId = `${lang}-${entry.book}-ch${String(entry.chapter).padStart(2, '0')}`;
    const sourceUrl = entry.url;

    const descChapter =
      lang === 'hi'
        ? `एनसीईआरटी ${book.title} — कक्षा ${book.classLevel}। पूर्ण अध्याय पढ़ें।`
        : `NCERT ${book.title} — Class ${book.classLevel}. Read the full chapter with examples and diagrams.`;

    const descExercise =
      lang === 'hi'
        ? `“${chapterTitle}” के अंतर्गत प्रश्न और अंतिम अभ्यास। पीडीएफ के अभ्यास खंड पर जाएँ।`
        : `In-text and end-of-chapter exercises for “${chapterTitle}”. Scroll to the exercise section in the reader.`;

    materials.push({
      id: baseId,
      title: chapterLabel(lang, entry.chapter, chapterTitle),
      description: descChapter,
      url: pdfUrl,
      pdfFile: entry.file,
      language: lang,
      classLevel: book.classLevel,
      subject: book.subject,
      materialType: 'chapter',
      chapterNumber: entry.chapter,
      chapterTitle,
      bookCode: book.code,
      bookTitle: book.title,
      sourceUrl,
    });

    materials.push({
      id: `${baseId}-exercises`,
      title: exerciseLabel(lang, entry.chapter),
      description: descExercise,
      url: pdfUrl,
      pdfFile: entry.file,
      language: lang,
      classLevel: book.classLevel,
      subject: book.subject,
      materialType: 'exercises',
      chapterNumber: entry.chapter,
      chapterTitle,
      bookCode: book.code,
      bookTitle: book.title,
      sourceUrl,
    });
  }

  return materials.sort((a, b) => {
    if (a.language !== b.language) return a.language.localeCompare(b.language);
    if (a.classLevel !== b.classLevel) return a.classLevel - b.classLevel;
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
    if (a.chapterNumber !== b.chapterNumber) return a.chapterNumber - b.chapterNumber;
    return a.materialType === 'chapter' ? -1 : 1;
  });
}

export const ALL_MATERIALS = buildStudyCatalog();
export const ALL_DOCUMENTS = ALL_MATERIALS;
export const DOCUMENTS_PER_PAGE = 12;

export function getMaterialById(id: string): StudyMaterial | undefined {
  return ALL_MATERIALS.find((m) => m.id === id);
}

export const getDocumentById = getMaterialById;

export function filterMaterials(opts: {
  language?: Language;
  classLevel?: number;
  subject?: Subject;
  materialType?: MaterialType;
  search?: string;
}): StudyMaterial[] {
  const q = opts.search?.trim().toLowerCase();
  return ALL_MATERIALS.filter((m) => {
    if (opts.language && m.language !== opts.language) return false;
    if (opts.classLevel != null && m.classLevel !== opts.classLevel) return false;
    if (opts.subject && m.subject !== opts.subject) return false;
    if (opts.materialType && m.materialType !== opts.materialType) return false;
    if (q) {
      const hay = `${m.title} ${m.description} ${m.chapterTitle} ${m.bookTitle}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export const filterDocuments = filterMaterials;

export function paginate<T>(items: T[], page: number, perPage: number): { items: T[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
  };
}
