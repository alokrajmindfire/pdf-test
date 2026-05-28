import { BookOpen, FlaskConical, GraduationCap, Library, ListTree, Search, Settings2 } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: BookOpen, end: true },
  { to: '/classes', label: 'By Class', icon: GraduationCap },
  { to: '/library', label: 'Library (Paginated)', icon: Library },
  { to: '/search', label: 'Advanced Search', icon: Search },
  { to: '/resources', label: 'More Options', icon: Settings2 },
  { to: '/archive', label: 'Archive', icon: FlaskConical },
  { to: '/sitemap', label: 'Sitemap', icon: ListTree },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-800 text-lg leading-tight block">
                  Science PDF Crawl Lab
                </span>
                <span className="text-xs text-slate-500">Class-wise study materials for testing</span>
              </div>
            </Link>
            <nav className="flex flex-wrap gap-1" aria-label="Main navigation">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-600">
          <p className="mb-3 font-medium text-slate-800">Footer links (crawler test)</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li>
              <Link to="/classes/10" className="text-indigo-600 hover:underline">
                Class 10 materials
              </Link>
            </li>
            <li>
              <Link to="/library?page=2" className="text-indigo-600 hover:underline">
                Library page 2
              </Link>
            </li>
            <li>
              <Link to="/search?subject=biology" className="text-indigo-600 hover:underline">
                Biology search
              </Link>
            </li>
            <li>
              <a href="/documents/test.pdf" className="text-indigo-600 hover:underline">
                Direct PDF (test file)
              </a>
            </li>
            <li>
              <Link to="/sitemap" className="text-indigo-600 hover:underline">
                Full sitemap
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-400">Testing site — not affiliated with NCERT or any board.</p>
        </div>
      </footer>
    </div>
  );
}
