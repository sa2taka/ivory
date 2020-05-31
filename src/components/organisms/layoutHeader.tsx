import React from 'react';
import './LayoutHeader.scss';
import 'public/ivory-logo.png';

export function LayoutHeader() {
  return (
    <header className="LayoutHeader h-16">
      <div className="h-full .z-0 flex relative items-center">
        <div className="flex ml-4 items-center">
          <img src="ivory-logo.png" className="h-8 w-8"></img>
          <span className="ml-2 text-2xl font-semibold">Ivory</span>
        </div>
      </div>
    </header>
  );
}
