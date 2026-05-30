import Image from 'next/image'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { resolveMediaUrl, type MediaRel } from './types'

export type IntroBlockData = {
  eyebrow?: string | null
  title?: string | null
  paragraphs?: { text: string }[] | null
  keywords?: { label: string }[] | null
  blockquote?: string | null
  image?: MediaRel
}

export function IntroBlock(p: IntroBlockData) {
  const imgUrl = resolveMediaUrl(p.image)

  const text = (
    <Reveal>
      {p.eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
          <Icon name="spark" size={14} /> {p.eyebrow}
        </span>
      )}
      {p.title && (
        <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900 leading-[1.15]">
          {p.title}
        </h2>
      )}
      {p.paragraphs && p.paragraphs.length > 0 && (
        <div className="mt-6 space-y-4 text-navy-900/75 leading-[1.85]">
          {p.paragraphs.map((para, i) => (
            <p key={i}>{para.text}</p>
          ))}
        </div>
      )}
      {p.keywords && p.keywords.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2.5">
          {p.keywords.map((k) => (
            <span
              key={k.label}
              className="inline-flex items-center rounded-full bg-gold-500/10 px-4 py-1.5 text-sm font-semibold text-navy-900 ring-1 ring-gold-500/30"
            >
              {k.label}
            </span>
          ))}
        </div>
      )}
      {p.blockquote && (
        <blockquote className="mt-10 border-l-4 border-gold-500 pl-6 py-2 font-serif text-xl lg:text-2xl font-bold text-navy-900 italic leading-[1.4]">
          {p.blockquote}
        </blockquote>
      )}
    </Reveal>
  )

  if (imgUrl) {
    return (
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
          {text}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[24px] shadow-[var(--shadow-premium)]">
              <Image
                src={imgUrl}
                alt={p.title ?? ''}
                width={900}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">{text}</div>
    </section>
  )
}
