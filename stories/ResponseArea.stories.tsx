import { ResponseAreaView } from '@lambda-feedback-segp-sandbox/response-area/components/ResponseAreaView.component'
import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import {
  Delete as DeleteIcon,
  BarChart,
  ContentCopy,
  Tune,
} from '@mui/icons-material'
import Button from '@mui/material/Button'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const initialiseResponseArea = (args: any): React.FC<any> => {
  return () => {
    const [response] = useState<IModularResponseSchema | null>(() => {
      const storedResponse = localStorage.getItem("wizard.input");
      if (storedResponse) {
        try {
          const parsedResponse: IModularResponseSchema = JSON.parse(storedResponse);
          return parsedResponse && parsedResponse.config ? parsedResponse : null;
        } catch {
          return null; // Return null if JSON parsing fails
        }
      }
      return null;
    });

    const templateResponseAreaTub = new MyResponseAreaTub();
    if (response && response.config) {
      // @ts-ignore
      templateResponseAreaTub.config = response.config;
    } else {
      templateResponseAreaTub.initWithDefault();
    }

    return templateResponseAreaTub.InputComponent({
      ...args,
      handleChange: (val: IModularResponseSchema) => {
        if (val) {
          localStorage.setItem("student.input", JSON.stringify(val));
        }
      },
    });
  };
};

const InputMeta: Meta = {
  title: "Input",
  parameters: {
    layout: "centered",
  },
  args: {
    handleChange: (val: IModularResponseSchema) => {
      if (val && val.config && val.answer) {
        localStorage.setItem("student.input", JSON.stringify(val));
      }
    },
    handleSubmit: fn(),
  },
};

const tub = new MyResponseAreaTub()
tub.InputComponent = wrapInput(initialiseResponseArea(InputMeta.args))
const ResponseAreaViewMeta = {
  title: 'Response Area',
  component: ResponseAreaView,
  args: {
    handleChange: () => {},
    preResponseText: 'this is pre response text',
    postResponseText: 'this is post response text',
  },
} satisfies Meta

export default ResponseAreaViewMeta
type Story = StoryObj<typeof ResponseAreaViewMeta>

export const tempView: Story = {
  args: {
    tub: tub,
    visibleSymbols: [],
    displayMode: 'normal',
    inputDisplayValue: [],
    inputType: 'REPLACE_ME',
    displayInputSymbols: false,
    showLivePreview: true,
    handleCheck: () => {},
    handleDraftSave: () => {},
    inFlight: false,
    feedback: {isCorrect: true, isError: false},
    responseAreaId: '00000000-0000-0000-0000-000000000000',
    universalResponseAreaId: '00000000-0000-0000-0000-000000000000',
    wrapLabel: 'Area Label',
    ActionButtons: (
      <>
        <Button variant="outlined" endIcon={<Tune />}>
          Configure
        </Button>
        <Button
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          variant="outlined"
          endIcon={<BarChart />}>
          Explore
        </Button>
        <Button
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          variant="outlined"
          endIcon={<ContentCopy />}>
          Duplicate
        </Button>
        <Button
          color="error"
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
          endIcon={<DeleteIcon />}>
          Delete
        </Button>
      </>
    ),
  },
}
