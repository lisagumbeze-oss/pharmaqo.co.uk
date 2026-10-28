import { describe, it, expect } from 'vitest'
import { calculateMacros } from '../src/macro-calculator'
import type { MacroInput } from '../src/types'

describe('calculateMacros', () => {
  const baseMale: MacroInput = {
    age: 30,
    sex: 'male',
    heightCm: 180,
    weightKg: 80,
    activity: 'moderate',
    goal: 'maintain',
  }

  const baseFemale: MacroInput = {
    age: 28,
    sex: 'female',
    heightCm: 165,
    weightKg: 60,
    activity: 'moderate',
    goal: 'maintain',
  }

  // ── Mifflin-St Jeor correctness ─────────────────

  it('calculates correct RMR for a 30yo male, 180cm, 80kg', () => {
    const result = calculateMacros(baseMale)
    // 10×80 + 6.25×180 − 5×30 + 5 = 800 + 1125 − 150 + 5 = 1780
    expect(result.rmr).toBe(1780)
  })

  it('calculates correct RMR for a 28yo female, 165cm, 60kg', () => {
    const result = calculateMacros(baseFemale)
    // 10×60 + 6.25×165 − 5×28 − 161 = 600 + 1031.25 − 140 − 161 = 1330 (rounded)
    expect(result.rmr).toBe(1330)
  })

  it('applies moderate activity factor (1.55) to TDEE', () => {
    const result = calculateMacros(baseMale)
    // 1780 × 1.55 = 2759
    expect(result.tdee).toBe(2759)
  })

  // ── Goal adjustments ────────────────────────────

  it('adds 10% for build goal', () => {
    const result = calculateMacros({ ...baseMale, goal: 'build' })
    // TDEE = 2759, +10% = 3034.9 → 3035
    expect(result.calories).toBe(3035)
  })

  it('subtracts 15% for cut goal', () => {
    const result = calculateMacros({ ...baseMale, goal: 'cut' })
    // TDEE = 2759, −15% = 2345.15 → 2345
    expect(result.calories).toBe(2345)
  })

  it('keeps TDEE unchanged for maintain goal', () => {
    const result = calculateMacros(baseMale)
    expect(result.calories).toBe(result.tdee)
  })

  // ── Activity levels ─────────────────────────────

  it('returns lowest calories for sedentary', () => {
    const sedentary = calculateMacros({ ...baseMale, activity: 'sedentary' })
    const active = calculateMacros({ ...baseMale, activity: 'active' })
    expect(sedentary.calories).toBeLessThan(active.calories)
  })

  it('returns highest calories for very-active', () => {
    const veryActive = calculateMacros({ ...baseMale, activity: 'very-active' })
    const moderate = calculateMacros({ ...baseMale, activity: 'moderate' })
    expect(veryActive.calories).toBeGreaterThan(moderate.calories)
  })

  // ── Macro splits ────────────────────────────────

  it('sets protein at 1.8 g/kg for maintain goal', () => {
    const result = calculateMacros(baseMale)
    expect(result.proteinG).toBe(Math.round(80 * 1.8))
  })

  it('sets protein at 2.0 g/kg for build goal', () => {
    const result = calculateMacros({ ...baseMale, goal: 'build' })
    expect(result.proteinG).toBe(Math.round(80 * 2.0))
  })

  it('sets protein at 2.2 g/kg for cut goal', () => {
    const result = calculateMacros({ ...baseMale, goal: 'cut' })
    expect(result.proteinG).toBe(Math.round(80 * 2.2))
  })

  it('allocates 25% of calories to fat', () => {
    const result = calculateMacros(baseMale)
    const fatCals = result.fatG * 9
    const ratio = fatCals / result.calories
    expect(ratio).toBeCloseTo(0.25, 1)
  })

  it('ensures macros sum approximately to total calories', () => {
    const result = calculateMacros(baseMale)
    const totalFromMacros = result.proteinG * 4 + result.carbG * 4 + result.fatG * 9
    // Allow ±10 kcal rounding tolerance
    expect(Math.abs(totalFromMacros - result.calories)).toBeLessThanOrEqual(10)
  })

  it('never returns negative carbs', () => {
    // Extreme high-protein scenario
    const result = calculateMacros({
      ...baseMale,
      activity: 'sedentary',
      goal: 'cut',
      weightKg: 120,
    })
    expect(result.carbG).toBeGreaterThanOrEqual(0)
  })

  // ── Protein range ───────────────────────────────

  it('returns a protein range per kg', () => {
    const result = calculateMacros(baseMale)
    expect(result.proteinPerKg.min).toBeLessThan(result.proteinPerKg.max)
    expect(result.proteinPerKg.min).toBeGreaterThan(0)
  })

  // ── Validation ──────────────────────────────────

  it('throws for age below 14', () => {
    expect(() => calculateMacros({ ...baseMale, age: 10 })).toThrow('Age must be between')
  })

  it('throws for age above 120', () => {
    expect(() => calculateMacros({ ...baseMale, age: 130 })).toThrow('Age must be between')
  })

  it('throws for height below 100 cm', () => {
    expect(() => calculateMacros({ ...baseMale, heightCm: 50 })).toThrow('Height must be between')
  })

  it('throws for weight below 30 kg', () => {
    expect(() => calculateMacros({ ...baseMale, weightKg: 20 })).toThrow('Weight must be between')
  })

  it('throws for weight above 300 kg', () => {
    expect(() => calculateMacros({ ...baseMale, weightKg: 350 })).toThrow('Weight must be between')
  })

  // ── Edge cases ──────────────────────────────────

  it('handles minimum valid inputs', () => {
    const result = calculateMacros({
      age: 14,
      sex: 'female',
      heightCm: 100,
      weightKg: 30,
      activity: 'sedentary',
      goal: 'maintain',
    })
    expect(result.calories).toBeGreaterThan(0)
    expect(result.proteinG).toBeGreaterThan(0)
  })

  it('handles maximum valid inputs', () => {
    const result = calculateMacros({
      age: 120,
      sex: 'male',
      heightCm: 250,
      weightKg: 300,
      activity: 'very-active',
      goal: 'build',
    })
    expect(result.calories).toBeGreaterThan(0)
  })
})
