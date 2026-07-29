import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/sections/NavbarServer'
import { Footer } from '@/components/sections/Footer'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { getPayloadClient } from '@/lib/payload'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<Record<string, string | string[] | undefined>>

async function fetchPage(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'admin' || slug === 'api' || slug.startsWith('admin/')) return {}
  const page = await fetchPage(slug)
  if (!page) return {}
  const seo = (page as unknown as { seo?: { title?: string; description?: string } }).seo
  return {
    title: seo?.title ?? page.title,
    description: seo?.description,
  }
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = await params
  if (slug === 'admin' || slug === 'api' || slug.startsWith('admin/')) notFound()
  const sp = await searchParams
  const page = await fetchPage(slug)
  if (!page) notFound()

  const blocks = (page as unknown as { layout?: Array<{ blockType: string }> }).layout ?? []
  const pageRaw = typeof sp.page === 'string' ? parseInt(sp.page, 10) : 1
  const currentPage = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1
  const catFilter = typeof sp.cat === 'string' ? sp.cat : null

  const jsonLdRaw = (page as unknown as { seo?: { jsonLdSchema?: string | null } }).seo?.jsonLdSchema
  let jsonLdSafe: string | null = null
  if (typeof jsonLdRaw === 'string' && jsonLdRaw.trim()) {
    try {
      const parsed = JSON.parse(jsonLdRaw)
      // Re-stringify (drops anything non-JSON), then escape `<` to prevent </script> breakout.
      jsonLdSafe = JSON.stringify(parsed).replace(/</g, '\\u003c')
    } catch {
      jsonLdSafe = null
    }
  }

  return (
    <>
      {jsonLdSafe && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdSafe }}
        />
      )}
      <Navbar />
      <main>
        <BlockRenderer
          blocks={blocks as Parameters<typeof BlockRenderer>[0]['blocks']}
          currentPage={currentPage}
          pageBasePath={`/${slug}`}
          catFilter={catFilter}
        />
      </main>
      <Footer />
    </>
  )
}
