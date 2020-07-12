import React from 'react';
import { GettingStarted as Component } from './GettingStarted';
import { Global, css } from '@emotion/core';
import { defaultTheme } from '@/types/theme';
import { ThemeProvider } from 'emotion-theming';
import { HashRouter as Router } from 'react-router-dom';
export default {
  title: 'pages',
};
export const GettingStarted = () => (
  <ThemeProvider theme={defaultTheme}>
    <Global
      styles={css({
        body: {
          backgroundColor: defaultTheme.background,
          color: defaultTheme.text,
        },
      })}
    />
    <Router>
      {' '}
      <Component />
    </Router>
  </ThemeProvider>
);
