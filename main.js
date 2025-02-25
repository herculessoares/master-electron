// Modules
const {app, BrowserWindow} = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1600, height: 800,
    webPreferences: {
      contextIsolation: false, 
      nodeIntegration: true
    }
  })

  secondaryWindow = new BrowserWindow({
    width: 600, height: 600,
    webPreferences: {
      contextIsolation: false, 
      nodeIntegration: true
    },
    parent:mainWindow,
    modal: true
  })


   // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondaryWindow.loadFile('secondary.html')

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', () => {
  console.log(app.getPath('desktop'))
  console.log(app.getPath('temp'))  
  console.log(app.getPath('userData')) 
  createWindow()
})
app.on('browser-window-blur', e =>{
 //not supported yet
})

app.on('browser-window-focus', e =>{
   //not supported yet
})  

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
