import type { Preview } from '@storybook/react'
import '../src/storybook.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#F6F5F1' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'ink', value: '#0E1116' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
}

export default preview
