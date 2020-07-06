import Nedb from 'nedb';
import { Client, User } from '@/types/db';
import path from 'path';

const STORES_PATH = path.resolve(process.cwd(), 'data');
const stores: Record<string, Nedb> = {};

export function initialStore() {
  clients();
  users();
}

// client
function clients() {
  if (!stores.client) {
    stores.client = new Nedb<Client>({
      filename: path.resolve(STORES_PATH, 'client.db'),
      autoload: true,
    });
  }
  return stores.client;
}

export function saveClient(client: Client) {
  const c = clients();
  return promisifyInsert<Client>(c.insert.bind(c), client);
}

export function getClientFromUri(uri: string) {
  const c = clients();
  return promisifyFind<Client[]>(c.find.bind(c), { uri }).then((result) => {
    return result[0];
  });
}

// user

export function users() {
  if (!stores.users) {
    stores.users = new Nedb<User>({
      filename: path.resolve(STORES_PATH, 'users.db'),
      autoload: true,
    });
  }
  return stores.users;
}

export function saveUser(user: User) {
  const u = users();
  return promisifyInsert<User>(u.insert.bind(u), user);
}

export function getUser(domain: string, userId: string) {
  const u = users();
  return promisifyFind<User[]>(u.find.bind(u), {
    domain,
    userId,
  }).then((result) => {
    return result[0];
  });
}

export function getAllUsers() {
  const u = users();
  return promisifyFind<User[]>(u.find.bind(u), {});
}

function promisifyInsert<T>(
  insert: (item: T, callback: (err: Error, document: T) => void) => void,
  item: T
) {
  return new Promise<T>((resolve, reject) => {
    insert(item, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

function promisifyFind<T = any>(
  find: (
    query: any,
    projection?: any,
    callback?: (err: Error, result: T) => void
  ) => void,
  query: any,
  projection: any = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    find(query, projection, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
