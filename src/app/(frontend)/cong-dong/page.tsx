import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Cộng đồng — KEYSTONE Community',
  description: 'Cộng đồng KEYSTONE: Kết nối, chia sẻ và phát triển cùng các chuyên gia đào tạo và quản lý.',
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

export default async function CongDongPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 20,
    depth: 1,
    where: { category: { equals: 'kien-thuc' } },
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
              <h1 className="font-serif text-3xl lg:text-5xl font-extrabold text-white">Cộng đồng</h1>
              <nav className="mt-4 text-sm text-white/60">
                <Link href="/" className="hover:text-gold-500 transition">Trang chủ</Link>
                <span className="mx-2">›</span>
                <span className="text-gold-500">Cộng đồng</span>
              </nav>
            </Reveal>
          </div>
        </section>

        <section className="bg-neutral-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mb-12 text-center">
              <p className="text-lg text-navy-900/60 max-w-2xl mx-auto">
                Tham gia cộng đồng KEYSTONE để kết nối, chia sẻ kiến thức và phát triển nghề nghiệp cùng các chuyên gia trong lĩnh vực đào tạo và quản lý.
              </p>
            </Reveal>

            {posts.length === 0 ? (
              <p className="text-center py-20 text-navy-900/50 text-lg">Chưa có bài viết nào.</p>
            ) : (
              <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const url = resolveMediaUrl(post.thumbnail)
                  const date = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : null
                  return (
                    <StaggerItem key={String(post.id)}>
                      <Link
                        href={`/tin-tuc/${post.slug ?? post.id}`}
                        className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-(--shadow-soft) hover:shadow-(--shadow-premium) transition-all duration-300 hover:-translate-y-1 h-full"
                      >
                        <div className="relative w-full aspect-video overflow-hidden bg-navy-900/5">
                          {url ? (
                            <Image src={url} alt={post.title} fill sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-navy-900/10 text-6xl font-bold">{post.title.charAt(0)}</div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
                            <span className="text-gold-500">Kiến thức</span>
                            {date && <span className="text-navy-900/40">{date}</span>}
                          </div>
                          <h3 className="mt-2 font-serif text-lg font-bold text-navy-900 leading-snug line-clamp-2 group-hover:text-gold-500 transition flex-1">{post.title}</h3>
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
