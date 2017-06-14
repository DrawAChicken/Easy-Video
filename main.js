const {BrowserWindow, app, ipcMain, Menu} = require('electron');
const menuTemplate = require('./menu');

// 主窗口
let mainWindow = null;
// 主窗口参数
let mainWindowParams = {
    width: 1000,
    height: 660,
    minWidth: 800,
    minHeight: 550,
    title: 'EASY',
    center: true,
    // resizable: false,
    backgroundColor: '#fff',
    icon: __dirname + '/logo/logo.png',
    titleBarStyle: 'hidden',
    show:false
};
// 创建主窗口
function createWindow() {
    mainWindow = new BrowserWindow(mainWindowParams);
    if (process.env.NODE_ENV === 'development') {
        console.log('开发环境');
        mainWindow.loadURL('http://localhost:8080/resource');
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