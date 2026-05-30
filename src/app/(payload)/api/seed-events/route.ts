import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type EventData = {
  title: string
  slug: string
  categories: string[]
  location: string
  eventDate: string
  imageFile?: string
}

const events: EventData[] = [
  {
    title: 'Thực hành Automation Marketing trên Mautic',
    slug: 'thuc-hanh-automation-marketing-tren-mautic',
    categories: ['cong-nghe'],
    location: '50-52 Nguyễn Công Trứ, Q.1, HCM',
    eventDate: '2019-11-16',
    imageFile: 'mautic-6.jpg',
  },
  {
    title: 'Tự động hóa Marketing & CSKH đa kênh với MAUTIC',
    slug: 'tu-dong-hoa-marketing-cskh-voi-tool-mautic',
    categories: ['cong-nghe', 'groups', 'chuong-trinh-moi'],
    location: '50-52 Nguyễn Công Trứ, Quận 1, TPHCM',
    eventDate: '2019-08-03',
    imageFile: 'tu-dong-hoa-marketing.png',
  },
  {
    title: 'Xây dựng & khai thác kho dữ liệu khách hàng',
    slug: 'thuc-hanh-xay-dung-crm-khong-ton-phi',
    categories: ['cong-nghe', 'groups'],
    location: '50-52 Nguyễn Công Trứ, Q.1, TPHCM',
    eventDate: '2019-06-24',
    imageFile: 'Banner-su-kien.jpg',
  },
  {
    title: 'Thực hành Google & Email xây dựng kho database CV',
    slug: 'thuc-hanh-google-email-xay-dung-kho-database-cv',
    categories: ['cong-nghe', 'groups'],
    location: '92-96 Nguyễn Huệ, Quận 1, TPHCM',
    eventDate: '2019-06-23',
    imageFile: 'hustle.png',
  },
  {
    title: 'Xây dựng kho dữ liệu ứng viên cho phòng HR',
    slug: 'xay-dung-kho-du-lieu-ung-vien-cho-phong-hr',
    categories: ['cong-nghe', 'groups'],
    location: '92-96 Nguyễn Huệ, Q.1, TPHCM',
    eventDate: '2019-05-25',
  },
  {
    title: 'DinnerOn Talks - Lưu ý quan trọng về Tài chính trong Doanh Nghiệp',
    slug: 'dinneron-talks-luu-y-quan-trong-ve-tai-chinh-trong-doanh-nghiep',
    categories: ['groups', 'chuong-trinh-moi'],
    location: 'TPHCM',
    eventDate: '2019-09-14',
  },
  {
    title: 'Thực hành phân tích & ra quyết định tài chính cho CEO',
    slug: 'thuc-hanh-phan-tich-ra-quyet-dinh-tai-chinh-cho-ceo',
    categories: ['groups', 'chuong-trinh-moi'],
    location: 'TPHCM',
    eventDate: '2019-09-07',
  },
  {
    title: 'Thuyết trình không có kế hoạch',
    slug: 'thuyet-trinh-khong-co-ke-hoach',
    categories: ['groups', 'chuong-trinh-moi'],
    location: 'TPHCM',
    eventDate: '2019-07-20',
  },
  {
    title: 'Ứng dụng LEAN trong quản trị nhân sự',
    slug: 'ung-dung-lean-trong-quan-tri-nh-n-su',
    categories: ['groups', 'chuong-trinh-moi'],
    location: 'TPHCM',
    eventDate: '2019-07-06',
  },
  {
    title: 'Trao đổi và Chia sẻ về nghề L&D',
    slug: 'trao-doi-va-chia-se-ve-nghe-ld',
    categories: ['groups', 'hop-tac'],
    location: 'TPHCM',
    eventDate: '2019-06-15',
  },
  {
    title: 'Hành trang sự nghiệp của Sinh viên xuất sắc',
    slug: 'hanh-trang-su-nghiep-cua-sinh-vien-xuat-sac',
    categories: ['hop-tac'],
    location: 'TPHCM',
    eventDate: '2019-05-18',
  },
  {
    title: 'Tools @ Workplace NM Đạm Phú Mỹ và PVFCCO',
    slug: 'tools-workplace-nm-dam-phu-my',
    categories: ['cong-nghe'],
    location: 'Đạm Phú Mỹ',
    eventDate: '2019-08-15',
  },
]

export async function POST() {
  const payload = await getPayloadClient()
  const results: Array<{ slug: string; action: string; id: number | string }> = []

  for (const ev of events) {
    const existing = await payload.find({
      collection: 'events',
      where: { slug: { equals: ev.slug } },
      limit: 1,
    })

    const data = {
      title: ev.title,
      slug: ev.slug,
      categories: ev.categories,
      eventDate: ev.eventDate,
      location: ev.location,
      status: 'published' as const,
      excerpt: `Sự kiện "${ev.title}" tại ${ev.location}`,
    }

    if (existing.docs.length > 0) {
      const u = await payload.update({
        collection: 'events',
        id: existing.docs[0].id,
        data: data as never,
      })
      results.push({ slug: ev.slug, action: 'updated', id: u.id })
    } else {
      const c = await payload.create({
        collection: 'events',
        data: data as never,
      })
      results.push({ slug: ev.slug, action: 'created', id: c.id })
    }
  }

  return NextResponse.json({ events: results, total: results.length })
}
