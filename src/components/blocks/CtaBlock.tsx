import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

export type CtaBlockData = {
  title: string
  body?: string | null
  buttonLabel?: string | null
  buttonHref?: string | null
}

export function CtaBlock(p: CtaBlockData) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[24px] bg-navy-900 text-white">
          <span className="absolute inset-y-0 left-0 w-2 bg-gold-500" />
          <div className="px-8 lg:px-14 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight">
                {p.title}
              </h3>
              {p.body && <p className="mt-2 text-white/70">{p.body}</p>}
            </div>
            <Link
              href={p.buttonHref ?? '/lien-he'}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-navy-900 transition hover:scale-[1.05] hover:bg-gold-400 whitespace-nowrap"
            >
              {p.buttonLabel ?? 'Liên hệ ngay'} <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
