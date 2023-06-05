const { app, BrowserWindow } = require('electron') ;
function createwindow (){
        const win = new BrowserWindow({
            width: 1280,
            height: 600
        });
    win.loadFile('src/Pinicial.html');
}

app.whenReady().then(createwindow);
app.on("window-all-closed", () => {
    if(process.platform !== 'darwin') app.quit()
});