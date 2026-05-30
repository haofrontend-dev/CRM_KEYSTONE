import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  // Find Tools @ Workplace related posts
  const toolsPosts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        in: [
          'crm-doanh-nghiep',
          'tools-for-trainers',
          'ung-dung-cong-nghe-smes',
          'gsheet-kho-ung-vien',
          'gsheet-kho-khach-hang',
          'cap-nhat-tools-workplace',
          'tools-workplace-pmu',
        ],
      },
    },
    limit: 10,
  })

  const postIds = toolsPosts.docs.map((p) => p.id)

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Đào tạo',
      title: 'Tools @ Workplace',
      subtitle: 'Ứng dụng công nghệ và công cụ số vào môi trường làm việc — Nâng cao hiệu suất và quản lý doanh nghiệp',
      variant: 'navy',
    },
    {
      blockType: 'intro',
      eyebrow: 'Tools @ Workplace',
      title: 'Ứng dụng Công cụ Công nghệ tại Nơi làm việc',
      paragraphs: [
        { text: 'KEYSTONE cung cấp các chương trình đào tạo ứng dụng công cụ công nghệ vào công việc thực tế. Từ CRM, Google Sheet đến các giải pháp công nghệ cho SMEs — giúp doanh nghiệp vận hành hiệu quả hơn.' },
        { text: 'Các chương trình bao gồm: Triển khai CRM, Tools for Trainers, ứng dụng Google Sheet xây dựng kho dữ liệu khách hàng và ứng viên, nâng cao hiệu suất quản lý cho doanh nghiệp vừa và nhỏ.' },
      ],
      keywords: [
        { label: 'CRM' },
        { label: 'Google Sheet' },
        { label: 'SMEs' },
        { label: 'Trainers' },
        { label: 'Công nghệ' },
        { label: 'Hiệu suất' },
      ],
    },
    {
      blockType: 'posts',
      eyebrow: 'Chương trình',
      title: 'Các khóa đào tạo Tools @ Workplace',
      display: 'grid',
      limit: 8,
      ...(postIds.length > 0 ? { pinned: postIds } : {}),
      ctaLabel: 'Xem tất cả bài viết',
      ctaHref: '/blog',
    },
    {
      blockType: 'cta',
      title: 'Bạn muốn nâng cao hiệu suất làm việc bằng công nghệ?',
      body: 'Liên hệ ngay để được tư vấn chương trình Tools @ Workplace phù hợp nhất cho doanh nghiệp.',
      buttonLabel: 'Liên hệ tư vấn',
      buttonHref: '/lien-he',
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tools-at-workplace' } },
    limit: 1,
  })

  const data = {
    title: 'Tools @ Workplace',
    slug: 'tools-at-workplace',
    seo: {
      title: 'Tools @ Workplace — Ứng dụng Công nghệ Doanh nghiệp | KEYSTONE',
      description: 'Chương trình đào tạo ứng dụng công cụ công nghệ tại nơi làm việc. CRM, Google Sheet, Tools for Trainers. Liên hệ KEYSTONE ngay.',
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
