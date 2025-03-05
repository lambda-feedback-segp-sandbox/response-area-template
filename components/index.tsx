import {
  DEFAULT_COLS,
  DEFAULT_ROWS,
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
  ResponseAreaTub,
} from '@lambda-feedback-segp-sandbox/response-area-base'
import { JSX } from 'react'

import { Response, Config } from './Input.schema'

import { padMatrixFromRowsAndCols } from './helpers'
import _ from 'lodash'

export * from './Input.schema'

export const RESPONSE_TYPE = 'matrixweb'

/** The main class for the custom response area, extends base
 * {@link ResponseAreaTub} abstract class */
export class MyResponseAreaTub extends ResponseAreaTub {
  /** Specifies the label used for selection of the response area in UI */
  public readonly responseType = RESPONSE_TYPE

  /** Enables response area to use full width of the wrapping container */
  public readonly displayWideInput = true

  /** Schema created with Zod library, used to parse the answer for the
   *  response area */
  answerSchema = Response
  
  configSchema = Config

  /** Main data structure holding the answer for the response area, type of
   *  answer can vary between different response areas, i.e. it might not
   *  necessarily be a string */
  protected _answer?: Response
  protected _config?: Config
  
  get answer(): Response | undefined {
    return this._answer
  }

  private InputTag = `input-component-${this.responseType}` as keyof JSX.IntrinsicElements;
  private WizardTag = `wizard-component-${this.responseType}` as keyof JSX.IntrinsicElements;

  /* Add a comment here please */
  // protected _config?: Config
  // get config(): Config | undefined {
  //   return this._config
  // }
  initWithDefault = () => {
    this._config = {
      rows: DEFAULT_ROWS,
      cols: DEFAULT_COLS,
    }
    this._answer = padMatrixFromRowsAndCols({
      rows: DEFAULT_ROWS,
      cols: DEFAULT_COLS,
    })
  }

  protected extractAnswer = (provided: any): void => {
    if (!this._config) throw new Error('Config missing')
    if (!Array.isArray(provided)) throw new Error('Answer is not an array')

    // legacy handling: answer used to be stored as a one-dimensional array. This
    // checks which format the answer is in and converts it to a two-dimensional
    // array if necessary
    const isChuncked = Array.isArray(provided[0])
    let answerToParse: Response
    if (isChuncked) {
      answerToParse = provided
    } else {
      answerToParse = _.chunk(provided, this._config.cols)
    }
    const parsedAnswer = this.answerSchema.safeParse(answerToParse)
    if (!parsedAnswer.success) throw new Error('Could not extract answer')

    this._answer = parsedAnswer.data
  }

  constructor() {
    super()
    this.InputComponent = this.InputComponent.bind(this)
    this.WizardComponent = this.WizardComponent.bind(this)
  }
  InputComponent: React.FC<BaseResponseAreaProps> = props => {
    ;(window as any)[`RA_${props.universalResponseAreaId}_handleChange`] = props.handleChange
    ;(window as any)[`RA_${props.universalResponseAreaId}_handleSubmit`] = props.handleSubmit
    ;(window as any)[`RA_${props.universalResponseAreaId}_handleDraftSave`] =
      props.handleDraftSave
    ;(window as any)[`RA_${props.universalResponseAreaId}_previewSubmit`] = props.previewSubmit

    return (
      <this.InputTag
        config={JSON.stringify(props.config ?? {})}
        answer={JSON.stringify(props.answer)}
        display-mode={props.displayMode}
        response-area-id={props.responseAreaId}
        universal-response-area-id={props.universalResponseAreaId}
        has-preview={props.hasPreview}
        is-teacher-mode={props.isTeacherMode}
        pre-response-text={props.preResponseText}
        post-response-text={props.postResponseText}
        check-is-loading={props.checkIsLoading}
        feedback={JSON.stringify(props.feedback)}
        typesafe-error-message={props.typesafeErrorMessage}
        handle-change={`RA_${props.universalResponseAreaId}_handleChange`}
        handle-submit={`RA_${props.universalResponseAreaId}_handleSubmit`}
        handle-draft-save={`RA_${props.universalResponseAreaId}_handleDraftSave`}
        preview-submit={`RA_${props.universalResponseAreaId}_previewSubmit`}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }

  /** Creates a teacher view, allowing configuration of the response area.
   *  {@link BaseResponseAreaWizardProps}
   *  @param props - Base parameters passed to all response areas
   *  @returns ReactNode rendering the view
   *  */
  WizardComponent: React.FC<BaseResponseAreaWizardProps> = props => {
    if (!this.config) throw new Error('Config missing')
    ;(window as any)[`RA_${RESPONSE_TYPE}_handleChange`] = props.handleChange
    ;(window as any)[`RA_${RESPONSE_TYPE}_setAllowSave`] = props.setAllowSave

    return (
      <this.WizardTag
        config={JSON.stringify(this.config)}
        answer={JSON.stringify(this.answer)}
        handle-change={`RA_${RESPONSE_TYPE}_handleChange`}
        set-allow-save={`RA_${RESPONSE_TYPE}_setAllowSave`}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }
}
