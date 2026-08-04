/**
 * Convert a standalone HTML page into a `rawHtml` block payload.
 *
 *   npx tsx scripts/html-to-rawhtml-block.ts page.html
 *   npx tsx scripts/html-to-rawhtml-block.ts page.html --out block.json
 *   npx tsx scripts/html-to-rawhtml-block.ts page.html --page --slug ung-dung-ai-v3 --title "Đào tạo AI"
 *
 * Without `--page` it prints one block object, ready to paste into the
 * `layout` array. With `--page` it prints a full body for /api/import-page
 * (or the paste box at /admin-tools/import-page).
 *
 * The block fields are filled from the source file: everything inside <style>
 * goes to `css`, everything inside <body> goes to `html`, and inline <script>
 * tags stay in the HTML — the block runs them after render.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--'))

if (!file) {
  console.error('Usage: npx tsx scripts/html-to-rawhtml-block.ts <file.html> [--out out.json] [--page] [--slug s] [--title t]')
  process.exit(1)
}

const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`)
  return i !== -1 ? args[i + 1] : undefined
}

const raw = readFileSync(file, 'utf8')

const css = [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
  .map((m) => m[1].trim())
  .join('\n\n')

const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
const html = (bodyMatch ? bodyMatch[1] : raw).trim()

const linked = [...raw.matchAll(/<link[^>]+rel=["']?stylesheet["']?[^>]*>/gi)].map((m) => m[0])
if (linked.length) {
  console.error(`⚠ ${linked.length} thẻ <link rel="stylesheet"> bị bỏ qua — hãy chuyển thành CSS inline hoặc @import:`)
  linked.forEach((l) => console.error(`  ${l}`))
}

const block = {
  blockType: 'rawHtml',
  label: flag('label') ?? file.replace(/^.*\//, ''),
  html,
  css,
  scopeCss: true,
  runScripts: true,
  background: flag('background') ?? '',
}

const payload = args.includes('--page')
  ? {
      title: flag('title') ?? 'Trang mới',
      slug: flag('slug') ?? 'trang-moi',
      seo: {
        title: raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '',
        description: raw.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? '',
      },
      layout: [block],
    }
  : block

const json = JSON.stringify(payload, null, 2)
const out = flag('out')

if (out) {
  writeFileSync(out, json)
  console.error(`✓ ${out} — html ${html.length} ký tự, css ${css.length} ký tự`)
} else {
  console.log(json)
}
