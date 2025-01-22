import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

import { EssayInput } from '../components/Essay.component'

const WrappedInput: typeof EssayInput = props => {
  const [response, setResponse] = useState<string | undefined>(undefined)

  return (
    <EssayInput
      {...props}
      answer={response}
      handleChange={(newResponse, _) => setResponse(newResponse)}
    />
  )
}

const meta = {
  title: 'EssayInput',
  component: EssayInput,
  parameters: {
    layout: 'centered',
  },
  args: { handleChange: () => {}, handleSubmit: fn() },
  render: (args, _) => <WrappedInput {...args} />,
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
