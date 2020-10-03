import React from 'react';
import { User as Component } from './index';
export default {
  title: 'molecules',
};

const userInfo: any = {
  avatar:
    'https://s3-ap-northeast-1.amazonaws.com/mstdn-workers/accounts/avatars/000/000/424/original/b762fe018ee65ae2.jpeg',
  displayName: '( ੭˙꒳ ˙)੭とっぷら',
  acct: 't0p_l1ght',
  url: 'https://mstdn-workers.com',
};

export const User = () => <Component userInfo={userInfo} />;
