import { IModularResponseSchema } from "@lambda-feedback-segp-sandbox/response-area-base/schemas/question-form.schema";
import { Meta } from "@storybook/react";
import React from "react";

import { wrapInput } from "./input-wrapper";
import { initialiseResponseArea } from "./ResponseAreaUtils";

const InputMeta: Meta = {
  title: "Input",
  parameters: {
    layout: "centered",
  },
  args: {
    inputModifiedCallback: (val: IModularResponseSchema) => {},
    handleSubmit: () => {},
  },
};

const WrappedInput: React.FC<any> = wrapInput(initialiseResponseArea(InputMeta.args, "wizard.input", "InputComponent"));

export const StudentView = {
  ...InputMeta,
  component: WrappedInput,
  args: { isTeacherMode: false },
  render: (args: any) => <WrappedInput {...args} />,
};

export const TeacherView = {
  ...InputMeta,
  component: WrappedInput,
  args: { isTeacherMode: true },
  render: (args: any) => <WrappedInput {...args} />,
};

export default InputMeta;
