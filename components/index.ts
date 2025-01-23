import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '@lambda-feedback-segp-sandbox/response-area/base-props.type'
import { ResponseAreaTub } from '@lambda-feedback-segp-sandbox/response-area/response-area-tub'
import { z } from 'zod'

import { Input } from './Input.component'

export const responseAnswerSchema = z.array(z.number())

export class MyResponseAreaTub extends ResponseAreaTub {
  public readonly responseType = 'REPLACEME'

  public readonly displayWideInput = true

  protected answerSchema = responseAnswerSchema

  protected answer?: number[]

  InputComponent = (props: BaseResponseAreaProps) => {
    const parsedAnswer = this.answerSchema.safeParse(props.answer)
    return Input({
      ...props,
      answer: parsedAnswer.success ? parsedAnswer.data : undefined,
    })
  }

  WizardComponent = (props: BaseResponseAreaWizardProps) => {
    return Input({
      ...props,
      answer: this.answer,
      handleChange: answer => {
        props.handleChange({
          responseType: this.responseType,
          answer,
        })
      },
    })
  }
}
