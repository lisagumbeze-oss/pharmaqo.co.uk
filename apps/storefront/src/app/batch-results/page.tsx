'use client'

import React, { useState } from 'react'
import { brand } from '@/lib/brand'

interface BatchReport {
  batchCode: string
  productName: string
  manufactureDate: string
  testDate: string
  lab: string
  status: 'passed' | 'review'
  purity: string
  heavyMetals: string
  microbial: string
  downloadUrl: string
}

const verifiedReports: BatchReport[] = [
  {
    batchCode: 'PQ-2401',
    productName: 'Whey Isolate 90 (Vanilla · 1kg)',
    manufactureDate: '02 Oct 2026',
    testDate: '14 Oct 2026',
    lab: 'ALS Life Sciences UK (ISO 17025)',
    status: 'passed',
    purity: '91.4% (label claim 90%)',
    heavyMetals: 'Pass (< 0.05 mg/kg Pb, Cd, As)',
    microbial: 'Pass (Total plate count < 100 CFU/g)',
    downloadUrl: '#',
  },
  {
    batchCode: 'PQ-2402',
    productName: 'Creatine Monohydrate Pure (500g)',
    manufactureDate: '05 Oct 2026',
    testDate: '15 Oct 2026',
    lab: 'Eurofins Scientific UK (ISO 17025)',
    status: 'passed',
    purity: '99.9% pure Creapure®',
    heavyMetals: 'Pass (Below detectable threshold)',
    microbial: 'Pass (No Salmonella, E. coli, Yeast)',
    downloadUrl: '#',
  },
  {
    batchCode: 'PQ-2403',
    productName: 'Daily Multivitamin Elite (60 Tabs)',
    manufactureDate: '08 Oct 2026',
    testDate: '18 Oct 2026',
    lab: 'LGC Group Sports Nutrition',
    status: 'passed',
    purity: '100% active ingredient potency',
    heavyMetals: 'Pass (< 0.02 mg/kg)',
    microbial: 'Pass',
    downloadUrl: '#',
  },
  {
    batchCode: 'PQ-2404',
    productName: 'High-Stim Pre-Workout (Sour Apple)',
    manufactureDate: '10 Oct 2026',
    testDate: '20 Oct 2026',
    lab: 'ALS Life Sciences UK (ISO 17025)',
    status: 'passed',
    purity: '300 mg caffeine confirmed',
    heavyMetals: 'Pass',
    microbial: 'Pass',
    downloadUrl: '#',
  },
]

