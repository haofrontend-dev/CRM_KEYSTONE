import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

export type MapBlockData = {
  eyebrow?: string | null
  title?: string | null
  embedUrl: string
  height?: number | null
}

export function MapBlock(p: MapBlockData) {
  const height = p.height ?? 450
  return (
    <section className="bg-neutral-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {(p.eyebrow || p.title) && (
          <Reveal className="mb-8 text-center">
            {p.eyebrow && (
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
                <Icon name="spark" size={14} /> {p.eyebrow}
              </span>
            )}
            {p.title && (
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900 leading-[1.1]">
                {p.title}
              </h2>
            )}
          </Reveal>
        )}
        <div
          className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(10,31,60,0.25)] ring-1 ring-navy-900/5"
          style={{ height }}
        >
          <iframe
            src={p.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={p.title ?? 'Google Maps'}
          />
        </div>
      </div>
    </section>
  )
}
