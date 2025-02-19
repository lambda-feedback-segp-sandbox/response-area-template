import { ResponseAreaView } from '@lambda-feedback-segp-sandbox/response-area/components/ResponseAreaView.component'
import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema'
import {
  Delete as DeleteIcon,
  BarChart,
  ContentCopy,
  Tune,
} from '@mui/icons-material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'

const InitialiseResponseArea: React.FC<any> = (args: any) => {
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
  return <templateResponseAreaTub.InputComponent {...args}
                                                 handleChange={(val: IModularResponseSchema) => {
                                                   if (val) {
                                                     localStorage.setItem("student.input", JSON.stringify(val));
                                                   }
                                                 }} />;
};

const tub = new MyResponseAreaTub()
tub.InputComponent = wrapInput(InitialiseResponseArea)
const ResponseAreaViewMeta = {
  title: 'Response Area',
  component: ResponseAreaView,
  args: {
    handleChange: (val: IModularResponseSchema) => {
      if (val && val.config && val.answer) {
        localStorage.setItem("student.input", JSON.stringify(val));
      }
    },
    handleSubmit: fn(),
    preResponseText: 'this is pre response text',
    postResponseText: 'this is post response text',
  },
} satisfies Meta

export default ResponseAreaViewMeta
type Story = StoryObj<typeof ResponseAreaViewMeta>

const TempViewComponent = (args: any) => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    description: '',
  });

  const handleButtonClick = (buttonType: string) => {
    let title = 'Not Available';
    let description = `${buttonType} is not available in SandBox`;

    setDialogContent({ title, description });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!args.fullView) {
    return (
      <>
        <ResponseAreaView
          {...args}
          handleCheck={() => handleButtonClick('Check')}
          handleDraftSave={() => handleButtonClick('Save')}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContent.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <ResponseAreaView
        {...args}
        handleCheck={() => handleButtonClick('Check')}
        handleDraftSave={() => handleButtonClick('Save')}
        ActionButtons={
          <>
            <Button
              variant="outlined"
              endIcon={<Tune />}
              onClick={() => handleButtonClick('Configure')}
              sx={commonButtonStyles} // Applying common styles
            >
              Configure
            </Button>
            <Button
              variant="outlined"
              endIcon={<BarChart />}
              onClick={() => handleButtonClick('Explore')}
              sx={commonButtonStyles} // Applying common styles
            >
              Explore
            </Button>
            <Button
              variant="outlined"
              endIcon={<ContentCopy />}
              onClick={() => handleButtonClick('Duplicate')}
              sx={commonButtonStyles} // Applying common styles
            >
              Duplicate
            </Button>
            <Button
              color="error"
              variant="outlined"
              endIcon={<DeleteIcon />}
              onClick={() => handleButtonClick('Delete')}
              sx={{
                ...commonButtonStyles, // Applying common styles
                width: '100%', // Additional unique style
              }}
            >
              Delete
            </Button>
          </>
        }
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const StudentView: Story = {
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
    fullView: false
  },
  render: (args) => <TempViewComponent {...args} />,
}

export const TeacherView: Story = {
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
    fullView: true
  },
  render: (args) => <TempViewComponent {...args} />,
}


const commonButtonStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};