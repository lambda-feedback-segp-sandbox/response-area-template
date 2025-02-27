import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import { BaseResponseAreaProps } from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { makeStyles } from '@lambda-feedback-segp-sandbox/styles'
import React, { useCallback, useState } from 'react'

/** Custom input parameters for the Input component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaProps} */
export type InputComponentProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: IModularResponseSchema['answer']) => void
  answer?: string
  config: { fontFamily: string }
}

//@ts-ignore
const useStyles = makeStyles()(theme => ({
  textarea: {
    width: '100%',
    minHeight: theme.spacing(20),
  },
}))

/** Creates ReactNode rendering the Student and Teacher preview views, using
 *  {@link InputComponentProps} */
export const Input: React.FC<InputComponentProps> = ({
                                                       handleChange,
                                                       handleSubmit,
                                                       config,
                                                       answer,
                                                     }) => {
  const { classes } = useStyles()

  console.log('Answer in Input: ', answer)

  // State to store the input value
  const [inputValue, setInputValue] = useState(answer)
  console.log('Input Value: ', inputValue)

  const submitOnEnter: React.KeyboardEventHandler<HTMLTextAreaElement> =
    useCallback(
      event => {
        const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
        if (
          event.key === 'Enter' &&
          ((isMac && event.metaKey) || (!isMac && event.ctrlKey))
        ) {
          return handleSubmit?.()
        }
      },
      [handleSubmit],
    )

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    handleChange(newValue) // Propagate change
  }

  return (
    <textarea
      className={classes.textarea}
      onKeyDown={submitOnEnter}
      onChange={handleInputChange}
      placeholder="Type your response here…"
      style={{ fontFamily: config.fontFamily }}
      value={inputValue} // Bind state to input
    />
  )
}
