/**
 * Seed Script — Import crawled data into Payload CMS
 *
 * Usage: npx tsx src/seed.ts
 *
 * This script:
 * 1. Uploads images from caw-data/images → Media collection
 * 2. Creates Services, Posts, Testimonials, Partners, Team
 * 3. Populates SiteSettings and HomePage globals
 */

// Load .env manually
import { readFileSync } from 'fs'
import { join } from 'path'
try {
  const envFile = readFileSync(join(process.cwd(), '.env'), 'utf-8')
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx)
    const val = trimmed.slice(eqIdx + 1)
    if (key && !process.env[key]) process.env[key] = val
  }
} catch {}

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CAW_IMAGES = path.resolve(__dirname, '..', 'caw-data', 'images')

async function uploadImage(payload: any, filePath: string, alt: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ Image not found: ${filePath}`)
    return null
  }

  const fileName = path.basename(filePath)
  // Check if already uploaded
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: fileName } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`  ✓ Already exists: ${fileName}`)
    return existing.docs[0]
  }

  try {
    const data = fs.readFileSync(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const mimeMap: Record<string, string> = {
      '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.png': 'image/png', '.gif': 'image/gif',
      '.webp': 'image/webp', '.svg': 'image/svg+xml',
    }
    const mimeType = mimeMap[ext] || 'image/jpeg'

    const result = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data, mimetype: mimeType, name: fileName, size: data.length },
    })
    console.log(`  ✓ Uploaded: ${fileName}`)
    return result
  } catch (err: any) {
    console.error(`  ✗ Failed: ${fileName} — ${err.message}`)
    return null
  }
}

async function seed() {
  console.log('\n🌱 Starting Keystone CMS Seed...\n')

  const payload = await getPayload({ config })

  // =====================
  // 1. SITE SETTINGS
  // =====================
  console.log('📌 Updating Site Settings...')
  const logoMedia = await uploadImage(payload, path.join(CAW_IMAGES, 'trang-chu', 'unnamed.png'), 'Keystone Logo')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'KEYSTONE',
      tagline: 'Training & Consulting | Developing People',
      logo: logoMedia?.id || undefined,
      hotline: '0903997909',
      email: 'hello@keystone.vn',
      address: 'Tòa nhà Barotex, Số 6 Võ Văn Kiệt, Phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam',
      workingHours: 'Mon - Sun: 8:30am to 6:30pm',
    },
  })
  console.log('  ✓ Site Settings updated\n')

  // =====================
  // 2. PARTNERS
  // =====================
  console.log('🤝 Seeding Partners...')
  const partnerData = [
    { name: 'Häfele', file: 'hafele.jpg' },
    { name: 'Bridgestone', file: 'bridgestone.jpg' },
    { name: 'Coca-Cola', file: 'cocacola.jpg' },
    { name: 'Grab', file: 'grab.jpg' },
    { name: 'Nestlé', file: 'nestle.jpg' },
    { name: 'VBL', file: 'vbl.jpg' },
    { name: 'Samsung', file: 'samsung.png.jpg' },
    { name: 'Sumitomo', file: 'sumitomo.jpg' },
    { name: 'Bayer', file: 'bayer.jpg' },
  ]

  for (let i = 0; i < partnerData.length; i++) {
    const p = partnerData[i]
    const existing = await payload.find({ collection: 'partners', where: { name: { equals: p.name } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ✓ Skip: ${p.name}`); continue }
    const logo = await uploadImage(payload, path.join(CAW_IMAGES, 'trang-chu', p.file), p.name)
    if (logo) {
      await payload.create({ collection: 'partners', data: { name: p.name, logo: logo.id, order: i } })
    }
  }
  console.log('')

  // =====================
  // 3. TESTIMONIALS
  // =====================
  console.log('💬 Seeding Testimonials...')
  const testimonialData = [
    {
      name: 'Ms. Hoàng Thanh Nhàn',
      position: 'Quản lý',
      company: 'Sumitomo',
      quote: 'Chương trình đào tạo của Keystone rất thực tế và hiệu quả, giúp đội ngũ chúng tôi nâng cao năng lực chuyên môn đáng kể.',
      avatarFile: 'Ms_Nhan_Sumitomo.jpg',
    },
    {
      name: 'Mr. Đặng Tuấn Tiến',
      position: 'Giám đốc',
      company: 'Juno',
      quote: 'Phương pháp huấn luyện của Keystone rất bài bản và chuyên nghiệp. Đội ngũ chuyên gia có kinh nghiệm thực chiến sâu sắc.',
      avatarFile: 'juno-dang-tuan-tien.jpg',
    },
  ]

  for (const t of testimonialData) {
    const existing = await payload.find({ collection: 'testimonials', where: { name: { equals: t.name } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ✓ Skip: ${t.name}`); continue }
    const avatar = await uploadImage(payload, path.join(CAW_IMAGES, 'trang-chu', t.avatarFile), t.name)
    await payload.create({
      collection: 'testimonials',
      data: {
        name: t.name, position: t.position, company: t.company,
        quote: t.quote, rating: 5, isActive: true,
        avatar: avatar?.id || undefined,
      },
    })
  }
  console.log('')

  // =====================
  // 4. TEAM
  // =====================
  console.log('👥 Seeding Team...')
  const teamData = [
    { name: 'Hang Nguyen', file: 'hang-nguyen.jpg' },
    { name: 'Mai Thanh Hoai', file: 'mai-thanh-hoai-3.jpg' },
    { name: 'Vũ Hoàng Quốc Tuấn', file: 'vu-hoang-quoc-tuan.jpg' },
    { name: 'Hoàng Văn Quyền', file: 'hoang-van-quyen-5.jpg' },
    { name: 'Nguyễn Văn Thức', file: 'nguyen-van-thuc.jpg' },
  ]

  for (let i = 0; i < teamData.length; i++) {
    const m = teamData[i]
    const existing = await payload.find({ collection: 'team', where: { name: { equals: m.name } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ✓ Skip: ${m.name}`); continue }
    const photo = await uploadImage(payload, path.join(CAW_IMAGES, 've-keystone', m.file), m.name)
    await payload.create({
      collection: 'team',
      data: { name: m.name, order: i, isActive: true, photo: photo?.id || undefined },
    })
  }
  console.log('')

  // =====================
  // 5. SERVICES
  // =====================
  console.log('🛠 Seeding Services...')
  const serviceData = [
    { title: 'Đào tạo', slug: 'dao-tao', desc: 'Cung cấp dải rộng các khóa đào tạo chất lượng cao nhằm giúp doanh nghiệp vận hành hiệu quả.', icon: 'dao-tao-53.png', order: 1 },
    { title: 'Huấn luyện', slug: 'huan-luyen', desc: 'Chương trình Coach chuyên sâu may đo theo nhu cầu, mục tiêu của từng cá nhân và doanh nghiệp.', icon: 'coaching-53.png', order: 2 },
    { title: 'Teambuilding', slug: 'teambuilding', desc: 'Teambuilding chuyên nghiệp, bài bản và có tính phát triển con người, thiết kế khoa học.', icon: 'teambuilding-53.png', order: 3 },
    { title: 'Thiết kế doanh nghiệp', slug: 'thiet-ke-doanh-nghiep', desc: 'Tư vấn và thiết kế mô hình kinh doanh, tái cấu trúc doanh nghiệp theo phương pháp BOTT.', icon: 'thiet-ke-doanh-nghiep-53.png', order: 4 },
    { title: 'HR Tech', slug: 'hr-technology-solutions', desc: 'Nghiên cứu và triển khai ứng dụng công nghệ cho bộ phận HR và L&D trong doanh nghiệp.', icon: 'hr-tech-53.png', order: 5 },
    { title: 'Chương trình đặc biệt', slug: 'public-event', desc: 'Các chương trình sự kiện, workshop và seminar chuyên đề cho doanh nghiệp.', icon: 'ct-dac-biet-53.png', order: 6 },
  ]

  for (const s of serviceData) {
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: s.slug } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ✓ Skip: ${s.title}`); continue }
    const iconMedia = await uploadImage(payload, path.join(CAW_IMAGES, 'trang-chu', s.icon), s.title)
    await payload.create({
      collection: 'services',
      data: {
        title: s.title, slug: s.slug, shortDescription: s.desc,
        order: s.order, isActive: true,
        icon: iconMedia?.id || undefined,
      },
    })
  }
  console.log('')

  // =====================
  // 6. BLOG POSTS
  // =====================
  console.log('📝 Seeding Blog Posts...')
  const postData = [
    { title: 'Đào tạo Ứng dụng AI', slug: 'dao-tao-ung-dung-ai', img: 'baiviet-dao-tao-ung-dung-ai/dao-tao-ung-dung-ai-keystone-0.jpg', excerpt: 'Chương trình đào tạo toàn diện về ứng dụng AI trong doanh nghiệp.', cat: 'tin-tuc' },
    { title: 'Đào tạo Inhouse AI Doanh nghiệp', slug: 'ai-inhouse-doanh-nghiep', img: 'baiviet-ai-inhouse-doanh-nghiep/dao-tao-inhouse-ai-doanh-nghiep-banner.jpg', excerpt: 'Giải pháp đào tạo AI inhouse toàn diện.', cat: 'tin-tuc' },
    { title: 'Khoá AI Public 16/03/2025', slug: 'khoa-ai-public-16032025', img: 'baiviet-khoa-ai-public-16032025/MASTERING_AI_FOR_WORK_NGANG.png', excerpt: 'Mastering AI for Work khoá học AI công khai.', cat: 'su-kien' },
    { title: 'Khoá AI Public 24/08/2024', slug: 'khoa-ai-public-24082024', img: 'baiviet-khoa-ai-public-24082024/dao-tao-ai-public-240824-1.jpeg', excerpt: 'Khoá đào tạo AI công khai tháng 8/2024.', cat: 'su-kien' },
    { title: 'Đào Tạo AI sáng tạo nội dung báo chí số', slug: 'ai-bao-chi-so', img: 'baiviet-ai-bao-chi-so/dao-tao-ai-bao-chi-so-0.jpg', excerpt: 'Ứng dụng AI trong sáng tạo nội dung báo chí số.', cat: 'tin-tuc' },
    { title: '8 Tuyệt kỹ bán hàng', slug: '8-tuyet-ky-ban-hang', img: 'baiviet-8-tuyet-ky-ban-hang/66606684_2269498733099541_2595954731364909056_o.jpg', excerpt: '8 kỹ năng bán hàng thiết yếu.', cat: 'kien-thuc' },
    { title: 'Tools @ Workplace NM Đạm Phú Mỹ', slug: 'tools-workplace-pmu', img: 'baiviet-tools-workplace-pmu/tool-at-workplace.jpg', excerpt: 'Triển khai Tools @ Workplace tại NM Đạm Phú Mỹ.', cat: 'tin-tuc' },
    { title: 'Cập nhật Tools @ Workplace', slug: 'cap-nhat-tools-workplace', img: 'baiviet-cap-nhat-tools-workplace/keytech-ung-dung-cong-nghe.jpg', excerpt: 'Cập nhật chương trình Tools @ Workplace.', cat: 'tin-tuc' },
    { title: 'Tools for Trainers', slug: 'tools-for-trainers', img: 'baiviet-tools-for-trainers/tool-for-trainer.jpg', excerpt: 'Bộ công cụ công nghệ dành cho Trainers.', cat: 'kien-thuc' },
    { title: 'Đào tạo Train The Trainer', slug: 'dao-tao-train-the-trainer', img: 'baiviet-dao-tao-train-the-trainer/train-the-trainer.jpg', excerpt: 'Chương trình đào tạo giảng viên nội bộ.', cat: 'tin-tuc' },
    { title: 'Chuyên viên triển khai CRM', slug: 'crm-doanh-nghiep', img: 'baiviet-crm-doanh-nghiep/chuyen-vien-crm.png', excerpt: 'Hướng dẫn triển khai hệ thống CRM.', cat: 'kien-thuc' },
    { title: 'Ứng dụng công nghệ cho SMEs', slug: 'ung-dung-cong-nghe-smes', img: 'baiviet-ung-dung-cong-nghe-smes/sme-mngmt.jpg', excerpt: 'Giải pháp công nghệ cho doanh nghiệp vừa và nhỏ.', cat: 'kien-thuc' },
    { title: 'Google Sheet kho dữ liệu khách hàng', slug: 'gsheet-kho-khach-hang', img: 'baiviet-gsheet-kho-khach-hang/crm-google-sheet.jpg', excerpt: 'Ứng dụng Google Sheet xây dựng kho dữ liệu khách hàng.', cat: 'kien-thuc' },
    { title: 'Google Sheet kho dữ liệu ứng viên', slug: 'gsheet-kho-ung-vien', img: 'baiviet-gsheet-kho-ung-vien/Candidate-Database-Matching-Are-You-Doing-It_.jpg', excerpt: 'Google Sheet cho kho dữ liệu ứng viên HR.', cat: 'kien-thuc' },
    { title: 'Xây dựng kho dữ liệu ứng viên HR', slug: 'kho-du-lieu-ung-vien-hr', img: 'baiviet-kho-du-lieu-ung-vien-hr/61106704_10214476300922120_2518335146088726528_o.jpg', excerpt: 'Chia sẻ xây dựng kho dữ liệu ứng viên cho phòng HR.', cat: 'kien-thuc' },
    { title: 'Báo cáo Vietnam Insight Kantar', slug: 'vietnam-insight-kantar', img: 'baiviet-vietnam-insight-kantar/Screenshot_2021-03-17_094140.jpg', excerpt: 'Báo cáo Vietnam Insight E-book từ Kantar.', cat: 'kien-thuc' },
    { title: 'Group HR Developing People', slug: 'moi-gia-nhap-group-hr', img: 'baiviet-moi-gia-nhap-group-hr/60363159_10214423653485967_4981840567878025216_o.jpg', excerpt: 'Tham gia cộng đồng HR Developing People.', cat: 'kien-thuc' },
    { title: 'Kỹ năng đặt câu hỏi', slug: 'ky-nang-dat-cau-hoi', img: 'baiviet-ky-nang-dat-cau-hoi/download.jpg', excerpt: 'Nghệ thuật đặt câu hỏi hiệu quả.', cat: 'kien-thuc' },
    { title: 'Tools @ Workplace BV', slug: 'tools-at-workplace-bv', img: 'baiviet-tools-at-workplace-bv/tools-at-workplace-bv.jpg', excerpt: 'Chương trình Tools at Workplace.', cat: 'tin-tuc' },
  ]

  for (const p of postData) {
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: p.slug } }, limit: 1 })
    if (existing.docs.length > 0) { console.log(`  ✓ Skip: ${p.title}`); continue }

    const thumb = await uploadImage(payload, path.join(CAW_IMAGES, p.img), p.title)
    await payload.create({
      collection: 'posts',
      data: {
        title: p.title, slug: p.slug, excerpt: p.excerpt,
        category: p.cat as 'tin-tuc' | 'su-kien' | 'kien-thuc', status: 'published',
        publishedAt: new Date().toISOString(),
        thumbnail: thumb?.id || undefined,
      },
    })
  }
  console.log('')

  // =====================
  // 7. HOME PAGE GLOBAL
  // =====================
  console.log('🏠 Updating HomePage global...')
  const heroImg = await uploadImage(payload, path.join(CAW_IMAGES, 'trang-chu', '1.jpg'), 'Hero Banner')
  const aboutImg = await uploadImage(payload, path.join(CAW_IMAGES, 'trang-chu', 'about-image.jpg'), 'About Keystone')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        headline: 'NÂNG CAO HIỆU QUẢ KINH DOANH',
        subheadline: 'Keystone là đơn vị đào tạo & tư vấn chuyên nghiệp, tiên phong trong ứng dụng công nghệ phát triển con người.',
        ctaText: 'Xem thêm',
        ctaLink: '/dao-tao',
        backgroundImage: heroImg?.id || undefined,
      },
      aboutSection: {
        title: 'KEYSTONE — Developing People',
        image: aboutImg?.id || undefined,
        stats: [
          { label: 'Nhân viên', value: '15+' },
          { label: 'Khách hàng hài lòng', value: '98%' },
          { label: 'Hợp đồng', value: '500+' },
          { label: 'Đánh giá', value: '5★' },
        ],
      },
      valuesSection: {
        items: [
          { icon: 'spark', title: 'KHÁC BIỆT', description: 'Phương pháp đào tạo độc quyền kết hợp thực chiến.' },
          { icon: 'compass', title: 'SỨ MẠNG', description: 'Phát triển con người, phát triển tổ chức.' },
          { icon: 'shield', title: 'GIÁ TRỊ', description: 'Chính trực, tận tâm, đổi mới không ngừng.' },
        ],
      },
      seoTitle: 'KEYSTONE | Training & Consulting — Developing People',
      seoDescription: 'Keystone là đơn vị đào tạo & tư vấn chuyên nghiệp. Cung cấp chuyên sâu các khóa đào tạo, huấn luyện và tư vấn hiệu quả dành cho doanh nghiệp.',
    },
  })
  console.log('  ✓ HomePage updated\n')

  // =====================
  // 8. NAVIGATION GLOBAL
  // =====================
  console.log('🧭 Updating Navigation...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      topBar: {
        phone: '0903997909',
        email: 'hello@keystone.vn',
        workingHours: 'Mon - Sun: 8:30am to 6:30pm',
      },
      menuItems: [
        { label: 'KEYSTONE!?', link: '/keystone' },
        { label: 'Đào tạo', link: '/dao-tao' },
        { label: 'Huấn luyện', link: '/huan-luyen' },
        { label: 'Teambuilding', link: '/teambuilding' },
        { label: 'HR Tech', link: '/hr-technology-solutions' },
        { label: 'Events', link: '/public-event' },
        { label: 'Blog', link: '/blog' },
        { label: 'Liên hệ', link: '/lien-he' },
      ],
      ctaButton: { label: 'Liên hệ ngay', link: '/lien-he' },
    },
  })
  console.log('  ✓ Navigation updated\n')

  console.log('✅ Seed completed successfully!\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
