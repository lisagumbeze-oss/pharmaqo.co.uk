import React from 'react'
import { cn } from '../utils'

export interface PriceBlockProps {
  /** Price in pence */
  price: number
  /** Original price in pence (for strikethrough) */
  originalPrice?: number
  /** Per-serving cost in pence */
  perServingCost?: number
  /** Subscribe-and-save price in pence */
  subscribePricePence?: number
  /** Currency code */
  currency?: string
  /** Locale */
  locale?: string
  className?: string
}

function fmt(pence: number, currency = 'GBP', locale = 'en-GB') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(pence / 100)
}

export function PriceBlock({
  price,
  originalPrice,
  perServingCost,
  subscribePricePence,
  currency = 'GBP',
  locale = 'en-GB',
  className,
}: PriceBlockProps) {
  const isDiscounted = originalPrice && originalPrice > price

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Main price row */}
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'font-display text-2xl font-bold',
            isDiscounted ? 'text-error' : 'text-ink',
          )}
        >
          {fmt(price, currency, locale)}
        </span>
        {isDiscounted && (
          <span className="text-sm text-muted line-through">
            {fmt(originalPrice, currency, locale)}
          </span>
        )}
        <span className="text-xs text-muted">incl. VAT</span>
      </div>

      {/* Per-serving cost */}
      {perServingCost && (
        <p className="text-xs text-muted">
          {fmt(perServingCost, currency, locale)} per serving
        </p>
      )}

      {/* Subscribe & save */}
      {subscribePricePence && (
        <div className="mt-1 flex items-center gap-2 rounded-[var(--radius-sm)] border border-accent/30 bg-accent-light px-2.5 py-1.5">
          <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-accent">
            Subscribe & Save
          </span>
          <span className="text-xs font-semibold text-accent">
            {fmt(subscribePricePence, currency, locale)}
          </span>
        </div>
      )}
    </div>
  )
}
