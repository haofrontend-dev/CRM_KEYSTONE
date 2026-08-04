'use client'

import { useEffect, useRef } from 'react'

/**
 * Runs the inline JS that came with a Raw HTML block. It executes after the
 * markup is in the DOM and re-runs on client-side navigation, which a plain
 * `<script>` tag injected through `dangerouslySetInnerHTML` would not do.
 */
export function RawHtmlScript({ code, rootId }: { code: string; rootId: string }) {
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return // React Strict Mode runs effects twice in dev.
    ran.current = true

    const root = document.getElementById(rootId)
    if (!root) return

    try {
      // `root` and `block` both point at the block container so pasted code can
      // scope its queries: root.querySelector('.foo')
      new Function('root', 'block', code)(root, root)
    } catch (err) {
      console.error(`[RawHtmlBlock:${rootId}] script error:`, err)
    }
  }, [code, rootId])

  return null
}
