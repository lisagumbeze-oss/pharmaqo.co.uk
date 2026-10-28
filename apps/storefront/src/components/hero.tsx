import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { brand } from '@/lib/brand'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container-main relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">
        {/* Eyebrow */}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            New Season — Now Live
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up text-5xl font-bold uppercase leading-[0.95] tracking-tight text-paper sm:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.1s' }}
        >
          {brand.tagline.split('.').map((part, i) => (
            <span key={i} className="block">
              {part.trim()}
              {i === 0 && <span className="text-accent">.</span>}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-light sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          Premium UK-formulated supplements built on clinical dosing, transparent labels, and zero compromises.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '0.3s' }}
        >
          <Link href="/shop" className="btn-primary">
            Shop All
            <ArrowRight size={16} />
          </Link>
          <Link href="/category/protein" className="btn-secondary border-paper/30 text-paper hover:bg-paper hover:text-ink">
            Best Sellers
          </Link>
        </div>

        {/* Trust bar */}
        <div
          className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.15em] text-ink-muted"
          style={{ animationDelay: '0.4s' }}
        >
          {['Free UK Delivery £40+', 'Lab Tested', 'No Proprietary Blends', 'GBP Pricing'].map((item) => (
            <span key={item} className="flex items-center gap-2 font-display">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
