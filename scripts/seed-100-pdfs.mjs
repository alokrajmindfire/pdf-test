import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const COUNT = 100;

function abs(...parts) {
  return path.join(ROOT, ...parts);
}

async function ensureEmptyDir(dirAbs) {
  await fs.mkdir(dirAbs, { recursive: true });
  const entries = await fs.readdir(dirAbs);
  await Promise.all(entries.map((e) => fs.rm(path.join(dirAbs, e), { recursive: true, force: true })));
}

async function listPdfs(dirAbs) {
  const entries = await fs.readdir(dirAbs, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.pdf'))
    .map((e) => path.join(dirAbs, e.name));
}

async function linkOrCopy(src, dest) {
  await fs.rm(dest, { force: true });
  try {
    await fs.link(src, dest);
  } catch {
    await fs.copyFile(src, dest);
  }
}

async function rmPdfFilesInDir(dirAbs) {
  try {
    const entries = await fs.readdir(dirAbs, { withFileTypes: true });
    await Promise.all(
      entries.map(async (e) => {
        const p = path.join(dirAbs, e.name);
        if (e.isDirectory()) {
          await rmPdfFilesInDir(p);
          return;
        }
        if (e.isFile() && e.name.toLowerCase().endsWith('.pdf')) {
          await fs.rm(p, { force: true });
        }
      }),
    );
  } catch {
    // ignore missing
  }
}

// 1) Load the first 100 ids
const idsPath = abs('scripts', 'catalog-ids.json');
const idsRaw = await fs.readFile(idsPath, 'utf8');
const ids = JSON.parse(idsRaw);
if (!Array.isArray(ids)) throw new Error(`Expected array in ${idsPath}`);
const docIds = ids.slice(0, COUNT);
if (docIds.length !== COUNT) throw new Error(`Need ${COUNT} ids, got ${docIds.length}`);

// 2) Pick source PDFs from src/assets/science (any 100, cycled if needed)
const scienceDir = abs('src', 'assets', 'science');
const sources = await listPdfs(scienceDir);
if (sources.length === 0) {
  throw new Error(`No source PDFs found in ${scienceDir}. Put PDFs there first or skip seeding.`);
}

// 3) Create exactly 100 PDFs in public/pdf/<id>.pdf
const publicPdfDir = abs('public', 'pdf');
await ensureEmptyDir(publicPdfDir);

for (let i = 0; i < COUNT; i++) {
  const id = String(docIds[i]);
  const src = sources[i % sources.length];
  const dest = path.join(publicPdfDir, `${id}.pdf`);
  await linkOrCopy(src, dest);
}

// 4) Delete all PDFs from src/assets/** and public/documents/**
await rmPdfFilesInDir(abs('src', 'assets'));
await rmPdfFilesInDir(abs('public', 'documents'));

console.log(`Seeded ${COUNT} PDFs in public/pdf and removed PDFs from src/assets + public/documents.`);

