import Image from 'next/image'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { resolveMediaUrl, type MediaRel } from './types'

type Member = {
  id: number | string
  name: string
  role?: string | null
  bio?: string | null
  photo?: MediaRel
}

export type TeamBlockData = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  members?: (Member | number | string)[] | null
}

export function TeamBlock(p: TeamBlockData) {
  const members = (p.members ?? []).filter(
    (m): m is Member => typeof m === 'object' && m !== null,
  )
  if (members.length === 0) return null

  return (
    <section className="bg-neutral-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          {p.eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
              <Icon name="users" size={14} /> {p.eyebrow}
            </span>
          )}
          {p.title && (
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900">
              {p.title}
            </h2>
          )}
          {p.description && (
            <p className="mt-4 max-w-2xl mx-auto text-navy-900/70">{p.description}</p>
          )}
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((m) => {
            const url = resolveMediaUrl(m.photo)
            return (
              <StaggerItem key={String(m.id)}>
                <article className="group text-center">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-navy-900/5 shadow-[var(--shadow-soft)] transition group-hover:shadow-[var(--shadow-premium)] group-hover:-translate-y-1">
                    {url ? (
                      <Image
                        src={url}
                        alt={m.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-navy-900/30 text-3xl font-bold">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-serif font-bold text-navy-900">{m.name}</h3>
                  {m.role && <div className="text-sm text-gold-500 font-semibold">{m.role}</div>}
                  {m.bio && (
                    <p className="mt-2 text-xs text-navy-900/60 line-clamp-3">{m.bio}</p>
                  )}
                </article>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
