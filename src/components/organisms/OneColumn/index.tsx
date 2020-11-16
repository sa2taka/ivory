import React, { useMemo } from 'react';
import './index.scss';
import { css } from '@emotion/css';
import { isDark, lighten, darken } from '@/utils/Theme/color';
import { useTheme } from '@emotion/react';

interface Props {
  className?: string;
}

export const OneColumn: React.FC<Props> = ({ children, className }) => {
  const theme = useTheme();
  const backgroundClass = useMemo(
    () =>
      css({
        background: isDark(theme.background)
          ? lighten(theme.background, 20)
          : darken(theme.background, 20),
      }),
    [theme.background]
  );
  return (
    <div
      className={` mx-4 OneColumn ml-4 mt-3 mb-4 py-3 px-4 inline-block ${backgroundClass} ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
};
