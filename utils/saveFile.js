const {dialog} = require('electron').remote
const fs = require('fs')

function saveFile() {

  dialog.showSaveDialog({
    filters: [
      { name: 'text', extensions: ['txt'] }
    ]
  }, (fileName) => {
    if (fileName === undefined) return;
    fs.writeFile(fileName, document.getElementById("newGraph").innerText, (err) => {
      if (err) console.log(err)
    });
  });
}

function saveSettings(settings) {
  const path = process.env.HOME + '/Documents/settings.txt'
  fs.writeFile(path, settings, (err) => {
    if (err) console.log(err)
  })
}

function openSettings() {
  const path = process.env.HOME + '/Documents/settings.txt'
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) console.log(err)
      resolve(data)
    })})
}


module.exports = {saveFile, saveSettings, openSettings}

  // fs.open(path, 'w+', function(err, data) {
  //   if (err) {
  //     console.log(err)
  // } else {
  //   fs.writeFile('settings.txt', settings, 'utf8', (err) => {
  //     if (err) console.log(err)
  //     console.log('File has been saved')
  //   } )
  // }
  // }
  // )
