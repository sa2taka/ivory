import React from 'react';
import './index.scss';

interface Props {}

export const ColumnArea: React.FC<Props> = ({ children }) => {
  return <div className="flex h-full my-3 mx-4">{children}</div>;
};
