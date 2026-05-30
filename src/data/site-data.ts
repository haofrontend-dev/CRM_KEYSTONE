// ============================
// KEYSTONE.VN — Real Site Data
// ============================

export const siteInfo = {
  brand: 'KEYSTONE',
  tagline: 'Training & Consulting',
  slogan: 'Developing People.',
  subSlogan: 'Giải pháp đào tạo chuyên nghiệp!',
  legalName: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ ĐÀO TẠO KEYSTONE',
  representative: 'NGUYỄN VĂN THỨC',
  hotline: '0903997909',
  email: 'hello@keystone.vn',
  workingHours: 'Mon - Sun: 8:30am to 6:30pm',
  address: 'Tòa nhà Barotex, Số 6 Võ Văn Kiệt, Phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam',
  domain: 'https://keystone.vn',
}

export const navItems = [
  { label: 'KEYSTONE!?', href: '/keystone' },
  {
    label: 'DỊCH VỤ',
    href: '/dao-tao',
    dropdown: true,
    children: [
      { label: 'Đào tạo', href: '/dao-tao' },
      { label: 'Huấn luyện', href: '/huan-luyen' },
      { label: 'Teambuilding', href: '/teambuilding' },
      { label: 'Thiết kế doanh nghiệp', href: '/thiet-ke-doanh-nghiep' },
      { label: 'HR Tech', href: '/hr-technology-solutions' },
    ],
  },
  {
    label: 'ĐÀO TẠO',
    href: '/dao-tao',
    dropdown: true,
    children: [
      { label: 'Ứng Dụng AI', href: '/ung-dung-ai' },
      { label: 'Tools @ Workplace', href: '/tools-at-workplace' },
      { label: 'Train The Trainer', href: '/train-the-trainer' },
      { label: 'Lãnh đạo', href: '/lanh-dao' },
      { label: 'Bán hàng', href: '/ban-hang' },
      { label: 'Quản lý', href: '/quan-ly' },
      { label: 'Tư duy và công cụ', href: '/tu-duy-va-cong-cu' },
      { label: 'Kỹ năng mềm', href: '/ky-nang-mem' },
      { label: 'Giao tiếp', href: '/giao-tiep' },
    ],
  },
  { label: 'Events', href: '/public-event' },
  {
    label: 'TIN TỨC',
    href: '/blog',
    dropdown: true,
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Cộng đồng', href: '/cong-dong' },
      { label: 'Chia sẻ', href: '/chia-se' },
      { label: 'Tuyển Dụng', href: '/tuyen-dung' },
    ],
  },
  { label: 'LIÊN HỆ', href: '/lien-he' },
]

export const heroSlides = [
  {
    badge: 'KEYSTONE | Training & Consulting',
    headline: 'NÂNG CAO\nHIỆU QUẢ\nKINH DOANH',
    sub: 'Khám phá kết quả tốt hơn',
    image: '/images/trang-chu/1.jpg',
  },
  {
    badge: 'Cách tiếp cận độc đáo',
    headline: 'CHO HIỆU SUẤT\nĐỈNH CAO',
    sub: 'Phương pháp đào tạo thực chiến',
    image: '/images/trang-chu/2.jpg',
  },
  {
    badge: 'Nâng cao thành tích kinh doanh',
    headline: 'HỆ THỐNG HÓA\nLỰC LƯỢNG\nBÁN HÀNG',
    sub: 'Chiến lược bán hàng chuyên nghiệp',
    image: '/images/trang-chu/3.jpg',
  },
]

