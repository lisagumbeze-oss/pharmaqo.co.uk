/**
 * ──────────────────────────────────────────────────────
 *  brand.config.ts — Single source of truth for brand identity
 *  Change the values here and every app in the monorepo updates.
 *  Import via: import { brand } from '@pharmaqo/config/brand'
 * ──────────────────────────────────────────────────────
 */

export const brand = {
  /** Display name shown to customers */
  name: 'Pharmaqo',

  /** Legal / trading name */
  legalName: 'Pharmaqo Supplements Ltd',

  /** Short tagline used in meta tags and hero sections */
  tagline: 'Performance Fuel. Science Led.',

  /** Domain (no protocol) */
  domain: 'pharmaqo.co.uk',

  /** Full base URL */
  url: 'https://pharmaqo.co.uk',

  /** Support contact */
  support: {
    email: 'hello@pharmaqo.co.uk',
  },

  /** Social handles */
  social: {
    instagram: '@pharmaqo',
    twitter: '@pharmaqo',
  },

  /** ISO 4217 currency code */
  currency: 'GBP',

  /** Default locale */
  locale: 'en-GB',

  /** Design tokens — also mirrored in Tailwind config */
  colors: {
    ink: '#0E1116',
    paper: '#F6F5F1',
    surface: '#FFFFFF',
    accent: '#19C3A6',
    accentHover: '#12A88E',
    muted: '#5B6470',
    border: '#E3E1DA',
    success: '#1F9D55',
    warning: '#D98A00',
    error: '#D64545',
  },

  /** Typography */
  fonts: {
    display: 'Barlow Condensed',
    body: 'Inter',
  },
} as const

export type Brand = typeof brand
