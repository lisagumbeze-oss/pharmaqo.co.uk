'use client'

import React, { useState, useCallback } from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Toast                                                 */
/* ────────────────────────────────────────────────────── */

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  message: string
  variant?: ToastVariant
  visible: boolean
  onDismiss?: () => void
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-success bg-success/10 text-success',
  error: 'border-error bg-error/10 text-error',
  warning: 'border-warning bg-warning/10 text-warning',
  info: 'border-accent bg-accent-light text-accent',
}

export function Toast({ message, variant = 'info', visible, onDismiss }: ToastProps) {
  if (!visible) return null

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 shadow-md transition-all duration-250',
        variantStyles[variant],
      )}
    >
      <span className="text-sm font-medium">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-full)] hover:opacity-70 focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Breadcrumb                                            */
/* ────────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-xs text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </a>
              ) : (
                <span className={isLast ? 'text-ink' : ''}>{item.label}</span>
              )}
              {!isLast && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** @deprecated Prefer `Breadcrumb` */
export const Breadcrumbs = Breadcrumb
export type BreadcrumbsProps = BreadcrumbProps

/* ────────────────────────────────────────────────────── */
/*  Pagination                                            */
/* ────────────────────────────────────────────────────── */

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages: (number | 'ellipsis')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-muted transition-colors hover:bg-accent-light hover:text-accent disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`e-${i}`} className="flex h-10 w-10 items-center justify-center text-xs text-muted">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] font-display text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent',
              page === currentPage
                ? 'bg-accent text-ink'
                : 'text-muted hover:bg-accent-light hover:text-accent',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-muted transition-colors hover:bg-accent-light hover:text-accent disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-accent"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Review Stars                                          */
/* ────────────────────────────────────────────────────── */

export interface ReviewStarsProps {
  rating: number
  maxRating?: number
  count?: number
  size?: number
  className?: string
}

export function ReviewStars({ rating, maxRating = 5, count, size = 16, className }: ReviewStarsProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-label={`${rating} out of ${maxRating} stars`}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, rating - i))
          return (
            <svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={fill >= 1 ? '#D98A00' : fill > 0 ? 'url(#half)' : 'none'}
              stroke="#D98A00"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {fill > 0 && fill < 1 && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#D98A00" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Cookie Banner                                         */
/* ────────────────────────────────────────────────────── */

export interface CookieBannerProps {
  visible: boolean
  onAccept: () => void
  onReject: () => void
  onManage?: () => void
}

export function CookieBanner({ visible, onAccept, onReject, onManage }: CookieBannerProps) {
  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface p-4 shadow-md sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted">
          We use cookies to improve your experience. By continuing to browse, you agree to our use of
          cookies.{' '}
          {onManage && (
            <button
              type="button"
              onClick={onManage}
              className="text-accent underline underline-offset-2 hover:text-accent-hover"
            >
              Manage preferences
            </button>
          )}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onReject}
            className="min-h-[44px] rounded-[var(--radius-sm)] border border-border px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="min-h-[44px] rounded-[var(--radius-sm)] bg-accent px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-accent"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Age Confirm Dialog (21+)                              */
/* ────────────────────────────────────────────────────── */

export interface AgeConfirmProps {
  open: boolean
  onConfirm: () => void
  onReject: () => void
  productName?: string
}

export type AgeConfirmDialogProps = AgeConfirmProps

export function AgeConfirmDialog({ open, onConfirm, onReject, productName }: AgeConfirmProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" role="dialog" aria-modal="true" aria-label="Age verification">
      <div className="w-full max-w-sm rounded-[var(--radius-md)] border border-border bg-surface p-6 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius-full)] border-2 border-warning bg-warning/10">
          <span className="font-display text-lg font-bold text-warning">21+</span>
        </div>
        <h2 className="font-display text-lg font-bold uppercase tracking-wider text-ink">
          Age Verification
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {productName
            ? `${productName} contains stimulants. `
            : 'This product contains stimulants. '}
          You must be 21 or older to purchase.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onReject}
            className="min-h-[44px] flex-1 rounded-[var(--radius-sm)] border border-border px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider text-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          >
            Under 21
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-[44px] flex-1 rounded-[var(--radius-sm)] bg-accent px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-accent"
          >
            I'm 21+
          </button>
        </div>
      </div>
    </div>
  )
}