export const values = [
  {
    title: 'KHÁC BIỆT',
    body: 'Phương pháp đào tạo độc quyền kết hợp thực chiến, không lý thuyết suông. Chúng tôi thiết kế riêng cho từng doanh nghiệp.',
    icon: 'spark',
    image: '/images/trang-chu/khac-biet-150.png',
  },
  {
    title: 'SỨ MẠNG',
    body: 'Phát triển con người, phát triển tổ chức. Keystone cam kết đồng hành cùng doanh nghiệp Việt trên hành trình phát triển bền vững.',
    icon: 'compass',
    image: '/images/trang-chu/su-mang-trang-200.png',
  },
  {
    title: 'GIÁ TRỊ',
    body: 'Chính trực, tận tâm, đổi mới không ngừng. Mỗi giải pháp đều hướng tới giá trị thực cho khách hàng.',
    icon: 'shield',
    image: '/images/trang-chu/gia-tri-cot-loi-200.png',
  },
]

export const aboutText = {
  intro: 'Keystone là đơn vị đào tạo & tư vấn chuyên nghiệp. Chúng tôi cung cấp chuyên sâu các khóa đào tạo, huấn luyện và tư vấn cách hiệu quả dành cho doanh nghiệp.',
  experts: 'Chuyên gia của chúng tôi đều có kinh nghiệm thực chiến sâu sắc, có thể tạo ra một môi trường học tập, đào tạo, phát triển, tư vấn có tính khuyến khích, động viên và thực tiễn cao.',
  solutions: 'Giải pháp của chúng tôi được thiết kế dành riêng cho từng loại hình đặc thù kinh doanh của doanh nghiệp, qua đó đáp ứng nhu cầu phát triển chiến lược chung một cách nhanh chóng và hiệu quả.',
  keywords: 'Đào tạo | Tư vấn | Huấn luyện | Thiết kế Doanh nghiệp | Chương trình đặc biệt | HR tech',
  promise: 'CHÚNG TÔI CÓ THỂ TỐI ĐA HÓA HIỆU QUẢ KINH DOANH TRONG PHẠM VI NGÂN SÁCH',
}

export const services = [
  {
    title: 'Đào tạo',
    slug: 'dao-tao',
    body: 'Cung cấp dải rộng các khóa đào tạo chất lượng cao nhằm giúp doanh nghiệp vận hành hiệu quả.',
    icon: 'brain',
    image: '/images/trang-chu/dao-tao-53.png',
  },
  {
    title: 'Huấn luyện',
    slug: 'huan-luyen',
    body: 'Chương trình Coach chuyên sâu may đo theo nhu cầu, mục tiêu của từng cá nhân và doanh nghiệp.',
    icon: 'users',
    image: '/images/trang-chu/coaching-53.png',
  },
  {
    title: 'Teambuilding',
    slug: 'teambuilding',
    body: 'Teambuilding chuyên nghiệp, bài bản và có tính phát triển con người, thiết kế khoa học.',
    icon: 'flag',
    image: '/images/trang-chu/teambuilding-53.png',
  },
  {
    title: 'Thiết kế doanh nghiệp',
    slug: 'thiet-ke-doanh-nghiep',
    body: 'Tư vấn và thiết kế mô hình kinh doanh, tái cấu trúc doanh nghiệp theo phương pháp BOTT.',
    icon: 'layers',
    image: '/images/trang-chu/thiet-ke-doanh-nghiep-53.png',
  },
  {
    title: 'HR Tech',
    slug: 'hr-technology-solutions',
    body: 'Nghiên cứu và triển khai ứng dụng công nghệ cho bộ phận HR và L&D trong doanh nghiệp.',
    icon: 'cpu',
    image: '/images/trang-chu/hr-tech-53.png',
  },
  {
    title: 'Chương trình đặc biệt',
    slug: 'public-event',
    body: 'Các chương trình sự kiện, workshop và seminar chuyên đề cho doanh nghiệp.',
    icon: 'spark',
    image: '/images/trang-chu/ct-dac-biet-53.png',
  },
]

