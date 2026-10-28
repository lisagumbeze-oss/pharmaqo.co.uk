import React from 'react'
import { cn } from '../utils'

/* ────────────────────────────────────────────────────── */
/*  Checkbox                                              */
/* ────────────────────────────────────────────────────── */

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label htmlFor={checkboxId} className="flex min-h-[44px] cursor-pointer items-center gap-3">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="h-5 w-5 shrink-0 cursor-pointer rounded-[var(--radius-sm)] border border-border bg-surface text-accent accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-invalid={!!error}
            {...props}
          />
          <span className="text-sm text-ink">{label}</span>
        </label>
        {error && (
          <p className="ml-8 text-xs text-error" role="alert">{error}</p>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'

/* ────────────────────────────────────────────────────── */
/*  Radio                                                 */
/* ────────────────────────────────────────────────────── */

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  label?: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  className?: string
}

export function RadioGroup({ name, label, options, value, onChange, error, className }: RadioGroupProps) {
  return (
    <fieldset className={cn('flex flex-col gap-1', className)} role="radiogroup" aria-label={label}>
      {label && (
        <legend className="mb-2 text-xs font-medium text-muted">{label}</legend>
      )}
      <div className="flex flex-col gap-1">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 transition-colors hover:bg-accent-light',
              option.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={option.disabled}
              onChange={() => onChange?.(option.value)}
              className="h-5 w-5 shrink-0 cursor-pointer border border-border accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <span className="text-sm text-ink">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-xs text-error" role="alert">{error}</p>
      )}
    </fieldset>
  )
}
