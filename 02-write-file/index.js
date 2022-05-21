const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const fileName = path.join(__dirname, 'keyboard-input.txt');
const fileOutput = fs.createWriteStream(fileName);

stdout.write('You can input something:\n');
stdout.write('> ');

stdin.on('data', (data) => {
  stdout.write('> ');
  let currentInput = data.toString().trim();
  if (currentInput === 'exit') process.exit();
  else fileOutput.write(currentInput + '\n');
});
process.on('exit', () => stdout.write('End of program. Good Luck!\n'));
process.on('SIGINT', () => {
  stdout.write('\n');
  process.exit();
});
