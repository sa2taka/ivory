import React from 'react';
import { Colors } from '@/types/theme';

interface Props {
  color?: Colors;
  round?: boolean;
  outline?: boolean;
  fab?: boolean;
  icon?: boolean;
  className: string;
}

export const Button: React.FC<Props> = ({
  color,
  // round,
  // outline,
  // fab,
  // icon,
  children,
  className,
}) => {
  return (
    <button
      className={`${className} bg-${
        color || 'primary'
      } font-bold py-2 px-4 rounded hover:shadow-2xl ivory-button transition-shadow duration-200`}
    >
      {children}
    </button>
  );
};
