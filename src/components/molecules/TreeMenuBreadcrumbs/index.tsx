import React, { useMemo } from 'react';
// import './index.scss';
import { useHistory } from 'react-router-dom';
import { stringify } from 'querystring';

interface Props {
  path: string[];
}

export const TreeMenuBreadcrumbs: React.FC<Props> = ({ path }) => {
  const history = useHistory();
  const breadcrumbs = useMemo(() => {
    return path.map((v, i) => {
      <li
        key={i}
        className={i === path.length - 1 ? 'pointer-events-none' : ''}
      >
        <a
          onClick={() => {
            history.replace(`?${stringify({ path: path.slice(0, i + 1) })}`);
          }}
        >
          v
        </a>
      </li>;
    });
  }, [path]);
  return (
    <nav className="h-full">
      <ul>{breadcrumbs}</ul>
    </nav>
  );
};
