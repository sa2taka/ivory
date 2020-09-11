import React from 'react';
import { TootColumn } from '@/components/templates/Columns/TootColumn';

interface Props {}

export const Main: React.FC<Props> = () => {
  return (
    <div className="h-full flex">
      <TootColumn />
    </div>
  );
};
