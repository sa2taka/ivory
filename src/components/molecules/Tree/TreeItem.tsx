import React, { useMemo } from 'react';
import './TreeItem.scss';
import { Tree } from '@/components/molecules/Tree';
import { FaAngleRight } from 'react-icons/fa';
import { t } from '@/items/settings';
import { useThinI18n } from '@/utils/thinI18n';

interface Props {
  item: TreeElement;
  onClick?: (path: string[]) => void;
  treePath: string[];
}

export interface TreeElement {
  title: string;
  key: string;
  children?: TreeElement[];
}

export const TreeItem: React.FC<Props> = ({ item, treePath, onClick }) => {
  const lang = useThinI18n();

  const isOpen = useMemo(() => treePath[0] === item.key, [treePath]);
  const childTreePath = useMemo(() => treePath.slice(1), [treePath]);

  const onItemClick = React.useCallback(() => {
    if (isOpen && childTreePath.length === 0 && item.children) {
      return onClick && onClick([]);
    }
    onClick && onClick([item.key]);
  }, [onClick, treePath]);

  const onClickChild = React.useCallback(
    (path: string[]) => {
      onClick && onClick([item.key].concat(path));
    },
    [onClick]
  );

  return (
    <li className="box-border relative">
      <a
        className="flex my-3 cursor-pointer select-none items-center"
        onClick={onItemClick}
      >
        {item.children ? (
          <FaAngleRight
            className={
              isOpen ? 'transform rotate-90 RotateAnimation' : 'RotateAnimation'
            }
          />
        ) : (
          <div className="ml-4" />
        )}
        {t[lang][item.title] || item.title}
      </a>
      {item.children && (
        <Tree
          items={item.children}
          onClickChild={onClickChild}
          treePath={childTreePath}
          hide={!isOpen}
        />
      )}
    </li>
  );
};
