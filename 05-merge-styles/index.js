const fs = require('fs');
const path = require('path');
const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

function checkError(err) {
  if (err) {
    console.log(err.message);
    return;
  }
}

function init() {
  fs.writeFile(bundleFilePath, '', (err) => {
    checkError(err);
  });
}

fs.access(bundleFilePath, fs.constants.W_OK, (err) => {
  if (err) console.log("Bundle file doesn't exist, it will be created now.");
  init();

  fs.readdir(stylesFolderPath, (err, files) => {
    checkError(err);

    files.forEach((file) => {
      let filePath = path.join(stylesFolderPath, file);
      if (path.extname(filePath) === '.css') {
        fs.readFile(filePath, (err, data) => {
          checkError(err);

          fs.appendFile(bundleFilePath, data, (err) => {
            checkError(err);
          });
        });
      }
    });
  });
});
process.on('exit', () => console.log('Bundle file is done.'));
