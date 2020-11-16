import React, { useCallback, useMemo, useRef, useState } from 'react';
import './index.scss';
import { WaiArea } from '@/types/waiAria';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { darken, isDark, lighten, thin } from '@/utils/Theme/color';
import { useOutsideClickDetector } from '@/components/util/outsideClickDetector';

export interface Option {
  key: string;
  value: string;
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  display?: React.ReactNode;
}

interface Props {
  label: string;
  className?: string;
  options: Array<Option>;
  select?: number;
  optionHeight?: number;
  onSelect?: (index: number) => void;
  outline?: boolean;
}

export const Select: React.FC<Props> = ({
  label,
  className,
  options,
  optionHeight,
  select,
  onSelect,
  outline,
}) => {
  const [localIndex, setLocalIndex] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const _optionHeight = optionHeight || 42;
  const usingSelect = select !== undefined ? select : localIndex;

  const wrapperRef = useRef(null);
  useOutsideClickDetector(wrapperRef, () => {
    setOpen(false);
  });

  const borderColor = isDark(theme.background)
    ? lighten(theme.background)
    : darken(theme.background);
  const focusedBorderColor = isDark(theme.background)
    ? lighten(theme.background, 30)
    : darken(theme.background, 30);
  const labelColor = isDark(theme.text)
    ? lighten(theme.text, 20)
    : darken(theme.text, 20);

  const underLineClass = useMemo(
    () =>
      css({
        '&::before': {
          bottom: '-1px',
          content: "''",
          left: '0',
          position: 'absolute',
          transition: '.3s ease',
          width: '100%',
          borderStyle: 'solid',
          borderWidth: 'thin 0 0',
          borderColor: borderColor,
        },
        '&:hover::before': {
          borderColor: `${focusedBorderColor}`,
        },
        '&:focus::before': {
          borderColor: `${thin(theme.primary, 0.3)}`,
        },
        '&:focus-within::before': {
          borderColor: `${thin(theme.primary, 0.3)}`,
        },
      }),
    [borderColor, focusedBorderColor, theme.primary]
  );

  const borderClass = useMemo(
    () =>
      css({
        border: `1px solid ${borderColor}`,
        '&:hover': {
          border: `1px solid ${focusedBorderColor}`,
        },
        '&:focus-within': {
          border: `1px solid ${thin(theme.primary, 0.3)}`,
        },
      }),
    [borderColor, focusedBorderColor, theme.primary]
  );

  const labelTransformClass = useMemo(
    () =>
      css({
        transform: `translateX(-4px) translateY(calc(${-_optionHeight}px + 1em))`,
      }),
    [_optionHeight]
  );

  const hoverOptionClass = useMemo(
    () =>
      css({
        '&:hover': {
          backgroundColor: borderColor,
        },
      }),
    [borderColor]
  );

  const toggleOpen = useCallback((event: React.MouseEvent) => {
    // 開いているときはOptionをクリックしていなければ閉じる
    if (
      !open ||
      !event.target ||
      !(event.target as Element).closest('.Option')
    ) {
      setOpen((prev) => !prev);
    }
  }, []);

  const renderOptions = useCallback(
    (options: Array<Option>, height: number) => {
      return options.map((option, index) => {
        return renderOption(option, index, height, { role: 'option' });
      });
    },
    [options]
  );

  const renderOption = useCallback(
    (
      option: Option,
      index: number,
      height: number,
      { role, ariaLive }: WaiArea
    ) => {
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setLocalIndex(index);
        setOpen(false);
        onSelect && onSelect(index);
      };
      return (
        <div
          role={role}
          aria-live={ariaLive}
          className={`transition-all ease-in-out duration-150 flex items-center px-3 Option ${hoverOptionClass} ${
            option.className || ''
          }`}
          key={option.key}
          style={{ height: `${height}px` }}
          onClick={handleClick}
        >
          {option.display ? (
            option.display
          ) : (
            <>
              {option.icon}
              {option.text || option.value}
            </>
          )}
        </div>
      );
    },
    [onSelect, options]
  );

  return (
    <div
      className={`relative ${open ? 'z-40' : ''}`}
      style={{ height: `calc(${_optionHeight}px + 2em)` }}
      ref={wrapperRef}
    >
      <div
        role="listbox"
        onClick={toggleOpen}
        className={`Select absolute mt-5 z-30 rounded-lg transition-colors duration-300 ease-in-out ${
          outline ? borderClass : ''
        } ${className || ''} ${open ? 'SelectShadow BackgroundMain' : ''}`}
      >
        <div
          className={`flex select-none items-center px-3 mt-2 relative rounded-t-lg ${
            outline ? '' : underLineClass
          }`}
          style={{ height: `${_optionHeight}px` }}
        >
          <label
            style={{ color: labelColor }}
            className={`absolute transform duration-100 ease-in-out ${
              usingSelect !== undefined && `SelectLabel ${labelTransformClass}`
            }`}
          >
            {label}
          </label>
          {usingSelect !== undefined && (
            <div
              aria-live="polite"
              className={`flex items-center ${
                options[usingSelect].className || ''
              }`}
              key={options[usingSelect].key}
            >
              {options[usingSelect].display ? (
                options[usingSelect].display
              ) : (
                <>
                  {options[usingSelect].icon}
                  {options[usingSelect].text || options[usingSelect].value}
                </>
              )}
            </div>
          )}

          <span className="flex-1"></span>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <div
          className={`${
            open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } select-none transition-opacity duration-75 ease w-full BackgroundMain rounded-b-lg overflow-hidden`}
        >
          {renderOptions(options, open ? _optionHeight : 0)}
        </div>
      </div>
    </div>
  );
};
