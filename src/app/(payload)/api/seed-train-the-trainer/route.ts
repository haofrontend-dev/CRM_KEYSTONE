import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  // Find Train The Trainer post
  const tttPost = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'dao-tao-train-the-trainer' } },
    limit: 1,
  })

  const postIds = tttPost.docs.map((p) => p.id)

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Đào tạo',
      title: 'Train The Trainer',
      subtitle: 'Chương trình đào tạo giảng viên nội bộ — Xây dựng đội ngũ huấn luyện viên chuyên nghiệp cho doanh nghiệp',
      variant: 'navy',
    },
    {
      blockType: 'intro',
      eyebrow: 'Train The Trainer',
      title: 'Đào tạo Giảng viên Nội bộ',
      paragraphs: [
        { text: 'KEYSTONE cung cấp chương trình Train The Trainer chuyên sâu, giúp doanh nghiệp xây dựng đội ngũ giảng viên nội bộ có năng lực thiết kế và triển khai các chương trình đào tạo hiệu quả.' },
        { text: 'Chương trình trang bị kỹ năng thiết kế bài giảng, phương pháp truyền đạt, kỹ thuật tương tác và đánh giá kết quả đào tạo — giúp giảng viên nội bộ tự tin dẫn dắt mọi chương trình training tại doanh nghiệp.' },
      ],
      keywords: [
        { label: 'Giảng viên nội bộ' },
        { label: 'Thiết kế bài giảng' },
        { label: 'Phương pháp đào tạo' },
        { label: 'Inhouse Training' },
        { label: 'Kỹ năng truyền đạt' },
      ],
    },
    {
      blockType: 'posts',
      eyebrow: 'Chương trình',
      title: 'Khóa đào tạo Train The Trainer',
      display: 'grid',
      limit: 4,
      ...(postIds.length > 0 ? { pinned: postIds } : {}),
      ctaLabel: 'Xem tất cả bài viết',
      ctaHref: '/blog',
    },
    {
      blockType: 'cta',
      title: 'Bạn muốn xây dựng đội ngũ giảng viên nội bộ?',
      body: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình Train The Trainer phù hợp nhất cho doanh nghiệp.',
      buttonLabel: 'Liên hệ tư vấn',
      buttonHref: '/lien-he',
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'train-the-trainer' } },
    limit: 1,
  })

  const data = {
    title: 'Train The Trainer',
    slug: 'train-the-trainer',
    seo: {
      title: 'Train The Trainer — Đào tạo Giảng viên Nội bộ | KEYSTONE',
      description: 'Chương trình đào tạo giảng viên nội bộ chuyên nghiệp. Thiết kế bài giảng, phương pháp truyền đạt, kỹ thuật tương tác. Liên hệ KEYSTONE.',
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
