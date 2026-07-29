import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/sections/NavbarServer'
import { Footer } from '@/components/sections/Footer'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Chia sẻ — Sharing & Growing | KEYSTONE',
  description: 'Chia sẻ kiến thức, kinh nghiệm và bài học từ KEYSTONE. Sharing and Growing together.',
}

type Post = {
  id: number | string
  title: string
  slug?: string | null
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  thumbnail?: MediaRel
}

const categoryLabels: Record<string, string> = {
  'tin-tuc': 'Tin tức',
  'su-kien': 'Sự kiện',
  'kien-thuc': 'Kiến thức',
}

export default async function ChiaSePage() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 20,
    depth: 1,
  })
  const posts = res.docs as unknown as Post[]

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-navy-900 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[url('/content/hinh/image/page-title-1.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <h1 className="font-serif text-3xl lg:text-5xl font-extrabold text-white">Chia sẻ</h1>
              <p className="mt-3 text-lg text-white/60">Sharing and Growing</p>
              <nav className="mt-4 text-sm text-white/60">
                <Link href="/" className="hover:text-gold-500 transition">Trang chủ</Link>
                <span className="mx-2">›</span>
                <span className="text-gold-500">Chia sẻ</span>
              </nav>
            </Reveal>
          </div>
        </section>

        <section className="bg-neutral-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            {posts.length === 0 ? (
              <p className="text-center py-20 text-navy-900/50 text-lg">Chưa có bài viết nào.</p>
            ) : (
              <StaggerGroup className="grid sm:grid-cols-2 gap-8">
                {posts.map((post) => {
                  const url = resolveMediaUrl(post.thumbnail)
                  const date = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
                    : null
                  return (
                    <StaggerItem key={String(post.id)}>
                      <Link
                        href={`/tin-tuc/${post.slug ?? post.id}`}
                        className="group flex flex-col sm:flex-row gap-0 bg-white rounded-2xl overflow-hidden shadow-(--shadow-soft) hover:shadow-(--shadow-premium) transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="relative w-full sm:w-[240px] shrink-0 aspect-video sm:aspect-auto sm:min-h-[180px] overflow-hidden bg-navy-900/5">
                          {url ? (
                            <Image src={url} alt={post.title} fill sizes="240px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-navy-900/10 text-5xl font-bold">{post.title.charAt(0)}</div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center p-5 flex-1">
                          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
                            {post.category && <span className="text-gold-500">{categoryLabels[post.category] ?? post.category}</span>}
                            {date && <span className="text-navy-900/40">{date}</span>}
                          </div>
                          <h3 className="mt-2 font-serif text-base font-bold text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-500 transition">{post.title}</h3>
                          {post.excerpt && <p className="mt-2 text-sm text-navy-900/60 line-clamp-2">{post.excerpt}</p>}
                          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                            Đọc thêm <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  )
                })}
              </StaggerGroup>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
