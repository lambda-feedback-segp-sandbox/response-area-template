import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const WebComponentWrapper: React.FC<{}> = () => {
    //@ts-ignore
    return <input-component config='{"fontFamily":"Arial"}' handle-change="inputchangefunc"/>
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