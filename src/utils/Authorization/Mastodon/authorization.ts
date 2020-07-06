import Masto, { Client } from 'masto';
import masto from './masto';
import { APP_NAME } from '@/AppParamters';
import {
  getClientFromUri,
  saveClient,
  saveUser,
  getAllUsers,
} from '@/utils/DB';
import Electron from 'electron';

export async function isAuthorized() {
  const user = (await getAllUsers())[0];
  if (user) {
    return true;
  } else {
    return false;
  }
}

// Authorization Flow
const redirectUri = 'urn:ietf:wg:oauth:2.0:oob';

export function fetchClientInfo(originUri: string) {
  const uriWithURLObject = new URL(originUri);
  const uri = uriWithURLObject.origin;
  const version = '1.0.0';

  return masto({ uri, version })
    .then((i: Masto) => {
      return i.fetchInstance();
    })
    .catch(() => {
      return Promise.reject('Instance not found');
    });
}

export function createAuthUrl(uri: string, clientId: string) {
  const redirectPath = 'urn:ietf:wg:oauth:2.0:oob';
  const scope = 'read write follow push';
  const responseType = 'code';
  const qs = `?response_type=${responseType}&redirect_uri=${redirectPath}&scope=${scope}&client_id=${clientId}`;
  const authPath = '/oauth/authorize';
  return uri + authPath + qs;
}

export async function createMastodonApp(uri: string, version: string) {
  const client = await getClientFromUri(uri);
  if (client) {
    return {
      clientId: client.clientId,
      clientSecret: client.clientSecret,
    };
  }

  const appConfig = {
    clientName: APP_NAME,
    redirectUris: redirectUri,
    scopes: 'read write follow push',
    website: 'https://mastodon-ivory.com',
  };

  return masto({ uri, version })
    .then((i) => {
      return i.createApp(appConfig);
    })
    .then((client: Client) => {
      if (!client.clientId || !client.clientSecret) {
        return Promise.reject('instance is not error');
      }
      const domain = new URL(uri).hostname;
      const clientId = client.clientId;
      const clientSecret = client.clientSecret;
      const vapidKey = client.vapidKey;
      return saveClient({
        domain,
        version,
        clientId,
        clientSecret,
        vapidKey,
      });
    })
    .catch((err: Error) => {
      console.error(err);
      throw err;
    });
}

/**
 *
 * @param instanceDomain
 * @param version
 * @returns Promise. retVal(string) wrapped in Promise is the accessToken
 * @description Managing the process(window) of getting AccessToken from instanceUrl and version.
 * instanceUrlとversionからAccessTokenを取得するまでの流れ(Window)を管理する
 */
export function manageAuthentication(
  instanceDomain: string,
  version: string
): Promise<{
  token: string;
  instanceDomain: string;
  version: string;
}> {
  const BrowserWindow = Electron.remote.BrowserWindow;
  const loginWindow = new BrowserWindow({ width: 720, height: 820 });

  let cId: string;
  let cSecret: string;

  return Electron.remote.session.defaultSession
    .clearStorageData()
    .then(() => {
      return createMastodonApp(`https://${instanceDomain}`, version);
    })
    .then(({ clientId, clientSecret }) => {
      cId = clientId;
      cSecret = clientSecret;
      const authUrl = createAuthUrl(`https://${instanceDomain}`, clientId);
      return loginWindow.loadURL(authUrl);
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        // 子ウィンドウからのイベントの購読
        window.addEventListener('message', (event) => {
          if (event.data === 'error') {
            loginWindow?.close();
            reject('error from child window');
          }
        });

        loginWindow.webContents.on('did-navigate', async (_, url) => {
          // リダイレクトパスをurn:ietf:wg:oauth:2.0:oobにした場合のcodeのパスの正規表現
          // 以前のバージョンではこんな感じではなかった
          const re = new RegExp(`\\/oauth\\/authorize\\/native\\?code=(.*)`);
          const matched = url.match(re);
          let code: string | null | undefined = undefined;
          if (matched) {
            code = matched[1];
          } else {
            // HACK: バージョンの違いを最低限吸収
            code = await loginWindow.webContents
              .executeJavaScript("document.querySelector('input.oauth-code')")
              .then((result) => {
                if (!result) {
                  return null;
                }
                return result.value as string | null;
              });
          }
          if (code) {
            loginWindow.close();

            fetchAccessToken(
              cId,
              cSecret,
              code,
              `https://${instanceDomain}`,
              version
            ).then((token) => {
              resolve({ token, instanceDomain, version });
            });
          }
        });
      });
    });
}

function fetchAccessToken(
  clientId: string,
  clientSecret: string,
  code: string,
  baseUrl: string,
  version: string
) {
  return masto({ uri: baseUrl, version })
    .then((i) => {
      return i.fetchAccessToken({
        grantType: 'authorization_code',
        code,
        clientId,
        clientSecret,
        redirectUri,
      });
    })
    .then((r) => {
      return r.accessToken;
    });
}

/**
 * ユーザー情報の取得と保存を行う
 * @param baseUrl
 * @param version
 * @param accessToken
 */
export function fetchUserInfo(
  baseUrl: string,
  version: string,
  accessToken: string
) {
  return masto({ uri: baseUrl, version, accessToken })
    .then((i) => {
      return i.verifyCredentials();
    })
    .then((credentials) => {
      const domain = new URL(baseUrl).hostname;
      const userId = credentials.id;

      return saveUser({
        domain,
        userId,
        userInfo: credentials,
        accessToken,
      });
    });
}
