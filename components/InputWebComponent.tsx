import r2wc from "@r2wc/react-to-web-component"

import { Input } from './Input.component'

const InputWebComponent = r2wc(Input, {
    props: {
        config: "json",
        handleChange: "function"
    }
})

customElements.define("input-component", InputWebComponent)