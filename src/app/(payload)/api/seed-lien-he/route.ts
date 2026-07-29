import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const [bg, aboutImg] = await Promise.all([
    payload.find({
      collection: 'media',
      where: { filename: { equals: 'page-title-1.jpg' } },
      limit: 1,
    }),
    payload.find({
      collection: 'media',
      where: { filename: { equals: 'about-image.jpg' } },
      limit: 1,
    }),
  ])
  const bgId = bg.docs[0]?.id
  const aboutImgId = aboutImg.docs[0]?.id

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Trang chủ',
      title: 'Liên hệ',
      subtitle: 'KEYSTONE luôn sẵn sàng đồng hành cùng doanh nghiệp của bạn.',
      variant: 'navy',
      ...(bgId ? { backgroundImage: bgId } : {}),
    },
    {
      blockType: 'features',
      eyebrow: 'Kết nối',
      title: 'Thông tin liên hệ',
      items: [
        {
          icon: 'compass',
          title: 'Địa chỉ',
          body: 'Tòa nhà Barotex, Số 6 Võ Văn Kiệt, Phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam.',
        },
        {
          icon: 'flag',
          title: 'Hotline',
          body: '0903 997 909 · 0933 088 286 · 0342 528 286 — Phục vụ từ Thứ 2 đến Chủ Nhật, 8h30 — 18h30.',
        },
        {
          icon: 'spark',
          title: 'Email',
          body: 'info@plusai.vn · training@plusai.vn — Phản hồi trong vòng 24 giờ làm việc.',
        },
      ],
    },
    {
      blockType: 'split',
      imagePosition: 'right',
      eyebrow: 'Về KEYSTONE',
      title: 'Đối tác đào tạo & HR Tech tin cậy',
      paragraphs: [
        {
          text: 'CÔNG TY TNHH 1YEARS (thương hiệu KEYSTONE) chuyên cung cấp giải pháp đào tạo, huấn luyện và công nghệ nhân sự cho doanh nghiệp tại Việt Nam.',
        },
        {
          text: 'Đội ngũ chuyên gia của chúng tôi đã đồng hành cùng nhiều khách hàng lớn như Bridgestone, Coca-Cola, Grab, Nestlé, Samsung, Sumitomo, Bayer, Hafele…',
        },
      ],
      bullets: [
        { text: 'Người đại diện: Ngô Hà Tiên' },
        { text: 'Mã số thuế: 0319452642' },
        { text: 'Đào tạo Inhouse — Public Training — Coaching 1-1' },
        { text: 'HR Tech — Marketing Automation — Ứng dụng AI' },
        { text: 'Teambuilding — Thiết kế doanh nghiệp' },
      ],
      ctaLabel: 'Tìm hiểu thêm',
      ctaHref: '/keystone',
      background: 'white',
      ...(aboutImgId ? { image: aboutImgId } : {}),
    },
    {
      blockType: 'contactForm',
      eyebrow: 'Liên hệ',
      title: 'Gửi tin nhắn cho chúng tôi',
      description:
        'Điền form bên dưới — đội ngũ KEYSTONE sẽ liên hệ lại trong vòng 24 giờ làm việc.',
      submitLabel: 'Gửi tin nhắn',
      successMessage: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.',
    },
    {
      blockType: 'map',
      eyebrow: 'Bản đồ',
      title: 'Văn phòng KEYSTONE',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0024368587597!2d106.7079239!3d10.811124600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529d056fa3f27%3A0xf91628424668a5ad!2sKEYSTONE!5e0!3m2!1sen!2s!4v1712393721578!5m2!1sen!2s',
      height: 450,
    },
    {
      blockType: 'intro',
      eyebrow: 'Giờ làm việc',
      title: 'Sẵn sàng phục vụ bạn',
      paragraphs: [
        {
          text: 'Văn phòng KEYSTONE mở cửa từ Thứ 2 đến Chủ Nhật, từ 8h30 đến 18h30. Đối với các yêu cầu tư vấn doanh nghiệp, vui lòng đặt lịch trước qua hotline hoặc email để được phục vụ tốt nhất.',
        },
        {
          text: 'Với các đối tác và khách hàng ở xa, KEYSTONE hỗ trợ tư vấn trực tuyến qua Google Meet / Zoom — đăng ký lịch hẹn qua email training@plusai.vn.',
        },
      ],
      keywords: [
        { label: 'Mon - Sun: 8h30 — 18h30' },
        { label: 'Tư vấn miễn phí' },
        { label: 'Online / Offline' },
      ],
    },
    {
      blockType: 'cta',
      title: 'Bắt đầu hành trình cùng KEYSTONE',
      body: 'Liên hệ ngay để được tư vấn giải pháp đào tạo và HR Tech phù hợp với doanh nghiệp của bạn.',
      buttonLabel: 'Gọi ngay 0903 997 909',
      buttonHref: 'tel:0903997909',
    },
  ]

  const data = {
    title: 'Liên hệ',
    slug: 'lien-he',
    seo: {
      title: 'Liên hệ | KEYSTONE',
      description:
        'Liên hệ KEYSTONE — đối tác đào tạo và HR Tech tin cậy. Hotline 0903 997 909, email info@plusai.vn.',
    },
    layout,
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'lien-he' } },
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
