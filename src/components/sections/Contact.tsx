'use client'

import { useState } from 'react'
import { serviceOptions, siteInfo } from '@/data/site-data'
import { Icon } from '@/components/ui/Icon'

type Field = 'name' | 'email' | 'phone' | 'service' | 'message'

const labels: Record<Field, string> = {
  name: 'Họ và tên *',
  email: 'Email *',
  phone: 'Số điện thoại *',
  service: 'Dịch vụ quan tâm',
  message: 'Tin nhắn',
}

export function Contact() {
  const [form, setForm] = useState<Record<Field, string>>({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    await new Promise((r) => setTimeout(r, 900))
    setState('success')
    setTimeout(() => setState('idle'), 2500)
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden text-white py-24 lg:py-32"
      style={{ background: 'linear-gradient(135deg, #050d1a 0%, #0a1f3c 100%)' }}
    >
      <div className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            ✦ Liên hệ
          </span>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Liên hệ với chúng tôi
          </h2>
          <p className="mt-4 text-white/70 max-w-md leading-[1.75]">
            Để lại thông tin, chuyên gia của Keystone sẽ liên hệ tư vấn lộ trình phù hợp với doanh nghiệp bạn.
          </p>

          <div className="mt-10 space-y-5">
            <ContactRow icon="pin" label="Địa chỉ">
              {siteInfo.address}
            </ContactRow>
            <ContactRow icon="phone" label="Hotline">
              {siteInfo.hotlines.map((h, i) => (
                <span key={h}>
                  {i > 0 && <span className="text-white/30"> · </span>}
                  <a href={`tel:${h.replace(/\s+/g, '')}`} className="hover:text-gold-400 transition">
                    {h}
                  </a>
                </span>
              ))}
            </ContactRow>
            <ContactRow icon="mail" label="Email">
              {siteInfo.emails.map((e, i) => (
                <span key={e}>
                  {i > 0 && <span className="text-white/30"> · </span>}
                  <a href={`mailto:${e}`} className="hover:text-gold-400 transition">
                    {e}
                  </a>
                </span>
              ))}
            </ContactRow>
            <ContactRow icon="clock" label="Giờ làm việc">
              {siteInfo.workingHours}
            </ContactRow>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[24px] bg-white p-8 lg:p-10 text-navy-900 shadow-[var(--shadow-premium-lg)]"
        >
          <h3 className="font-serif text-2xl font-bold">Đăng ký tư vấn</h3>
          <p className="mt-1 text-sm text-navy-900/60">Miễn phí tư vấn cùng chuyên gia.</p>

          <div className="mt-6 space-y-4">
            <FloatingInput field="name" value={form.name} onChange={set('name')} label={labels.name} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FloatingInput field="email" type="email" value={form.email} onChange={set('email')} label={labels.email} />
              <FloatingInput field="phone" type="tel" value={form.phone} onChange={set('phone')} label={labels.phone} />
            </div>
            <div className="relative">
              <select
                value={form.service}
                onChange={set('service')}
                className="peer w-full appearance-none rounded-sm border border-navy-900/15 bg-white px-3 pt-5 pb-2 text-sm focus:border-gold-500 focus:outline-none"
              >
                <option value="">--</option>
                {serviceOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute left-3 top-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy-900/50">
                {labels.service}
              </span>
            </div>
            <FloatingTextarea value={form.message} onChange={set('message')} label={labels.message} />
          </div>

          <button
            type="submit"
            disabled={state === 'loading'}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-navy-900 transition hover:scale-[1.02] hover:bg-gold-400 disabled:opacity-70 disabled:hover:scale-100"
          >
            {state === 'loading' && (
              <span className="w-4 h-4 border-2 border-navy-900/40 border-t-navy-900 rounded-full animate-spin" />
            )}
            {state === 'success' ? (
              <>Đã gửi <Icon name="check" size={18} /></>
            ) : (
              <>Gửi yêu cầu tư vấn <Icon name="arrow-right" size={18} /></>
            )}
          </button>

          {state === 'success' && (
            <p className="mt-3 text-sm text-emerald-600 text-center">
              Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function ContactRow({ icon, label, children }: { icon: 'phone' | 'mail' | 'pin' | 'clock'; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06] text-gold-400">
        <Icon name={icon} size={18} />
      </span>
      <div>
        <div className="text-xs uppercase tracking-widest text-white/40">{label}</div>
        <div className="mt-0.5 text-white">{children}</div>
      </div>
    </div>
  )
}

function FloatingInput({ field, type = 'text', value, onChange, label }: { field: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }) {
  return (
    <div className="relative">
      <input id={field} type={type} value={value} onChange={onChange} placeholder=" "
        className="peer w-full rounded-sm border border-navy-900/15 bg-white px-3 pt-5 pb-2 text-sm focus:border-gold-500 focus:outline-none" />
      <label htmlFor={field} className="pointer-events-none absolute left-3 top-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy-900/50">
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ value, onChange, label }: { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; label: string }) {
  return (
    <div className="relative">
      <textarea rows={4} value={value} onChange={onChange} placeholder=" "
        className="peer w-full rounded-sm border border-navy-900/15 bg-white px-3 pt-5 pb-2 text-sm focus:border-gold-500 focus:outline-none resize-none" />
      <span className="pointer-events-none absolute left-3 top-1.5 text-[11px] font-semibold uppercase tracking-widest text-navy-900/50">
        {label}
      </span>
    </div>
  )
}
