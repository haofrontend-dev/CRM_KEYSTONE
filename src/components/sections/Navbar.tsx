'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { navItems, siteInfo } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { SearchOverlay } from './SearchOverlay'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50">
      <div className="relative bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-[13px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(250,181,0,0.08),transparent_40%)] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 h-11 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <Icon name="clock" size={13} className="text-gold-400" />
            <span className="text-[12px] tracking-wide">{siteInfo.workingHours}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={`tel:${siteInfo.hotline}`}
              className="group inline-flex items-center gap-2 px-3 h-7 rounded-full bg-white/5 hover:bg-gold-500/15 ring-1 ring-white/10 hover:ring-gold-500/40 transition"
            >
              <Icon name="phone" size={12} className="text-gold-400" />
              <span className="font-semibold text-white group-hover:text-gold-400 transition">{siteInfo.hotline}</span>
            </a>
            <a
              href={`mailto:${siteInfo.email}`}
              className="hidden md:inline-flex items-center gap-2 px-3 h-7 rounded-full bg-white/5 hover:bg-gold-500/15 ring-1 ring-white/10 hover:ring-gold-500/40 transition"
            >
              <Icon name="mail" size={12} className="text-gold-400" />
              <span className="text-white/90 group-hover:text-gold-400">{siteInfo.email}</span>
            </a>
            <Link
              href="/lien-he"
              className="ml-1 group inline-flex items-center gap-1.5 h-7 pl-3 pr-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-[12px] uppercase tracking-wider shadow-[0_4px_14px_rgba(250,181,0,0.35)] transition"
            >
              Tư vấn miễn phí
              <span className="w-4 h-4 inline-flex items-center justify-center rounded-full bg-navy-900 text-gold-400 text-[10px] group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      </div>

      <div className="bg-white shadow-[0_2px_20px_rgba(10,31,60,0.06)]">
        <nav className="mx-auto max-w-7xl px-6 h-[88px] flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/images/trang-chu/unnamed.png" alt="Keystone Logo" width={140} height={64} className="h-14 lg:h-16 w-auto object-contain" priority />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li
                key={item.href + item.label}
                className="relative"
                onMouseEnter={() => item.dropdown ? setActiveDropdown(item.label) : setActiveDropdown(null)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center gap-1 text-[14px] font-semibold text-navy-900/80 hover:text-navy-900 transition py-2 px-3"
                >
                  {item.label}
                  {item.dropdown && (
                    <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-60">
                      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                  <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </Link>
                {item.dropdown && item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="bg-white rounded-xl shadow-[var(--shadow-premium)] border border-navy-900/5 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-navy-900/80 hover:text-gold-400 hover:bg-navy-900 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full text-navy-900/70 hover:bg-navy-900 hover:text-gold-400 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-navy-900"
              aria-label="Mở menu"
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-navy-950 text-white overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10">
              <span className="font-extrabold text-gold-400">{siteInfo.brand}</span>
              <button type="button" onClick={() => setOpen(false)} className="w-10 h-10 inline-flex items-center justify-center" aria-label="Đóng menu">
                <Icon name="close" size={24} />
              </button>
            </div>
            <motion.ul
              className="px-6 py-10 space-y-3"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.href + item.label}
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-xl font-bold tracking-tight hover:text-gold-400 transition block py-1"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-white/70 hover:text-gold-400 transition block py-1"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
