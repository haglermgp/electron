const { remote } = require('electron')

const main = remote.require('../../main.js')

let button = document.createElement('button')
button.textContent = 'Open Window'

document.body.appenChild(button)

button.addEventListener('click', () => {
	main.openWindow()
})