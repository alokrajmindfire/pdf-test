import type { Language } from '../types/document';
import enManifest from '../../scripts/ncert-manifest.json';
import hiManifest from '../../scripts/ncert-manifest-hi.json';

export interface ManifestEntry {
  file: string;
  url: string;
  book: string;
  chapter: number;
  lang?: Language;
}

const en = (enManifest as ManifestEntry[]).map((e) => ({ ...e, lang: 'en' as const }));
const hi = (hiManifest as ManifestEntry[]).map((e) => ({ ...e, lang: 'hi' as const }));

export const NCERT_MANIFEST: ManifestEntry[] = [...en, ...hi];
