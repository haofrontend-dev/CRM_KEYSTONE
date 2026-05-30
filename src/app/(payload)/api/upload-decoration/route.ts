import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getPayloadClient } from '@/lib/payload'

const files = [
  { src: 'caw-data/images/ve-keystone/NenTang.jpg', filename: 'NenTang.jpg', alt: 'Nền tảng Keystone' },
  { src: 'caw-data/images/ve-keystone/KhacBiet.jpg', filename: 'KhacBiet.jpg', alt: 'Khác biệt Keystone' },
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
    const fullPath = path.join(process.cwd(), f.src)
    const buffer = await fs.readFile(fullPath)
    const doc = await payload.create({
      collection: 'media',
      data: { alt: f.alt },
      file: {
        data: buffer,
        mimetype: 'image/jpeg',
        name: f.filename,
        size: buffer.length,
      },
    })
    results.push({ filename: f.filename, id: doc.id, action: 'uploaded' })
  }

  return NextResponse.json({ results })
}
