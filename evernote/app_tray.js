
'use strict';

const path = require('path');
const {app, Menu, nativeImage, Tray} = require('electron');

class AppTray {
    constructor(evennoteWindow) {
        this.evennoteWindow = evennoteWindow;
        let image;
        
            image = nativeImage.createFromPath(path.join(__dirname, './status_bar.png'));
        
        image.setTemplateImage(true);
        
        this.tray = new Tray(image);
        this.tray.setToolTip("evennote");
        
        if (process.platform == "linux") {
            let contextMenu = Menu.buildFromTemplate([
                {label: 'Show', click: () => this.show()},
                {label: 'Exit', click: () => app.exit(0)}
            ]);
            this.tray.setContextMenu(contextMenu);
        }
        this.tray.on('click', () => this.show());
    }
    
    setTitle(title) {
        this.tray.setTitle(title);
    }
    
    show() {
        this.evennoteWindow.show();
    }
}

module.exports = AppTray;
