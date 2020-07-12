import React, { createContext, useContext } from 'react';
import { Lang } from '@/types/thinI18n';

export const ThinI18nContext = createContext<Lang>('ja');

export const ThinI18nProvider: React.FC<{ lang: Lang }> = ({
  lang,
  children,
}) => {
  return (
    <ThinI18nContext.Provider value={lang}>{children}</ThinI18nContext.Provider>
  );
};

export const useThinI18n = () => useContext(ThinI18nContext);
