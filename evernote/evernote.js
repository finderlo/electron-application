
"use strict";

const path = require('path');
const {app, shell, BrowserWindow} = require('electron');

class Evernote {
    constructor() {
        this.win = null;
        this.tray = null;
        this.createWindows();
        this.isHide=false;
    }

    createWindows() {
        this.win = new BrowserWindow({
            width: 1500,
            height: 900,
            resizable: true,
            center:true,
            frame: true,
            icon: path.join(__dirname,"./icon.png"),
            autoHideMenuBar: true,
            webPreferences: {
                javascript: true,
                plugins: true,
                nodeIntegration: false,
                webSecurity: false,
                zoomFactor: 1.35,
            }
        });
        this.initWin();
    }

    initWin() {
        this.win.loadURL("https://app.yinxiang.com/Home.action")
        this.win.on('activate', (e) => {
            if (this.win.isVisible()) {
                e.preventDefault();
                this.win.hide();
            }
        });
        this.win.on('close', (e) => {
            e.preventDefault();
            this.win.hide();
        });
        this.win.on('hide',(e) =>{
            e.preventDefault();
            this.isHide=true;
        });

        this.win.on('show',(e) =>{
            e.preventDefault();
            this.isHide=false;
        });
    }

    show() {
        this.win.show();
    }
}

module.exports = Evernote;
