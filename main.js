const { BrowserWindow, app, ipcMain, Menu } = require('electron');
const menuTemplate = require('./menu');
const path = require('path');

let flashPath = './config/flash/PepperFlashPlayer.plugin';
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, flashPath));
// 主窗口
let mainWindow = null;
// 主窗口参数
let mainWindowParams = {
    width: 1000,
    height: 660,
    minWidth: 800,
    minHeight: 550,
    title: 'video',
    center: true,
    // resizable: false,
    backgroundColor: '#fff',
    'web-preferences': {
        plugins: true
    },
    icon: __dirname + '/logo/logo.png',
    titleBarStyle: 'hidden',
    show: false
};
// 创建主窗口
function createWindow() {
    mainWindow = new BrowserWindow(mainWindowParams);
    if (process.env.NODE_ENV === 'development') {
        console.log('开发环境');
        mainWindow.loadURL('http://localhost:8080/resource/#/home?a=1');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    }
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
};
// 创建菜单
function createMenu() {
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
    createWindow();
    createMenu();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});