export const trainingCategories = [
  { title: 'Ứng Dụng AI', slug: 'ung-dung-ai', icon: 'cpu' },
  { title: 'Tools @ Workplace', slug: 'tools-at-workplace', icon: 'layers' },
  { title: 'Train The Trainer', slug: 'train-the-trainer', icon: 'users' },
  { title: 'Lãnh đạo', slug: 'lanh-dao', icon: 'compass' },
  { title: 'Bán hàng', slug: 'ban-hang', icon: 'chart' },
  { title: 'Quản lý', slug: 'quan-ly', icon: 'shield' },
  { title: 'Tư duy và công cụ', slug: 'tu-duy-va-cong-cu', icon: 'brain' },
  { title: 'Kỹ năng mềm', slug: 'ky-nang-mem', icon: 'spark' },
  { title: 'Giao tiếp', slug: 'giao-tiep', icon: 'flag' },
]

export const whyChooseUs = [
  { title: 'Chương trình chất lượng', icon: '/images/trang-chu/chuong-trinh-chat-luong-80x80.png' },
  { title: 'Đầu tư hợp ngân sách', icon: '/images/trang-chu/can-doi-ngan-sach-53.png' },
  { title: 'Linh hoạt & Chuyên nghiệp', icon: '/images/trang-chu/linh-hoat-chuyen-nghiep-80x80.png' },
  { title: 'Chuyên gia giàu kinh nghiệm', icon: '/images/trang-chu/chuyen-gia-53x53.png' },
  { title: 'Phương pháp khoa học', icon: '/images/trang-chu/phuong-phap-khoa-hoc-80x80.png' },
  { title: 'Sáng tạo và Đổi mới', icon: '/images/trang-chu/sang-tao-53.png' },
]

export const team = [
  { name: 'Hang Nguyen', image: '/images/ve-keystone/hang-nguyen.jpg' },
  { name: 'Mai Thanh Hoai', image: '/images/ve-keystone/mai-thanh-hoai-3.jpg' },
  { name: 'Vũ Hoàng Quốc Tuấn', image: '/images/ve-keystone/vu-hoang-quoc-tuan.jpg' },
  { name: 'Hoàng Văn Quyền', image: '/images/ve-keystone/hoang-van-quyen-5.jpg' },
  { name: 'Nguyễn Văn Thức', image: '/images/ve-keystone/nguyen-van-thuc.jpg' },
]

export const testimonials = [
  {
    name: 'Ms. Hoàng Thanh Nhàn',
    position: 'Quản lý',
    company: 'Sumitomo',
    quote: 'Chương trình đào tạo của Keystone rất thực tế và hiệu quả, giúp đội ngũ chúng tôi nâng cao năng lực chuyên môn đáng kể.',
    avatar: '/images/trang-chu/Ms_Nhan_Sumitomo.jpg',
    rating: 5,
  },
  {
    name: 'Mr. Đặng Tuấn Tiến',
    position: 'Giám đốc',
    company: 'Juno',
    quote: 'Phương pháp huấn luyện của Keystone rất bài bản và chuyên nghiệp. Đội ngũ chuyên gia có kinh nghiệm thực chiến sâu sắc.',
    avatar: '/images/trang-chu/juno-dang-tuan-tien.jpg',
    rating: 5,
  },
]

export const partners = [
  { name: 'Häfele', logo: '/images/trang-chu/hafele.jpg' },
  { name: 'Bridgestone', logo: '/images/trang-chu/bridgestone.jpg' },
  { name: 'Coca-Cola', logo: '/images/trang-chu/cocacola.jpg' },
  { name: 'Grab', logo: '/images/trang-chu/grab.jpg' },
  { name: 'Nestlé', logo: '/images/trang-chu/nestle.jpg' },
  { name: 'VBL', logo: '/images/trang-chu/vbl.jpg' },
  { name: 'Samsung', logo: '/images/trang-chu/samsung.png.jpg' },
  { name: 'Sumitomo', logo: '/images/trang-chu/sumitomo.jpg' },
  { name: 'Bayer', logo: '/images/trang-chu/bayer.jpg' },
]

export const stats = [
  { value: '15+', label: 'Nhân viên' },
  { value: '98%', label: 'Khách hàng hài lòng' },
  { value: '500+', label: 'Hợp đồng' },
  { value: '5★', label: 'Đánh giá' },
]

