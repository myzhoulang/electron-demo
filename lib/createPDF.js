const path = require('path');
const os = require('os');
const fs = require('fs');
// printToPDF 默认配置
const defaultOptions = {
	// 横向打印
	landscape: false,
	// 无边距
	marginType: 0,
	// 纸张
	pageSize: 'A4',
	// 打印css 背景
	printBackground: true,
};

function createPDF(htmlWin, pdfWin, options = {}){
	console.log(new Date())
	return htmlWin.webContents.printToPDF(Object.assign({}, defaultOptions, options))
		.then(data => {
			try{
				const filePath = path.join(os.tmpdir(), '/electron/html.pdf');
				// 将 pdf 文件写入到临时目录
				fs.writeFileSync(filePath, data);
				pdfWin && pdfWin.webContents.send('pdf-ready', filePath);
			}catch (e) {
				console.log(e);
			}
		})
		.catch(e => console.log(e));
}

module.exports = createPDF;