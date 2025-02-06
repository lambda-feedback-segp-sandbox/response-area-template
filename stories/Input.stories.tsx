import { IModularResponseSchema } from "@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema";
import { Meta } from "@storybook/react";
import { fn } from '@storybook/test'
import React, { useState } from "react";

import { MyResponseAreaTub } from "../components";

import { wrapInput } from "./input-wrapper";


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

const WrappedInput: React.FC<any> = wrapInput(initialiseResponseArea(InputMeta.args));

export const StudentView = {
  ...InputMeta,
  component: WrappedInput,
  args: {
    isTeacherMode: false,
  },
  render: (args: any) => <WrappedInput {...args} />,
};

export const TeacherView = {
  ...InputMeta,
  component: WrappedInput,
  args: {
    isTeacherMode: true,
  },
  render: (args: any) => <WrappedInput {...args} />,
};

export default InputMeta;
