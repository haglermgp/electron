const { app, BrowserWindow } = require('electron');

// when the app its run, execute the next fuction
app.on('ready', () => {
	let mainWindow = new BrowserWindow();

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	
	mainWindow.webContents.on('will-navigate', (e, url) => {
		e.preventDefault();
		mainWindow.webContents.send('open-file', url);
	})
})