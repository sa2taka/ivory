import React from 'react';
import { Button as Component } from './index';
import { defaultTheme, Colors } from '@/types/theme';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ThemeProvider } from '@emotion/react';
export default {
  title: 'atoms',
  decorators: [withKnobs],
};
export const Button = () => (
  <ThemeProvider theme={defaultTheme}>
    <Component
      className="mx-4 my-4"
      color={text('ButtonColor', 'primary') as Colors}
    >
      {text('Button Text', 'button')}
    </Component>
    <Component
      className="mx-4 my-4"
      color={text('ButtonColor', 'primary') as Colors}
      disable
    >
      {text('Disable Button Text', 'Disabled')}
    </Component>
    <Component
      className="mx-4 my-4"
      color={text('ButtonColor', 'primary') as Colors}
      ripple
    >
      {text('Ripple Button Text', 'Ripple')}
    </Component>
  </ThemeProvider>
);
