import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type Layout = Array<Record<string, unknown>>

type PageDef = {
  slug: string
  title: string
  seo: { title: string; description: string }
  layout: Layout
}

function pageHero(slug: string, title: string, breadcrumb: string): Record<string, unknown> {
  return {
    blockType: 'hero',
    breadcrumb,
    title,
    subtitle: `Dịch vụ ${title.toLowerCase()} chuyên nghiệp tại Keystone`,
    variant: 'navy',
  }
}

function intro(eyebrow: string, title: string, paragraphs: string[]): Record<string, unknown> {
  return {
    blockType: 'intro',
    eyebrow,
    title,
    paragraphs: paragraphs.map((text) => ({ text })),
  }
}

function cta(): Record<string, unknown> {
  return {
    blockType: 'cta',
    title: 'Quan tâm dịch vụ này? Hãy gặp chuyên gia Keystone',
    body: 'Đặt lịch tư vấn miễn phí 30 phút để hiểu rõ giải pháp phù hợp với doanh nghiệp bạn.',
    buttonLabel: 'Liên hệ ngay',
    buttonHref: '/lien-he',
  }
}

const daoTao: PageDef = {
  slug: 'dao-tao',
  title: 'Đào tạo',
  seo: {
    title: 'Đào tạo — KEYSTONE',
    description: 'Dải rộng các khóa đào tạo chất lượng cao giúp doanh nghiệp vận hành hiệu quả.',
  },
  layout: [
    pageHero('dao-tao', 'Đào tạo', 'Đào tạo'),
    intro('Tổng quan', 'Đào tạo doanh nghiệp chuyên nghiệp', [
      'Việc đào tạo tại Doanh nghiệp vốn được xem là một Chiến lược quan trọng trong việc phát triển con người, phát triển tổ chức đường dài và gia tăng lợi nhuận bền vững.',
      'Với bề dày kinh nghiệm trong lĩnh vực đào tạo, chúng tôi cung cấp một dải rộng các khóa đào tạo chất lượng cao nhằm giúp doanh nghiệp vận hành hiệu quả.',
      'Chuyên gia của chúng tôi đều có kinh nghiệm thực chiến sâu sắc, có thể tạo ra một môi trường học tập, đào tạo, phát triển có tính khuyến khích, động viên và thực tiễn cao.',
      'Chúng tôi cung cấp giải pháp được thiết kế dành riêng cho từng loại hình đặc thù kinh doanh của doanh nghiệp, qua đó đáp ứng nhu cầu phát triển chiến lược chung của doanh nghiệp một cách nhanh chóng và hiệu quả.',
    ]),
    {
      blockType: 'categoryList',
      eyebrow: 'Danh mục đào tạo',
      title: 'Hệ thống chương trình của chúng tôi',
      description: '9 nhóm chương trình bao phủ toàn diện các năng lực thiết yếu cho doanh nghiệp hiện đại.',
      display: 'accordion',
      groups: [
        {
          icon: 'cpu',
          title: 'Ứng dụng Công nghệ và AI nâng cao Hiệu suất',
          items: [
            'MASTERING AI FOR WORK – Ver 1-day',
            'MASTERING AI FOR WORK – Ver 2-day',
            'MASTERING AI FOR SALES – 1 day',
            'MASTERING AI FOR MARKETING – 1-2 day',
            'MASTERING AI FOR HR – 1 day',
            'MASTERING AI FOR L&D – 1 day',
            'MASTERING AI FOR CEO – 1 day',
            'MASTERING AI FOR FACTORY – 1 day',
            'Quản lý thời gian với trợ lực từ AI – 1 day',
            'Kỹ năng thuyết trình với trợ lực từ AI – 1 day',
            'Tự xây dựng AI Chatbot cho Doanh nghiệp (no code) – 1 day',
            'Làm Short Video bằng AI – 2 day',
            'Chiến thần Livestream, xây kênh, AI – 2 day',
            'Digital Transformation Coaching (1-1)',
          ].map((text) => ({ text })),
        },
        {
          icon: 'users',
          title: 'Train The Trainer',
          items: [
            'Train the trainer',
            'The Heart of Coaching',
            'Training by Game',
            'Training Management Program',
            'Chiến lược đào tạo trong Doanh nghiệp',
            'Kỹ năng Công nghệ cho Trainers',
            'Đánh giá hiệu quả đào tạo',
            'Learning & Development Pro',
          ].map((text) => ({ text })),
        },
        {
          icon: 'chart',
          title: 'Bán hàng và Dịch vụ Khách hàng',
          items: [
            'Nhận thức để thay đổi trong bán hàng',
            'Bán hàng B2B chuyên nghiệp',
            'Kỹ năng bán hàng có tư vấn',
            'Kỹ năng thiết lập mối quan hệ trong kinh doanh',
            'Quản lý khách hàng trọng điểm (KAM)',
            'B2B Marketing program',
            'Kỹ năng bán hàng căn bản (Sales thị trường)',
            'Kỹ năng bán hàng chuyên nghiệp (Sales thị trường)',
            'Kỹ năng bán hàng nâng cao (Sales thị trường)',
            'Professional Sales Management',
            'Quy trình, Kỹ năng trình dược và bán hàng',
            'Kỹ năng huấn luyện trên thị trường',
            'Kỹ năng trưng bày hàng hóa',
            'Thương lượng bán hàng hiệu quả',
            'Tạo động lực cho đội ngũ bán hàng',
            'Phân tích và hoạch định dữ liệu bán hàng',
            'Quản lý lực lượng bán hàng',
            'High Performance Selling',
            'Sales Coaching Training',
            'Selling With Insights',
            'Trusted Advisor Training',
            'Aggressive Sales',
            'Strategic Sales Management',
            'Tư duy dịch vụ khách hàng',
            'Dịch vụ khách hàng xuất sắc',
          ].map((text) => ({ text })),
        },
        {
          icon: 'spark',
          title: 'Giao tiếp',
          items: [
            'Giao tiếp tạo cảm xúc',
            'Giao tiếp cho quản lý cấp trung',
            'Kỹ năng giao tiếp hiệu quả',
            'Kỹ năng giao tiếp gây ảnh hưởng',
            'Kỹ năng tương tác giao tiếp cá nhân',
            'Kỹ năng thuyết trình',
            'Thuyết trình & Điều hành hội nghị hội thảo',
          ].map((text) => ({ text })),
        },
        {
          icon: 'compass',
          title: 'Lãnh đạo',
          items: [
            'Dẫn dắt sự thay đổi',
            'Lãnh đạo theo tình huống',
            'Lãnh đạo chủ động',
            'Lãnh đạo bằng cách làm gương',
            'Tinh hoa Lãnh đạo bằng sự Tín nhiệm',
            'Sức mạnh lãnh đạo bằng đặt câu hỏi',
          ].map((text) => ({ text })),
        },
        {
          icon: 'shield',
          title: 'Quản lý',
          items: [
            'Kỹ năng giao việc & Kiểm soát hiệu suất',
            'Kiểm soát và xử lý xung đột',
            'Quản lý mâu thuẫn, xung đột',
            'Strategic Thinking & Strategic Planning',
            'Supervising Contractors',
            'Xây dựng văn hóa doanh nghiệp',
            'Chiến lược phát triển sản phẩm mới',
            'Quản lý bằng KPI',
            'Quản lý thành tích cá nhân',
            'Kỹ năng Tuyển và chọn nhân sự phù hợp',
          ].map((text) => ({ text })),
        },
        {
          icon: 'flag',
          title: 'Kỹ năng mềm',
          items: [
            'Kỹ năng tương tác giao tiếp cá nhân',
            'Giải quyết vấn đề và ra quyết định',
            'Kỹ năng thuyết trình & trình bày',
            'Thuyết trình nâng cao trong thực tiễn kinh doanh',
            'Commercial Innovation',
            'Tư duy sáng tạo',
            'Những thói quen hiệu quả cho nhà Quản lý',
            'Đàm phán Thương lượng hiệu quả',
            'Kỹ năng thiết yếu cho PG & PB',
            'Kỹ năng giám sát',
            'Kỹ năng điều hành cuộc họp hiệu quả',
            'Lập kế hoạch và triển khai công việc hiệu quả',
            'Kỹ năng quản lý thời gian',
            'Quản lý thời gian để gia tăng hiệu suất',
            'Tạo động lực tại nơi làm việc',
            'Cân bằng công việc, cuộc sống, thành công',
            'Quản lý dự án',
            'Kỹ năng mua hàng / Thu mua',
          ].map((text) => ({ text })),
        },
        {
          icon: 'brain',
          title: 'Tư duy & Công cụ',
          items: [
            'TRIZ – Giải quyết vấn đề của Nhà Quản lý',
            'Future Mapping',
            'Think in new boxes',
            'Giải quyết vấn đề theo phương thức Toyota',
            'Think in a box',
            'Thủ thuật tư duy sáng tạo ứng dụng',
            'Chiến lược phát triển sản phẩm mới',
            'Phác họa sự khát vọng',
            'Inside the box',
          ].map((text) => ({ text })),
        },
        {
          icon: 'star',
          title: 'Đặc biệt',
          items: [
            'Sketchnote – Diễn họa thông tin',
            'Chốt sale Zig Ziglar',
            'Train The Trainer',
            'TRIZ – Giải quyết vấn đề',
            'Google và Ứng dụng Công nghệ để nâng cao hiệu suất công việc',
            'Leadership GungHo',
            'Xây dựng hệ thống CRM thành công trong doanh nghiệp',
            'Sức mạnh trang phục',
            'Giao tiếp bất bạo động (NVC)',
            'Để trở thành Giám sát bán hàng',
            'Become Rainmaker',
          ].map((text) => ({ text })),
        },
      ],
    },
    cta(),
  ],
}

