import { values } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

type IconName = 'spark' | 'compass' | 'shield'

export function Values() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Định vị thương hiệu"
            title="Vì sao chọn Keystone"
            description="Ba trụ cột làm nên sự khác biệt của chúng tôi trong hành trình đồng hành cùng doanh nghiệp Việt."
            align="center"
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="group relative h-full overflow-hidden rounded-[20px] bg-neutral-50 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-premium)] hover:bg-white">
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 rounded-t-[20px]" />
                <div className="p-8 lg:p-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-900 text-gold-500 group-hover:scale-110 transition">
                    <Icon name={v.icon as IconName} size={24} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-bold text-navy-900">{v.title}</h3>
                  <p className="mt-3 text-navy-900/70 leading-[1.85]">{v.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
