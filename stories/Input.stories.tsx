import { createInitialisedInput } from '@lambda-feedback-segp-sandbox/response-area-template-lib'
import type { Meta, StoryObj } from '@storybook/react'

import { MyResponseAreaTub } from '../components'

const InputMeta: Meta = {
  component: createInitialisedInput(() => new MyResponseAreaTub()),
  title: 'Input',
  parameters: {
    layout: 'centered',
  },
}
export default InputMeta

type Story = StoryObj<typeof InputMeta>

export const StudentView: Story = {
  args: { isTeacherMode: false },
}

export const TeacherView: Story = {
  args: { isTeacherMode: true },
}
