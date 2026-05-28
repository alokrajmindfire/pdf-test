'use client';

import { ExternalLink, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { NCERT_SOURCE, SENIOR_CLASSES } from '../types/document';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/classes', label: 'Classes' },
  { href: '/library', label: 'Library' },
  { href: '/search', label: 'Search' },
  { href: '/references', label: 'References' },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-slate-800 bg-gradient-to-r from-slate-950 to-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <Link href="/" className="inline-flex items-center gap-2 shrink-0 group">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 ring-1 ring-indigo-400/25">
              <GraduationCap className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <span className="font-semibold text-white text-sm leading-none block">NCERT Study Hub</span>
              <span className="text-[10px] text-slate-500">Classes 6–12 · EN / HI</span>
            </div>
          </Link>

          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:justify-center" aria-label="Footer">
            {quickLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <div className="text-xs sm:text-right sm:max-w-xs">
            <p className="text-slate-500 leading-snug mb-1">
              PDFs from <strong className="text-slate-400 font-medium">NCERT</strong> — not our content.
            </p>
            <p className="flex flex-wrap gap-x-3 gap-y-0.5 sm:justify-end">
              <a
                href={NCERT_SOURCE.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-indigo-300 hover:text-indigo-200"
              >
                ncert.nic.in
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={NCERT_SOURCE.textbooksPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-300 hover:text-indigo-200"
              >
                Textbooks
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-slate-500">
          <p>© {year} NCERT Study Hub · Educational use</p>
          <div className="flex flex-wrap gap-1.5 sm:justify-end">
            {SENIOR_CLASSES.map((c) => (
              <Link
                key={c}
                href={`/classes/${c}`}
                className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 ring-1 ring-white/8 hover:text-white hover:bg-white/10 transition-colors"
              >
                Class {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
