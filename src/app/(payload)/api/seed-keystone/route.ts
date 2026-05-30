import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const [team, services, testimonials, partners, nenTang, khacBiet] = await Promise.all([
    payload.find({ collection: 'team', limit: 20, sort: 'order' }),
    payload.find({ collection: 'services', limit: 20, sort: 'order' }),
    payload.find({ collection: 'testimonials', limit: 10 }),
    payload.find({ collection: 'partners', limit: 20, sort: 'order' }),
    payload.find({ collection: 'media', where: { filename: { equals: 'NenTang.jpg' } }, limit: 1 }),
    payload.find({ collection: 'media', where: { filename: { equals: 'KhacBiet.jpg' } }, limit: 1 }),
  ])

  const teamIds = team.docs.map((d) => d.id)
  const serviceIds = services.docs.map((d) => d.id)
  const testimonialIds = testimonials.docs.map((d) => d.id)
  const partnerIds = partners.docs.map((d) => d.id)
  const nenTangId = nenTang.docs[0]?.id
  const khacBietId = khacBiet.docs[0]?.id

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Keystone!?',
      title: 'Keystone!?',
      subtitle: 'Developing People — Giải pháp đào tạo chuyên nghiệp.',
      variant: 'navy',
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
          text: 'Giải pháp của chúng tôi được thiết kế dành riêng cho từng loại hình đặc thù kinh doanh của doanh nghiệp, qua đó đáp ứng nhu cầu phát triển chiến lược chung của doanh nghiệp một cách nhanh chóng và hiệu quả.',
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
    },
    {
      blockType: 'cta',
      title: 'CHÚNG TÔI CÓ THỂ TỐI ĐA HÓA HIỆU QUẢ KINH DOANH TRONG PHẠM VI NGÂN SÁCH',
      buttonLabel: 'Liên hệ',
      buttonHref: '/lien-he',
    },
  ]

  if (nenTangId) {
    layout.push({
      blockType: 'image',
      image: nenTangId,
      caption: '',
      fullBleed: true,
    })
  }

  layout.push(
    {
      blockType: 'stats',
      eyebrow: 'Số liệu thống kê',
      title: 'Hành trình của chúng tôi',
      background: 'light',
      items: [
        { value: '20+', label: 'Nhân viên' },
        { value: '99%', label: 'Khách hàng hài lòng' },
        { value: '1500+', label: 'Hợp đồng' },
        { value: '4.8/5', label: 'Đánh giá' },
      ],
    },
    {
      blockType: 'team',
      eyebrow: 'Đội ngũ',
      title: 'Đội ngũ chuyên gia',
      description:
        'Những người dẫn dắt Keystone — kinh nghiệm thực chiến và đam mê phát triển con người.',
      members: teamIds,
    },
    {
      blockType: 'testimonials',
      eyebrow: 'Cảm nhận',
      title: 'Khách hàng nói về Keystone',
      items: testimonialIds,
    },
    {
      blockType: 'services',
      eyebrow: 'Chúng tôi làm gì',
      title: 'Giải pháp toàn diện cho doanh nghiệp',
      items: serviceIds,
    },
  )

  if (khacBietId) {
    layout.push({
      blockType: 'split',
      imagePosition: 'right',
      eyebrow: 'Sự khác biệt',
      title: 'Điều làm nên Keystone',
      paragraphs: [
        {
          text: 'Chúng tôi không bán "khóa học" — chúng tôi cam kết kết quả. Mỗi chương trình được thiết kế riêng cho doanh nghiệp, với KPI rõ ràng và đo lường được sau 90 ngày triển khai.',
        },
        {
          text: 'Sự kết hợp giữa chuyên gia thực chiến, phương pháp khoa học và ứng dụng công nghệ tiên phong giúp Keystone trở thành đối tác đáng tin cậy của hàng trăm doanh nghiệp Việt.',
        },
      ],
      bullets: [
        { text: 'Đội ngũ trainer/coach với 10+ năm kinh nghiệm thực tế' },
        { text: 'Phương pháp BOTT, đo lường KPI rõ ràng' },
        { text: 'Tích hợp AI và HRTech vào mọi giải pháp' },
        { text: 'Cam kết kết quả, đồng hành dài hạn' },
      ],
      image: khacBietId,
      ctaLabel: 'Tìm hiểu thêm',
      ctaHref: '/lien-he',
      background: 'light',
    })
  }

  layout.push(
    {
      blockType: 'features',
      eyebrow: 'Chọn chúng tôi',
      title: 'Vì sao doanh nghiệp chọn Keystone',
      items: [
        {
          icon: 'shield',
          title: 'Chương trình chất lượng',
          body: 'Chương trình là những best practices trong công việc và thực tế của chuyên gia để chuyển giao.',
        },
        {
          icon: 'chart',
          title: 'Đầu tư hợp ngân sách',
          body: 'Chúng tôi có nhiều cách tiếp cận về mặt ngân sách giúp bạn cân đối đầu tư và đạt mục đích.',
        },
        {
          icon: 'spark',
          title: 'Linh hoạt & Chuyên nghiệp',
          body: 'Linh hoạt trong nhiều cách tiếp cận và chuyển giao giải pháp nhằm tối đa hóa nguồn lực, sáng tạo và đạt mục tiêu.',
        },
        {
          icon: 'users',
          title: 'Chuyên gia giàu kinh nghiệm',
          body: 'Đội ngũ của chúng tôi là những chuyên gia đầu ngành trong lĩnh vực tương ứng.',
        },
        {
          icon: 'compass',
          title: 'Phương pháp khoa học',
          body: 'Chúng tôi chuyển giao "cách làm tốt nhất" giúp bạn hiệu quả và nhanh chóng trở nên xuất sắc.',
        },
        {
          icon: 'flag',
          title: 'Sáng tạo và Đổi mới',
          body: 'Ứng dụng nhiều công cụ tư duy giúp giải quyết vấn đề một cách sáng tạo và đưa vào thực tiễn tạo ra lợi ích thiết thực.',
        },
      ],
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
    where: { slug: { equals: 'keystone' } },
    limit: 1,
  })

  const data = {
    title: 'Keystone!?',
    slug: 'keystone',
    seo: {
      title: 'KEYSTONE!? — Đơn vị đào tạo & tư vấn chuyên nghiệp',
      description:
        'Keystone là đơn vị đào tạo & tư vấn chuyên nghiệp. Chuyên sâu các khóa đào tạo, huấn luyện và tư vấn hiệu quả dành cho doanh nghiệp.',
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
