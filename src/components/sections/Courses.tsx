'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { blogPosts } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'

export function Courses() {
  const scroller = useRef<HTMLDivElement>(null)
  const scroll = (dir: -1 | 1) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  // Show first 6 blog posts as "featured"
  const featured = blogPosts.slice(0, 6)

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
              <Icon name="spark" size={14} /> Bài viết mới
            </span>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.05]">
              Tin tức & Chia sẻ
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <NavBtn dir="left" onClick={() => scroll(-1)} />
            <NavBtn dir="right" onClick={() => scroll(1)} />
          </div>
        </Reveal>

        <div
          ref={scroller}
          className="mt-10 grid grid-flow-col auto-cols-[85%] sm:auto-cols-[55%] lg:auto-cols-[calc(33.333%-14px)] gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {featured.map((c) => (
            <article
              key={c.slug}
              className="group snap-start overflow-hidden rounded-[20px] bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-premium)]"
            >
              <Link href={`/blog/${c.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[16px] font-bold text-navy-900 leading-snug line-clamp-2 min-h-[48px]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-900/60 line-clamp-2 leading-relaxed">
                    {c.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-500 hover:text-gold-400 transition">
                    Đọc thêm
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-[10px] border border-navy-900/15 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white"
          >
            Xem tất cả bài viết <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function NavBtn({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-navy-900/15 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition"
      aria-label={dir === 'left' ? 'Trước' : 'Tiếp'}
    >
      <Icon name={dir === 'left' ? 'chevron-left' : 'chevron-right'} size={18} />
    </button>
  )
}
