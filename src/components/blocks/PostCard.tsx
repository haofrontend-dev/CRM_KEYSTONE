import Image from 'next/image'
import Link from 'next/link'

export type SerializedPost = {
  id: string
  title: string
  slug: string | null
  excerpt: string | null
  category: string | null
  categoryLabel: string | null
  publishedAt: string | null
  date: string | null
  thumbnailUrl: string | null
}

export function PostCard({ post }: { post: SerializedPost }) {
  return (
    <Link
      href={post.slug ? `/tin-tuc/${post.slug}` : '#'}
      className="group block h-full overflow-hidden rounded-[20px] bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-premium)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-navy-900/5">
        {post.thumbnailUrl ? (
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-navy-900/20 text-4xl font-bold">
            {post.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
          {post.categoryLabel && (
            <span className="text-gold-500">{post.categoryLabel}</span>
          )}
          {post.date && <span className="text-navy-900/50">{post.date}</span>}
        </div>
        <h3 className="mt-3 font-serif text-lg font-bold text-navy-900 leading-snug line-clamp-2 transition group-hover:text-gold-500">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-navy-900/65 leading-[1.75] line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
          Đọc thêm
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
