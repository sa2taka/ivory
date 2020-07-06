import React from 'react';
import './index.scss';
import { Colors, Theme } from '@/types/theme';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { lighten } from '@/utils/Theme/color';

interface Props {
  color?: Colors;
  round?: boolean;
  outline?: boolean;
  fab?: boolean;
  icon?: boolean;
  className?: string;
  theme: Theme;
  disable?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const _Button: React.FC<Props> = ({
  color,
  // round,
  // outline,
  // fab,
  // icon,
  children,
  className,
  theme,
  disable,
  onClick,
}) => {
  let mainColor: string = color || 'primary';
  let hoverClass: string = color || 'primary';

  const handleClick = (event: React.MouseEvent) => {
    if (disable) {
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  if (mainColor === 'primary' || mainColor === 'secondary') {
    hoverClass = css({
      '&:hover': {
        background: lighten(theme.primary, 5),
      },
    });
  } else {
    mainColor = color + '-500';
    hoverClass = 'hover:bg-' + color + '-400';
  }

  return (
    <button
      className={`${className} bg-${mainColor || 'primary'} ${hoverClass} ${
        disable ? 'btn-disabled' : ''
      } font-bold py-2 px-4 rounded hover:shadow-md ivory-button transition duration-200 text-white focus:outline-none`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const Button = withTheme(_Button);
