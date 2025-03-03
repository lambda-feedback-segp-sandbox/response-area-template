import {
  DefaultStory,
  createMeta,
} from '@lambda-feedback-segp-sandbox/response-area-template-lib/stories/Wizard.stories'

import { MyResponseAreaTub } from '../components'

export default { ...createMeta(() => new MyResponseAreaTub()) }

export const Default = DefaultStory
