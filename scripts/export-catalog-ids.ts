import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_MATERIALS } from '../src/data/documents';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'scripts', 'catalog-ids.json');
const ids = ALL_MATERIALS.map((m) => m.id);
writeFileSync(out, JSON.stringify(ids, null, 2));
console.log(`Wrote ${ids.length} material IDs to ${out}`);
