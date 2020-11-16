import { TRecord } from '@/types/thinI18n';
import React from 'react';
import { TreeElement } from '../components/molecules/Tree/TreeItem';
import { List } from '../components/pages/setting/Account/List';

interface SettingElement extends TreeElement {
  element?: React.ReactNode;
  children?: SettingElement[];
}

export const settings: SettingElement[] = [
  {
    title: 'ivory',
    key: 'ivory',
  },
  {
    title: 'account',
    key: 'account',
    children: [{ title: 'list', key: 'list', element: <List /> }],
  },
];

export const t: TRecord = {
  en: {
    ivory: 'Ivory',
    account: 'Account',
    list: 'List',
  },
  ja: {
    ivory: 'Ivory',
    account: 'アカウント',
    list: '一覧',
  },
};
