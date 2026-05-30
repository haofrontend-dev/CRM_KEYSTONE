import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Công nghệ', value: 'cong-nghe' },
        { label: 'GROUPs', value: 'groups' },
        { label: 'Hợp tác', value: 'hop-tac' },
        { label: 'Chương trình mới', value: 'chuong-trinh-moi' },
        { label: 'Tư duy và công cụ', value: 'tu-duy-va-cong-cu' },
        { label: 'HR', value: 'hr' },
        { label: 'Learning & Development', value: 'learning-development' },
      ],
    },
    { name: 'eventDate', type: 'date', admin: { description: 'Ngày diễn ra sự kiện' } },
    { name: 'location', type: 'text', admin: { description: 'Địa điểm sự kiện' } },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
