const { app, BrowserWindow, Menu, shell } = require('electron')
const path = require('path')
const url = require('url')
// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the Javascript object is garbage collected

let win

function createWindow (argument) {
	// create the browser window
	win = new BrowserWindow({ width: 800, height: 600 })

	// and load the index.html of the app
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'src/index.html'),
		protocol: 'file',
		slashes: true
	}))
	win.loadFile('src/index.html')

	// Open DevTools
	win.webContents.openDevTools()

	// Emitted when a window is closed 

	win.on('closed', () => {
		// Defference the window object, usually you should store window 
		// in arrays if your app supports multi windows, this is the time 
		// when you should delete the corresponding element

		win = null
	})

	var menu = Menu.buildFromTemplate([
		{
			label: 'Menu',
			submenu: [
				{ label: 'Adjust Notification Value' },
				{ 
					label: 'CoinMarketCap',
					click() {
						shell.openExternal('https://www.coinmarketcap.com')
					}
				},
				{ type: 'separator' },
				{ 
					label: 'exit',
					click() {
						console.log('this app will be close')
						app.quit()
					}
				}
			]
		},
		{
			label: 'Favorites',
			submenu: [
				{ label: 'Pizza' },
				{ label: 'Chiken' },
				{ label: 'Fish' }
			]
		}
	])

	Menu.setApplicationMenu(menu);
}

// This method will be called when the elecetron has finished
// initialization and is ready to create browser windows
// some APIS can only be used after this event occurs
app.on('ready', createWindow)

// Quit when all window are closed
app.on('window-all-closed', () => {
	// on macOS it is common for applications and their menu bar
	// to stay active until the user quits explicity with cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// on macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open

	if (win == null) {
		createWindow()
	}
})

// In this file you can include the rest of the app's specific main process code.
// You can also put them in separate files and require then here.