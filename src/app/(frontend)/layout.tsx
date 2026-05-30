import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Keystone — Đối tác đào tạo AI hàng đầu',
  description:
    'Nâng tầm doanh nghiệp Việt với sức mạnh AI. Dịch vụ tư vấn, đào tạo và chuyển đổi số toàn diện.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
