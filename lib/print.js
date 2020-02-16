const { ipcRenderer } = require('electron');
const path = require('path');
const pdfjsLib = require("pdfjs-dist");
const pdfjsViewer = require("pdfjs-dist/web/pdf_viewer");

const container = document.getElementById('content');
const CMAP_URL = path.join(__dirname, '../node_modules/pdfjs-distt/cmaps/');
const CMAP_PACKED = true;
pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.js');
const pdfLinkService = new pdfjsViewer.PDFLinkService();

const pdfViewer = new pdfjsViewer.PDFViewer({
    container: container,
    linkService: pdfLinkService,
    renderer: "svg",
    textLayerMode: 0,
});
pdfLinkService.setViewer(pdfViewer);

function renderPdf(filePath){
  const loadingTask = pdfjsLib.getDocument({
    url: filePath,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
  });
  loadingTask.promise.then(function(pdfDocument) {
    // Document loaded, specifying document for the viewer and
    // the (optional) linkService.
    pdfViewer.setDocument(pdfDocument);
    pdfLinkService.setDocument(pdfDocument, null);
  });
}


ipcRenderer.on('pdf-ready', (e, filePath) => {
  renderPdf(filePath);
});

document.addEventListener("pagesinit", function() {
  // We can use pdfViewer now, e.g. let's change default scale.
  pdfViewer.currentScaleValue = "page-width";
});

const landscape = document.getElementById('landscape');
const pageSize = document.getElementById('pageSize');
const marginsType = document.getElementById('marginsType');
const printBackground = document.getElementById('printBackground');
const pdfControls = [
  landscape,
  pageSize,
  marginsType,
  printBackground,
];

pdfControls.forEach(item => {
  item.addEventListener('change', () => {
    const options = {
      landscape: landscape.value === 'true' ? true : false,
      pageSize: pageSize.value || 'A4',
      marginsType: parseInt(marginsType.value) || 0,
      printBackground: printBackground.value === 'on' ? true : false
    }

    console.log(options)
    ipcRenderer.send('pdf-reset', options)
  }, false)
})


// cancel
document.querySelector('.cancel').addEventListener('click', () => {
  console.log('cancel')
  ipcRenderer.send('cancel')
}, false);

document.querySelector('.print').addEventListener('click', (event) => {
  ipcRenderer.send('print-show')
}, false);