'use client'

import { useState } from 'react'
import Link from 'next/link'

type Props = {
  categories: Array<{ label: string; slug: string; count: number }>
  archiveYears: Record<string, string[]>
  activeCat?: string | null
}

export function EventSidebar({ categories, archiveYears, activeCat }: Props) {
  const [search, setSearch] = useState('')
  const [openYear, setOpenYear] = useState<string | null>(
    Object.keys(archiveYears).sort((a, b) => +b - +a)[0] ?? null,
  )

  const years = Object.keys(archiveYears).sort((a, b) => +b - +a)

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="rounded-2xl bg-white p-5 shadow-(--shadow-soft)">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (search.trim()) window.location.href = `/public-event?q=${encodeURIComponent(search)}`
          }}
          className="flex items-center gap-2"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sự kiện..."
            className="flex-1 rounded-xl border border-navy-900/10 bg-neutral-50 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-navy-900 text-white inline-flex items-center justify-center hover:bg-gold-500 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="rounded-2xl bg-white p-6 shadow-(--shadow-soft)">
        <h3 className="font-serif text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-gold-500 rounded" />
          Danh mục
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => {
            const isActive = activeCat === cat.slug || (!activeCat && cat.slug === '')
            return (
              <li key={cat.slug}>
                <Link
                  href={cat.slug ? `/public-event?cat=${cat.slug}` : '/public-event'}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition group ${
                    isActive
                      ? 'bg-gold-500/15 text-navy-900 font-semibold'
                      : 'text-navy-900/70 hover:bg-gold-500/10 hover:text-navy-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition ${
                      isActive ? 'bg-gold-500' : 'bg-gold-500 opacity-0 group-hover:opacity-100'
                    }`} />
                    {cat.label}
                  </span>
                  <span className="text-xs font-semibold text-navy-900/30 bg-navy-900/5 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Archives */}
      <div className="rounded-2xl bg-white p-6 shadow-(--shadow-soft)">
        <h3 className="font-serif text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-gold-500 rounded" />
          Archives
        </h3>
        <div className="space-y-1">
          {years.map((year) => (
            <div key={year}>
              <button
                type="button"
                onClick={() => setOpenYear(openYear === year ? null : year)}
                className="flex items-center justify-between w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-gold-500/10 transition"
              >
                <span className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-lg inline-flex items-center justify-center text-xs font-bold transition ${openYear === year ? 'bg-gold-500 text-navy-900' : 'bg-navy-900/10 text-navy-900/60'}`}>
                    {openYear === year ? '−' : '+'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-500">
                    <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  {year}
                </span>
              </button>
              {openYear === year && archiveYears[year].length > 0 && (
                <ul className="ml-12 mt-1 mb-2 space-y-0.5">
                  {archiveYears[year].map((month) => (
                    <li key={month}>
                      <span className="block px-3 py-1.5 text-sm text-gold-500">
                        {month}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {openYear === year && archiveYears[year].length === 0 && (
                <p className="ml-12 mt-1 mb-2 text-xs text-navy-900/30 italic">Chưa có sự kiện</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
