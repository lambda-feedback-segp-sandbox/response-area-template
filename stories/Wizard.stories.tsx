import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import type { Meta, StoryObj } from '@storybook/react'

import { initialiseWizard } from './ResponseAreaUtils'

const WizardMeta: Meta = {
  title: 'Wizard',
  parameters: { layout: 'centered' },
  args: {
    inputModifiedCallback: (val: IModularResponseSchema) => {},
    handleSubmit: () => {},
  },
  render: args => <WrappedWizard {...args} />,
}

const WrappedWizard = initialiseWizard(WizardMeta.args, 'WizardComponent')

export default WizardMeta
type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
