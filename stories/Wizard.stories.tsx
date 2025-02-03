import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const matrix = new MyResponseAreaTub()

const helper = () => {
  matrix.initWithDefault()
  return matrix.WizardComponent
}

const WrappedWizard = wrapInput(helper())

const WizardMeta = {
  title: 'Wizard',
  component: WrappedWizard,
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: () => {},
    handleSubmit: fn(),
  },
  render: (args, _) => <WrappedWizard {...args} />,
} satisfies Meta

export default WizardMeta
type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
