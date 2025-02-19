import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const InputWebComponentWrapper: React.FC<{}> = () => {
    //@ts-ignore
    return <input-component config='{"fontFamily":"Arial"}' handle-change="inputchangefunc"/>
}

const InputWebComponentMeta: Meta = {
    title: "Input Web Component",
    component: InputWebComponentWrapper
}
export default InputWebComponentMeta

type Story = StoryObj<typeof InputWebComponentMeta>

export const InputWebComponentStory: Story = {
    args: {}
}