const huanLuyen: PageDef = {
  slug: 'huan-luyen',
  title: 'Huấn luyện',
  seo: {
    title: 'Huấn luyện — KEYSTONE',
    description: 'Chương trình Coach chuyên sâu may đo theo nhu cầu, mục tiêu của từng cá nhân và doanh nghiệp.',
  },
  layout: [
    pageHero('huan-luyen', 'Huấn luyện', 'Huấn luyện'),
    intro('Coaching chuyên nghiệp', 'Phát triển năng lực cá nhân & doanh nghiệp', [
      'Mỗi đội bóng, mỗi cầu thủ chuyên nghiệp luôn có một người Huấn luyện viên (Coach). Kể cả khi một cầu thủ đã nổi tiếng ở đỉnh cao, thì việc có một người Coach vẫn luôn là một việc cần thiết.',
      'Mỗi cá nhân, mỗi doanh nghiệp để có thể phát triển nhanh và hiệu quả thì một người Coach phù hợp trong trường hợp này là hết sức cần thiết!',
      'Tại Keystone, chúng tôi cung cấp các chương trình Coach chuyên sâu và được may đo theo nhu cầu, mục tiêu, cân đối ngân sách của từng Cá nhân và Doanh nghiệp nhằm giúp bạn tự thành công theo cách riêng của bạn.',
      'Nếu bạn đang thực sự cần tìm "Giải Pháp Phát triển Năng lực Cá Nhân" thì hãy liên hệ ngay với chúng tôi để các Coach chuyên nghiệp của chúng tôi đồng hành cùng sự thành công của bạn!',
    ]),
    {
      blockType: 'features',
      eyebrow: 'Đối tượng phù hợp',
      title: 'Coaching cho ai?',
      items: [
        { icon: 'users', title: 'C-Level & Doanh chủ', body: 'Coach 1-1 cho CEO, Founder, BOD trong định hướng chiến lược và quyết định kinh doanh.' },
        { icon: 'compass', title: 'Quản lý cấp trung', body: 'Coach giúp leader nâng cao năng lực lãnh đạo đội ngũ, vận hành hiệu quả.' },
        { icon: 'spark', title: 'Cá nhân xuất sắc', body: 'High-performer muốn phát triển sự nghiệp, kỹ năng đặc thù theo lộ trình cá nhân.' },
      ],
    },
    cta(),
  ],
}

