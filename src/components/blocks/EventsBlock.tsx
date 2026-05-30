import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from './types'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { Pagination } from '@/components/ui/Pagination'
import { EventSidebar } from './EventSidebar'

type Event = {
  id: number | string
  title: string
  slug?: string | null
  excerpt?: string | null
  categories?: string[] | null
  eventDate?: string | null
  location?: string | null
  thumbnail?: MediaRel
}

const categoryLabels: Record<string, string> = {
  'cong-nghe': 'Công nghệ',
  'groups': 'GROUPs',
  'hop-tac': 'Hợp tác',
  'chuong-trinh-moi': 'Chương trình mới',
  'tu-duy-va-cong-cu': 'Tư duy và công cụ',
  'hr': 'HR',
  'learning-development': 'Learning & Development',
}

export type EventsBlockData = {
  eyebrow?: string | null
  title?: string | null
  perPage?: number | null
  showSidebar?: boolean | null
  currentPage?: number
  catFilter?: string | null
  pageBasePath?: string
}

export async function EventsBlock(p: EventsBlockData) {
  const perPage = p.perPage ?? 6
  const currentPage = Math.max(1, p.currentPage ?? 1)
  const catFilter = p.catFilter ?? null
  const showSidebar = p.showSidebar !== false
  const basePath = p.pageBasePath ?? '/public-event'

  const payload = await getPayloadClient()

  const where = {
    status: { equals: 'published' },
    ...(catFilter ? { categories: { contains: catFilter } } : {}),
  }

  const res = await payload.find({
    collection: 'events',
    sort: '-eventDate',
    limit: perPage,
    page: currentPage,
    depth: 1,
    where,
  })

  const events = res.docs as unknown as Event[]
  const totalPages = res.totalPages ?? 1

  const allRes = await payload.find({
    collection: 'events',
    limit: 200,
    where: { status: { equals: 'published' } },
  })
  const allEvents = allRes.docs as unknown as Event[]

  const archiveYears: Record<string, string[]> = {}
  for (let y = 2026; y >= 2019; y--) archiveYears[String(y)] = []
  allEvents.forEach((ev) => {
    if (ev.eventDate) {
      const d = new Date(ev.eventDate)
      const year = d.getFullYear().toString()
      const month = `${d.getMonth() + 1}/${year}`
      if (archiveYears[year] && !archiveYears[year].includes(month)) {
        archiveYears[year].push(month)
      }
    }
  })

  const catCounts: Record<string, number> = {}
  allEvents.forEach((ev) => {
    (ev.categories ?? []).forEach((c) => {
      catCounts[c] = (catCounts[c] ?? 0) + 1
    })
  })

  const sidebarCategories = [
    { label: 'Tất cả sự kiện', slug: '', count: allEvents.length },
    { label: 'Công nghệ', slug: 'cong-nghe', count: catCounts['cong-nghe'] ?? 0 },
    { label: 'GROUPs', slug: 'groups', count: catCounts['groups'] ?? 0 },
    { label: 'Tư duy và công cụ', slug: 'tu-duy-va-cong-cu', count: catCounts['tu-duy-va-cong-cu'] ?? 0 },
    { label: 'Hợp tác', slug: 'hop-tac', count: catCounts['hop-tac'] ?? 0 },
    { label: 'Chương trình mới', slug: 'chuong-trinh-moi', count: catCounts['chuong-trinh-moi'] ?? 0 },
  ]

  return (
    <section className="bg-neutral-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {(p.eyebrow || p.title) && (
          <Reveal className="mb-10">
            {p.eyebrow && (
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
                <Icon name="spark" size={14} /> {p.eyebrow}
              </span>
            )}
            {p.title && (
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900 leading-[1.1]">
                {p.title}
              </h2>
            )}
          </Reveal>
        )}

        <div className={`grid gap-10 ${showSidebar ? 'lg:grid-cols-[1fr_360px]' : ''}`}>
          <div className="space-y-6">
            {events.length === 0 ? (
              <div className="text-center py-20 text-navy-900/50">
                <p className="text-lg">Chưa có sự kiện nào.</p>
              </div>
            ) : (
              events.map((ev) => {
                const url = resolveMediaUrl(ev.thumbnail)
                const date = ev.eventDate ? new Date(ev.eventDate) : null
                const dayNum = date ? date.getDate() : null
                const monthLabel = date
                  ? date.toLocaleDateString('vi-VN', { month: 'short' })
                  : null

                return (
                  <Reveal key={String(ev.id)}>
                    <Link
                      href={`/public-event/${ev.slug ?? ev.id}`}
                      className="group flex flex-col sm:flex-row gap-0 bg-white rounded-2xl overflow-hidden shadow-(--shadow-soft) hover:shadow-(--shadow-premium) transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative w-full sm:w-[280px] shrink-0 aspect-video sm:aspect-auto sm:min-h-[200px] overflow-hidden bg-navy-900/5">
                        {url ? (
                          <Image
                            src={url}
                            alt={ev.title}
                            fill
                            sizes="280px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy-900/20 text-5xl font-bold">
                            📅
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center p-5 sm:py-5 sm:pr-6 sm:pl-6 flex-1">
                        <div className="flex items-start gap-4">
                          {dayNum && monthLabel && (
                            <div className="shrink-0 w-14 h-14 rounded-xl bg-navy-900 text-white flex flex-col items-center justify-center leading-none">
                              <span className="text-lg font-bold">{dayNum}</span>
                              <span className="text-[10px] uppercase tracking-wider opacity-70">{monthLabel}</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-lg font-bold text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-500 transition">
                              {ev.title}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {(ev.categories ?? []).map((cat) => (
                                <span
                                  key={cat}
                                  className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-600 px-2 py-0.5 rounded-full"
                                >
                                  {categoryLabels[cat] ?? cat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {ev.location && (
                          <p className="mt-3 text-sm text-navy-900/50 flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {ev.location}
                          </p>
                        )}
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                          Xem thêm
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                )
              })
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={basePath}
              searchParams={{ cat: catFilter ?? undefined }}
            />
          </div>

          {showSidebar && (
            <EventSidebar
              categories={sidebarCategories}
              archiveYears={archiveYears}
              activeCat={catFilter}
            />
          )}
        </div>
      </div>
    </section>
  )
}
