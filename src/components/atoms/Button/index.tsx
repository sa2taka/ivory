import React, { useCallback, useMemo, useRef } from 'react';
import './index.scss';
import { Colors, Theme } from '@/types/theme';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import { lighten } from '@/utils/Theme/color';
import { useRippleEffect } from './useRipple';

interface Props {
  color?: Colors;
  round?: boolean;
  outline?: boolean;
  fab?: boolean;
  icon?: boolean;
  className?: string;
  disable?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  ripple?: boolean;
  effectSize?: number;
  effectColor?: string;
  small?: boolean;
  large?: boolean;
  absolute?: boolean;
  href?: string;
}

export const Button: React.FC<Props> = ({
  color,
  outline,
  // fab,
  icon,
  children,
  className,
  disable,
  onClick,
  ripple,
  effectSize,
  effectColor,
  small,
  large,
  absolute,
  href,
}) => {
  const theme = useTheme();
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disable) {
        return;
      }
      if (onClick) {
        onClick(event);
      }
    },
    [disable, onClick]
  );

  const mainColor = useMemo(() => {
    if (!color || color === 'primary' || color === 'secondary') {
      return color || 'primary';
    } else {
      return color + '-500';
    }
  }, [color]);

  const hoverClass = useMemo(() => {
    if (outline) {
      return css({
        '&:hover': {
          background: 'rgba(255,255,255,0.2)',
        },
      });
    }
    if (!color || color === 'primary') {
      return css({
        '&:hover': {
          background: lighten(theme.primary, 5),
        },
      });
    } else if (color === 'secondary') {
      return css({
        '&:hover': {
          background: lighten(theme.secondary, 5),
        },
      });
    } else {
      return 'hover:bg-' + color + '-400';
    }
  }, [theme.primary, color]);

  const ref = useRef({} as any);
  const { handleMouseDown, handleMouseUp, effectStyle } = useRippleEffect(ref);
  const _effectSize = useMemo(() => effectSize || 128, [effectSize]);
  const _effectColor = useMemo(() => effectColor || 'white', [effectColor]);
  const effectClass = css({
    display: 'block',
    position: 'absolute',
    pointerEvents: 'none',
    width: _effectSize * 2 + 'px',
    height: _effectSize * 2 + 'px',
    left: _effectSize * -1 + 'px',
    top: _effectSize * -1 + 'px',
    borderRadius: _effectSize + 'px',
    backgroundColor: _effectColor || '#fff',
  });

  const iconsClasses = useMemo(() => {
    let classes = '';
    if (small) {
      classes += 'w-6 h-6';
    } else if (large) {
      classes += 'w-16 h-16';
    } else {
      classes += 'w-12 h-12';
    }
    classes += ' rounded-full';
    return classes;
  }, [small, large]);

  const state = {
    ref,
    className: `${outline ? 'border-solid border-2' : ''} ${
      outline ? 'border' : 'bg'
    }-${mainColor || 'primary'} ${hoverClass} ${
      disable ? 'btn-disabled' : ''
    }  overflow-hidden font-bold py-2 px-2 ${
      icon ? iconsClasses : 'rounded'
    } hover:shadow-md ivory-button transition duration-200 text-white focus:outline-none flex place-items-center ${
      absolute ? 'absolute' : 'relative'
    } ${className || ''}`,
    onClick: handleClick,
    onMouseDown: ripple ? handleMouseDown : undefined,
    onMouseUp: ripple ? handleMouseUp : undefined,
  };

  const child = (
    <>
      {ripple && <span className={effectClass} style={effectStyle} />}
      {children}
    </>
  );

  return href ? <a {...state}>{child}</a> : <button {...state}>{child}</button>;
};
