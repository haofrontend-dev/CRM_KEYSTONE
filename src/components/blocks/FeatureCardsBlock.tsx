import Image from 'next/image'
import Link from 'next/link'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { resolveMediaUrl, type MediaRel } from './types'

type Item = {
  image?: MediaRel
  imageUrl?: string | null
  title: string
  body?: string | null
  linkLabel?: string | null
  linkHref?: string | null
}

export type FeatureCardsBlockData = {
  eyebrow?: string | null
  title?: string | null
  items?: Item[] | null
}

// Chỉ cho phép link nội bộ ('/...') hoặc http(s) — chặn javascript:/data: từ CMS
function isSafeHref(href: string): boolean {
  if (href.startsWith('/')) return true
  return /^https?:\/\//i.test(href)
}

export function FeatureCardsBlock(p: FeatureCardsBlockData) {
  const items = p.items ?? []
  if (items.length === 0) return null

  return (
    <section className="relative z-20 -mt-16 sm:-mt-24 lg:-mt-32 pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[20px] bg-navy-900 shadow-[var(--shadow-premium)]">
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {items.map((it, i) => {
              const src = resolveMediaUrl(it.image) ?? it.imageUrl ?? null
              return (
                <StaggerItem key={`${it.title}-${i}`}>
                  <div className="flex h-full flex-col items-center px-8 py-12 text-center">
                    {src && (
                      <div className="flex h-24 items-center justify-center">
                        <Image
                          src={src}
                          alt={it.title}
                          width={140}
                          height={140}
                          className="h-24 w-auto object-contain"
                        />
                      </div>
                    )}
                    <h3 className="mt-6 font-serif text-xl font-bold uppercase tracking-wide text-white">
                      {it.title}
                    </h3>
                    {it.body && (
                      <p className="mt-3 text-sm leading-[1.9] text-white/75">{it.body}</p>
                    )}
                    {it.linkHref && it.linkLabel && isSafeHref(it.linkHref) && (
                      <Link
                        href={it.linkHref}
                        className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:gap-2.5 transition-all"
                      >
                        {it.linkLabel}
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    )}
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
          <div className="h-[3px] w-full bg-gold-500" />
        </div>
      </div>
    </section>
  )
}
