const { ipcRenderer } = require('electron');
const fs = require('fs');
const print = document.getElementById('print');

print.addEventListener('click', () => {
    console.log('render => #print-click');
    const html = fs.readFileSync('./html.html', 'utf-8')
    ipcRenderer.send('print-show', html);

}, false);
