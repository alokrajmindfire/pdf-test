/**
 * Downloads NCERT chapter PDFs from ncert.nic.in
 * English → public/ncert/en/
 * Hindi   → public/ncert/hi/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EN_BOOK_CODES, HI_BOOK_CODES, chapterFileName, chapterUrl } from './ncert-books.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MAX_CHAPTERS = 15;

async function headOk(url) {
  const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
  return res.ok;
}

async function discover(bookCodes) {
  const found = [];
  for (const book of bookCodes) {
    for (let ch = 1; ch <= MAX_CHAPTERS; ch++) {
      const file = chapterFileName(book, ch);
      const url = chapterUrl(book, ch);
      try {
        if (await headOk(url)) found.push({ file, url, book, chapter: ch });
      } catch {
        /* skip */
      }
    }
  }
  return found;
}

async function downloadOne(entry, outDir) {
  const dest = path.join(outDir, entry.file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    return { ...entry, skipped: true };
  }
  const res = await fetch(entry.url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${entry.url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { ...entry, skipped: false, bytes: buf.length };
}

async function downloadLang(lang, bookCodes, subdir) {
  const outDir = path.join(ROOT, 'public', 'ncert', subdir);
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\n[${lang}] Discovering…`);
  const manifest = await discover(bookCodes);
  console.log(`[${lang}] Found ${manifest.length} chapters → ${outDir}`);
  const manifestPath = path.join(ROOT, 'scripts', `ncert-manifest-${lang}.json`);
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(manifest.map((e) => ({ ...e, lang })), null, 2),
  );

  let i = 0;
  for (const entry of manifest) {
    const result = await downloadOne(entry, outDir);
    i += 1;
    const tag = result.skipped ? 'skip' : `${((result.bytes ?? 0) / 1024 / 1024).toFixed(1)} MB`;
    console.log(`[${lang}] [${i}/${manifest.length}] ${entry.file} (${tag})`);
  }
  return manifest.length;
}

async function main() {
  const only = process.argv[2];
  if (!only || only === 'en') await downloadLang('en', EN_BOOK_CODES, 'en');
  if (!only || only === 'hi') await downloadLang('hi', HI_BOOK_CODES, 'hi');
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
