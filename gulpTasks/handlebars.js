

module.exports = function (gulp, $) {
  //	Gulp task, define a task using orchestrator
  //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
  //	Prototype: gulp.task(name[, deps], fn)
  gulp.task(
  //	Gulp task name, define a task using orchestrator
  //	gulp#name https://github.com/gulpjs/gulp/blob/master/docs/API.md#name
  //	The name of the task. Tasks that you want to run from the command line should not have spaces in them.
    'handlebars',
  //	help
  //	Type: string | boolean
    'handlebars compile and optimize',
    //	gulp#deps https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps
    //	Type: Array
    //	An array of tasks to be executed and completed before your task will run.
    [],
    //	gulp#fn https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn
    //	The function that performs the task's operations. Generally this takes the form of gulp.src().pipe(someplugin()).
    function () {
      //	gulp#gulp.src(globs[, options]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options
      //	Emits files matching provided glob or an array of globs. Returns a stream of Vinyl files that can be piped to plugins.
      gulp.src(gulp.config.index + '.hbs')
      //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
      //  NPM: https://www.npmjs.com/package/gulp-plumber
        .pipe($.gulpPlumber({
          errorHandler: gulp.onError
        }))
      //	Gulp sourcemaps, source map support for Gulp.js
      //  NPM: https://www.npmjs.com/package/gulp-sourcemaps
        .pipe($.gulpSourcemaps.init({
          debug: $.argv.debug
        }))
      //	Gulp handlebars, handlebars plugin for gulp
      //  NPM: https://www.npmjs.com/package/gulp-handlebars
        .pipe($.gulpCompileHandlebars({
          firstName: 'APEGROUP MC BEATQUIZ'
        }, {
          batch: [gulp.config.src + '/layout/partials'],
          helpers: require(gulp.config.src + '/layout/helpers')
        }))
      //	gulp plugin to minify HTML.
      //  NPM: https://www.npmjs.com/package/gulp-htmlmin
        // .pipe($.gulpHtmlmin({
        //   collapseWhitespace: true,
        //   removeComments: true,
        //   collapseInlineTagWhitespace: true,
        //   removeAttributeQuotes: false,
        //   minifyJS: false,
        //   minifyCSS: true
        //   
        // }))
      //	Gulp rename, rename files
      //  NPM: https://www.npmjs.com/package/gulp-rename
        .pipe($.gulpRename('index.html'))
      //	Gulp dest, can be piped to and it will write files. Re-emits all data passed to it so you can pipe to multiple folders. Folders that don't exist will be created.
      //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options
      //  Prototype: gulp.dest(path[, options])
      // gulp-gzip 
      // Gzip plugin for gulp.
      // .pipe($.gulpGzip())
        .pipe(gulp.dest(gulp.config.dest))
      //	Browser sync reload, the reload method will inform all browsers about changed files and will either cause the browser to refresh, or inject the files where possible.
      //  Docs: http://www.browsersync.io/docs/api/#api-reload
        .pipe($.browserSync.reload({
          stream: true
        }));
    },
    //	Gulp help, adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks
    //
    //  NPM: https://www.npmjs.com/package/gulp-help
    //  Github: https://github.com/chmontgomery/gulp-help
    //
    {
      //	Docs: https://github.com/chmontgomery/gulp-help#taskoptionsaliases
      aliases: ['hbs'],
      //	Docs: https://github.com/chmontgomery/gulp-help#taskoptionsoptions
      options: {
        'env=prod': 'TODO',
        'debug': 'TODO'
      }
    }
    );

  //	gulp#gulp.task
  gulp.task(
  //	gulp#name
    'handlebars:watch',
  //	gulp#help
    'watch ".hbs" files and reload',
    //	gulp#deps
    ['handlebars'],
    //	gulp#fn
    function () {
      //	gulp#gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
      //	Watch files and do something when a file changes. This always returns an EventEmitter that emits change events.
      gulp.watch(
        //	gulp#gulp.watch#glob
        //	Type: String or Array
        //	A single glob or array of globs that indicate which files to watch for changes.
        gulp.config.src + '/layout/**/*.hbs',
        //	gulp#gulp.watch#tasks
        //	Type: Array
        //	Names of task(s) to run when a file changes, added with gulp.task()
        ['handlebars']
        );
    }
    );
  return gulp;
};



