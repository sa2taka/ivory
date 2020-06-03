import React from 'react';
import './GettingStarted.scss';
import { TitleLogo } from '@/components/atoms/TitleLogo';

interface Props {}

export const GettingStarted: React.FC<Props> = (props) => {
  return (
    <>
      <TitleLogo />
      <h1>ivoryはクロスプラットフォームのMastodonクライアントです。</h1>
    </>
  );
};
