const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    runScript: (scriptName, folderPath) => ipcRenderer.invoke('run-script', scriptName, folderPath),
    chooseFolder: () => ipcRenderer.invoke('choose-folder'),
    onLog: (callback) => ipcRenderer.on('script-log', callback)
});
