import { Theme } from '@/types/theme';
import { darken, isDark, lighten } from '@/utils/Theme/color';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import React, { useMemo, useCallback } from 'react';
import './index.scss';
import { FaCog } from 'react-icons/fa';
import { Button } from '@/components/atoms/Button';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const component: React.FC<RouteComponentProps> = function SideHeader({
  history,
}) {
  const theme = useTheme<Theme>();
  const backgroundClass = useMemo(
    () =>
      css({
        background: isDark(theme.background)
          ? lighten(theme.background, 10)
          : darken(theme.background, 10),
      }),
    [theme.background]
  );

  const handleClick = useCallback(() => {
    history.push('/settings');
  }, []);

  return (
    <header className={`SideHeader w-16 h-screen ${backgroundClass}`}>
      <nav className="flex flex-row justify-center h-full w-full">
        <Button
          ripple
          icon
          className="mt-auto mb-4"
          color="secondary"
          onClick={handleClick}
        >
          <FaCog />
        </Button>
      </nav>
    </header>
  );
};

export const SideHeader = withRouter(component);
