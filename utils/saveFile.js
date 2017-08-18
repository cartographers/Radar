const {dialog} = require('electron').remote
const fs = require('fs')

function saveFile() {

  dialog.showSaveDialog({
    filters: [
      { name: 'text', extensions: ['txt'] }
    ]
  }, (fileName) => {
    if (fileName === undefined) return;
    fs.writeFile(fileName, document.getElementById("chartButton").innerText, (err) => {
      if (err) console.log(err)
    });
  });
}

function saveSettings(settings) {
  const filePath = process.env.HOME + '/Documents/capstoneSettings/settings.txt'
  const filedir = process.env.HOME + '/Documents/capstoneSettings/'
  fs.open(filePath, 'r', (err) => {
    if (err) {
      fs.mkdirSync(filedir, (error) => {
        if (error) throw (error)
      })
    }
  fs.writeFile(filePath, settings, (errors) => {
    if (errors) console.log(errors)
  })
  })
}

function openSettings() {
  const path = process.env.HOME + '/Documents/capstoneSettings/settings.txt'
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(data)
      resolve(data)
    })})
}

module.exports = {saveFile, saveSettings, openSettings}
