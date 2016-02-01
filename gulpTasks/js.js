
module.exports = function (gulp, $) {
    //	Gulp task, define a task using orchestrator
    //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname-deps-fn
    //	Prototype: gulp.task(name[, deps], fn)
    gulp.task(
    //	Gulp task name, define a task using orchestrator
    //	gulp#name https://github.com/gulpjs/gulp/blob/master/docs/API.md#name
    //	The name of the task. Tasks that you want to run from the command line should not have spaces in them.
        'js',
    //	help
    //	Type: string | boolean
        'js compile and optimize',
        //	gulp#deps https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps
        //	Type: Array
        //	An array of tasks to be executed and completed before your task will run.
        [],
        //	gulp#fn https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn
        //	The function that performs the task's operations. Generally this takes the form of gulp.src().pipe(someplugin()).
        function () {
            //	gulp#gulp.src(globs[, options]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options
            //	Emits files matching provided glob or an array of globs. Returns a stream of Vinyl files that can be piped to plugins.
            gulp.src('./app/**/*.js')
                .pipe($.gulpCached('js'))
            //	Gulp plumber, prevent pipe breaking caused by errors from gulp plugins
            //  NPM: https://www.npmjs.com/package/gulp-plumber
                .pipe($.gulpPlumber({
                    errorHandler: gulp.onError
                }))
                .pipe($.gulpBabel({
                    plugins: ['transform-es2015-modules-systemjs'],
                    presets: ['es2015']
                }))
            //	Gulp sourcemaps, source map support for Gulp.js
            //  NPM: https://www.npmjs.com/package/gulp-sourcemaps
                .pipe($.gulpSourcemaps.init({
                    debug: $.argv.debug
                }))
                .pipe($.gulpRemember('js'))
                // .pipe($.gulpConcat('bundle.js'))
                .pipe(gulp.dest('./wwwroot/js/'))
            //  Gulp if,
            //  TODO: add gulp if links to docs
                .pipe($.gulpIf($.argv.prod, $.gulpUglify()))
            //	Gulp sourcemaps, source map support for Gulp.js
            //  NPM: https://www.npmjs.com/package/gulp-sourcemaps
                .pipe($.gulpSourcemaps.write('./maps'))
            //	Gulp rename, rename files
            //  NPM: https://www.npmjs.com/package/gulp-rename
            // .pipe($.gulpRename(gulp.config.bundle + '.min.css'))
                .pipe($.gulpRename({ extname: '.min.js' }))
            //	Gulp dest, can be piped to and it will write files. Re-emits all data passed to it so you can pipe to multiple folders. Folders that don't exist will be created.
            //  Docs: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options
            //  Prototype: gulp.dest(path[, options])
            // .pipe($.gulpGzip())
                .pipe(gulp.dest(gulp.config.dest + '/js'))                
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
            aliases: ['scripts'],
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
        'js:watch',
    //	gulp#help
        'watch ".js" files and reload',
        //	gulp#deps
        ['js'],
        //	gulp#fn
        function () {
            //	gulp#gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb]) https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
            //	Watch files and do something when a file changes. This always returns an EventEmitter that emits change events.
            var jsWatcher = gulp.watch(
                //	gulp#gulp.watch#glob
                //	Type: String or Array
                //	A single glob or array of globs that indicate which files to watch for changes.
                gulp.config.src + '/**/*.js',
                //	gulp#gulp.watch#tasks
                //	Type: Array
                //	Names of task(s) to run when a file changes, added with gulp.task()
                ['js']
                );
            jsWatcher.on('change', function (event) {
                if (event.type === 'deleted') {
                    delete $.gulpCached.caches.js[event.path];
                    $.gulpRemember.forget('js', event.path);
                }
            });
        }
        );
    return gulp;
};
