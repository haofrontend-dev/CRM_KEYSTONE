'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

export type ContactFormBlockData = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  submitLabel?: string | null
  successMessage?: string | null
}

export function ContactFormBlock(p: ContactFormBlockData) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg(null)
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    }
    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error ?? 'Có lỗi xảy ra. Vui lòng thử lại.')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrMsg(err instanceof Error ? err.message : 'Có lỗi xảy ra.')
    }
  }

  const submitLabel = p.submitLabel ?? 'Gửi tin nhắn'
  const successMessage = p.successMessage ?? 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.'

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-10">
          {p.eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
              <Icon name="spark" size={14} /> {p.eyebrow}
            </span>
          )}
          {p.title && (
            <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-extrabold text-navy-900 leading-[1.1]">
              {p.title}
            </h2>
          )}
          {p.description && (
            <p className="mt-4 text-navy-900/70 max-w-2xl mx-auto">{p.description}</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-neutral-50 rounded-2xl p-8 lg:p-10 shadow-[0_8px_30px_-12px_rgba(10,31,60,0.12)] ring-1 ring-navy-900/5 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field name="name" label="Họ tên *" type="text" required />
            <Field name="email" label="Email *" type="email" required />
          </div>
          <Field name="subject" label="Chủ đề" type="text" />
          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-2">
              Nội dung <span className="text-gold-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition resize-none"
              placeholder="Vui lòng mô tả ngắn gọn nhu cầu của bạn..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-navy-900/50">
              Bằng cách gửi, bạn đồng ý với chính sách quyền riêng tư của chúng tôi.
            </p>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-full transition shadow-[0_8px_20px_-6px_rgba(10,31,60,0.4)]"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  {submitLabel}
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          {status === 'success' && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">✓</span>
              {successMessage}
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errMsg ?? 'Có lỗi xảy ra. Vui lòng thử lại.'}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  type,
  required,
}: {
  name: string
  label: string
  type: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy-900 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-navy-900/10 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition"
      />
    </div>
  )
}
