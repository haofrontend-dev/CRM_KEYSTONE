import { getPayloadClient } from '@/lib/payload'
import { Navbar as NavbarClient } from './Navbar'
import { resolveMediaUrl } from '@/components/blocks/types'

export async function Navbar() {
  let hotline: string | undefined
  let email: string | undefined
  let workingHours: string | undefined
  let logoUrl: string | undefined

  try {
    const payload = await getPayloadClient()
    // depth:1 để lấy object media (có .url) cho logo do admin upload.
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
    hotline = settings?.hotline || undefined
    email = settings?.email || undefined
    workingHours = settings?.workingHours || undefined
    logoUrl = resolveMediaUrl(settings?.logo) || undefined
  } catch {
    // Giữ giá trị mặc định trong Navbar nếu chưa cấu hình site-settings.
  }

  return <NavbarClient hotline={hotline} email={email} workingHours={workingHours} logoUrl={logoUrl} />
}
