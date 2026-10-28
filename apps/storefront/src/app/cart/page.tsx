'use client'

import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'
import { useCart } from '@/context/cart-context'
import { TubGraphic } from '@pharmaqo/ui'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, freeDeliveryThreshold } = useCart()

  const differencePence = freeDeliveryThreshold - subtotal
  const isFreeDelivery = differencePence <= 0
  const deliveryPence = isFreeDelivery ? 0 : 399
  const totalPence = subtotal + deliveryPence

  return (
    <div className="w-full bg-[#F6F5F1] py-10 sm:py-14 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5B6470] mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Basket</span>
        </nav>

        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116]">
          Your Basket ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="bg-white border border-[#E3E1DA] rounded-xl p-12 text-center mt-8 max-w-md mx-auto">
            <TubGraphic size="md" tubColor="#5B6470" className="mx-auto opacity-50" />
            <h2 className="font-display font-bold text-2xl uppercase mt-4 text-[#0E1116]">
              Your basket is empty
            </h2>
            <p className="text-xs text-[#5B6470] mt-1">
              Add some lab-tested supplements to get started.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex h-12 px-6 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover items-center"
            >
              Shop All Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-3 items-start">
            {/* Items Column */}
            <div className="lg:col-span-2 bg-white border border-[#E3E1DA] rounded-xl p-6 sm:p-8 shadow-sm">
              {/* Free delivery banner */}
              <div className="border border-[#E3E1DA] bg-paper rounded-lg p-4 mb-6">
                <p className="text-xs font-semibold text-[#0E1116]">
                  {isFreeDelivery ? (
                    <span className="text-[#0B6B5B]">✓ You qualify for Free UK Delivery!</span>
                  ) : (
                    <>You are £{(differencePence / 100).toFixed(2)} away from Free UK Delivery</>
                  )}
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-[#E3E1DA] overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E3E1DA]">
                {items.map((it) => (
                  <div key={`${it.id}-${it.variant}`} className="py-5 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-paper flex items-center justify-center shrink-0">
                        <TubGraphic tubColor={it.tubColor || '#2B3440'} size="sm" className="h-11" />
                      </div>
                      <div>
                        <Link
                          href={`/product/${it.id}`}
                          className="font-semibold text-base text-[#0E1116] hover:text-accent transition-colors block"
                        >
                          {it.name}
                        </Link>
                        {it.variant && <span className="text-xs text-[#5B6470]">{it.variant}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#0E1116] rounded-md h-10 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.id, it.quantity - 1)}
                          className="w-9 h-full flex items-center justify-center text-sm font-bold text-ink hover:bg-paper"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-ink">{it.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.id, it.quantity + 1)}
                          className="w-9 h-full flex items-center justify-center text-sm font-bold text-ink hover:bg-paper"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-base text-[#0E1116] min-w-[70px] text-right">
                        £{((it.price * it.quantity) / 100).toFixed(2)}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="text-xs text-[#5B6470] underline hover:text-error transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#E3E1DA] flex justify-between">
                <Link
                  href="/shop"
                  className="font-display font-semibold text-xs uppercase tracking-wider text-[#0E1116] underline hover:text-accent"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 shadow-sm sticky top-24 flex flex-col gap-4">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#0E1116]">
                Order Summary
              </h2>
              <div className="space-y-2 text-xs text-[#5B6470] border-b border-[#E3E1DA] pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-ink">£{(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-bold text-ink">
                    {deliveryPence === 0 ? 'Free' : `£${(deliveryPence / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (included)</span>
                  <span className="font-bold text-ink">
                    £{((subtotal * 0.2 / 1.2) / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="font-display font-bold text-base uppercase text-[#0E1116]">Total</span>
                <span className="font-display font-bold text-2xl text-[#0E1116]">
                  £{(totalPence / 100).toFixed(2)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full h-13 bg-accent text-[#0E1116] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-accent-hover flex items-center justify-center transition-colors shadow-md mt-2"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
