import { ThemeProvider } from '@lambda-feedback-segp-sandbox/styles/styles/minimal/theme-provider'
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import type { Preview } from '@storybook/react'

import { createGlobalStyle } from 'styled-components'
import { roboto, firaSans, firaMono, lato  } from '@lambda-feedback-segp-sandbox/styles/styles/fonts';

import '@lambda-feedback-segp-sandbox/styles/styles/globals.css'
import { MaterialTheme } from '@lambda-feedback-segp-sandbox/styles';

const GlobalStyles = createGlobalStyle`
  html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
}

#__next {
  height: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

:root {
  --theme-fg-lighter-color: #1ba9d1;
  --theme-fg-light-color: #0090b7;
  --theme-fg-color: #0099c4;
  --theme-fg-dark-color: #0582a5;
  --theme-fg-darker-color: #007393;
  --theme-error: salmon;
  --custom-f7f7f7: #f7f7f7;
  --custom-ececec: #ececec;
  --custom-d0d0d0: #d0d0d0;
  --custom-6d6d6d: #6d6d6d;
  --custom-1a1a1a: #1a1a1a;
  /* Shadows */
  --shadow-tiny: 0px 3px 6px rgba(0, 0, 0, 0.1);
  --shadow-smallest: 0px 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
  --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);
}

code {
  background-color: var(--custom-ececec);
  border-radius: 4px;
  padding: 0.1rem 0.3rem;
  font-family: monospace;
}

/* mui SpeedDial */

.MuiSpeedDial-actions {
  position: absolute;
  bottom: 100%;
  left: -24px;
}

.MuiSpeedDial-actions:has(.timing) {
  left: -80px;
}

.MuiSpeedDial-fab {
  border-radius: 0;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  box-shadow: none;
}

.MuiSpeedDial-fab:hover {
  border: none;
  background-color: transparent;
}

.MuiSpeedDial-fab:active {
  box-shadow: none;
}

.MuiSpeedDialAction-fab {
  color: rgba(0, 0, 0, 1);
}

`
const preview: Preview = {
}

export default preview
export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: MaterialTheme
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyles
  }),
];
