import React from 'react';
import 'public/ivory-logo.png';

interface Props {
  className?: string;
}

export const TitleLogo: React.FC<Props> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="ivory-logo.png" className="h-8 w-8"></img>
      <span className="ml-2 text-2xl font-semibold">Ivory</span>
    </div>
  );
};
