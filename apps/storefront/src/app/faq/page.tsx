'use client'

import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'
import { Accordion } from '@pharmaqo/ui'

const faqItems = [
  {
    id: 'batch-lookup',
    title: 'How do I check the lab report for my tub?',
    content: (
      <p className="text-sm text-[#3D4650] leading-relaxed">
        Every tub has a 6-character batch code printed beside the expiry date (e.g. PQ-2401). Simply enter this code on our Batch Results page or directly on the product page to view the third-party Certificate of Analysis.
      </p>
    ),
  },
  {
    id: 'delivery-times',
    title: 'What are your UK and EU shipping times?',
    content: (
      <p className="text-sm text-[#3D4650] leading-relaxed">
        UK orders placed before 2 pm are dispatched the same working day via Royal Mail Tracked 48 (2–3 business days, free over £40) or DPD Next Day (£5.99). EU orders are shipped via DPD Europe with all duties and VAT pre-calculated.
      </p>
    ),
  },
  {
    id: 'returns-policy',
    title: 'What is your 30-day guarantee?',
    content: (
      <p className="text-sm text-[#3D4650] leading-relaxed">
        We offer a no-questions-asked 30-day return policy for unopened items in their original sealed packaging. Contact support@pharmaqo.co.uk to generate a prepaid return label.
      </p>
    ),
  },
  {
    id: 'age-gate',
    title: 'Why do stimulant pre-workouts require age confirmation?',
    content: (
      <p className="text-sm text-[#3D4650] leading-relaxed">
        In accordance with UK voluntary standards and European Food Safety Authority (EFSA) guidance regarding high-potency caffeine formulas, we require purchasers to verify they are 21 years of age or older before adding stimulant formulas to their basket.
      </p>
    ),
  },
  {
    id: 'vegan-gluten',
    title: 'Are your products suitable for dietary restrictions?',
    content: (
      <p className="text-sm text-[#3D4650] leading-relaxed">
        All dietary flags (Vegan, Gluten-free, Stimulant-free) are verified by raw-material certificates and clearly displayed on each product card and nutrition facts label.
      </p>
    ),
  },
]

export default function FAQPage() {
  return (
    <div className="w-full bg-[#F6F5F1] py-12 sm:py-16 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">FAQ</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Customer Support</span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="bg-white border border-[#E3E1DA] rounded-2xl p-6 sm:p-10 shadow-sm">
          <Accordion items={faqItems} multiple />
        </div>

        <div className="bg-[#1A2029] text-white rounded-xl p-6 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <p className="font-bold text-base">Still have questions?</p>
            <p className="text-xs text-[#A0A8B4]">Our UK scientific support team responds within 24 hours.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center px-5 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover"
          >
            Contact Team
          </Link>
        </div>
      </div>
    </div>
  )
}
