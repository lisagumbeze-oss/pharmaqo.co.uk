import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'

export const metadata = {
  title: `Terms of Service | ${brand.name}`,
}

export default function TermsPage() {
  return (
    <div className="w-full bg-[#F6F5F1] py-12 sm:py-16">
      <div className="max-w-[840px] mx-auto px-6 sm:px-8 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Terms</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Legal & Compliance</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Terms of Service
          </h1>
        </div>

        <div className="bg-white border border-[#E3E1DA] rounded-2xl p-8 sm:p-10 flex flex-col gap-5 text-sm text-[#3D4650] leading-relaxed shadow-sm">
          <h2 className="font-display font-bold text-lg uppercase text-[#0E1116]">1. Legal Nature of Products</h2>
          <p>
            All products supplied by {brand.name} ({brand.legalEntity}) are legally classified dietary food supplements under the UK Food Supplements Regulations 2003 (as amended) and European Commission Directive 2002/46/EC. We do not sell prescription pharmaceuticals, controlled substances, or hormonal formulations.
          </p>

          <h2 className="font-display font-bold text-lg uppercase text-[#0E1116]">2. Medical Disclaimer</h2>
          <p>
            Statements on this website and product packaging are factual representations of verified nutrient content. Food supplements must not be used as a substitute for a varied, balanced diet and a healthy lifestyle. If you are pregnant, nursing, taking prescription medication, or have a diagnosed medical condition, consult your GP before use.
          </p>

          <h2 className="font-display font-bold text-lg uppercase text-[#0E1116]">3. Age Restrictions for Stimulant Formulas</h2>
          <p>
            In accordance with voluntary UK safety codes for high-caffeine sports nutrition products, purchasers of stimulant formulas must be at least 21 years of age.
          </p>

          <h2 className="font-display font-bold text-lg uppercase text-[#0E1116]">4. Pricing and Governing Law</h2>
          <p>
            All prices are quoted in GBP (£) inclusive of UK Value Added Tax (VAT) at the prevailing rate. Contracts for purchase are governed exclusively by the laws of England and Wales.
          </p>
        </div>
      </div>
    </div>
  )
}
