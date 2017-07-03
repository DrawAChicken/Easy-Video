const { app } = require('electron');

const template = [{
    label: app.getName(),
    submenu: [
        {
            label: '关于Video',
            click() {
                
            }
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
            role: 'quit',
            label: '退出 Video'
        }
    ]
}];
module.exports = template;