import React from 'react';
import { InstanceEntrance } from '../organisms/InstanceEntrance';

interface Props {}

export const LoginMatodon: React.FC<Props> = () => {
  return (
    <main className="mx-auto flex items-center flex-col w-4/5 mt-16">
      <InstanceEntrance />
    </main>
  );
};
