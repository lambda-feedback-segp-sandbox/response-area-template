import { IModularResponseSchema } from "@lambda-feedback-segp-sandbox/response-area/schemas/question-form.schema";
import { useState } from "react";

import { MyResponseAreaTub } from "../components";

export const getStoredResponse = (storageKey: string): IModularResponseSchema | null => {
  try {
    const storedResponse = localStorage.getItem(storageKey);
    return storedResponse ? JSON.parse(storedResponse) ?? null : null;
  } catch {
    return null; // Return null if JSON parsing fails
  }
};

export const initialiseResponseArea = (
  args: any,
  storageKey: string,
  componentType: "WizardComponent" | "InputComponent"
): React.FC<any> => () => {
  const [response, setResponse] = useState<IModularResponseSchema | null>(() => getStoredResponse(storageKey));

  const templateResponseAreaTub = new MyResponseAreaTub();
  // @ts-ignore
  response?.config ? (templateResponseAreaTub.config = response.config) : templateResponseAreaTub.initWithDefault();

  // If the component type is WizardComponent, sync response.answer with templateResponseAreaTub.answer
  if (componentType === "WizardComponent" && response?.answer)
    // @ts-ignore
    templateResponseAreaTub.answer = response.answer;

  const handleChange = (val: IModularResponseSchema) => {
    if (val?.config) {
      localStorage.setItem(storageKey, JSON.stringify(val));
      setResponse(val);
    }
    args.inputModifiedCallback?.(val);
  };

  return templateResponseAreaTub[componentType]({
    ...args,
    handleChange,
  });
};
