import { Reveal } from '@/components/ui/Reveal'
import { CountUp } from '@/components/ui/CountUp'

export type StatsBlockData = {
  eyebrow?: string | null
  title?: string | null
  background?: 'navy' | 'light' | null
  items?: { value: string; label: string }[] | null
}

export function StatsBlock(p: StatsBlockData) {
  const items = p.items ?? []
  const dark = (p.background ?? 'navy') === 'navy'

  return (
    <section className={dark ? 'bg-navy-900' : 'bg-neutral-50'}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        {(p.eyebrow || p.title) && (
          <Reveal className="text-center">
            {p.eyebrow && (
              <span
                className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  dark ? 'text-gold-400' : 'text-gold-500'
                }`}
              >
                ✦ {p.eyebrow}
              </span>
            )}
            {p.title && (
              <h2
                className={`mt-4 font-serif text-3xl lg:text-4xl font-extrabold ${
                  dark ? 'text-white' : 'text-navy-900'
                }`}
              >
                {p.title}
              </h2>
            )}
          </Reveal>
        )}

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {items.map((s, i) => (
            <div key={`${s.label}-${i}`} className="flex items-center justify-center">
              <div className="text-center px-4">
                <div className="font-display text-4xl lg:text-5xl text-gold-500">
                  <CountUp value={s.value} />
                </div>
                <div className={`mt-2 text-sm ${dark ? 'text-white/70' : 'text-navy-900/70'}`}>
                  {s.label}
                </div>
              </div>
              {dark && i < items.length - 1 && (
                <div className="hidden lg:block gold-divider ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
