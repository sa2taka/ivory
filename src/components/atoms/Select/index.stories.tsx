import React from 'react';
import { Select as Component, Option } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../molecules/User/index';

export default {
  title: 'atoms',
};

const options: Array<Option> = [
  { key: '1', value: '1' },
  { key: '2', value: '2', text: 'two' },
  {
    key: '3',
    value: '3',
    text: 'three',
    icon: <FontAwesomeIcon icon={faCubes} />,
  },
];
const userInfo: any = {
  avatar:
    'https://s3-ap-northeast-1.amazonaws.com/mstdn-workers/accounts/avatars/000/000/424/original/b762fe018ee65ae2.jpeg',
  displayName: '( ੭˙꒳ ˙)੭とっぷら',
  acct: '@t0p_l1ght@mstdn-workers.com',
  url: 'https://mstdn-workers.com',
};

const userOptions: Array<Option> = [
  { key: 't1', value: 't1', display: <User userInfo={userInfo} /> },
  { key: 't2', value: 't2', display: <User userInfo={userInfo} /> },
];
export const Select = () => (
  <>
    <Component
      label="ユーザー"
      options={userOptions}
      optionHeight={56}
      className="m-4"
    />
    <Component
      label="リストボックス"
      options={options}
      outline
      className="m-4"
    />
  </>
);
