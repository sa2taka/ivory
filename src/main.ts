import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

// initialize DB
// mainで初期化する必要があるらしい
import { initialStore } from '@/utils/DB';
initialStore();

const index = url.format({
  pathname: path.join(process.cwd(), 'dist/index.html'),
  protocol: 'file:',
  slashes: true,
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: false,
    },
  });

  win.loadURL(index);
}

app.whenReady().then(createWindow);
