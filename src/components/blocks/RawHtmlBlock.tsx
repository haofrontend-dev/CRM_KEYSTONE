import { scopeCss, sanitizeStyleText } from '@/lib/scope-css'
import { RawHtmlScript } from './RawHtmlScript'

export type RawHtmlBlockData = {
  id?: string | null
  label?: string | null
  html?: string | null
  css?: string | null
  js?: string | null
  scopeCss?: boolean | null
  runScripts?: boolean | null
  background?: string | null
}

/** Inline `<script>` tags, so their code can be run instead of dropped. */
const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi

function extractInlineScripts(html: string): { html: string; scripts: string[] } {
  const scripts: string[] = []
  const cleaned = html.replace(SCRIPT_TAG, (match, attrs: string, body: string) => {
    // Leave external scripts alone — they are removed, not executed.
    if (/\bsrc\s*=/i.test(attrs)) return ''
    if (body.trim()) scripts.push(body)
    return ''
  })
  return { html: cleaned, scripts }
}

export function RawHtmlBlock(p: RawHtmlBlockData) {
  const rawHtml = p.html ?? ''
  if (!rawHtml.trim() && !(p.css ?? '').trim()) return null

  // Stable per-block id: the same markup keeps the same scope across renders.
  const rootId = `rawhtml-${String(p.id ?? '').replace(/[^a-zA-Z0-9_-]/g, '') || 'block'}`
  const scope = `#${rootId}`

  const runScripts = p.runScripts !== false
  const { html, scripts } = runScripts
    ? extractInlineScripts(rawHtml)
    : { html: rawHtml.replace(SCRIPT_TAG, ''), scripts: [] }

  if (p.js?.trim()) scripts.push(p.js)

  const rawCss = p.css ?? ''
  const css = rawCss.trim()
    ? sanitizeStyleText(p.scopeCss === false ? rawCss : scopeCss(rawCss, scope))
    : ''

  const background = p.background?.trim()

  return (
    <section
      className="ks-raw-html"
      style={background ? { background } : undefined}
      data-block-label={p.label ?? undefined}
    >
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <div id={rootId} dangerouslySetInnerHTML={{ __html: html }} />
      {scripts.map((code, i) => (
        <RawHtmlScript key={`${rootId}-js-${i}`} code={code} rootId={rootId} />
      ))}
    </section>
  )
}
