import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Shop all products',
    variant: 'primary',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Build my plan',
    variant: 'secondary',
    size: 'md',
  },
}

export const TextLink: Story = {
  args: {
    children: 'View all products',
    variant: 'text',
    size: 'md',
  },
}

export const Loading: Story = {
  args: {
    children: 'Adding to basket...',
    variant: 'primary',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Out of stock',
    variant: 'primary',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    children: 'Quick add',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Start the calculator',
    size: 'lg',
  },
}
