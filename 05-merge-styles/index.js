const fs = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w', (err) => {
  if (err) throw err;
});

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          // ===========================================================================
          fs.readFile(
            path.join(__dirname, 'styles', file.name),
            'utf8',
            (err, data) => {
              if (err) throw err;

              fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                String(data),
                (err) => {
                  if (err) throw err;
                },
              );
            },
          );
          // ===========================================================================
        }
      });
    }
  },
);
