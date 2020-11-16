import React, { useCallback } from 'react';
import './index.scss';

import { TreeElement, TreeItem } from '@/components/molecules/Tree/TreeItem';
import { css } from 'emotion';

interface Props {
  items: TreeElements;
  treePath: string[];
  hide?: boolean;
  className?: string;
  onClickChild?: (path: string[]) => void;
}

export type TreeElements = TreeElement[];

const oneElementHeight = 48; // hard code

export const Tree: React.FC<Props> = ({
  items,
  className,
  hide,
  onClickChild,
  treePath,
}) => {
  const onClick = useCallback(
    (path: string[]) => {
      onClickChild && onClickChild(path);
    },
    [onClickChild]
  );
  return (
    <ul
      className={`ml-4 box-border overflow-hidden TreeHeightAnimation ${
        className || ''
      }`}
      style={
        hide === undefined
          ? {}
          : {
              maxHeight: oneElementHeight * (hide ? 0 : items.length),
            }
      }
    >
      {items.map((item) => {
        return (
          <TreeItem
            key={item.key}
            item={item}
            onClick={onClick}
            treePath={treePath}
          />
        );
      })}
    </ul>
  );
};
