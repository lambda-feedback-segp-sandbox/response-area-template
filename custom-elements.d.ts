import React from 'react';

declare module 'react' {
    namespace JSX {
      interface IntrinsicElements {
        'input-component': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement> & {
            config: string;
            answer?: string;
            'display-mode'?: string;
            'response-area-id'?: string;
            'handle-submit'?: string;
            'handle-draft-save'?: string;
            'handle-change'?: string;
            'preview-submit'?: string;
            'universal-response-area-id'?: string;
            'has-preview'?: boolean;
            'is-teacher-mode'?: boolean;
            'pre-response-text'?: string;
            'post-response-text'?: string;
            'check-is-loading'?: boolean;
            'feedback'?: string;
          },
          HTMLElement
        >;
        'wizard-component': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement> & {
            config: string;
            answer?: string;
            'handle-change'?: string;
            'set-allow-save'?: string;
          },
          HTMLElement
        >;
      }
    }
  }