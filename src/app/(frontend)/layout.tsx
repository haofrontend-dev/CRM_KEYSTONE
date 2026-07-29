import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, type MediaRel } from '@/components/blocks/types'
import './globals.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0


const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateMetadata(): Promise<Metadata> {
  // Lấy favicon từ Global site-settings (DB) để render <link rel="icon">.
  let iconUrl: string | undefined
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
    iconUrl = resolveMediaUrl(settings?.favicon as MediaRel) ?? undefined
  } catch {
    // Không chặn render trang nếu chưa cấu hình favicon.
  }

  return {
    title: 'Keystone — Đối tác đào tạo AI hàng đầu',
    description:
      'Nâng tầm doanh nghiệp Việt với sức mạnh AI. Dịch vụ tư vấn, đào tạo và chuyển đổi số toàn diện.',
    icons: iconUrl
      ? { icon: [{ url: iconUrl, type: 'image/jpeg' }], shortcut: [{ url: iconUrl }] }
      : undefined,
  }
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
