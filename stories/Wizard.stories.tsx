import { createInitialisedWizard } from '@lambda-feedback-segp-sandbox/response-area-template-lib'
import type { Meta, StoryObj } from '@storybook/react'

import { MyResponseAreaTub } from '../components'

const WizardMeta: Meta = {
  title: 'Wizard',
  component: createInitialisedWizard(() => new MyResponseAreaTub()),
  parameters: { layout: 'centered' },
}
export default WizardMeta

type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
