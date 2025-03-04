// These stories show the complete response area component stack.

import {
  AllActionButtonsDisabledStory,
  AllActionButtonsEnabledStory,
  ExploreActionButtonDisabledStory,
  StudentViewStory,
  createMeta,
} from '@lambda-feedback-segp-sandbox/response-area-template-lib/stories/ResponseArea.stories'

import { MyResponseAreaTub } from '../components'

export default {
  ...createMeta(() => new MyResponseAreaTub()),
  // You can add custom story metadata here.
  // See https://storybook.js.org/docs/writing-stories#default-export.
}

// Managed by response-area-template-lib.
export const StudentView = StudentViewStory

// Managed by response-area-template-lib.
export const AllActionButtonsEnabled = AllActionButtonsEnabledStory

// Managed by response-area-template-lib.
export const ExploreActionButtonDisabled = ExploreActionButtonDisabledStory

// Managed by response-area-template-lib.
export const AllActionButtonsDisabled = AllActionButtonsDisabledStory

// You can add your own stories here.
// See https://storybook.js.org/docs/writing-stories#how-to-write-stories.
