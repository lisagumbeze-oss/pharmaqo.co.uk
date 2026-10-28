import type { Meta, StoryObj } from '@storybook/react'
import { PriceBlock } from './price-block'

const meta: Meta<typeof PriceBlock> = {
  title: 'Components/PriceBlock',
  component: PriceBlock,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PriceBlock>

export const Standard: Story = {
  args: {
    price: 3499,
    servingsPerTub: 30,
  },
}

export const DiscountedWithServingCost: Story = {
  args: {
    price: 2999,
    originalPrice: 3999,
    perServingPence: 100,
    servingsPerTub: 30,
  },
}

export const SubscribeAndSave: Story = {
  args: {
    price: 3499,
    subscribePrice: 2974,
    discountPercent: 15,
    servingsPerTub: 30,
  },
}
