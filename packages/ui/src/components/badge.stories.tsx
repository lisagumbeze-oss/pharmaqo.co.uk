import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './index'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const BatchTested: Story = {
  args: {
    variant: 'batch-tested',
    children: 'Batch tested',
  },
}

export const Vegan: Story = {
  args: {
    variant: 'vegan',
    children: 'Vegan',
  },
}

export const GlutenFree: Story = {
  args: {
    variant: 'gluten-free',
    children: 'Gluten free',
  },
}

export const Stimulant: Story = {
  args: {
    variant: 'stimulant',
    children: 'Stimulant',
  },
}

export const AgeRestricted: Story = {
  args: {
    variant: 'age-restricted',
    children: '21+',
  },
}

export const LowStock: Story = {
  args: {
    variant: 'low-stock',
    children: 'Low stock',
  },
}

export const AllBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="batch-tested">Batch tested</Badge>
      <Badge variant="vegan">Vegan</Badge>
      <Badge variant="gluten-free">Gluten free</Badge>
      <Badge variant="stimulant">Stimulant</Badge>
      <Badge variant="age-restricted">21+</Badge>
      <Badge variant="new">New</Badge>
      <Badge variant="low-stock">Low stock</Badge>
    </div>
  ),
}
