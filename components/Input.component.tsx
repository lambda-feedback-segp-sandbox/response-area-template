import { BaseResponseAreaProps } from '@lambda-feedback-segp-sandbox/response-area/base-props.type'
import { makeStyles } from '@lambda-feedback-segp-sandbox/styles'
import React, { useCallback } from 'react'

import {Config} from "./index"

export type InputProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: string, _: any) => void
  answer?: string
  config: Config
}

export const Input: React.FC<InputProps> = ({
  handleChange,
  handleSubmit,
  answer,
  config
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
        handleChange(event.target.value, null)
      }}
      onKeyDown={submitOnEnter}
      placeholder="Type your response here…"
      style={{"fontFamily": config.styles.fontFamily.get()}}
    />
  )
}

const useStyles = makeStyles()(theme => ({
  textarea: {
    width: '100%',
    minHeight: theme.spacing(20)
  },
}))
