import type { GlobalConfig } from 'payload'
import { revalidateSite } from '@/lib/revalidate-site'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateSite],
  },
  fields: [
    { name: 'siteName', type: 'text' },
    { name: 'tagline', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'hotline', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'workingHours', type: 'text' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'zalo', type: 'text' },
      ],
    },
    {
      name: 'footer',
      label: 'Footer',
      type: 'group',
      fields: [
        { name: 'logo', label: 'Logo (white)', type: 'upload', relationTo: 'media' },
        { name: 'slogan', label: 'Slogan', type: 'text' },
        { name: 'subSlogan', label: 'Sub slogan', type: 'text' },
        { name: 'legalName', label: 'Tên công ty (pháp lý)', type: 'text' },
        { name: 'representative', label: 'Người đại diện', type: 'text' },
        { name: 'taxCode', label: 'Mã số thuế', type: 'text' },

        {
          name: 'badges',
          label: 'Logo chứng nhận (Bộ Công Thương, DMCA…)',
          type: 'array',
          labels: { singular: 'Badge', plural: 'Badges' },
          admin: { description: 'Mỗi badge: tải ảnh lên HOẶC dán URL ảnh ngoài (vd DMCA).' },
          fields: [
            { name: 'image', label: 'Ảnh (tải lên)', type: 'upload', relationTo: 'media' },
            {
              name: 'imageUrl',
              label: 'Hoặc URL ảnh ngoài',
              type: 'text',
              admin: { description: 'Dùng khi ảnh nằm ở dịch vụ ngoài, vd images.dmca.com.' },
            },
            { name: 'link', label: 'Liên kết khi click', type: 'text' },
            { name: 'alt', label: 'Mô tả ảnh (alt)', type: 'text' },
            {
              name: 'whiteBg',
              label: 'Nền trắng phía sau logo',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'height',
              label: 'Chiều cao (px)',
              type: 'number',
              defaultValue: 44,
            },
          ],
        },
      ],
    },
  ],
}
