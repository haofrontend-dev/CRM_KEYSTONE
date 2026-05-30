import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type Section = {
  title: string
  paragraphs?: { text: string }[]
  items?: { text: string }[]
}

type LegalPage = {
  slug: string
  title: string
  breadcrumb: string
  heroSubtitle: string
  eyebrow: string
  intro: string
  sections: Section[]
  seoDescription: string
}

const UPDATED = 'Cập nhật lần cuối: 27/05/2026'

const pages: LegalPage[] = [
  {
    slug: 'chinh-sach-va-quyen-rieng-tu',
    title: 'Chính sách bảo mật & Quyền riêng tư',
    breadcrumb: 'Trang chủ',
    heroSubtitle:
      'KEYSTONE cam kết bảo vệ thông tin cá nhân của bạn và minh bạch trong việc thu thập, sử dụng dữ liệu.',
    eyebrow: 'Cam kết của chúng tôi',
    intro:
      'CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ ĐÀO TẠO KEYSTONE ("KEYSTONE", "chúng tôi") tôn trọng quyền riêng tư của mọi khách hàng, học viên và người truy cập website. Chính sách này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn. Khi truy cập website hoặc cung cấp thông tin cho KEYSTONE, bạn đồng ý với các điều khoản được nêu dưới đây.',
    seoDescription:
      'Chính sách bảo mật của KEYSTONE — cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của khách hàng và học viên.',
    sections: [
      {
        title: 'Thông tin chúng tôi thu thập',
        paragraphs: [{ text: 'KEYSTONE có thể thu thập các loại thông tin sau khi bạn đăng ký khóa học, mua vé sự kiện hoặc liên hệ với chúng tôi:' }],
        items: [
          { text: 'Thông tin định danh: họ tên, ngày sinh, giới tính.' },
          { text: 'Thông tin liên hệ: số điện thoại, email, địa chỉ.' },
          { text: 'Thông tin doanh nghiệp: tên công ty, chức vụ, lĩnh vực hoạt động.' },
          { text: 'Thông tin đăng ký khóa học, sự kiện và nhu cầu đào tạo.' },
          { text: 'Dữ liệu kỹ thuật: địa chỉ IP, loại trình duyệt, cookie, hành vi truy cập website.' },
        ],
      },
      {
        title: 'Mục đích sử dụng thông tin',
        items: [
          { text: 'Cung cấp, vận hành và cải thiện dịch vụ đào tạo, huấn luyện và HR Tech.' },
          { text: 'Liên hệ tư vấn, xác nhận đăng ký và chăm sóc khách hàng.' },
          { text: 'Gửi thông tin về khóa học, sự kiện, ưu đãi khi được bạn đồng ý.' },
          { text: 'Phân tích, thống kê nhằm nâng cao trải nghiệm người dùng.' },
          { text: 'Thực hiện nghĩa vụ pháp lý và giải quyết tranh chấp (nếu có).' },
        ],
      },
      {
        title: 'Chia sẻ thông tin cho bên thứ ba',
        paragraphs: [{ text: 'KEYSTONE không bán dữ liệu cá nhân của bạn. Chúng tôi chỉ chia sẻ trong các trường hợp:' }],
        items: [
          { text: 'Với đối tác cung cấp dịch vụ (thanh toán, nền tảng học trực tuyến) trong phạm vi cần thiết.' },
          { text: 'Khi có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền.' },
          { text: 'Không chuyển giao, mua bán thông tin vì mục đích thương mại khi chưa có sự đồng ý của bạn.' },
        ],
      },
      {
        title: 'Cookie và công nghệ theo dõi',
        items: [
          { text: 'Website sử dụng cookie để ghi nhớ tùy chọn và cải thiện trải nghiệm.' },
          { text: 'Cookie phân tích giúp chúng tôi hiểu cách người dùng tương tác với website.' },
          { text: 'Bạn có thể tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng có thể bị hạn chế.' },
        ],
      },
      {
        title: 'Bảo mật dữ liệu',
        items: [
          { text: 'Áp dụng các biện pháp kỹ thuật và quản lý để bảo vệ dữ liệu khỏi truy cập trái phép.' },
          { text: 'Mã hóa dữ liệu nhạy cảm trong quá trình truyền tải.' },
          { text: 'Giới hạn quyền truy cập dữ liệu chỉ cho nhân sự có trách nhiệm liên quan.' },
        ],
      },
      {
        title: 'Quyền của bạn đối với dữ liệu',
        items: [
          { text: 'Quyền được biết và truy cập thông tin cá nhân của mình.' },
          { text: 'Quyền yêu cầu chỉnh sửa, cập nhật dữ liệu không chính xác.' },
          { text: 'Quyền yêu cầu xóa dữ liệu hoặc rút lại sự đồng ý.' },
          { text: 'Quyền khiếu nại nếu cho rằng dữ liệu bị xử lý sai quy định.' },
        ],
      },
      {
        title: 'Lưu trữ và thời gian lưu trữ',
        items: [
          { text: 'Dữ liệu được lưu trữ trong thời gian cần thiết để phục vụ mục đích thu thập.' },
          { text: 'Dữ liệu sẽ được xóa hoặc ẩn danh khi không còn cần thiết, trừ khi pháp luật yêu cầu lưu giữ lâu hơn.' },
        ],
      },
      {
        title: 'Thay đổi chính sách',
        items: [
          { text: 'KEYSTONE có thể cập nhật Chính sách bảo mật theo thời gian.' },
          { text: 'Mọi thay đổi sẽ được đăng tải trên trang này cùng ngày hiệu lực mới.' },
          { text: 'Việc tiếp tục sử dụng dịch vụ sau khi cập nhật đồng nghĩa bạn chấp nhận chính sách mới.' },
        ],
      },
    ],
  },
  {
    slug: 'dieu-khoan-su-dung',
    title: 'Điều khoản sử dụng',
    breadcrumb: 'Trang chủ',
    heroSubtitle:
      'Vui lòng đọc kỹ các điều khoản trước khi sử dụng website và dịch vụ của KEYSTONE.',
    eyebrow: 'Điều khoản & Điều kiện',
    intro:
      'Bằng việc truy cập và sử dụng website keystone.vn cùng các dịch vụ của KEYSTONE, bạn đồng ý tuân thủ các điều khoản sử dụng dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website và dịch vụ.',
    seoDescription:
      'Điều khoản sử dụng website và dịch vụ KEYSTONE — quyền, trách nhiệm và quy định khi sử dụng.',
    sections: [
      {
        title: 'Chấp nhận điều khoản',
        paragraphs: [{ text: 'Việc bạn truy cập website, đăng ký tài khoản, mua vé hoặc sử dụng bất kỳ dịch vụ nào của KEYSTONE đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý với toàn bộ điều khoản này.' }],
      },
      {
        title: 'Quyền và trách nhiệm của người dùng',
        items: [
          { text: 'Cung cấp thông tin chính xác, trung thực khi đăng ký và thanh toán.' },
          { text: 'Bảo mật thông tin tài khoản và chịu trách nhiệm với mọi hoạt động dưới tài khoản của mình.' },
          { text: 'Không sử dụng dịch vụ vào mục đích vi phạm pháp luật hoặc gây hại cho bên thứ ba.' },
          { text: 'Không sao chép, phát tán trái phép nội dung, tài liệu khóa học của KEYSTONE.' },
        ],
      },
      {
        title: 'Quyền và trách nhiệm của KEYSTONE',
        items: [
          { text: 'Cung cấp dịch vụ đúng như mô tả tại thời điểm đăng ký.' },
          { text: 'Bảo mật thông tin khách hàng theo Chính sách bảo mật.' },
          { text: 'Có quyền tạm ngưng hoặc thay đổi dịch vụ với thông báo trước hợp lý.' },
          { text: 'Có quyền từ chối phục vụ trong trường hợp người dùng vi phạm điều khoản.' },
        ],
      },
      {
        title: 'Quyền sở hữu trí tuệ',
        paragraphs: [{ text: 'Toàn bộ nội dung, logo, thương hiệu, tài liệu, giáo trình và phần mềm trên website thuộc quyền sở hữu của KEYSTONE hoặc đối tác cấp phép. Mọi hành vi sao chép, sử dụng lại khi chưa có sự đồng ý bằng văn bản đều bị nghiêm cấm.' }],
      },
      {
        title: 'Giới hạn trách nhiệm',
        paragraphs: [{ text: 'KEYSTONE không chịu trách nhiệm với các thiệt hại gián tiếp phát sinh từ việc sử dụng website do sự cố ngoài tầm kiểm soát như lỗi đường truyền, thiên tai, hoặc hành vi của bên thứ ba.' }],
      },
      {
        title: 'Luật áp dụng',
        paragraphs: [{ text: 'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp sẽ được ưu tiên giải quyết thông qua thương lượng; nếu không đạt được sẽ đưa ra tòa án có thẩm quyền tại Việt Nam.' }],
      },
    ],
  },
  {
    slug: 'cau-hoi-thuong-gap',
    title: 'Những câu hỏi thường gặp',
    breadcrumb: 'Trang chủ',
    heroSubtitle: 'Giải đáp nhanh các thắc mắc phổ biến về khóa học, sự kiện và thanh toán.',
    eyebrow: 'FAQ',
    intro:
      'Dưới đây là những câu hỏi KEYSTONE thường nhận được từ học viên và khách hàng. Nếu không tìm thấy câu trả lời, vui lòng liên hệ hotline 0903 997 909 hoặc email training@keystone.vn.',
    seoDescription:
      'Câu hỏi thường gặp về khóa học, sự kiện, thanh toán và dịch vụ của KEYSTONE.',
    sections: [
      {
        title: 'Làm sao để đăng ký khóa học hoặc sự kiện?',
        paragraphs: [{ text: 'Bạn có thể đăng ký trực tiếp trên website tại trang khóa học/sự kiện tương ứng, hoặc liên hệ hotline và email để được hỗ trợ. Sau khi đăng ký, KEYSTONE sẽ gửi email xác nhận và hướng dẫn thanh toán.' }],
      },
      {
        title: 'Tôi có thể thanh toán bằng những hình thức nào?',
        items: [
          { text: 'Chuyển khoản ngân hàng theo thông tin trên email xác nhận.' },
          { text: 'Thanh toán qua cổng thanh toán trực tuyến (thẻ ATM, Visa/Master, ví điện tử).' },
          { text: 'Thanh toán tiền mặt tại văn phòng KEYSTONE (theo lịch hẹn).' },
        ],
      },
      {
        title: 'Sau khi thanh toán tôi nhận vé/thông tin khóa học như thế nào?',
        paragraphs: [{ text: 'Vé điện tử hoặc thông tin tham dự sẽ được gửi qua email trong vòng 24 giờ sau khi KEYSTONE xác nhận thanh toán thành công. Vui lòng kiểm tra cả hộp thư spam.' }],
      },
      {
        title: 'Tôi có được hoàn tiền nếu không tham dự được không?',
        paragraphs: [{ text: 'Có, theo Chính sách hoàn trả và hủy vé. Mức hoàn phụ thuộc vào thời điểm bạn gửi yêu cầu so với ngày diễn ra khóa học/sự kiện.' }],
      },
      {
        title: 'KEYSTONE có đào tạo theo yêu cầu riêng (Inhouse) không?',
        paragraphs: [{ text: 'Có. KEYSTONE thiết kế chương trình Inhouse theo đặc thù từng doanh nghiệp. Vui lòng liên hệ để được tư vấn và báo giá.' }],
      },
      {
        title: 'Tôi có được cấp chứng nhận sau khóa học không?',
        paragraphs: [{ text: 'Học viên hoàn thành khóa học theo yêu cầu sẽ được cấp giấy chứng nhận của KEYSTONE.' }],
      },
    ],
  },
  {
    slug: 'hoan-tra-va-huy-ve',
    title: 'Chính sách hoàn trả & Hủy vé',
    breadcrumb: 'Trang chủ',
    heroSubtitle: 'Quy định về việc hủy đăng ký và hoàn phí cho khóa học, sự kiện.',
    eyebrow: 'Hoàn trả & Hủy vé',
    intro:
      'KEYSTONE hiểu rằng kế hoạch của bạn có thể thay đổi. Chính sách dưới đây quy định rõ điều kiện hủy vé và mức hoàn phí áp dụng cho các khóa học và sự kiện do KEYSTONE tổ chức.',
    seoDescription:
      'Chính sách hoàn trả và hủy vé của KEYSTONE — điều kiện, mức hoàn phí và quy trình yêu cầu.',
    sections: [
      {
        title: 'Điều kiện hủy và mức hoàn phí',
        paragraphs: [{ text: 'Mức hoàn phí được tính dựa trên thời điểm KEYSTONE nhận được yêu cầu hủy so với ngày khai giảng/diễn ra sự kiện:' }],
        items: [
          { text: 'Hủy trước 7 ngày: hoàn 100% học phí/giá vé.' },
          { text: 'Hủy trước 3–6 ngày: hoàn 70% học phí/giá vé.' },
          { text: 'Hủy trước 1–2 ngày: hoàn 50% học phí/giá vé.' },
          { text: 'Hủy trong vòng 24 giờ hoặc sau khi sự kiện bắt đầu: không hoàn phí.' },
        ],
      },
      {
        title: 'Quy trình yêu cầu hoàn trả',
        items: [
          { text: 'Gửi yêu cầu qua email training@keystone.vn kèm thông tin đơn hàng/vé.' },
          { text: 'KEYSTONE xác nhận và phản hồi trong vòng 2 ngày làm việc.' },
          { text: 'Khoản hoàn được chuyển về tài khoản gốc trong vòng 7–10 ngày làm việc.' },
        ],
      },
      {
        title: 'Chuyển nhượng vé',
        paragraphs: [{ text: 'Thay vì hủy, bạn có thể chuyển nhượng vé/suất học cho người khác bằng cách thông báo trước cho KEYSTONE ít nhất 24 giờ và cung cấp thông tin người thay thế.' }],
      },
      {
        title: 'Trường hợp KEYSTONE hủy hoặc dời lịch',
        paragraphs: [{ text: 'Nếu KEYSTONE chủ động hủy hoặc dời lịch khóa học/sự kiện, bạn được lựa chọn: hoàn 100% phí, hoặc bảo lưu để tham dự đợt kế tiếp.' }],
      },
    ],
  },
  {
    slug: 'phuong-thuc-giao-hang',
    title: 'Phương thức giao hàng',
    breadcrumb: 'Trang chủ',
    heroSubtitle: 'Cách KEYSTONE bàn giao vé điện tử, tài liệu và sản phẩm đào tạo đến bạn.',
    eyebrow: 'Giao nhận',
    intro:
      'Sản phẩm và dịch vụ của KEYSTONE chủ yếu được cung cấp ở dạng số (vé điện tử, tài liệu, truy cập khóa học). Một số tài liệu in ấn có thể được giao tận nơi theo yêu cầu. Dưới đây là các phương thức giao nhận.',
    seoDescription:
      'Phương thức giao hàng của KEYSTONE — vé điện tử, tài liệu số và giao tài liệu in ấn.',
    sections: [
      {
        title: 'Giao vé và tài liệu điện tử',
        items: [
          { text: 'Vé điện tử và liên kết truy cập được gửi qua email trong vòng 24 giờ sau khi xác nhận thanh toán.' },
          { text: 'Tài liệu khóa học được cung cấp qua nền tảng học trực tuyến hoặc liên kết tải về.' },
          { text: 'Không phát sinh phí giao đối với sản phẩm số.' },
        ],
      },
      {
        title: 'Giao tài liệu in ấn (nếu có)',
        items: [
          { text: 'Áp dụng cho các đơn đặt tài liệu bản in hoặc quà tặng kèm khóa học.' },
          { text: 'Khu vực nội thành TP.HCM: 1–2 ngày làm việc.' },
          { text: 'Các tỉnh thành khác: 3–5 ngày làm việc qua đơn vị vận chuyển đối tác.' },
          { text: 'Phí vận chuyển (nếu có) được thông báo rõ trước khi xác nhận đơn.' },
        ],
      },
      {
        title: 'Kiểm tra và xác nhận',
        paragraphs: [{ text: 'Vui lòng kiểm tra email (bao gồm mục spam) sau khi thanh toán. Nếu sau 24 giờ chưa nhận được vé/tài liệu, hãy liên hệ hotline 0903 997 909 để được hỗ trợ ngay.' }],
      },
    ],
  },
  {
    slug: 'huong-dan-mua-ve',
    title: 'Hướng dẫn mua vé',
    breadcrumb: 'Trang chủ',
    heroSubtitle: 'Các bước đơn giản để đăng ký và thanh toán khóa học, sự kiện tại KEYSTONE.',
    eyebrow: 'Hướng dẫn',
    intro:
      'Chỉ với vài bước, bạn có thể hoàn tất việc đăng ký khóa học hoặc mua vé sự kiện của KEYSTONE. Làm theo hướng dẫn dưới đây.',
    seoDescription:
      'Hướng dẫn mua vé và đăng ký khóa học, sự kiện tại KEYSTONE theo từng bước.',
    sections: [
      {
        title: 'Chọn khóa học hoặc sự kiện',
        paragraphs: [{ text: 'Truy cập trang khóa học hoặc sự kiện trên website, xem thông tin chi tiết về nội dung, thời gian, địa điểm và học phí/giá vé.' }],
      },
      {
        title: 'Điền thông tin đăng ký',
        items: [
          { text: 'Nhấn nút "Đăng ký" hoặc "Mua vé" tại trang chương trình.' },
          { text: 'Điền đầy đủ họ tên, số điện thoại, email và thông tin cần thiết.' },
          { text: 'Kiểm tra kỹ thông tin trước khi gửi.' },
        ],
      },
      {
        title: 'Thanh toán',
        items: [
          { text: 'Chọn hình thức: chuyển khoản, cổng thanh toán trực tuyến hoặc tiền mặt tại văn phòng.' },
          { text: 'Thực hiện thanh toán theo hướng dẫn trong email xác nhận.' },
          { text: 'Ghi đúng nội dung chuyển khoản để KEYSTONE đối soát nhanh.' },
        ],
      },
      {
        title: 'Nhận xác nhận và vé',
        paragraphs: [{ text: 'Sau khi thanh toán thành công, bạn sẽ nhận email xác nhận kèm vé điện tử/thông tin tham dự trong vòng 24 giờ. Vui lòng lưu giữ để xuất trình khi tham dự.' }],
      },
      {
        title: 'Cần hỗ trợ?',
        paragraphs: [{ text: 'Nếu gặp khó khăn trong quá trình đặt vé, liên hệ hotline 0903 997 909 hoặc email training@keystone.vn — KEYSTONE sẽ hỗ trợ bạn hoàn tất đăng ký.' }],
      },
    ],
  },
]

