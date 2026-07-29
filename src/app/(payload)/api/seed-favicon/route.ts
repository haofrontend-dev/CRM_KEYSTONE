import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getPayloadClient } from '@/lib/payload'

const FILE = { src: 'public/seed/keystone-favicon.jpg', filename: 'keystone-favicon.jpg', alt: 'Keystone favicon', mime: 'image/jpeg' }

export async function POST() {
  const payload = await getPayloadClient()

  // 1. Upload favicon into the media collection (idempotent).
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: FILE.filename } },
    limit: 1,
  })

  let mediaId: number | string
  let action: string
  if (existing.docs.length > 0) {
    mediaId = existing.docs[0].id
    action = 'exists'
  } else {
    const buffer = await fs.readFile(path.join(process.cwd(), FILE.src))
    const doc = await payload.create({
      collection: 'media',
      data: { alt: FILE.alt },
      file: { data: buffer, mimetype: FILE.mime, name: FILE.filename, size: buffer.length },
    })
    mediaId = doc.id
    action = 'uploaded'
  }

  // 2. Point the site-settings global favicon at it.
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { favicon: mediaId },
  })

  return NextResponse.json({ ok: true, mediaId, action })
}
