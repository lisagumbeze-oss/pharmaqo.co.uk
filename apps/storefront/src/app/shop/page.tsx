import type { Metadata } from 'next'
import ProductCard from '@/components/product-card'
import { products, categories } from '@/lib/data'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop All Supplements',
  description:
    'Browse our full range of UK-formulated supplements — protein, creatine, vitamins, pre-workout, and recovery.',
}

export default function ShopPage() {
  return (
    <div className="py-12">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="transition-colors hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-ink">Shop</span>
        </nav>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-ink sm:text-5xl">
              All Products
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              {products.length} products across {categories.length} categories
            </p>
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap gap-2">
            <Link
              href="/shop"
              className="badge border-accent bg-accent/10 text-accent"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-wider text-ink-muted border border-border transition-all hover:border-accent hover:text-accent"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
