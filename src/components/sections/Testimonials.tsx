'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { partners, testimonials } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'

export function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [paused])

  const t = testimonials[i]

  return (
    <section
      className="bg-navy-900 text-white py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            ✦ Cảm nhận
          </span>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Khách hàng nói gì về chúng tôi
          </h2>
        </div>

        <div className="relative mt-14 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-14 w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:border-gold-500 hover:text-gold-400 transition"
            aria-label="Trước"
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <button
            type="button"
            onClick={() => setI((v) => (v + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-14 w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:border-gold-500 hover:text-gold-400 transition"
            aria-label="Tiếp"
          >
            <Icon name="chevron-right" size={20} />
          </button>

          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center px-4"
              >
                <div className="text-[80px] leading-none text-gold-500/20 font-serif h-8">&ldquo;</div>
                <p className="mt-2 text-lg lg:text-xl italic text-white/90 leading-[1.8]">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center justify-center gap-1 text-gold-400">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Icon key={k} name="star" size={16} strokeWidth={0} className="fill-current" />
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gold-500/40 object-cover"
                  />
                  <div className="text-left">
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-gold-400">
                      {t.position} • {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}`}
                className={`h-2 rounded-full transition-all ${
                  k === i ? 'w-8 bg-gold-500' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
            Đối tác tin cậy
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {partners.map((p) => (
              <div key={p.name} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={100}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
