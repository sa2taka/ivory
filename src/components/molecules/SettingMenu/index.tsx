import { TitleLogo } from '@/components/atoms/TitleLogo';
import { settings } from '@/items/settings';
import { darken, isDark, lighten } from '@/utils/Theme/color';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import React, { useCallback, useMemo } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import './index.scss';
import { Tree } from '@/components/molecules/Tree';
import { useHistory } from 'react-router-dom';
import { stringify } from 'querystring';

interface Props {
  treePath: string[];
}

export const SettingMenu: React.FC<Props> = ({ treePath }) => {
  const theme = useTheme();

  const backgroundClass = useMemo(
    () =>
      css({
        background: isDark(theme.background)
          ? lighten(theme.background, 10)
          : darken(theme.background, 10),
      }),
    [theme.background]
  );

  const history = useHistory();

  const onClick = useCallback((path: string[]) => {
    history.replace(`?${stringify({ path })}`);
  }, []);

  const back = useCallback(() => {
    history.go(-1);
  }, []);

  return (
    <header className={`w-16 h-screen SettingMenu ${backgroundClass}`}>
      <TitleLogo className="w-full mx-auto justify-center my-6" />
      <a href="#" onClick={back} className="ml-6 mt-6 mb-4 flex items-center">
        <FaAngleLeft />
        戻る
      </a>
      <Tree
        items={settings}
        className="flex flex-col justify-start h-full w-full ml-6"
        onClickChild={onClick}
        treePath={treePath}
      />
    </header>
  );
};
