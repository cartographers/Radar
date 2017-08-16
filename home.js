const remote = require('electron').remote
const main = remote.require('./main.js')

let button = document.createElement('button')
button.textContent = 'Open Window'
button.addEventListener('click', () => {
  let window = remote.getCurrentWindow()
  main.openWindow('pageTwo')
  window.close()
}, false)
document.body.appendChild(button)