const teamBuilding: PageDef = {
  slug: 'teambuilding',
  title: 'Teambuilding',
  seo: {
    title: 'Teambuilding — KEYSTONE',
    description: 'Teambuilding chuyên nghiệp, bài bản và có tính phát triển con người, thiết kế khoa học.',
  },
  layout: [
    pageHero('teambuilding', 'Teambuilding', 'Teambuilding'),
    intro('Teambuilding chuyên nghiệp', 'Không chỉ là vui chơi — là phát triển đội ngũ', [
      'Nếu bạn tìm kiếm các chương trình nghỉ dưỡng hay vui chơi thì không cần tìm kiếm chúng tôi.',
      'Tại Việt Nam, chúng tôi được biết đến như một đơn vị thực hiện Teambuilding chuyên nghiệp, bài bản và có tính phát triển con người.',
      'Một số dịch vụ của chúng tôi: Teambuilding Activities, Training, Workshop, Conferences, Meetings, Events, Games, Ideas...',
      'Chúng tôi có những con người tài năng và sở hữu những khả năng đặc biệt giúp thiết kế các chương trình teambuilding một cách khoa học, bài bản và có tính thực tiễn cao nhằm đạt được mục đích kinh doanh hoặc xây dựng văn hóa doanh nghiệp.',
    ]),
    {
      blockType: 'features',
      eyebrow: 'Quy trình của chúng tôi',
      title: 'Chúng tôi làm gì',
      items: [
        { icon: 'compass', title: 'Khảo sát & Phân tích (NA)', body: 'Đội ngũ Senior Trainer trực tiếp NA để hiểu nhu cầu và mục tiêu.' },
        { icon: 'brain', title: 'Xây dựng kịch bản', body: 'Thiết kế chương trình theo mô hình chuẩn mực, có tính thực tiễn cao.' },
        { icon: 'spark', title: 'Đề xuất & Thống nhất', body: 'Trình bày phương án, thống nhất nội dung và chi tiết triển khai.' },
        { icon: 'layers', title: 'Phát triển & Thi công', body: 'Chuẩn bị toàn bộ kịch bản, dụng cụ, đội ngũ thực hiện.' },
        { icon: 'flag', title: 'Triển khai & Chuyển giao', body: 'Tổ chức chương trình tại site, đảm bảo chất lượng và trải nghiệm.' },
        { icon: 'chart', title: 'Đúc kết & Đánh giá', body: 'Tổng kết bài học, đo lường hiệu quả sau chương trình.' },
      ],
    },
    {
      blockType: 'split',
      imagePosition: 'left',
      eyebrow: 'Quy mô & Cách tiếp cận',
      title: 'Linh hoạt cho mọi quy mô',
      bullets: [
        { text: 'Size: 5 pax – 500 pax' },
        { text: 'Site: Indoor to Outdoor' },
        { text: 'Tools: DISC, MBTI, Psycho-Geometrics...' },
      ],
      paragraphs: [
        { text: 'Build your team — chương trình thiết kế riêng giúp đội ngũ thực sự gắn kết và trưởng thành cùng nhau.' },
      ],
      background: 'white',
      ctaLabel: 'Liên hệ tư vấn',
      ctaHref: '/lien-he',
    },
    cta(),
  ],
}

