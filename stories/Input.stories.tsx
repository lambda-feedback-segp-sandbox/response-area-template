import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'
import { ResponseAreaView } from '@lambda-feedback-segp-sandbox/response-area/components/ResponseAreaView.component'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const WrappedInput = wrapInput(new MyResponseAreaTub().InputComponent)
const tub = new MyResponseAreaTub()
const InputMeta = {
  title: 'Input',
  component: WrappedInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: () => {},
    handleSubmit: fn(),
  },
  render: (args, _) => <WrappedInput {...args} />,
} satisfies Meta

export default InputMeta
type Story = StoryObj<typeof InputMeta>

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
