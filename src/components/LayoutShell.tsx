'use client';

import { BookOpen, GraduationCap, Library, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SiteFooter } from './SiteFooter';

const navItems = [
  { to: '/', label: 'Home', icon: BookOpen },
  { to: '/classes', label: 'Classes', icon: GraduationCap },
  { to: '/library', label: 'All Chapters', icon: Library },
  { to: '/search', label: 'Search', icon: Search },
] as const;

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const hideFooter = pathname.startsWith('/read/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 rounded-xl">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg leading-tight block">NCERT Study Hub</span>
                  <span className="text-xs text-slate-500">Free textbooks · Classes 6–12</span>
                </div>
              </Link>
              <LanguageSwitcher />
            </div>

            <nav className="grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-1 gap-2" aria-label="Main">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = pathname === to;
                return (
                  <Link
                    key={to}
                    href={to}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/references"
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === '/references' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                References
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">{children}</main>

      {!hideFooter && <SiteFooter />}
    </div>
  );
}

