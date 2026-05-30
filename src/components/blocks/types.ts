export type Media = {
  id?: number | string
  url?: string | null
  alt?: string | null
  filename?: string | null
}

export type MediaRel = number | string | Media | null | undefined

export function resolveMediaUrl(m: MediaRel): string | null {
  if (!m || typeof m === 'number' || typeof m === 'string') return null
  return m.url ?? null
}

export type IconName =
  | 'spark' | 'shield' | 'chart' | 'users' | 'compass' | 'flag'
  | 'brain' | 'layers' | 'cpu' | 'star'
