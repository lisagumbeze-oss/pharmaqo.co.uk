import type { Meta, StoryObj } from '@storybook/react'
import { NutritionTable, BatchLookup } from './product-info'

const meta: Meta = {
  title: 'Components/ProductInfoAndBatch',
  tags: ['autodocs'],
}

export default meta

export const NutritionFacts: StoryObj = {
  render: () => (
    <div className="w-[500px]">
      <NutritionTable
        servingSize="30 g (1 level scoop)"
        nutrients={[
          { name: 'Energy', perServing: '470 kJ / 112 kcal', per100g: '1567 kJ / 373 kcal' },
          { name: 'Fat', perServing: '0.4 g', per100g: '1.3 g' },
          { name: 'of which saturates', perServing: '0.2 g', per100g: '0.7 g', indent: true },
          { name: 'Carbohydrate', perServing: '0.6 g', per100g: '2.0 g' },
          { name: 'of which sugars', perServing: '0.4 g', per100g: '1.3 g', indent: true },
          { name: 'Protein (dry basis)', perServing: '25.2 g', per100g: '84.0 g' },
          { name: 'Salt', perServing: '0.15 g', per100g: '0.50 g' },
        ]}
        ingredients="Cross-flow microfiltered whey protein isolate (Milk), Natural Vanilla Flavouring, Sunflower Lecithin, Sweetener (Sucralose)."
        allergens={['Milk']}
        warnings={[
          'Food supplements should not replace a varied, balanced diet and a healthy lifestyle.',
          'Keep out of reach of young children.',
          'Do not exceed the recommended daily dose.',
        ]}
      />
    </div>
  ),
}

export const BatchVerificationCard: StoryObj = {
  render: () => (
    <div className="w-[500px]">
      <BatchLookup
        initialCode="PQ-2401"
        onLookup={async (code) => {
          return {
            batchCode: code,
            productName: 'Whey Protein Isolate · Vanilla',
            testDate: '14 Oct 2026',
            labName: 'ALS Life Sciences UK (ISO 17025)',
            status: 'passed',
            pdfUrl: '#',
            testedFor: 'Purity, heavy metals (Pb, Cd, As, Hg), label accuracy, microbiological safety',
          }
        }}
      />
    </div>
  ),
}
