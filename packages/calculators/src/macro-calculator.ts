/**
 * ──────────────────────────────────────────────────────
 *  Macro & Calorie Calculator
 *
 *  Method: Mifflin-St Jeor for RMR
 *    Male:   10 × weight(kg) + 6.25 × height(cm) − 5 × age(y) + 5
 *    Female: 10 × weight(kg) + 6.25 × height(cm) − 5 × age(y) − 161
 *
 *  TDEE = RMR × activity factor
 *  Goal adjustment: build +10%, cut −15%, maintain +0%
 *
 *  Macro split:
 *    Protein: 2.0 g/kg (build), 2.2 g/kg (cut), 1.8 g/kg (maintain)
 *    Fat:     25% of calories
 *    Carbs:   remainder
 * ──────────────────────────────────────────────────────
 */

import type { MacroInput, MacroResult, ActivityLevel, Goal } from './types'

const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
}

const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  build: 0.1,
  cut: -0.15,
  maintain: 0,
}

const PROTEIN_PER_KG: Record<Goal, { target: number; min: number; max: number }> = {
  build: { target: 2.0, min: 1.6, max: 2.2 },
  cut: { target: 2.2, min: 1.8, max: 2.4 },
  maintain: { target: 1.8, min: 1.4, max: 2.0 },
}

const FAT_CALORIE_FRACTION = 0.25
const KCAL_PER_G_PROTEIN = 4
const KCAL_PER_G_CARB = 4
const KCAL_PER_G_FAT = 9

/**
 * Calculate daily macros using the Mifflin-St Jeor equation.
 *
 * @throws {Error} if inputs are out of reasonable physiological range
 */
export function calculateMacros(input: MacroInput): MacroResult {
  // ── Validate ──────────────────────────────────────
  if (input.age < 14 || input.age > 120) {
    throw new Error(`Age must be between 14 and 120. Received: ${input.age}`)
  }
  if (input.heightCm < 100 || input.heightCm > 250) {
    throw new Error(`Height must be between 100 and 250 cm. Received: ${input.heightCm}`)
  }
  if (input.weightKg < 30 || input.weightKg > 300) {
    throw new Error(`Weight must be between 30 and 300 kg. Received: ${input.weightKg}`)
  }

  // ── 1. Mifflin-St Jeor RMR ───────────────────────
  const base = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age
  const rmr = input.sex === 'male' ? base + 5 : base - 161

  // ── 2. TDEE ───────────────────────────────────────
  const activityFactor = ACTIVITY_FACTORS[input.activity]
  const tdee = rmr * activityFactor

  // ── 3. Goal-adjusted calories ─────────────────────
  const goalAdj = GOAL_ADJUSTMENTS[input.goal]
  const calories = Math.round(tdee * (1 + goalAdj))

  // ── 4. Macros ─────────────────────────────────────
  const proteinTarget = PROTEIN_PER_KG[input.goal]
  const proteinG = Math.round(input.weightKg * proteinTarget.target)
  const fatG = Math.round((calories * FAT_CALORIE_FRACTION) / KCAL_PER_G_FAT)
  const proteinCals = proteinG * KCAL_PER_G_PROTEIN
  const fatCals = fatG * KCAL_PER_G_FAT
  const carbG = Math.round(Math.max(0, (calories - proteinCals - fatCals) / KCAL_PER_G_CARB))

  return {
    calories,
    proteinG,
    carbG,
    fatG,
    proteinPerKg: { min: proteinTarget.min, max: proteinTarget.max },
    rmr: Math.round(rmr),
    tdee: Math.round(tdee),
  }
}
