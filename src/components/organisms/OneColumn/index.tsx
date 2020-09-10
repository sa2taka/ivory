import React from 'react';
import './index.scss';

interface Props {}

export const OneColumn: React.FC<Props> = ({ children }) => {
  return <div className="h-full mx-4 OneColumn ml-4 mt-3">{children}</div>;
};
