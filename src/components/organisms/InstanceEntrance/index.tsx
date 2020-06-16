import React, { useState } from 'react';
import { InstanceEditor } from './InstanceEditor';
import { getClientInfo } from '@/utils/Authorization/Mastodon/clientInfo';
import { Instance } from 'masto';
import { Button } from '@/components/atoms/Button';
import { InstanceInfo } from './InstanceInfo';

interface Props {}

export const InstanceEntrance: React.FC<Props> = () => {
  const [instanceUrl, setInstanceUrl] = useState('https://mstdn-workers.co');
  const [instanceInfo, setInstanceInfo] = useState<Instance | null>(null);
  const [loading, setLoading] = useState(false);
  // NodeJS.Timer
  const [timer, setTimer] = useState<any | null>(null);

  const handleInput = (url: string) => {
    setInstanceInfo(null);
    setLoading(true);
    setInstanceUrl(url);

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        getClientInfo(url)
          .then((instance) => {
            setInstanceInfo(instance);
            console.log(instance);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 400)
    );
  };
  return (
    <>
      <InstanceEditor
        instanceUrl={instanceUrl}
        onChange={handleInput}
        className="w-full"
      />
      <Button disable={!instanceInfo}>
        {loading ? 'loading' : 'ログインする'}
      </Button>
      {instanceInfo && <InstanceInfo instanceInfo={instanceInfo} />}
    </>
  );
};