import '@/styles/tailwind.css';
import { themes, Global, css } from '@storybook/theming';
import { addParameters, addDecorator } from '@storybook/react';

import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '../src/types/theme';
import { ThinI18nProvider } from '../src/utils/thinI18n';

addParameters({
  darkMode: {
    dark: { ...themes.dark, appBg: '#0a1325' },
    light: { ...themes.normal },
  },
  backgrounds: [
    { name: 'dark', value: '#1a2335', default: true },
    { name: 'light', value: '#fff' },
  ],
});

addDecorator((storyFn) => (
  <ThemeProvider theme={defaultTheme}>
    <Global
      styles={css({
        body: {
          backgroundColor: defaultTheme.background,
          color: defaultTheme.text,
          fontSize: defaultTheme.fontSize,
          fontFamily: defaultTheme.font,
          '--background-color': defaultTheme.background,
          '--text-color': defaultTheme.text,
          '--primary-color': defaultTheme.primary,
          '--secaondary-color': defaultTheme.secondary,
          '--font-size': defaultTheme.fontSize,
        },
      })}
    />
    <ThinI18nProvider lang="ja">{storyFn()}</ThinI18nProvider>
  </ThemeProvider>
));
