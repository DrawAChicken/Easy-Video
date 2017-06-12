const { app } = require('electron');

const template = [{
    label: app.getName(),
    submenu: [
        {
            label: '关于EASY',
            click() {
                
            }
        },
        {
            role: 'quit',
            label: '退出 EASY'
        }
    ]
}];
module.exports = template;