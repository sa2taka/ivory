import React, { useCallback, useState } from 'react';
import { InstanceEditor } from './InstanceEditor';
import { Instance } from 'masto';
import { Button } from '@/components/atoms/Button';
import { InstanceInfo } from './InstanceInfo';
import {
  fetchClientInfo,
  manageAuthentication,
  fetchUserInfo,
} from '@/utils/Authorization/Mastodon/authorization';
import { useHistory } from 'react-router';

interface Props {}

export const InstanceEntrance: React.FC<Props> = () => {
  const [instanceUrl, setInstanceUrl] = useState('https://mastodon.sa2taka.co');
  const [instanceInfo, setInstanceInfo] = useState<Instance | null>(null);
  const [loading, setLoading] = useState(false);
  // NodeJS.Timer
  const [timer, setTimer] = useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const history = useHistory();

  const handleInput = useCallback((url: string) => {
    setInstanceInfo(null);
    setLoading(true);
    setInstanceUrl(url);

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        fetchClientInfo(url)
          .then((instance) => {
            setInstanceInfo(instance);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 400)
    );
  }, []);

  const handleClick = useCallback(() => {
    if (instanceInfo) {
      manageAuthentication(instanceInfo.uri, instanceInfo.version)
        .then(({ token, version }) => {
          return fetchUserInfo(instanceUrl, version, token);
        })
        .then(() => {
          history.push('/');
        });
    }
  }, []);

  return (
    <>
      <InstanceEditor
        instanceUrl={instanceUrl}
        onChange={handleInput}
        className="w-full"
      />
      <Button disable={!instanceInfo} onClick={handleClick}>
        {loading ? 'loading' : 'ログインする'}
      </Button>
      {instanceInfo && <InstanceInfo instanceInfo={instanceInfo} />}
    </>
  );
};
