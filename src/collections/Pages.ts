import type { CollectionConfig } from 'payload'
import { pageBlocks } from '@/blocks'
import { revalidateSite } from '@/lib/revalidate-site'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path, e.g. "keystone" → /keystone' },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'jsonLdSchema',
          type: 'textarea',
          admin: {
            description:
              'Structured data JSON-LD (schema.org). Dán JSON object hoặc array. Sẽ render <script type="application/ld+json"> trong <head>. Để trống nếu không dùng.',
            rows: 12,
            placeholder:
              '{"@context":"https://schema.org","@type":"Organization","name":"KEYSTONE","url":"https://keystone.vn"}',
          },
          validate: (val: unknown) => {
            if (!val || typeof val !== 'string' || val.trim() === '') return true
            try {
              JSON.parse(val)
              return true
            } catch (err) {
              return `JSON không hợp lệ: ${err instanceof Error ? err.message : 'parse error'}`
            }
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: pageBlocks,
    },
  ],
}
