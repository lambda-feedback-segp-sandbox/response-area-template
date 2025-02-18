import r2wc from "@r2wc/react-to-web-component"

import { ThemedInput } from './ThemedInput'

export const InputWebComponent = r2wc(ThemedInput, {
    props: {
        config: "json",
        handleChange: "function",
        handleSubmit: "function",
        handleDraftSave: "function",
        answer: "json",
        displayMode: "string",
        previewSubmit: "function",
        responseAreaId: "string",
        universalResponseAreaId: "string",
        hasPreview: "boolean",
        isTeacherMode: "boolean",
        preResponseText: "string",
        postResponseText: "string",
        checkIsLoading: "boolean",
        feedback: "json",
        typesafeErrorMessage: "string"
    }
})

customElements.define("input-component", InputWebComponent)