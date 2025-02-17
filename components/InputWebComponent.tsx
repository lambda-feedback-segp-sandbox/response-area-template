import r2wc from "@r2wc/react-to-web-component"

import { Input } from './Input.component'

export const InputWebComponent = r2wc(Input, {
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
        typesafeErrorMessage: "string",
        makeStyles: "function"
    }
})

customElements.define("input-component", InputWebComponent)