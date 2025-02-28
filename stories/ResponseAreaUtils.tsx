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

export const initialiseResponseArea =
  (
    args: any,
    componentType: 'WizardComponent' | 'InputComponent',
  ): React.FC<any> =>
  (props: any) => {
    const [response, setResponse] = useState<IModularResponseSchema | null>()

    const templateResponseAreaTub = new MyResponseAreaTub()

    useEffect(() => {
      // Read from sessionStorage and update state
      const storedValue = sessionStorage.getItem('student.input')
      if (storedValue) {
        const parsedVal = JSON.parse(storedValue)
        if (parsedVal != response) {
          setResponse(parsedVal)
        }
      }
    }, [response])

    console.log('Response: ', response)
    // @ts-ignore
    response?.config
      ? (templateResponseAreaTub.config = response.config)
      : templateResponseAreaTub.initWithDefault()

    // If the component type is WizardComponent, sync response.answer with templateResponseAreaTub.answer
    if (componentType === 'WizardComponent') {
      // @ts-ignore
      templateResponseAreaTub.answer = response?.answer
    } else {
      // If the component type is InputComponent, sync response.answer with templateResponseAreaTub.answer
      // @ts-ignore
      templateResponseAreaTub.answer = response
    }

    console.log('Template Response Area Tub: ', templateResponseAreaTub.answer)
    console.log(
      'Template Response Area Tub Config: ',
      templateResponseAreaTub.config,
    )
    const handleChange = (val: IModularResponseSchema) => {
      if (val?.config) {
        sessionStorage.setItem(WIZARD_KEY, JSON.stringify(val))
      }

      if (componentType == 'InputComponent') {
        sessionStorage.setItem(INPUT_KEY, JSON.stringify(val))
      }

      setResponse(val)
    }

    const Component = templateResponseAreaTub[componentType]

    console.log('response wtf: ', response)

    return (
      <Component
        {...args}
        {...props}
        handleChange={handleChange}
        answer={
          componentType == 'WizardComponent' ? response?.answer : response
        }
        config={response?.config}
      />
    )
  }
