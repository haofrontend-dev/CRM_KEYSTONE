import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type PageDef = {
  title: string
  slug: string
  seoTitle: string
  seoDesc: string
  heroSubtitle: string
  introTitle: string
  introParagraphs: string[]
  introKeywords: string[]
  postsTitle: string
  pinnedSlugs: string[]
  ctaTitle: string
  ctaBody: string
}

const pages: PageDef[] = [
  {
    title: 'Lãnh đạo',
    slug: 'lanh-dao',
    seoTitle: 'Lãnh đạo — Đào tạo Kỹ năng Lãnh đạo | KEYSTONE',
    seoDesc: 'Chương trình đào tạo kỹ năng lãnh đạo cho doanh nghiệp. Phát triển tầm nhìn, tư duy chiến lược, dẫn dắt đội nhóm hiệu quả. Liên hệ KEYSTONE.',
    heroSubtitle: 'Phát triển năng lực lãnh đạo — Tư duy chiến lược, dẫn dắt đội nhóm và ra quyết định hiệu quả',
    introTitle: 'Đào tạo Kỹ năng Lãnh đạo',
    introParagraphs: [
      'KEYSTONE cung cấp chương trình đào tạo kỹ năng lãnh đạo toàn diện, giúp các cấp quản lý và lãnh đạo phát triển tầm nhìn, tư duy chiến lược, và khả năng truyền cảm hứng cho đội nhóm.',
      'Chương trình bao gồm: Lãnh đạo tình huống, phát triển đội nhóm hiệu suất cao, ra quyết định dưới áp lực, và xây dựng văn hóa doanh nghiệp bền vững.',
    ],
    introKeywords: ['Tầm nhìn', 'Chiến lược', 'Ra quyết định', 'Đội nhóm', 'Văn hóa DN'],
    postsTitle: 'Chương trình đào tạo Lãnh đạo',
    pinnedSlugs: [],
    ctaTitle: 'Bạn muốn nâng cao năng lực lãnh đạo?',
    ctaBody: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo lãnh đạo phù hợp nhất.',
  },
  {
    title: 'Bán hàng',
    slug: 'ban-hang',
    seoTitle: 'Bán hàng — Đào tạo Kỹ năng Bán hàng | KEYSTONE',
    seoDesc: 'Chương trình đào tạo kỹ năng bán hàng chuyên nghiệp. Tư vấn, chốt đơn, quản lý khách hàng. Liên hệ KEYSTONE.',
    heroSubtitle: 'Nâng cao kỹ năng bán hàng — Tư vấn chuyên nghiệp, chốt đơn hiệu quả và chăm sóc khách hàng',
    introTitle: 'Đào tạo Kỹ năng Bán hàng',
    introParagraphs: [
      'KEYSTONE cung cấp các chương trình đào tạo bán hàng chuyên sâu, từ kỹ năng tư vấn, chốt đơn đến xây dựng mối quan hệ khách hàng lâu dài.',
      'Các chương trình được thiết kế dựa trên thực tiễn thị trường Việt Nam, giúp đội ngũ bán hàng tự tin và đạt hiệu suất cao hơn.',
    ],
    introKeywords: ['Tư vấn', 'Chốt đơn', 'CRM', 'Khách hàng', 'Doanh số'],
    postsTitle: 'Chương trình đào tạo Bán hàng',
    pinnedSlugs: ['8-tuyet-ky-ban-hang'],
    ctaTitle: 'Bạn muốn nâng cao doanh số bán hàng?',
    ctaBody: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo bán hàng phù hợp nhất.',
  },
  {
    title: 'Quản lý',
    slug: 'quan-ly',
    seoTitle: 'Quản lý — Đào tạo Kỹ năng Quản lý | KEYSTONE',
    seoDesc: 'Chương trình đào tạo kỹ năng quản lý cho doanh nghiệp. Quản lý đội nhóm, dự án, hiệu suất. Liên hệ KEYSTONE.',
    heroSubtitle: 'Phát triển kỹ năng quản lý — Quản lý đội nhóm, dự án và hiệu suất công việc hiệu quả',
    introTitle: 'Đào tạo Kỹ năng Quản lý',
    introParagraphs: [
      'KEYSTONE cung cấp chương trình đào tạo kỹ năng quản lý toàn diện, giúp các quản lý cấp trung nâng cao khả năng điều phối, giám sát và phát triển đội nhóm.',
      'Chương trình bao gồm: Quản lý dự án, quản lý hiệu suất, kỹ năng ủy quyền, phản hồi và coaching — những công cụ thiết yếu cho mọi nhà quản lý.',
    ],
    introKeywords: ['Quản lý dự án', 'Hiệu suất', 'Ủy quyền', 'Coaching', 'KPI'],
    postsTitle: 'Chương trình đào tạo Quản lý',
    pinnedSlugs: [],
    ctaTitle: 'Bạn muốn nâng cao năng lực quản lý?',
    ctaBody: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo quản lý phù hợp nhất.',
  },
  {
    title: 'Tư duy và công cụ',
    slug: 'tu-duy-va-cong-cu',
    seoTitle: 'Tư duy và Công cụ — Đào tạo Tư duy Sáng tạo | KEYSTONE',
    seoDesc: 'Chương trình đào tạo tư duy sáng tạo và công cụ giải quyết vấn đề. Design Thinking, Mind Map, đặt câu hỏi. Liên hệ KEYSTONE.',
    heroSubtitle: 'Rèn luyện tư duy — Công cụ giải quyết vấn đề, tư duy phản biện và sáng tạo trong công việc',
    introTitle: 'Đào tạo Tư duy và Công cụ',
    introParagraphs: [
      'KEYSTONE cung cấp các chương trình đào tạo tư duy và công cụ thực tiễn, giúp nhân viên phát triển khả năng phân tích, giải quyết vấn đề và ra quyết định hiệu quả.',
      'Các chương trình bao gồm: Tư duy phản biện, Design Thinking, kỹ năng đặt câu hỏi, Mind Mapping và các công cụ hỗ trợ tư duy sáng tạo.',
    ],
    introKeywords: ['Design Thinking', 'Mind Map', 'Tư duy phản biện', 'Giải quyết vấn đề', 'Đặt câu hỏi'],
    postsTitle: 'Chương trình đào tạo Tư duy',
    pinnedSlugs: ['ky-nang-dat-cau-hoi'],
    ctaTitle: 'Bạn muốn phát triển tư duy cho đội nhóm?',
    ctaBody: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo tư duy và công cụ.',
  },
  {
    title: 'Kỹ năng mềm',
    slug: 'ky-nang-mem',
    seoTitle: 'Kỹ năng mềm — Đào tạo Soft Skills | KEYSTONE',
    seoDesc: 'Chương trình đào tạo kỹ năng mềm chuyên nghiệp. Giao tiếp, thuyết trình, làm việc nhóm, quản lý thời gian. Liên hệ KEYSTONE.',
    heroSubtitle: 'Phát triển kỹ năng mềm — Giao tiếp, thuyết trình, làm việc nhóm và quản lý thời gian',
    introTitle: 'Đào tạo Kỹ năng Mềm',
    introParagraphs: [
      'KEYSTONE cung cấp các chương trình đào tạo kỹ năng mềm toàn diện, giúp nhân viên phát triển khả năng giao tiếp, hợp tác và làm việc hiệu quả trong môi trường doanh nghiệp.',
      'Các chương trình bao gồm: Kỹ năng giao tiếp, thuyết trình, làm việc nhóm, quản lý thời gian, xử lý xung đột và phát triển EQ — nền tảng cho sự nghiệp thành công.',
    ],
    introKeywords: ['Giao tiếp', 'Thuyết trình', 'Teamwork', 'Quản lý thời gian', 'EQ'],
    postsTitle: 'Chương trình đào tạo Kỹ năng mềm',
    pinnedSlugs: [],
    ctaTitle: 'Bạn muốn phát triển kỹ năng mềm cho nhân viên?',
    ctaBody: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo kỹ năng mềm phù hợp nhất.',
  },
  {
    title: 'Giao tiếp',
    slug: 'giao-tiep',
    seoTitle: 'Giao tiếp — Đào tạo Kỹ năng Giao tiếp | KEYSTONE',
    seoDesc: 'Chương trình đào tạo kỹ năng giao tiếp chuyên nghiệp. Giao tiếp nội bộ, với khách hàng, thuyết trình. Liên hệ KEYSTONE.',
    heroSubtitle: 'Nâng cao kỹ năng giao tiếp — Truyền đạt hiệu quả, lắng nghe chủ động và xây dựng mối quan hệ',
    introTitle: 'Đào tạo Kỹ năng Giao tiếp',
    introParagraphs: [
      'KEYSTONE cung cấp các chương trình đào tạo kỹ năng giao tiếp chuyên sâu, giúp nhân viên cải thiện khả năng truyền đạt, lắng nghe và xây dựng mối quan hệ trong công việc.',
      'Các chương trình bao gồm: Giao tiếp nội bộ, giao tiếp với khách hàng, thuyết trình, đàm phán, và kỹ năng viết chuyên nghiệp — giúp nâng cao hiệu quả giao tiếp toàn diện.',
    ],
    introKeywords: ['Truyền đạt', 'Lắng nghe', 'Thuyết trình', 'Đàm phán', 'Giao tiếp nội bộ'],
    postsTitle: 'Chương trình đào tạo Giao tiếp',
    pinnedSlugs: [],
    ctaTitle: 'Bạn muốn nâng cao kỹ năng giao tiếp?',
    ctaBody: 'Liên hệ ngay để nhận tư vấn miễn phí về chương trình đào tạo giao tiếp phù hợp nhất.',
  },
]

