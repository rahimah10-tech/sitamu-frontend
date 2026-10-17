const fileinclude = require('gulp-file-include');
const vfs = require('vinyl-fs');

console.log('Building HTML pages...');
vfs.src(['./src/pages/**/*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: './src/partials/',
    context: { environment: 'development' }
  }))
  .pipe(vfs.dest('./.temp/pages'))
  .on('end', () => {
    console.log('HTML pages compiled to .temp/pages successfully!');
    // Also build index
    vfs.src(['./src/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './src/partials/',
        context: { environment: 'development' }
      }))
      .pipe(vfs.dest('./.temp/'))
      .on('end', () => {
        console.log('Index HTML compiled to .temp successfully!');
        // Copy custom css
        vfs.src(['./src/css/**/*.css'])
          .pipe(vfs.dest('./.temp/css'))
          .on('end', () => {
            console.log('CSS copied to .temp/css successfully!');
          });
      });
  });
