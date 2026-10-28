'use client'

import React from 'react'
import { useCart } from '@/context/cart-context'
import Link from 'next/link'
import { TubGraphic } from '@pharmaqo/ui'

export default function CartDrawerShell() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    freeDeliveryThreshold,
    addItem,
  } = useCart()

  if (!isOpen) return null

  const differencePence = freeDeliveryThreshold - subtotal
  const isFreeDelivery = differencePence <= 0
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100))

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl transition-transform"
        role="dialog"
        aria-label="Your basket"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-ink">
            Your Basket ({itemCount})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Close basket"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Free delivery threshold progress bar */}
        <div className="border-b border-border bg-paper px-6 py-3.5">
          <p className="text-xs font-medium text-ink">
            {isFreeDelivery ? (
              <span className="font-semibold text-accent">🎉 You have unlocked Free UK Delivery!</span>
            ) : (
              <>You are £{(differencePence / 100).toFixed(2)} away from free UK delivery</>
            )}
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 divide-y divide-border">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <TubGraphic size="md" tubColor="#5B6470" className="opacity-40" />
              <p className="mt-4 font-display text-lg font-bold uppercase text-ink">Your basket is empty</p>
              <p className="mt-1 text-xs text-ink-muted">Explore our lab-tested supplements</p>
              <button
                onClick={closeCart}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 font-display text-xs font-bold uppercase tracking-wider text-ink hover:bg-accent-hover"
              >
                Shop all products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-4 py-4">
                <div className="flex h-20 w-20 flex-none items-center justify-center rounded-lg bg-paper">
                  <TubGraphic size="sm" tubColor={item.tubColor || '#2B3440'} className="h-14" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-semibold text-ink leading-tight">{item.name}</span>
                    <span className="text-sm font-bold text-ink">
                      £{((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                  {item.variant && <p className="text-xs text-ink-muted">{item.variant}</p>}
                  <div className="mt-2 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="inline-flex h-9 items-center border border-ink rounded-md">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-full w-8 items-center justify-center text-ink hover:bg-paper"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-ink">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-full w-8 items-center justify-center text-ink hover:bg-paper"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-ink-muted underline transition-colors hover:text-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Cross sell recommendation */}
          <div className="py-5">
            <p className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Add to your order</p>
            <div className="flex items-center gap-3 rounded-xl border border-border p-3 bg-paper/50">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-paper">
                <TubGraphic size="sm" tubColor="#5B6470" className="h-10" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-ink">Daily Multivitamin</p>
                <p className="text-xs text-ink-muted">£18.99 · 60 servings</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: 'prod_vitamins_01',
                    name: 'Daily Multivitamin Elite',
                    variant: '60 tablets · Vegan',
                    price: 1899,
                    tubColor: '#5B6470',
                  })
                }
                className="flex h-9 items-center justify-center rounded-md border-[1.5px] border-ink bg-transparent px-3 text-xs font-bold text-ink hover:bg-ink hover:text-paper"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-surface p-6 shadow-[0_-8px_24px_rgba(14,17,22,0.06)]">
          <div className="flex justify-between text-base font-bold text-ink">
            <span>Subtotal</span>
            <span>£{(subtotal / 100).toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            Delivery, VAT, and EU duties calculated at checkout.
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex h-13 w-full items-center justify-center rounded-md bg-accent font-display text-sm font-bold uppercase tracking-wider text-ink transition-all hover:bg-accent-hover hover:shadow-md"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="flex h-10 w-full items-center justify-center font-display text-xs font-semibold uppercase tracking-wider text-ink-muted underline hover:text-ink"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
