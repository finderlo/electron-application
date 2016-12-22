const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const AppTray = require('./app_tray')
const Evernote = require('./evernote')
// Keep a global reference of the window objecst, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


class MainApp {
    constructor() {
        this.tray = null;
        this.evernote = null;
    }

    init() {
        this.initWindows();
    }

    initWindows() {
        app.on('ready', () => {
            this.createWin();
            this.createTray();
        });

        app.on('activate', () => {
            if (this.evernote == null) {
                this.createWin();
            } else {
                this.evernote.show();
            }
        });
    }

    createWin() {
        this.evernote = new Evernote();
    }

    createTray() {
        this.tray = new AppTray(this.evernote);
    }

}

let mainApp = null;

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    console.log(shouldQuit)
    if (mainApp) {
        mainApp.evernote.win.restore();
        mainApp.evernote.win.show();
        mainApp.evernote.win.focus();
    }
});

if (shouldQuit) {
    app.quit()
}

// Create myWindow, load the rest of the app, etc...
// app.on('ready', () => {
// });

mainApp = new MainApp();
mainApp.init()
