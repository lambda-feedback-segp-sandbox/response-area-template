import {
  AllActionButtonsEnabledStory,
  ExploreActionButtonDisabledStory,
  StudentViewStory,
  createMeta,
} from '@lambda-feedback-segp-sandbox/response-area-template-lib/stories/ResponseArea.stories'

import { MyResponseAreaTub } from '../components'

export default { ...createMeta(() => new MyResponseAreaTub()) }

export const StudentView = StudentViewStory

export const AllButtonsEnabled = AllActionButtonsEnabledStory

export const ExploreActionButtonDisabled = ExploreActionButtonDisabledStory
