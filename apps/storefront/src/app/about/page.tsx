import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'

export const metadata = {
  title: `About Us | ${brand.name}`,
  description: 'Learn about our UK-based science-led formulation standards and independent laboratory batch testing.',
}

export default function AboutPage() {
  return (
    <div className="w-full bg-[#F6F5F1] py-12 sm:py-16">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-8 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">About</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Science Led · Lab Grade</span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Built On Radical Transparency
          </h1>
        </div>

        <div className="bg-white border border-[#E3E1DA] rounded-2xl p-8 sm:p-10 flex flex-col gap-6 text-[#3D4650] leading-relaxed shadow-sm">
          <p className="text-lg font-medium text-[#0E1116]">
            {brand.name} was founded in the UK with a single mandate: eliminate proprietary blends, under-dosed ingredients, and opaque quality standards from the sports nutrition market.
          </p>

          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-[#0E1116] mt-2">
            The Three Pillars of Our Standard
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 pt-2">
            <div className="border border-[#E3E1DA] rounded-xl p-5 bg-paper/50">
              <h3 className="font-display font-bold text-lg uppercase text-[#0E1116] mb-1">1. Clinical Dosing</h3>
              <p className="text-xs text-[#5B6470]">
                Every active compound is dosed strictly according to peer-reviewed human trials. No filler, no pixie dusting.
              </p>
            </div>
            <div className="border border-[#E3E1DA] rounded-xl p-5 bg-paper/50">
              <h3 className="font-display font-bold text-lg uppercase text-[#0E1116] mb-1">2. 100% Public Testing</h3>
              <p className="text-xs text-[#5B6470]">
                We publish third-party UKAS ISO 17025 lab certificates for every single tub batch produced.
              </p>
            </div>
            <div className="border border-[#E3E1DA] rounded-xl p-5 bg-paper/50">
              <h3 className="font-display font-bold text-lg uppercase text-[#0E1116] mb-1">3. Label Facts Only</h3>
              <p className="text-xs text-[#5B6470]">
                We avoid unverified miracle claims and adhere stringently to UK & EU Food Supplements Regulations.
              </p>
            </div>
          </div>

          <div className="border-t border-[#E3E1DA] pt-6 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs text-[#5B6470]">
              Registered in England & Wales. Manufactured under cGMP pharmaceutical conditions.
            </span>
            <Link
              href="/batch-results"
              className="inline-flex h-11 items-center px-6 bg-[#0E1116] text-[#F6F5F1] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-black"
            >
              Search Batch Database
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
