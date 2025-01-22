const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(path.join(__dirname, './text.txt'), 'utf-8');

let readData = '';

stream.on('data', (chunk) => (readData += chunk));
stream.on('end', () => console.log(readData));
stream.on('error', (error) => console.log('Error', error.message));
