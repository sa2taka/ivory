import React, { useMemo, useRef } from 'react';
import './index.scss';
import { Colors, Theme } from '@/types/theme';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { lighten } from '@/utils/Theme/color';
import { useRippleEffect } from './useRipple';

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
  ripple?: boolean;
  effectSize?: number;
  effectColor?: string;
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
  ripple,
  effectSize,
  effectColor,
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

  const ref = useRef({} as HTMLButtonElement);
  const { handleMouseDown, handleMouseUp, effectStyle } = useRippleEffect(ref);
  const _effectSize = useMemo(() => effectSize || 128, [effectSize]);
  const _effectColor = useMemo(() => effectColor || 'white', [effectColor]);
  const effectClass = css({
    display: 'block',
    position: 'absolute',
    'pointer-events': 'none',
    width: _effectSize * 2 + 'px',
    height: _effectSize * 2 + 'px',
    left: _effectSize * -1 + 'px',
    top: _effectSize * -1 + 'px',
    'border-radius': _effectSize + 'px',
    'background-color': _effectColor || '#fff',
  });

  return (
    <button
      ref={ref}
      className={`${className} bg-${mainColor || 'primary'} ${hoverClass} ${
        disable ? 'btn-disabled' : ''
      } relative overflow-hidden font-bold py-2 px-4 rounded hover:shadow-md ivory-button transition duration-200 text-white focus:outline-none`}
      onClick={handleClick}
      onMouseDown={ripple ? handleMouseDown : undefined}
      onMouseUp={ripple ? handleMouseUp : undefined}
    >
      {ripple && <span className={effectClass} style={effectStyle} />}
      {children}
    </button>
  );
};

export const Button = withTheme(_Button);
