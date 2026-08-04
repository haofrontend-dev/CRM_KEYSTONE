import { NextResponse } from 'next/server'
import { headers as nextHeaders } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'

type LayoutBlock = { blockType: string } & Record<string, unknown>

type ImportPayload = {
  title?: unknown
  slug?: unknown
  seo?: { title?: unknown; description?: unknown }
  layout?: unknown
}

const VALID_BLOCK_TYPES = new Set([
  'hero', 'heroSlider', 'intro', 'stats', 'features', 'categoryList',
  'team', 'testimonials', 'services', 'posts', 'events', 'split',
  'image', 'partners', 'map', 'contactForm', 'cta',
  'featureCards', 'featureList', 'legalDoc', 'rawHtml',
])

export async function POST(req: Request) {
  const payload = await getPayloadClient()

  // Auth: require logged-in Payload user
  const reqHeaders = await nextHeaders()
  const { user } = await payload.auth({ headers: reqHeaders })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized — please log in to admin first.' }, { status: 401 })
  }

  let body: ImportPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const slug = typeof body.slug === 'string' ? body.slug.trim() : ''
  const layout = Array.isArray(body.layout) ? (body.layout as LayoutBlock[]) : null

  if (!title) return NextResponse.json({ error: 'Field "title" is required.' }, { status: 400 })
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Field "slug" must be lowercase letters/numbers/hyphens.' }, { status: 400 })
  }
  if (!layout || layout.length === 0) {
    return NextResponse.json({ error: 'Field "layout" must be a non-empty array.' }, { status: 400 })
  }

  // Validate block types
  const invalid: Array<{ index: number; type: unknown }> = []
  layout.forEach((b, i) => {
    if (!b || typeof b !== 'object' || typeof b.blockType !== 'string' || !VALID_BLOCK_TYPES.has(b.blockType)) {
      invalid.push({ index: i, type: b?.blockType })
    }
  })
  if (invalid.length > 0) {
    return NextResponse.json({
      error: 'Invalid blockType(s).',
      invalid,
      validBlockTypes: Array.from(VALID_BLOCK_TYPES),
    }, { status: 400 })
  }

  const seoTitle = typeof body.seo?.title === 'string' ? body.seo.title : undefined
  const seoDescription = typeof body.seo?.description === 'string' ? body.seo.description : undefined

  const data = {
    title,
    slug,
    layout,
    ...(seoTitle || seoDescription ? { seo: { title: seoTitle, description: seoDescription } } : {}),
  }

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  try {
    if (existing.docs.length > 0) {
      const doc = await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: data as never,
      })
      return NextResponse.json({
        action: 'updated',
        id: doc.id,
        slug,
        blocks: layout.length,
        url: `/${slug}`,
        adminUrl: `/admin/collections/pages/${doc.id}`,
      })
    }
    const doc = await payload.create({
      collection: 'pages',
      data: data as never,
    })
    return NextResponse.json({
      action: 'created',
      id: doc.id,
      slug,
      blocks: layout.length,
      url: `/${slug}`,
      adminUrl: `/admin/collections/pages/${doc.id}`,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Payload error'
    return NextResponse.json({ error: 'Payload rejected the page.', detail: message }, { status: 422 })
  }
}

export async function GET() {
  return NextResponse.json({
    description: 'POST a JSON body { title, slug, seo?, layout: [{ blockType, ...fields }] } to create or update a CMS page. Requires admin auth.',
    validBlockTypes: Array.from(VALID_BLOCK_TYPES),
    example: {
      title: 'My New Page',
      slug: 'my-new-page',
      seo: { title: 'SEO Title', description: 'SEO Description' },
      layout: [
        { blockType: 'hero', title: 'Welcome', subtitle: 'Sub', variant: 'navy', breadcrumb: 'Trang chủ' },
        { blockType: 'cta', title: 'CTA', body: 'Body', buttonLabel: 'Click', buttonHref: '/lien-he' },
      ],
    },
  })
}
