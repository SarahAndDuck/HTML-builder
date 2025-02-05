const { mkdir } = require('node:fs/promises');
const fs = require('fs');
const path = require('path');
let template = '';
mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w', (err) => {
  if (err) throw err;
});

fs.readFile(
  path.join(__dirname, 'template.html'),
  'utf8',
  (err, datatemplate) => {
    if (err) throw err;
    template = datatemplate;
  },
);
fs.readdir(
  path.join(__dirname, 'components'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        fs.readFile(
          path.join(__dirname, 'components', file.name),
          'utf8',
          function (error, fileContent) {
            if (error) throw error;
            template = template.replace(
              `{{${file.name.split('.')[0]}}}`,
              fileContent,
            );
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              template,
              (err) => {
                if (err) throw err;
              },
            );
          },
        );
      });
    }
  },
);

// Use the script written in task 05 - merge - styles to create the style.css file.
//==================================================
fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w', (err) => {
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
                path.join(__dirname, 'project-dist', 'style.css'),
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

//=============================================================================================

// Use the script from task 04 - copy - directory to move the assets folder into the project - dist folder.
//=============================================================================================
mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
// ============================================================================

function readFile(file, filePath) {
  if (file.isFile()) {
    fs.copyFile(
      path.join(__dirname, 'assets', filePath, file.name),
      path.join(__dirname, 'project-dist', 'assets', filePath, file.name),
      (err) => {
        if (err) {
          console.log('Error Found:', err);
        }
      },
    );
  } else if (file.isDirectory()) {
    mkdir(path.join(__dirname, 'project-dist', 'assets', filePath, file.name), {
      recursive: true,
    });
    fs.readdir(
      path.join(__dirname, 'assets', filePath, file.name),
      { withFileTypes: true },
      (err, files) => {
        filePath = path.join(filePath, file.name);
        files.forEach((file) => {
          readFile(file, filePath);
        });
      },
    );
  }
}

fs.readdir(
  path.join(__dirname, 'assets'),
  { withFileTypes: true },
  (err, filesAssets) => {
    if (err) {
      console.log(err);
    } else {
      filesAssets.forEach((fileAssets) => {
        let assetsPath = '';
        readFile(fileAssets, assetsPath);
      });
    }
  },
);

//=============================================================================================
