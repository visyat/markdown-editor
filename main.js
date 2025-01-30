const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('index.html');
}

// const watchPath = path.join(__dirname);
// fs.watch(watchPath, (eventType, filename) => {
//     if (eventType === 'change' && BrowserWindow.getAllWindows().length !== 0) {
//         BrowserWindow.getAllWindows()[0].reload();
//     }
// });
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});