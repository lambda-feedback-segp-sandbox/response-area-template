export { InputWebComponent } from './InputWebComponent'
export { WizardWebComponent } from './WizardWebComponent'

import { RESPONSE_TYPE, MyResponseAreaTub } from '.'

parent[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub
document[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub
