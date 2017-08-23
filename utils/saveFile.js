const { dialog } = require('electron').remote
const fs = require('fs')
const remote = require('electron').remote
const app = remote.app

const userPath = app.getPath('documents')

function saveFile() {
  dialog.showSaveDialog({
    filters: [
      { name: 'text', extensions: ['txt'] }
    ]
  }, (fileName) => {
    if (fileName === undefined) return;
    fs.writeFile(fileName, document.getElementById('saveFile').innerText, (err) => {
      if (err) console.log(err)
    });
  });
}

function saveSettings(settings) {
  const filePath = userPath + '/capstoneSettings/settings.txt'
  const fileDir = userPath + '/capstoneSettings/'
  fs.open(fileDir, 'r', (err) => {
    if (err) {
      fs.mkdirSync(fileDir, (error) => {
        if (error) throw (error)
      })
    }
    fs.writeFile(filePath, settings, (errors) => {
      if (errors) console.log(errors)
    })
  })
}

function openSettings() {
  const path = userPath + '/capstoneSettings/settings.txt'
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(data)
      resolve(data)
    })
  })
}

module.exports = { saveFile, saveSettings, openSettings }