export default function BatchResultsPage() {
  const [search, setSearch] = useState('')
  const [activeReport, setActiveReport] = useState<BatchReport | null>(verifiedReports[0] ?? null)

  const filtered = verifiedReports.filter(
    (r) =>
      r.batchCode.toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="w-full bg-[#F6F5F1] flex flex-col min-h-screen">
      {/* ── Header ────────────────────────────────────── */}
      <section className="bg-[#0E1116] text-[#F6F5F1]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12 sm:py-16 flex flex-col gap-3">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-accent">
            Quality Assurance & Verification
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-7xl leading-[0.95] uppercase text-white">
            Independent Batch Reports
          </h1>
          <p className="text-base text-[#C9CDD2] max-w-xl">
            Every single batch produced by {brand.name} is independently tested by accredited
            third-party UK laboratories for label accuracy, heavy metals, and banned substances.
          </p>
        </div>
      </section>

      {/* ── Search and Reports ────────────────────────── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-12 flex flex-col gap-8">
        <div className="bg-white border border-[#E3E1DA] rounded-xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-[#0E1116]">
            Enter Tub Batch Code
          </h2>
          <p className="text-sm text-[#5B6470]">
            Locate the 6-character code printed near the expiry date on the bottom or side of your
            tub (e.g. PQ-2401).
          </p>
          <div className="flex gap-3 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. PQ-2401"
              className="flex-1 h-12 border border-[#0E1116] rounded-md px-4 text-base focus:outline-none focus:border-accent uppercase"
            />
            <button
              type="button"
              onClick={() => {
                const match = verifiedReports.find(
                  (r) => r.batchCode.toLowerCase() === search.toLowerCase().trim(),
                )
                if (match) setActiveReport(match)
              }}
              className="h-12 px-6 bg-[#0E1116] text-[#F6F5F1] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-black transition-colors"
            >
              Verify
            </button>
          </div>
        </div>

        {/* Selected Batch Certificate Card */}
        {activeReport && (
          <div className="bg-white border border-[#E3E1DA] rounded-2xl p-7 sm:p-9 flex flex-col gap-6 shadow-sm">
            <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E3E1DA] pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#5B6470]">
                  Certificate of Analysis
                </span>
                <h3 className="font-display font-bold text-3xl text-[#0E1116] mt-1">
                  {activeReport.productName}
                </h3>
                <p className="text-sm text-[#5B6470] mt-0.5">
                  Batch Code: <strong className="text-[#0E1116]">{activeReport.batchCode}</strong>
                </p>
              </div>
              <span className="bg-[#E6F8F4] text-[#0B6B5B] text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                ✓ {activeReport.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between border-b border-[#E3E1DA] pb-2">
                  <span className="text-[#5B6470]">Testing Laboratory</span>
                  <span className="font-semibold text-[#0E1116]">{activeReport.lab}</span>
                </div>
                <div className="flex justify-between border-b border-[#E3E1DA] pb-2">
                  <span className="text-[#5B6470]">Manufacture Date</span>
                  <span className="font-semibold text-[#0E1116]">
                    {activeReport.manufactureDate}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E3E1DA] pb-2">
                  <span className="text-[#5B6470]">Test Release Date</span>
                  <span className="font-semibold text-[#0E1116]">{activeReport.testDate}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between border-b border-[#E3E1DA] pb-2">
                  <span className="text-[#5B6470]">Assay / Purity</span>
                  <span className="font-semibold text-accent">{activeReport.purity}</span>
                </div>
                <div className="flex justify-between border-b border-[#E3E1DA] pb-2">
                  <span className="text-[#5B6470]">Heavy Metals Screen</span>
                  <span className="font-semibold text-[#1F9D55]">{activeReport.heavyMetals}</span>
                </div>
                <div className="flex justify-between border-b border-[#E3E1DA] pb-2">
                  <span className="text-[#5B6470]">Microbial Safety</span>
                  <span className="font-semibold text-[#1F9D55]">{activeReport.microbial}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() =>
                  alert(
                    `Downloading Certificate of Analysis PDF for batch ${activeReport.batchCode}`,
                  )
                }
                className="inline-flex items-center gap-2 h-12 px-6 bg-accent text-[#0E1116] font-display font-bold text-xs uppercase tracking-wider rounded-md hover:bg-accent-hover transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Official Certificate (PDF)
              </button>
            </div>
          </div>
        )}

        {/* Recent Batch Table */}
        <div className="bg-white border border-[#E3E1DA] rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#E3E1DA]">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-[#0E1116]">
              Recent Production Batches
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Recent batch test certificates">
              <thead className="bg-paper border-b border-[#E3E1DA] text-xs font-semibold text-[#5B6470] uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Batch Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Test Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E1DA]">
                {filtered.map((r) => (
                  <tr key={r.batchCode} className="hover:bg-paper/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-ink">{r.batchCode}</td>
                    <td className="px-6 py-4 font-medium text-ink">{r.productName}</td>
                    <td className="px-6 py-4 text-[#5B6470]">{r.testDate}</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#E6F8F4] text-[#0B6B5B] text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                        Passed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveReport(r)}
                        className="text-xs font-bold text-accent hover:underline uppercase"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testing Methodology Explainer */}
        <div className="bg-[#1A2029] text-[#F6F5F1] rounded-2xl p-8 flex flex-col gap-4 border border-[#2B3440]">
          <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-accent">
            How Our Testing Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#C9CDD2]">
            <div>
              <p className="font-bold text-white mb-1">1. Quarantine & Sampling</p>
              <p>
                Every raw material batch is held in quarantine until random statistical samples are
                sent to UKAS-accredited testing facilities.
              </p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">2. HPLC & ICP-MS Testing</p>
              <p>
                High Performance Liquid Chromatography verifies active potency. Inductively Coupled
                Plasma Mass Spectrometry checks for lead, mercury, cadmium, and arsenic.
              </p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">3. Public Release</p>
              <p>
                Tubs only enter fulfillment once the independent Certificate of Analysis is signed
                and uploaded to this database for complete customer transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
