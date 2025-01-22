const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);

rl.write('This is a prompt for text input');
rl.write('\n');

rl.on('line', (data) => {
  if (data === 'exit') {
    rl.close();
  } else {
    output.write(data);
    output.write(' ');
  }
});
rl.on('close', () => console.log('Good luck!'));
