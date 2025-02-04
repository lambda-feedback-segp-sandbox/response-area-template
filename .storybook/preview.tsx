import '@lambda-feedback-segp-sandbox/styles/styles/globals.css'
import { ThemeProvider } from '@lambda-feedback-segp-sandbox/styles/styles/minimal/theme-provider'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
