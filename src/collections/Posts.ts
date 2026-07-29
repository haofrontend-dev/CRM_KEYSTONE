import type { CollectionConfig } from 'payload'
import { revalidateSite } from '@/lib/revalidate-site'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Tin tức', value: 'tin-tuc' },
        { label: 'Sự kiện', value: 'su-kien' },
        { label: 'Kiến thức', value: 'kien-thuc' },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'author', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
