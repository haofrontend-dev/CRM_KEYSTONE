Build a modern Vietnamese business introduction website using 
Payload CMS 3.0 with Next.js 15 App Router in a monorepo setup.

## Tech Stack
- Next.js 15 (App Router)
- Payload CMS 3.0 (same Next.js repo)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- MongoDB Atlas (database)
- Vercel (deploy)

## Project Structure

my-website/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public website
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── gioi-thieu/
│   │   │   ├── dich-vu/
│   │   │   ├── dao-tao/
│   │   │   ├── tin-tuc/
│   │   │   │   └── [slug]/
│   │   │   ├── lien-he/
│   │   │   └── chinh-sach/
│   │   ├── (payload)/           # CMS Admin
│   │   │   └── admin/[[...segments]]/
│   │   └── api/
│   ├── collections/             # Payload collections
│   │   ├── Posts.ts
│   │   ├── Services.ts
│   │   ├── Courses.ts
│   │   ├── Testimonials.ts
│   │   ├── Partners.ts
│   │   └── Media.ts
│   ├── globals/                 # Payload globals
│   │   ├── SiteSettings.ts
│   │   ├── HomePage.ts
│   │   └── Navigation.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Values.tsx
│   │       ├── AboutUs.tsx
│   │       ├── Services.tsx
│   │       ├── Courses.tsx
│   │       ├── Testimonials.tsx
│   │       ├── Partners.tsx
│   │       ├── BlogGrid.tsx
│   │       └── ContactForm.tsx
│   └── payload.config.ts

## Payload Collections

### Posts (Tin tức/Blog)
fields:
- title: text (required)
- slug: text (unique, auto-generate from title)
- thumbnail: upload (Media)
- category: select [tin-tuc, su-kien, kien-thuc]
- excerpt: textarea
- content: richText (Lexical editor)
- author: text
- publishedAt: date
- status: select [draft, published]

### Services (Dịch vụ)
fields:
- title: text
- slug: text
- icon: upload hoặc select icon name
- shortDescription: textarea
- content: richText
- order: number
- isActive: checkbox

### Courses (Khóa đào tạo)
fields:
- title: text
- slug: text
- thumbnail: upload
- duration: text (vd: "2 ngày")
- level: select [co-ban, trung-cap, nang-cao]
- description: richText
- price: number
- isActive: checkbox
- order: number

### Testimonials (Cảm nhận)
fields:
- name: text
- position: text
- company: text
- avatar: upload
- quote: textarea
- rating: number (1-5)
- isActive: checkbox

### Partners (Đối tác)
fields:
- name: text
- logo: upload (required)
- website: text
- order: number

### Media
- Payload built-in Media collection
- Image optimization enabled

## Payload Globals

### SiteSettings
- siteName, tagline
- logo, favicon
- hotline, email, address
- workingHours
- socialLinks: { facebook, youtube, linkedin, zalo }

### HomePage
- hero: { headline, subheadline, ctaText, ctaLink, backgroundImage }
- aboutSection: { title, content, image, stats[] }
- valuesSection: { items: [{ icon, title, description }] }
- seoTitle, seoDescription

### Navigation
- topBar: { phone, email, workingHours }
- menuItems: array relationship
- ctaButton: { label, link }

## payload.config.ts Setup

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nextjsRouteHandler } from '@payloadcms/next'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Courses } from './collections/Courses'
import { Testimonials } from './collections/Testimonials'
import { Partners } from './collections/Partners'
import { Media } from './collections/Media'

export default buildConfig({
  admin: {
    user: 'users',
    meta: { titleSuffix: '— Admin' }
  },
  collections: [Posts, Services, Courses, Testimonials, Partners, Media],
  globals: [SiteSettings, HomePage, Navigation],
  editor: lexicalEditor({}),
  db: mongooseAdapter({ url: process.env.MONGODB_URI! }),
  typescript: { outputFile: 'payload-types.ts' },
  upload: { limits: { fileSize: 5000000 } }
})

## Frontend Data Fetching Pattern

// Dùng Payload local API (fastest — no HTTP overhead)
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

async function getData() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 3,
  })
  
  return posts.docs
}

## Design Implementation

### Color Palette
- Navy: #0a1f3c
- Gold: #d4a843  
- Light BG: #f8f9fa
- Text: #333333
- White: #ffffff

### Sections to build (in order):

1. NAVBAR
- Sticky, blur backdrop on scroll
- Top utility bar (hotline, email, hours)
- Mobile hamburger menu with slide drawer
- Active link indicator

2. HERO
- Full viewport height
- Animated headline (word by word reveal)
- Gradient mesh background (navy to deep blue)
- Floating card elements with glassmorphism
- Scroll indicator arrow

3. VALUES (3 cards)
- Scroll-triggered stagger animation
- Navy cards, gold icon, hover glow effect

4. ABOUT US
- 2-col: text + image with overlay stats
- Animated number counters (useInView trigger)
- Navy CTA banner below

5. SERVICES
- Responsive grid 2x3
- Icon + title + description
- Hover: border-gold + lift shadow
- "Xem tất cả" link

6. COURSES
- Horizontal scroll on mobile
- Card: thumbnail + level badge + duration + title
- Gold CTA button per card

7. TESTIMONIALS  
- Auto-slide carousel (3s interval)
- Pause on hover
- Dot navigation
- Partner logos below with infinite scroll marquee

8. BLOG GRID
- 3 latest posts from CMS
- Category tag + title + date + excerpt
- Hover: image scale + gold title

9. CONTACT FORM
- Navy section background
- React Hook Form + Zod validation
- Fields: name, email, phone, message
- API route: /api/contact (send email via Resend)
- Loading spinner + success toast

10. FOOTER
- 5-column grid → stacks on mobile
- Newsletter signup
- Social icons
- Bottom bar: copyright + policy links

## Animations (Framer Motion)

// Reusable animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// Use with ScrollTrigger
<motion.div
  variants={fadeUpVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>

## Environment Variables
MONGODB_URI=mongodb+srv://...
PAYLOAD_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
RESEND_API_KEY=re_xxxx (for contact form email)

## Commands
npx create-payload-app@latest
# Select: blank template + Next.js + MongoDB

npm run dev     # localhost:3000
# Admin: localhost:3000/admin

## Deliverables
1. Full working Next.js + Payload CMS monorepo
2. All 6 collections + 3 globals configured
3. Homepage with all 10 sections
4. All 7 pages with dynamic data from CMS
5. Mobile responsive + animations
6. Contact form with email sending
7. SEO metadata per page
8. Ready to deploy on Vercel