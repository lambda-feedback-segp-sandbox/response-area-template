import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'

import { MyResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'


const initialiseResponseArea = (args: any): React.FC<any> => {
  return () => {
    const [response, setResponse] = useState<IModularResponseSchema | null>(() => {
      const storedResponse = localStorage.getItem("response");
      if (storedResponse) {
        try {
          const parsedResponse: IModularResponseSchema = JSON.parse(storedResponse);
          return parsedResponse && parsedResponse.config
            ? parsedResponse
            : null;
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

    return templateResponseAreaTub.WizardComponent({
      ...args,
      handleChange: (val: IModularResponseSchema) => {
        if (val && val.config) {
          localStorage.setItem("response", JSON.stringify(val));
          setResponse(val); // Update state safely
        }
      },
    });
  };
};

const WizardMeta = {
  title: 'Wizard',
  parameters: {
    layout: 'centered',
  },
  args: {
    handleChange: (val: IModularResponseSchema) => {
      console.log("Hello")
      if (val && val.config) {
        localStorage.setItem("response", JSON.stringify(val));
      }
    },
    handleSubmit: fn(),
  },
  render: (args, _) => <WrappedWizard {...args} />,
} satisfies Meta

const WrappedWizard = wrapInput(initialiseResponseArea(WizardMeta.args))

export default WizardMeta
type Story = StoryObj<typeof WizardMeta>

export const Default: Story = {}
