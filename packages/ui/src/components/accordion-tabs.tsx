'use client'

import React, { useState, useId } from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Accordion                                             */
/* ────────────────────────────────────────────────────── */

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  /** Allow multiple panels open at once */
  multiple?: boolean
  className?: string
}

export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const baseId = useId()

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(multiple ? prev : [])
      if (prev.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={cn('divide-y divide-border border-y border-border', className)} role="presentation">
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        const headerId = `${baseId}-header-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`

        return (
          <div key={item.id}>
            <h3>
              <button
                id={headerId}
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-[44px] w-full items-center justify-between gap-4 px-1 py-4 text-left font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{item.title}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={cn('overflow-hidden transition-all duration-250', isOpen ? 'pb-4' : 'h-0')}
            >
              <div className="text-sm leading-relaxed text-muted">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Tabs                                                  */
/* ────────────────────────────────────────────────────── */

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultTab?: string
  className?: string
}

export function Tabs({ items, defaultTab, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab || items[0]?.id || '')
  const baseId = useId()

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % items.length
    if (e.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length
    if (e.key === 'Home') nextIndex = 0
    if (e.key === 'End') nextIndex = items.length - 1

    if (nextIndex !== null) {
      e.preventDefault()
      const nextItem = items[nextIndex]
      if (nextItem) {
        setActiveId(nextItem.id)
        document.getElementById(`${baseId}-tab-${nextItem.id}`)?.focus()
      }
    }
  }

  return (
    <div className={className}>
      {/* Tab list */}
      <div role="tablist" aria-label="Content tabs" className="flex border-b border-border">
        {items.map((item, i) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                'min-h-[44px] px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent',
                isActive
                  ? 'border-b-2 border-accent text-accent'
                  : 'text-muted hover:text-ink',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Tab panels */}
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="py-4 text-sm leading-relaxed text-ink focus-visible:outline-2 focus-visible:outline-accent"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
