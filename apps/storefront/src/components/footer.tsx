import Link from 'next/link'
import { brand } from '@/lib/brand'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0E1116] text-[#C9CDD2] border-t border-[#2B3440]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-16 sm:py-20 flex flex-col gap-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand info */}
          <div className="col-span-2 flex flex-col gap-3">
            <span className="font-display font-bold text-3xl tracking-[0.04em] uppercase text-[#F6F5F1]">
              {brand.name}
            </span>
            <p className="text-sm leading-relaxed max-w-sm text-[#A0A8B4]">
              {brand.tagline}. Sports nutrition, made in the UK, shipped across the UK and European Union. Every batch independently tested.
            </p>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="text-[#F6F5F1] font-semibold uppercase font-display tracking-wider text-xs">
              Shop
            </span>
            <Link href="/category/protein" className="hover:text-accent transition-colors">Protein</Link>
            <Link href="/category/creatine" className="hover:text-accent transition-colors">Creatine</Link>
            <Link href="/category/vitamins" className="hover:text-accent transition-colors">Vitamins</Link>
            <Link href="/category/pre-workout" className="hover:text-accent transition-colors">Pre-Workout</Link>
            <Link href="/category/recovery" className="hover:text-accent transition-colors">Recovery</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="text-[#F6F5F1] font-semibold uppercase font-display tracking-wider text-xs">
              Support
            </span>
            <Link href="/shipping" className="hover:text-accent transition-colors">Shipping Info</Link>
            <Link href="/returns" className="hover:text-accent transition-colors">30-Day Returns</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact Team</Link>
            <Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link>
          </div>

          {/* Learn */}
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="text-[#F6F5F1] font-semibold uppercase font-display tracking-wider text-xs">
              Learn
            </span>
            <Link href="/calculators" className="hover:text-accent transition-colors">Calculators</Link>
            <Link href="/batch-results" className="hover:text-accent transition-colors">Batch Results</Link>
            <Link href="/about" className="hover:text-accent transition-colors">About Our Lab</Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy & Terms</Link>
          </div>
        </div>

        {/* Legal Disclaimer & Company Registration */}
        <div className="border-t border-[#2B3440] pt-6 flex flex-col gap-4 text-xs leading-relaxed text-[#8E97A4]">
          <p>
            Food supplements should not replace a varied, balanced diet and a healthy lifestyle. Keep out of reach of children. Not for use under 18. Stimulant products require 21+ age confirmation.
          </p>
          <div className="flex flex-wrap gap-4 justify-between items-center text-[11px]">
            <span>
              © {currentYear} {brand.legalEntity}, registered in England and Wales no. 14892019. VAT GB389201842.
            </span>
            <div className="flex gap-5">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
