'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from './types'

type Item = { text: string }
type Group = {
  icon?: string | null
  title: string
  description?: string | null
  items?: Item[] | null
}

export type CategoryListBlockData = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  display?: 'accordion' | 'grid' | null
  groups: Group[]
}

export function CategoryListBlock(p: CategoryListBlockData) {
  const groups = p.groups ?? []
  const mode = p.display ?? 'accordion'
  if (groups.length === 0) return null

  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {(p.eyebrow || p.title || p.description) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
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
            {p.description && (
              <p className="mt-4 text-navy-900/70 leading-[1.8]">{p.description}</p>
            )}
          </div>
        )}

        {mode === 'accordion' ? <Accordion groups={groups} /> : <Grid groups={groups} />}
      </div>
    </section>
  )
}

function Accordion({ groups }: { groups: Group[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(groups.map((_, i) => i)))
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  return (
    <div className="space-y-3">
      {groups.map((g, i) => {
        const isOpen = open.has(i)
        return (
          <div
            key={`${g.title}-${i}`}
            className={`rounded-[20px] bg-white shadow-[var(--shadow-soft)] overflow-hidden transition-shadow ${
              isOpen ? 'shadow-[var(--shadow-premium)]' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`shrink-0 w-11 h-11 rounded-xl inline-flex items-center justify-center transition ${
                    isOpen ? 'bg-navy-900 text-gold-500' : 'bg-gold-500/10 text-gold-500'
                  }`}
                >
                  <Icon name={(g.icon ?? 'spark') as IconName} size={20} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg lg:text-xl font-bold text-navy-900 truncate">
                    {g.title}
                  </h3>
                  {g.items && g.items.length > 0 && (
                    <div className="text-xs text-navy-900/50 mt-0.5">
                      {g.items.length} chương trình
                    </div>
                  )}
                </div>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 w-9 h-9 rounded-full bg-neutral-100 inline-flex items-center justify-center text-navy-900"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && g.items && g.items.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 lg:px-6 pb-6">
                    {g.description && (
                      <p className="text-sm text-navy-900/70 leading-[1.8] mb-4">{g.description}</p>
                    )}
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {g.items.map((it, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-2.5 text-[14px] text-navy-900/80"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                          <span>{it.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function Grid({ groups }: { groups: Group[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {groups.map((g, i) => (
        <div
          key={`${g.title}-${i}`}
          className="rounded-[20px] bg-white p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-premium)] transition"
        >
          <span className="w-11 h-11 rounded-xl inline-flex items-center justify-center bg-navy-900 text-gold-500">
            <Icon name={(g.icon ?? 'spark') as IconName} size={20} />
          </span>
          <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{g.title}</h3>
          {g.description && <p className="mt-1 text-sm text-navy-900/65">{g.description}</p>}
          {g.items && g.items.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {g.items.map((it, k) => (
                <li key={k} className="text-sm text-navy-900/75 flex gap-2">
                  <span className="text-gold-500">•</span>
                  {it.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
