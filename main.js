// In this file we put the all code of our logic application
const loader = require('monaco-loader');
// this module that able us receive the event 'open-file' - check the indexjs
const { ipcRenderer } = require('electron');
const fs = require('fs');

loader().then( monaco => {
	let editor = monaco.editor.create(
		document.querySelector('#app'),
		{
			language: 'javascript',
			theme: 'vs-dark',
			automaticLayout: true
		}
	)

	ipcRenderer.on('open-file', (e, url) => {
		fs.readFile(url.slice(10), 'utf-8', (err, data) => {
			console.log('data >>>>', data)
			console.log('url >>>>', url)
			console.log('err >>>>', err)
			editor.setModel(monaco.editor.createModel(data, 'javascript'));
		})
	})
})