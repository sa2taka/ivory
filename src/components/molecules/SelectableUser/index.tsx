import React, { useState } from 'react';
import { User } from '@/types/db';
import { getAllUsers } from '@/utils/DB';
import { Select } from '@/components/atoms/Select';
import { User as UserElement } from '../User';

interface Props {
  onSelect?: (user: User) => void;
  className?: string;
}

export const SelectableUser: React.FC<Props> = ({ onSelect, className }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [index, setIndex] = useState<number | undefined>(undefined);

  if (users.length === 0) {
    getAllUsers().then((_users) => {
      setUsers(_users);
      if (onSelect) {
        onSelect(_users[0]);
      }
      setIndex(0);
    });
  }

  const getUserOptions = () => {
    return users.map((user) => {
      return {
        key: user.userId,
        value: user.userId,
        display: <UserElement userInfo={user.userInfo} />,
      };
    });
  };

  return (
    <Select
      label="ユーザー"
      options={getUserOptions()}
      onSelect={(index) => {
        setIndex(index);
        if (users[index] && onSelect) {
          onSelect(users[index]);
        }
      }}
      optionHeight={64}
      select={index}
      className={`${className ? className : ''}`}
    />
  );
};
