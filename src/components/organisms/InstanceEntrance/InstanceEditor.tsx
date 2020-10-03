import React, { ChangeEvent, useCallback } from 'react';

interface Props {
  instanceUrl?: string;
  onChange?: (newUrl: string) => void;
  className?: string;
}

export const InstanceEditor: React.FC<Props> = ({
  instanceUrl,
  onChange,
  className,
}) => {
  let url = instanceUrl || '';
  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    url = event.target.value;
  }, []);

  return (
    <div className={`${className} md:flex md:items-center mb-6`}>
      <div className="w-48">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="instance-url"
        >
          インスタンスURL
        </label>
      </div>
      <div className="w-full">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight transition-all duration-200 focus:outline-none focus:bg-white focus:border-primary"
          id="instance-url"
          type="text"
          value={url}
          onChange={handleInput}
          placeholder="https://mstdn-workers.com/"
        />
      </div>
    </div>
  );
};
