import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { ResponseAreaTub } from '@lambda-feedback-segp-sandbox/response-area-base/types/response-area-tub'
import React from 'react'
import { z } from 'zod'

import { Input } from './Input.component'
import { inputConfigSchema, inputResponseAnswerSchema } from './Input.schema'
import { Wizard } from './Wizard.component'

export const RESPONSE_TYPE = 'REPLACE_ME'

/** The main class for the custom response area, extends base
 * {@link ResponseAreaTub} abstract class */
export class MyResponseAreaTub extends ResponseAreaTub {
  /** Specifies the label used for selection of the response area in UI */
  public readonly responseType = RESPONSE_TYPE

  /** Enables response area to use full width of the wrapping container */
  public readonly displayWideInput = true

  /** Schema created with Zod library, used to parse the answer for the
   *  response area */
  protected answerSchema = inputResponseAnswerSchema

  /** Main data structure holding the answer for the response area, type of
   *  answer can vary between different response areas, i.e. it might not
   *  necessarily be a string */
  public answer?: z.infer<typeof inputResponseAnswerSchema>

  /* Add a comment here please */
  public config?: z.infer<typeof inputConfigSchema>

  initWithDefault = () => {
    this.config = {
      fontFamily: 'Arial',
    }

    this.answer = ''
  }

  constructor() {
    super()
    this.InputComponent = this.InputComponent.bind(this);
    this.WizardComponent = this.WizardComponent.bind(this);
  }

  /** Creates a main response area component, instantiating a student and
   *  teacher preview views. {@link BaseResponseAreaProps}
   *  @param props - Base parameters passed to all response areas
   *  @returns ReactNode rendering the view
   *  */
  InputComponent(
    props: BaseResponseAreaProps,
  ): HTMLElement {
    this.config = this.config ?? { fontFamily: 'Arial' }
    window[`RA_${RESPONSE_TYPE}_handleChange`] = props.handleChange
    window[`RA_${RESPONSE_TYPE}_handleSubmit`] = props.handleSubmit
    window[`RA_${RESPONSE_TYPE}_handleDraftSave`] = props.handleDraftSave
    window[`RA_${RESPONSE_TYPE}_previewSubmit`] = props.previewSubmit
    return <input-component config={JSON.stringify(this.config)} answer={this.answer}
     display-mode={props.displayMode} response-area-id={props.responseAreaId}
     universal-response-area-id={props.universalResponseAreaId} has-preview={props.hasPreview}
     is-teacher-mode={props.isTeacherMode} pre-response-text={props.preResponseText} 
     post-response-text={props.postResponseText} check-is-loading={props.checkIsLoading} 
     feedback={JSON.stringify(props.feedback)} typesafe-error-message={props.typesafeErrorMessage}
     handle-change={`RA_${RESPONSE_TYPE}_handleChange`} handle-submit={`RA_${RESPONSE_TYPE}_handleSubmit`}
     handle-draft-save={`RA_${RESPONSE_TYPE}_handleDraftSave`} preview-submit={`RA_${RESPONSE_TYPE}_previewSubmit`}
     style={{width: "100%", height: "100%"}}/>
  }

  /** Creates a teacher view, allowing configuration of the response area.
   *  {@link BaseResponseAreaProps}
   *  @param props - Base parameters passed to all response areas
   *  @returns ReactNode rendering the view
   *  */
  WizardComponent(
    props: BaseResponseAreaWizardProps,
  ): HTMLElement {
    if (!this.config) throw new Error('Config missing')
    window[`RA_${RESPONSE_TYPE}_handleChange`] = props.handleChange
    window[`RA_${RESPONSE_TYPE}_setAllowSave`] = props.setAllowSave
    return <wizard-component config={JSON.stringify(this.config)} answer={this.answer} 
            handle-change={`RA_${RESPONSE_TYPE}_handleChange`} set-allow-save={`RA_${RESPONSE_TYPE}_setAllowSave`}
            style={{width: "100%", height: "100%"}}/>
  }
}
