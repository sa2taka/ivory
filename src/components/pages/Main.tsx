import React from 'react';
import { TootColumn } from '@/components/templates/Columns/TootColumn';
import { SideHeader } from '../molecules/SideHeader';

interface Props {}

export const Main: React.FC<Props> = () => {
  return (
    <div className="h-full flex">
      <SideHeader />
      <TootColumn />
    </div>
  );
};
