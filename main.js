const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const print = require('./lib/index')

// 0. 点击打印 接收到 html 生成 html 文件保存到临时目录
// 1. 显示预览的 pdf browserWindow
// 2. 创建一个 browserWindow 加载 html文件
// 3. 文件加载成功 使用 browserWindow.webcontents.printToPDF 生成 pdf 文件 保存到临时目录
// 4. pdf browserWindow使用 pdf.js 渲染这个pdf
  // 5. pdf browserWindow 中改变 pdf 的现实方式如 改变 方向、边距、纸张、色彩等
  // 6. 执行步骤 3

app.on('ready', () => {
  const BrowserWindow = require('electron').BrowserWindow;
const fs = require('fs');

var win = new BrowserWindow({width: 1000, height: 800, webPreferences: { nodeIntegration: true}});
win.loadFile("./index.html");
print(win)

  win.on('print-show', () => {
    win.webContents.send('pdf-ready')
  })


// win.webContents.on("did-finish-load", function() {
//   // Use default printing options
//   win.webContents.printToPDF({
//     landscape: true
//   }).then(data => {
//     fs.writeFile(__dirname + '/print22.pdf', data, (error) => {
//       if (error) throw error
//       console.log('Write PDF successfully.')
//     })
//   }).catch(error => {
//     console.log(error)
//   })
// });

  // let printWindow
  // ipcMain.on('show-print', () => {
  //   printWindow = new BrowserWindow({
  //     width: 800,
  //     height: 600,
  //     autoHideMenuBar: true,
  //     movable: false,
  //     webPreferences: {
  //       nodeIntegration: true
  //     },
  //     parent: mainWindow
  //   })

  //   // printWindow.webContents.openDevTools();
  //   printWindow.loadFile('print.html')
  //   printWindow.webContents.send('print-ready')
  // })

  // ipcMain.on('cancel', () => {
  //   printWindow.close()
  // })
  // ipcMain.on('print', () => {
  //   printWindow.webContents.print()
  // })

  // ipcMain.on('create-pdf', (event, value) => {
  //   printWindow.webContents.printToPDF({
  //     landscape: value
  //   }, (err, data) => {
  //     if (error) throw error;
  //     fs.writeFile("/tmp/print.pdf", data, function(error) {
  //       if (error)
  //         throw error;
  //       console.log("Write PDF successfully.");
  //     })
  //   })
  // })
});