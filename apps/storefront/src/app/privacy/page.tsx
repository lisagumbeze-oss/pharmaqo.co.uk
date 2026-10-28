import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'

export const metadata = {
  title: `Privacy & Cookies Policy | ${brand.name}`,
}

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#F6F5F1] py-12 sm:py-16">
      <div className="max-w-[840px] mx-auto px-6 sm:px-8 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Privacy</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">UK GDPR Compliance</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-white border border-[#E3E1DA] rounded-2xl p-8 sm:p-10 flex flex-col gap-5 text-sm text-[#3D4650] leading-relaxed shadow-sm">
          <p>
            {brand.name} ({brand.legalEntity}) complies fully with the UK Data Protection Act 2018 and the UK General Data Protection Regulation (UK GDPR). We take your data privacy with the same clinical seriousness as our product formulation.
          </p>

          <h2 className="font-display font-bold text-lg uppercase text-[#0E1116]">Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Contact details (name, shipping address, email, telephone) solely to fulfill your order.</li>
            <li>Session calculator inputs (age, weight, goals) stored client-side in your local browser session to generate nutrition targets, never sold or shared with ad networks.</li>
            <li>Encrypted payment tokens processed through PCI-DSS Level 1 compliant gateways (Stripe/Medusa).</li>
          </ul>

          <h2 className="font-display font-bold text-lg uppercase text-[#0E1116]">Cookie Policy</h2>
          <p>
            We only load non-essential analytical cookies after you have provided explicit opt-in consent via our Cookie Banner. Essential cookies (basket persistence and security tokens) are required for store operation.
          </p>

          <p className="text-xs text-[#5B6470] pt-4 border-t border-[#E3E1DA]">
            For data access requests or deletion under UK GDPR Article 17, email our Data Protection Officer at <a href={`mailto:${brand.supportEmail}`} className="text-accent underline">{brand.supportEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
