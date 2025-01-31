import {
  BaseResponseAreaProps,
  BaseResponseAreaWizardProps,
} from '@lambda-feedback-segp-sandbox/response-area/base-props.type'
import {
  ResponseAreaTub,
} from '@lambda-feedback-segp-sandbox/response-area/response-area-tub'
import { ReactNode } from 'react'
import { z } from 'zod'

import { Input } from './Input.component'
import { Wizard } from './Wizard.component'

type Property<T> = {
  default: T;
  get: () => T;
  set: (value: T) => void;
};


/** Object modified by Wizard Component and read by Input Component
 *  Useful if the Wizard Component modifies properties of the Response Area */
export type Config = {
  styles: {
    fontFamily: Property<string>;
  };
  settings: {
    theme: Property<string>;
    textSize: Property<number>;
  };
};

const config: Config = {
  styles: {
    fontFamily: createProperty("Arial"), // Default font is Arial
  },
  settings: {
    theme: createProperty("light"), // Example: Theme setting
    textSize: createProperty(16), // Example: Text size setting
  },
};

/** Helper function to create a property with localStorage support */
function createProperty<T>(defaultValue: T): Property<T> {
  const key = `config.${String(defaultValue)}`;

  return {
    default: defaultValue,
    get: () => {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
    },
    set: (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };
}

/** The main class for the custom response area, extends base ResponseAreaTub
 *  abstract class
 *  @see ResponseAreaTub */
export class MyResponseAreaTub extends ResponseAreaTub {
  /** Specifies the label used for selection of the response area in UI */
  public readonly responseType = 'REPLACE_ME'

  /** Enables response area to use full width of the wrapping container */
  public readonly displayWideInput = true

  /** Schema created with Zod library, used to parse the answer for the
   *  response area */
  protected answerSchema = z.string()

  /** Main data structure holding the answer for the response area, type of
   *  answer can vary between different response areas */
  protected answer?: string

  /** Creates a main response area component, providing a student and
   *  teacher preview views
   *  @param props - Base parameters passed to all response areas
   *  @see BaseResponseAreaProps
   *  @returns ReactNode rendering the view
   *  */
  InputComponent = (props: BaseResponseAreaProps): ReactNode => {
    const parsedAnswer = this.answerSchema.safeParse(props.answer)
    return Input({
      ...props,
      answer: parsedAnswer.success ? parsedAnswer.data : undefined,
      config: config
    })
  }

  /** Creates a teacher view, providing control over configuration of the
   *  response area
   *  @param props - Base parameters passed to all response areas
   *  @see BaseResponseAreaProps
   *  @returns ReactNode rendering the view
   *  */
  WizardComponent = (props: BaseResponseAreaWizardProps): ReactNode => {
    return Wizard({
      ...props,
      handleChange: answer => {
        props.handleChange({
          responseType: this.responseType,
          answer,
        })
      },
      answer: this.answer,
      config: config
    })
  }
}
