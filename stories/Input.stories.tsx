import { BaseResponseAreaProps } from '@lambda-feedback-segp-sandbox/response-area'
import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const baseProps: BaseResponseAreaProps = {
  handleChange(
    val: IModularResponseSchema['answer'],
    additionalParams: Record<string, any> | undefined,
  ): void {},
}

const input = () => {
  return new MyResponseAreaTub().InputComponent(baseProps)
}

const WrappedInput = wrapInput(input)

const InputMeta = {
  title: 'Input',
  component: input,
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
