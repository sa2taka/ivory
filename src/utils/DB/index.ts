import { Client, User } from '@/types/db';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const stores: Record<string, PouchDB.Database<any>> = {};
const clientDB: PouchDB.Database<Client> = clients();
const userDB: PouchDB.Database<User> = users();

function clients() {
  if (!stores.client) {
    stores.client = new PouchDB<Client>('client');
    stores.client.createIndex({
      index: {
        fields: ['domain', 'clientId'],
      },
    });
  }
  return stores.client;
}

function users() {
  if (!stores.users) {
    stores.users = new PouchDB<Client>('user');
    stores.users.createIndex({
      index: {
        fields: ['domain', 'userId', 'lastSelectedAt'],
      },
    });
  }
  return stores.users;
}

export function saveClient(client: Client) {
  return clientDB.put(client).then((result) => {
    return client;
  });
}

export function getClientFromUri(domain: string) {
  return clientDB
    .find({
      selector: {
        domain,
      },
    })

    .then((result) => {
      return result.docs.filter((doc) => {
        return !doc._id.startsWith('_design/');
      })[0];
    });
}

export function saveUser(user: User) {
  return userDB.put(user).then(() => {
    return user;
  });
}

export function getUser(domain: string, userId: string) {
  return userDB.get(userId + domain);
}

export function getAllUsers() {
  return userDB
    .allDocs({
      include_docs: true,
    })
    .then((result) => {
      return result.rows
        .map(({ doc }) => {
          return doc as PouchDB.Core.ExistingDocument<
            User & PouchDB.Core.AllDocsMeta
          >;
        })
        .sort((a, b) => {
          return b!.lastSelectedAt - a!.lastSelectedAt;
        })
        .filter((doc) => {
          // 何故か追加していないdocが追加されているのでここで省いている
          return !doc._id.startsWith('_design/');
        });
    });
}
