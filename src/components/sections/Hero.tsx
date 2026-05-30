'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { heroSlides, siteInfo } from '@/data/site-data'

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((v) => (v + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = heroSlides[current]

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[640px]">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.sub}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/75 to-navy-900/40" />

      {/* Decorative SVG lines */}
      <svg
        aria-hidden
        viewBox="0 0 1600 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={`w${i}`}
            d={`M 0 ${120 + i * 60} Q 400 ${60 + i * 60}, 800 ${140 + i * 60} T 1600 ${110 + i * 60}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.3}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-16 lg:py-20 flex items-center min-h-[600px] lg:min-h-[640px]">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 text-navy-900 px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
          >
            ✦ {slide.badge}
          </motion.span>

          <div className="relative mt-6 min-h-[160px] sm:min-h-[200px] lg:min-h-[230px]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="font-display absolute inset-0 leading-[1.05] text-[32px] sm:text-[44px] lg:text-[56px] uppercase whitespace-pre-line text-white"
                style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.25)' }}
              >
                {slide.headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-5 max-w-[520px] min-h-[120px]"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-serif font-bold italic text-gold-400 text-base"
              >
                {slide.sub}
              </motion.p>
            </AnimatePresence>
            <p className="mt-2 text-[14px] text-white/80 leading-[1.7]">
              {siteInfo.brand} là đơn vị đào tạo & tư vấn chuyên nghiệp, tiên phong trong ứng dụng công nghệ phát triển con người.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex items-center gap-6"
          >
            <a
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-navy-900 hover:bg-gold-400 hover:scale-[1.03] transition-all shadow-lg"
            >
              Liên hệ ngay
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`rounded-full transition-all ${
                    idx === current ? 'w-8 h-1.5 bg-gold-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating stat badges */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 px-5 py-4 text-white"
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">Hài lòng</div>
            <div className="text-3xl font-extrabold">98%</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl bg-gold-500 text-navy-900 px-5 py-4 shadow-xl"
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]">Developing People</div>
            <div className="text-lg mt-0.5 font-extrabold">500+ Hợp đồng</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white px-4 py-2 text-sm font-bold text-center"
          >
            ★ 15+ năm
          </motion.div>
        </div>
      </div>
    </section>
  )
}
