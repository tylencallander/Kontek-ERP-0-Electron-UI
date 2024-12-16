const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    runScript: (scriptName, folderPath, baseDirectory, filePath) =>
        ipcRenderer.invoke('run-script', scriptName, folderPath, baseDirectory, filePath),
    chooseFolder: () => ipcRenderer.invoke('choose-folder'),
    chooseFile: () => ipcRenderer.invoke('choose-file'),
    onLog: (callback) => ipcRenderer.on('script-log', callback),
});
