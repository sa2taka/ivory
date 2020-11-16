import React, { useMemo } from 'react';
import { SettingMenu } from '../molecules/SettingMenu';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { parse } from 'querystring';
import { settings } from '@/items/settings';

interface Props extends RouteComponentProps {}

export const Settings = withRouter<Props, React.FC<Props>>(({ history }) => {
  const treePath: string[] = useMemo(() => {
    const path = parse(history.location.search.replace('?', '')).path;

    return path ? (Array.isArray(path) ? path : [path]) : [];
  }, [history.location.search]);

  const element = useMemo(() => {
    const copiedPath = treePath.slice();
    const firstPath = copiedPath.shift();
    let setting = settings.find((v) => v.key === firstPath);
    copiedPath.forEach((p) => {
      setting = setting?.children?.find((v) => v.key === p);
    });
    if (setting && setting.element) {
      return setting.element;
    } else {
      return <></>;
    }
  }, [treePath]);

  return (
    <div className="h-full flex">
      <SettingMenu treePath={treePath} />
      {element}
    </div>
  );
});
