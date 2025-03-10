import { withTheme } from '@lambda-feedback-segp-sandbox/styles'
import r2wc from '@r2wc/react-to-web-component'

import { Input } from './Input.component'
import { Wizard } from './Wizard.component'

import { RESPONSE_TYPE, MyResponseAreaTub } from '.'

export const InputWebComponent = r2wc(withTheme(Input), {
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

if (customElements.get(`input-component-${RESPONSE_TYPE}`) == undefined) {
  customElements.define(`input-component-${RESPONSE_TYPE}`, InputWebComponent)
}

export const WizardWebComponent = r2wc(withTheme(Wizard), {
  props: {
    config: 'json',
    handleChange: 'function',
    answer: 'json',
    setAllowSave: 'function',
  },
})

if (customElements.get(`wizard-component-${RESPONSE_TYPE}`) == undefined) {
  customElements.define(`wizard-component-${RESPONSE_TYPE}`, WizardWebComponent)
}

;(parent as any)[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub
;(window as any)[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub
