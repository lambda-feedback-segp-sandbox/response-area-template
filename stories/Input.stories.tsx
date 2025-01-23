import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

import { Input } from '../components/Input.component'

const WrappedInput: typeof Input = props => {
  const [response, setResponse] = useState<number[] | undefined>(undefined)
  return (
    <Input
      {...props}
      answer={response}
      handleChange={newResponse => {
        setResponse(newResponse ?? undefined),
          localStorage.setItem('response', newResponse?.toString() ?? '')
      }}
    />
  )
}

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