const thietKe: PageDef = {
  slug: 'thiet-ke-doanh-nghiep',
  title: 'Thiết kế Doanh nghiệp',
  seo: {
    title: 'Thiết kế Doanh nghiệp — KEYSTONE',
    description: 'Tư vấn và thiết kế mô hình kinh doanh, tái cấu trúc doanh nghiệp theo phương pháp BOTT.',
  },
  layout: [
    pageHero('thiet-ke-doanh-nghiep', 'Thiết kế Doanh nghiệp', 'Thiết kế Doanh nghiệp'),
    intro('Business Design', 'Thiết kế & Tư vấn Doanh nghiệp', [
      'Chúng tôi có những phương pháp chuyên nghiệp để thấu hiểu Doanh nghiệp bạn một cách cặn kẽ, đủ chi tiết và tổng quát để cùng bạn đưa ra những giải pháp và cách làm tốt nhất.',
      'Thiết kế doanh nghiệp (Business Design) được các chuyên gia đầu ngành của chúng tôi tận tâm và theo sát các dự án cho đến khi có thể chuyển giao một cách hoàn toàn cho bạn.',
    ]),
    {
      blockType: 'features',
      eyebrow: 'Phương pháp BOTT',
      title: 'Cách tiếp cận của chúng tôi',
      items: [
        { icon: 'layers', title: 'Build', body: 'Xây dựng mô hình kinh doanh phù hợp với mục tiêu và bối cảnh doanh nghiệp.' },
        { icon: 'cpu', title: 'Technologize', body: 'Công nghệ hóa quy trình để vận hành hiệu quả, đo lường được.' },
        { icon: 'users', title: 'Organize', body: 'Tổ chức nhân sự, văn hóa, quy trình vận hành phù hợp với mô hình mới.' },
        { icon: 'flag', title: 'Transfer', body: 'Chuyển giao hoàn toàn cho đội ngũ doanh nghiệp tự vận hành.' },
      ],
    },
    {
      blockType: 'features',
      eyebrow: '2 cách tiếp cận',
      title: 'Chúng tôi đồng hành theo nhu cầu',
      items: [
        {
          icon: 'spark',
          title: 'Tư vấn + Thiết kế từ khởi đầu',
          body: 'Thiết kế cho bạn một mô hình kinh doanh đủ lớn, đủ sự linh hoạt để phát triển đi đến viễn cảnh cụ thể.',
        },
        {
          icon: 'compass',
          title: 'Tư vấn + Tái cấu trúc',
          body: 'Khi mô hình cũ không còn phù hợp, cùng các chuyên gia nghiên cứu, sáng tạo, tái cấu trúc cho giai đoạn phát triển kế tiếp.',
        },
      ],
    },
    {
      blockType: 'categoryList',
      eyebrow: 'Dịch vụ chuyên sâu',
      title: 'Các gói chuyển giao "cách làm tốt nhất"',
      display: 'grid',
      groups: [
        { icon: 'chart', title: 'Hệ thống BSC - KPI', items: [{ text: 'Tư vấn xây dựng hệ thống BSC-KPI toàn diện' }] },
        { icon: 'shield', title: 'Hệ thống lương 3P', items: [{ text: 'Xây dựng cơ chế lương theo Position, Person, Performance' }] },
        { icon: 'layers', title: 'Hệ thống quản lý', items: [{ text: 'Tư vấn và triển khai hệ thống quản lý đồng bộ' }] },
        { icon: 'users', title: 'Đánh giá năng lực', items: [{ text: 'Hệ thống đánh giá năng lực nhân sự khoa học' }] },
        { icon: 'compass', title: 'Tái cấu trúc toàn diện', items: [{ text: 'Restructure mô hình tổ chức cho giai đoạn phát triển mới' }] },
        { icon: 'spark', title: 'Văn hóa doanh nghiệp', items: [{ text: 'Tư vấn xây dựng và lan tỏa văn hóa doanh nghiệp' }] },
        { icon: 'brain', title: 'Chiến lược nhân lực', items: [{ text: 'Tư vấn chiến lược nguồn nhân lực dài hạn' }] },
        { icon: 'flag', title: 'Chiến lược kinh doanh', items: [{ text: 'Tư vấn chiến lược kinh doanh và tăng trưởng' }] },
        { icon: 'cpu', title: 'CRM & ERP', items: [{ text: 'Tư vấn và triển khai hệ thống CRM, ERP' }] },
        { icon: 'star', title: 'Chiến lược thương hiệu', items: [{ text: 'Tư vấn chiến lược thương hiệu và định vị' }] },
      ],
    },
    cta(),
  ],
}

