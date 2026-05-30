import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { resolveMediaUrl, type MediaRel } from './types'

export type HeroBlockData = {
  breadcrumb?: string | null
  title: string
  subtitle?: string | null
  variant?: 'navy' | 'gold' | 'image' | null
  backgroundImage?: MediaRel
}

export function HeroBlock(props: HeroBlockData) {
  const variant = props.variant ?? 'navy'
  const bgUrl = resolveMediaUrl(props.backgroundImage)

  if (variant === 'gold') {
    return (
      <section className="bg-gradient-to-br from-gold-500 via-gold-400 to-gold-300 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Crumb breadcrumb={props.breadcrumb} dark />
            <h1 className="mt-3 font-display text-4xl lg:text-6xl text-navy-900 uppercase tracking-tight leading-[1.1]">
              {props.title}
            </h1>
            {props.subtitle && <p className="mt-4 text-navy-900/80 max-w-2xl">{props.subtitle}</p>}
          </Reveal>
        </div>
      </section>
    )
  }

  if (bgUrl) {
    return (
      <section className="relative bg-navy-900 text-white py-20 lg:py-28 overflow-hidden">
        <Image src={bgUrl} alt={props.title} fill className="object-cover object-top opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <Crumb breadcrumb={props.breadcrumb} />
            <h1 className="mt-3 font-display text-4xl lg:text-6xl uppercase tracking-tight leading-[1.1]">
              {props.title}
            </h1>
            {props.subtitle && <p className="mt-4 text-white/75 max-w-2xl">{props.subtitle}</p>}
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-navy-900 text-white py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]">
        <svg viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M 0 ${60 + i * 50} Q 400 ${20 + i * 50}, 800 ${80 + i * 50} T 1600 ${50 + i * 50}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <Crumb breadcrumb={props.breadcrumb} />
        <h1 className="mt-3 font-display text-4xl lg:text-6xl uppercase tracking-tight">
          {props.title}
        </h1>
        {props.subtitle && <p className="mt-3 text-white/70">{props.subtitle}</p>}
      </div>
    </section>
  )
}

function Crumb({ breadcrumb, dark }: { breadcrumb?: string | null; dark?: boolean }) {
  if (!breadcrumb) return null
  const color = dark ? 'text-navy-900/70' : 'text-white/60'
  const active = dark ? 'text-navy-900' : 'text-white'
  return (
    <nav className={`text-[13px] ${color} mb-2`}>
      <Link href="/" className="hover:text-gold-400">Trang chủ</Link>
      <span className="mx-2">/</span>
      <span className={active}>{breadcrumb}</span>
    </nav>
  )
}
