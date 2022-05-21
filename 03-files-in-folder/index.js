const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, (err, files) => {
  if (err) console.log('Error:', err.message);
  files.forEach((file) => {
    let filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) console.log('Error:', err.message);

      if (!stats.isDirectory())
        console.log(
          `${file.slice(0, file.lastIndexOf('.'))} - ${
            path.extname(filePath).slice(1) || 'unknown'
          } - ${stats.size}b`
        );
    });
  });
});
