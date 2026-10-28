'use client'

import React, { useState, useCallback } from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Filter Panel                                          */
/* ────────────────────────────────────────────────────── */

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
  type: 'checkbox' | 'radio'
}

export interface FilterPanelProps {
  groups: FilterGroup[]
  activeFilters: Record<string, string[]>
  onFilterChange: (groupId: string, values: string[]) => void
  onClearAll?: () => void
  className?: string
}

export function FilterPanel({
  groups,
  activeFilters,
  onFilterChange,
  onClearAll,
  className,
}: FilterPanelProps) {
  const totalActive = Object.values(activeFilters).flat().length

  const toggleValue = (groupId: string, value: string, type: 'checkbox' | 'radio') => {
    const current = activeFilters[groupId] || []
    if (type === 'radio') {
      onFilterChange(groupId, current.includes(value) ? [] : [value])
    } else {
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      onFilterChange(groupId, next)
    }
  }

  return (
    <div className={cn('divide-y divide-border', className)}>
      {/* Active filter chips */}
      {totalActive > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-4">
          {Object.entries(activeFilters).map(([groupId, values]) =>
            values.map((value) => {
              const group = groups.find((g) => g.id === groupId)
              const option = group?.options.find((o) => o.value === value)
              return (
                <button
                  key={`${groupId}-${value}`}
                  type="button"
                  onClick={() => toggleValue(groupId, value, group?.type || 'checkbox')}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-full)] border border-accent bg-accent-light px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label={`Remove filter: ${option?.label || value}`}
                >
                  {option?.label || value}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )
            }),
          )}
          <button
            type="button"
            onClick={onClearAll}
            className="font-display text-[10px] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-error focus-visible:outline-2 focus-visible:outline-accent"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter groups */}
      {groups.map((group) => {
        const active = activeFilters[group.id] || []
        return (
          <details key={group.id} className="group py-4" open>
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-ink">
              <span>{group.label}</span>
              {active.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-[var(--radius-full)] bg-accent text-[10px] font-bold text-ink">
                  {active.length}
                </span>
              )}
            </summary>
            <div className="mt-2 flex flex-col gap-1">
              {group.options.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-1 py-1.5 text-sm transition-colors hover:bg-accent-light"
                >
                  <input
                    type={group.type}
                    name={group.id}
                    value={option.value}
                    checked={active.includes(option.value)}
                    onChange={() => toggleValue(group.id, option.value, group.type)}
                    className="h-4 w-4 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-accent"
                  />
                  <span className="flex-1 text-ink">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted">({option.count})</span>
                  )}
                </label>
              ))}
            </div>
          </details>
        )
      })}
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Product Card (Design System Version)                  */
/* ────────────────────────────────────────────────────── */

export interface ProductCardProps {
  name: string
  descriptor?: string
  price: number
  originalPrice?: number
  rating?: number
  reviewCount?: number
  batchTested?: boolean
  badges?: string[]
  imageSrc?: string
  href?: string
  currency?: string
  onQuickAdd?: () => void
  className?: string
}

function fmtPrice(pence: number, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(pence / 100)
}

export function ProductCard({
  name,
  descriptor,
  price,
  originalPrice,
  rating,
  reviewCount,
  batchTested,
  badges = [],
  imageSrc,
  href,
  currency = 'GBP',
  onQuickAdd,
  className,
}: ProductCardProps) {
  const isDiscounted = originalPrice && originalPrice > price
  const Wrapper = href ? 'a' : 'div'

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface transition-all duration-250 hover:border-accent hover:shadow-md hover:-translate-y-0.5',
        className,
      )}
    >
      {/* Image area */}
      <Wrapper {...(href ? { href } : {})} className="relative block aspect-square overflow-hidden bg-paper">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-border">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Badges */}
        {(batchTested || badges.length > 0) && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {batchTested && (
              <span className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-ink/20 bg-ink/5 px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wider text-ink">
                Batch Tested
              </span>
            )}
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-[var(--radius-sm)] border border-accent bg-accent-light px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wider text-accent"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Quick add */}
        {onQuickAdd && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onQuickAdd()
            }}
            aria-label={`Quick add ${name} to cart`}
            className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] bg-accent text-ink opacity-0 shadow-sm transition-all duration-200 hover:bg-accent-hover group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}
      </Wrapper>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(rating) ? '#D98A00' : 'none'}
                  stroke="#D98A00"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-[10px] text-muted">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="font-display text-sm font-bold uppercase tracking-tight text-ink line-clamp-2">
          {href ? <a href={href} className="hover:text-accent">{name}</a> : name}
        </h3>

        {/* Descriptor */}
        {descriptor && (
          <p className="text-xs text-muted line-clamp-1">{descriptor}</p>
        )}

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className={cn('font-display text-base font-bold', isDiscounted ? 'text-error' : 'text-ink')}>
            {fmtPrice(price, currency)}
          </span>
          {isDiscounted && (
            <span className="text-xs text-muted line-through">{fmtPrice(originalPrice, currency)}</span>
          )}
        </div>
      </div>
    </article>
  )
}
