import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const WrappedInput = wrapInput(new MyResponseAreaTub().InputComponent)
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
