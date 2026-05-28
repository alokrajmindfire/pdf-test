import type { Language, Subject } from '../types/document';

export interface NcertBook {
  code: string;
  language: Language;
  classLevel: number;
  subject: Subject;
  title: string;
  shortTitle: string;
}

const EN_BOOKS: NcertBook[] = [
  { code: 'fecu', language: 'en', classLevel: 6, subject: 'science', title: 'Curiosity – Science', shortTitle: 'Science' },
  { code: 'gecu', language: 'en', classLevel: 7, subject: 'science', title: 'Curiosity – Science', shortTitle: 'Science' },
  { code: 'hecu', language: 'en', classLevel: 8, subject: 'science', title: 'Curiosity – Science', shortTitle: 'Science' },
  { code: 'femh', language: 'en', classLevel: 6, subject: 'mathematics', title: 'Mathematics', shortTitle: 'Maths' },
  { code: 'gemh', language: 'en', classLevel: 7, subject: 'mathematics', title: 'Mathematics', shortTitle: 'Maths' },
  { code: 'hemh', language: 'en', classLevel: 8, subject: 'mathematics', title: 'Mathematics', shortTitle: 'Maths' },
  { code: 'iesc', language: 'en', classLevel: 9, subject: 'science', title: 'Science', shortTitle: 'Science' },
  { code: 'jesc', language: 'en', classLevel: 10, subject: 'science', title: 'Science', shortTitle: 'Science' },
  { code: 'jemh', language: 'en', classLevel: 10, subject: 'mathematics', title: 'Mathematics', shortTitle: 'Maths' },
  { code: 'keph', language: 'en', classLevel: 11, subject: 'physics', title: 'Physics', shortTitle: 'Physics' },
  { code: 'kech', language: 'en', classLevel: 11, subject: 'chemistry', title: 'Chemistry', shortTitle: 'Chemistry' },
  { code: 'kebo', language: 'en', classLevel: 11, subject: 'biology', title: 'Biology', shortTitle: 'Biology' },
  { code: 'kemh', language: 'en', classLevel: 11, subject: 'mathematics', title: 'Mathematics', shortTitle: 'Maths' },
  { code: 'leph', language: 'en', classLevel: 12, subject: 'physics', title: 'Physics', shortTitle: 'Physics' },
  { code: 'lech', language: 'en', classLevel: 12, subject: 'chemistry', title: 'Chemistry', shortTitle: 'Chemistry' },
  { code: 'lebo', language: 'en', classLevel: 12, subject: 'biology', title: 'Biology', shortTitle: 'Biology' },
  { code: 'lemh', language: 'en', classLevel: 12, subject: 'mathematics', title: 'Mathematics', shortTitle: 'Maths' },
];

const HI_BOOKS: NcertBook[] = [
  { code: 'fehc', language: 'hi', classLevel: 6, subject: 'science', title: 'विज्ञान (Curiosity)', shortTitle: 'विज्ञान' },
  { code: 'gehc', language: 'hi', classLevel: 7, subject: 'science', title: 'विज्ञान (Curiosity)', shortTitle: 'विज्ञान' },
  { code: 'hesc', language: 'hi', classLevel: 8, subject: 'science', title: 'विज्ञान (Curiosity)', shortTitle: 'विज्ञान' },
  { code: 'jhss', language: 'hi', classLevel: 9, subject: 'science', title: 'विज्ञान', shortTitle: 'विज्ञान' },
  { code: 'jhsc', language: 'hi', classLevel: 10, subject: 'science', title: 'विज्ञान', shortTitle: 'विज्ञान' },
  { code: 'jhmh', language: 'hi', classLevel: 10, subject: 'mathematics', title: 'गणित', shortTitle: 'गणित' },
  { code: 'khph', language: 'hi', classLevel: 11, subject: 'physics', title: 'भौतिकी', shortTitle: 'भौतिकी' },
  { code: 'khch', language: 'hi', classLevel: 11, subject: 'chemistry', title: 'रसायन विज्ञान', shortTitle: 'रसायन' },
  { code: 'khbo', language: 'hi', classLevel: 11, subject: 'biology', title: 'जीव विज्ञान', shortTitle: 'जीव विज्ञान' },
  { code: 'khmh', language: 'hi', classLevel: 11, subject: 'mathematics', title: 'गणित', shortTitle: 'गणित' },
  { code: 'lhph', language: 'hi', classLevel: 12, subject: 'physics', title: 'भौतिकी', shortTitle: 'भौतिकी' },
  { code: 'lhch', language: 'hi', classLevel: 12, subject: 'chemistry', title: 'रसायन विज्ञान', shortTitle: 'रसायन' },
  { code: 'lhbo', language: 'hi', classLevel: 12, subject: 'biology', title: 'जीव विज्ञान', shortTitle: 'जीव विज्ञान' },
  { code: 'lhmh', language: 'hi', classLevel: 12, subject: 'mathematics', title: 'गणित', shortTitle: 'गणित' },
];

export const NCERT_BOOKS: Record<string, NcertBook> = Object.fromEntries(
  [...EN_BOOKS, ...HI_BOOKS].map((b) => [`${b.language}-${b.code}`, b]),
);

export function getBook(lang: Language, code: string): NcertBook | undefined {
  return NCERT_BOOKS[`${lang}-${code}`];
}

export function getSubjectsForClass(classLevel: number, lang: Language): Subject[] {
  const books = Object.values(NCERT_BOOKS).filter((b) => b.language === lang && b.classLevel === classLevel);
  return [...new Set(books.map((b) => b.subject))];
}
