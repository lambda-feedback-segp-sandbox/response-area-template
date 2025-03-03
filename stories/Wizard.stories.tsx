// These stories show the Wizard component in isolation.

import {
  DefaultStory,
  createMeta,
} from '@lambda-feedback-segp-sandbox/response-area-template-lib/stories/Wizard.stories'

import { MyResponseAreaTub } from '../components'

export default {
  ...createMeta(() => new MyResponseAreaTub()),
  // You can add custom story metadata here.
  // See https://storybook.js.org/docs/writing-stories#default-export.
}

// Managed by response-area-template-lib.
export const Default = DefaultStory

// You can add your own stories here.
// See https://storybook.js.org/docs/writing-stories#how-to-write-stories.
