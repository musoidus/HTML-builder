const fs = require('fs');
const path = require('path');
const { stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, 'utf-8');
let data = '';
readStream.on('data', (chunk) => (data += chunk));
readStream.on('end', () => stdout.write(data + '\n'));
readStream.on('error', (error) =>
  stdout.write(`Something went wrong: ${error.message}\n`)
);
