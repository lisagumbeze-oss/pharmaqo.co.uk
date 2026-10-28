'use client'

import Link from 'next/link'
import { useState } from 'react'
import { brand } from '@/lib/brand'
import { useCart } from '@/context/cart-context'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  return (
    <div className="sticky top-0 z-40 w-full flex flex-col">
      {/* Announcement bar */}
      <div className="bg-[#0E1116] text-[#F6F5F1] text-xs font-medium text-center py-2 px-4 tracking-wide">
        Free UK delivery over £40 · Every batch independently tested
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-[#E3E1DA]">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-8 h-[76px] flex items-center justify-between gap-6 sm:gap-10">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-display font-bold text-2xl sm:text-3xl tracking-[0.04em] uppercase text-[#0E1116] shrink-0"
          >
            {brand.name}
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#0E1116] flex-grow flex-wrap"
          >
            <Link href="/category/protein" className="hover:text-accent transition-colors">
              Protein
            </Link>
            <Link href="/category/creatine" className="hover:text-accent transition-colors">
              Creatine
            </Link>
            <Link href="/category/vitamins" className="hover:text-accent transition-colors">
              Vitamins
            </Link>
            <Link href="/category/pre-workout" className="hover:text-accent transition-colors">
              Pre-Workout
            </Link>
            <Link href="/category/recovery" className="hover:text-accent transition-colors">
              Recovery
            </Link>
            <Link href="/calculators" className="hover:text-accent transition-colors">
              Calculators
            </Link>
            <Link href="/batch-results" className="hover:text-accent transition-colors">
              Batch results
            </Link>
          </nav>

          {/* Right Icon Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              onClick={() => alert('Search: Type product or batch number')}
              className="w-11 h-11 flex items-center justify-center text-[#0E1116] hover:bg-paper rounded-full transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/account"
              aria-label="Account"
              className="w-11 h-11 flex items-center justify-center text-[#0E1116] hover:bg-paper rounded-full transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
              </svg>
            </Link>

            {/* Basket Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Basket, ${itemCount} items`}
              className="relative w-11 h-11 flex items-center justify-center text-[#0E1116] hover:bg-paper rounded-full transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8h14l-1 12H6L5 8z" />
                <path d="M9 8a3 3 0 016 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ink">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center text-[#0E1116] hover:bg-paper rounded-full transition-colors ml-1"
              aria-label="Toggle navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-[#E3E1DA] bg-white px-6 py-4 flex flex-col gap-3 font-display uppercase tracking-wider font-semibold text-sm">
            <Link href="/category/protein" onClick={() => setMobileOpen(false)}>Protein</Link>
            <Link href="/category/creatine" onClick={() => setMobileOpen(false)}>Creatine</Link>
            <Link href="/category/vitamins" onClick={() => setMobileOpen(false)}>Vitamins</Link>
            <Link href="/category/pre-workout" onClick={() => setMobileOpen(false)}>Pre-Workout</Link>
            <Link href="/category/recovery" onClick={() => setMobileOpen(false)}>Recovery</Link>
            <Link href="/calculators" onClick={() => setMobileOpen(false)}>Calculators</Link>
            <Link href="/batch-results" onClick={() => setMobileOpen(false)}>Batch results</Link>
          </nav>
        )}
      </header>
    </div>
  )
}