export async function POST() {
  const payload = await getPayloadClient()

  const bg = await payload.find({
    collection: 'media',
    where: { filename: { equals: 'page-title-1.jpg' } },
    limit: 1,
  })
  const bgId = bg.docs[0]?.id

  const results: { slug: string; action: string; id: number | string }[] = []

  for (const pg of pages) {
    const layout: Array<Record<string, unknown>> = [
      {
        blockType: 'hero',
        breadcrumb: pg.breadcrumb,
        title: pg.title,
        subtitle: pg.heroSubtitle,
        variant: 'navy',
        ...(bgId ? { backgroundImage: bgId } : {}),
      },
      {
        blockType: 'legalDoc',
        eyebrow: pg.eyebrow,
        title: pg.title,
        updatedAt: UPDATED,
        intro: pg.intro,
        sections: pg.sections,
      },
      {
        blockType: 'cta',
        title: 'Bạn cần thêm thông tin?',
        body: 'Đội ngũ KEYSTONE luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
        buttonLabel: 'Liên hệ ngay',
        buttonHref: '/lien-he',
      },
    ]

    const data = {
      title: pg.title,
      slug: pg.slug,
      seo: { title: `${pg.title} | KEYSTONE`, description: pg.seoDescription },
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
      const c = await payload.create({ collection: 'pages', data: data as never })
      results.push({ slug: pg.slug, action: 'created', id: c.id })
    }
  }

  return NextResponse.json({ count: results.length, results })
}
