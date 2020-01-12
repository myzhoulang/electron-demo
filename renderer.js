const { ipcRenderer } = require('electron')
const print = document.getElementById('print')

print.addEventListener('click', () => {
    ipcRenderer.send('show-print')
}, false)
