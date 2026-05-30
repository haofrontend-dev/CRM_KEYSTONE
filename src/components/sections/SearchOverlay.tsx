'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

type Props = {
  open: boolean
  onClose: () => void
}

const QUICK_LINKS = [
  { label: 'Ứng dụng AI', href: '/ung-dung-ai' },
  { label: 'Tools @ Workplace', href: '/tools-at-workplace' },
  { label: 'Train The Trainer', href: '/train-the-trainer' },
  { label: 'HR Technology', href: '/hr-technology-solutions' },
  { label: 'Public Events', href: '/public-event' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tuyển dụng', href: '/tuyen-dung' },
]

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    onClose()
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Content - flex layout */}
          <motion.div
            className="relative h-full flex flex-col"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Top bar with close */}
            <div className="flex items-center justify-end px-6 py-5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng tìm kiếm"
                className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white transition"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Search form centered */}
            <div className="flex-1 flex flex-col items-center justify-start pt-10 lg:pt-16 px-6">
              <div className="w-full max-w-3xl">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                    <span className="w-8 h-px bg-gold-400" />
                    Tìm kiếm
                    <span className="w-8 h-px bg-gold-400" />
                  </span>
                  <h2 className="mt-3 font-serif text-3xl lg:text-5xl font-extrabold text-white leading-tight">
                    Bạn đang tìm gì?
                  </h2>
                  <p className="mt-3 text-white/60 text-sm">
                    Nhập từ khoá để tìm bài viết, sự kiện, dịch vụ và khoá học.
                  </p>
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="relative"
                >
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ví dụ: AI, Tools @ Workplace, CRM..."
                    className="w-full h-16 lg:h-20 pl-14 lg:pl-16 pr-32 lg:pr-40 rounded-2xl bg-white text-navy-900 text-lg lg:text-xl placeholder:text-navy-900/30 focus:outline-none focus:ring-4 focus:ring-gold-500/30 transition shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute left-5 lg:left-6 top-1/2 -translate-y-1/2 text-navy-900/40">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 h-10 lg:h-12 px-4 lg:px-6 rounded-xl bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white font-bold text-sm uppercase tracking-wider transition"
                  >
                    <span className="hidden sm:inline">Tìm</span>
                    <span>→</span>
                  </button>
                </motion.form>

                {/* Quick links flex */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-10"
                >
                  <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
                    Phổ biến
                  </p>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {QUICK_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-gold-500 hover:text-navy-950 text-white/80 text-sm font-medium ring-1 ring-white/10 hover:ring-gold-500 transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-6 py-5 text-center text-xs text-white/40">
              Nhấn <kbd className="px-2 py-0.5 rounded bg-white/10 text-white/60 font-mono">ESC</kbd> để đóng
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
