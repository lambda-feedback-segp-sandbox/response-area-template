import {
  BaseResponseAreaProps,
} from '@lambda-feedback-segp-sandbox/response-area'
import { makeStyles } from '@lambda-feedback-segp-sandbox/styles'
import React, { useCallback } from 'react'

/** Custom input parameters for the Input component, extending or overiding
 *  parameters provided in BaseResponseAreaProps
 *  @see BaseResponseAreaProps */
type InputComponentProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: string) => void
  answer?: string
}

const useStyles = makeStyles()(theme => ({
  textarea: {
    width: '100%',
    minHeight: theme.spacing(20),
  },
}))

/** Creates ReactNode rendering the Student and Teacher preview views, using
 *  InputComponentProps
 * @see InputComponentProps */
export const Input: React.FC<InputComponentProps> = ({
  handleChange,
  handleSubmit,
  answer,
}) => {
  const { classes } = useStyles()
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

  return (
    <textarea
      defaultValue={answer}
      className={classes.textarea}
      onChange={event => {
        handleChange(event.target.value)
      }}
      onKeyDown={submitOnEnter}
      placeholder="Type your response here…"
    />
  )
}
