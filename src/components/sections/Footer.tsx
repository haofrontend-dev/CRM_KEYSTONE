import Link from 'next/link'
import Image from 'next/image'
import { footerServices, footerTraining, footerSupport, siteInfo } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'

const supportLinks: Record<string, string> = {
  'Chính sách và quyền riêng tư': '/chinh-sach-va-quyen-rieng-tu',
  'Điều khoản sử dụng': '/dieu-khoan-su-dung',
  'Những câu hỏi thường gặp': '/cau-hoi-thuong-gap',
  'Hoàn trả và hủy vé': '/hoan-tra-va-huy-ve',
  'Phương thức giao hàng': '/phuong-thuc-giao-hang',
  'Hướng dẫn mua vé': '/huong-dan-mua-ve',
}

export async function Footer() {
  const settings = await getPayloadClient()
    .then((p) => p.findGlobal({ slug: 'site-settings', depth: 1 }))
    .catch(() => null)

  const f = settings?.footer ?? {}
  const logoUrl = resolveMediaUrl(f.logo) ?? '/images/trang-chu/keystone-white-300x150.png'
  const slogan = f.slogan || siteInfo.slogan
  const subSlogan = f.subSlogan || siteInfo.subSlogan
  const hotline = settings?.hotline || siteInfo.hotline
  const email = settings?.email || siteInfo.email
  const legalName = f.legalName || siteInfo.legalName
  const representative = f.representative || siteInfo.representative
  const taxCode = (f as Record<string, string | undefined>).taxCode || (settings as unknown as { taxCode?: string })?.taxCode || siteInfo.taxCode
  const address = settings?.address || siteInfo.address
  const brand = settings?.siteName || siteInfo.brand
  // Danh sách hotline/email đầy đủ (số/email chính lấy từ DB nếu có)
  const hotlines = Array.from(new Set([hotline, ...siteInfo.hotlines]))
  const emails = Array.from(new Set([email, ...siteInfo.emails]))
  const telHref = (v: string) => `tel:${v.replace(/\s+/g, '')}`

  type BadgeData = {
    image?: MediaRel
    imageUrl?: string | null
    link?: string | null
    alt?: string | null
    whiteBg?: boolean | null
    height?: number | null
  }
  const configured = (f.badges ?? []) as BadgeData[]
  const badges: BadgeData[] = configured.length > 0 ? configured : DEFAULT_BADGES

  return (
    <footer className="topo-pattern text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image src={logoUrl} alt={brand} width={150} height={75} className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm text-white/60 leading-[1.7]">
              {slogan}
              <br />
              {subSlogan}
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div>
                <span className="font-semibold text-white">Hotline:</span>{' '}
                {hotlines.map((h, i) => (
                  <span key={h}>
                    {i > 0 && <span className="text-white/30"> · </span>}
                    <a href={telHref(h)} className="hover:text-gold-400 transition">{h}</a>
                  </span>
                ))}
              </div>
              <div>
                <span className="font-semibold text-white">Email:</span>{' '}
                {emails.map((e, i) => (
                  <span key={e}>
                    {i > 0 && <span className="text-white/30"> · </span>}
                    <a href={`mailto:${e}`} className="hover:text-gold-400 transition">{e}</a>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="font-serif text-lg font-bold tracking-tight">DỊCH VỤ</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link href={`/${s.toLowerCase().replace(/\s+/g, '-').replace(/ạ|à|á|ả|ã/g, 'a').replace(/đ/g, 'd')}`} className="hover:text-gold-400 transition">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Đào tạo */}
          <div>
            <h3 className="font-serif text-lg font-bold tracking-tight">ĐÀO TẠO</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {footerTraining.map((t) => (
                <li key={t}>
                  <Link href="/dao-tao" className="hover:text-gold-400 transition">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="font-serif text-lg font-bold tracking-tight">HỖ TRỢ</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {footerSupport.map((s) => (
                <li key={s}>
                  <Link href={supportLinks[s] ?? '#'} className="hover:text-gold-400 transition">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="text-sm text-white/60 leading-[1.7]">
              <p className="font-semibold text-white/80">{legalName}</p>
              <p className="mt-1">Người đại diện: {representative}</p>
              {taxCode && <p>Mã số thuế: {taxCode}</p>}
              <p>{address}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {badges.map((b, i) => (
                <FooterBadge key={i} {...b} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-white/50">
          © 2025 Bản quyền thuộc về {brand}. {slogan}
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3 pointer-events-auto">
        <FloatBtn label="Hotline" color="bg-red-500" icon="phone" />
        <FloatBtn label="Messenger" color="bg-blue-500" icon="message" />
      </div>
    </footer>
  )
}

type BadgeProps = {
  image?: MediaRel
  imageUrl?: string | null
  link?: string | null
  alt?: string | null
  whiteBg?: boolean | null
  height?: number | null
}

const DEFAULT_BADGES: BadgeProps[] = [
  {
    imageUrl: '/images/trang-chu/da-thong-bao-bo-cong-thuong.png',
    link: 'http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=55874',
    alt: 'Đã thông báo Bộ Công Thương',
    whiteBg: false,
    height: 44,
  },
  {
    imageUrl:
      'https://images.dmca.com/Badges/dmca-badge-w100-2x1-03.png?ID=c9bd5e4d-c9aa-4ef8-ad8d-37328b2f32d7',
    link: 'https://www.dmca.com/Protection/Status.aspx?ID=c9bd5e4d-c9aa-4ef8-ad8d-37328b2f32d7',
    alt: 'DMCA.com Protection Status',
    whiteBg: false,
    height: 28,
  },
]

function FooterBadge({ image, imageUrl, link, alt, whiteBg, height }: BadgeProps) {
  const src = resolveMediaUrl(image) ?? imageUrl
  if (!src) return null
  const h = height ?? 44
  const label = alt ?? 'Badge'
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label} style={{ height: h }} className="w-auto" />
  )
  const wrapClass = whiteBg
    ? 'inline-block rounded-md bg-white/95 p-1.5 transition hover:bg-white'
    : 'inline-block transition hover:opacity-80'
  if (!link) return <span className={wrapClass}>{img}</span>
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} className={wrapClass}>
      {img}
    </a>
  )
}

function FloatBtn({ label, color, icon }: { label: string; color: string; icon: 'phone' | 'message' }) {
  return (
    <a
      href="#"
      aria-label={label}
      className={`${color} w-12 h-12 inline-flex items-center justify-center rounded-full text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:scale-110 transition`}
    >
      <Icon name={icon} size={20} />
    </a>
  )
}
