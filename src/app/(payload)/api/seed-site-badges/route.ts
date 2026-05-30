import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const current = await payload.findGlobal({ slug: 'site-settings', depth: 0 }).catch(() => null)
  const footer = (current?.footer ?? {}) as Record<string, unknown>

  const badges = [
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

  const updated = await payload.updateGlobal({
    slug: 'site-settings',
    data: { footer: { ...footer, badges } } as never,
  })

  return NextResponse.json({
    action: 'updated',
    badges: (updated.footer?.badges ?? []).length,
  })
}
