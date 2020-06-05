import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import '@/style/tailwind.css';
import { Routing } from '@/components/pages/Routing';
import { defaultTheme } from '@/types/theme';
import { ThemeProvider } from 'emotion-theming';

const app = document.getElementById('app');

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <Global
      styles={css({
        body: {
          backgroundColor: defaultTheme.background,
          color: defaultTheme.text,
        },
      })}
    />
    <Routing />
  </ThemeProvider>,
  app
);
