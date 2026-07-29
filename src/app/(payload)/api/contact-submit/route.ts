import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { sendContactNotification } from '@/lib/mail'

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Vui lòng điền họ tên, email và nội dung.' },
      { status: 400 },
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Nội dung quá dài.' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  const doc = await payload.create({
    collection: 'contact-submissions',
    data: {
      name,
      email,
      subject: subject || undefined,
      message,
      status: 'new',
    },
  })

  try {
    await sendContactNotification({ name, email, subject, message })
  } catch (err) {
    console.error('Gửi email thông báo liên hệ thất bại:', err)
  }

  return NextResponse.json({ id: doc.id, ok: true })
}
