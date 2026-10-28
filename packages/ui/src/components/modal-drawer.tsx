'use client'

import React, { useEffect, useRef, useId, useCallback } from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Modal                                                 */
/* ────────────────────────────────────────────────────── */

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  /** Width variant */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === dialogRef.current) onClose()
    },
    [onClose],
  )

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-0 flex h-full w-full items-center justify-center bg-transparent p-4 backdrop:bg-ink/50"
    >
      <div
        className={cn(
          'w-full rounded-[var(--radius-md)] border border-border bg-surface p-6 shadow-md animate-in fade-in',
          sizeMap[size],
          className,
        )}
        role="document"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-lg font-bold uppercase tracking-wider text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-full)] text-muted transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Cart Drawer (slide-out)                               */
/* ────────────────────────────────────────────────────── */

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  servingSize?: string
}

export interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartItem[]
  /** Free delivery threshold in pence */
  freeDeliveryThreshold?: number
  currency?: string
  className?: string
}

function fmt(pence: number, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(pence / 100)
}

export function CartDrawer({
  open,
  onClose,
  items,
  freeDeliveryThreshold = 4000,
  currency = 'GBP',
  className,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    // Trap focus: prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100)
  const remaining = Math.max(0, freeDeliveryThreshold - subtotal)

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface transition-transform duration-[250ms]',
          open ? 'translate-x-0' : 'translate-x-full',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider text-ink">
            Cart ({items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] text-muted hover:bg-error/10 hover:text-error focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free delivery progress */}
        <div className="border-b border-border px-6 py-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              {remaining > 0
                ? `${fmt(remaining, currency)} away from free delivery`
                : '🎉 Free delivery unlocked!'}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-[var(--radius-full)] bg-border">
            <div
              className="h-full rounded-[var(--radius-full)] bg-accent transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="h-14 w-14 shrink-0 rounded-[var(--radius-sm)] border border-border bg-paper" />
                  <div className="flex-1">
                    <p className="font-display text-sm font-bold uppercase tracking-tight text-ink">
                      {item.name}
                    </p>
                    {item.servingSize && (
                      <p className="text-[10px] text-muted">{item.servingSize}</p>
                    )}
                    <p className="mt-1 text-xs text-muted">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-display text-sm font-bold text-ink">
                    {fmt(item.price * item.quantity, currency)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Subtotal
            </span>
            <span className="font-display text-lg font-bold text-ink">
              {fmt(subtotal, currency)}
            </span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-accent px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Checkout
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}
