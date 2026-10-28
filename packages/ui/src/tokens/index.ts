/**
 * ──────────────────────────────────────────────────────
 *  Design tokens — exported as plain objects.
 *  These mirror the Tailwind @theme block in globals.css
 *  so JS code can reference the same values.
 * ──────────────────────────────────────────────────────
 */

export const colors = {
  ink: '#0E1116',
  paper: '#F6F5F1',
  surface: '#FFFFFF',
  accent: '#19C3A6',
  accentHover: '#12A88E',
  accentLight: 'rgba(25, 195, 166, 0.1)',
  muted: '#5B6470',
  border: '#E3E1DA',
  borderDark: '#2A2D33',
  success: '#1F9D55',
  warning: '#D98A00',
  error: '#D64545',
  inkInverse: '#F6F5F1',
  surfaceDark: '#1A1D23',
} as const

export const fonts = {
  display: "'Barlow Condensed', ui-sans-serif, system-ui, sans-serif",
  body: "'Inter', ui-sans-serif, system-ui, sans-serif",
} as const

/** px values — use for spacing, padding, margins */
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const

/** px values — type scale */
export const typeScale = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '22px',
  '2xl': '28px',
  '3xl': '36px',
  '4xl': '48px',
  '5xl': '64px',
} as const

export const radii = {
  sm: '6px',
  md: '12px',
  full: '999px',
} as const

export const shadows = {
  sm: '0 1px 2px rgba(14, 17, 22, 0.06)',
  md: '0 8px 24px rgba(14, 17, 22, 0.08)',
} as const

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

export const motion = {
  hover: '150ms ease-out',
  drawer: '250ms cubic-bezier(0.16, 1, 0.3, 1)',
} as const
