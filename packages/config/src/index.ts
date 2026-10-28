export { brand, type Brand } from './brand.config'

/** Format price in GBP (or the brand currency) */
export function formatPrice(amountInPence: number, currency = 'GBP', locale = 'en-GB'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amountInPence / 100)
}
