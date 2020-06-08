import Masto from 'masto';

import masto from './masto';

export function getClientInfo(originUri: string) {
  const uriWithURLObject = new URL(originUri);
  const uri = uriWithURLObject.origin;
  const version = '1.0.0';

  return masto({ uri, version })
    .then((i: Masto) => {
      return i.fetchInstance();
    })
    .catch(() => {
      return Promise.reject('Instance not found');
    });
}
