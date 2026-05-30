import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string | undefined>
}

function buildHref(basePath: string, page: number, extra?: Record<string, string | undefined>) {
  const params = new URLSearchParams()
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (v) params.set(k, v)
    }
  }
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

function pageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | 'ellipsis')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('ellipsis')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('ellipsis')
  pages.push(total)
  return pages
}

export function Pagination({ currentPage, totalPages, basePath, searchParams }: Props) {
  if (totalPages <= 1) return null
  const pages = pageRange(currentPage, totalPages)
  const prevHref = currentPage > 1 ? buildHref(basePath, currentPage - 1, searchParams) : null
  const nextHref = currentPage < totalPages ? buildHref(basePath, currentPage + 1, searchParams) : null

  const baseBtn =
    'inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg text-sm font-semibold transition border'
  const inactive =
    'bg-white text-navy-900/75 border-navy-900/10 hover:border-gold-500/50 hover:text-gold-600 hover:bg-gold-500/5'
  const active =
    'bg-navy-900 text-white border-navy-900 shadow-[0_6px_20px_-8px_rgba(10,31,60,0.4)]'
  const disabled = 'opacity-40 cursor-not-allowed bg-white text-navy-900/40 border-navy-900/10'

  return (
    <nav
      aria-label="Phân trang"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {prevHref ? (
        <Link href={prevHref} className={`${baseBtn} ${inactive}`} aria-label="Trang trước">
          ← <span className="hidden sm:inline ml-1">Trước</span>
        </Link>
      ) : (
        <span className={`${baseBtn} ${disabled}`} aria-disabled>
          ← <span className="hidden sm:inline ml-1">Trước</span>
        </span>
      )}

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span
            key={`e-${i}`}
            className="inline-flex items-center justify-center min-w-[40px] h-10 text-navy-900/40"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(basePath, p, searchParams)}
            className={`${baseBtn} ${p === currentPage ? active : inactive}`}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </Link>
        ),
      )}

      {nextHref ? (
        <Link href={nextHref} className={`${baseBtn} ${inactive}`} aria-label="Trang sau">
          <span className="hidden sm:inline mr-1">Sau</span> →
        </Link>
      ) : (
        <span className={`${baseBtn} ${disabled}`} aria-disabled>
          <span className="hidden sm:inline mr-1">Sau</span> →
        </span>
      )}
    </nav>
  )
}
