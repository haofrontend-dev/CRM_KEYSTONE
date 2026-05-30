import Image from 'next/image'
import Link from 'next/link'
import { team } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Instructors() {
  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Đội ngũ chuyên gia"
            title="Những người dẫn dắt"
            description="Chuyên gia có kinh nghiệm thực chiến sâu sắc, tạo ra môi trường đào tạo có tính khuyến khích, động viên và thực tiễn cao."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {team.map((p) => (
            <StaggerItem key={p.name}>
              <div className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-[20px] shadow-[var(--shadow-soft)] transition-all duration-300 group-hover:shadow-[var(--shadow-premium)] group-hover:-translate-y-1">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{p.name}</h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
