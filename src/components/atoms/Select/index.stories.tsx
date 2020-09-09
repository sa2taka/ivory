import React from 'react';
import { Select as Component, Option } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'atoms',
};

const options: Array<Option> = [
  { key: '1', value: '1' },
  { key: '2', value: '2', text: 'two' },
  {
    key: '3',
    value: '3',
    text: 'three',
    icon: <FontAwesomeIcon icon={faCubes} />,
  },
];
export const Select = () => (
  <Component label="ほげほげ" options={options} className="m-4" />
);
