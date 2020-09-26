import { User } from '@/types/db';
import Masto, { CreateStatusParams } from 'masto';

export function createMastoFromUser(user: User) {
  return Masto.login({
    uri: user.origin,
    accessToken: user.accessToken,
  });
}

export function createStatus(user: User, params: CreateStatusParams) {
  return createMastoFromUser(user).then((masto) => {
    return masto.createStatus(params);
  });
}
