
'use strict';

module.exports = function (gulp, $) {
  // Tasks fonts
  gulp.task('font', 'help font', [], function () {
    gulp.src(gulp.config.src + '/assets/fonts/**/*.{ttf,otf}', {
      //	gulp#options.read https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsread
      //	Type: Boolean Default: true
      //	Setting this to false will return file.contents as null and not read the file at all.
      read: false
    })
      .pipe($.gulpPlumber())
    //  Gulp font https://www.npmjs.com/package/gulp-font
    //	NPM: https://www.npmjs.com/package/gulp-font
      .pipe($.gulpFont({
        ext: '.styl',
        fontface: gulp.config.src + '/assets/fonts',
        relative: '/assets/fonts',
        dest: gulp.config.dest + '/assets/fonts',
        embed: [
          'woff'
        ],
        collate: false
      }))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
  return gulp;
};
