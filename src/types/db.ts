import { AccountCredentials } from 'masto';

export interface Client {
  _id: string;
  domain: string;
  origin: string;
  version: string;
  clientId: string;
  clientSecret: string;
  vapidKey?: string | null;
}

export interface User {
  _id: string;
  domain: string;
  origin: string;
  userId: string;
  userInfo: AccountCredentials;
  accessToken: string;
  lastSelectedAt: number;
}
