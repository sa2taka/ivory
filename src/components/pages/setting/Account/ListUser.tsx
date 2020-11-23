import { UserIcon } from '@/components/atoms/UserIcon';
import React, { useMemo } from 'react';
import { User } from '@/types/db';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import { darken, isDark, lighten } from '@/utils/Theme/color';
import './ListUser.scss';
import { Button } from '@/components/atoms/Button';
import { FaUser, FaTimes } from 'react-icons/fa';

interface Props {
  user: User;
  className?: string;
}

export const ListUser: React.FC<Props> = ({ user, className }) => {
  const domain = user.domain;
  const theme = useTheme();

  const hoveredBackgroundClass = useMemo(
    () =>
      css({
        ':hover': {
          background: isDark(theme.background)
            ? lighten(theme.background, 10)
            : darken(theme.background, 10),
        },
      }),
    [theme.background]
  );

  return (
    <li
      className={`flex justify-center items-center rounded-sm transition-colors py-2 ListUser ListUserAnimationBezier ListUserWidth ${hoveredBackgroundClass} ${
        className || ''
      }`}
    >
      <div className="grid grid-template-cols gap-x-2 w-4/5 mx-auto ListUserAnimationTranslate ListUserAnimationBezier MoveLeft">
        <div className="row-span-2 relative my-auto mr-0 ml-auto">
          <UserIcon iconImg={user.userInfo.avatar} />
        </div>

        <span className="row-span-1 col-start-2 mt-2 text-base font-semibold w-full overflow-hidden whitespace-no-wrap">
          {user.userInfo.displayName}
        </span>
        <span className="row-span-1 col-start-2 mb-2 mt-1 align-top text-xs">
          {user.userInfo.acct} @ {domain}
        </span>
      </div>

      <div className="ListUserButtonArea ListUserAnimationBezier flex items-center absolute">
        <Button outline ripple icon>
          <FaUser />
        </Button>
        <Button outline ripple icon color="red" className="ml-4">
          <FaTimes />
        </Button>
      </div>
    </li>
  );
};

const t = {
  en: {},
  ja: {},
};