const hrTech: PageDef = {
  slug: 'hr-technology-solutions',
  title: 'HR Technology Solutions',
  seo: {
    title: 'HR Tech — KEYSTONE',
    description: 'Nghiên cứu và triển khai ứng dụng công nghệ cho bộ phận HR và L&D trong doanh nghiệp.',
  },
  layout: [
    pageHero('hr-technology-solutions', 'HR Technology', 'HR Tech'),
    intro('HR Tech', 'From DATA to INFORMATION → DECISION', [
      'Keystone có đội ngũ, chuyên gia nghiên cứu và triển khai tư vấn ứng dụng công nghệ cho bộ phận HR và L&D trong các công ty tập đoàn trong và ngoài nước.',
      'Không chỉ vậy, chúng tôi còn có một hệ thống các Partners để cung cấp toàn bộ và đầy đủ hạ tầng từ công nghệ (technology) cho đến nội dung (content) hay vận hành (organize) cho bộ phận HR, L&D hay toàn bộ tổ chức.',
    ]),
    {
      blockType: 'features',
      eyebrow: 'Các ứng dụng',
      title: 'Giải pháp HR Tech của chúng tôi',
      items: [
        { icon: 'users', title: 'HRCRM', body: 'Xây dựng kho dữ liệu ứng viên — quản lý talent pool dài hạn.' },
        { icon: 'chart', title: 'HCMI', body: 'Hệ thống Phân tích số liệu nhân sự — HR Analytics & Insights.' },
        { icon: 'cpu', title: 'HRS', body: 'Phần mềm Quản trị nhân sự toàn diện — Core HR Suite.' },
        { icon: 'brain', title: 'LMS', body: 'Hệ thống quản lý đào tạo, học tập & phát triển nhân viên.' },
        { icon: 'flag', title: 'Event Management', body: 'Hệ thống QL sự kiện bằng QR Code, check-in tự động.' },
        { icon: 'spark', title: 'HR Pages', body: 'Hệ thống trang tuyển dụng cho thương hiệu nhà tuyển dụng.' },
        { icon: 'layers', title: 'HS', body: 'Hệ thống tuyển dụng — ATS chuyên nghiệp.' },
        { icon: 'star', title: 'HRG', body: 'Hệ thống tích điểm, đổi quà tặng và quà sinh nhật cho nhân viên.' },
      ],
    },
    cta(),
  ],
}

const pages: PageDef[] = [daoTao, huanLuyen, teamBuilding, thietKe, hrTech]

export async function POST() {
  const payload = await getPayloadClient()
  const results: Array<{ slug: string; action: string; id: number | string; blocks: number }> = []

  for (const p of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    const data = {
      title: p.title,
      slug: p.slug,
      seo: p.seo,
      layout: p.layout,
    }
    if (existing.docs.length > 0) {
      const u = await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: data as never,
      })
      results.push({ slug: p.slug, action: 'updated', id: u.id, blocks: p.layout.length })
    } else {
      const c = await payload.create({
        collection: 'pages',
        data: data as never,
      })
      results.push({ slug: p.slug, action: 'created', id: c.id, blocks: p.layout.length })
    }
  }

  return NextResponse.json({ results })
}
