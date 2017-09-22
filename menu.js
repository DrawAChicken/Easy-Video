const { app } = require('electron');
const { shell } = require('electron');

const template = [
    {
        label: app.getName(),
        submenu: [
            {
                label: '关于 Video',
                click() {
                    shell.openExternal('https://github.com/DrawAChicken/Easy-Video');
                }
            },
            {
                type: 'separator'
            },
            {
                label: '隐藏 Video',
                accelerator: 'CmdOrCtrl+H',
                role: 'hide'
            },
            {
                label: '隐藏其他',
                accelerator: 'Alt+CmdOrCtrl+H',
                role: 'hideothers'
            },
            {
                label: '显示全部',
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit',
                label: '退出 Video'
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'copy'
            },
            {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: '窗口',
        submenu: [
            {
                label: '最小化窗口',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: '关闭窗口',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: '切换全屏',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            }
        ]
    }
];
module.exports = template;