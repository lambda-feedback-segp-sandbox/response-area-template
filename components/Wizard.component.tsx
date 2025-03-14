import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import { BaseResponseAreaWizardProps } from '@lambda-feedback-segp-sandbox/response-area-base/types/base-props.type'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'

import { Input } from './Input.component'
import { RESPONSE_TYPE } from './constants'

/** Custom input parameters for the Wizard component, extending or overriding
 *  parameters provided in {@link BaseResponseAreaWizardProps} */
export type WizardProps = Omit<
  BaseResponseAreaWizardProps,
  'handleChange' | 'answer'
> & {
  handleChange: (val: IModularResponseSchema) => void
  answer?: string
  config: { fontFamily: string }
}

/** Creates ReactNode rendering the Teacher configuration view, using
 *  {@link WizardProps} */
export const Wizard: React.FC<WizardProps> = ({
  handleChange,
  answer,
  config,
}) => (
  <>
    <FormControl variant="outlined">
      <InputLabel id="font-select-label">Font</InputLabel>
      <Select
        labelId="font-select-label"
        onChange={event => {
          handleChange({
            config: { fontFamily: event.target.value },
            answer: answer ?? '',
            responseType: RESPONSE_TYPE,
          })
        }}
        defaultValue={config.fontFamily}
        label="Font">
        <MenuItem value="Arial" sx={{ fontFamily: 'Arial' }}>
          Arial
        </MenuItem>
        <MenuItem value="Courier New" sx={{ fontFamily: 'Courier New' }}>
          Courier New
        </MenuItem>
        <MenuItem
          value="Times New Roman"
          sx={{ fontFamily: 'Times New Roman' }}>
          Times New Roman
        </MenuItem>
        <MenuItem value="Cursive" sx={{ fontFamily: 'Cursive' }}>
          Cursive
        </MenuItem>
      </Select>
    </FormControl>
    <Input
      handleChange={response =>
        handleChange({
          config,
          answer: response,
          responseType: RESPONSE_TYPE,
        })
      }
      answer={answer}
      config={config as { fontFamily: string }}
    />
  </>
)
