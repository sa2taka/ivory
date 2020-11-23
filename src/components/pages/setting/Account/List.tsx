import { Button } from '@/components/atoms/Button';
import { getAllUsers } from '@/utils/DB';
import { useThinI18n } from '@/utils/thinI18n';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './List.scss';
import { ListUser } from './ListUser';

interface Props {}

export const List: React.FC<Props> = () => {
  const lang = useThinI18n();

  const [display, setDisplay] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    getAllUsers().then((_users) => {
      setDisplay(
        _users.map((user) => (
          <ListUser
            key={user.domain + user.userId}
            user={user}
            className="mt-3"
          />
        ))
      );
    });
  }, []);
  return (
    <div className="flex flex-col items-center w-full mx-10 mt-12">
      <h1>{t[lang].title}</h1>
      <ul className="mt-6">{display}</ul>
      <Button text ripple className="mt-6 flex items-center">
        <FaPlus className="mr-2" />
        ユーザーを追加する
      </Button>
    </div>
  );
};

const t = {
  en: {
    title: 'Account List',
  },
  ja: {
    title: 'アカウント一覧',
  },
};