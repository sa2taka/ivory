import React from 'react';
import { OneColumn } from '@/components/organisms/OneColumn';
import { TootArea } from '@/components/organisms/TootArea';

interface Props {}

export const TootColumn: React.FC<Props> = () => {
  return (
    <OneColumn>
      <TootArea className="mt-4" />
    </OneColumn>
  );
};
