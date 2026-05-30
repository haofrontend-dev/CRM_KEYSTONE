import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'duration', type: 'text' },
    {
      name: 'level',
      type: 'select',
      options: [
        { label: 'Cơ bản', value: 'co-ban' },
        { label: 'Trung cấp', value: 'trung-cap' },
        { label: 'Nâng cao', value: 'nang-cao' },
      ],
    },
    { name: 'description', type: 'richText' },
    { name: 'price', type: 'number' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
