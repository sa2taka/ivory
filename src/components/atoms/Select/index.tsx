import React, { useState } from 'react';
import './index.scss';
import { WaiArea } from '@/types/waiAria';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Theme } from '@/types/theme';
import { darken, isDark, lighten, thin } from '@/utils/Theme/color';

export interface Option {
  key: string;
  value: string;
  text?: string;
  className?: string;
  icon?: React.ReactNode;
}

interface Props {
  label: string;
  className?: string;
  options: Array<Option>;
  select?: number;
  optionHeight?: 24;
  onSelect?: (index: number) => void;
}

export const Select: React.FC<Props> = ({
  label,
  className,
  options,
  optionHeight,
  select,
  onSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(select);
  const [open, setOpen] = useState(false);
  const theme = useTheme<Theme>();
  const _optionHeight = optionHeight || 32;

  const borderColor = isDark(theme.background)
    ? lighten(theme.background)
    : darken(theme.background);
  const focusedBorderColor = isDark(theme.background)
    ? lighten(theme.background, 30)
    : darken(theme.background, 30);
  const labelColor = isDark(theme.text)
    ? lighten(theme.text, 20)
    : darken(theme.text, 20);

  const borderClass = css({
    border: `1px solid ${borderColor}`,
    '&:hover': {
      border: `1px solid ${focusedBorderColor}`,
    },
    '&:focus-within': {
      border: `1px solid ${thin(theme.primary, 0.3)}`,
    },
  });

  const labelTransformClass = css({
    transform: `translateX(-4px) translateY(calc(${-_optionHeight}px + 0.6em))`,
  });

  const hoverOptionClass = css({
    '&:hover': {
      backgroundColor: borderColor,
    },
  });

  const renderOptions = (options: Array<Option>, height: number) => {
    return options.map((option, index) => {
      return renderOption(option, index, height, { role: 'option' });
    });
  };

  const renderOption = (
    option: Option,
    index: number,
    height: number,
    { role, ariaLive }: WaiArea
  ) => {
    return (
      <div
        role={role}
        aria-live={ariaLive}
        className={`transition-all ease-in-out duration-150 flex items-center px-3 ${hoverOptionClass} ${
          option.className || ''
        }`}
        key={option.key}
        style={{ height: `${height}px` }}
        onClick={() => {
          if (open) {
            setSelectedIndex(index);
            setOpen(false);
            onSelect && onSelect(index);
          }
        }}
      >
        {option.icon}
        {option.text || option.value}
      </div>
    );
  };

  return (
    <div role="listbox" className={`Select  ${borderClass} ${className || ''}`}>
      <div
        className="flex select-none items-center px-3 my-2"
        style={{ height: `${_optionHeight}px` }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <label
          style={{ color: labelColor }}
          className={`absolute transform duration-100 ease-in-out ${
            selectedIndex !== undefined && `SelectLabel ${labelTransformClass}`
          }`}
        >
          {label}
        </label>
        {selectedIndex !== undefined && (
          <div
            aria-live="polite"
            className={`flex items-center ${
              options[selectedIndex].className || ''
            }`}
            key={options[selectedIndex].key}
          >
            {options[selectedIndex].icon}
            {options[selectedIndex].text || options[selectedIndex].value}
          </div>
        )}

        <span className="flex-1"></span>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <div
        className={`${
          open ? 'opacity-100' : 'opacity-0'
        } select-none transition-opacity duration-75 ease`}
      >
        {renderOptions(options, open ? _optionHeight : 0)}
      </div>
    </div>
  );
};
