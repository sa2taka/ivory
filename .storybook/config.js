import '@/style/tailwind.css';
import { themes } from '@storybook/theming';
import { addParameters, addDecorator } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-backgrounds';

addParameters({
  darkMode: {
    dark: { ...themes.dark, appBg: '#0a1325' },
    light: { ...themes.normal },
  },
  backgrounds: [
    { name: 'dark', value: '#1a2335', default: true }, // デフォルトの色にdefault:trueを絵ッてい
    { name: 'light', value: '#fff' },
  ],
});
