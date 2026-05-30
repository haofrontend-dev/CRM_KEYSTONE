import Image from 'next/image'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { resolveMediaUrl, type MediaRel } from './types'

type Item = {
  id: number | string
  name: string
  position?: string | null
  company?: string | null
  quote?: string | null
  rating?: number | null
  avatar?: MediaRel
}

export type TestimonialsBlockData = {
  eyebrow?: string | null
  title?: string | null
  items?: (Item | number | string)[] | null
}

export function TestimonialsBlock(p: TestimonialsBlockData) {
  const items = (p.items ?? []).filter(
    (it): it is Item => typeof it === 'object' && it !== null,
  )
  if (items.length === 0) return null

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          {p.eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
              <Icon name="star" size={14} /> {p.eyebrow}
            </span>
          )}
          {p.title && (
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900">
              {p.title}
            </h2>
          )}
        </Reveal>

        <StaggerGroup className="mt-12 grid md:grid-cols-2 gap-6">
          {items.map((t) => {
            const url = resolveMediaUrl(t.avatar)
            return (
              <StaggerItem key={String(t.id)}>
                <article className="h-full rounded-[20px] bg-neutral-50 p-8 lg:p-10 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-premium)] transition">
                  <div className="text-gold-500/40 text-5xl leading-none font-serif h-6">
                    &ldquo;
                  </div>
                  <p className="mt-2 text-navy-900/80 italic leading-[1.8]">{t.quote}</p>
                  <div className="mt-5 flex items-center gap-1 text-gold-500">
                    {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                      <Icon key={k} name="star" size={14} strokeWidth={0} className="fill-current" />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    {url ? (
                      <Image
                        src={url}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-12 h-12 ring-2 ring-gold-500/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-navy-900 text-gold-400 inline-flex items-center justify-center font-bold">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-navy-900">{t.name}</div>
                      <div className="text-sm text-navy-900/60">
                        {[t.position, t.company].filter(Boolean).join(' • ')}
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
