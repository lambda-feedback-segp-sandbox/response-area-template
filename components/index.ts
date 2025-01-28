import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '@lambda-feedback-segp-sandbox/response-area/base-props.type'
import { ResponseAreaTub } from '@lambda-feedback-segp-sandbox/response-area/response-area-tub'
import { z } from 'zod'

import { Input } from './Input.component'
import { Wizard } from './Wizard.component'

export const responseAnswerSchema = z.string()

export class MyResponseAreaTub extends ResponseAreaTub {
  public readonly responseType = 'REPLACEME'

  public readonly displayWideInput = true

  protected answerSchema = responseAnswerSchema

  protected answer?: string

  InputComponent = (props: BaseResponseAreaProps) => {
    const parsedAnswer = this.answerSchema.safeParse(props.answer)
    return Input({
      ...props,
      answer: parsedAnswer.success ? parsedAnswer.data : undefined,
    })
  }

  WizardComponent = (props: BaseResponseAreaWizardProps) => {
    return Wizard({
      ...props,
      handleChange: answer => {
        props.handleChange({
          responseType: this.responseType,
          answer,
        })
      },
      answer: this.answer,
    })
  }
}
