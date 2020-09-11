import React, { ChangeEvent, useState } from 'react';
import './index.scss';
import { User as IUser } from '@/types/db';
import { Button } from '@/components/atoms/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Theme } from '@/types/theme';
import { darken, isDark, lighten, thin } from '@/utils/Theme/color';
import { useThinI18n } from '@/utils/thinI18n';
import { SelectableUser } from '@/components/molecules/SelectableUser';
interface Props {
  className?: string;
}

export const TootArea: React.FC<Props> = ({ className }) => {
  const [toot, setToot] = useState('');
  const [user, setUser] = useState<IUser | null>(null);
  const theme = useTheme<Theme>();
  const footerColorClass = css({
    backgroundColor: isDark(theme.background)
      ? lighten(theme.background)
      : darken(theme.background),
  });

  const primaryLightShadowClass = css({
    '&:focus-within': {
      boxShadow: `0 1px 6px 1px ${thin(theme.primary, 0.3)}`,
    },
  });

  function handleInput(event: ChangeEvent<HTMLTextAreaElement>) {
    setToot(event.target.value);
  }

  function handleSelect(user: IUser) {
    setUser(user);
  }

  const lang = useThinI18n();

  return (
    <div className={`mx-6 flex flex-col ${className}`}>
      <SelectableUser onSelect={handleSelect} />
      <div
        className={`shadow-md transition-shadow duration-200 mt-3 ease-out TootArea-LightWhenFocus ${primaryLightShadowClass}`}
      >
        {/* ネガティブマージンは無駄な隙間が生じることにより挿入。原因がわかれば取り除く */}
        <textarea
          className={`resize-none p-2 rounded-t w-full -mb-2 TootArea-Textarea TootArea-InnerBottomShadow`}
          onChange={handleInput}
          value={toot}
        ></textarea>
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
