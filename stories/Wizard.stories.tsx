import { IModularResponseSchema } from "@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema";
import type { Meta, StoryObj } from "@storybook/react";

import { wrapInput } from "./input-wrapper";
import { initialiseResponseArea } from "./ResponseAreaUtils";

const WizardMeta: Meta = {
  title: "Wizard",
  parameters: { layout: "centered" },
  args: {
    inputModifiedCallback: (val: IModularResponseSchema) => {},
    handleSubmit: () => {},
  },
  render: (args) => <WrappedWizard {...args} />,
};

const WrappedWizard = wrapInput(initialiseResponseArea(WizardMeta.args, "wizard.input", "WizardComponent"));

export default WizardMeta;
type Story = StoryObj<typeof WizardMeta>;

export const Default: Story = {};
