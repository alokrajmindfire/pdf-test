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

const MAX_DOCUMENTS = 121;

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

  const extraDocs = [
    {
      id: 'c7-mathematics-special-ch1',
      title: 'Class 7 mathematics – Special Problem Set',
      description: 'Additional test document for Class 7 mathematics.',
      classLevel: 7,
      subject: 'mathematics' as Subject,
      category: 'sample-paper' as DocCategory,
      chapter: 'Special Problem Set',
      year: 2026,
      tags: ['mathematics', 'class-7', 'sample-paper', 'special'],
    },
    {
      id: 'c8-physics-extra-ch1',
      title: 'Class 8 physics – Extra Practice',
      description: 'Extra physics practice PDF for Class 8.',
      classLevel: 8,
      subject: 'physics' as Subject,
      category: 'revision-sheet' as DocCategory,
      chapter: 'Extra Practice',
      year: 2026,
      tags: ['physics', 'class-8', 'revision-sheet', 'extra'],
    },
    {
      id: 'c9-biology-extra-ch1',
      title: 'Class 9 biology – Lab Revision',
      description: 'Extra biology revision material for Class 9.',
      classLevel: 9,
      subject: 'biology' as Subject,
      category: 'lab-manual' as DocCategory,
      chapter: 'Lab Revision',
      year: 2026,
      tags: ['biology', 'class-9', 'lab-manual', 'extra'],
    },
  ];

  const loopLimit = MAX_DOCUMENTS - extraDocs.length;

  outer: for (const classLevel of [6, 7, 8, 9, 10, 11, 12]) {
    for (const subject of SUBJECTS) {
      const chapters = CHAPTER_TITLES[subject];
      const chapterCount = classLevel === 6 && subject === 'mathematics' ? 4 : chapters.length;
      for (let ch = 0; ch < chapterCount; ch++) {
        for (const category of CATEGORIES) {
          if (
            classLevel === 6 && subject === 'mathematics' && ch === 4 && category === 'ncert-notes' ||
            classLevel === 6 && subject === 'biology' && ch === 4 && category === 'question-paper' ||
            classLevel === 6 && subject === 'chemistry' && ch === 4 && category === 'sample-paper'
          ) {
            continue;
          }
          if (docs.length >= loopLimit) break outer;
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

  for (const extra of extraDocs) {
    if (docs.length >= MAX_DOCUMENTS) return docs;
    docs.push({
      id: extra.id,
      title: extra.title,
      description: extra.description,
      url: pickUrl(extra.id),
      size: '1.1 MB',
      classLevel: extra.classLevel,
      subject: extra.subject,
      category: extra.category,
      chapter: extra.chapter,
      year: extra.year,
      tags: extra.tags,
    });
  }

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
