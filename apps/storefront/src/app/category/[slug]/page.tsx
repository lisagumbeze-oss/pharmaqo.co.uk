import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/product-card'
import { categories, getProductsByCategory, getCategoryBySlug } from '@/lib/data'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  return {
    title: `${category.name} Supplements`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryProducts = getProductsByCategory(slug)

  return (
    <div className="py-12">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="transition-colors hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-accent">Shop</Link>
          <span>/</span>
          <span className="text-ink">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mt-6">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Category
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold uppercase tracking-tight text-ink sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-muted">
            {category.description}
          </p>
        </div>

        {/* Sibling categories */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`inline-flex items-center px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-wider transition-all border ${
                cat.slug === slug
                  ? 'badge border-accent bg-accent/10 text-accent'
                  : 'text-ink-muted border-border hover:border-accent hover:text-accent'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
