export type Media = {
  id?: number | string
  url?: string | null
  alt?: string | null
  filename?: string | null
  /** Payload changes this whenever an uploaded file is replaced or edited. */
  updatedAt?: string | null
}

export type MediaRel = number | string | Media | null | undefined

export function resolveMediaUrl(m: MediaRel): string | null {
  if (!m || typeof m === 'number' || typeof m === 'string') return null
  if (!m.url) return null

  // Payload keeps the file URL stable when a file is replaced with another
  // file using the same name. Add its revision to make that replacement a new
  // URL for the browser, CDN and Next's image optimizer.
  if (!m.updatedAt) return m.url

  const separator = m.url.includes('?') ? '&' : '?'
  return `${m.url}${separator}v=${encodeURIComponent(m.updatedAt)}`
}

export type IconName =
  | 'spark' | 'shield' | 'chart' | 'users' | 'compass' | 'flag'
  | 'brain' | 'layers' | 'cpu' | 'star'
