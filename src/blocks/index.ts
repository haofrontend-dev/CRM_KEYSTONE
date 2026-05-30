import type { Block } from 'payload'

export const HeroSliderBlock: Block = {
  slug: 'heroSlider',
  labels: { singular: 'Hero slider', plural: 'Hero sliders' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'badge', type: 'text' },
        { name: 'headline', type: 'textarea' },
        { name: 'sub', type: 'text' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
      ],
    },
    {
      name: 'autoplayMs',
      type: 'number',
      defaultValue: 5000,
      admin: { description: 'Auto-advance interval in ms. 0 = disabled.' },
    },
  ],
}

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'breadcrumb', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'navy',
      options: [
        { label: 'Navy (waves)', value: 'navy' },
        { label: 'Gold banner', value: 'gold' },
        { label: 'Image overlay', value: 'image' },
      ],
    },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}

export const IntroBlock: Block = {
  slug: 'intro',
  labels: { singular: 'Intro / Rich text', plural: 'Intros' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'keywords',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'blockquote', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. When set, renders 2-col text + image layout.' },
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'navy',
      options: [
        { label: 'Navy', value: 'navy' },
        { label: 'Light', value: 'light' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

export const TeamBlock: Block = {
  slug: 'team',
  labels: { singular: 'Team', plural: 'Team blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ],
}

export const ServicesBlock: Block = {
  slug: 'services',
  labels: { singular: 'Services', plural: 'Services blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'centerImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. When set, renders 3-col with image in middle.' },
    },
  ],
}

export const CategoryListBlock: Block = {
  slug: 'categoryList',
  labels: { singular: 'Category list (groups + items)', plural: 'Category lists' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'display',
      type: 'select',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion (collapsible)', value: 'accordion' },
        { label: 'Grid (open)', value: 'grid' },
      ],
    },
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'spark',
          options: [
            'spark', 'shield', 'chart', 'users', 'compass', 'flag',
            'brain', 'layers', 'cpu', 'star',
          ].map((v) => ({ label: v, value: v })),
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Features grid', plural: 'Features blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'spark',
          options: [
            'spark', 'shield', 'chart', 'users', 'compass', 'flag',
            'brain', 'layers', 'cpu', 'star',
          ].map((v) => ({ label: v, value: v })),
        },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}

export const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Banner image', plural: 'Image blocks' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'fullBleed',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Full browser width (no container)' },
    },
  ],
}

export const SplitBlock: Block = {
  slug: 'split',
  labels: { singular: 'Split (text + image)', plural: 'Split blocks' },
  fields: [
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image right', value: 'right' },
        { label: 'Image left', value: 'left' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'bullets',
      type: 'array',
      admin: { description: 'Optional bullet list.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light grey', value: 'light' },
        { label: 'Navy', value: 'navy' },
      ],
    },
  ],
}

export const PostsBlock: Block = {
  slug: 'posts',
  labels: { singular: 'Posts / Blog', plural: 'Posts blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'display',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Slider', value: 'slider' },
      ],
      admin: { description: 'Grid hiển thị dạng lưới, Slider hiển thị dạng trượt ngang.' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: { description: 'Number of recent posts to show.' },
    },
    {
      name: 'pinned',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: { description: 'Optional. Pinned posts. If empty, shows latest by date.' },
    },
    {
      name: 'paginate',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Bật phân trang (chỉ áp dụng cho Grid). Limit trở thành số bài / trang.',
        condition: (_data, siblingData) => siblingData?.display !== 'slider',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Xem tất cả',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/blog',
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Tự động chuyển slide.',
        condition: (_data, siblingData) => siblingData?.display === 'slider',
      },
    },
    {
      name: 'autoplaySpeed',
      type: 'number',
      defaultValue: 4000,
      min: 1000,
      max: 15000,
      admin: {
        description: 'Tốc độ autoplay (ms).',
        condition: (_data, siblingData) => siblingData?.display === 'slider' && siblingData?.autoplay,
      },
    },
    {
      name: 'loop',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Lặp vô hạn (loop).',
        condition: (_data, siblingData) => siblingData?.display === 'slider',
      },
    },
    {
      name: 'slidesPerView',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 5,
      admin: {
        description: 'Số slide hiển thị cùng lúc (desktop).',
        condition: (_data, siblingData) => siblingData?.display === 'slider',
      },
    },
  ],
}

export const PartnersBlock: Block = {
  slug: 'partners',
  labels: { singular: 'Partners marquee', plural: 'Partners blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
    },
  ],
}

export const MapBlock: Block = {
  slug: 'map',
  labels: { singular: 'Map / iframe', plural: 'Map blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'embedUrl',
      type: 'text',
      required: true,
      admin: { description: 'Google Maps embed URL (src của iframe).' },
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 450,
      admin: { description: 'Chiều cao iframe (px).' },
    },
  ],
}

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact form', plural: 'Contact form blocks' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Liên hệ' },
    { name: 'title', type: 'text', defaultValue: 'Gửi tin nhắn cho chúng tôi' },
    { name: 'description', type: 'textarea' },
    { name: 'submitLabel', type: 'text', defaultValue: 'Gửi tin nhắn' },
    { name: 'successMessage', type: 'text', defaultValue: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.' },
  ],
}

export const EventsBlock: Block = {
  slug: 'events',
  labels: { singular: 'Events listing', plural: 'Events blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'perPage',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 50,
      admin: { description: 'Số sự kiện hiển thị mỗi trang.' },
    },
    {
      name: 'showSidebar',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Hiện sidebar (tìm kiếm, danh mục, archive).' },
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA banner', plural: 'CTA blocks' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'text' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Liên hệ ngay' },
    { name: 'buttonHref', type: 'text', defaultValue: '/lien-he' },
  ],
}

export const LegalDocBlock: Block = {
  slug: 'legalDoc',
  labels: { singular: 'Legal / Policy document', plural: 'Legal documents' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'updatedAt', type: 'text', admin: { description: 'VD: Cập nhật lần cuối: 27/05/2026' } },
    { name: 'intro', type: 'textarea' },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}

export const pageBlocks = [
  HeroSliderBlock,
  HeroBlock,
  IntroBlock,
  StatsBlock,
  TeamBlock,
  TestimonialsBlock,
  ServicesBlock,
  FeaturesBlock,
  CategoryListBlock,
  ImageBlock,
  SplitBlock,
  PostsBlock,
  EventsBlock,
  PartnersBlock,
  MapBlock,
  ContactFormBlock,
  LegalDocBlock,
  CtaBlock,
]
