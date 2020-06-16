import React from 'react';

import queryString from 'query-string';
import { Loading } from '../atoms/Loading';

interface Props {
  qs: queryString.ParsedQuery;
}

export const Auth: React.FC<Props> = ({ qs }) => {
  const instanceUrl = qs.instanceUrl;
  if (typeof instanceUrl !== 'string') {
    window.opener.postMessage('error');
    return null;
  }
  return (
    <div className="w-full h-full m-auto">
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex items-center justify-center">
          <Loading />
          <span className="ml-2 text-4xl">Loading</span>
        </div>
        <span>自動的にログインページに遷移します</span>
      </div>
    </div>
  );
};
