import Link from 'next/link'
import Image from 'next/image'
import { aboutText, whyChooseUs } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

export function About() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
            ✦ Về chúng tôi
          </span>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.1]">
            KEYSTONE — Developing People
          </h2>
          <div className="mt-6 space-y-4 text-navy-900/70 leading-[1.75]">
            <p>{aboutText.intro}</p>
            <p>{aboutText.experts}</p>
          </div>
          <p className="mt-4 text-sm font-medium text-gold-500 italic">{aboutText.keywords}</p>

          <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
            <div>
              <div className="text-3xl font-extrabold text-navy-900"><CountUp value="500+" /></div>
              <div className="mt-1 text-sm text-navy-900/60">Hợp đồng</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-navy-900"><CountUp value="15+" /></div>
              <div className="mt-1 text-sm text-navy-900/60">Chuyên gia đầu ngành</div>
            </div>
          </div>

          <Link href="/keystone" className="mt-8 inline-flex items-center gap-2 text-gold-500 font-semibold hover:underline underline-offset-4">
            Tìm hiểu thêm <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 dot-pattern opacity-60 hidden md:block" />
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-premium-lg)] rotate-[-2deg]">
              <Image
                src="/images/trang-chu/about-image.jpg"
                alt="Đội ngũ Keystone"
                width={800}
                height={600}
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 lg:-left-8 rounded-xl bg-gold-500 px-6 py-5 text-navy-900 shadow-[var(--shadow-premium-lg)]">
              <div className="text-3xl font-extrabold leading-none">15+</div>
              <div className="text-sm font-semibold mt-1">Năm kinh nghiệm</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Why Choose Us */}
      <div className="mx-auto max-w-7xl px-6 mt-20">
        <Reveal>
          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-navy-900 text-center">Chọn chúng tôi</h3>
        </Reveal>
        <StaggerGroup className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {whyChooseUs.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group text-center p-4 rounded-[16px] hover:bg-neutral-50 transition">
                <Image src={item.icon} alt={item.title} width={60} height={60} className="mx-auto group-hover:scale-110 transition" />
                <p className="mt-3 text-sm font-semibold text-navy-900">{item.title}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* CTA */}
      <Reveal className="mx-auto max-w-7xl px-6 mt-20">
        <div className="relative overflow-hidden rounded-[24px] bg-navy-900 text-white">
          <span className="absolute inset-y-0 left-0 w-2 bg-gold-500" />
          <div className="px-8 lg:px-12 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight">
                {aboutText.promise}
              </h3>
              <p className="mt-2 text-white/70">
                Đặt lịch tư vấn miễn phí cùng chuyên gia của Keystone.
              </p>
            </div>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-navy-900 transition hover:scale-[1.05] hover:bg-gold-400 whitespace-nowrap"
            >
              Liên hệ ngay <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
