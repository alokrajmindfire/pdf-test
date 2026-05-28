import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

async function rmSafe(relPath) {
  const abs = path.join(ROOT, relPath);
  try {
    await fs.rm(abs, { recursive: true, force: true });
    console.log(`Removed: ${relPath}`);
  } catch (err) {
    console.warn(`Skip: ${relPath}`);
    console.warn(err);
  }
}

await rmSafe('src/assets/science');
await rmSafe('public/pdf');

console.log('Done.');

