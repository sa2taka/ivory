import React from 'react';

interface Props {
  iconImg: string;
  className?: string;
}

export const UserIcon: React.FC<Props> = ({ iconImg, className }) => {
  return (
    <img className={`w-16 h-16 rounded-full ${className} `} src={iconImg}></img>
  );
};