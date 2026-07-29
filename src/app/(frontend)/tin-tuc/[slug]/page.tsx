import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/sections/NavbarServer'
import { Footer } from '@/components/sections/Footer'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Params = Promise<{ slug: string }>

type Post = {
  id: number | string
  title: string
  slug: string
  category?: string | null
  excerpt?: string | null
  content?: unknown
  author?: string | null
  publishedAt?: string | null
  thumbnail?: MediaRel
}

const categoryLabels: Record<string, string> = {
  'tin-tuc': 'Tin tức',
  'su-kien': 'Sự kiện',
  'kien-thuc': 'Kiến thức',
}

async function fetchPost(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] as unknown as Post | undefined
}

async function fetchRelated(currentSlug: string, category?: string | null) {
  const payload = await getPayloadClient()
  const where = {
    slug: { not_equals: currentSlug },
    ...(category ? { category: { equals: category } } : {}),
  }
  const res = await payload.find({
    collection: 'posts',
    where,
    sort: '-publishedAt',
    limit: 5,
    depth: 1,
  })
  if (res.docs.length >= 3) return res.docs as unknown as Post[]
  const fallback = await payload.find({
    collection: 'posts',
    where: { slug: { not_equals: currentSlug } },
    sort: '-publishedAt',
    limit: 5,
    depth: 1,
  })
  return fallback.docs as unknown as Post[]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | KEYSTONE Blog`,
    description: post.excerpt ?? undefined,
  }
}

function formatDate(iso?: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) notFound()

  const url = resolveMediaUrl(post.thumbnail)
  const dateStr = formatDate(post.publishedAt)
  const categoryLabel = post.category ? (categoryLabels[post.category] ?? post.category) : null
  const related = await fetchRelated(post.slug, post.category)

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50">
        {/* Hero */}
        <section className="relative bg-navy-900 py-14 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/content/hinh/image/page-title-1.jpg')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/70 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <nav className="text-sm text-white/60 mb-5">
                <Link href="/" className="hover:text-gold-400 transition">Trang chủ</Link>
                <span className="mx-2">›</span>
                <Link href="/blog" className="hover:text-gold-400 transition">Blog</Link>
                <span className="mx-2">›</span>
                <span className="text-gold-400 line-clamp-1">{post.title}</span>
              </nav>
              {categoryLabel && (
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-navy-950 bg-gold-500 px-3 py-1.5 rounded-full mb-5">
                  {categoryLabel}
                </span>
              )}
              <h1 className="font-serif text-3xl lg:text-5xl font-extrabold text-white leading-[1.15] max-w-4xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                {post.author && (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 inline-flex items-center justify-center font-bold text-xs">
                      {post.author.charAt(0)}
                    </span>
                    {post.author}
                  </span>
                )}
                {dateStr && (
                  <span className="inline-flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {dateStr}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14">
            {/* Article */}
            <article className="min-w-0">
              <Reveal>
                {url && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-[0_20px_60px_-20px_rgba(10,31,60,0.25)]">
                    <Image src={url} alt={post.title} fill sizes="(max-width:1024px)100vw,800px" className="object-cover" priority />
                  </div>
                )}

                {post.excerpt && (
                  <p className="text-lg lg:text-xl text-navy-900/75 leading-relaxed font-medium border-l-4 border-gold-500 pl-5 mb-10">
                    {post.excerpt}
                  </p>
                )}

                {post.content ? (
                  <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                    <RichText data={post.content as Parameters<typeof RichText>[0]['data']} />
                  </div>
                ) : (
                  <div className="text-navy-900/60 py-8">
                    <p>Nội dung chi tiết sẽ được cập nhật sớm.</p>
                  </div>
                )}

                {/* Share + back */}
                <div className="mt-14 pt-8 border-t border-navy-900/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500 transition"
                  >
                    ← Quay lại Blog
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-navy-900/50 uppercase tracking-widest">
                    <span>Chia sẻ</span>
                    <span className="w-8 h-px bg-navy-900/15" />
                    {['facebook', 'twitter', 'linkedin'].map((s) => (
                      <span
                        key={s}
                        className="w-8 h-8 rounded-full inline-flex items-center justify-center bg-navy-900/5 hover:bg-gold-500/20 hover:text-gold-600 transition cursor-pointer"
                        aria-label={s}
                      >
                        <span className="capitalize text-[10px] font-bold">{s.charAt(0)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start space-y-8">
              {/* Related posts */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_-12px_rgba(10,31,60,0.12)]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 bg-gold-500 rounded-full" />
                  <h3 className="font-serif text-lg font-extrabold text-navy-900">Bài viết liên quan</h3>
                </div>
                <ul className="space-y-4">
                  {related.slice(0, 5).map((p) => {
                    const thumb = resolveMediaUrl(p.thumbnail)
                    return (
                      <li key={String(p.id)}>
                        <Link
                          href={`/tin-tuc/${p.slug}`}
                          className="group flex gap-3 items-start"
                        >
                          <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-navy-900/5">
                            {thumb ? (
                              <Image src={thumb} alt={p.title} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-navy-900/20 font-bold">
                                {p.title.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-600 transition">
                              {p.title}
                            </h4>
                            {p.publishedAt && (
                              <span className="mt-1 inline-block text-[11px] text-navy-900/50">
                                {formatDate(p.publishedAt)}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_-12px_rgba(10,31,60,0.12)]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 bg-gold-500 rounded-full" />
                  <h3 className="font-serif text-lg font-extrabold text-navy-900">Danh mục</h3>
                </div>
                <ul className="space-y-2">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <li key={key}>
                      <Link
                        href={`/blog?cat=${key}`}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                          post.category === key
                            ? 'bg-gold-500/10 text-gold-600'
                            : 'text-navy-900/75 hover:bg-neutral-100'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="text-xs opacity-60">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 p-6 text-white">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-500/20 blur-2xl" />
                <div className="relative">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400 mb-3">
                    Keystone
                  </span>
                  <h3 className="font-serif text-xl font-extrabold leading-snug mb-2">
                    Cần tư vấn đào tạo cho doanh nghiệp?
                  </h3>
                  <p className="text-sm text-white/70 mb-5">
                    Đội ngũ Keystone sẵn sàng đồng hành cùng bạn.
                  </p>
                  <Link
                    href="/lien-he"
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm px-4 py-2.5 rounded-full transition shadow-[0_8px_20px_-6px_rgba(250,181,0,0.5)]"
                  >
                    Liên hệ ngay
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
