import { stats } from '@/data/site-data'
import { CountUp } from '@/components/ui/CountUp'

export function Stats() {
  return (
    <section className="bg-navy-900">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center justify-center">
              <div className="text-center px-4">
                <div className="font-display text-4xl lg:text-5xl text-gold-500">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 text-sm text-white/70">{s.label}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block gold-divider ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
