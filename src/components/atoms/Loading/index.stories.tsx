import React from 'react';
import { Loading as Component } from './index';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '@/types/theme';
export default {
  title: 'atoms',
};
export const Loading = () => <Component />;
