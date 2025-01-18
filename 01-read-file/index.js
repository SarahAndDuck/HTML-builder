const fs = require('fs');
const stream = fs.createReadStream('text.txt', 'utf-8');

let readData = '';

stream.on('data', (chunk) => (readData += chunk));
stream.on('end', () => console.log(readData));
stream.on('error', (error) => console.log('Error', error.message));
