# Lambda Feedback Response Area Template

This template repository provides a base for developing response areas for
Lambda Feedback.

## Getting Started

1. Create a new repository from this template by clicking "Use this template"
   above.
2. Install dependencies:
   ```
   $ yarn install
   ```
3. Start Storybook to view your UI components as you make changes:
   ```
   $ yarn storybook
   ```
4. Edit `components/index.ts`, `components/Input.component.tsx` and
   `components/Wizard.component.tsx` to implement your response area
   and its configuration wizard respectively.
5. Use the Sandbox add-on to test your response area with an evaluation
   function.

   Start the evaluation function testing server in a separate terminal:
   ```
   $ yarn ef-test-server
   ```

   Then switch to the **Evaluate** tab in Storybook, enter a response
   using your response area, and submit using the **Test Response
   Area** button.

## Optional

* Use the following command to generate TypeDoc files with documentation 
  about the template repository:
  ```
  $ yarn typedoc
  ```
