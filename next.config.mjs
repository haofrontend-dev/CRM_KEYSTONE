import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // Local development
      { protocol: 'http', hostname: 'localhost' },

      // Cloudflare Tunnel (trycloudflare.com)
      { protocol: 'https', hostname: '*.trycloudflare.com' },

      // Vercel preview & production
      { protocol: 'https', hostname: '*.vercel.app' },

      // Neon / Supabase storage (nếu dùng sau này)
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

export default withPayload(nextConfig)
