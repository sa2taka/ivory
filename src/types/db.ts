import { AccountCredentials } from 'masto';

export interface Client {
  domain: string;
  version: string;
  clientId: string;
  clientSecret: string;
  vapidKey?: string | null;
}

export interface User {
  domain: string;
  userId: string;
  userInfo: AccountCredentials;
  accessToken: string;
  lastSelectedAt: Date;
}
