import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import { BaseResponseAreaWizardProps } from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { BaseResponseAreaProps } from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { ThemeProvider } from '@lambda-feedback-segp-sandbox/styles/styles/minimal/theme-provider'
import r2wc from '@r2wc/react-to-web-component'
import React from 'react'

import { Input } from './Input.component'
import { Wizard } from './Wizard.component'

import { RESPONSE_TYPE, MyResponseAreaTub } from '.'

/** Creates ReactNode rendering the Student and Teacher preview views, using
 *  {@link WizardComponentProps} */
export const ThemedWizard: React.FC<WizardComponentProps> = props => {
  return (
    <ThemeProvider>
      <Wizard {...props} />
    </ThemeProvider>
  )
}

export const WizardWebComponent = r2wc(ThemedWizard, {
  props: {
    config: 'json',
    handleChange: 'function',
    answer: 'json',
    setAllowSave: 'function',
  },
})

customElements.define('wizard-component', WizardWebComponent)

/** Custom input parameters for the Input component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaWizardProps} */
export type WizardComponentProps = Omit<
  BaseResponseAreaWizardProps,
  'answer'
> & {
  answer?: string
  config: { fontFamily: string }
}
;(parent as any)[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub
;(window as any)[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub

/** Custom input parameters for the Input component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaProps} */
export type InputComponentProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: IModularResponseSchema['answer']) => void
  answer?: string
  config: { fontFamily: string }
}

/** Creates ReactNode rendering the Student and Teacher preview views, using
 *  {@link InputComponentProps} */
export const ThemedInput: React.FC<InputComponentProps> = props => {
  return (
    <ThemeProvider>
      <Input {...props} />
    </ThemeProvider>
  )
}

export const InputWebComponent = r2wc(ThemedInput, {
  props: {
    config: 'json',
    handleChange: 'function',
    handleSubmit: 'function',
    handleDraftSave: 'function',
    answer: 'json',
    displayMode: 'string',
    previewSubmit: 'function',
    responseAreaId: 'string',
    universalResponseAreaId: 'string',
    hasPreview: 'boolean',
    isTeacherMode: 'boolean',
    preResponseText: 'string',
    postResponseText: 'string',
    checkIsLoading: 'boolean',
    feedback: 'json',
    typesafeErrorMessage: 'string',
  },
})

customElements.define('input-component', InputWebComponent)
