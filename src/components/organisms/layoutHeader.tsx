import React from 'react';
import './LayoutHeader.scss';
import { TitleLogo } from '@/components/atoms/TitleLogo';

export function LayoutHeader() {
  return (
    <header className="LayoutHeader h-16">
      <div className="h-full .z-0 flex relative items-center">
        <TitleLogo />
      </div>
    </header>
  );
}
