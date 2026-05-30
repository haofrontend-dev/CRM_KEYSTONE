import { Icon } from '@/components/ui/Icon'

type Props = {
  eyebrow?: string
  eyebrowIcon?: boolean
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon = true,
  title,
  description,
  align = 'center',
  invert = false,
}: Props) {
  const aligned = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleColor = invert ? 'text-white' : 'text-navy-900'
  const eyebrowColor = invert ? 'text-gold-400' : 'text-gold-500'
  const descColor = invert ? 'text-white/70' : 'text-navy-900/70'

  return (
    <div className={`max-w-2xl ${aligned}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}
        >
          {eyebrowIcon && <Icon name="spark" size={14} />}
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-serif font-extrabold tracking-tight leading-[1.1] text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 leading-[1.8] ${descColor}`}>{description}</p>
      )}
    </div>
  )
}
