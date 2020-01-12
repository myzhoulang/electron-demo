const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  let printWindow

  mainWindow.loadFile('index.html')

  ipcMain.on('show-print', () => {
    printWindow = new BrowserWindow({
      width: 800,
      height: 600,
      autoHideMenuBar: true,
      movable: false,
      webPreferences: {
        nodeIntegration: true
      },
      parent: mainWindow
    })

    printWindow.webContents.openDevTools();
    printWindow.loadFile('print.html')
    printWindow.webContents.send('print-ready')
  })

  ipcMain.on('cancel', () => {
    printWindow.close()
  })
  ipcMain.on('print', () => {
    printWindow.webContents.print()
  })
})