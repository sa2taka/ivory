import { app, BrowserWindow } from 'electron';

const root = `file://${__dirname}`;
const index = `${root}/index.html`;

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(index);
}

app.whenReady().then(createWindow);
