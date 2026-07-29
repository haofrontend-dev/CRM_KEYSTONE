import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Courses } from './collections/Courses'
import { Testimonials } from './collections/Testimonials'
import { Partners } from './collections/Partners'
import { Team } from './collections/Team'
import { Pages } from './collections/Pages'
import { Events } from './collections/Events'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // serverURL rỗng (đường dẫn tương đối) khi chạy localhost / qua Cloudflare tunnel
  // -> admin/login/media bám theo origin của request, chạy đúng ở mọi cổng & domain động.
  // Chỉ dùng URL tuyệt đối khi NEXT_PUBLIC_SITE_URL là domain thật (vd Vercel).
  serverURL: (() => {
    const u = process.env.NEXT_PUBLIC_SITE_URL || ''
    return u.includes('localhost') || u.includes('127.0.0.1') ? '' : u
  })(),
  admin: {
    user: Users.slug,
    meta: { titleSuffix: '— Admin' },
  },
  collections: [Users, Media, Posts, Events, Services, Courses, Testimonials, Partners, Team, Pages, ContactSubmissions],
  globals: [SiteSettings, HomePage, Navigation],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  upload: { limits: { fileSize: 5_000_000 } },
})
