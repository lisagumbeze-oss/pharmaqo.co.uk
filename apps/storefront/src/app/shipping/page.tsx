import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'

export const metadata = {
  title: `Shipping & Returns | ${brand.name}`,
}

export default function ShippingPage() {
  return (
    <div className="w-full bg-[#F6F5F1] py-12 sm:py-16">
      <div className="max-w-[840px] mx-auto px-6 sm:px-8 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Shipping & Returns</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">UK & EU Fulfillment</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Shipping & 30-Day Returns
          </h1>
        </div>

        <div className="bg-white border border-[#E3E1DA] rounded-2xl p-8 sm:p-10 flex flex-col gap-6 text-sm text-[#3D4650] leading-relaxed shadow-sm">
          <div>
            <h2 className="font-display font-bold text-lg uppercase text-[#0E1116] mb-2">UK Shipping Rates</h2>
            <div className="border border-[#E3E1DA] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs" aria-label="UK Shipping rates">
                <thead className="bg-paper border-b border-[#E3E1DA] font-bold text-[#0E1116] uppercase">
                  <tr>
                    <th scope="col" className="p-3">Service</th>
                    <th scope="col" className="p-3">Transit Time</th>
                    <th scope="col" className="p-3">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E1DA]">
                  <tr>
                    <td className="p-3 font-semibold">Royal Mail Tracked 48</td>
                    <td className="p-3">2–3 business days</td>
                    <td className="p-3 text-accent font-bold">Free on orders &gt; £40 (£3.99 under)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">DPD Next Day Priority</td>
                    <td className="p-3">Next working day (order by 2pm)</td>
                    <td className="p-3 font-bold">£5.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg uppercase text-[#0E1116] mb-2">European Union Delivery</h2>
            <p>
              We ship to all EU member states via DPD European Road and Air Express. All applicable EU customs duties and national VAT are calculated and collected directly at checkout, ensuring no unexpected fees upon doorstep delivery.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg uppercase text-[#0E1116] mb-2">30-Day Money Back Guarantee</h2>
            <p>
              We take extreme pride in our clinical-grade supplements. If you change your mind, return any unopened tub with safety induction seal intact within 30 days of receipt for an immediate, full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
