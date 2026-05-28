import type { DocCategory, PDFDocument, Subject } from '../types/document';
import { getDocumentPdfUrl } from './localPdfs';

const SUBJECTS: Subject[] = ['physics', 'chemistry', 'biology', 'mathematics'];
const CATEGORIES: DocCategory[] = [
  'ncert-notes',
  'lab-manual',
  'question-paper',
  'sample-paper',
  'revision-sheet',
];

const MAX_DOCUMENTS = 100;

const CHAPTER_TITLES: Record<Subject, string[]> = {
  physics: [
    'Light – Reflection and Refraction',
    'Human Eye and Colourful World',
    'Electricity',
    'Magnetic Effects of Electric Current',
    'Sources of Energy',
  ],
  chemistry: [
    'Chemical Reactions and Equations',
    'Acids, Bases and Salts',
    'Metals and Non-metals',
    'Carbon and its Compounds',
    'Periodic Classification of Elements',
  ],
  biology: [
    'Life Processes',
    'Control and Coordination',
    'How do Organisms Reproduce?',
    'Heredity and Evolution',
    'Our Environment',
  ],
  mathematics: [
    'Real Numbers',
    'Polynomials',
    'Pair of Linear Equations',
    'Quadratic Equations',
    'Arithmetic Progressions',
    'Triangles',
    'Coordinate Geometry',
  ],
};

function pickUrl(docId: string): string {
  return getDocumentPdfUrl(docId);
}

function buildDocuments(): PDFDocument[] {
  const docs: PDFDocument[] = [];
  let seq = 0;

  for (const classLevel of [6, 7, 8, 9, 10, 11, 12]) {
    for (const subject of SUBJECTS) {
      const chapters = CHAPTER_TITLES[subject];
      for (let ch = 0; ch < chapters.length; ch++) {
        for (const category of CATEGORIES) {
          if (docs.length >= MAX_DOCUMENTS) return docs;
          const id = `c${classLevel}-${subject}-${category}-ch${ch + 1}`;
          const chapter = chapters[ch];
          const year = 2018 + (classLevel % 5) + (ch % 3);
          seq += 1;
          docs.push({
            id,
            title: `Class ${classLevel} ${subject} – ${chapter} (${category})`,
            description: `Study material for Class ${classLevel} ${subject}: ${chapter}. Category: ${category.replace(/-/g, ' ')}.`,
            url: pickUrl(id),
            size: `${(0.8 + (seq % 40) / 10).toFixed(1)} MB`,
            classLevel,
            subject,
            category,
            chapter,
            year,
            tags: [subject, `class-${classLevel}`, category, `ch-${ch + 1}`],
          });
        }
      }
    }
  }

  // Legacy / misc entries (mixed URL styles for crawlers)
  if (docs.length >= MAX_DOCUMENTS) return docs;
  docs.push({
    id: 'legacy-1',
    title: 'Bidder Instructions (Legacy Upload)',
    description: 'Original local bundle PDF',
    url: getDocumentPdfUrl('legacy-1'),
    size: '2.3 MB',
    classLevel: 10,
    subject: 'physics',
    category: 'ncert-notes',
    tags: ['legacy', 'local'],
  });

  return docs;
}

export const ALL_DOCUMENTS = buildDocuments();

export const DOCUMENTS_PER_PAGE = 12;

export function getDocumentById(id: string): PDFDocument | undefined {
  return ALL_DOCUMENTS.find((d) => d.id === id);
}

export function filterDocuments(opts: {
  classLevel?: number;
  subject?: Subject;
  category?: DocCategory;
  search?: string;
  year?: number;
}): PDFDocument[] {
  const q = opts.search?.trim().toLowerCase();
  return ALL_DOCUMENTS.filter((doc) => {
    if (opts.classLevel != null && doc.classLevel !== opts.classLevel) return false;
    if (opts.subject && doc.subject !== opts.subject) return false;
    if (opts.category && doc.category !== opts.category) return false;
    if (opts.year != null && doc.year !== opts.year) return false;
    if (q) {
      const hay = `${doc.title} ${doc.description} ${doc.chapter ?? ''} ${doc.tags.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number): { items: T[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
  };
}
