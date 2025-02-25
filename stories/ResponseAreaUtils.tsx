import { IModularResponseSchema } from "@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema";
import { useState } from "react";

import { MyResponseAreaTub } from "../components";

const WIZARD_KEY = "wizard.input";
const INPUT_KEY = "student.input"

export const getStoredResponse = (): IModularResponseSchema | null => {
  try {
    const storedResponse = sessionStorage.getItem(WIZARD_KEY);
    return storedResponse ? JSON.parse(storedResponse) ?? null : null;
  } catch {
    return null; // Return null if JSON parsing fails
  }
};

export const initialiseResponseArea = (
  args: any,
  componentType: "WizardComponent" | "InputComponent"
): React.FC<any> => () => {
  const [response, setResponse] = useState<IModularResponseSchema | null>(() => getStoredResponse());

  const templateResponseAreaTub = new MyResponseAreaTub();
  // @ts-ignore
  response?.config ? (templateResponseAreaTub.config = response.config) : templateResponseAreaTub.initWithDefault();

  // If the component type is WizardComponent, sync response.answer with templateResponseAreaTub.answer
  if (componentType === "WizardComponent" && response?.answer)
    // @ts-ignore
    templateResponseAreaTub.answer = response.answer;

  const handleChange = (val: IModularResponseSchema) => {
    if (val?.config) {
      sessionStorage.setItem(WIZARD_KEY, JSON.stringify(val));
      setResponse(val);
    }

    if (componentType == "InputComponent") {
      sessionStorage.setItem(INPUT_KEY, JSON.stringify(val));
    }
    args.inputModifiedCallback?.(val);
  };

  return templateResponseAreaTub[componentType]({
    ...args,
    handleChange,
  });
};
