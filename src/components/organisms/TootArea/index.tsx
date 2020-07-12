import React, { ChangeEvent, useState } from 'react';
import './index.scss';
import { User } from '@/components/molecules/User';
import { User as IUser } from '@/types/db';
import { Button } from '@/components/atoms/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Theme } from '@/types/theme';
import { darken, isDark, lighten, thin } from '@/utils/Theme/color';
import { useThinI18n } from '@/utils/thinI18n';
interface Props {
  user: IUser;
  className?: string;
}

export const TootArea: React.FC<Props> = ({ user, className }) => {
  const [toot, setToot] = useState('');
  const theme = useTheme<Theme>();
  const footerColorClass = css({
    backgroundColor: isDark(theme.background)
      ? lighten(theme.background)
      : darken(theme.background),
  });
  const textareaColorClass = css({
    backgroundColor: isDark(theme.background)
      ? darken(theme.background)
      : lighten(theme.background),
  });
  const primaryLightShadowClass = css({
    '&:focus-within': {
      'box-shadow': `0 1px 6px 1px ${thin(theme.primary, 0.3)}`,
    },
  });

  function handleInput(event: ChangeEvent<HTMLTextAreaElement>) {
    setToot(event.target.value);
  }

  const lang = useThinI18n();

  return (
    <div className={`mx-6 flex flex-col ${className}`}>
      <User userInfo={user.userInfo} />
      <div
        className={`shadow-md transition-shadow duration-200 mt-3 ease-out TootArea-LightWhenFocus ${primaryLightShadowClass}`}
      >
        {/* ネガティブマージンは無駄な隙間が生じることにより挿入。原因がわかれば取り除く */}
        <textarea
          className={`resize-none p-2 rounded-t w-full -mb-2 TootArea-Textarea TootArea-InnerBottomShadow ${textareaColorClass}`}
          onChange={handleInput}
        >
          {toot}
        </textarea>
        <div
          className={`rounded-b mt-0 w-full p-2 flex TootArea-TootFooter ${footerColorClass}`}
        >
          <div className="flex-auto" />
          <span className="mr-2">{500 - toot.length}</span>
        </div>
      </div>
      <Button className="mt-2 self-end">{t[lang].toot}</Button>
    </div>
  );
};

const t = {
  en: {
    toot: 'Toot!',
  },
  ja: {
    toot: 'Toot!',
  },
};
