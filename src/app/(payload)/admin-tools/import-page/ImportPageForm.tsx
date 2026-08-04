'use client'

import { useState } from 'react'
import Link from 'next/link'

const TEMPLATE = `{
  "title": "Trang demo",
  "slug": "trang-demo",
  "seo": {
    "title": "Trang demo | KEYSTONE",
    "description": "Mô tả ngắn cho SEO."
  },
  "layout": [
    {
      "blockType": "hero",
      "breadcrumb": "Trang chủ",
      "title": "Trang demo",
      "subtitle": "Subtitle demo.",
      "variant": "navy"
    },
    {
      "blockType": "intro",
      "eyebrow": "Giới thiệu",
      "title": "Heading",
      "paragraphs": [
        { "text": "Đoạn 1." },
        { "text": "Đoạn 2." }
      ],
      "keywords": [
        { "label": "Keyword 1" },
        { "label": "Keyword 2" }
      ]
    },
    {
      "blockType": "features",
      "eyebrow": "Quyền lợi",
      "title": "Vì sao chọn chúng tôi",
      "items": [
        { "icon": "spark", "title": "Feature 1", "body": "Mô tả." },
        { "icon": "chart", "title": "Feature 2", "body": "Mô tả." },
        { "icon": "users", "title": "Feature 3", "body": "Mô tả." }
      ]
    },
    {
      "blockType": "cta",
      "title": "CTA Title",
      "body": "Body",
      "buttonLabel": "Liên hệ ngay",
      "buttonHref": "/lien-he"
    }
  ]
}`

const VALID_BLOCKS = [
  'hero', 'heroSlider', 'intro', 'stats', 'features', 'categoryList',
  'team', 'testimonials', 'services', 'posts', 'events', 'split',
  'image', 'partners', 'map', 'contactForm', 'cta',
  'featureCards', 'featureList', 'legalDoc', 'rawHtml',
]

type ImportResult = {
  action: 'created' | 'updated'
  id: number | string
  slug: string
  blocks: number
  url: string
  adminUrl: string
}

export function ImportPageForm({ userName }: { userName: string }) {
  const [json, setJson] = useState(TEMPLATE)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [errorDetail, setErrorDetail] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResult(null)
    setError(null)
    setErrorDetail(null)
    let parsed: unknown
    try {
      parsed = JSON.parse(json)
    } catch (err) {
      setError(`JSON không hợp lệ: ${err instanceof Error ? err.message : 'parse error'}`)
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/import-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(parsed),
      })
      const j = await res.json()
      if (!res.ok) {
        setError(j.error ?? `HTTP ${res.status}`)
        setErrorDetail(j.invalid ?? j.detail ?? null)
      } else {
        setResult(j as ImportResult)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-xs text-white/60 hover:text-gold-400 transition">
              ← Quay lại Admin
            </Link>
            <h1 className="mt-1 font-serif text-2xl font-extrabold">Import Page (JSON)</h1>
          </div>
          <div className="text-right text-xs text-white/60">
            <div>Đang đăng nhập:</div>
            <div className="text-gold-400 font-semibold">{userName}</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow ring-1 ring-navy-900/5 p-6">
            <label className="block text-sm font-semibold text-navy-900 mb-2">
              JSON schema
            </label>
            <p className="text-xs text-navy-900/60 mb-3">
              Dán JSON đầy đủ <code className="bg-neutral-100 px-1 py-0.5 rounded">{`{ title, slug, seo?, layout: [...] }`}</code>.
              Slug phải là chữ thường, số và dấu gạch nối. Nếu slug đã tồn tại → update; nếu chưa → tạo mới.
            </p>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              spellCheck={false}
              className="w-full h-[520px] font-mono text-xs leading-relaxed rounded-xl border border-navy-900/10 bg-neutral-50 px-4 py-3 text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition resize-y"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setJson(TEMPLATE)}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border border-navy-900/10 hover:bg-neutral-100 text-navy-900/70 transition"
                >
                  Reset template
                </button>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      setJson(JSON.stringify(JSON.parse(json), null, 2))
                      setError(null)
                    } catch (err) {
                      setError(`Không format được: ${err instanceof Error ? err.message : 'parse error'}`)
                    }
                  }}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border border-navy-900/10 hover:bg-neutral-100 text-navy-900/70 transition"
                >
                  Format JSON
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-full transition"
              >
                {loading ? 'Đang gửi...' : 'Import →'}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
              <h3 className="font-bold text-emerald-800 mb-3">
                {result.action === 'created' ? '✓ Đã tạo trang mới' : '✓ Đã cập nhật trang'}
              </h3>
              <dl className="text-sm space-y-1.5 text-emerald-900">
                <Row label="ID" value={String(result.id)} />
                <Row label="Slug" value={result.slug} />
                <Row label="Blocks" value={String(result.blocks)} />
              </dl>
              <div className="mt-4 flex gap-2">
                <Link
                  href={result.url}
                  target="_blank"
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
                >
                  Xem trang ↗
                </Link>
                <Link
                  href={result.adminUrl}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-700 transition"
                >
                  Sửa trong Admin →
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl bg-red-50 border border-red-200 p-5">
              <h3 className="font-bold text-red-800 mb-2">✗ Lỗi import</h3>
              <p className="text-sm text-red-700">{error}</p>
              {errorDetail !== null && (
                <pre className="mt-3 text-xs bg-red-100 p-3 rounded-lg overflow-x-auto text-red-900">
                  {JSON.stringify(errorDetail, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-navy-900/5">
            <h3 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-gold-500 rounded-full" />
              Block types hợp lệ
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {VALID_BLOCKS.map((b) => (
                <code
                  key={b}
                  className="inline-block text-[11px] px-2 py-1 rounded-md bg-neutral-100 text-navy-900/80 font-mono"
                >
                  {b}
                </code>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-navy-900/5 text-sm">
            <h3 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
              <span className="w-1 h-5 bg-gold-500 rounded-full" />
              Lưu ý
            </h3>
            <ul className="space-y-2 text-navy-900/70 text-xs leading-relaxed">
              <li>
                • Field <code className="bg-neutral-100 px-1 rounded">slug</code> đã tồn tại → trang sẽ được <b>update</b>.
              </li>
              <li>
                • Upload field (image/thumbnail) cần là <b>media ID</b> (number) — upload ảnh ở /admin/collections/media trước.
              </li>
              <li>
                • Relationship field (services/team/posts) cần là <b>array of IDs</b>.
              </li>
              <li>
                • Validate xảy ra cả phía API và Payload — nếu block invalid sẽ trả 422.
              </li>
            </ul>
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-5">
            <h3 className="font-bold text-gold-400 text-xs uppercase tracking-wider mb-2">CLI</h3>
            <p className="text-xs text-white/70 mb-2">Có thể POST qua curl:</p>
            <pre className="text-[10px] bg-navy-950 rounded-lg p-3 overflow-x-auto leading-relaxed">{`curl -X POST /api/import-page \\
  -H "Content-Type: application/json" \\
  --cookie "payload-token=..." \\
  -d @page.json`}</pre>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="font-semibold w-16">{label}:</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  )
}
