import Image from 'next/image'
import { resolveMediaUrl, type MediaRel } from './types'

export type ImageBlockData = {
  image: MediaRel
  caption?: string | null
  fullBleed?: boolean | null
}

export function ImageBlock(p: ImageBlockData) {
  const url = resolveMediaUrl(p.image)
  if (!url) return null
  const full = p.fullBleed !== false

  return (
    <section className="bg-white py-10">
      <div className={full ? '' : 'mx-auto max-w-7xl px-6'}>
        <div className={`relative w-full overflow-hidden ${full ? '' : 'rounded-[24px]'}`}>
          <Image
            src={url}
            alt={p.caption ?? ''}
            width={2400}
            height={1200}
            className="w-full h-auto object-cover"
          />
        </div>
        {p.caption && (
          <p className="mt-3 text-center text-sm text-navy-900/60">{p.caption}</p>
        )}
      </div>
    </section>
  )
}
