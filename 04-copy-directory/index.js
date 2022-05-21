const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files');
const copiedFolderPath = path.join(__dirname, 'files-copy');

function copyDir() {
  function checkError(err) {
    if (err) {
      console.log(err.message);
      return;
    }
  }
  fs.access(folderPath, fs.constants.R_OK, (err) => {
    checkError(err);
    fs.mkdir(copiedFolderPath, (err) => {
      if (err) {
        fs.readdir(copiedFolderPath, (err, files) => {
          if (err) {
            console.log(err.message);
            return;
          }
          files.forEach((file) =>
            fs.unlink(path.join(copiedFolderPath, file), (err) => {
              if (err) {
                console.log(err.message);
                return;
              }
            })
          );
        });
      }
    });
    fs.readdir(folderPath, (err, files) => {
      checkError(err);
      files.forEach((file) => {
        let filePath = path.join(folderPath, file);
        fs.readFile(filePath, (err, data) => {
          checkError(err);
          fs.writeFile(path.join(copiedFolderPath, file), data, (err) => {
            checkError(err);
          });
        });
      });
    });
  });
  console.log('Folder is copied');
}

copyDir();
