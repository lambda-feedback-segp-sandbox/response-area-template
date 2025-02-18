import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import {
  BaseResponseAreaProps,
} from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { ThemeProvider } from '@lambda-feedback-segp-sandbox/styles/styles/minimal/theme-provider'
import React from 'react'

import { Input } from './Input.component'

/** Custom input parameters for the Input component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaProps} */
export type InputComponentProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: IModularResponseSchema['answer']) => void
  answer?: string
  config: {"fontFamily": string}
}

/** Creates ReactNode rendering the Student and Teacher preview views, using
 *  {@link InputComponentProps} */
export const ThemedInput: React.FC<InputComponentProps> = (props) => {
  return (
    <ThemeProvider>
        <Input {...props} />
    </ThemeProvider>
  )
}

