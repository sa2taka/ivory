import React from 'react';
import 'public/ivory-logo.png';

interface Props {}

export const TitleLogo: React.FC<Props> = () => {
  return (
    <div className="flex ml-4 items-center">
      <img src="ivory-logo.png" className="h-8 w-8"></img>
      <span className="ml-2 text-2xl font-semibold">Ivory</span>
    </div>
  );
};
