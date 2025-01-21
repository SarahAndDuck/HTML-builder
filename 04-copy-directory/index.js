const { mkdir } = require('node:fs/promises');
const fs = require('fs');
const path = require('path');
let copyFiles = [];
// ============================================================================
mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
// ============================================================================

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      copyFiles.push(file);
      let fileName = String(file);
      // ===========================================================================
      fs.copyFile(
        path.join(__dirname, 'files', fileName),
        path.join(__dirname, 'files-copy', fileName),
        (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
        },
      );
      // ===========================================================================
    });
  }
});
fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (!copyFiles.includes(file)) {
        fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
          if (err) throw err;
        });
      }
      // ===========================================================================
    });
  }
});
