import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import { useEffect, useState } from 'react'

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

    const tub = new MyResponseAreaTub()

    useEffect(() => {
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
    }

    return (
      <tub.InputComponent
        {...args}
        {...props}
        handleChange={handleChange}
        answer={response}
      />
    )
  }
}

export function initialiseWizard<P>(args: P): React.FC<P> {
  return props => {
    const tub = new MyResponseAreaTub()
    tub.initWithDefault()

    const [response, setResponse] = useState<IModularResponseSchema>({
      answer: tub.answer,
      config: tub.config,
      responseType: tub.responseType,
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
    }

    return (
      <tub.WizardComponent
        {...args}
        {...props}
        handleChange={handleChange}
        answer={response?.answer ?? null}
        config={response?.config}
      />
    )
  }
}
