import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

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
