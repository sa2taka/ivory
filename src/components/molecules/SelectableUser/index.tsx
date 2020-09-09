import React, { useState } from 'react';
import { User } from '@/types/db';
import { getAllUsers } from '@/utils/DB';

interface Props {}

export const SelectableUser: React.FC<Props> = () => {
  const [users, setUsers] = useState<User[]>([]);

  getAllUsers().then((_users) => {
    setUsers(_users);
  });

  return <div></div>;
};
