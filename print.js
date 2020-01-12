const { ipcRenderer } = require('electron')
const pdfjsLib = require("pdfjs-dist");
const pdfjsViewer = require("pdfjs-dist/web/pdf_viewer")

const container = document.getElementById('content')
const pdfUrl = './1.pdf'
const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
pdfjsLib.GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js'

const pdfLinkService = new pdfjsViewer.PDFLinkService()

console.log(pdfjsViewer.PDFViewer)
const pdfViewer = new pdfjsViewer.PDFViewer({
    container: container,
    linkService: pdfLinkService,
    renderer: "svg",
    textLayerMode: 0,
});
pdfLinkService.setViewer(pdfViewer);
console.log(pdfLinkService)
var loadingTask = pdfjsLib.getDocument({
    url: pdfUrl,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
});
loadingTask.promise.then(function(pdfDocument) {
    // Document loaded, specifying document for the viewer and
    // the (optional) linkService.
    pdfViewer.setDocument(pdfDocument);
    console.log(pdfDocument)
    pdfLinkService.setDocument(pdfDocument, null);
});

document.addEventListener("pagesinit", function() {
  // We can use pdfViewer now, e.g. let's change default scale.
  pdfViewer.currentScaleValue = "page-width";
});


// cancel
document.querySelector('.cancel').addEventListener('click', () => {
  ipcRenderer.send('cancel')
}, false)

document.querySelector('.print').addEventListener('click', () => {
  ipcRenderer.send('print')
}, false)