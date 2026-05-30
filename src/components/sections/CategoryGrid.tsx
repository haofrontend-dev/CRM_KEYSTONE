import Link from 'next/link'
import { trainingCategories } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

type IconName = 'cpu' | 'layers' | 'users' | 'compass' | 'chart' | 'shield' | 'brain' | 'spark' | 'flag'

export function CategoryGrid() {
  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
            <Icon name="spark" size={14} /> Danh mục đào tạo
          </span>
          <h2 className="mt-4 font-serif font-extrabold tracking-tight text-navy-900 text-4xl lg:text-5xl leading-[1.05]">
            Các chương trình đào tạo
          </h2>
          <div className="mt-7 space-y-2 text-navy-900/70 leading-[1.85] text-[15px]">
            <p>Chúng tôi cung cấp dải rộng các khóa đào tạo chất lượng cao,</p>
            <p>được thiết kế dành riêng cho từng đặc thù kinh doanh.</p>
            <p>Chuyên gia có kinh nghiệm thực chiến sâu sắc,</p>
            <p>giúp doanh nghiệp vận hành hiệu quả và phát triển bền vững.</p>
          </div>
          <Link
            href="/dao-tao"
            className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 hover:scale-[1.03]"
          >
            Xem Tất Cả <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>

        <StaggerGroup className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {trainingCategories.map((c) => (
              <StaggerItem key={c.slug}>
                <Link href={`/${c.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-navy-900/[0.04] to-navy-800/[0.08] aspect-square transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-premium)] flex items-center justify-center">
                    <div className="text-gold-500 group-hover:scale-110 transition-transform duration-300">
                      <Icon name={c.icon as IconName} size={48} strokeWidth={1.2} />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-[20px]" />
                  </div>
                  <div className="mt-3 text-center font-semibold text-navy-900 transition group-hover:text-gold-500 text-[15px]">
                    {c.title}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  )
}
