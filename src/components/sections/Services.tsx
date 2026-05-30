import { services } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Link from 'next/link'

type IconName = 'brain' | 'users' | 'flag' | 'layers' | 'cpu' | 'spark'

export function Services() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white py-24 lg:py-32">
      <div className="absolute top-24 -left-32 w-[420px] h-[420px] rounded-full bg-gold-500/10 blur-[140px]" />
      <div className="absolute bottom-0 -right-24 w-[460px] h-[460px] rounded-full bg-navy-700/40 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            invert
            eyebrow="Dịch vụ của chúng tôi"
            title="Chúng tôi làm gì"
            description="Keystone cung cấp chuyên sâu các khóa đào tạo, huấn luyện và tư vấn hiệu quả dành cho doanh nghiệp."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <Link href={`/${s.slug}`} className="group block h-full">
                <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.04] backdrop-blur p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-gold-500/60 hover:-translate-y-1.5">
                  <div className="text-gold-400">
                    <Icon name={s.icon as IconName} size={38} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-[1.85]">{s.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-gold-400 text-sm font-semibold">
                    Tìm hiểu thêm
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
