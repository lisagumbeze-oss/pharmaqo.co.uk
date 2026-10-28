import React from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Button                                                */
/* ────────────────────────────────────────────────────── */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
} as const

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-wider transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-accent text-ink hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md',
      secondary:
        'bg-transparent text-ink border-[1.5px] border-ink hover:bg-ink hover:text-paper hover:-translate-y-0.5',
      text: 'bg-transparent text-ink-muted hover:text-accent underline-offset-4 hover:underline',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizeMap[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

/* ────────────────────────────────────────────────────── */
/*  Badge                                                 */
/* ────────────────────────────────────────────────────── */

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'vegan' | 'gluten-free' | 'stimulant' | 'age-restricted' | 'new' | 'low-stock' | 'batch-tested'
}

const badgeVariants: Record<string, string> = {
  default: 'bg-accent/10 text-accent border-accent',
  vegan: 'bg-success/10 text-success border-success',
  'gluten-free': 'bg-warning/10 text-warning border-warning',
  stimulant: 'bg-error/10 text-error border-error',
  'age-restricted': 'bg-error/10 text-error border-error',
  new: 'bg-accent/10 text-accent border-accent',
  'low-stock': 'bg-warning/10 text-warning border-warning',
  'batch-tested': 'bg-ink/5 text-ink border-ink/20',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-[0.1em] border',
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/* ────────────────────────────────────────────────────── */
/*  Input                                                 */
/* ────────────────────────────────────────────────────── */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-[44px] w-full border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors duration-150',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
            error ? 'border-error' : 'border-border',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

/* ────────────────────────────────────────────────────── */
/*  Select                                                */
/* ────────────────────────────────────────────────────── */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium text-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'min-h-[44px] w-full border bg-surface px-4 py-3 text-sm text-ink transition-colors duration-150',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
            error ? 'border-error' : 'border-border',
            className,
          )}
          aria-invalid={!!error}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'

/* ────────────────────────────────────────────────────── */
/*  QuantitySelector                                      */
/* ────────────────────────────────────────────────────── */

export interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  className?: string
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn('inline-flex items-center border border-border', className)}>
      <button
        type="button"
        onClick={() => onChange?.(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:bg-accent/10 hover:text-accent disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (!isNaN(v) && v >= min && v <= max) onChange?.(v)
        }}
        className="h-11 w-12 border-x border-border bg-transparent text-center text-sm font-semibold text-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={() => onChange?.(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:bg-accent/10 hover:text-accent disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  )
}
