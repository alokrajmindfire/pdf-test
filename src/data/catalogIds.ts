import type { DocCategory, Subject } from '../types/document';

const SUBJECTS: Subject[] = ['physics', 'chemistry', 'biology', 'mathematics'];
const CATEGORIES: DocCategory[] = [
  'ncert-notes',
  'lab-manual',
  'question-paper',
  'sample-paper',
  'revision-sheet',
];

const CHAPTER_COUNTS: Record<Subject, number> = {
  physics: 5,
  chemistry: 5,
  biology: 5,
  mathematics: 7,
};

/** All document IDs — shared by PDF link script and catalog builder. */
export function listCatalogIds(): string[] {
  const ids: string[] = [];

  for (const classLevel of [6, 7, 8, 9, 10, 11, 12]) {
    for (const subject of SUBJECTS) {
      for (let ch = 0; ch < CHAPTER_COUNTS[subject]; ch++) {
        for (const category of CATEGORIES) {
          ids.push(`c${classLevel}-${subject}-${category}-ch${ch + 1}`);
        }
      }
    }
  }

  ids.push('legacy-1');
  return ids;
}
