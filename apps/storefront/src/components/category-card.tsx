import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '@/lib/data'

interface CategoryCardProps {
  category: Category
  index: number
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="card group relative flex flex-col justify-end overflow-hidden p-6 min-h-[220px]"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink/[0.02] to-accent/[0.04] transition-all duration-500 group-hover:from-accent/[0.06] group-hover:to-accent/[0.1]" />

      {/* Large faded number */}
      <span className="absolute -right-2 -top-4 font-display text-[120px] font-bold leading-none text-ink/[0.03] transition-colors duration-500 group-hover:text-accent/[0.08]">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
            {category.name}
          </h3>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
            <ArrowUpRight size={14} />
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {category.description}
        </p>
        <p className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          {category.productCount} Products
        </p>
      </div>
    </Link>
  )
}
