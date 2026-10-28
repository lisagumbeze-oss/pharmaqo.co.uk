import React from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Trust Bar                                             */
/* ────────────────────────────────────────────────────── */

interface TrustItem {
  icon: React.ReactNode
  label: string
}

export interface TrustBarProps {
  items?: TrustItem[]
  className?: string
}

const defaultItems: TrustItem[] = [
  { icon: <TruckIcon />, label: 'Free UK Delivery £40+' },
  { icon: <ShieldIcon />, label: 'Batch Tested' },
  { icon: <LockIcon />, label: 'Secure Payments' },
  { icon: <RefreshIcon />, label: '30-Day Returns' },
]

export function TrustBar({ items = defaultItems, className }: TrustBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-border bg-surface px-4 py-4',
        className,
      )}
      role="list"
      aria-label="Trust signals"
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-xs text-muted" role="listitem">
          <span className="text-accent">{item.icon}</span>
          <span className="font-display font-semibold uppercase tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Inline SVG icons (no external deps needed) ──── */

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}
