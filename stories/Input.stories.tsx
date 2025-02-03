import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'

import { MyResponseAreaTub } from '../components'


import { wrapInput } from './input-wrapper'

const initialiseMatrix = (args: any): React.FC<any> => {
  const matrix = new MyResponseAreaTub()
  matrix.initWithDefault()
  return () => matrix.InputComponent(args)
}

const InputMeta = {
  title: 'Input',
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: () => console.log("handleChange() being called from Input"),
    handleSubmit: fn(),
  },
} satisfies Meta

const WrappedInput: React.FC<any> = wrapInput(initialiseMatrix(InputMeta.args))

export default {
  ...InputMeta,
  component: WrappedInput,
  render: (args: any) => <WrappedInput {...args} />,
}

type Story = StoryObj<typeof WrappedInput>
export const Default: Story = {}
