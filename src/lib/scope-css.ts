/**
 * Scope a stylesheet to a single container so CSS pasted from a standalone
 * HTML page cannot leak into the rest of the site.
 *
 * Every rule gets the container prefixed onto its selectors, and the selectors
 * that target the document itself (`html`, `body`, `:root`, `*`) are rewritten
 * onto the container instead. `@media` / `@supports` / `@container` / `@layer`
 * bodies are scoped recursively; `@keyframes`, `@font-face` and friends are
 * left alone. `@import` / `@charset` statements are hoisted to the top because
 * browsers ignore them anywhere else.
 */

type Node =
  | { type: 'statement'; text: string }
  | { type: 'block'; prelude: string; body: string }

/** At-rules whose body is a list of normal rules → recurse into them. */
const NESTED_AT = /^@(media|supports|container|layer|scope|document|-moz-document)\b/i

/** At-rules whose body is not a selector list → copy verbatim. */
const VERBATIM_AT =
  /^@(-\w+-)?(keyframes|font-face|page|property|counter-style|font-feature-values|viewport|color-profile)\b/i

/** Statements that must sit at the very top of the stylesheet. */
const HOIST_AT = /^@(import|charset|namespace)\b/i

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

function parse(css: string): Node[] {
  const nodes: Node[] = []
  let buf = ''
  let depth = 0
  let bodyStart = -1
  let quote: string | null = null

  for (let i = 0; i < css.length; i++) {
    const c = css[i]

    if (quote) {
      buf += c
      if (c === '\\') buf += css[++i] ?? ''
      else if (c === quote) quote = null
      continue
    }

    if (c === '"' || c === "'") {
      quote = c
      buf += c
      continue
    }

    if (c === '{') {
      if (depth === 0) bodyStart = buf.length
      depth++
      buf += c
      continue
    }

    if (c === '}') {
      depth--
      buf += c
      if (depth <= 0) {
        if (bodyStart >= 0) {
          nodes.push({
            type: 'block',
            prelude: buf.slice(0, bodyStart).trim(),
            body: buf.slice(bodyStart + 1, buf.length - 1),
          })
        }
        buf = ''
        depth = 0
        bodyStart = -1
      }
      continue
    }

    if (c === ';' && depth === 0) {
      const text = buf.trim()
      if (text) nodes.push({ type: 'statement', text: `${text};` })
      buf = ''
      continue
    }

    buf += c
  }

  const tail = buf.trim()
  if (tail && depth === 0) nodes.push({ type: 'statement', text: tail })
  return nodes
}

/** Split a selector list on commas that are not inside (), [] or strings. */
function splitSelectors(selector: string): string[] {
  const parts: string[] = []
  let buf = ''
  let depth = 0
  let quote: string | null = null

  for (let i = 0; i < selector.length; i++) {
    const c = selector[i]

    if (quote) {
      buf += c
      if (c === '\\') buf += selector[++i] ?? ''
      else if (c === quote) quote = null
      continue
    }

    if (c === '"' || c === "'") {
      quote = c
      buf += c
      continue
    }
    if (c === '(' || c === '[') depth++
    if (c === ')' || c === ']') depth--

    if (c === ',' && depth === 0) {
      parts.push(buf)
      buf = ''
      continue
    }
    buf += c
  }
  parts.push(buf)
  return parts.map((p) => p.trim()).filter(Boolean)
}

/** `html`, `body` or `:root` at the start of a selector, on its own. */
const LEADING_ROOT = /^(?:html|body|:root)(?=$|[\s>+~])\s*[>+~]?\s*/i

function scopeSelector(selector: string, scope: string): string {
  const sel = selector.trim()
  if (!sel) return sel

  // `*` alone styles the container too, not only its descendants.
  if (sel === '*') return `${scope}, ${scope} *`

  // Drop leading document-level selectors: `html body .x` → `${scope} .x`.
  let rest = sel
  for (;;) {
    const next = rest.replace(LEADING_ROOT, '')
    if (next === rest) break
    rest = next
  }
  if (!rest) return scope
  if (rest === '*') return `${scope}, ${scope} *`

  return `${scope} ${rest}`
}

function scopeNodes(nodes: Node[], scope: string, hoisted: string[]): string {
  const out: string[] = []

  for (const node of nodes) {
    if (node.type === 'statement') {
      if (HOIST_AT.test(node.text)) hoisted.push(node.text)
      else out.push(node.text)
      continue
    }

    const { prelude, body } = node

    if (prelude.startsWith('@')) {
      if (VERBATIM_AT.test(prelude)) {
        out.push(`${prelude}{${body}}`)
      } else if (NESTED_AT.test(prelude)) {
        out.push(`${prelude}{${scopeNodes(parse(body), scope, hoisted)}}`)
      } else {
        out.push(`${prelude}{${body}}`)
      }
      continue
    }

    const selectors = splitSelectors(prelude)
      .map((s) => scopeSelector(s, scope))
      .join(', ')
    if (selectors) out.push(`${selectors}{${body}}`)
  }

  return out.join('\n')
}

export function scopeCss(css: string, scope: string): string {
  if (!css.trim()) return ''
  const hoisted: string[] = []
  const scoped = scopeNodes(parse(stripComments(css)), scope, hoisted)
  return hoisted.length ? `${hoisted.join('\n')}\n${scoped}` : scoped
}

/**
 * Prevent a `</style>` inside the CSS from closing the tag early. Nothing in
 * valid CSS needs that sequence.
 */
export function sanitizeStyleText(css: string): string {
  return css.replace(/<\/(style)/gi, '<\\/$1')
}
