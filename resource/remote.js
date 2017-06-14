(function () {
    const electron = require('electron');
    const ipcRenderer = electron.ipcRenderer;
    const remote = electron.remote;
    const remoteApi = remote.require('./config/index.js');

    global.remote = remote;
    global.remoteApi = remoteApi;
    global.ipcRenderer = ipcRenderer;
})();