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
  // Production (Vercel): dùng domain thật để URL media tuyệt đối.
  // Local dev: để rỗng -> Payload dùng đường dẫn tương đối + origin của request,
  // nên admin/login/media chạy đúng dù Next chạy ở cổng nào (3000/3002/3050...).
  serverURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SITE_URL || '' : '',
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
