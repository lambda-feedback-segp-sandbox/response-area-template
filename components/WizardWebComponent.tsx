import r2wc from "@r2wc/react-to-web-component"

import { ThemedWizard } from './ThemedWizard'

export const WizardWebComponent = r2wc(ThemedWizard, {
    props: {
        config: "json",
        handleChange: "function",
        answer: "json",
        setAllowSave: "function"
    }
})

customElements.define("wizard-component", WizardWebComponent)