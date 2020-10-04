import React, { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/db';
import { getAllUsers } from '@/utils/DB';
import { Option, Select } from '@/components/atoms/Select';
import { User as UserElement } from '../User';

interface Props {
  onSelect?: (user: User) => void;
  className?: string;
}

export const SelectableUser: React.FC<Props> = ({ onSelect, className }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getAllUsers().then((_users) => {
      setUsers(_users);
      setOptions(
        _users.map((user) => {
          return {
            key: user.userId,
            value: user.userId,
            display: <UserElement userInfo={user.userInfo} />,
          };
        })
      );
      if (onSelect) {
        onSelect(_users[0]);
      }
      setIndex(0);
    });
  }, []);

  const handleSelect = useCallback(
    (index) => {
      setIndex(index);
      if (users[index] && onSelect) {
        onSelect(users[index]);
      }
    },
    [users, index, options]
  );

  return (
    <Select
      label="ユーザー"
      options={options}
      onSelect={handleSelect}
      optionHeight={64}
      select={index}
      className={`${className ? className : ''}`}
    />
  );
};
