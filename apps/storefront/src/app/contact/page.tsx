'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="w-full bg-[#F6F5F1] py-12 sm:py-16 min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 sm:px-8 flex flex-col gap-8">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Contact</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">UK Support</span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Contact Support
          </h1>
        </div>

        <div className="bg-white border border-[#E3E1DA] rounded-2xl p-7 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-[#E6F8F4] text-[#0B6B5B] flex items-center justify-center text-2xl font-bold">✓</span>
              <h2 className="font-display font-bold text-2xl uppercase text-[#0E1116]">Message Received</h2>
              <p className="text-xs text-[#5B6470] max-w-sm">
                Our support team will respond to your enquiry within 24 business hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-3.5 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    className="w-full h-12 border border-[#CFCDC5] rounded-md px-3.5 text-sm bg-white focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                  Subject / Batch Number
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Question regarding batch report PQ-2401"
                  className="w-full h-12 border border-[#CFCDC5] rounded-md px-3.5 text-sm bg-white focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="How can our technical nutrition team assist you?"
                  className="w-full border border-[#CFCDC5] rounded-md p-3.5 text-sm bg-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <button
                type="submit"
                className="h-13 bg-[#0E1116] text-[#F6F5F1] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-black transition-colors"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="border-t border-[#E3E1DA] pt-6 mt-6 flex flex-wrap gap-6 text-xs text-[#5B6470]">
            <div>
              <span className="font-bold text-ink block">Email</span>
              <a href={`mailto:${brand.supportEmail}`} className="text-accent underline">
                {brand.supportEmail}
              </a>
            </div>
            <div>
              <span className="font-bold text-ink block">Registered Office</span>
              <span>71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
