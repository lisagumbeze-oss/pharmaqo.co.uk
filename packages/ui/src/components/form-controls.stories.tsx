import type { Meta, StoryObj } from '@storybook/react'
import { Input, Select, QuantitySelector } from './index'
import { Checkbox, RadioGroup } from './form-controls'

const meta: Meta = {
  title: 'Components/FormControls',
  tags: ['autodocs'],
}

export default meta

export const DefaultInput: StoryObj = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input label="Email address" placeholder="you@domain.co.uk" />
      <Input label="Batch code" placeholder="e.g. PQ-2401" />
      <Input label="Age" error="Must be 18 or older to purchase" defaultValue="16" />
    </div>
  ),
}

export const SelectMenu: StoryObj = {
  render: () => (
    <div className="w-80 space-y-4">
      <Select label="Goal">
        <option>Build lean muscle (+10%)</option>
        <option>Cut body fat (-15%)</option>
        <option>Maintain weight</option>
      </Select>
      <Select label="Activity level">
        <option>Moderately active (3 to 5 sessions a week)</option>
        <option>Lightly active (1 to 2 sessions)</option>
        <option>Very active (6 to 7 sessions)</option>
      </Select>
    </div>
  ),
}

export const FormCheckbox: StoryObj = {
  render: () => (
    <div className="w-80 space-y-4">
      <Checkbox label="I confirm I am 21 years of age or older" name="age-confirm" />
      <Checkbox label="Subscribe to weekly training and nutrition notes" defaultChecked />
      <Checkbox label="Disabled option" disabled />
      <Checkbox label="I accept the terms" error="You must accept to continue" />
    </div>
  ),
}

export const RadioOptions: StoryObj = {
  render: () => (
    <div className="w-80">
      <RadioGroup
        name="purchase-mode"
        label="Purchase option"
        defaultValue="one-time"
        options={[
          { value: 'one-time', label: 'One-time purchase', description: '£34.99' },
          { value: 'sub-save', label: 'Subscribe and save 15%', description: '£29.74 · delivered every 30 days, cancel anytime' },
        ]}
      />
    </div>
  ),
}

export const Quantity: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <QuantitySelector value={1} min={1} max={10} />
      <QuantitySelector value={5} min={1} max={10} />
    </div>
  ),
}
