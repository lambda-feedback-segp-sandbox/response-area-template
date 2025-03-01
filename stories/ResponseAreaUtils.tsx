import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { MyResponseAreaTub } from '../components'

const WIZARD_KEY = 'wizard.input'
const INPUT_KEY = 'student.input'

export function initialiseInput<P>(args: P): React.FC<P> {
  return props => {
    const [response, setResponse] = useState<Response | null>()

    const tub = useRef(new MyResponseAreaTub())

    useEffect(() => {
      const storedWizardResponseJson = sessionStorage.getItem(WIZARD_KEY)
      if (storedWizardResponseJson) {
        const storedWizardResponse = JSON.parse(storedWizardResponseJson)
        tub.current.config = storedWizardResponse.config
        console.log('init from storage')
      }

      const storedResponseJson = sessionStorage.getItem(INPUT_KEY)
      if (storedResponseJson) {
        const storedResponse = JSON.parse(storedResponseJson)
        if (!_.isEqual(storedResponse, response)) {
          setResponse(storedResponse)
        }
      }
    }, [response])

    const handleChange = (newResponse: Response) => {
      sessionStorage.setItem(INPUT_KEY, JSON.stringify(newResponse))

      setResponse(newResponse)
    }

    return (
      <tub.current.InputComponent
        {...args}
        {...props}
        // @ts-ignore
        handleChange={handleChange}
        answer={response as string | null | undefined}
        config={tub.current.config}
      />
    )
  }
}

export function initialiseWizard<P>(args: P): React.FC<P> {
  return props => {
    const tub = useRef(new MyResponseAreaTub())

    const [response, setResponse] = useState<IModularResponseSchema>(() => {
      tub.current.initWithDefault()
      return {
        answer: tub.current.answer ?? null,
        config: tub.current.config,
        responseType: tub.current.responseType,
      }
    })

    useEffect(() => {
      const storedResponseJson = sessionStorage.getItem(WIZARD_KEY)
      if (storedResponseJson) {
        const storedResponse = JSON.parse(storedResponseJson)
        if (!_.isEqual(storedResponse, response)) {
          tub.current.initWithResponse(storedResponse)
          setResponse(storedResponse)
        }
      }
    }, [response])

    const handleChange = (newResponse: IModularResponseSchema) => {
      sessionStorage.setItem(WIZARD_KEY, JSON.stringify(newResponse))
      tub.current.initWithResponse(newResponse)
      setResponse(newResponse)
    }

    return (
      <tub.current.WizardComponent
        {...args}
        {...props}
        handleChange={handleChange}
        answer={response?.answer ?? null}
        config={response?.config}
        setAllowSave={_ => {}}
      />
    )
  }
}
