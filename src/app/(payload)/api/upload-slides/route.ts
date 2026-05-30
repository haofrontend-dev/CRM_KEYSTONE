import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getPayloadClient } from '@/lib/payload'

const files = [
  { src: 'caw-data/images/trang-chu/2.jpg', filename: '2.jpg', alt: 'Slide 2 — Nâng cao hiệu quả kinh doanh', mime: 'image/jpeg' },
  { src: 'caw-data/images/trang-chu/3.jpg', filename: '3.jpg', alt: 'Slide 3 — Hệ thống hoá lực lượng bán hàng', mime: 'image/jpeg' },
  { src: 'caw-data/images/trang-chu/dao-tao-ai-trong-doanh-nghiep.jpg', filename: 'dao-tao-ai-trong-doanh-nghiep.jpg', alt: 'Đào tạo AI trong doanh nghiệp', mime: 'image/jpeg' },
]

export async function POST() {
  const payload = await getPayloadClient()
  const results: { filename: string; id: number | string; action: string }[] = []

  for (const f of files) {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: f.filename } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      results.push({ filename: f.filename, id: existing.docs[0].id, action: 'exists' })
      continue
    }
    const buffer = await fs.readFile(path.join(process.cwd(), f.src))
    const doc = await payload.create({
      collection: 'media',
      data: { alt: f.alt },
      file: { data: buffer, mimetype: f.mime, name: f.filename, size: buffer.length },
    })
    results.push({ filename: f.filename, id: doc.id, action: 'uploaded' })
  }

  return NextResponse.json({ results })
}
