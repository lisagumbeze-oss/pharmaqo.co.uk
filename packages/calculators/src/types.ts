/**
 * ──────────────────────────────────────────────────────
 *  Shared types for calculator inputs and outputs
 * ──────────────────────────────────────────────────────
 */

export type Sex = 'male' | 'female'

export type ActivityLevel =
  | 'sedentary'       // desk job, no exercise
  | 'light'           // 1-3 days/week
  | 'moderate'        // 3-5 days/week
  | 'active'          // 6-7 days/week
  | 'very-active'     // physical job + daily training

export type Goal = 'build' | 'cut' | 'maintain'

export interface MacroInput {
  age: number          // years
  sex: Sex
  heightCm: number     // centimetres
  weightKg: number     // kilograms
  activity: ActivityLevel
  goal: Goal
}

export interface MacroResult {
  /** Total daily calories (kcal) */
  calories: number
  /** Protein in grams */
  proteinG: number
  /** Carbohydrate in grams */
  carbG: number
  /** Fat in grams */
  fatG: number
  /** Protein range per kg body weight */
  proteinPerKg: { min: number; max: number }
  /** Resting metabolic rate before activity multiplier */
  rmr: number
  /** TDEE before goal adjustment */
  tdee: number
}

export interface ServingInput {
  weightKg: number
  goal: Goal
  /** Protein per serving from the label (grams) */
  proteinPerServing: number
  /** Max daily servings from the label */
  maxServingsPerDay: number
  /** Total servings in the tub */
  servingsPerTub: number
  /** Price of the tub in pence */
  pricePence: number
}

export interface ServingResult {
  /** Recommended servings per day (capped at label max) */
  servingsPerDay: number
  /** Cost per day in pence */
  costPerDayPence: number
  /** How many days one tub lasts */
  daysPerTub: number
  /** Daily protein from this product in grams */
  dailyProteinG: number
}
