import r2wc from "@r2wc/react-to-web-component"

import { Input } from './Input.component'

const InputWebComponent = r2wc(Input)

customElements.define("input-component", InputWebComponent)