const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const createPDF = require('./createPDF');

const windows = {
	// html 加载window
	htmlWin(pdfRenderWin){
		// html 文件临时路径
		const filePath = path.join(os.tmpdir(), '/electron/pdf.html');
		console.log(filePath)

		// 创建展示 html 文件的 BrowserWindow
		const htmlWin = new BrowserWindow({
			show: false
		});

		htmlWin.loadFile(filePath);

		// html 文件加载完成
		htmlWin.webContents.on('did-finish-load', () => {
			createPDF(htmlWin, pdfRenderWin)
		});

		// pdf 窗口中改变pdf 显示方式
		// 主进程监听重新生成 pdf
		ipcMain.on('pdf-reset', (event, options) =>{
			createPDF(htmlWin, pdfRenderWin, options)
		});
		return htmlWin;
	},

	// 显示 pdf window
	pdfWin(mainWindow){
		// 创建 pdf 渲染window
		const win = new BrowserWindow({
			width: 800,
			height: 600,
			movable: false,
			autoHideMenuBar: true,
			webPreferences: {
				nodeIntegration: true,
			},
			parent: mainWindow
		});

		win.loadFile(path.join(__dirname, './print.html'));
		return win;
	}
};

module.exports = windows;
