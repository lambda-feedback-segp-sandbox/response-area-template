import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

import { EssayInput } from '../components/Essay.component'

const meta = {
  title: 'EssayInput',
  component: EssayInput,
  parameters: {
    layout: 'centered',
  },
  args: { handleSubmit: fn() },
  render: (args, _) => {
    const [response, setResponse] = useState(undefined)

    return (
      <EssayInput
        {...args}
        answer={response}
        handleChange={(newResponse, _) => setResponse(newResponse)}
      />
    )
  },
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
