import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { resolveMediaUrl, type MediaRel } from './types'

type Partner = {
  id: number | string
  name: string
  logo?: MediaRel
  website?: string | null
}

export type PartnersBlockData = {
  eyebrow?: string | null
  title?: string | null
  items?: (Partner | number | string)[] | null
}

export function PartnersBlock(p: PartnersBlockData) {
  const items = (p.items ?? []).filter(
    (it): it is Partner => typeof it === 'object' && it !== null,
  )
  if (items.length === 0) return null

  const doubled = [...items, ...items]

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {(p.eyebrow || p.title) && (
          <Reveal className="text-center">
            {p.eyebrow && (
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
                ✦ {p.eyebrow}
              </span>
            )}
            {p.title && (
              <h2 className="mt-3 font-serif text-2xl lg:text-3xl font-extrabold text-navy-900">
                {p.title}
              </h2>
            )}
          </Reveal>
        )}

        <div className="mt-10 marquee overflow-hidden relative">
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
            {doubled.map((it, i) => {
              const url = resolveMediaUrl(it.logo)
              return (
                <a
                  key={`${it.id}-${i}`}
                  href={it.website ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-w-[140px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition"
                  aria-label={it.name}
                >
                  {url ? (
                    <Image
                      src={url}
                      alt={it.name}
                      width={140}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xl font-bold text-navy-900/40">{it.name}</span>
                  )}
                </a>
              )
            })}
          </div>
          <span className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <span className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
