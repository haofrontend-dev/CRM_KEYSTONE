import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { resolveMediaUrl, type MediaRel } from './types'

export type SplitBlockData = {
  imagePosition?: 'left' | 'right' | null
  eyebrow?: string | null
  title?: string | null
  paragraphs?: { text: string }[] | null
  bullets?: { text: string }[] | null
  image: MediaRel
  ctaLabel?: string | null
  ctaHref?: string | null
  background?: 'white' | 'light' | 'navy' | null
}

export function SplitBlock(p: SplitBlockData) {
  const imgUrl = resolveMediaUrl(p.image)
  const imageRight = (p.imagePosition ?? 'right') === 'right'
  const bg = p.background ?? 'white'

  const sectionBg =
    bg === 'navy' ? 'bg-navy-950 text-white' : bg === 'light' ? 'bg-neutral-50' : 'bg-white'
  const invert = bg === 'navy'
  const titleColor = invert ? 'text-white' : 'text-navy-900'
  const bodyColor = invert ? 'text-white/75' : 'text-navy-900/75'
  const eyebrowColor = invert ? 'text-gold-400' : 'text-gold-500'
  const bulletColor = invert ? 'text-white/85' : 'text-navy-900/80'

  const content = (
    <Reveal>
      {p.eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}
        >
          <Icon name="spark" size={14} /> {p.eyebrow}
        </span>
      )}
      {p.title && (
        <h2 className={`mt-4 font-serif text-3xl lg:text-4xl font-extrabold leading-[1.15] ${titleColor}`}>
          {p.title}
        </h2>
      )}
      {p.paragraphs && p.paragraphs.length > 0 && (
        <div className={`mt-6 space-y-4 leading-[1.85] ${bodyColor}`}>
          {p.paragraphs.map((para, i) => (
            <p key={i}>{para.text}</p>
          ))}
        </div>
      )}
      {p.bullets && p.bullets.length > 0 && (
        <ul className="mt-6 space-y-3">
          {p.bullets.map((b, i) => (
            <li key={i} className={`flex items-start gap-3 ${bulletColor}`}>
              <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-500 text-navy-900 shrink-0">
                <Icon name="check" size={12} strokeWidth={3} />
              </span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>
      )}
      {p.ctaLabel && (
        <Link
          href={p.ctaHref ?? '#'}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition hover:scale-[1.03] hover:bg-gold-400"
        >
          {p.ctaLabel} <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </Reveal>
  )

  const image = imgUrl ? (
    <Reveal delay={0.1}>
      <div className="relative overflow-hidden rounded-[24px] shadow-[var(--shadow-premium)]">
        <Image
          src={imgUrl}
          alt={p.title ?? ''}
          width={1100}
          height={800}
          className="w-full h-auto object-cover"
        />
      </div>
    </Reveal>
  ) : null

  if (!image) {
    return (
      <section className={`${sectionBg} py-20 lg:py-28`}>
        <div className="mx-auto max-w-4xl px-6">{content}</div>
      </section>
    )
  }

  return (
    <section className={`${sectionBg} py-20 lg:py-28`}>
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {imageRight ? (
          <>
            {content}
            {image}
          </>
        ) : (
          <>
            {image}
            {content}
          </>
        )}
      </div>
    </section>
  )
}
