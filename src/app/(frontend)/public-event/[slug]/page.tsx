import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Params = Promise<{ slug: string }>

const categoryLabels: Record<string, string> = {
  'cong-nghe': 'Công nghệ',
  'groups': 'GROUPs',
  'hop-tac': 'Hợp tác',
  'chuong-trinh-moi': 'Chương trình mới',
  'tu-duy-va-cong-cu': 'Tư duy và công cụ',
  'hr': 'HR',
  'learning-development': 'Learning & Development',
}

async function fetchEvent(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] as unknown as {
    id: number | string
    title: string
    slug: string
    categories?: string[] | null
    eventDate?: string | null
    location?: string | null
    excerpt?: string | null
    content?: unknown
    thumbnail?: MediaRel
  } | undefined
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const ev = await fetchEvent(slug)
  if (!ev) return {}
  return {
    title: `${ev.title} | KEYSTONE Events`,
    description: ev.excerpt ?? `Sự kiện ${ev.title} tại ${ev.location ?? 'TPHCM'}`,
  }
}

export default async function EventDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const ev = await fetchEvent(slug)
  if (!ev) notFound()

  const url = resolveMediaUrl(ev.thumbnail)
  const date = ev.eventDate ? new Date(ev.eventDate) : null
  const dateStr = date
    ? date.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    : null

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-navy-900 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[url('/content/hinh/image/page-title-1.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <h1 className="font-serif text-2xl lg:text-4xl font-extrabold text-white leading-snug max-w-3xl">
                {ev.title}
              </h1>
              <nav className="mt-4 text-sm text-white/60">
                <Link href="/" className="hover:text-gold-500 transition">Trang chủ</Link>
                <span className="mx-2">›</span>
                <Link href="/public-event" className="hover:text-gold-500 transition">Events</Link>
                <span className="mx-2">›</span>
                <span className="text-gold-500 line-clamp-1">{ev.title}</span>
              </nav>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="bg-neutral-50 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {dateStr && (
                  <span className="inline-flex items-center gap-2 text-sm text-navy-900/60">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {dateStr}
                  </span>
                )}
                {ev.location && (
                  <span className="inline-flex items-center gap-2 text-sm text-navy-900/60">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {ev.location}
                  </span>
                )}
              </div>

              {/* Category tags */}
              {ev.categories && ev.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {ev.categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/public-event?cat=${cat}`}
                      className="inline-block text-xs font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-600 px-3 py-1 rounded-full hover:bg-gold-500/20 transition"
                    >
                      {categoryLabels[cat] ?? cat}
                    </Link>
                  ))}
                </div>
              )}

              {/* Thumbnail */}
              {url && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
                  <Image src={url} alt={ev.title} fill sizes="800px" className="object-cover" />
                </div>
              )}

              {/* Content */}
              {ev.content ? (
                <div className="prose prose-lg max-w-none">
                  <RichText data={ev.content as Parameters<typeof RichText>[0]['data']} />
                </div>
              ) : (
                <div className="text-navy-900/60 text-center py-10">
                  <p>Nội dung chi tiết sẽ được cập nhật sớm.</p>
                </div>
              )}

              {/* Back button */}
              <div className="mt-12 pt-8 border-t border-navy-900/10">
                <Link
                  href="/public-event"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400 transition"
                >
                  ← Quay lại tất cả sự kiện
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
