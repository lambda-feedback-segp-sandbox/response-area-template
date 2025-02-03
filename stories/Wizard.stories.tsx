import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import { MyResponseAreaTub } from '../components'


import { wrapInput } from './input-wrapper'

const initialiseMatrix = (args: any): React.FC<any> => {
  const matrix = new MyResponseAreaTub()
  matrix.initWithDefault()
  return () => matrix.WizardComponent(args)
}

const WizardMeta = {
  title: 'Wizard',
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: () => console.log("handleChange() being called from Wizard"),
    handleSubmit: fn(),
  },
} satisfies Meta

const WrappedWizard: React.FC<any> = wrapInput(initialiseMatrix(WizardMeta.args))

export default {
  ...WizardMeta,
  component: WrappedWizard,
  render: (args: any) => <WrappedWizard {...args} />,
}

type Story = StoryObj<typeof WrappedWizard>
export const Default: Story = {}
