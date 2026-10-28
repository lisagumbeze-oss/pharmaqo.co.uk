'use client'

import React from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/data'
import { formatPrice } from '@/lib/brand'
import { TubGraphic } from '@pharmaqo/ui'
import { useCart } from '@/context/cart-context'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const tubColors: Record<string, string> = {
    protein: '#2B3440',
    creatine: '#19C3A6',
    vitamins: '#5B6470',
    'pre-workout': '#0E1116',
    recovery: '#3A4452',
  }
  const tubColor = tubColors[product.categorySlug] || '#2B3440'

  return (
    <article className="bg-white border border-[#E3E1DA] rounded-xl p-4 flex flex-col gap-3.5 shadow-sm hover:border-accent transition-all duration-200">
      <Link
        href={`/product/${product.id}`}
        className="relative bg-[#ECEAE4] rounded-lg h-56 sm:h-64 flex items-center justify-center overflow-hidden group"
      >
        <span className="absolute top-3 left-3 bg-[#0E1116] text-[#F6F5F1] text-[11px] font-semibold px-2.5 py-0.5 rounded-full z-10">
          Batch tested
        </span>
        <TubGraphic
          tubColor={tubColor}
          size="lg"
          className="h-40 sm:h-48 group-hover:scale-105 transition-transform"
        />
      </Link>

      <div className="flex flex-col gap-1">
        <Link
          href={`/product/${product.id}`}
          className="font-semibold text-base text-[#0E1116] hover:text-accent transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <span className="text-xs text-[#5B6470] line-clamp-1">
          {product.servingSize} · {product.tags.stimulant === 'stimulant-free' ? 'Stim free' : 'Contains Caffeine'}
        </span>
      </div>

      <div className="flex justify-between items-center mt-auto pt-2 border-t border-[#F6F5F1]">
        <div>
          <div className="text-lg font-bold text-[#0E1116]">
            {formatPrice(product.price)}
          </div>
          <div className="text-[11px] text-[#5B6470]">
            incl. VAT
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              tubColor,
              variant: 'Standard',
            })
          }}
          className="inline-flex items-center justify-center h-10 px-4 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover transition-colors"
        >
          Add
        </button>
      </div>
    </article>
  )
}
