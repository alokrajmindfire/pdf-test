import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  preserveParams?: string[];
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  preserveParams = [],
}: PaginationProps) {
  const searchParams = useSearchParams() ?? new URLSearchParams();

  function pageHref(page: number) {
    const params = new URLSearchParams();
    preserveParams.forEach((key) => {
      const v = searchParams.get(key);
      if (v) params.set(key, v);
    });
    params.set('page', String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : `${basePath}?page=${page}`;
  }

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-8" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          rel="prev"
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-100 text-slate-300 text-sm">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </span>
      )}

      {start > 1 && (
        <>
          <Link href={pageHref(1)} className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm">
            1
          </Link>
          {start > 2 && <span className="text-slate-400">…</span>}
        </>
      )}

      {pages.map((p) =>
        p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
          >
            {p}
          </Link>
        ),
      )}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-slate-400">…</span>}
          <Link
            href={pageHref(totalPages)}
            className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-sm"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          rel="next"
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-100 text-slate-300 text-sm">
          Next
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
