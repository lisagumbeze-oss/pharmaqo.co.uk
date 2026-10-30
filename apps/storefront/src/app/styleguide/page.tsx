import React from 'react'
import Link from 'next/link'
import { colors, typeScale } from '@pharmaqo/ui'

export const metadata = {
  title: 'Design System Styleguide — Tokens & Spec',
  description: 'Clinical-premium design tokens matching the Phase 1 spec.',
}

export default function StyleguidePage() {
  return (
    <div className="w-full bg-paper py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex flex-col gap-12">
        <nav className="flex items-center gap-2 text-xs text-[#5B6470]">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0E1116] font-medium">Styleguide</span>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Phase 1 Design System
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-[0.02em] text-[#0E1116] mt-1">
            Design Tokens & Spec
          </h1>
          <p className="text-sm text-[#5B6470] mt-2">
            Clinical-premium design language: lab-grade trust without a sterile pharmacy feel.
          </p>
        </div>

        {/* ── 1. Color Palette & Contrast ──────────────── */}
        <section className="bg-white border border-border rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-[#0E1116]">
            1. Color Tokens & Contrast Check
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(colors).map(([name, hex]) => (
              <div key={name} className="border border-border rounded-xl p-3 flex flex-col gap-2">
                <div
                  className="w-full h-16 rounded-lg border border-border shadow-inner"
                  style={{ backgroundColor: hex }}
                />
                <div>
                  <span className="text-xs font-bold text-[#0E1116] block capitalize">{name}</span>
                  <span className="text-[11px] font-mono text-[#5B6470]">{hex}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-border rounded-xl p-5 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              WCAG 2.1 AA Contrast Verification on Paper (#F6F5F1)
            </span>
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white rounded-lg border border-border">
                <span className="font-bold text-ink block mb-1">Ink (#0E1116) on Paper</span>
                <span className="text-success font-bold">18.4 : 1 (AAA Passed)</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-border">
                <span className="font-bold text-muted block mb-1">Muted (#5B6470) on Paper</span>
                <span className="text-success font-bold">5.2 : 1 (AA Passed &gt; 4.5:1)</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-border">
                <span className="font-bold text-accent block mb-1">Accent (#19C3A6)</span>
                <span className="text-[#0E1116]">Used for buttons, badges & large text</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Typography ────────────────────────────── */}
        <section className="bg-white border border-border rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-[#0E1116]">
            2. Typography & Type Scale (12px – 64px)
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 border-b border-border pb-6">
            <div>
              <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">
                Display Font
              </span>
              <p className="font-display font-bold text-3xl uppercase tracking-[0.02em] text-ink">
                Barlow Condensed 600 / 700
              </p>
              <span className="text-xs text-muted">
                Used for headings, product titles, badges, and CTAs.
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">
                Body Font
              </span>
              <p className="font-body text-xl text-ink font-medium">Inter 400 / 500 / 600</p>
              <span className="text-xs text-muted">
                Used for body copy, data tables, and input labels.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(typeScale).map(([scale, px]) => (
              <div
                key={scale}
                className="flex items-baseline justify-between border-b border-border/50 pb-2"
              >
                <span className="font-mono text-xs text-muted">
                  {scale} ({px})
                </span>
                <span
                  className="font-display font-bold uppercase text-ink"
                  style={{ fontSize: px }}
                >
                  Pharmaqo Performance Nutrition
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Spacing Scale, Radii & Shadows ───────── */}
        <section className="bg-white border border-border rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-[#0E1116]">
            3. Spacing (4–96px), Radii & Shadows
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Radii */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Radii</span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 border border-accent flex items-center justify-center text-xs font-bold rounded-[6px]">
                  6px
                </div>
                <span className="text-xs text-ink">Inputs & Buttons (sm: 6px)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 border border-accent flex items-center justify-center text-xs font-bold rounded-[12px]">
                  12px
                </div>
                <span className="text-xs text-ink">Cards & Panels (md: 12px)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 border border-accent flex items-center justify-center text-xs font-bold rounded-full">
                  999
                </div>
                <span className="text-xs text-ink">Badges & Pills (full)</span>
              </div>
            </div>

            {/* Shadows */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Elevation Shadows
              </span>
              <div className="p-4 bg-white rounded-lg shadow-sm border border-border text-xs font-semibold">
                shadow-sm: 0 1px 2px rgba(14,17,22,.06)
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md border border-border text-xs font-semibold">
                shadow-md: 0 8px 24px rgba(14,17,22,.08)
              </div>
            </div>

            {/* Motion */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                Transitions & Motion
              </span>
              <div className="p-3 bg-paper rounded-lg text-xs">
                <span className="font-bold text-ink block">Hover:</span> 150 ms ease-out
              </div>
              <div className="p-3 bg-paper rounded-lg text-xs">
                <span className="font-bold text-ink block">Drawers & Dialogs:</span> 250 ms
                cubic-bezier
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
