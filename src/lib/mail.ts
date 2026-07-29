import { Resend } from 'resend'
import { renderAdminNotificationEmail, renderUserConfirmationEmail } from './email-templates'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL

export async function sendContactNotification(data: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  if (!resend) {
    console.warn('[mail] RESEND_API_KEY chưa cấu hình, bỏ qua gửi mail.')
    return
  }

  const safeSubject = (data.subject || 'Không có chủ đề').replace(/[\r\n]/g, ' ')

  if (ADMIN_EMAIL) {
    console.log('[mail] Đang gửi email thông báo tới admin', ADMIN_EMAIL)
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `[Liên hệ mới] ${safeSubject}`,
      html: renderAdminNotificationEmail(data),
    })
    if (result.error) {
      console.error('[mail] Gửi mail admin thất bại:', JSON.stringify(result.error))
    } else {
      console.log('[mail] Gửi mail admin thành công, id:', result.data?.id)
    }
  } else {
    console.warn('[mail] CONTACT_ADMIN_EMAIL chưa cấu hình, bỏ qua mail admin.')
  }

  console.log('[mail] Đang gửi email xác nhận tới người gửi', data.email)
  const userResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Keystone đã nhận được liên hệ của bạn',
    html: renderUserConfirmationEmail(data),
  })
  if (userResult.error) {
    console.error('[mail] Gửi mail xác nhận cho người dùng thất bại:', JSON.stringify(userResult.error))
  } else {
    console.log('[mail] Gửi mail xác nhận thành công, id:', userResult.data?.id)
  }
}
