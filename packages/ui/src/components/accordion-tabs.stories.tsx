import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, Tabs } from './accordion-tabs'

const meta: Meta = {
  title: 'Components/AccordionAndTabs',
  tags: ['autodocs'],
}

export default meta

export const InteractiveAccordion: StoryObj = {
  render: () => (
    <div className="w-[500px]">
      <Accordion
        items={[
          {
            id: 'desc',
            title: 'Description & Label Facts',
            content: (
              <p className="text-sm text-ink-muted">
                100% pure cross-flow micro-filtered whey protein isolate with 25g protein per serving and zero added sugar.
              </p>
            ),
          },
          {
            id: 'batch',
            title: 'Batch Testing & Purity',
            content: (
              <p className="text-sm text-ink-muted">
                Every batch is independently tested by an ISO 17025 accredited UK laboratory for heavy metals, microbial limits, and label claim accuracy.
              </p>
            ),
          },
          {
            id: 'usage',
            title: 'Suggested Use',
            content: (
              <p className="text-sm text-ink-muted">
                Mix 1 rounded scoop (30 g) with 200–250 ml of cold water or milk. Consume within 30 minutes post-workout or between meals.
              </p>
            ),
          },
        ]}
      />
    </div>
  ),
}

export const KeyboardTabs: StoryObj = {
  render: () => (
    <div className="w-[500px]">
      <Tabs
        tabs={[
          {
            id: 'desc',
            label: 'Description',
            content: (
              <p className="py-4 text-sm text-ink-muted">
                State what is in the product and how it is made. Keep strictly to label facts; all health claims require consultant sign-off.
              </p>
            ),
          },
          {
            id: 'nutrition',
            label: 'Nutrition',
            content: (
              <div className="py-4 text-sm">
                <p className="font-semibold text-ink">Serving Size: 30g · 30 Servings</p>
                <p className="text-ink-muted">Energy: 112 kcal | Protein: 25.2g | Carbohydrates: 0.6g | Fat: 0.4g</p>
              </div>
            ),
          },
          {
            id: 'usage',
            label: 'How to use',
            content: (
              <p className="py-4 text-sm text-ink-muted">
                Take 1 serving daily, as stated on the label. Do not exceed the stated serving. Food supplements should not replace a balanced diet.
              </p>
            ),
          },
          {
            id: 'reviews',
            label: 'Reviews (142)',
            content: (
              <p className="py-4 text-sm text-ink-muted">
                Rated 4.9/5 across 142 verified purchases.
              </p>
            ),
          },
        ]}
      />
    </div>
  ),
}
