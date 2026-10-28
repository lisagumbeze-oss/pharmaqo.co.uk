import { describe, it, expect } from 'vitest'
import { calculateServings } from '../src/serving-calculator'
import type { ServingInput } from '../src/types'

describe('calculateServings', () => {
  const base: ServingInput = {
    weightKg: 80,
    goal: 'build',
    proteinPerServing: 27,
    maxServingsPerDay: 3,
    servingsPerTub: 30,
    pricePence: 3499,
  }

  // ── Core logic ──────────────────────────────────

  it('returns servings per day for an 80 kg build goal', () => {
    const result = calculateServings(base)
    // target = 80 × 0.6 = 48g → 48/27 = 1.78 → rounds to 2
    expect(result.servingsPerDay).toBe(2)
  })

  it('caps servings at label maximum', () => {
    const result = calculateServings({
      ...base,
      weightKg: 150, // 150 × 0.6 = 90g → 90/27 = 3.33 → 3, but max is 3
      maxServingsPerDay: 3,
    })
    expect(result.servingsPerDay).toBeLessThanOrEqual(3)
  })

  it('never returns fewer than 1 serving', () => {
    const result = calculateServings({
      ...base,
      weightKg: 30,
      proteinPerServing: 50,
    })
    expect(result.servingsPerDay).toBeGreaterThanOrEqual(1)
  })

  // ── Cost calculations ──────────────────────────

  it('calculates cost per day correctly', () => {
    const result = calculateServings(base)
    const expectedPricePerServing = 3499 / 30
    const expected = Math.round(expectedPricePerServing * result.servingsPerDay)
    expect(result.costPerDayPence).toBe(expected)
  })

  it('calculates days per tub correctly', () => {
    const result = calculateServings(base)
    expect(result.daysPerTub).toBe(Math.floor(30 / result.servingsPerDay))
  })

  // ── Daily protein ───────────────────────────────

  it('calculates daily protein from this product', () => {
    const result = calculateServings(base)
    expect(result.dailyProteinG).toBe(result.servingsPerDay * 27)
  })

  // ── Goal differences ────────────────────────────

  it('recommends more supplement protein for cut than maintain', () => {
    const cut = calculateServings({ ...base, goal: 'cut' })
    const maintain = calculateServings({ ...base, goal: 'maintain' })
    expect(cut.dailyProteinG).toBeGreaterThanOrEqual(maintain.dailyProteinG)
  })

  it('recommends less supplement protein for maintain than build', () => {
    const maintain = calculateServings({ ...base, goal: 'maintain' })
    const build = calculateServings({ ...base, goal: 'build' })
    expect(maintain.dailyProteinG).toBeLessThanOrEqual(build.dailyProteinG)
  })

  // ── Free product (edge case) ────────────────────

  it('handles a free product (0 pence)', () => {
    const result = calculateServings({ ...base, pricePence: 0 })
    expect(result.costPerDayPence).toBe(0)
  })

  // ── Validation ──────────────────────────────────

  it('throws for weight below 30 kg', () => {
    expect(() => calculateServings({ ...base, weightKg: 20 })).toThrow('Weight must be between')
  })

  it('throws for weight above 300 kg', () => {
    expect(() => calculateServings({ ...base, weightKg: 350 })).toThrow('Weight must be between')
  })

  it('throws for zero protein per serving', () => {
    expect(() => calculateServings({ ...base, proteinPerServing: 0 })).toThrow(
      'Protein per serving must be positive',
    )
  })

  it('throws for negative protein per serving', () => {
    expect(() => calculateServings({ ...base, proteinPerServing: -5 })).toThrow(
      'Protein per serving must be positive',
    )
  })

  it('throws for max servings below 1', () => {
    expect(() => calculateServings({ ...base, maxServingsPerDay: 0 })).toThrow(
      'Max servings per day must be at least 1',
    )
  })

  it('throws for servings per tub below 1', () => {
    expect(() => calculateServings({ ...base, servingsPerTub: 0 })).toThrow(
      'Servings per tub must be at least 1',
    )
  })

  it('throws for negative price', () => {
    expect(() => calculateServings({ ...base, pricePence: -100 })).toThrow(
      'Price cannot be negative',
    )
  })
})
