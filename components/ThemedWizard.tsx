import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import {
  BaseResponseAreaProps,
} from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { ThemeProvider } from '@lambda-feedback-segp-sandbox/styles/styles/minimal/theme-provider'
import React from 'react'

import { Wizard } from './Wizard.component'

/** Custom input parameters for the Input component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaWizardProps} */
export type WizardComponentProps = Omit<
  BaseResponseAreaWizardProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: IModularResponseSchema['answer']) => void
  answer?: string
  config: {"fontFamily": string}
}

/** Creates ReactNode rendering the Student and Teacher preview views, using
 *  {@link WizardComponentProps} */
export const ThemedWizard: React.FC<WizardComponentProps> = (props) => {
  return (
    <ThemeProvider>
        <Wizard {...props} />
    </ThemeProvider>
  )
}