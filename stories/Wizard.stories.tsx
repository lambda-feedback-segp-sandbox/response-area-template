import type { Meta, StoryObj } from '@storybook/react'

import { initialiseWizard } from './ResponseAreaUtils'

const WizardMeta: Meta = {
  title: 'Wizard',
  parameters: { layout: 'centered' },
  args: {
    handleSubmit: () => {},
  },
  render: args => <WrappedWizard {...args} />,
}

const WrappedWizard = initialiseWizard(WizardMeta.args)

export default WizardMeta
type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
