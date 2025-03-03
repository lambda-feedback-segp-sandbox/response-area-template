import {
  StudentViewStory,
  TeacherViewStory,
  createMeta,
} from '@lambda-feedback-segp-sandbox/response-area-template-lib/stories/Input.stories'

import { MyResponseAreaTub } from '../components'

export default { ...createMeta(() => new MyResponseAreaTub()) }

export const StudentView = StudentViewStory

export const TeacherView = TeacherViewStory
