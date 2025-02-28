import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import { useEffect, useRef, useState } from 'react'

import { MyResponseAreaTub } from '../components'

const WIZARD_KEY = 'wizard.input'
const INPUT_KEY = 'student.input'

export const getStoredResponse = (): IModularResponseSchema | null => {
  try {
    const storedResponse = sessionStorage.getItem(WIZARD_KEY)
    return storedResponse ? (JSON.parse(storedResponse) ?? null) : null
  } catch {
    return null // Return null if JSON parsing fails
  }
}

export function initialiseInput<P>(args: P): React.FC<P> {
  return props => {
    const [response, setResponse] = useState<IModularResponseSchema | null>()

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
        if (storedResponse != response) {
          setResponse(storedResponse)
        }
      }
    }, [])

    const handleChange = (newResponse: IModularResponseSchema) => {
      sessionStorage.setItem(INPUT_KEY, JSON.stringify(newResponse))

      setResponse(newResponse)
    }

    return (
      <tub.current.InputComponent
        {...args}
        {...props}
        handleChange={handleChange}
        answer={response}
        config={tub.current.config}
      />
    )
  }
}

export function initialiseWizard<P>(args: P): React.FC<P> {
  return props => {
    const tub = useRef(new MyResponseAreaTub())
    tub.current.initWithDefault()

    const [response, setResponse] = useState<IModularResponseSchema>({
      answer: tub.current.answer,
      config: tub.current.config,
      responseType: tub.current.responseType,
    })

    useEffect(() => {
      const storedResponseJson = sessionStorage.getItem(WIZARD_KEY)
      if (storedResponseJson) {
        const storedResponse = JSON.parse(storedResponseJson)
        if (storedResponse != response) {
          setResponse(storedResponse)
        }
      }
    }, [])

    const handleChange = (newResponse: IModularResponseSchema) => {
      sessionStorage.setItem(WIZARD_KEY, JSON.stringify(newResponse))

      setResponse(newResponse)
    }

    return (
      <tub.current.WizardComponent
        {...args}
        {...props}
        handleChange={handleChange}
        answer={response?.answer ?? null}
        config={response?.config}
      />
    )
  }
}
