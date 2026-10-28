import type { Meta, StoryObj } from '@storybook/react'
import { TubGraphic } from './tub-graphic'

const meta: Meta<typeof TubGraphic> = {
  title: 'Components/TubGraphic',
  component: TubGraphic,
  tags: ['autodocs'],
  argTypes: {
    tubColor: { control: 'color' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof TubGraphic>

export const CreatineTub: Story = {
  args: {
    tubColor: '#19C3A6',
    size: 'lg',
  },
}

export const ProteinTub: Story = {
  args: {
    tubColor: '#2B3440',
    size: 'lg',
  },
}

export const VitaminsTub: Story = {
  args: {
    tubColor: '#5B6470',
    size: 'lg',
  },
}

export const PreWorkoutTub: Story = {
  args: {
    tubColor: '#0E1116',
    size: 'lg',
  },
}

export const RecoveryTub: Story = {
  args: {
    tubColor: '#3A4452',
    size: 'lg',
  },
}

export const CategoryTubsLineup: StoryObj = {
  render: () => (
    <div className="flex items-end gap-6 bg-[#1A2029] p-8 rounded-2xl">
      <TubGraphic tubColor="#2B3440" size="md" />
      <TubGraphic tubColor="#19C3A6" size="lg" />
      <TubGraphic tubColor="#5B6470" size="md" />
      <TubGraphic tubColor="#0E1116" size="sm" />
      <TubGraphic tubColor="#3A4452" size="md" />
    </div>
  ),
}
