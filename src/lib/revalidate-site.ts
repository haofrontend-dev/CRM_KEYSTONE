import { revalidatePath } from 'next/cache'

/**
 * Invalidates every frontend route that uses the shared root layout.
 *
 * Pages are currently rendered dynamically, but keeping this hook means a
 * future switch to ISR/static rendering cannot silently serve stale CMS data.
 */
export function revalidateSite() {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // A seed/CLI invocation has no Next request cache to invalidate.
  }
}
