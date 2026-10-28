import { clsx, type ClassValue } from 'clsx'

/** Merge class names — wraps clsx for convenience */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export { clsx }
