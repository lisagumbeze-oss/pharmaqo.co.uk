import type { Meta, StoryObj } from '@storybook/react'
import { TrustBar } from './trust-bar'

const meta: Meta<typeof TrustBar> = {
  title: 'Components/TrustBar',
  component: TrustBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TrustBar>

export const Default: Story = {
  args: {},
}

export const VerticalCards: Story = {
  args: {
    layout: 'cards',
  },
}
