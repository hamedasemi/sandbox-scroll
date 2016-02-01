
'use strict';

module.exports = function (gulp, $) {
  // Tasks browser sync
  gulp.task('copy', 'copy', [], function () {
    gulp.src(gulp.config.src + '/assets/root/**/*.*')
    //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
    //  NPM: https://www.npmjs.com/package/gulp-plumber
      .pipe($.gulpPlumber({
        errorHandler: gulp.onError
      }))
      .pipe(gulp.dest(gulp.config.dest))
    //	Browser sync reload, the reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
    //  Docs: http://www.browsersync.io/docs/api/#api-reload
      .pipe($.browserSync.reload({
        stream: true
      }));
    // gulp.src(gulp.config.src + '/assets/**/*.{ttf,woff,eot,svg}')
    // //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
    // //  NPM: https://www.npmjs.com/package/gulp-plumber
    //   .pipe($.gulpPlumber({
    //     errorHandler: gulp.onError
    //   }))
    //   .pipe(gulp.dest(gulp.config.dest + '/assets'))
    // //	Browser sync reload, the reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
    // //  Docs: http://www.browsersync.io/docs/api/#api-reload
    //   .pipe($.browserSync.reload({
    //     stream: true
    //   }));
    gulp.src(gulp.config.src + '/assets/**/*.{jpg,jpeg,svg}')
    //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
    //  NPM: https://www.npmjs.com/package/gulp-plumber
      .pipe($.gulpPlumber({
        errorHandler: gulp.onError
      }))
      .pipe(gulp.dest(gulp.config.dest + '/assets'))
    //	Browser sync reload, the reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
    //  Docs: http://www.browsersync.io/docs/api/#api-reload
      .pipe($.browserSync.reload({
        stream: true
      }));
    gulp.src(gulp.config.src + '/**/*.html')
    //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
    //  NPM: https://www.npmjs.com/package/gulp-plumber
      .pipe($.gulpPlumber({
        errorHandler: gulp.onError
      }))
      .pipe(gulp.dest(gulp.config.dest))
    //	Browser sync reload, the reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
    //  Docs: http://www.browsersync.io/docs/api/#api-reload
      .pipe($.browserSync.reload({
        stream: true
      }));
  });
  // gulp#gulp.task
  gulp.task(
  //	gulp#name
    'copy:watch',
  //	gulp#help
    'watch ".html" files and reload',
    //	gulp#deps
    ['copy'],
    //	gulp#fn
    function () {
      //	gulp#gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
      //	Watch files and do something when a file changes. This always returns an EventEmitter that emits change events.
      gulp.watch(
        //	gulp#gulp.watch#glob
        //	Type: String or Array
        //	A single glob or array of globs that indicate which files to watch for changes.
        gulp.config.src + '/**/index.html',
        //	gulp#gulp.watch#tasks
        //	Type: Array
        //	Names of task(s) to run when a file changes, added with gulp.task()
        ['copy']
        );
    }
    );
  return gulp;
};
