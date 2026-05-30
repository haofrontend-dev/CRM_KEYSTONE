import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getPayloadClient } from '@/lib/payload'

const filename = '22091734_226625397867655_1834460454_n.jpg'

export async function POST() {
  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    return NextResponse.json({ filename, id: existing.docs[0].id, action: 'exists' })
  }
  const buffer = await fs.readFile(
    path.join(process.cwd(), 'caw-data/images/trang-chu', filename),
  )
  const doc = await payload.create({
    collection: 'media',
    data: { alt: 'Keystone - Chúng tôi làm gì' },
    file: { data: buffer, mimetype: 'image/jpeg', name: filename, size: buffer.length },
  })
  return NextResponse.json({ filename, id: doc.id, action: 'uploaded' })
}
