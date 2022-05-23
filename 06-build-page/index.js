const fs = require('fs');
const path = require('path');
const assetsFolderPath = path.join(__dirname, 'assets');
const stylesFolderPath = path.join(__dirname, 'styles');
const outputFolderPath = path.join(__dirname, 'project-dist');

function checkError(err) {
  if (err) {
    console.log(err.message);
    return;
  }
}

function generatePage() {
  fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
    checkError(err);
    let templateHtml = data.toString();
    fs.readdir(path.join(__dirname, 'components'), (err, files) => {
      checkError(err);
      files.forEach((file) => {
        fs.readFile(
          path.join(__dirname, 'components', `${file}`),
          (err, componentData) => {
            checkError(err);
            let componentHtml = componentData.toString();
            let regex = new RegExp(
              `{{${file.slice(0, file.lastIndexOf('.'))}}}`,
              'g'
            );
            templateHtml = templateHtml.replace(regex, componentHtml);
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              templateHtml,
              (err) => {
                checkError(err);
              }
            );
          }
        );
      });
    });
  });
}

function makeEmptyFile(filePath) {
  fs.writeFile(filePath, '', (error) => {
    if (error) return console.error(error.message);
  });
}

function makeDirectory(folderPath) {
  fs.mkdir(folderPath, (err) => {
    if (err) {
      clearFolder(folderPath);
    }
  });
}

function clearFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    checkError(err);
    files.forEach((file) => {
      fs.stat(path.join(folderPath, file), (err, stats) => {
        checkError();
        if (stats.isDirectory()) {
          // clearFolder(path.join(folderPath, file));
        } else {
          fs.unlink(path.join(folderPath, file), (err) => checkError(err));
        }
      });
    });
  });
}

function copyFolder(sourcePath, outputPath) {
  fs.mkdir(outputPath, (err) => {
    fs.readdir(sourcePath, (err, files) => {
      checkError(err);
      files.forEach((file) => {
        fs.stat(path.join(sourcePath, file), (err, stats) => {
          checkError(err);
          if (stats.isDirectory()) {
            copyFolder(
              path.join(sourcePath, file),
              path.join(outputPath, file)
            );
          } else {
            fs.readFile(path.join(sourcePath, file), (err, data) => {
              checkError(err);
              fs.writeFile(path.join(outputPath, file), data, (err) => {
                checkError(err);
              });
            });
          }
        });
      });
    });
  });
}

function mergeStyles(filePath) {
  fs.access(filePath, fs.constants.R_OK, (err) => {
    makeEmptyFile(path.join(outputFolderPath, 'style.css'));
    fs.readdir(stylesFolderPath, (err, files) => {
      checkError(err);
      files.forEach((file) => {
        let filePath = path.join(stylesFolderPath, file);
        if (path.extname(filePath) === '.css') {
          fs.readFile(filePath, (err, data) => {
            checkError(err);
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'style.css'),
              data,
              (err) => {
                checkError(err);
              }
            );
          });
        }
      });
    });
  });
}

makeDirectory(outputFolderPath);
copyFolder(assetsFolderPath, path.join(outputFolderPath, 'assets'));
generatePage();
mergeStyles(path.join(outputFolderPath, 'style.css'));
