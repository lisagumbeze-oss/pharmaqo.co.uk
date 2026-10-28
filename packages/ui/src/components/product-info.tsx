import React from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Nutrition Facts Table                                 */
/* ────────────────────────────────────────────────────── */

export interface NutrientRow {
  name: string
  perServing: string
  per100g?: string
  /** Indent level for sub-nutrients */
  indent?: boolean
}

export interface NutritionTableProps {
  servingSize: string
  nutrients: NutrientRow[]
  ingredients?: string
  allergens?: string[]
  warnings?: string[]
  className?: string
}

export function NutritionTable({
  servingSize,
  nutrients,
  ingredients,
  allergens,
  warnings,
  className,
}: NutritionTableProps) {
  const hasPer100g = nutrients.some((n) => n.per100g)

  return (
    <div className={cn('rounded-[var(--radius-md)] border border-border bg-surface', className)}>
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
          Nutrition Facts
        </h3>
        <p className="text-xs text-muted">Serving Size: {servingSize}</p>
      </div>

      {/* Nutrient rows */}
      <table className="w-full text-sm" aria-label="Nutrition information">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="px-4 py-2 text-left text-xs font-semibold text-muted" scope="col">Nutrient</th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-muted" scope="col">Per Serving</th>
            {hasPer100g && (
              <th className="px-4 py-2 text-right text-xs font-semibold text-muted" scope="col">Per 100 g</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {nutrients.map((row) => (
            <tr key={row.name} className="transition-colors hover:bg-paper">
              <td className={cn('px-4 py-2 text-ink', row.indent && 'pl-8')}>
                {!row.indent && <span className="font-medium">{row.name}</span>}
                {row.indent && <span className="text-muted">{row.name}</span>}
              </td>
              <td className="px-4 py-2 text-right font-medium text-ink">{row.perServing}</td>
              {hasPer100g && (
                <td className="px-4 py-2 text-right text-muted">{row.per100g || '—'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ingredients */}
      {ingredients && (
        <div className="border-t border-border px-4 py-3">
          <p className="text-xs">
            <span className="font-semibold text-ink">Ingredients: </span>
            <span className="text-muted">{ingredients}</span>
          </p>
        </div>
      )}

      {/* Allergens */}
      {allergens && allergens.length > 0 && (
        <div className="border-t border-border px-4 py-3">
          <p className="text-xs">
            <span className="font-semibold text-error">Allergens: </span>
            <span className="font-bold text-error">{allergens.join(', ')}</span>
          </p>
        </div>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <div className="border-t border-border bg-warning/5 px-4 py-3">
          {warnings.map((w, i) => (
            <p key={i} className="text-xs text-warning">⚠ {w}</p>
          ))}
        </div>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Batch Lookup                                          */
/* ────────────────────────────────────────────────────── */

export interface BatchResult {
  batchCode: string
  productName: string
  testDate: string
  laboratory: string
  purity: string
  heavyMetals: 'pass' | 'fail'
  bannedSubstances: 'pass' | 'fail'
  reportUrl?: string
}

export interface BatchLookupProps {
  onSearch?: (code: string) => void
  result?: BatchResult | null
  loading?: boolean
  error?: string
  className?: string
}

export function BatchLookup({ onSearch, result, loading, error, className }: BatchLookupProps) {
  const [code, setCode] = React.useState('')

  return (
    <div className={cn('rounded-[var(--radius-md)] border border-border bg-surface p-6', className)}>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
        Batch Test Lookup
      </h3>
      <p className="mt-1 text-xs text-muted">Enter your batch code to view the lab test results.</p>

      {/* Search form */}
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (code.trim()) onSearch?.(code.trim())
        }}
      >
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. PQ-2026-0147"
          className="min-h-[44px] flex-1 rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-2 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
          aria-label="Batch code"
        />
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="min-h-[44px] rounded-[var(--radius-sm)] bg-accent px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-accent-hover disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent"
        >
          {loading ? 'Searching…' : 'Lookup'}
        </button>
      </form>

      {/* Error */}
      {error && <p className="mt-3 text-xs text-error" role="alert">{error}</p>}

      {/* Result card */}
      {result && (
        <div className="mt-4 rounded-[var(--radius-sm)] border border-border bg-paper p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold uppercase text-ink">{result.productName}</p>
              <p className="text-xs text-muted">Batch: {result.batchCode}</p>
            </div>
            <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-success">
              Tested
            </span>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <dt className="text-muted">Test Date</dt>
            <dd className="text-ink">{result.testDate}</dd>
            <dt className="text-muted">Laboratory</dt>
            <dd className="text-ink">{result.laboratory}</dd>
            <dt className="text-muted">Purity</dt>
            <dd className="text-ink">{result.purity}</dd>
            <dt className="text-muted">Heavy Metals</dt>
            <dd className={result.heavyMetals === 'pass' ? 'text-success' : 'text-error'}>
              {result.heavyMetals === 'pass' ? '✓ Pass' : '✗ Fail'}
            </dd>
            <dt className="text-muted">Banned Substances</dt>
            <dd className={result.bannedSubstances === 'pass' ? 'text-success' : 'text-error'}>
              {result.bannedSubstances === 'pass' ? '✓ Pass' : '✗ Fail'}
            </dd>
          </dl>

          {result.reportUrl && (
            <a
              href={result.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
            >
              View Full Report
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10M7 17 17 7" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  )
}
