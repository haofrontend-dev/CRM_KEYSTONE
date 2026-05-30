import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Events',
      title: 'Public Events',
      subtitle: 'Các sự kiện công khai, khóa học public và chương trình đào tạo mở do KEYSTONE tổ chức',
      variant: 'navy',
    },
    {
      blockType: 'intro',
      eyebrow: 'Events',
      title: 'Sự kiện & Khóa học Public',
      paragraphs: [
        { text: 'KEYSTONE thường xuyên tổ chức các sự kiện đào tạo công khai, khóa học public và workshop chuyên đề cho cá nhân và doanh nghiệp. Đây là cơ hội để bạn trải nghiệm trực tiếp phương pháp đào tạo của KEYSTONE.' },
        { text: 'Các sự kiện bao gồm: Khóa AI Public, Workshop Công nghệ, Seminar Quản lý, chương trình GROUPs và nhiều sự kiện hợp tác chuyên biệt khác.' },
      ],
      keywords: [
        { label: 'Sắp diễn ra' },
        { label: 'AI Public' },
        { label: 'Workshop' },
        { label: 'Seminar' },
        { label: 'GROUPs' },
        { label: 'Networking' },
      ],
    },
    {
      blockType: 'posts',
      eyebrow: 'Sự kiện',
      title: 'Các sự kiện sắp diễn ra & đã diễn ra',
      display: 'grid',
      limit: 9,
      ctaLabel: 'Xem tất cả bài viết',
      ctaHref: '/blog',
    },
    {
      blockType: 'cta',
      title: 'Bạn muốn tham gia sự kiện?',
      body: 'Liên hệ ngay để đăng ký tham gia các sự kiện và khóa học public sắp tới của KEYSTONE.',
      buttonLabel: 'Liên hệ đăng ký',
      buttonHref: '/lien-he',
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'public-event' } },
    limit: 1,
  })

  const data = {
    title: 'Public Events',
    slug: 'public-event',
    seo: {
      title: 'Public Events — Sự kiện & Khóa học Công khai | KEYSTONE',
      description: 'Sự kiện đào tạo công khai, khóa học public, workshop và seminar do KEYSTONE tổ chức. Đăng ký tham gia ngay.',
    },
    layout,
  }

  if (existing.docs.length > 0) {
    const u = await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: data as never,
    })
    return NextResponse.json({ action: 'updated', id: u.id, blocks: layout.length })
  }

  const c = await payload.create({
    collection: 'pages',
    data: data as never,
  })
  return NextResponse.json({ action: 'created', id: c.id, blocks: layout.length })
}
