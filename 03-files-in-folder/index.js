const fs = require('fs');

const path = require('path');
const { stdout } = process;
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if (!file.isDirectory()) {
          fs.stat(
            path.join(__dirname, 'secret-folder', file.name),
            (err, stat) => {
              if (err) throw err;
              stdout.write(
                `${file.name.split('.').join(' - ')} - ${stat.size}b \n`,
              );
            },
          );
        }
      });
    }
  },
);
