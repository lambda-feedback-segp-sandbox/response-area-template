import r2wc from "@r2wc/react-to-web-component"

import { Wizard } from './Wizard.component'

export const WizardWebComponent = r2wc(Wizard, {
    props: {
        config: "json",
        handleChange: "function",
        answer: "json",
        setAllowSave: "function"
    }
})

customElements.define("wizard-component", WizardWebComponent)