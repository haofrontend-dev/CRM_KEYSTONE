import type { CollectionConfig } from 'payload'
import { revalidateSite } from '@/lib/revalidate-site'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
  upload: { staticDir: 'media', mimeTypes: ['image/*'] },
  fields: [{ name: 'alt', type: 'text' }],
}
