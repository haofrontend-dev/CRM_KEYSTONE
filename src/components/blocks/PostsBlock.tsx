import Link from 'next/link'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from './types'
import { PostCard, type SerializedPost } from './PostCard'
import { PostsSlider } from '@/components/blocks/PostsSlider'
import { Pagination } from '@/components/ui/Pagination'

type Post = {
  id: number | string
  title: string
  slug?: string | null
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  thumbnail?: MediaRel
}

export type PostsBlockData = {
  eyebrow?: string | null
  title?: string | null
  display?: 'grid' | 'slider' | null
  limit?: number | null
  pinned?: (Post | number | string)[] | null
  paginate?: boolean | null
  ctaLabel?: string | null
  ctaHref?: string | null
  autoplay?: boolean | null
  autoplaySpeed?: number | null
  loop?: boolean | null
  slidesPerView?: number | null
  currentPage?: number
  pageBasePath?: string
}

const categoryLabels: Record<string, string> = {
  'tin-tuc': 'Tin tức',
  'su-kien': 'Sự kiện',
  'kien-thuc': 'Kiến thức',
}

export async function PostsBlock(p: PostsBlockData) {
  const limit = p.limit ?? 3
  const mode = p.display ?? 'grid'
  const paginate = Boolean(p.paginate) && mode === 'grid'
  const currentPage = paginate ? Math.max(1, p.currentPage ?? 1) : 1
  let docs: Post[] = []
  let totalPages = 1

  const pinned = (p.pinned ?? []).filter(
    (it): it is Post => typeof it === 'object' && it !== null,
  )

  if (pinned.length > 0) {
    docs = pinned.slice(0, limit)
  } else {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      sort: '-publishedAt',
      limit,
      page: currentPage,
      where: { status: { equals: 'published' } },
    })
    docs = res.docs as unknown as Post[]
    totalPages = res.totalPages ?? 1
    if (docs.length === 0 && currentPage === 1) {
      const fallback = await payload.find({ collection: 'posts', limit, sort: '-createdAt' })
      docs = fallback.docs as unknown as Post[]
      totalPages = fallback.totalPages ?? 1
    }
  }

  if (docs.length === 0) return null

  const serialized: SerializedPost[] = docs.map((post) => ({
    id: String(post.id),
    title: post.title,
    slug: post.slug ?? null,
    excerpt: post.excerpt ?? null,
    category: post.category ?? null,
    categoryLabel: post.category ? (categoryLabels[post.category] ?? post.category) : null,
    publishedAt: post.publishedAt ?? null,
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      : null,
    thumbnailUrl: resolveMediaUrl(post.thumbnail),
  }))

  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {p.eyebrow && (
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
                <Icon name="spark" size={14} /> {p.eyebrow}
              </span>
            )}
            {p.title && (
              <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900 leading-[1.1]">
                {p.title}
              </h2>
            )}
          </div>
          {p.ctaLabel && (
            <Link
              href={p.ctaHref ?? '/blog'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400 transition"
            >
              {p.ctaLabel}
              <Icon name="arrow-right" size={16} />
            </Link>
          )}
        </Reveal>

        {mode === 'slider' ? (
          <PostsSlider
            posts={serialized}
            autoplay={p.autoplay ?? false}
            autoplaySpeed={p.autoplaySpeed ?? 4000}
            loop={p.loop ?? true}
            slidesPerView={p.slidesPerView ?? 3}
          />
        ) : (
          <>
            <StaggerGroup className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serialized.map((post) => (
                <StaggerItem key={post.id}>
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            {paginate && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={p.pageBasePath ?? '/blog'}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}
