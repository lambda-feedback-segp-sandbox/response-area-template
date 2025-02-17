import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { ResponseAreaTub } from '@lambda-feedback-segp-sandbox/response-area-base/types/response-area-tub'
import { ReactNode } from 'react'
import { z } from 'zod'

import { Input } from './Input.component'
import { inputConfigSchema, inputResponseAnswerSchema } from './Input.schema'
import { Wizard } from './Wizard.component'

/** The main class for the custom response area, extends base
 * {@link ResponseAreaTub} abstract class */
export class MyResponseAreaTub extends ResponseAreaTub {
  /** Specifies the label used for selection of the response area in UI */
  public readonly responseType = 'REPLACE_ME'

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
      fontFamily: "Arial",
    }

    this.answer = ""
  }


  /** Creates a main response area component, instantiating a student and
   *  teacher preview views. {@link BaseResponseAreaProps}
   *  @param props - Base parameters passed to all response areas
   *  @returns ReactNode rendering the view
   *  */
  InputComponent = (props: BaseResponseAreaProps): ReactNode => {
    this.config = this.config ?? { fontFamily: 'Arial' }

    return (<Input {...props} config={this.config} answer={this.answer} />);
  };

  /** Creates a teacher view, allowing configuration of the response area.
   *  {@link BaseResponseAreaProps}
   *  @param props - Base parameters passed to all response areas
   *  @returns ReactNode rendering the view
   *  */
  WizardComponent = (props: BaseResponseAreaWizardProps): ReactNode => {
    if (!this.config) throw new Error('Config missing')
    this.answer = this.answer ?? ""

    return Wizard({
      ...props, config: this.config, answer: this.answer,
    })
  }
}
