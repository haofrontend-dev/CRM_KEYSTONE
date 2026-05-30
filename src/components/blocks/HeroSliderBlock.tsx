'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { resolveMediaUrl, type MediaRel } from './types'

type Slide = {
  id?: string
  image: MediaRel
  badge?: string | null
  headline?: string | null
  sub?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export type HeroSliderBlockData = {
  slides: Slide[]
  autoplayMs?: number | null
}

export function HeroSliderBlock({ slides, autoplayMs }: HeroSliderBlockData) {
  const [i, setI] = useState(0)
  const ms = autoplayMs ?? 5000

  useEffect(() => {
    if (!ms || slides.length <= 1) return
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), ms)
    return () => clearInterval(t)
  }, [ms, slides.length])

  if (slides.length === 0) return null
  const slide = slides[i]
  const url = resolveMediaUrl(slide.image)

  return (
    <section className="relative overflow-hidden min-h-[90vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {url && (
            <Image src={url} alt={slide.headline ?? slide.sub ?? 'slide'} fill className="object-cover" priority />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/55 to-navy-900/10" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-16 lg:py-20 grid min-h-[90vh] items-center">
        <div className="max-w-[680px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {slide.badge && (
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 text-navy-900 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase">
                  ✦ {slide.badge}
                </span>
              )}

              {slide.headline && (
                <h1
                  className="font-display mt-5 leading-[1.05] text-[34px] sm:text-[44px] lg:text-[54px] uppercase whitespace-pre-line text-white break-words"
                  style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
                >
                  {slide.headline}
                </h1>
              )}

              {slide.sub && (
                <div className="mt-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3.5 max-w-[480px]">
                  <p className="font-serif font-bold italic text-gold-400 text-sm sm:text-base">
                    {slide.sub}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {slide.ctaLabel && (
              <Link
                href={slide.ctaHref ?? '#'}
                className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-navy-900 hover:bg-gold-400 hover:scale-[1.03] transition-all shadow-lg"
              >
                {slide.ctaLabel}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`rounded-full transition-all ${
                    idx === i ? 'w-8 h-1.5 bg-gold-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
