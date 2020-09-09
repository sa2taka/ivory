import React from 'react';
import './index.scss';

import { AccountCredentials } from 'masto';
import { UserIcon } from '@/components/atoms/UserIcon';

interface Props {
  userInfo: AccountCredentials;
}

export const User: React.FC<Props> = ({ userInfo }) => {
  return (
    <div className="grid user-icon-grid-template-cols gap-x-2">
      <UserIcon iconImg={userInfo.avatar} className="row-span-2" />
      <span className="row-span-1 col-start-2 mt-2 text-lg font-semibold">
        {userInfo.displayName}
      </span>
      <span className="row-span-1 col-start-2 mb-2 align-top text-xs">
        {userInfo.acct}
      </span>
    </div>
  );
};
