import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import { Wizard } from '../components/Wizard.component'

import { wrapInput } from './input-wrapper'

const WrappedInput: typeof Wizard = wrapInput(Wizard)

const WizardMeta = {
  title: 'Wizard',
  component: Wizard,
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: () => {},
    handleSubmit: fn(),
  },
  render: (args, _) => <WrappedInput {...args} />,
} satisfies Meta<typeof Wizard>

export default WizardMeta
type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
