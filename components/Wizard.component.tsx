import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import {
  BaseResponseAreaProps,
} from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import { makeStyles } from '@lambda-feedback-segp-sandbox/styles'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useCallback } from 'react'

// @ts-ignore
import { Input, InputProps } from './Input.component';

/** Custom input parameters for the Wizard component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaProps} */
export type WizardComponentProps = Omit<
  BaseResponseAreaProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: IModularResponseSchema) => void
  answer?: string
  config: {"fontFamily": string}
}

/** Creates ReactNode rendering the Teacher configuration view, using
 *  {@link WizardComponentProps} */
export const Wizard: React.FC<WizardComponentProps> = ({
  handleChange,
  handleSubmit,
  answer, config,
}) => {
  // The following code is for demonstration purposes only, it can be
  // completely refactored
  const { classes } = useStyles()
  // @ts-ignore
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
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="font-select-label">Font</InputLabel>
          <Select
            labelId="font-select-label"
            onChange={(event) => {
              handleChange(
              { config: {"fontFamily": event.target.value}, answer: '', responseType: ''})}}
            defaultValue={config.fontFamily}
            label="Font"
          >
            <MenuItem value="Arial" sx={{ fontFamily: 'Arial' }}>Arial</MenuItem>
            <MenuItem value="Courier New" sx={{ fontFamily: 'Courier New' }}>Courier New</MenuItem>
            <MenuItem value="Times New Roman" sx={{ fontFamily: 'Times New Roman' }}>Times New Roman</MenuItem>
            <MenuItem value="Cursive" sx={{ fontFamily: 'Cursive' }}>Cursive</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Input
        handleChange={() => {}}
        answer={answer}
        config={config as {"fontFamily": string}}
      />
    </div>
  );
};

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
}));