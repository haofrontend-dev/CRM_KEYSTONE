import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const bg = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'page-title-1.jpg' } },
    limit: 1,
  })
  const bgId = bg.docs[0]?.id

  const layout: Array<Record<string, unknown>> = [
    {
      blockType: 'hero',
      breadcrumb: 'Trang chủ',
      title: 'Tuyển Dụng',
      subtitle: 'Cùng KEYSTONE phát triển con người — phát triển doanh nghiệp.',
      variant: 'navy',
      ...(bgId ? { backgroundImage: bgId } : {}),
    },
    {
      blockType: 'intro',
      eyebrow: 'Cơ hội nghề nghiệp',
      title: 'Gia nhập đội ngũ KEYSTONE',
      paragraphs: [
        {
          text: 'KEYSTONE là công ty công nghệ và đào tạo, đồng hành cùng doanh nghiệp trong các chương trình phát triển con người, ứng dụng AI và công cụ làm việc hiện đại. Chúng tôi tin rằng đội ngũ là tài sản quan trọng nhất.',
        },
        {
          text: 'Tại KEYSTONE, bạn sẽ làm việc với các chuyên gia trong ngành Training, HR Tech, Marketing Automation; tiếp xúc trực tiếp với khách hàng doanh nghiệp lớn và được trao quyền triển khai dự án thực tế.',
        },
        {
          text: 'Nếu bạn yêu thích đào tạo, công nghệ và muốn cùng KEYSTONE kiến tạo những giải pháp phát triển con người ý nghĩa — hãy gia nhập cùng chúng tôi.',
        },
      ],
      keywords: [
        { label: 'Developing People' },
        { label: 'Training & Coaching' },
        { label: 'HR Technology' },
        { label: 'Ứng dụng AI' },
      ],
    },
    {
      blockType: 'features',
      eyebrow: 'Quyền lợi',
      title: 'Vì sao chọn KEYSTONE',
      items: [
        {
          icon: 'spark',
          title: 'Môi trường học hỏi',
          body: 'Tiếp xúc với hệ thống tri thức đào tạo & công nghệ cập nhật, các chuyên gia đầu ngành và khách hàng doanh nghiệp lớn.',
        },
        {
          icon: 'chart',
          title: 'Thu nhập cạnh tranh',
          body: 'Lương cứng + thưởng dự án + hoa hồng đào tạo. Đánh giá năng lực định kỳ, lộ trình tăng lương rõ ràng.',
        },
        {
          icon: 'users',
          title: 'Đội ngũ trẻ — gắn kết',
          body: 'Team năng động, văn hoá tôn trọng đóng góp cá nhân, sẵn sàng đồng hành cùng bạn phát triển sự nghiệp.',
        },
        {
          icon: 'brain',
          title: 'Phát triển chuyên môn',
          body: 'Tham gia miễn phí các khoá đào tạo nội bộ về AI, công cụ làm việc, kỹ năng đào tạo & huấn luyện.',
        },
        {
          icon: 'compass',
          title: 'Cơ hội thăng tiến',
          body: 'Lộ trình phát triển từ chuyên viên → trưởng nhóm → quản lý dự án, dựa trên năng lực và đóng góp.',
        },
        {
          icon: 'star',
          title: 'Phúc lợi đầy đủ',
          body: 'BHXH, BHYT, BHTN theo quy định; nghỉ phép có lương; team building, du lịch hàng năm; quà sinh nhật & các dịp lễ.',
        },
      ],
    },
    {
      blockType: 'categoryList',
      eyebrow: 'Vị trí đang tuyển',
      title: 'Các vị trí tuyển dụng',
      description:
        'Xem chi tiết vị trí phù hợp và gửi CV qua email: training@plusai.vn',
      display: 'accordion',
      groups: [
        {
          icon: 'users',
          title: 'Training & Consulting',
          description: 'Đội ngũ thiết kế và triển khai các chương trình đào tạo cho doanh nghiệp.',
          items: [
            { text: 'Training Consultant — Tư vấn giải pháp đào tạo' },
            { text: 'Learning Designer — Thiết kế chương trình đào tạo' },
            { text: 'Senior Trainer — Trainer chuyên sâu các chủ đề AI / Tools @ Workplace' },
            { text: 'Project Manager — Quản lý dự án đào tạo inhouse' },
          ],
        },
        {
          icon: 'cpu',
          title: 'HR Technology',
          description: 'Đội ngũ xây dựng và triển khai giải pháp HR Tech, automation cho khách hàng.',
          items: [
            { text: 'HR Tech Consultant — Tư vấn triển khai Mautic / CRM / Google Workspace' },
            { text: 'Marketing Automation Specialist — Vận hành automation flows' },
            { text: 'Data Analyst (HR) — Phân tích & xây dựng dashboard nhân sự' },
          ],
        },
        {
          icon: 'layers',
          title: 'Marketing & Operations',
          description: 'Đội ngũ truyền thông, vận hành và phát triển khách hàng.',
          items: [
            { text: 'Content Marketing — Sản xuất nội dung blog, social, email' },
            { text: 'Customer Success — Chăm sóc khách hàng doanh nghiệp' },
            { text: 'Event Coordinator — Tổ chức Public Events, Workshop' },
          ],
        },
      ],
    },
    {
      blockType: 'cta',
      title: 'Sẵn sàng gia nhập KEYSTONE?',
      body: 'Gửi CV của bạn về training@plusai.vn — chúng tôi sẽ phản hồi trong vòng 3 ngày làm việc.',
      buttonLabel: 'Ứng tuyển ngay',
      buttonHref: 'mailto:training@plusai.vn',
    },
  ]

  const data = {
    title: 'Tuyển Dụng',
    slug: 'tuyen-dung',
    seo: {
      title: 'Tuyển Dụng | KEYSTONE',
      description:
        'Cơ hội nghề nghiệp tại KEYSTONE — công ty công nghệ và đào tạo. Cùng chúng tôi phát triển con người, phát triển doanh nghiệp.',
    },
    layout,
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tuyen-dung' } },
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
