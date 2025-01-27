const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
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