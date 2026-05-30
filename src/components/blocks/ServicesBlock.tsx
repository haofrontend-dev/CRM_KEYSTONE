import Image from 'next/image'
import Link from 'next/link'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { resolveMediaUrl, type MediaRel } from './types'

type Service = {
  id: number | string
  title: string
  slug?: string | null
  shortDescription?: string | null
  icon?: MediaRel
}

export type ServicesBlockData = {
  eyebrow?: string | null
  title?: string | null
  items?: (Service | number | string)[] | null
  centerImage?: MediaRel
}

export function ServicesBlock(p: ServicesBlockData) {
  const items = (p.items ?? []).filter(
    (s): s is Service => typeof s === 'object' && s !== null,
  )
  if (items.length === 0) return null

  const centerUrl = resolveMediaUrl(p.centerImage)
  const half = Math.ceil(items.length / 2)
  const left = items.slice(0, half)
  const right = items.slice(half)

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white py-20 lg:py-28">
      <div className="absolute top-1/4 -left-32 w-[460px] h-[460px] rounded-full bg-gold-500/12 blur-[160px]" />
      <div className="absolute bottom-1/4 -right-32 w-[460px] h-[460px] rounded-full bg-navy-700/40 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          {p.eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              ✦ {p.eyebrow}
            </span>
          )}
          {p.title && (
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl font-extrabold">{p.title}</h2>
          )}
        </Reveal>

        {centerUrl ? (
          <div className="mt-16 grid lg:grid-cols-[1fr_1.1fr_1fr] gap-6 lg:gap-8 items-stretch">
            <StaggerGroup className="space-y-5 lg:space-y-6">
              {left.map((s) => (
                <StaggerItem key={String(s.id)}>
                  <ServiceCard service={s} align="right" />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.15}>
              <div className="relative hidden lg:flex items-center justify-center h-full px-2">
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 aspect-square rounded-[32px] bg-gradient-to-br from-gold-500/30 via-gold-400/10 to-transparent blur-2xl" />
                <div className="relative w-full max-w-[440px] aspect-square">
                  <div className="absolute inset-0 rounded-[28px] overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                    <Image
                      src={centerUrl}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-navy-950/0" />
                  </div>

                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gold-500/15 backdrop-blur-md border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Icon name="spark" size={28} />
                  </div>
                  <div className="absolute -bottom-4 -left-4 rounded-xl bg-white text-navy-900 px-4 py-3 shadow-xl">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-900/60">
                      Developing
                    </div>
                    <div className="text-base font-extrabold">People</div>
                  </div>

                  <div className="absolute inset-x-4 bottom-6 text-center text-white">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                      Keystone
                    </div>
                    <div className="mt-1 font-serif text-lg font-bold leading-tight">
                      Giải pháp toàn diện
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <StaggerGroup className="space-y-5 lg:space-y-6">
              {right.map((s) => (
                <StaggerItem key={String(s.id)}>
                  <ServiceCard service={s} align="left" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ) : (
          <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s) => (
              <StaggerItem key={String(s.id)}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  align,
}: {
  service: Service
  align?: 'left' | 'right'
}) {
  const url = resolveMediaUrl(service.icon)
  const textAlign = align === 'right' ? 'lg:text-right' : ''
  const iconAlign = align === 'right' ? 'lg:ml-auto' : ''
  const arrowAlign = align === 'right' ? 'lg:justify-end' : ''

  return (
    <Link
      href={service.slug ? `/${service.slug}` : '#'}
      className="group relative block h-full overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur p-6 lg:p-7 transition-all duration-300 hover:border-gold-500/60 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
    >
      <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className={`flex flex-col gap-4 ${textAlign}`}>
        <div
          className={`w-14 h-14 rounded-2xl inline-flex items-center justify-center bg-gradient-to-br from-gold-500/20 to-gold-500/5 ring-1 ring-gold-500/30 text-gold-400 group-hover:scale-110 group-hover:bg-gold-500/30 transition-all ${iconAlign}`}
        >
          {url ? (
            <Image src={url} alt={service.title} width={28} height={28} className="opacity-90" />
          ) : (
            <Icon name="spark" size={24} />
          )}
        </div>

        <div>
          <h3 className="font-serif text-lg lg:text-xl font-bold leading-tight text-white">
            {service.title}
          </h3>
          {service.shortDescription && (
            <p className="mt-2 text-sm text-white/65 leading-[1.7] line-clamp-3">
              {service.shortDescription}
            </p>
          )}
        </div>

        <span
          className={`mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-400 ${arrowAlign}`}
        >
          Tìm hiểu thêm
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
