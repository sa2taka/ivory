import React, { useMemo } from 'react';
import './index.scss';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';

interface Props {
  columnSize?: number;
}

export const Loading: React.FC<Props> = () => {
  const theme = useTheme();

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
