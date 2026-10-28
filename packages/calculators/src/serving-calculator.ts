/**
 * ──────────────────────────────────────────────────────
 *  Serving Calculator
 *
 *  Calculates recommended servings per day based on
 *  body weight and goal, capped at the label maximum.
 *  Outputs cost-per-day and tub lifespan.
 * ──────────────────────────────────────────────────────
 */

import type { ServingInput, ServingResult, Goal } from './types'

/**
 * Target daily protein from supplements (grams per kg body weight).
 * The remainder should come from whole food.
 */
const SUPPLEMENT_PROTEIN_PER_KG: Record<Goal, number> = {
  build: 0.6,   // ~30% of total protein target from supplements
  cut: 0.7,     // slightly higher when cutting (meal replacement)
  maintain: 0.5,
}

/**
 * Calculate recommended daily servings of a protein supplement.
 *
 * @throws {Error} if inputs are out of reasonable range
 */
export function calculateServings(input: ServingInput): ServingResult {
  // ── Validate ──────────────────────────────────────
  if (input.weightKg < 30 || input.weightKg > 300) {
    throw new Error(`Weight must be between 30 and 300 kg. Received: ${input.weightKg}`)
  }
  if (input.proteinPerServing <= 0) {
    throw new Error(`Protein per serving must be positive. Received: ${input.proteinPerServing}`)
  }
  if (input.maxServingsPerDay < 1) {
    throw new Error(`Max servings per day must be at least 1. Received: ${input.maxServingsPerDay}`)
  }
  if (input.servingsPerTub < 1) {
    throw new Error(`Servings per tub must be at least 1. Received: ${input.servingsPerTub}`)
  }
  if (input.pricePence < 0) {
    throw new Error(`Price cannot be negative. Received: ${input.pricePence}`)
  }

  // ── 1. Target supplement protein ──────────────────
  const targetSupplementProtein = input.weightKg * SUPPLEMENT_PROTEIN_PER_KG[input.goal]

  // ── 2. Raw servings needed ────────────────────────
  const rawServings = targetSupplementProtein / input.proteinPerServing

  // ── 3. Cap at label maximum ───────────────────────
  const servingsPerDay = Math.min(
    Math.max(1, Math.round(rawServings)),
    input.maxServingsPerDay,
  )

  // ── 4. Cost and lifespan ──────────────────────────
  const pricePerServing = input.pricePence / input.servingsPerTub
  const costPerDayPence = Math.round(pricePerServing * servingsPerDay)
  const daysPerTub = Math.floor(input.servingsPerTub / servingsPerDay)
  const dailyProteinG = servingsPerDay * input.proteinPerServing

  return {
    servingsPerDay,
    costPerDayPence,
    daysPerTub,
    dailyProteinG,
  }
}
