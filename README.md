# Lambda Feedback Response Area Template

This template repository provides a base for developing response areas for
Lambda Feedback.

## Getting Started

1. Create a new repository from this template by clicking "Use this template"
   above.

2. Edit `components/index.ts`, `components/Input.component.tsx` and
   `components/Wizard.component.tsx` to implement your response area
   and its configuration wizard respectively.
   
3. Run `start_sandbox` to install dependencies and run storybook (the sandbox)
   as well as the server for evaluation functions. You can also run the commands
   in the file individually if you prefer.

4. View your component within the various stories in the sandbox and test it
   works as you intend.

5. Then switch to the **Evaluate** tab in Storybook, enter a response
   using your response area, and submit using the **Test Response
   Area** button.

## Optional

* Use the following command to generate TypeDoc files with documentation 
  about the template repository:
  ```
  $ yarn typedoc
  ```
