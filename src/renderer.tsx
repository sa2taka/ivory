import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import '@/style/tailwind.css';
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
        },
      })}
    />
  );
}
