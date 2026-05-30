import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from './types'

type Item = { icon?: string | null; title: string; body?: string | null }

export type FeaturesBlockData = {
  eyebrow?: string | null
  title?: string | null
  items?: Item[] | null
}

export function FeaturesBlock(p: FeaturesBlockData) {
  const items = p.items ?? []
  if (items.length === 0) return null

  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
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

        <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <StaggerItem key={`${it.title}-${i}`}>
              <div className="group h-full rounded-[20px] bg-white p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-navy-900 inline-flex items-center justify-center text-gold-500 group-hover:scale-110 transition">
                  <Icon name={(it.icon ?? 'spark') as IconName} size={22} />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-navy-900">{it.title}</h3>
                {it.body && (
                  <p className="mt-2 text-sm text-navy-900/70 leading-[1.8]">{it.body}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
