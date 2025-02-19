import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const WizardWebComponentWrapper: React.FC<{}> = () => {
    //@ts-ignore
    return <wizard-component config='{"fontFamily":"Arial"}' handle-change="inputchangefunc"/>
}

const WizardWebComponentMeta: Meta = {
    title: "Wizard Web Component",
    component: WizardWebComponentWrapper
}
export default WizardWebComponentMeta

type Story = StoryObj<typeof WizardWebComponentMeta>

export const WizardWebComponentStory: Story = {
    args: {}
}