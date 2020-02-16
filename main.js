const { app, BrowserWindow, screen, nativeTheme, clipboard } = require('electron')
const path = require('path')
const exec = require('child_process').exec;

function createWindow()
{
    let display = screen.getPrimaryDisplay();
    let width = display.bounds.width;

    const mainWindow = new BrowserWindow({
        width: 200,
        height: 200,
        maxWidth: 325,
        maxHeight: 350,
        minimizable: false,
        maximizable: false,
        minHeight: 200,
        minWidth: 200,
        alwaysOnTop: true,
        x: width - 200,
        y: 0,
        skipTaskbar: true,
        show: false
    })

    if (process.argv[ 2 ] === "--dev")
    {
        exec('npm run start:only', (e, d, t) => console.log(e, d, t));
        mainWindow.loadURL(`http://localhost:8080`);
    }
    else
        mainWindow.loadFile(`./dist/index.html`)

    let board = "";
    setInterval(function ()
    {
        mainWindow.setAlwaysOnTop(true);
    }, 1);
    setInterval(() =>
    {
        // lucsoft.de
        const newBoard = clipboard.readText();

        if (newBoard !== board)
        {
            board = newBoard;
            if (validURL(newBoard))
            {
                mainWindow.webContents.executeJavaScript(`updateQRCode("${newBoard}")`);
                mainWindow.show();
                mainWindow.moveTop();
            }
        }

    }, 100);
    mainWindow.removeMenu();
    mainWindow.on('close', (event) =>
    {
        mainWindow.hide();
        event.preventDefault();
    });
}

app.on('ready', createWindow)
setInterval(() => { }, 1000);

function validURL(str)
{
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,5}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}