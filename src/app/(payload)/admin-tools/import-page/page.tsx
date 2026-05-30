import { redirect } from 'next/navigation'
import { headers as nextHeaders } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { ImportPageForm } from './ImportPageForm'

export const metadata = { title: 'Import Page — Admin' }

export default async function ImportPageAdminTool() {
  const payload = await getPayloadClient()
  const reqHeaders = await nextHeaders()
  const { user } = await payload.auth({ headers: reqHeaders })
  if (!user) redirect('/admin/login?redirect=/admin-tools/import-page')

  return <ImportPageForm userName={user.email ?? 'admin'} />
}
