import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { getPayloadClient } from '@/lib/payload'

async function fetchHome() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0]
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchHome()
  if (!page) return { title: 'KEYSTONE' }
  const seo = (page as unknown as { seo?: { title?: string; description?: string } }).seo
  return {
    title: seo?.title ?? page.title,
    description: seo?.description,
  }
}

export default async function HomePage() {
  const page = await fetchHome()
  if (!page) notFound()

  const blocks = (page as unknown as { layout?: Array<{ blockType: string }> }).layout ?? []

  return (
    <>
      <Navbar />
      <main>
        <BlockRenderer blocks={blocks as Parameters<typeof BlockRenderer>[0]['blocks']} />
      </main>
      <Footer />
    </>
  )
}
