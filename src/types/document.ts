export type Language = 'en' | 'hi';

export type Subject = 'science' | 'physics' | 'chemistry' | 'biology' | 'mathematics';

export type MaterialType = 'chapter' | 'exercises';

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  url: string;
  pdfFile: string;
  language: Language;
  classLevel: number;
  subject: Subject;
  materialType: MaterialType;
  chapterNumber: number;
  chapterTitle: string;
  bookCode: string;
  bookTitle: string;
  sourceUrl: string;
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
};

export const SUBJECT_LABELS: Record<Language, Record<Subject, string>> = {
  en: {
    science: 'Science',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    mathematics: 'Mathematics',
  },
  hi: {
    science: 'विज्ञान',
    physics: 'भौतिकी',
    chemistry: 'रसायन विज्ञान',
    biology: 'जीव विज्ञान',
    mathematics: 'गणित',
  },
};

export const MATERIAL_LABELS: Record<Language, Record<MaterialType, string>> = {
  en: {
    chapter: 'Textbook Chapter',
    exercises: 'Exercises & Questions',
  },
  hi: {
    chapter: 'पाठ्यपुस्तक अध्याय',
    exercises: 'अभ्यास व प्रश्न',
  },
};

export const SENIOR_CLASSES = [9, 10, 11, 12] as const;
export const CLASS_LEVELS = [6, 7, 8, 9, 10, 11, 12] as const;
export const SENIOR_SCIENCE_SUBJECTS: Subject[] = ['physics', 'chemistry', 'biology'];

export const NCERT_SOURCE = {
  name: 'NCERT (National Council of Educational Research and Training)',
  website: 'https://ncert.nic.in/',
  textbooksPage: 'https://ncert.nic.in/textbook.php',
  copyright:
    'Textbooks © NCERT. Free distribution for educational purposes under NCERT terms of use.',
};
