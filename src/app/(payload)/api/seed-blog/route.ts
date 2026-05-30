import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Trang chủ',
      title: 'Blog',
      subtitle: 'Cập nhật chia sẻ, kinh nghiệm và hoạt động mới nhất từ Keystone.',
      variant: 'navy',
    },
    {
      blockType: 'posts',
      eyebrow: 'Nổi bật',
      title: 'Bài viết liên quan',
      display: 'slider',
      limit: 8,
      autoplay: true,
      autoplaySpeed: 5000,
      ctaLabel: '',
      ctaHref: '/blog',
    },
    {
      blockType: 'features',
      eyebrow: 'Danh mục',
      title: 'Khám phá theo chủ đề',
      items: [
        {
          icon: 'flag',
          title: 'Tin tức',
          body: 'Cập nhật hoạt động, khóa học và sự kiện mới nhất từ Keystone.',
        },
        {
          icon: 'star',
          title: 'Sự kiện',
          body: 'Các chương trình public, workshop và buổi chia sẻ cộng đồng.',
        },
        {
          icon: 'brain',
          title: 'Kiến thức',
          body: 'Bài viết chuyên sâu về đào tạo, AI, công cụ và phát triển con người.',
        },
      ],
    },
    {
      blockType: 'posts',
      eyebrow: 'Tin tức',
      title: 'Tất cả bài viết',
      display: 'grid',
      limit: 6,
      paginate: true,
      ctaLabel: '',
      ctaHref: '/blog',
    },
  ]

  const data = {
    title: 'Blog',
    slug: 'blog',
    seo: {
      title: 'Blog | Keystone',
      description:
        'Blog Keystone — chia sẻ kinh nghiệm đào tạo, ứng dụng AI, công cụ tại nơi làm việc và hoạt động cộng đồng.',
    },
    layout,
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'blog' } },
    limit: 1,
  })

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
