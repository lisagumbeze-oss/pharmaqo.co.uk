'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'
import { products, categories } from '@/lib/data'
import { useCart } from '@/context/cart-context'
import { TubGraphic } from '@pharmaqo/ui'

export default function HomePage() {
  const { addItem } = useCart()

  // Calculator teaser state
  const [calcAge, setCalcAge] = useState<number>(28)
  const [calcWeight, setCalcWeight] = useState<number>(80)
  const [calcGoal, setCalcGoal] = useState<'build' | 'cut' | 'maintain'>('build')

  // Quick Mifflin-St Jeor estimate for teaser
  const bmr = 10 * calcWeight + 6.25 * 178 - 5 * calcAge + 5 // male avg height 178
  const tdee = Math.round(bmr * 1.55) // moderate activity factor
  const goalMultiplier = calcGoal === 'build' ? 1.1 : calcGoal === 'cut' ? 0.85 : 1.0
  const calories = Math.round(tdee * goalMultiplier)
  const proteinGrams = Math.round(calcWeight * (calcGoal === 'build' ? 2.0 : calcGoal === 'cut' ? 2.2 : 1.8))
  const fatGrams = Math.round((calories * 0.25) / 9)
  const carbGrams = Math.round((calories - (proteinGrams * 4 + fatGrams * 9)) / 4)

  // Batch code check state
  const [batchCodeInput, setBatchCodeInput] = useState('PQ-2401')
  const [activeBatch, setActiveBatch] = useState({
    code: 'PQ-2401',
    product: 'Whey Isolate 90 · Vanilla',
    testDate: '14 Oct 2026',
    lab: 'ALS Life Sciences UK (ISO 17025)',
    status: 'Passed',
    testedFor: 'Heavy metals, microbiological purity, label claim accuracy',
  })

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // 4 Featured Best Sellers
  const bestSellers = [
    {
      id: 'prod_protein_01',
      name: 'Whey Isolate 90',
      note: '27 g protein per serving · Vanilla',
      price: 3499,
      perServing: '£1.16 per serving',
      tubColor: '#2B3440',
      categorySlug: 'protein',
    },
    {
      id: 'prod_creatine_01',
      name: 'Creatine Monohydrate Pure',
      note: '5 g per serving · Creapure®',
      price: 1499,
      perServing: '£0.15 per serving',
      tubColor: '#19C3A6',
      categorySlug: 'creatine',
    },
    {
      id: 'prod_vitamins_01',
      name: 'Daily Multivitamin Elite',
      note: '60 servings · 24 micronutrients',
      price: 1899,
      perServing: '£0.31 per serving',
      tubColor: '#5B6470',
      categorySlug: 'vitamins',
    },
    {
      id: 'prod_recovery_01',
      name: 'Hydro-Electrolyte Recovery',
      note: '30 servings · Lemon Lime',
      price: 2199,
      perServing: '£0.73 per serving',
      tubColor: '#3A4452',
      categorySlug: 'recovery',
    },
  ]

  const categoryTubs: Record<string, string> = {
    protein: '#2B3440',
    creatine: '#19C3A6',
    vitamins: '#5B6470',
    'pre-workout': '#0E1116',
    recovery: '#3A4452',
  }

  const handleBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveBatch({
      code: batchCodeInput.toUpperCase(),
      product: 'Verified Production Tub',
      testDate: '18 Oct 2026',
      lab: 'ALS Life Sciences UK (ISO 17025)',
      status: 'Passed',
      testedFor: 'Heavy metals, microbiological purity, label claim accuracy',
    })
  }

  return (
    <div className="w-full bg-[#F6F5F1] flex flex-col">
      {/* ── 1. Hero Section ────────────────────────────── */}
      <section className="bg-[#0E1116] text-[#F6F5F1]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-16 lg:py-24 flex flex-wrap gap-12 items-center">
          <div className="flex-1 min-w-[320px] lg:min-w-[500px] flex flex-col gap-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-accent">
              Sports nutrition · Made in the UK
            </span>
            <h1 className="font-display font-bold text-6xl sm:text-8xl lg:text-[100px] leading-[0.92] tracking-[0.01em] uppercase text-white">
              Know exactly<br />what you take.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#C9CDD2] max-w-[520px]">
              Protein, creatine, vitamins and recovery formulas. Every batch tested, every result public, every serving worked out for your goal.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-14 px-8 bg-accent text-[#0E1116] font-semibold text-base rounded-md hover:bg-accent-hover transition-all duration-150"
              >
                Shop all products
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center h-14 px-8 border-[1.5px] border-[#F6F5F1] text-[#F6F5F1] font-semibold text-base rounded-md hover:bg-white/10 transition-all duration-150"
              >
                Build my plan
              </Link>
            </div>
          </div>

          {/* Hero Tub Graphic Trio illustration */}
          <div className="flex-1 min-w-[300px] flex justify-center">
            <div className="w-full max-w-[520px] aspect-square rounded-3xl bg-[#1A2029] flex items-end justify-center gap-3 sm:gap-4 p-8 sm:p-10 border border-[#2B3440]">
              <TubGraphic tubColor="#2B3440" size="lg" className="w-[30%] h-auto mb-2" />
              <TubGraphic tubColor="#19C3A6" size="xl" className="w-[40%] h-auto -mb-1 drop-shadow-xl" />
              <TubGraphic tubColor="#3A4452" size="lg" className="w-[30%] h-auto mb-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trust Bar ──────────────────────────────── */}
      <section className="bg-white border-b border-[#E3E1DA]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-7 flex flex-wrap gap-6 sm:gap-12 justify-between">
          <div className="flex items-center gap-3.5 min-w-[220px] flex-1">
            <span className="w-11 h-11 rounded-full bg-[#E6F8F4] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1116" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4 4 10-10" />
              </svg>
            </span>
            <div>
              <div className="font-semibold text-[15px] text-[#0E1116]">Batch tested</div>
              <div className="text-xs text-[#5B6470]">Public lab report for every batch</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 min-w-[220px] flex-1">
            <span className="w-11 h-11 rounded-full bg-[#E6F8F4] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1116" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4 4 10-10" />
              </svg>
            </span>
            <div>
              <div className="font-semibold text-[15px] text-[#0E1116]">Free UK delivery</div>
              <div className="text-xs text-[#5B6470]">On all orders over £40</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 min-w-[220px] flex-1">
            <span className="w-11 h-11 rounded-full bg-[#E6F8F4] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1116" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4 4 10-10" />
              </svg>
            </span>
            <div>
              <div className="font-semibold text-[15px] text-[#0E1116]">Secure payment</div>
              <div className="text-xs text-[#5B6470]">Cards, Apple Pay, Google Pay, SEPA</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 min-w-[220px] flex-1">
            <span className="w-11 h-11 rounded-full bg-[#E6F8F4] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1116" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4 4 10-10" />
              </svg>
            </span>
            <div>
              <div className="font-semibold text-[15px] text-[#0E1116]">30-day returns</div>
              <div className="text-xs text-[#5B6470]">On unopened products</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Shop by Category ───────────────────────── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-16 sm:py-20 flex flex-col gap-9">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116]">
            Shop by category
          </h2>
          <Link href="/shop" className="font-semibold text-sm text-[#0E1116] underline hover:text-accent transition-colors">
            View all products
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group bg-white border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-accent"
            >
              <div className="bg-[#ECEAE4] rounded-lg h-40 flex items-center justify-center overflow-hidden">
                <TubGraphic
                  tubColor={categoryTubs[c.slug] || '#2B3440'}
                  size="md"
                  className="h-28 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-2xl uppercase tracking-[0.03em] text-[#0E1116]">
                  {c.name}
                </span>
                <span className="text-xs text-[#5B6470] font-medium">4 products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. Best Sellers ───────────────────────────── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 pb-16 sm:pb-24 flex flex-col gap-9">
        <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116]">
          Best sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map((p) => (
            <article
              key={p.id}
              className="bg-white border border-[#E3E1DA] rounded-xl p-4 flex flex-col gap-4 shadow-sm"
            >
              <Link
                href={`/product/${p.id}`}
                className="relative bg-[#ECEAE4] rounded-lg h-64 flex items-center justify-center overflow-hidden group"
              >
                <span className="absolute top-3 left-3 bg-[#0E1116] text-[#F6F5F1] text-xs font-semibold px-2.5 py-1 rounded-full z-10">
                  Batch tested
                </span>
                <TubGraphic
                  tubColor={p.tubColor}
                  size="lg"
                  className="h-44 group-hover:scale-105 transition-transform"
                />
              </Link>
              <div className="flex flex-col gap-1">
                <Link href={`/product/${p.id}`} className="font-semibold text-base text-[#0E1116] hover:text-accent transition-colors">
                  {p.name}
                </Link>
                <span className="text-xs text-[#5B6470]">{p.note}</span>
              </div>
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-[#F6F5F1]">
                <div>
                  <div className="text-lg font-bold text-[#0E1116]">
                    £{(p.price / 100).toFixed(2)}
                  </div>
                  <div className="text-[11px] text-[#5B6470]">{p.perServing}</div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      tubColor: p.tubColor,
                      variant: p.note.split('·')[1]?.trim() || 'Standard',
                    })
                  }
                  className="inline-flex items-center justify-center h-10 px-5 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover transition-all"
                >
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 5. Interactive Calculator Teaser ──────────── */}
      <section className="bg-[#0E1116] text-[#F6F5F1]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-20 lg:py-24 flex flex-wrap gap-12 lg:gap-16 items-center">
          <div className="flex-1 min-w-[320px] flex flex-col gap-5">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-accent">
              Your plan in two minutes
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-6xl leading-[0.98] uppercase text-white">
              Calculate your targets.<br />Get matched products.
            </h2>
            <p className="text-base leading-relaxed text-[#C9CDD2] max-w-[480px]">
              Enter your details to see daily calories and macros, then the servings per day shown on each label. Your plan adds straight to the basket.
            </p>
            <div className="pt-2">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center h-14 px-8 bg-accent text-[#0E1116] font-semibold text-base rounded-md hover:bg-accent-hover transition-all"
              >
                Start the calculator
              </Link>
            </div>
          </div>

          <div className="flex-1 min-w-[320px] max-w-[500px] bg-[#1A2029] border border-[#2B3440] rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="h-age" className="block text-xs text-[#C9CDD2] mb-1.5 font-medium">
                  Age
                </label>
                <input
                  id="h-age"
                  type="number"
                  value={calcAge}
                  onChange={(e) => setCalcAge(Math.max(18, parseInt(e.target.value) || 18))}
                  className="w-full h-12 rounded-md border border-[#3A4452] bg-[#0E1116] text-[#F6F5F1] px-3.5 text-base focus:border-accent focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="h-wt" className="block text-xs text-[#C9CDD2] mb-1.5 font-medium">
                  Weight (kg)
                </label>
                <input
                  id="h-wt"
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Math.max(40, parseInt(e.target.value) || 40))}
                  className="w-full h-12 rounded-md border border-[#3A4452] bg-[#0E1116] text-[#F6F5F1] px-3.5 text-base focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-[#C9CDD2] mb-2 font-medium">Goal</div>
              <div className="flex gap-2.5">
                {(['build', 'cut', 'maintain'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setCalcGoal(g)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                      calcGoal === g
                        ? 'bg-accent text-[#0E1116]'
                        : 'border border-[#3A4452] text-[#F6F5F1] hover:border-accent'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#3A4452] pt-5 grid grid-cols-4 gap-2">
              <div>
                <div className="text-[11px] text-[#C9CDD2]">Calories</div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {calories.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#C9CDD2]">Protein</div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-accent">
                  {proteinGrams} g
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#C9CDD2]">Carbs</div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {carbGrams} g
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#C9CDD2]">Fat</div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {fatGrams} g
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Check Your Batch ───────────────────────── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-20 flex flex-wrap gap-12 lg:gap-16 items-center">
        <div className="flex-1 min-w-[320px] flex flex-col gap-5">
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116]">
            Check your batch
          </h2>
          <p className="text-base leading-relaxed text-[#5B6470] max-w-[480px]">
            Every tub carries a batch code. Enter it to see the independent lab report for that exact batch.
          </p>
          <form onSubmit={handleBatchSubmit} className="flex gap-3 flex-wrap">
            <label htmlFor="batch" className="sr-only">Batch code</label>
            <input
              id="batch"
              type="text"
              value={batchCodeInput}
              onChange={(e) => setBatchCodeInput(e.target.value)}
              placeholder="e.g. PQ-2401"
              className="flex-1 min-w-[200px] h-14 border-[1.5px] border-[#0E1116] rounded-md px-4 text-base bg-white focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="h-14 px-7 bg-[#0E1116] text-[#F6F5F1] font-semibold text-base rounded-md hover:bg-black transition-colors"
            >
              Check batch
            </button>
          </form>
        </div>

        <div className="flex-1 min-w-[320px] bg-white border border-[#E3E1DA] rounded-2xl p-7 flex flex-col gap-4 shadow-sm">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="font-semibold text-base text-[#0E1116]">{activeBatch.product} · Batch {activeBatch.code}</span>
            <span className="bg-[#E6F8F4] text-[#0B6B5B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {activeBatch.status}
            </span>
          </div>
          <div className="flex flex-col gap-2.5 text-sm divide-y divide-[#E3E1DA]">
            <div className="flex justify-between pb-2">
              <span className="text-[#5B6470]">Test date</span>
              <span className="font-medium text-[#0E1116]">{activeBatch.testDate}</span>
            </div>
            <div className="flex justify-between pt-2 pb-2">
              <span className="text-[#5B6470]">Laboratory</span>
              <span className="font-medium text-[#0E1116]">{activeBatch.lab}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-[#5B6470]">Tested for</span>
              <span className="font-medium text-[#0E1116] text-right max-w-[240px]">{activeBatch.testedFor}</span>
            </div>
          </div>
          <Link
            href="/batch-results"
            className="font-semibold text-sm text-[#0E1116] underline hover:text-accent transition-colors mt-2"
          >
            Download full report (PDF)
          </Link>
        </div>
      </section>

      {/* ── 7. Newsletter ─────────────────────────────── */}
      <section className="bg-[#E6F8F4]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-16 flex flex-wrap gap-8 items-center justify-between">
          <div className="flex-1 min-w-[300px]">
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#0E1116] mb-2">
              Training and nutrition notes
            </h2>
            <p className="text-[#3D4650] text-base">
              One email a week. No spam, unsubscribe any time.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (newsletterEmail) setNewsletterSubscribed(true)
            }}
            className="flex gap-3 flex-1 min-w-[320px] max-w-[480px] flex-wrap"
          >
            <label htmlFor="nl" className="sr-only">Email address</label>
            <input
              id="nl"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 min-w-[220px] h-14 border border-[#0E1116] rounded-md px-4 text-base bg-white focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="h-14 px-7 bg-[#0E1116] text-[#F6F5F1] font-semibold text-base rounded-md hover:bg-black transition-colors"
            >
              {newsletterSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
