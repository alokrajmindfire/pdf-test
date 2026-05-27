export type Subject = 'physics' | 'chemistry' | 'biology' | 'mathematics';
export type DocCategory =
  | 'ncert-notes'
  | 'lab-manual'
  | 'question-paper'
  | 'sample-paper'
  | 'revision-sheet';

export interface PDFDocument {
  id: string;
  title: string;
  description: string;
  url: string;
  size: string;
  classLevel: number;
  subject: Subject;
  category: DocCategory;
  chapter?: string;
  year?: number;
  tags: string[];
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  mathematics: 'Mathematics',
};

export const CATEGORY_LABELS: Record<DocCategory, string> = {
  'ncert-notes': 'NCERT Notes',
  'lab-manual': 'Lab Manual',
  'question-paper': 'Question Paper',
  'sample-paper': 'Sample Paper',
  'revision-sheet': 'Revision Sheet',
};

export const CLASS_LEVELS = [6, 7, 8, 9, 10, 11, 12] as const;
