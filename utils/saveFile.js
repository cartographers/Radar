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

module.exports = {saveFile}
