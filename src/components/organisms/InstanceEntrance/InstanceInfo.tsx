import React from 'react';
import './InstanceInfo.scss';
import { Instance } from 'masto';

interface Props {
  instanceInfo: Instance;
}

export const InstanceInfo: React.FC<Props> = ({ instanceInfo }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row mt-4 items-center md:items-stretch">
      <div className="w-1/2 flex flex-col mr-2 h-full">
        <h2 className="ml-2 text-2xl fade-appear-left animation-ease-in-out">
          {instanceInfo.title}
        </h2>
        <p className="fade-appear-left animation-ease-in-out animation-delay-100">
          {instanceInfo.shortDescription}
        </p>
        <div className="flex-1"></div>
        <p className="text-right fade animation-ease-in-out animation-delay-200">
          {instanceInfo.uri}
        </p>
      </div>
      <img
        className="w-1/2 ml-2 fade-appear-right animation-ease-in-out animation-delay-200 object-cover"
        src={instanceInfo.thumbnail || ''}
      ></img>
    </div>
  );
};
