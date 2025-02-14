import { IModularResponseSchema } from '@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ExpressionResponseAreaTub } from '../components'

import { wrapInput } from './input-wrapper'
import { fn } from '@storybook/test'


const initialiseMatrix = (args: any): React.FC<any> => {
  return () => {
    const [response, setResponse] = useState<IModularResponseSchema | null>(() => {
      const storedResponse = localStorage.getItem("wizard.input");
      if (storedResponse) {
        try {
          const parsedResponse: IModularResponseSchema = JSON.parse(storedResponse);
          return parsedResponse && parsedResponse.config && parsedResponse.answer
            ? parsedResponse
            : null;
        } catch {
          return null; // Return null if JSON parsing fails
        }
      }
      return null;
    });

    const matrix = new ExpressionResponseAreaTub();
    if (response && response.config && response.answer) {
      // @ts-ignore
      matrix.config = response.config;
      // @ts-ignore
      matrix.answer = response.answer;
    } else {
      matrix.initWithDefault();
    }

    return matrix.WizardComponent({
      ...args,
      handleChange: (val: IModularResponseSchema) => {
        if (val && val.config && val.answer) {
          localStorage.setItem("wizard.input", JSON.stringify(val));
          setResponse(val); // Update state safely
        }
      },
    });
  };
};

const WizardMeta = {
  title: "Wizard",
  parameters: {
    layout: "centered",
  },
  args: {
    handleChange: (val: IModularResponseSchema) => {
      if (val && val.config && val.answer) {
        localStorage.setItem("wizard.input", JSON.stringify(val));
      }
    },
    handleSubmit: fn(),
  },
} satisfies Meta;

const WrappedWizard: React.FC<any> = wrapInput(initialiseMatrix(WizardMeta.args));

export default {
  ...WizardMeta,
  component: WrappedWizard,
  render: (args: any) => <WrappedWizard {...args} />,
};

type Story = StoryObj<typeof WrappedWizard>;
export const Default: Story = {};
