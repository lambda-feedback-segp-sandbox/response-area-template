import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import { Input } from '../components/Input.component'

import { wrapInput } from './input-wrapper'

const WrappedInput: typeof Input = wrapInput(Input)

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: { handleChange: () => {}, handleSubmit: fn() },
  render: (args, _) => <WrappedInput {...args} />,
} satisfies Meta<typeof Input>

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
