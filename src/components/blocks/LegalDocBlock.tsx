'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'

type Paragraph = { text: string }
type Item = { text: string }
type Section = {
  title: string
  paragraphs?: Paragraph[] | null
  items?: Item[] | null
}

export type LegalDocBlockData = {
  eyebrow?: string | null
  title?: string | null
  updatedAt?: string | null
  intro?: string | null
  sections: Section[]
}

const slugify = (s: string, i: number) =>
  `sec-${i + 1}-${s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40)}`

export function LegalDocBlock(p: LegalDocBlockData) {
  const sections = p.sections ?? []
  const ids = sections.map((s, i) => slugify(s.title, i))
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const idx = refs.current.findIndex((el) => el === visible[0].target)
          if (idx !== -1) setActive(idx)
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sections.length])

  if (sections.length === 0) return null

  const scrollTo = (i: number) => {
    refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="bg-neutral-50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          {p.eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
              <Icon name="shield" size={14} /> {p.eyebrow}
            </span>
          )}
          {p.title && (
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900 leading-[1.15]">
              {p.title}
            </h2>
          )}
          {p.updatedAt && (
            <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-navy-900/50">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              {p.updatedAt}
            </p>
          )}
          {p.intro && (
            <p className="mt-5 text-navy-900/70 leading-[1.85]">{p.intro}</p>
          )}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* TOC sidebar */}
          <aside className="lg:sticky lg:top-36 lg:self-start">
            <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-soft)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-900/40 mb-3">
                Mục lục
              </p>
              <nav className="space-y-1">
                {sections.map((s, i) => (
                  <button
                    key={ids[i]}
                    type="button"
                    onClick={() => scrollTo(i)}
                    className={`group flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                      active === i
                        ? 'bg-navy-900 text-white'
                        : 'text-navy-900/70 hover:bg-neutral-100'
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${
                        active === i ? 'bg-gold-500 text-navy-900' : 'bg-gold-500/10 text-gold-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-snug">{s.title.replace(/^\d+\.\s*/, '')}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Document body */}
          <div className="space-y-5">
            {sections.map((s, i) => (
              <article
                key={ids[i]}
                id={ids[i]}
                ref={(el) => {
                  refs.current[i] = el
                }}
                className="scroll-mt-36 rounded-[20px] bg-white p-6 lg:p-8 shadow-[var(--shadow-soft)]"
              >
                <h3 className="flex items-start gap-3 font-serif text-xl lg:text-2xl font-bold text-navy-900">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-sm font-bold text-gold-500">
                    {i + 1}
                  </span>
                  <span>{s.title.replace(/^\d+\.\s*/, '')}</span>
                </h3>

                {s.paragraphs && s.paragraphs.length > 0 && (
                  <div className="mt-4 space-y-3 pl-11">
                    {s.paragraphs.map((para, k) => (
                      <p key={k} className="text-[15px] leading-[1.85] text-navy-900/75">
                        {para.text}
                      </p>
                    ))}
                  </div>
                )}

                {s.items && s.items.length > 0 && (
                  <ul className="mt-4 space-y-2.5 pl-11">
                    {s.items.map((it, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-[15px] text-navy-900/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        <span className="leading-[1.7]">{it.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
