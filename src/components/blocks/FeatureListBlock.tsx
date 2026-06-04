import Image from 'next/image'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { resolveMediaUrl, type MediaRel } from './types'

type Item = {
  image?: MediaRel
  imageUrl?: string | null
  title: string
  body?: string | null
}

export type FeatureListBlockData = {
  eyebrow?: string | null
  title?: string | null
  image?: MediaRel
  imageUrl?: string | null
  items?: Item[] | null
}

export function FeatureListBlock(p: FeatureListBlockData) {
  const items = p.items ?? []
  if (items.length === 0) return null
  const sideSrc = resolveMediaUrl(p.image) ?? p.imageUrl ?? null

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          {sideSrc && (
            <Reveal className="lg:col-span-5 self-stretch">
              <div className="relative h-full min-h-[440px] lg:min-h-[600px] overflow-hidden">
                <Image
                  src={sideSrc}
                  alt={p.title ?? 'feature'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-left-top"
                />
              </div>
            </Reveal>
          )}

          <div className={sideSrc ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <Reveal>
              {p.eyebrow && (
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
                  <Icon name="spark" size={14} /> {p.eyebrow}
                </span>
              )}
              {p.title && (
                <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900">
                  {p.title}
                </h2>
              )}
            </Reveal>

            <StaggerGroup className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {items.map((it, i) => {
                const src = resolveMediaUrl(it.image) ?? it.imageUrl ?? null
                return (
                  <StaggerItem key={`${it.title}-${i}`}>
                    <div className="flex gap-4">
                      {src && (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/5 p-2.5">
                          <Image
                            src={src}
                            alt={it.title}
                            width={80}
                            height={80}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-serif text-base font-bold uppercase tracking-wide text-navy-900">
                          {it.title}
                        </h3>
                        {it.body && (
                          <p className="mt-1.5 text-sm leading-[1.85] text-navy-900/70">{it.body}</p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
