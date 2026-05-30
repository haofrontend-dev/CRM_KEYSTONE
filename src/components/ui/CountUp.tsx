'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(value.replace(/\d/g, '0'))

  const match = value.match(/[\d,]+/)
  const numStr = match?.[0] ?? ''
  const target = parseInt(numStr.replace(/,/g, ''), 10) || 0
  const prefix = match ? value.slice(0, match.index!) : ''
  const suffix = match ? value.slice(match.index! + numStr.length) : ''

  useEffect(() => {
    if (!inView || !target) return
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(target * eased)
      setDisplay(prefix + current.toLocaleString('en-US') + suffix)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, prefix, suffix])

  return <span ref={ref}>{display}</span>
}
