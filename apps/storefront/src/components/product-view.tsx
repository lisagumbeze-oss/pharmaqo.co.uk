'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { TubGraphic, NutritionTable } from '@pharmaqo/ui'
import type { Product } from '@/lib/data'

interface ProductViewProps {
  product: Product
  related: Product[]
}

export default function ProductView({ product, related }: ProductViewProps) {
  const { addItem } = useCart()

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [purchaseMode, setPurchaseMode] = useState<'onetime' | 'subscribe'>('onetime')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'usage' | 'reviews'>('desc')
  const [batchCodeInput, setBatchCodeInput] = useState('PQ-2401')
  const [batchVerified, setBatchVerified] = useState(true)

  const sizes = [
    { label: '500 g', multiplier: 0.6, servings: '16 servings' },
    { label: '1 kg', multiplier: 1.0, servings: '33 servings' },
    { label: '2.5 kg', multiplier: 2.2, servings: '83 servings' },
  ]

  const basePricePence = Math.round(product.price * sizes[selectedSizeIndex].multiplier)
  const subscribePricePence = Math.round(basePricePence * 0.85) // 15% discount
  const finalPricePence = purchaseMode === 'subscribe' ? subscribePricePence : basePricePence

  const tubColors: Record<string, string> = {
    protein: '#2B3440',
    creatine: '#19C3A6',
    vitamins: '#5B6470',
    'pre-workout': '#0E1116',
    recovery: '#3A4452',
  }
  const currentTubColor = tubColors[product.categorySlug] || '#2B3440'

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      variant: `${sizes[selectedSizeIndex].label} · ${purchaseMode === 'subscribe' ? 'Subscribe & Save' : 'One-time'}`,
      price: finalPricePence,
      quantity,
      tubColor: currentTubColor,
    })
  }

  return (
    <div className="w-full bg-[#F6F5F1] flex flex-col">
      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 pt-6 pb-2 text-xs text-[#5B6470]">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        {' / '}
        <Link href={`/category/${product.categorySlug}`} className="hover:text-accent transition-colors">
          {product.category}
        </Link>
        {' / '}
        <span className="text-[#0E1116] font-medium">{product.name}</span>
      </div>

      {/* ── Main Product Section ──────────────────────── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-8 sm:py-12 flex flex-wrap gap-10 lg:gap-14 items-start">
        {/* Left: Gallery */}
        <div className="flex-1 min-w-[320px] lg:min-w-[500px] flex flex-col gap-4">
          <div className="relative bg-[#ECEAE4] rounded-2xl h-[420px] sm:h-[520px] flex items-center justify-center border border-[#E3E1DA]">
            <span className="absolute top-5 left-5 bg-[#0E1116] text-[#F6F5F1] text-xs font-semibold px-3 py-1.5 rounded-full z-10">
              Batch tested
            </span>
            <TubGraphic tubColor={currentTubColor} size="xl" className="h-[320px] sm:h-[400px]" />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`flex-1 h-20 sm:h-24 rounded-xl bg-[#ECEAE4] border flex items-center justify-center cursor-pointer transition-all ${
                  idx === 0 ? 'border-2 border-accent shadow-sm' : 'border-[#E3E1DA] hover:border-accent/50'
                }`}
              >
                <TubGraphic tubColor={currentTubColor} size="sm" className="h-14 sm:h-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Buy Box & Details */}
        <div className="flex-1 min-w-[320px] max-w-[520px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B6B5B]">
              {product.category}
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-6xl leading-[0.98] uppercase text-[#0E1116]">
              {product.name}
            </h1>
            <div className="flex items-center gap-2.5 text-xs text-[#5B6470] mt-1">
              <span className="text-[#0E1116] tracking-widest text-sm" aria-label="5 out of 5 stars">
                ★★★★★
              </span>
              <span>4.9 · 142 reviews</span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#3D4650]">
            {product.description}
          </p>

          {/* Regulatory Badges */}
          <div className="flex gap-2 flex-wrap">
            <span className="bg-[#E6F8F4] text-[#0B6B5B] text-xs font-bold px-3 py-1.5 rounded-full">
              Vegan
            </span>
            <span className="bg-[#E6F8F4] text-[#0B6B5B] text-xs font-bold px-3 py-1.5 rounded-full">
              Gluten free
            </span>
            <span className="bg-[#E6F8F4] text-[#0B6B5B] text-xs font-bold px-3 py-1.5 rounded-full">
              {product.tags.stimulant === 'stimulant-free' ? 'Stimulant free' : 'Contains Caffeine (21+)'}
            </span>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E1116]">Size</span>
            <div className="flex gap-2.5">
              {sizes.map((s, idx) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`flex-1 h-13 px-4 rounded-lg font-display text-sm font-bold uppercase transition-colors ${
                    selectedSizeIndex === idx
                      ? 'border-2 border-[#0E1116] bg-white text-[#0E1116] shadow-sm'
                      : 'border border-[#CFCDC5] bg-transparent text-[#5B6470] hover:border-accent'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* One-time vs Subscribe & Save */}
          <div className="bg-white border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-3.5 shadow-sm">
            <label
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setPurchaseMode('onetime')}
            >
              <input
                type="radio"
                name="purchase-mode"
                checked={purchaseMode === 'onetime'}
                onChange={() => setPurchaseMode('onetime')}
                className="h-4 w-4 text-accent accent-accent"
              />
              <span className="flex-1 text-sm font-medium text-[#0E1116]">One-time purchase</span>
              <span className="text-base font-bold text-[#0E1116]">
                £{(basePricePence / 100).toFixed(2)}
              </span>
            </label>

            <div className="border-t border-[#E3E1DA]" />

            <label
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setPurchaseMode('subscribe')}
            >
              <input
                type="radio"
                name="purchase-mode"
                checked={purchaseMode === 'subscribe'}
                onChange={() => setPurchaseMode('subscribe')}
                className="h-4 w-4 text-accent accent-accent"
              />
              <span className="flex-1 text-sm font-medium text-[#0E1116]">
                Subscribe and save 15%
                <span className="block text-xs text-[#5B6470]">every 30 days, cancel any time</span>
              </span>
              <span className="text-base font-bold text-accent">
                £{(subscribePricePence / 100).toFixed(2)}
              </span>
            </label>
          </div>

          {/* Stepper + Add to Basket Button */}
          <div className="flex gap-3">
            <div className="flex items-center border-[1.5px] border-[#0E1116] rounded-md h-14 bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-full flex items-center justify-center text-lg font-bold text-ink hover:bg-paper"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-sm text-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-full flex items-center justify-center text-lg font-bold text-ink hover:bg-paper"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-accent text-[#0E1116] font-display font-bold text-base uppercase tracking-wider rounded-md hover:bg-accent-hover transition-all duration-150 shadow-sm"
            >
              Add to basket · £{((finalPricePence * quantity) / 100).toFixed(2)}
            </button>
          </div>

          {/* Guarantees */}
          <div className="flex flex-col gap-2 text-xs text-[#3D4650] border-t border-[#E3E1DA] pt-4">
            <div>✓ Free UK delivery over £40 · Royal Mail and DPD tracked</div>
            <div>✓ EU delivery available · duties and VAT shown at checkout</div>
            <div>✓ 30-day returns on unopened products</div>
          </div>
        </div>
      </section>

      {/* ── Tabs & Nutrition Information Section ─────── */}
      <section className="bg-white border-y border-[#E3E1DA]">
        <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-14 sm:py-16 flex flex-wrap gap-12 lg:gap-16">
          {/* Left Tabs */}
          <div className="flex-1 min-w-[320px] lg:min-w-[500px] flex flex-col gap-6">
            <div className="flex gap-6 sm:gap-8 border-b border-[#E3E1DA] text-sm font-semibold flex-wrap">
              {(['desc', 'nutrition', 'usage', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3.5 transition-colors uppercase font-display tracking-wider ${
                    activeTab === tab
                      ? 'border-b-2 border-accent text-[#0E1116] font-bold'
                      : 'text-[#5B6470] hover:text-[#0E1116]'
                  }`}
                >
                  {tab === 'desc'
                    ? 'Description'
                    : tab === 'nutrition'
                    ? 'Nutrition'
                    : tab === 'usage'
                    ? 'How to use'
                    : 'Reviews (142)'}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'desc' && (
              <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed text-[#3D4650]">
                <p>
                  {product.description} Cross-flow microfiltered to preserve native protein fractions and maintain biological availability without denaturation.
                </p>
                <p>
                  <strong className="text-[#0E1116]">Suggested use:</strong> Take 1 serving daily, as stated on the label. Do not exceed the stated serving.
                </p>
                <p className="text-xs text-[#5B6470] italic">
                  Food supplements should not replace a varied, balanced diet and a healthy lifestyle. Keep out of reach of children.
                </p>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <NutritionTable
                servingSize={product.servingSize}
                nutrients={[
                  { name: 'Energy', perServing: '470 kJ / 112 kcal', per100g: '1567 kJ / 373 kcal' },
                  { name: 'Fat', perServing: '0.4 g', per100g: '1.3 g' },
                  { name: 'of which saturates', perServing: '0.2 g', per100g: '0.7 g', indent: true },
                  { name: 'Carbohydrate', perServing: '0.6 g', per100g: '2.0 g' },
                  { name: 'of which sugars', perServing: '0.4 g', per100g: '1.3 g', indent: true },
                  { name: 'Protein (dry basis)', perServing: '27.0 g', per100g: '90.0 g' },
                  { name: 'Salt', perServing: '0.15 g', per100g: '0.50 g' },
                ]}
                ingredients={product.ingredients.join(', ')}
                allergens={product.categorySlug === 'protein' ? ['Milk'] : []}
                warnings={['Do not exceed the recommended daily dose.', 'Keep out of reach of young children.']}
              />
            )}

            {activeTab === 'usage' && (
              <div className="text-sm leading-relaxed text-[#3D4650] space-y-3">
                <p>
                  Mix 1 scoop ({product.servingSize}) with 200–250 ml of cold water or your favourite beverage in a shaker.
                </p>
                <p>
                  Consume immediately after workout, or first thing in the morning on non-training days.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 text-sm text-[#3D4650]">
                <div className="border border-[#E3E1DA] rounded-xl p-4 bg-paper/40">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-ink">James M.</span>
                    <span className="text-xs text-[#5B6470]">Verified UK Purchase · 12 Oct 2026</span>
                  </div>
                  <div className="text-amber-500 text-xs mb-2">★★★★★</div>
                  <p className="text-xs leading-relaxed">
                    Mixes instantly with zero clumping. Love that the batch certificate is publicly viewable on the site.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Inline Batch Lookup Widget */}
          <div className="flex-1 min-w-[300px] max-w-[420px] flex flex-col gap-5">
            <div className="border-[1.5px] border-[#0E1116] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0E1116] text-[#F6F5F1] px-5 py-3 font-display font-bold text-lg uppercase tracking-wider">
                Nutrition Information
              </div>
              <div className="flex justify-between px-5 py-2.5 text-xs text-[#5B6470] border-b border-[#E3E1DA]">
                <span>Serving size: {product.servingSize}</span>
                <span>Per serving</span>
              </div>
              <div className="divide-y divide-[#E3E1DA] text-sm">
                <div className="flex justify-between px-5 py-2.5">
                  <span>Protein</span>
                  <span className="font-bold text-[#0E1116]">27 g</span>
                </div>
                <div className="flex justify-between px-5 py-2.5">
                  <span>Carbohydrate</span>
                  <span className="font-medium text-[#0E1116]">0.6 g</span>
                </div>
                <div className="flex justify-between px-5 py-2.5">
                  <span>Fat</span>
                  <span className="font-medium text-[#0E1116]">0.4 g</span>
                </div>
              </div>
              <div className="p-4 text-xs text-[#5B6470] bg-paper/50">
                Ingredients: {product.ingredients.slice(0, 3).join(', ')}...
              </div>
            </div>

            {/* Check this batch card */}
            <div className="bg-[#F6F5F1] border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-3">
              <span className="font-bold text-sm text-[#0E1116]">Check this batch</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={batchCodeInput}
                  onChange={(e) => setBatchCodeInput(e.target.value)}
                  placeholder="Batch code on tub"
                  className="flex-1 h-12 border border-[#0E1116] rounded-md px-3 text-xs bg-white uppercase focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setBatchVerified(true)}
                  className="h-12 px-5 bg-[#0E1116] text-[#F6F5F1] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-black transition-colors"
                >
                  Check
                </button>
              </div>
              {batchVerified && (
                <div className="text-xs text-[#0B6B5B] font-semibold mt-1">
                  ✓ Verified: ALS Life Sciences UK Report (Pass)
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Often Bought Together / Related Products ── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-14 sm:py-20 flex flex-col gap-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-[0.02em] text-[#0E1116]">
          Often bought together
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.slice(0, 4).map((rel) => (
            <article
              key={rel.id}
              className="bg-white border border-[#E3E1DA] rounded-xl p-4 flex flex-col gap-3.5 shadow-sm"
            >
              <Link
                href={`/product/${rel.id}`}
                className="bg-[#ECEAE4] rounded-lg h-48 flex items-center justify-center overflow-hidden group"
              >
                <TubGraphic
                  tubColor={tubColors[rel.categorySlug] || '#2B3440'}
                  size="md"
                  className="h-36 group-hover:scale-105 transition-transform"
                />
              </Link>
              <Link
                href={`/product/${rel.id}`}
                className="font-semibold text-sm text-[#0E1116] hover:text-accent transition-colors"
              >
                {rel.name}
              </Link>
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-[#F6F5F1]">
                <span className="text-base font-bold text-[#0E1116]">
                  £{(rel.price / 100).toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: rel.id,
                      name: rel.name,
                      price: rel.price,
                      tubColor: tubColors[rel.categorySlug],
                    })
                  }
                  className="inline-flex items-center justify-center h-10 px-4 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover transition-colors"
                >
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
