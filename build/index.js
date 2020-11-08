const fs = require('fs').promises;
const { resolve } = require('path');
const childProcess = require('child_process');

const ENV = process.env;

async function build() {
  try {
    // Delete directory /dist and build cache file
    const paths = await fs.readdir(resolve('packages'));

    for (const path of paths) {
      const package = resolve('packages', path);

      await fs.rmdir(resolve(package, 'dist'), {
        recursive: true
      });

      await fs.rmdir(resolve(package, 'tsconfig.tsbuildinfo'), {
        recursive: true
      });
    }

    console.log('>> CLEANUP -> OK');
  } catch (error) {
    console.error('!! ERROR-CLEANUP ->', error.message);
  }

  // Build project dynamically
  childProcess.exec(`yarn ${ENV.PROJECT_NAME} build`, (error, out, errorMsg) => {
    if (error) console.error('!! ERROR-BUILD ->', out);
    else console.log('>> BUILD -> OK');
  });
}

build();
