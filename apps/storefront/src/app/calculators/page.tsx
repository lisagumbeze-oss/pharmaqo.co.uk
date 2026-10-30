'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { TubGraphic } from '@pharmaqo/ui'
import {
  calculateMacros,
  calculateServings,
  type Sex,
  type ActivityLevel,
  type Goal,
  type ServingResult,
} from '@pharmaqo/calculators'

function fixedDailyServing(
  servingsPerTub: number,
  pricePence: number,
  servingsPerDay = 1,
): ServingResult {
  return {
    servingsPerDay,
    costPerDayPence: Math.round((pricePence / servingsPerTub) * servingsPerDay),
    daysPerTub: Math.floor(servingsPerTub / servingsPerDay),
    dailyProteinG: 0,
  }
}

export default function CalculatorsPage() {
  const { addItem } = useCart()

  const [age, setAge] = useState<number>(28)
  const [sex, setSex] = useState<Sex>('male')
  const [heightCm, setHeightCm] = useState<number>(180)
  const [weightKg, setWeightKg] = useState<number>(80)
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<Goal>('build')

  // Calculate live using verified @pharmaqo/calculators package
  const targets = calculateMacros({
    age,
    sex,
    heightCm,
    weightKg,
    activity,
    goal,
  })

  // Protein serving recommendation based on user weight
  const proteinServing = calculateServings({
    weightKg,
    goal,
    proteinPerServing: 27,
    maxServingsPerDay: 3,
    servingsPerTub: 30,
    pricePence: 3499,
  })

  // Non-protein products use label daily servings (calculator requires protein > 0)
  const creatineServing = fixedDailyServing(100, 1499)
  const vitaminServing = fixedDailyServing(60, 1899)

  const planProducts = [
    {
      id: 'prod_protein_01',
      why: 'Closes your protein gap',
      name: 'Whey Isolate 90',
      serving: `${proteinServing.servingsPerDay} serving a day · 27 g protein per serving · ${proteinServing.daysPerTub} days per tub`,
      pricePence: 3499,
      costPerDay: `about £${(proteinServing.costPerDayPence / 100).toFixed(2)} a day`,
      tubColor: '#2B3440',
      variant: 'Vanilla · 1 kg',
    },
    {
      id: 'prod_creatine_01',
      why: 'Daily staple',
      name: 'Creatine Monohydrate Pure',
      serving: `${creatineServing.servingsPerDay} serving a day · 5 g per serving · ${creatineServing.daysPerTub} days per tub`,
      pricePence: 1499,
      costPerDay: `about £${(creatineServing.costPerDayPence / 100).toFixed(2)} a day`,
      tubColor: '#19C3A6',
      variant: '500 g · Creapure®',
    },
    {
      id: 'prod_vitamins_01',
      why: 'Covers the basics',
      name: 'Daily Multivitamin Elite',
      serving: `${vitaminServing.servingsPerDay} serving a day · ${vitaminServing.daysPerTub} days per pack`,
      pricePence: 1899,
      costPerDay: `about £${(vitaminServing.costPerDayPence / 100).toFixed(2)} a day`,
      tubColor: '#5B6470',
      variant: '60 tablets · Vegan',
    },
  ]

  const totalPlanPricePence = planProducts.reduce((sum, p) => sum + p.pricePence, 0)
  const totalCostPerDayPence =
    proteinServing.costPerDayPence +
    creatineServing.costPerDayPence +
    vitaminServing.costPerDayPence

  const handleAddWholePlan = () => {
    planProducts.forEach((p) => {
      addItem({
        id: p.id,
        name: p.name,
        price: p.pricePence,
        tubColor: p.tubColor,
        variant: p.variant,
      })
    })
  }

  return (
    <div className="w-full bg-[#F6F5F1] flex flex-col min-h-screen">
      {/* ── Banner Header ─────────────────────────────── */}
      <section className="bg-[#0E1116] text-[#F6F5F1]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12 sm:py-16 flex flex-col gap-3">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-accent">
            Macro and serving calculator
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-7xl leading-[0.95] uppercase text-white">
            Your daily targets
          </h1>
        </div>
      </section>

      {/* ── Calculator & Plan Section ─────────────────── */}
      <section className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-10 sm:py-14 flex flex-wrap gap-10 items-start">
        {/* Left: Input Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex-1 min-w-[320px] max-w-[440px] bg-white border border-[#E3E1DA] rounded-2xl p-7 flex flex-col gap-5 shadow-sm"
        >
          <h2 className="font-display font-bold text-2xl uppercase tracking-[0.03em] text-[#0E1116]">
            Your details
          </h2>

          <div className="flex gap-3.5">
            <div className="flex-1">
              <label htmlFor="c-age" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                Age
              </label>
              <input
                id="c-age"
                type="number"
                min="18"
                max="100"
                value={age}
                onChange={(e) => setAge(Math.max(18, parseInt(e.target.value) || 18))}
                className="w-full h-12 border border-[#CFCDC5] rounded-md px-3.5 text-base bg-white focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="c-sex" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                Sex
              </label>
              <select
                id="c-sex"
                value={sex}
                onChange={(e) => setSex(e.target.value as Sex)}
                className="w-full h-12 border border-[#CFCDC5] rounded-md px-3 text-base bg-white focus:border-accent focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="flex-1">
              <label htmlFor="c-h" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                Height (cm)
              </label>
              <input
                id="c-h"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Math.max(120, parseInt(e.target.value) || 120))}
                className="w-full h-12 border border-[#CFCDC5] rounded-md px-3.5 text-base bg-white focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="c-w" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
                Weight (kg)
              </label>
              <input
                id="c-w"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(40, parseInt(e.target.value) || 40))}
                className="w-full h-12 border border-[#CFCDC5] rounded-md px-3.5 text-base bg-white focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-act" className="block text-xs font-semibold text-[#0E1116] mb-1.5">
              Activity level
            </label>
            <select
              id="c-act"
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityLevel)}
              className="w-full h-12 border border-[#CFCDC5] rounded-md px-3 text-sm bg-white focus:border-accent focus:outline-none"
            >
              <option value="sedentary">Sedentary (office work, little exercise)</option>
              <option value="light">Lightly active (1 to 2 sessions a week)</option>
              <option value="moderate">Moderately active (3 to 5 sessions a week)</option>
              <option value="active">Very active (6 to 7 sessions a week)</option>
              <option value="very-active">Extra active (physical job or twice daily)</option>
            </select>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#0E1116] mb-2">Goal</div>
            <div className="flex gap-2">
              {(['build', 'cut', 'maintain'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    goal === g
                      ? 'bg-[#0E1116] text-[#F6F5F1]'
                      : 'border border-[#CFCDC5] text-[#0E1116] hover:border-accent'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-accent text-[#0E1116] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-accent-hover transition-colors"
          >
            Update my plan
          </button>
        </form>

        {/* Right: Targets & Matched Plan */}
        <div className="flex-[2] min-w-[320px] flex flex-col gap-8">
          {/* 4 Macro Targets Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-xs text-[#5B6470]">Calories a day</span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-[#0E1116] leading-none">
                {targets.calories.toLocaleString()}
              </span>
              <div className="h-2 rounded-full bg-[#ECEAE4] mt-2">
                <div className="w-full h-full rounded-full bg-accent" />
              </div>
              <span className="text-[11px] text-[#5B6470] mt-1">
                {goal === 'build'
                  ? 'TDEE +10% surplus'
                  : goal === 'cut'
                    ? 'TDEE -15% deficit'
                    : 'Maintenance'}
              </span>
            </div>

            <div className="bg-white border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-xs text-[#5B6470]">Protein</span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-[#0E1116] leading-none">
                {targets.proteinG} g
              </span>
              <div className="h-2 rounded-full bg-[#ECEAE4] mt-2">
                <div className="w-[75%] h-full rounded-full bg-accent" />
              </div>
              <span className="text-[11px] text-[#5B6470] mt-1">
                {(targets.proteinG / weightKg).toFixed(1)} g per kg bodyweight
              </span>
            </div>

            <div className="bg-white border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-xs text-[#5B6470]">Carbohydrate</span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-[#0E1116] leading-none">
                {targets.carbG} g
              </span>
              <div className="h-2 rounded-full bg-[#ECEAE4] mt-2">
                <div className="w-[85%] h-full rounded-full bg-accent" />
              </div>
              <span className="text-[11px] text-[#5B6470] mt-1">Energy & muscle glycogen</span>
            </div>

            <div className="bg-white border border-[#E3E1DA] rounded-xl p-5 flex flex-col gap-1.5 shadow-sm">
              <span className="text-xs text-[#5B6470]">Fat</span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-[#0E1116] leading-none">
                {targets.fatG} g
              </span>
              <div className="h-2 rounded-full bg-[#ECEAE4] mt-2">
                <div className="w-[45%] h-full rounded-full bg-accent" />
              </div>
              <span className="text-[11px] text-[#5B6470] mt-1">Hormone balance & health</span>
            </div>
          </div>

          {/* Your Plan */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-end flex-wrap gap-3">
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-[0.02em] text-[#0E1116]">
                Your plan
              </h2>
              <span className="text-xs text-[#5B6470]">Servings are as stated on each label</span>
            </div>

            <div className="flex flex-col gap-3.5">
              {planProducts.map((p) => (
                <article
                  key={p.id}
                  className="bg-white border border-[#E3E1DA] rounded-xl p-4 sm:p-5 flex flex-wrap gap-5 items-center shadow-sm"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-[#ECEAE4] flex items-center justify-center shrink-0">
                    <TubGraphic tubColor={p.tubColor} size="sm" className="h-16" />
                  </div>
                  <div className="flex-1 min-w-[200px] flex flex-col gap-1">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#0B6B5B]">
                      {p.why}
                    </span>
                    <Link
                      href={`/product/${p.id}`}
                      className="font-semibold text-lg text-[#0E1116] hover:text-accent transition-colors"
                    >
                      {p.name}
                    </Link>
                    <span className="text-xs text-[#5B6470]">{p.serving}</span>
                  </div>
                  <div className="flex flex-col min-w-[120px]">
                    <span className="text-lg font-bold text-[#0E1116]">
                      £{(p.pricePence / 100).toFixed(2)}
                    </span>
                    <span className="text-xs text-[#5B6470]">{p.costPerDay}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        id: p.id,
                        name: p.name,
                        price: p.pricePence,
                        tubColor: p.tubColor,
                        variant: p.variant,
                      })
                    }
                    className="inline-flex items-center justify-center h-11 px-5 border-[1.5px] border-[#0E1116] font-display font-bold text-xs uppercase tracking-wider text-[#0E1116] rounded-md hover:bg-[#0E1116] hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </article>
              ))}
            </div>

            {/* Whole Plan Summary Banner */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-[#0E1116] text-[#F6F5F1] rounded-xl p-6 sm:p-7">
              <div>
                <div className="text-xs text-[#C9CDD2]">Whole plan</div>
                <div className="font-display font-bold text-2xl sm:text-4xl text-white">
                  £{(totalPlanPricePence / 100).toFixed(2)} · about £
                  {(totalCostPerDayPence / 100).toFixed(2)} a day
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddWholePlan}
                className="h-14 px-8 rounded-md bg-accent text-[#0E1116] font-display font-bold text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors"
              >
                Add whole plan to basket
              </button>
            </div>

            {/* Mandatory Medical Disclaimer */}
            <p className="text-xs leading-relaxed text-[#5B6470] mt-2">
              Estimates use the Mifflin-St Jeor equation and general activity factors. They are a
              starting point, not medical advice. Speak to a doctor or registered dietitian before
              changing your diet, particularly if you have a health condition, are pregnant or are
              under 18.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
