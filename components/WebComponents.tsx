export { InputWebComponent } from './InputWebComponent'
export { WizardWebComponent } from './WizardWebComponent'

import { RESPONSE_TYPE, MyResponseAreaTub } from '.'

(parent as any)[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub;
(window as any)[`RA_${RESPONSE_TYPE}`] = MyResponseAreaTub;
