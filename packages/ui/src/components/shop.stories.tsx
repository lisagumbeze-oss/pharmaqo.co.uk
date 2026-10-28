import type { Meta, StoryObj } from '@storybook/react'
import { FilterPanel, ProductCard } from './shop'
import React, { useState } from 'react'

const meta: Meta = {
  title: 'Components/ShopAndCatalog',
  tags: ['autodocs'],
}

export default meta

export const InteractiveFilterPanel: StoryObj = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
      category: ['protein'],
      goal: ['muscle-growth'],
    })

    const groups = [
      {
        id: 'category',
        label: 'Category',
        type: 'checkbox' as const,
        options: [
          { value: 'protein', label: 'Protein', count: 4 },
          { value: 'creatine', label: 'Creatine', count: 4 },
          { value: 'vitamins', label: 'Vitamins', count: 4 },
          { value: 'pre-workout', label: 'Pre-Workout', count: 4 },
          { value: 'recovery', label: 'Recovery', count: 4 },
        ],
      },
      {
        id: 'goal',
        label: 'Goal',
        type: 'checkbox' as const,
        options: [
          { value: 'muscle-growth', label: 'Build Muscle', count: 8 },
          { value: 'lean-muscle', label: 'Lean Definition', count: 5 },
          { value: 'strength', label: 'Strength & Power', count: 4 },
          { value: 'recovery', label: 'Recovery', count: 6 },
        ],
      },
      {
        id: 'dietary',
        label: 'Dietary & Safety',
        type: 'checkbox' as const,
        options: [
          { value: 'vegan', label: 'Vegan', count: 6 },
          { value: 'gluten-free', label: 'Gluten Free', count: 14 },
          { value: 'stimulant-free', label: 'Stimulant Free', count: 18 },
        ],
      },
    ]

    return (
      <div className="w-80 bg-white p-6 border border-border rounded-xl">
        <FilterPanel
          groups={groups}
          activeFilters={activeFilters}
          onFilterChange={(groupId, values) => {
            setActiveFilters((prev) => ({ ...prev, [groupId]: values }))
          }}
          onClearAll={() => setActiveFilters({})}
        />
      </div>
    )
  },
}

export const DesignSystemProductCard: StoryObj = {
  render: () => (
    <div className="w-72">
      <ProductCard
        name="Whey Isolate 90"
        descriptor="27 g protein per scoop · Vanilla"
        price={3499}
        originalPrice={3999}
        rating={4.9}
        reviewCount={142}
        batchTested={true}
        badges={['Vegan', 'Gluten Free']}
        href="#"
        onQuickAdd={() => alert('Quick added to basket')}
      />
    </div>
  ),
}
