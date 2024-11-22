const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
});

ipcMain.handle('choose-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    return result.filePaths[0]; // Return the selected folder path
});

ipcMain.handle('run-script', (event, scriptName, folderPath) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'scripts', scriptName);

        if (!fs.existsSync(scriptPath)) {
            const errorMessage = `Error: Python script "${scriptName}" not found.`;
            event.sender.send('script-log', errorMessage);
            reject(new Error(errorMessage));
            return;
        }

        const pythonProcess = spawn('python', ['-u', scriptPath, folderPath]); // Pass folderPath to Python script

        pythonProcess.stdout.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach((line) => {
                if (line.trim() !== '') {
                    event.sender.send('script-log', line.trim());
                }
            });
        });

        pythonProcess.stderr.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach((line) => {
                if (line.trim() !== '') {
                    event.sender.send('script-log', `Error: ${line.trim()}`);
                }
            });
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve("Script executed successfully.");
            } else {
                const exitMessage = `Error: Python script exited with code ${code}.`;
                event.sender.send('script-log', exitMessage);
                reject(new Error(exitMessage));
            }
        });
    });
});
