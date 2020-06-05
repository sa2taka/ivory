import React from 'react';
import { Button as Component } from './index';
import { defaultTheme } from '@/types/theme';
export default {
  title: 'atom',
};
export const Button = () => (
  <Component className="mx-4 my-4" theme={defaultTheme}>
    button
  </Component>
);
