import React from 'react';
import { Button as Component } from './index';
import { defaultTheme, Colors } from '@/types/theme';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
export default {
  title: 'atoms',
  decorators: [withKnobs],
};
export const Button = () => (
  <>
    <Component
      className="mx-4 my-4"
      theme={defaultTheme}
      color={text('ButtonColor', 'primary') as Colors}
    >
      {text('Button Text', 'button')}
    </Component>
    <Component
      className="mx-4 my-4"
      theme={defaultTheme}
      color={text('ButtonColor', 'primary') as Colors}
      disable
    >
      {text('Disable Button Text', 'Disabled')}
    </Component>
  </>
);
