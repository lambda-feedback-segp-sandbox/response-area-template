import type { Meta, StoryObj } from '@storybook/react'
import { ResponseAreaView } from '@lambda-feedback-segp-sandbox/response-area/components/ResponseAreaView.component'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

import Button from '@mui/material/Button'
import { Delete as DeleteIcon, BarChart, ContentCopy, Tune } from '@mui/icons-material'

const tub = new MyResponseAreaTub()
tub.InputComponent = wrapInput(tub.InputComponent)
const ResponseAreaViewMeta = {
  title: 'Response Area',
  component: ResponseAreaView,
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: () => {},
    preResponseText: "this is pre response text",
    postResponseText: "this is post response text"
  }
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
        responseAreaId: '00000000-0000-0000-0000-000000000000',
        universalResponseAreaId: '00000000-0000-0000-0000-000000000000',
        wrapLabel: "Area Label",
        ActionButtons: (
          <>
            <Button
              variant="outlined"
              endIcon={<Tune />}
              disabled>
              Configure
            </Button>
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              variant="outlined"
              disabled
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
              disabled
              endIcon={<ContentCopy />}>
              Duplicate
            </Button>
            <Button
              buttonProps={{
                color: 'error',
                variant: 'outlined',
                sx: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                },
              }}
              EndButtonIcon={<DeleteIcon />}
              disabled>
              Delete
              </Button>
          </>
        )
      }
}
