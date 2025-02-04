import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const WrappedWizard = wrapInput(new MyResponseAreaTub().InputComponent)

const WizardMeta = {
  title: 'Wizard',
  component: WrappedWizard,
  args: {
    handleChange: () => {},
    handleSubmit: fn(),
  },
  render: (args, _) => <WrappedWizard {...args} />,
} satisfies Meta

export default WizardMeta
type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
