import { Meta, StoryObj } from "@storybook/react";
import React from "react";

//@ts-ignore
window.makestyles= () => {
    console.log("making styles")
}

const WebComponentWrapper: React.FC<{}> = () => {
    //@ts-ignore
    return <input-component config='{"fontFamily":"Arial"}' handle-change="inputchangefunc" make-styles="window.makestyles" />
}

const WebComponentMeta: Meta = {
    title: "WebComponent",
    component: WebComponentWrapper
}
export default WebComponentMeta

type Story = StoryObj<typeof WebComponentMeta>

export const WebComponentStory: Story = {
    args: {}
}