import React from 'react';
import { TootArea as Component } from './index';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '@/types/theme';
import { Global } from '@emotion/core';
import { css } from '@emotion/core';

export default {
  title: 'organisms',
};

const userInfo: any = {
  avatar:
    'https://s3-ap-northeast-1.amazonaws.com/mstdn-workers/accounts/avatars/000/000/424/original/b762fe018ee65ae2.jpeg',
  displayName: '( ੭˙꒳ ˙)੭とっぷら',
  acct: '@t0p_l1ght@mstdn-workers.com',
};

const user: any = {
  userInfo,
};

export const TootArea = () => {
  return <Component user={user} className="w-3/5" />;
};
