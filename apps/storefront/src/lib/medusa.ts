/**
 * Medusa.js client helpers
 * In production this would use @medusajs/js-sdk;
 * for now we export typed fetch wrappers.
 */

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''

interface RequestOptions {
  method?: string
  body?: unknown
  tags?: string[]
  revalidate?: number
}

export async function medusaFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, tags, revalidate } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  if (PUBLISHABLE_KEY) {
    headers['x-publishable-api-key'] = PUBLISHABLE_KEY
  }

  const res = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    next: {
      tags,
      revalidate: revalidate ?? 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Medusa API error: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}
