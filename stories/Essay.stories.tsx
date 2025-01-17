import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { EssayInput } from '../components/Essay.component'

const meta = {
  title: 'EssayInput',
  component: EssayInput,
  parameters: {
    layout: 'centered',
  },
  args: { handleChange: () => {}, handleSubmit: fn() },
} satisfies Meta<typeof EssayInput>

export default meta
type Story = StoryObj<typeof meta>

export const StudentView: Story = {
  args: {
    isTeacherMode: false,
  },
}

export const TeacherView: Story = {
  args: {
    isTeacherMode: true,
  },
}
