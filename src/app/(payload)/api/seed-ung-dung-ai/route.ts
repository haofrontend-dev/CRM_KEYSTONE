import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  // Find AI-related posts to pin
  const aiPosts = await payload.find({
    collection: 'posts',
    where: {
      or: [
        { slug: { like: 'ai' } },
        { slug: { like: 'dao-tao-ung-dung-ai' } },
        { title: { like: 'AI' } },
      ],
    },
    limit: 10,
    sort: '-createdAt',
  })

  const aiPostIds = aiPosts.docs.map((p) => p.id)

  const layout: Array<Record<string, unknown>> = [
    // 1) Hero banner
    {
      blockType: 'hero',
      breadcrumb: 'Đào tạo',
      title: 'Ứng Dụng AI',
      subtitle: 'Chương trình đào tạo ứng dụng AI trong doanh nghiệp — Nâng cao hiệu suất với công nghệ trí tuệ nhân tạo',
      variant: 'navy',
    },
    // 2) Intro section
    {
      blockType: 'intro',
      eyebrow: 'Ứng Dụng AI',
      title: 'Đào tạo Ứng dụng AI cho Doanh nghiệp',
      paragraphs: [
        { text: 'KEYSTONE cung cấp các chương trình đào tạo ứng dụng AI chuyên sâu, được thiết kế riêng cho doanh nghiệp Việt Nam. Từ AI cơ bản đến nâng cao, chúng tôi giúp đội ngũ của bạn nắm bắt và ứng dụng công nghệ trí tuệ nhân tạo vào công việc hàng ngày.' },
        { text: 'Các chương trình bao gồm: Đào tạo Inhouse AI cho doanh nghiệp, khoá học AI công khai (Public), đào tạo AI sáng tạo nội dung, và chương trình Mastering AI for Work — giúp nhân viên làm chủ công nghệ AI trong mọi lĩnh vực.' },
      ],
      keywords: [
        { label: 'ChatGPT' },
        { label: 'AI for Work' },
        { label: 'Inhouse Training' },
        { label: 'Public Course' },
        { label: 'Sáng tạo nội dung' },
        { label: 'Doanh nghiệp' },
      ],
    },
    // 3) AI-related blog posts
    {
      blockType: 'posts',
      eyebrow: 'Chương trình',
      title: 'Các khóa đào tạo AI',
      limit: 6,
      ...(aiPostIds.length > 0 ? { pinned: aiPostIds } : {}),
      ctaLabel: 'Xem tất cả bài viết',
      ctaHref: '/blog',
    },
    // 4) CTA
    {
      blockType: 'cta',
      title: 'Bạn muốn đào tạo AI cho doanh nghiệp?',
      body: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo Ứng dụng AI phù hợp nhất.',
      buttonLabel: 'Liên hệ tư vấn',
      buttonHref: '/lien-he',
    },
  ]

  // Upsert page
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'ung-dung-ai' } },
    limit: 1,
  })

  const data = {
    title: 'Ứng Dụng AI',
    slug: 'ung-dung-ai',
    seo: {
      title: 'Ứng Dụng AI — Đào tạo AI cho Doanh nghiệp | KEYSTONE',
      description: 'Chương trình đào tạo ứng dụng AI chuyên sâu cho doanh nghiệp. Inhouse training, public course, Mastering AI for Work. Liên hệ KEYSTONE ngay.',
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