export async function POST() {
  const payload = await getPayloadClient()
  const results: Array<{ slug: string; action: string; id: number | string }> = []

  for (const pg of pages) {
    // Resolve pinned posts if any
    let pinnedIds: (number | string)[] = []
    if (pg.pinnedSlugs.length > 0) {
      const pinned = await payload.find({
        collection: 'posts',
        where: { slug: { in: pg.pinnedSlugs } },
        limit: 10,
      })
      pinnedIds = pinned.docs.map((p) => p.id)
    }

    const layout: Array<Record<string, unknown>> = [
      {
        blockType: 'hero',
        breadcrumb: 'Đào tạo',
        title: pg.title,
        subtitle: pg.heroSubtitle,
        variant: 'navy',
      },
      {
        blockType: 'intro',
        eyebrow: pg.title,
        title: pg.introTitle,
        paragraphs: pg.introParagraphs.map((text) => ({ text })),
        keywords: pg.introKeywords.map((label) => ({ label })),
      },
      {
        blockType: 'posts',
        eyebrow: 'Chương trình',
        title: pg.postsTitle,
        display: 'grid',
        limit: 6,
        ...(pinnedIds.length > 0 ? { pinned: pinnedIds } : {}),
        ctaLabel: 'Xem tất cả bài viết',
        ctaHref: '/blog',
      },
      {
        blockType: 'cta',
        title: pg.ctaTitle,
        body: pg.ctaBody,
        buttonLabel: 'Liên hệ tư vấn',
        buttonHref: '/lien-he',
      },
    ]

    const data = {
      title: pg.title,
      slug: pg.slug,
      seo: { title: pg.seoTitle, description: pg.seoDesc },
      layout,
    }

    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pg.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const u = await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: data as never,
      })
      results.push({ slug: pg.slug, action: 'updated', id: u.id })
    } else {
      const c = await payload.create({
        collection: 'pages',
        data: data as never,
      })
      results.push({ slug: pg.slug, action: 'created', id: c.id })
    }
  }

  return NextResponse.json({ pages: results, total: results.length })
}
