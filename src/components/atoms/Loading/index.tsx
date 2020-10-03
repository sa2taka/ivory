import React, { useMemo } from 'react';
import './index.scss';
import { Theme } from '@/types/theme';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

interface Props {
  columnSize?: number;
}

export const Loading: React.FC<Props> = () => {
  const theme = useTheme<Theme>();

  const backgroundStyle = useMemo(
    () =>
      css({
        'div.loading-peace': {
          background: theme.primary,
        },
      }),
    [theme.primary]
  );
  return (
    <div className={`loading-icon ${backgroundStyle}`}>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
      <div className="loading-peace"></div>
    </div>
  );
};
