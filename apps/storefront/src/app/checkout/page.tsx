'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'
import { useCart } from '@/context/cart-context'
import { TubGraphic } from '@pharmaqo/ui'

export default function CheckoutPage() {
  const { items, subtotal } = useCart()

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard')
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Delivery logic
  const isFreeStandard = subtotal >= 4000
  const deliveryCostPence = deliveryMethod === 'standard' ? (isFreeStandard ? 0 : 399) : 599
  const vatPence = Math.round((subtotal * 0.2) / 1.2)
  const totalPence = subtotal + deliveryCostPence

  if (orderPlaced) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#E6F8F4] text-[#0B6B5B] flex items-center justify-center text-3xl font-bold">
          ✓
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase text-[#0E1116]">
          Thank you for your order!
        </h1>
        <p className="text-base text-[#5B6470] max-w-md">
          Order reference: <strong className="text-ink font-mono">PQ-ORD-74921</strong>. We have sent a confirmation email to your address with Royal Mail tracking information.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 px-8 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover items-center"
        >
          Return to Storefront
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F6F5F1] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5B6470] mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-accent transition-colors">Basket</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Checkout</span>
        </nav>

        <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116]">
          Checkout
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-3 items-start">
          {/* Main Checkout Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setOrderPlaced(true)
            }}
            className="space-y-8 lg:col-span-2"
          >
            {/* Express Checkout / Guest Choice */}
            <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 sm:p-7 shadow-sm">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#0E1116] mb-4">
                1. Contact & Customer Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="c-email" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Email address for tracking updates
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-4 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="c-fname" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    First Name
                  </label>
                  <input
                    id="c-fname"
                    type="text"
                    required
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-4 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="c-lname" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Last Name
                  </label>
                  <input
                    id="c-lname"
                    type="text"
                    required
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-4 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 sm:p-7 shadow-sm">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#0E1116] mb-4">
                2. Delivery Address
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="c-addr" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Address Line 1
                  </label>
                  <input
                    id="c-addr"
                    type="text"
                    required
                    placeholder="House number and street"
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-4 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="c-city" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Town / City
                  </label>
                  <input
                    id="c-city"
                    type="text"
                    required
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-4 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="c-postcode" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Postcode
                  </label>
                  <input
                    id="c-postcode"
                    type="text"
                    required
                    placeholder="e.g. SW1A 1AA"
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-4 text-sm bg-white uppercase focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-country" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Country
                  </label>
                  <select
                    id="c-country"
                    defaultValue="GB"
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-3 text-sm bg-white focus:outline-none focus:border-accent"
                  >
                    <option value="GB">United Kingdom (Royal Mail / DPD)</option>
                    <option value="IE">Ireland (DPD Europe)</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="NL">Netherlands</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 sm:p-7 shadow-sm">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#0E1116] mb-4">
                3. Delivery Method
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                    deliveryMethod === 'standard' ? 'border-[#0E1116] bg-paper/60' : 'border-[#CFCDC5]'
                  }`}
                  onClick={() => setDeliveryMethod('standard')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery-method"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="accent-accent"
                    />
                    <div>
                      <span className="font-bold text-sm text-[#0E1116] block">
                        Royal Mail Tracked 48
                      </span>
                      <span className="text-xs text-[#5B6470]">2–3 business days</span>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-[#0E1116]">
                    {isFreeStandard ? 'Free' : '£3.99'}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                    deliveryMethod === 'express' ? 'border-[#0E1116] bg-paper/60' : 'border-[#CFCDC5]'
                  }`}
                  onClick={() => setDeliveryMethod('express')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery-method"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="accent-accent"
                    />
                    <div>
                      <span className="font-bold text-sm text-[#0E1116] block">
                        DPD Next Day Priority
                      </span>
                      <span className="text-xs text-[#5B6470]">Next working day dispatch</span>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-[#0E1116]">£5.99</span>
                </label>
              </div>
            </div>

            {/* Payment Method Shell */}
            <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 sm:p-7 shadow-sm">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#0E1116] mb-3">
                4. Payment
              </h2>
              <p className="text-xs text-[#5B6470] mb-4">
                Encrypted and processed securely via Medusa.js backend + Stripe.
              </p>
              <div className="border border-[#CFCDC5] rounded-md p-4 bg-paper/30 space-y-3">
                <div>
                  <label htmlFor="c-card" className="block text-xs font-semibold text-[#0E1116] mb-1">
                    Card Number
                  </label>
                  <input
                    id="c-card"
                    type="text"
                    required
                    placeholder="4242 •••• •••• 4242"
                    className="w-full h-11 border border-[#CFCDC5] rounded-md px-3 text-sm bg-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="c-exp" className="block text-xs font-semibold text-[#0E1116] mb-1">
                      Expiry
                    </label>
                    <input
                      id="c-exp"
                      type="text"
                      required
                      placeholder="MM / YY"
                      className="w-full h-11 border border-[#CFCDC5] rounded-md px-3 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-cvc" className="block text-xs font-semibold text-[#0E1116] mb-1">
                      CVC
                    </label>
                    <input
                      id="c-cvc"
                      type="text"
                      required
                      placeholder="123"
                      className="w-full h-11 border border-[#CFCDC5] rounded-md px-3 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-accent text-[#0E1116] font-display font-bold text-base uppercase tracking-wider rounded-md hover:bg-accent-hover transition-all shadow-md"
            >
              Place order · £{(totalPence / 100).toFixed(2)}
            </button>
          </form>

          {/* Right: Order Summary Sidebar */}
          <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 shadow-sm sticky top-24 flex flex-col gap-5">
            <h2 className="font-display font-bold text-lg uppercase tracking-wider text-[#0E1116]">
              Order Summary ({items.length} items)
            </h2>

            {/* Line items mini list */}
            <div className="divide-y divide-[#E3E1DA] max-h-64 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="py-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-paper flex items-center justify-center shrink-0">
                    <TubGraphic tubColor={it.tubColor || '#2B3440'} size="sm" className="h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{it.name}</p>
                    <p className="text-[11px] text-[#5B6470]">Qty: {it.quantity} · {it.variant}</p>
                  </div>
                  <span className="text-xs font-bold text-ink">
                    £{((it.price * it.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E3E1DA] pt-4 space-y-2.5 text-xs text-[#5B6470]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-ink">£{(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({deliveryMethod === 'standard' ? 'Royal Mail 48' : 'DPD Next Day'})</span>
                <span className="font-bold text-ink">
                  {deliveryCostPence === 0 ? 'Free' : `£${(deliveryCostPence / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20% included)</span>
                <span className="font-bold text-ink">£{(vatPence / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#0E1116] pt-4 flex justify-between items-baseline">
              <span className="font-display font-bold text-base uppercase text-[#0E1116]">Total</span>
              <span className="font-display font-bold text-2xl text-[#0E1116]">
                £{(totalPence / 100).toFixed(2)}
              </span>
            </div>

            <div className="text-[11px] leading-relaxed text-[#5B6470] border-t border-[#E3E1DA] pt-3">
              Complies with UK Food Supplements Regulations. 30-day money back guarantee on unopened products.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
