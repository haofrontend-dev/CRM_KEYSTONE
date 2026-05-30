import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST() {
  const payload = await getPayloadClient()

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'public-event' } },
    limit: 1,
  })
  if (existing.docs.length === 0) {
    return NextResponse.json({ error: 'public-event page not found' }, { status: 404 })
  }

  const current = existing.docs[0] as unknown as {
    id: number
    layout: Array<Record<string, unknown>>
  }

  const layout = current.layout.map((b) => {
    if (b.blockType === 'posts') {
      return {
        blockType: 'events',
        eyebrow: b.eyebrow ?? 'Sự kiện',
        title: b.title ?? 'Các sự kiện sắp diễn ra & đã diễn ra',
        perPage: 6,
        showSidebar: true,
      }
    }
    return b
  })

  const updated = await payload.update({
    collection: 'pages',
    id: current.id,
    data: { layout } as never,
  })

  return NextResponse.json({
    action: 'updated',
    id: updated.id,
    blocks: layout.map((b) => b.blockType),
  })
}