export const blogPosts = [
  {
    title: 'Đào tạo Inhouse "Ứng dụng AI trong doanh nghiệp"',
    slug: 'dao-tao-ung-dung-ai',
    image: '/images/trang-chu/dao-tao-ung-dung-ai-inhouse-1.jpg',
    excerpt: 'Chương trình đào tạo Inhouse ứng dụng AI được thiết kế riêng cho doanh nghiệp, giúp nâng cao hiệu suất làm việc.',
  },
  {
    title: 'Đào tạo Inhouse Ứng dụng AI trong Doanh nghiệp',
    slug: 'ai-inhouse-doanh-nghiep',
    image: '/images/baiviet-ai-inhouse-doanh-nghiep/dao-tao-inhouse-ai-doanh-nghiep-banner.jpg',
    excerpt: 'Giải pháp đào tạo AI inhouse toàn diện cho doanh nghiệp Việt Nam.',
  },
  {
    title: 'Khoá AI - Public - 16/03/2025',
    slug: 'khoa-ai-public-16032025',
    image: '/images/baiviet-khoa-ai-public-16032025/MASTERING_AI_FOR_WORK_NGANG.png',
    excerpt: 'Mastering AI for Work - Khoá học AI công khai dành cho mọi đối tượng.',
  },
  {
    title: 'Khoá AI - Public - 24/08/2024',
    slug: 'khoa-ai-public-24082024',
    image: '/images/baiviet-khoa-ai-public-24082024/dao-tao-ai-public-240824-1.jpeg',
    excerpt: 'Khoá đào tạo AI công khai tháng 8/2024 với nhiều nội dung thực chiến.',
  },
  {
    title: 'Đào Tạo AI sáng tạo nội dung báo chí số',
    slug: 'ai-bao-chi-so',
    image: '/images/trang-chu/dao-tao-ai-bao-chi-so-0.jpg',
    excerpt: 'Ứng dụng AI trong sáng tạo nội dung báo chí số - xu hướng mới.',
  },
  {
    title: 'Mastering AI for Work',
    slug: 'mastering-ai-for-work',
    image: '/images/trang-chu/MASTERING_AI_FOR_WORK_NGANG.png',
    excerpt: 'Chương trình đào tạo toàn diện về ứng dụng AI trong công việc.',
  },
  {
    title: '8 Tuyệt kỹ bán hàng',
    slug: '8-tuyet-ky-ban-hang',
    image: '/images/baiviet-8-tuyet-ky-ban-hang/66606684_2269498733099541_2595954731364909056_o.jpg',
    excerpt: '8 kỹ năng bán hàng thiết yếu mà mọi nhân viên kinh doanh cần nắm vững.',
  },
  {
    title: 'Tools @ Workplace - NM Đạm Phú Mỹ',
    slug: 'tools-workplace-pmu',
    image: '/images/baiviet-tools-workplace-pmu/tool-at-workplace.jpg',
    excerpt: 'Triển khai Tools @ Workplace tại Nhà máy Đạm Phú Mỹ và PVFCCO.',
  },
  {
    title: 'Cập nhật Tools @ Workplace',
    slug: 'cap-nhat-tools-workplace',
    image: '/images/baiviet-cap-nhat-tools-workplace/keytech-ung-dung-cong-nghe.jpg',
    excerpt: 'Cập nhật mới nhất về chương trình Tools @ Workplace của Keystone.',
  },
  {
    title: 'Tools for Trainers',
    slug: 'tools-for-trainers',
    image: '/images/baiviet-tools-for-trainers/tool-for-trainer.jpg',
    excerpt: 'Bộ công cụ công nghệ dành cho Trainers chuyên nghiệp.',
  },
  {
    title: 'Đào tạo Train The Trainer',
    slug: 'dao-tao-train-the-trainer',
    image: '/images/baiviet-dao-tao-train-the-trainer/train-the-trainer.jpg',
    excerpt: 'Chương trình đào tạo giảng viên nội bộ chuyên nghiệp.',
  },
  {
    title: 'Chuyên viên triển khai CRM trong doanh nghiệp',
    slug: 'crm-doanh-nghiep',
    image: '/images/baiviet-crm-doanh-nghiep/chuyen-vien-crm.png',
    excerpt: 'Hướng dẫn triển khai hệ thống CRM thành công trong doanh nghiệp.',
  },
  {
    title: 'Ứng dụng công nghệ nâng cao hiệu suất cho SMEs',
    slug: 'ung-dung-cong-nghe-smes',
    image: '/images/baiviet-ung-dung-cong-nghe-smes/sme-mngmt.jpg',
    excerpt: 'Giải pháp công nghệ giúp doanh nghiệp vừa và nhỏ nâng cao hiệu suất.',
  },
  {
    title: 'Google Sheet - Kho dữ liệu khách hàng',
    slug: 'gsheet-kho-khach-hang',
    image: '/images/baiviet-gsheet-kho-khach-hang/crm-google-sheet.jpg',
    excerpt: 'Ứng dụng Google Sheet xây dựng kho dữ liệu khách hàng hiệu quả.',
  },
  {
    title: 'Google Sheet - Kho dữ liệu ứng viên',
    slug: 'gsheet-kho-ung-vien',
    image: '/images/baiviet-gsheet-kho-ung-vien/Candidate-Database-Matching-Are-You-Doing-It_.jpg',
    excerpt: 'Ứng dụng Google Sheet xây dựng kho dữ liệu ứng viên cho HR.',
  },
  {
    title: 'Xây dựng kho dữ liệu ứng viên cho phòng HR',
    slug: 'kho-du-lieu-ung-vien-hr',
    image: '/images/baiviet-kho-du-lieu-ung-vien-hr/61106704_10214476300922120_2518335146088726528_o.jpg',
    excerpt: 'Chia sẻ chủ đề xây dựng kho dữ liệu ứng viên chuyên nghiệp cho phòng HR.',
  },
  {
    title: 'Báo cáo Vietnam Insight - Kantar',
    slug: 'vietnam-insight-kantar',
    image: '/images/baiviet-vietnam-insight-kantar/Screenshot_2021-03-17_094140.jpg',
    excerpt: 'Báo cáo Vietnam Insight E-book từ Kantar về thị trường Việt Nam.',
  },
  {
    title: 'Mời gia nhập Group HR | Developing People',
    slug: 'moi-gia-nhap-group-hr',
    image: '/images/baiviet-moi-gia-nhap-group-hr/60363159_10214423653485967_4981840567878025216_o.jpg',
    excerpt: 'Tham gia cộng đồng HR Developing People cùng Keystone.',
  },
  {
    title: 'Kỹ năng đặt câu hỏi',
    slug: 'ky-nang-dat-cau-hoi',
    image: '/images/baiviet-ky-nang-dat-cau-hoi/download.jpg',
    excerpt: 'Nghệ thuật đặt câu hỏi hiệu quả trong quản lý và lãnh đạo.',
  },
]

export const serviceOptions = [
  'Đào tạo',
  'Huấn luyện / Coaching',
  'Teambuilding',
  'Thiết kế doanh nghiệp',
  'HR Tech',
  'Ứng dụng AI',
  'Khác',
]

export const footerServices = ['Đào tạo', 'Huấn luyện', 'Teambuilding', 'Thiết kế doanh nghiệp', 'HR Tech']

export const footerTraining = ['Ứng Dụng AI', 'Tools @ Workplace', 'Train The Trainer', 'Lãnh đạo', 'Bán hàng', 'Quản lý', 'Kỹ năng mềm', 'Giao tiếp']

export const footerSupport = [
  'Chính sách và quyền riêng tư',
  'Điều khoản sử dụng',
  'Những câu hỏi thường gặp',
  'Hoàn trả và hủy vé',
  'Phương thức giao hàng',
  'Hướng dẫn mua vé',
]
