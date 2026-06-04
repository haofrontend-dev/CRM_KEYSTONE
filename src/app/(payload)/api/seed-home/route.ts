import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const [services, testimonials, partners, daoTaoAi, slide1, slide2, slide3, aboutImage, centerImage] =
    await Promise.all([
      payload.find({ collection: 'services', limit: 20, sort: 'order' }),
      payload.find({ collection: 'testimonials', limit: 10 }),
      payload.find({ collection: 'partners', limit: 20, sort: 'order' }),
      payload.find({ collection: 'media', where: { filename: { equals: 'dao-tao-ai-trong-doanh-nghiep.jpg' } }, limit: 1 }),
      payload.find({ collection: 'media', where: { filename: { equals: '1.jpg' } }, limit: 1 }),
      payload.find({ collection: 'media', where: { filename: { equals: '2.jpg' } }, limit: 1 }),
      payload.find({ collection: 'media', where: { filename: { equals: '3.jpg' } }, limit: 1 }),
      payload.find({ collection: 'media', where: { filename: { equals: 'about-image.jpg' } }, limit: 1 }),
      payload.find({ collection: 'media', where: { filename: { equals: '22091734_226625397867655_1834460454_n.jpg' } }, limit: 1 }),
    ])

  const serviceIds = services.docs.map((d) => d.id)
  const testimonialIds = testimonials.docs.map((d) => d.id)
  const partnerIds = partners.docs.map((d) => d.id)
  const idDaoTaoAi = daoTaoAi.docs[0]?.id
  const id1 = slide1.docs[0]?.id
  const id2 = slide2.docs[0]?.id
  const id3 = slide3.docs[0]?.id
  const aboutImageId = aboutImage.docs[0]?.id
  const centerImageId = centerImage.docs[0]?.id

  const slides: Array<Record<string, unknown>> = []
  if (idDaoTaoAi) {
    slides.push({
      image: idDaoTaoAi,
      badge: 'Đào tạo Inhouse',
      headline: 'ỨNG DỤNG AI\nTRONG DOANH NGHIỆP',
      sub: 'Khoá đào tạo AI thực chiến — 1 ngày làm chủ 21 ứng dụng AI',
      ctaLabel: 'Xem thêm',
      ctaHref: '/dao-tao-ung-dung-ai',
    })
  }
  if (id2) {
    slides.push({
      image: id2,
      badge: 'Khám phá kết quả tốt hơn',
      headline: 'NÂNG CAO HIỆU QUẢ\nKINH DOANH',
      sub: 'Giải pháp đào tạo & tư vấn chuyên nghiệp',
      ctaLabel: 'Xem thêm',
      ctaHref: '/keystone',
    })
  }
  if (id1) {
    slides.push({
      image: id1,
      badge: 'Cách tiếp cận độc đáo',
      headline: 'CHO HIỆU SUẤT\nĐỈNH CAO',
      sub: 'Phương pháp đào tạo thực chiến',
      ctaLabel: 'Xem thêm',
      ctaHref: '/keystone',
    })
  }
  if (id3) {
    slides.push({
      image: id3,
      badge: 'Nâng cao thành tích kinh doanh',
      headline: 'HỆ THỐNG HOÁ\nLỰC LƯỢNG BÁN HÀNG',
      sub: 'Chiến lược bán hàng chuyên nghiệp',
      ctaLabel: 'Xem thêm',
      ctaHref: '/ban-hang',
    })
  }

  const layout: Array<Record<string, unknown>> = [
    { blockType: 'heroSlider', slides, autoplayMs: 5000 },
    {
      blockType: 'featureCards',
      eyebrow: 'Định vị thương hiệu',
      title: 'Vì sao chọn Keystone',
      items: [
        {
          imageUrl: '/images/trang-chu/khac-biet-150.png',
          title: 'KHÁC BIỆT',
          body: 'Chúng tôi tiên phong và ứng dụng sâu công nghệ trong việc phát triển con người, có thể kế đến lãnh vực như L&D, HR, Training…',
          linkLabel: 'Xem thêm',
          linkHref: '/keystone',
        },
        {
          imageUrl: '/images/trang-chu/su-mang-trang-200.png',
          title: 'SỨ MẠNG',
          body: 'Chúng tôi là cầu nối giữa hiện tại và mong đợi, bằng cách phát triển con người và giúp khách hàng đi đến thành công.',
          linkLabel: 'Xem thêm',
          linkHref: '/keystone',
        },
        {
          imageUrl: '/images/trang-chu/gia-tri-cot-loi-200.png',
          title: 'GIÁ TRỊ',
          body: 'EXPERT; INTEGRITY; CREATIVE; VALUABLE & GO EXTRA MILE',
          linkLabel: 'Xem thêm',
          linkHref: '/keystone',
        },
      ],
    },
    {
      blockType: 'intro',
      eyebrow: 'Về chúng tôi',
      title: 'KEYSTONE!?',
      paragraphs: [
        {
          text: 'Keystone là đơn vị đào tạo & tư vấn chuyên nghiệp. Chúng tôi cung cấp chuyên sâu các khóa đào tạo, huấn luyện và tư vấn cách hiệu quả dành cho doanh nghiệp. Ngoài ra, chúng tôi còn tiên phong trong việc đầu tư nghiên cứu và cung cấp những giải pháp về mặt công nghệ nhằm mục đích phát triển con người qua đó phát triển tổ chức.',
        },
        {
          text: 'Chuyên gia của chúng tôi đều có kinh nghiệm thực chiến sâu sắc, có thể tạo ra một môi trường học tập, đào tạo, phát triển, tư vấn có tính khuyến khích, động viên và thực tiễn cao.',
        },
        {
          text: 'Giải pháp của chúng tôi được thiết kế dành riêng cho từng loại hình đặc thù kinh doanh của doanh nghiệp, qua đó đáp ứng nhu cầu phát triển chiến lược chung một cách nhanh chóng và hiệu quả.',
        },
      ],
      keywords: [
        { label: 'Đào tạo' },
        { label: 'Tư vấn' },
        { label: 'Huấn luyện' },
        { label: 'Thiết kế Doanh nghiệp' },
        { label: 'Chương trình đặc biệt' },
        { label: 'HR tech' },
      ],
      ...(aboutImageId ? { image: aboutImageId } : {}),
    },
    {
      blockType: 'cta',
      title: 'CHÚNG TÔI CÓ THỂ TỐI ĐA HÓA HIỆU QUẢ KINH DOANH TRONG PHẠM VI NGÂN SÁCH',
      buttonLabel: 'Liên hệ',
      buttonHref: '/lien-he',
    },
    {
      blockType: 'services',
      eyebrow: 'Chúng tôi làm gì',
      title: 'Giải pháp toàn diện cho doanh nghiệp',
      items: serviceIds,
      ...(centerImageId ? { centerImage: centerImageId } : {}),
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Cảm nhận',
      title: 'Khách hàng nói về Keystone',
      items: testimonialIds,
    },
  ]

  layout.push(
    {
      blockType: 'featureList',
      eyebrow: 'Chọn chúng tôi',
      title: 'Vì sao doanh nghiệp chọn Keystone',
      imageUrl: '/images/trang-chu/about-image.jpg',
      items: [
        {
          imageUrl: '/images/trang-chu/chuong-trinh-chat-luong-80x80.png',
          title: 'Chương trình chất lượng',
          body: 'Chương trình là những best practices trong công việc và thực tế của chuyên gia để chuyển giao.',
        },
        {
          imageUrl: '/images/trang-chu/can-doi-ngan-sach-53.png',
          title: 'Đầu tư hợp ngân sách',
          body: 'Chúng tôi có nhiều cách tiếp cận về mặt ngân sách giúp bạn cân đối đầu tư và đạt mục đích.',
        },
        {
          imageUrl: '/images/trang-chu/linh-hoat-chuyen-nghiep-80x80.png',
          title: 'Linh hoạt & Chuyên nghiệp',
          body: 'Linh hoạt trong nhiều cách tiếp cận và chuyển giao giải pháp nhằm tối đa hóa nguồn lực, sáng tạo và đạt mục tiêu.',
        },
        {
          imageUrl: '/images/trang-chu/chuyen-gia-53x53.png',
          title: 'Chuyên gia giàu kinh nghiệm',
          body: 'Đội ngũ của chúng tôi là những chuyên gia đầu ngành trong lĩnh vực tương ứng.',
        },
        {
          imageUrl: '/images/trang-chu/phuong-phap-khoa-hoc-80x80.png',
          title: 'Phương pháp khoa học',
          body: 'Chúng tôi chuyển giao "cách làm tốt nhất" giúp bạn hiệu quả và nhanh chóng trở nên xuất sắc.',
        },
        {
          imageUrl: '/images/trang-chu/sang-tao-53.png',
          title: 'Sáng tạo và Đổi mới',
          body: 'Ứng dụng nhiều công cụ tư duy giúp giải quyết vấn đề một cách sáng tạo và đưa vào thực tiễn tạo ra lợi ích thiết thực.',
        },
      ],
    },
    {
      blockType: 'posts',
      eyebrow: 'Tin tức & bài viết',
      title: 'Cập nhật mới nhất từ Keystone',
      limit: 3,
      ctaLabel: 'Xem tất cả bài viết',
      ctaHref: '/blog',
    },
    {
      blockType: 'partners',
      eyebrow: 'Đối tác',
      title: 'Khách hàng tin cậy của Keystone',
      items: partnerIds,
    },
  )

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const data = {
    title: 'Trang chủ',
    slug: 'home',
    seo: {
      title: 'KEYSTONE | Training & Consulting — Developing People',
      description:
        'Keystone là đơn vị đào tạo & tư vấn chuyên nghiệp. Cung cấp chuyên sâu các khóa đào tạo, huấn luyện và tư vấn hiệu quả dành cho doanh nghiệp.',
    },
    layout,
  }

  if (existing.docs.length > 0) {
    const updated = await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: data as never,
    })
    return NextResponse.json({ action: 'updated', id: updated.id, blocks: layout.length })
  }

  const created = await payload.create({
    collection: 'pages',
    data: data as never,
  })
  return NextResponse.json({ action: 'created', id: created.id, blocks: layout.length })
}
