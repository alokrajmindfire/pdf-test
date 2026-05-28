/** English NCERT textbook codes (filename prefix before chapter digits). */
export const EN_BOOK_CODES = [
  'fecu', 'gecu', 'hecu', 'femh', 'gemh', 'hemh',
  'iesc', 'jesc', 'jemh',
  'keph', 'kech', 'kebo', 'kemh',
  'leph', 'lech', 'lebo', 'lemh',
];

/** Hindi NCERT textbook codes. */
export const HI_BOOK_CODES = [
  'gehc', 'hesc', 'fehc',
  'jhss', 'jhsc', 'jhmh',
  'khph', 'khch', 'khbo', 'khmh',
  'lhph', 'lhch', 'lhbo', 'lhmh',
];

export function chapterFileName(bookCode, chapter) {
  return `${bookCode}1${String(chapter).padStart(2, '0')}.pdf`;
}

export function chapterUrl(bookCode, chapter) {
  return `https://ncert.nic.in/textbook/pdf/${chapterFileName(bookCode, chapter)}`;
}
