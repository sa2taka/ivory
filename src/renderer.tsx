import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import '@/s/tailwind.css';
import { Routing } from '@/components/pages/Routing';
import { defaultTheme, Theme } from '@/types/theme';
import { ThemeProvider, useTheme } from 'emotion-theming';
import '@/utils/DB';

const app = document.getElementById('app');

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <Routing />
  </ThemeProvider>,
  app
);

function GlobalStyle() {
  const theme = useTheme<Theme>();
  return (
    <Global
      styles={css({
        body: {
          backgroundColor: theme.background,
          color: theme.text,
          'font-size': theme.fontSize,
          'font-family': theme.font,
          '--background-color': theme.background,
          '--text-color': theme.text,
          '--primary-color': theme.primary,
          '--secaondary-color': theme.secondary,
          '--font-size': theme.fontSize,
        },
      })}
    />
  );
}
