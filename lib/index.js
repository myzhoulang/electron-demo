const { ipcMain } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const windows = require('./windows');

// 展示 html 的 window
let htmlWin = null;
let pdfRenderWin = null;

// 监听页面显示打印事件
// 获取到 html
function print(mainWindow){
	ipcMain.on('print-show', (e, html) => {
	if (html) {
		try {
			const tmpDir = path.join(os.tmpdir(), '/electron');
			if (!fs.existsSync(tmpDir)) {
				fs.mkdirSync(tmpDir)
			}

			const filePath = path.join(os.tmpdir(), '/electron/pdf.html');
			// html 文件写入临时文件
			fs.writeFileSync(filePath, html);

			// 加载 pdf 窗口
			pdfRenderWin = windows.pdfWin(mainWindow);

			pdfRenderWin.on('close', () => pdfRenderWin = null)

			ipcMain.on('cancel', () => {
				pdfRenderWin && pdfRenderWin.close();
				pdfRenderWin = null;
				ipcMain.removeAllListeners('pdf-reset')
			});

			// 创建 html 窗口和加载
			htmlWin = windows.htmlWin(pdfRenderWin);

		} catch (e) {
			console.log(e)
		}
	}
});
}

// 监听打印事件
ipcMain.on('print', () => {
	 // 调用 print

	// 打印成功删除htmlwin 和 pdfRenderWin
});

// 监听取消打印事件
ipcMain.on('print-cancel', () => {
	// 删除 htmlwin 和 pdfRenderWin
	pdfRenderWin.close()
});

module.exports = print;