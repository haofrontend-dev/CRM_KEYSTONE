import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/sections/NavbarServer'
import { Footer } from '@/components/sections/Footer'
import { getPayloadClient } from '@/lib/payload'
import { Reveal } from '@/components/ui/Reveal'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'
import { Icon } from '@/components/ui/Icon'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export const metadata: Metadata = {
  title: 'Tìm kiếm | KEYSTONE',
  description: 'Tìm bài viết, sự kiện, dịch vụ và khoá học từ KEYSTONE.',
}

type Hit = {
  kind: 'post' | 'event' | 'service' | 'page'
  title: string
  href: string
  excerpt?: string | null
  thumbnail?: MediaRel
  meta?: string | null
}

const KIND_LABEL: Record<Hit['kind'], string> = {
  post: 'Bài viết',
  event: 'Sự kiện',
  service: 'Dịch vụ',
  page: 'Trang',
}

const KIND_COLOR: Record<Hit['kind'], string> = {
  post: 'bg-gold-500/10 text-gold-600',
  event: 'bg-emerald-500/10 text-emerald-600',
  service: 'bg-blue-500/10 text-blue-600',
  page: 'bg-navy-900/10 text-navy-900',
}

async function search(q: string): Promise<Hit[]> {
  const payload = await getPayloadClient()
  const like = { like: q }

  const [posts, events, services, pages] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { or: [{ title: like }, { excerpt: like }] },
      limit: 20,
      depth: 1,
    }),
    payload.find({
      collection: 'events',
      where: { or: [{ title: like }, { excerpt: like }] },
      limit: 20,
      depth: 1,
    }),
    payload.find({
      collection: 'services',
      where: { or: [{ title: like }, { shortDescription: like }] },
      limit: 20,
      depth: 1,
    }),
    payload.find({
      collection: 'pages',
      where: { title: like },
      limit: 20,
      depth: 0,
    }),
  ])

  const hits: Hit[] = []
  for (const p of posts.docs as unknown as Array<{
    title: string
    slug?: string
    excerpt?: string
    thumbnail?: MediaRel
    publishedAt?: string
  }>) {
    hits.push({
      kind: 'post',
      title: p.title,
      href: `/tin-tuc/${p.slug ?? ''}`,
      excerpt: p.excerpt ?? null,
      thumbnail: p.thumbnail,
      meta: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString('vi-VN')
        : null,
    })
  }
  for (const e of events.docs as unknown as Array<{
    title: string
    slug?: string
    excerpt?: string
    thumbnail?: MediaRel
    eventDate?: string
  }>) {
    hits.push({
      kind: 'event',
      title: e.title,
      href: `/public-event/${e.slug ?? ''}`,
      excerpt: e.excerpt ?? null,
      thumbnail: e.thumbnail,
      meta: e.eventDate ? new Date(e.eventDate).toLocaleDateString('vi-VN') : null,
    })
  }
  for (const s of services.docs as unknown as Array<{
    title: string
    slug?: string
    shortDescription?: string
    icon?: MediaRel
  }>) {
    hits.push({
      kind: 'service',
      title: s.title,
      href: `/${s.slug ?? ''}`,
      excerpt: s.shortDescription ?? null,
      thumbnail: s.icon,
    })
  }
  for (const pg of pages.docs as unknown as Array<{ title: string; slug?: string }>) {
    hits.push({
      kind: 'page',
      title: pg.title,
      href: `/${pg.slug ?? ''}`,
    })
  }
  return hits
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParams
  const q = typeof sp.q === 'string' ? sp.q.trim() : ''
  const hits = q ? await search(q) : []

  const counts = {
    post: hits.filter((h) => h.kind === 'post').length,
    event: hits.filter((h) => h.kind === 'event').length,
    service: hits.filter((h) => h.kind === 'service').length,
    page: hits.filter((h) => h.kind === 'page').length,
  }

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50">
        {/* Hero */}
        <section className="relative bg-navy-900 py-14 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,181,0,0.15),transparent_50%)]" />
          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal>
              <nav className="text-sm text-white/60 mb-5">
                <Link href="/" className="hover:text-gold-400 transition">Trang chủ</Link>
                <span className="mx-2">›</span>
                <span className="text-gold-400">Tìm kiếm</span>
              </nav>
              <h1 className="font-serif text-3xl lg:text-5xl font-extrabold text-white leading-tight">
                {q ? (
                  <>Kết quả tìm kiếm cho <span className="text-gold-400">"{q}"</span></>
                ) : (
                  'Tìm kiếm'
                )}
              </h1>
              <form
                action="/search"
                method="get"
                className="mt-7 relative max-w-2xl"
              >
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Nhập từ khoá..."
                  className="w-full h-14 pl-12 pr-32 rounded-2xl bg-white text-navy-900 placeholder:text-navy-900/30 focus:outline-none focus:ring-4 focus:ring-gold-500/30 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)]"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-900/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 rounded-xl bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white font-bold text-sm uppercase tracking-wider transition"
                >
                  Tìm
                </button>
              </form>
              {q && (
                <p className="mt-5 text-white/70 text-sm">
                  Tìm thấy <span className="text-gold-400 font-bold">{hits.length}</span> kết quả
                  {' '}({counts.post} bài viết · {counts.event} sự kiện · {counts.service} dịch vụ · {counts.page} trang)
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            {!q ? (
              <EmptyState title="Nhập từ khoá để bắt đầu" body="Tìm bài viết, sự kiện, dịch vụ và khoá học từ KEYSTONE." />
            ) : hits.length === 0 ? (
              <EmptyState
                title="Không tìm thấy kết quả"
                body={`Không có nội dung nào khớp với "${q}". Hãy thử từ khoá khác.`}
              />
            ) : (
              <div className="space-y-4">
                {hits.map((hit, i) => (
                  <Reveal key={`${hit.kind}-${i}`}>
                    <ResultCard hit={hit} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ResultCard({ hit }: { hit: Hit }) {
  const url = resolveMediaUrl(hit.thumbnail)
  return (
    <Link
      href={hit.href}
      className="group flex flex-col sm:flex-row gap-0 bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-8px_rgba(10,31,60,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(10,31,60,0.2)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-navy-900/5"
    >
      <div className="relative w-full sm:w-[200px] shrink-0 aspect-video sm:aspect-auto sm:min-h-[140px] bg-navy-900/5 overflow-hidden">
        {url ? (
          <Image
            src={url}
            alt={hit.title}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-navy-900/15 text-5xl font-bold">
            {hit.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 p-5 sm:p-6 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${KIND_COLOR[hit.kind]}`}>
            {KIND_LABEL[hit.kind]}
          </span>
          {hit.meta && (
            <span className="text-xs text-navy-900/40">{hit.meta}</span>
          )}
        </div>
        <h3 className="font-serif text-lg lg:text-xl font-bold text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-600 transition">
          {hit.title}
        </h3>
        {hit.excerpt && (
          <p className="mt-2 text-sm text-navy-900/60 line-clamp-2">{hit.excerpt}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
          Xem chi tiết
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center py-16 lg:py-24">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-500/10 text-gold-500 mb-6">
        <Icon name="spark" size={32} />
      </div>
      <h2 className="font-serif text-2xl lg:text-3xl font-extrabold text-navy-900 mb-3">{title}</h2>
      <p className="text-navy-900/60 max-w-md mx-auto">{body}</p>
    </div>
  )
}
